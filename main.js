var httpRequest;
var usermap = {
	initialize: function(){
		this.getUserLocation();
		var infowindow = new google.maps.InfoWindow();
		var redStations = [];
		var redBranchAshmont =[];
		var redBranchBraintree= [];
		var markers = [];
		var myLat;
		var myLon;
		var me;
		var meMarker;
		this.markers = markers;
        var mapOptions = {
          center: new google.maps.LatLng(42.330497742, -71.095794678),
          zoom: 1,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map_canvas"),
            mapOptions);
        this.map = map;
        var tico = "tico.png";
		pt = new google.maps.LatLng(42.395428, -71.142483);
		markers.push(new google.maps.Marker({position: pt, title: "Alewife Station", icon: tico}));
			redStations.push(pt);
		pt = new google.maps.LatLng(42.39674, -71.121815);
		markers.push(new google.maps.Marker({position: pt, title: "Davis Station", icon: tico}));
			redStations.push(pt);
		pt = new google.maps.LatLng(42.3884, -71.119149);
		markers.push(new google.maps.Marker({position: pt, title: "Porter Square Station", icon: tico}));
			redStations.push(pt);
		pt = new google.maps.LatLng(42.373362, -71.118956);
		markers.push(new google.maps.Marker({position: pt, title: "Harvard Square Station", icon: tico}));
			redStations.push(pt);
		pt = new google.maps.LatLng(42.365486, -71.103802);
		markers.push(new google.maps.Marker({position: pt, title: "Central Square Station", icon: tico}));
			redStations.push(pt);
		pt = new google.maps.LatLng(42.36249079, -71.08617653);
		markers.push(new google.maps.Marker({position: pt, title: "Kendall/MIT Station", icon: tico}));
			redStations.push(pt);
		pt = new google.maps.LatLng(42.361166, -71.070628);
		markers.push(new google.maps.Marker({position: pt, title: "Charles/MGH Station", icon: tico}));
			redStations.push(pt);
		pt = new google.maps.LatLng(42.35639457, -71.0624242);
		markers.push(new google.maps.Marker({position: pt, title: "Park St. Station", icon: tico}));
			redStations.push(pt);
		pt = new google.maps.LatLng(42.355518, -71.060225);
		markers.push(new google.maps.Marker({position: pt, title: "Downtown Crossing Station", icon: tico}));
			redStations.push(pt);
		pt = new google.maps.LatLng(42.352271, -71.055242);
		markers.push(new google.maps.Marker({position: pt, title: "South Station", icon: tico}));
			redStations.push(pt);
		pt = new google.maps.LatLng(42.342622, -71.056967);
		markers.push(new google.maps.Marker({position: pt, title: "Broadway Station", icon: tico}));
			redStations.push(pt);
		pt = new google.maps.LatLng(42.330154, -71.057655);
		markers.push(new google.maps.Marker({position: pt, title: "Andrew Station", icon: tico}));
			redStations.push(pt);
		pt = new google.maps.LatLng(42.320685, -71.052391);
		markers.push(new google.maps.Marker({position: pt, title: "JFK/UMass Station", icon: tico}));
			redStations.push(pt);
			redBranchAshmont.push(pt);
			redBranchBraintree.push(pt);
		pt = new google.maps.LatLng(42.31129, -71.053331);
		markers.push(new google.maps.Marker({position: pt, title: "Savin Hill Station", icon: tico}));
			redBranchAshmont.push(pt);
		pt = new google.maps.LatLng(42.275275, -71.029583);
		markers.push(new google.maps.Marker({position: pt, title: "North Quincy Station", icon: tico}));
			redBranchBraintree.push(pt);
		pt = new google.maps.LatLng(42.2665139, -71.0203369);
		markers.push(new google.maps.Marker({position: pt, title: "Wollaston Station", icon: tico}));
			redBranchBraintree.push(pt);
		pt = new google.maps.LatLng(42.300093, -71.061667);
		markers.push(new google.maps.Marker({position: pt, title: "Fields Corner Station", icon: tico}));
			redBranchAshmont.push(pt);
		pt = new google.maps.LatLng(42.251809, -71.005409);
		markers.push(new google.maps.Marker({position: pt, title: "Quincy Center Station", icon: tico}));
			redBranchBraintree.push(pt);
		pt = new google.maps.LatLng(42.29312583, -71.06573796);
		markers.push(new google.maps.Marker({position: pt, title: "Shawmut Station", icon: tico}));
			redBranchAshmont.push(pt);
		pt = new google.maps.LatLng(42.233391, -71.007153);
		markers.push(new google.maps.Marker({position: pt, title: "Quincy Adams Station", icon: tico}));
			redBranchBraintree.push(pt);
		pt = new google.maps.LatLng(42.284652, -71.064489);
		markers.push(new google.maps.Marker({position: pt, title: "Ashmont Station", icon: tico}));
			redBranchAshmont.push(pt);
		pt = new google.maps.LatLng(42.2078543, -71.0011385);
		markers.push(new google.maps.Marker({position: pt, title: "Braintree Station", icon: tico}));
			redBranchBraintree.push(pt);

		// Render markers to map
		for (var m in markers) {
			var that = this;
			markers[m].setMap(map);
			google.maps.event.addListener(markers[m], 'click', function() {
				stopName = this.title;
				var stationData = that.getJSON("http://mbtamap-cedar.herokuapp.com/mapper/station_schedule_all.json?stop_name=" + stopName);
				console.log(stationData);
				mvcObj = this;
				infowindow.setContent(stationData + "!!!");	
				infowindow.open(map, mvcObj);
			});
		}
		redLine = new google.maps.Polyline({
			path: redStations,
			strokeColor: "#FF0000",
			strokeOpacity: 1.0,
			strokeWeight: 5
		});
		redLine.setMap(map);
		redLineAshmont = new google.maps.Polyline({
			path: redBranchAshmont,
			strokeColor: "#FF0000",
			strokeOpacity: 1.0,
			strokeWeight: 5
		});
		redLineAshmont.setMap(map);
		redLineBraintree = new google.maps.Polyline({
			path: redBranchBraintree,
			strokeColor: "#FF0000",
			strokeOpacity: 1.0,
			strokeWeight: 5
		});
		redLineBraintree.setMap(map);
	},
	getJSON: function(url) {
		console.log("!!");
	    if (window.XMLHttpRequest) { // Mozilla, Safari, ...
	      httpRequest = new XMLHttpRequest();
	    } else if (window.ActiveXObject) { // IE
	      try {
	        httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
	      } 
	      catch (e) {
	        try {
	          httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
	        } 
	        catch (e) {}
	      }
	    }
	 
	    if (!httpRequest) {
	      alert('Giving up : Cannot create an XMLHTTP instance');
	      return false;
	    }

	    httpRequest.open('GET', url, false);
	    httpRequest.send();
	    return httpRequest.responseText;


	  function alertContents() {
	    if (httpRequest.readyState === 4) {
	      if (httpRequest.status === 200) {
	        return httpRequest.responseText;
	      } else {
	        alert('There was a problem with the request.');
	      }
	    }
	  }
	},
	placeDesirables: function() {
		var carmenAndWaldo = this.getJSON("http://messagehub.herokuapp.com/a3.json")
		var map = this.map;
		carmenAndWaldo = JSON.parse(carmenAndWaldo);
		console.log(carmenAndWaldo);
		var carmen = "carmen.png";
		var waldo = "waldo.png";
		var mark;

		for (var i = 0; i < carmenAndWaldo.length; i++){
			console.log(carmenAndWaldo[i]);
			mark = new google.maps.Marker({
				position: new google.maps.LatLng(carmenAndWaldo[i].loc.latitude, carmenAndWaldo[i].loc.latitude),
				title: carmenAndWaldo[i].name,
			});
			if (carmenAndWaldo[i].name == "Carmen Sandiego"){
				mark.setIcon(carmen);
			}
			else {
				mark.setIcon(waldo);
			}
			mark.setMap(map);
		}

	},
	getDistance: function(lat1, lon1, lat2, lon2) {

		var R = 6371; // km
		var dLat = (lat2-lat1).toRad();
		var dLon = (lon2-lon1).toRad();
		var lat1 = lat1.toRad();
		var lat2 = lat2.toRad();
		var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		return R * c;
	},
	getUserLocation: function() {
		var that = this;
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				that.userLat = position.coords.latitude;
				that.userLon = position.coords.longitude;
				this.placeDesirables();

			});
		}
	}
};
