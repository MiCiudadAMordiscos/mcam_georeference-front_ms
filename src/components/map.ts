import {
    fetchRestaurants,
    type RestaurantPoint,
    type UserPoint,
} from "@services/fetch_near_restaurants";
import { placeRestaurantPin } from "@components/pin";

// constantes para el mapa
const zoom = 17,
    minZoom = 15,
    maxZoom = 19,
    timeout = 1000;

// ubicación fija mientras tanto
let x = 4.6097,
    y = -74.0817;

let location: UserPoint = { lat: x, lng: y };

export function createMap() {
    const map = L.map("leaflet", {
        zoom: zoom,
        //center: [location.latitud, location.longitud],
    });
    // dibujar el mapa por encima del leaflet
    L.tileLayer(`https://tile.openstreetmap.org/{z}/{x}/{y}.png`, {
        maxZoom: maxZoom,
        minZoom: minZoom,
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    //pedir ubicación, solo funciona con https
    map.locate({ timeout: timeout })
        // listeners para la ubicación
        .on("locationfound", (location: any) => console.log(location))
        .on("locationerror", (err: any) => {
            console.log(err);
            //
            map.setView(location);
            placeNearRestaurants(map, location);
        });
    return map;
}

function setMapBounds(map: any, places: any) {
    //crear los límites del mapa
    const bounds = L.latLngBounds(places);
    // reubicar el mapa a los nuevos límites
    map.flyToBounds(bounds);
}

export async function placeNearRestaurants(map: any, location: UserPoint) {
    let res: RestaurantPoint[] = (await fetchRestaurants(location))!;
    for (let loc of res) {
        placeRestaurantPin(map, loc);
        // guardar como como puntos con latitud y longitud
    }
    setMapBounds(map, res);
}
