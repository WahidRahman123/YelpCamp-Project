
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v11', // style URL
    center: campgroundRes.geometry.coordinates, // starting position [lng, lat]
    zoom: 6, // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());


new mapboxgl.Marker()
    .setLngLat(campgroundRes.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset: 25})
        .setHTML(
            `<h4>${campgroundRes.title}</h4><p>${campgroundRes.location}</p>`
        )
    )
    .addTo(map);