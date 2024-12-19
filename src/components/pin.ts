import type { RestaurantPoint } from "@services/fetch_near_restaurants";

// zoom al seleccionar el marcador
const zoom = 18;
// configuración del marcador
const mcam_icon = L.icon({
    iconUrl: "src/assets/Icono.svg",
    iconSize: [75, 75],
    // donde se ve el pop up
    popupAnchor: [-3, -25],
});

//colocar pin por latitud y longitud
export function placeRestaurantPin(
    map: any,
    ubicacion_restaurante: RestaurantPoint,
) {
    var marker = L.marker(ubicacion_restaurante, {
        autoPanOnFocus: true,
        icon: mcam_icon,
        title: ubicacion_restaurante.name,
        riseOnHover: true,
        //alt : 'Un marcador de mi ciudad a mordiscos'
    })
        .addTo(map)
        .bindPopup(ubicacion_restaurante.name);
    // ir al pin y agrandar el mapa
    marker.on(
        "popupopen",
        (event: any) => {
            const bounds = map.getBounds();
            map.flyTo(event.target._latlng, zoom);
            marker.on(
                "popupclose",
                (event: any) => map.flyToBounds(bounds),
            );
        },
    );
}
