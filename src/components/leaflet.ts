let x = 35.652832,
    y = 139.839478,
    zoom = 13,
    maxZoom = 19,
    timeout = 10000;
var map = L.map("leaflet", {
    center: [x, y],
    zoom: zoom,
});
//pedir ubicación, solo funciona por ssh
map.locate({ setView: true, timeout: timeout });
map.on("locationerror", (err: any) => console.log(err));

L.tileLayer(`https://tile.openstreetmap.org/{z}/{x}/{y}.png`, {
    maxZoom: maxZoom,
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

var marker = L.marker([35.653, 139.9], {
    autoPanOnFocus: false,
})
    .addTo(map)
    .bindPopup("A pretty CSS popup.<br> Easily customizable.");
marker.on("click", (event: any) => map.flyTo(event.target._latlng, maxZoom));
