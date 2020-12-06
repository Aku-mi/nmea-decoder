function addMarker(coords, map, info) {
    let marker = new google.maps.Marker({
        position: coords,
        map,
        icon: "https://i.ibb.co/zVNGcnT/yate.png"
    });
    let aux = '<div><h5> ' + info + '</h5></div>';
    let infoWindow = new google.maps.InfoWindow({
        content: aux
    });
    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });
}

function initMap() {
    let options = {
        zoom: zoom,
        center: zoom === 2 ? { lat: 40, lng: -8 } : { lat: data[0].lat, lng: data[0].lon },
        disableDefaultUI: true,
        disableDoubleClickZoom: true,
        fullscreenControl: false,
        draggable: true,
        mapTypeControl: true,
        mapTypeControlOptions: { style: google.maps.MapTypeControlStyle.DROPDOWN_MENU },
        navigationControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    let map = new google.maps.Map(document.getElementById("map"), options);

    for (let i = 0; i < data.length; i++) {
        if (data[i].secuence !== "")
            addMarker({ lat: data[i].lat, lng: data[i].lon }, map, data[i].date);
    }
}