import { maxZoom } from "@components/leaflet";

const mcam_icono = L.icon({
    iconUrl: "src/assets/Icono.svg",
    iconSize: [50, 50],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
});

//colocar pin por latitud y longitud
export function colocarMarcador(
    map: any,
    latitud: number,
    longitud: number,
    nombre: string = "Un restaurante",
) {
    var marker = L.marker([latitud, longitud], {
        autoPanOnFocus: false,
        icon: mcam_icono,
    })
        .addTo(map)
        .bindPopup(nombre);
    // ir al pin y agrandar el mapa
    marker.on(
        "click",
        (event: any) => map.flyTo(event.target._latlng, maxZoom),
    );
}
