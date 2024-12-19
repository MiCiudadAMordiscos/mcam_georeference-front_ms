import type { UserPoint } from "@services/fetch_near_restaurants";

// constantes para el mapa
export const zoom = 17,
    maxZoom = 20,
    timeout = 10000;

export function createMap(ubicacion: UserPoint) {
    let map = L.map("leaflet", {
        center: [ubicacion.latitud, ubicacion.longitud],
        zoom: zoom,
    });
    // dibujar el mapa por encima del leaflet
    L.tileLayer(`https://tile.openstreetmap.org/{z}/{x}/{y}.png`, {
        maxZoom: maxZoom,
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    return map;
    //pedir ubicación, solo funciona por ssh
    //let user_location = map.locate({ setView: true, timeout: timeout });
    //manejar error de ubicación
    //map.on("locationerror", (err: any) => console.log(err));
}
