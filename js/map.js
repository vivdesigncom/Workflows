function setMarkers(json) 
{
	var zoomLevel = 3;
	if (($(window).width() <= 1024)) {
		zoomLevel = 2;
	}
	var myOptions = {
		center: new google.maps.LatLng(42, 0),
		mapTypeControl: false,
		zoom:zoomLevel,
		//minZoom: 2,
		//panControl: false,
		zoomControl: false,
		  scaleControl: false,
		  scrollwheel: false,
		  disableDoubleClickZoom: true,
		zoomControlOptions: 
		{
			style: google.maps.ZoomControlStyle.LARGE,
			position: google.maps.ControlPosition.RIGHT_TOP
		}, 
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles: [
		         {
		             "featureType": "all",
		             "elementType": "labels",
		             "stylers": [
		                 {
		                     "visibility": "off"
		                 }
		             ]
		         },
		         {
		        	  "featureType": "administrative",
		        	  "elementType": "geometry",
		        	  "stylers": [
		        	    { "visibility": "off" }
		        	  ]
		         },
		         {
		             "featureType": "landscape",
		             "elementType": "all",
		             "stylers": [
		                 {
		                     "visibility": "on"
		                 },
		                 {
		                     "color": "#f3f4f4"
		                 }
		             ]
		         },
		         {
		             "featureType": "landscape.man_made",
		             "elementType": "geometry",
		             "stylers": [
		                 {
		                     "weight": 0.9
		                 },
		                 {
		                     "visibility": "off"
		                 }
		             ]
		         },
		         {
		             "featureType": "poi.park",
		             "elementType": "geometry.fill",
		             "stylers": [
		                 {
		                     "visibility": "on"
		                 },
		                 {
		                     "color": "#83cead"
		                 }
		             ]
		         },
		         {
		             "featureType": "road",
		             "elementType": "all",
		             "stylers": [
		                 {
		                     "visibility": "on"
		                 },
		                 {
		                     "color": "#ffffff"
		                 }
		             ]
		         },
		         {
		             "featureType": "road",
		             "elementType": "labels",
		             "stylers": [
		                 {
		                     "visibility": "off"
		                 }
		             ]
		         },
		         {
		             "featureType": "road.highway",
		             "elementType": "all",
		             "stylers": [
		                 {
		                     "visibility": "on"
		                 },
		                 {
		                     "color": "#fee379"
		                 }
		             ]
		         },
		         {
		             "featureType": "road.arterial",
		             "elementType": "all",
		             "stylers": [
		                 {
		                     "visibility": "on"
		                 },
		                 {
		                     "color": "#fee379"
		                 }
		             ]
		         },
		         {
		             "featureType": "water",
		             "elementType": "all",
		             "stylers": [
		                 {
		                     "visibility": "on"
		                 },
		                 {
		                     "color": "#d0dee9"
		                 }
		             ]
		         }
		     ]
	};
	
	var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

// Add markers to the map    
// Marker sizes are expressed as a Size of X,Y   
// where the origin of the image (0,0) is located   
// in the top left of the image.    
// Origins, anchor positions and coordinates of the marker   
// increase in the X direction to the right and in   
// the Y direction down.   

	var icon_isoquest = new google.maps.MarkerImage(
		'images/pin_isoquest.png',
		new google.maps.Size(40, 48),	// size
		new google.maps.Point(0,0),		// origin
		new google.maps.Point(20, 48)	// anchor
	);
	
	var icon_gqi = new google.maps.MarkerImage(
		'images/pin_gqigroup.png',
		new google.maps.Size(60, 40),	// size
		new google.maps.Point(0,0),		// origin
		new google.maps.Point(32, 40)	// anchor
	);
	
	var infowindow = new google.maps.InfoWindow();
	var markers = [];
	var bounds = new google.maps.LatLngBounds();
	for (var i = 0; i < json.feed.entry.length; i++) 
	{
		var entry = json.feed.entry[i];
		var lat = entry.gsx$latitude.$t;
		var lng = entry.gsx$longitude.$t;
		var title = entry.title.$t;
		var desc = entry.gsx$desc.$t;
		var icon = (entry.gsx$icon.$t == "gqi") ? icon_gqi : icon_isoquest;

		var zIndex = 1;
		if(icon.url == 'images/pin_gqigroup.png'){
			zIndex = 2;
		}
		
		var content = "<div class='baloon'><h3>"+title+"</h3><p>"+desc+"</p></div>";
		var position = new google.maps.LatLng(lat, lng);

		var marker = new google.maps.Marker({
			position: position,
			map: map,
//			shadow: shadow,
			icon: icon,
			title: title,
			zIndex: zIndex
		});  
		bounds.extend(position);
		markers.push(marker);

		google.maps.event.addListener(marker, 'click', (function(marker, content) { 
			if(marker.icon.url == 'images/pin_gqigroup.png'){
				return function ()
				{
					infowindow.setContent(content);
					infowindow.open(map,marker);
				};
			}
		})(marker, content));
	}
}