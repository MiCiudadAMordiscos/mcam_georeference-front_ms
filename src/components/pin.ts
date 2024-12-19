import type { RestaurantPoint } from "@services/fetch_near_restaurants";

// zoom al aprimir el marcador
const zoom = 18;
// configuración del marcador
const mcam_icono = L.icon({
    iconUrl: "src/assets/Icono.svg",
    iconSize: [75, 75],
    // donde se ve el pop up
    popupAnchor: [-3, -25],
});

//colocar pin por latitud y longitud
export function placePin(
    map: any,
    ubicacion_restaurante: RestaurantPoint,
) {
    var marker = L.marker([
        ubicacion_restaurante.lat,
        ubicacion_restaurante.lng,
    ], {
        autoPanOnFocus: false,
        icon: mcam_icono,
        title: ubicacion_restaurante.name,
        riseOnHover: true,
        //alt : 'Un marcador de mi ciudad a mordiscos'
    })
        .addTo(map)
        .bindPopup(ubicacion_restaurante.name);
    //.openPopup();
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
