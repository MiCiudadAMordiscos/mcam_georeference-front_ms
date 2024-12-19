import { maxZoom } from "@components/map";
import type { RestaurantPoint } from "@services/fetch_near_restaurants";

// configuración del marcador
const mcam_icono = L.icon({
    iconUrl: "src/assets/Icono.svg",
    iconSize: [50, 50],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
});

//colocar pin por latitud y longitud
export function placePin(
    map: any,
    ubicacion_restaurante : RestaurantPoint
) {
    var marker = L.marker([ubicacion_restaurante.latitud, ubicacion_restaurante.longitud], {
        autoPanOnFocus: false,
        icon: mcam_icono,
    })
        .addTo(map)
        .bindPopup(ubicacion_restaurante.nombre_restaurante)
        //.openPopup();
    // ir al pin y agrandar el mapa
    marker.on(
        "click",
        (event: any) => map.flyTo(event.target._latlng, maxZoom),
    );
}
