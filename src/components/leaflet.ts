// el type es porque es un tipo xd
import type { Ubicacion } from "@services/fetch_near_restaurants";
//obtener lista de restaurantes
import { fetchRestaurants } from "@services/fetch_near_restaurants";
import { colocarMarcador } from "@components/marcador";

// constantes para el mapa 
export const 
    zoom = 17,
    maxZoom = 20,
    timeout = 10000;

// ubicación fija mientras tanto 
let x = 35.652832,
    y = 139.839478;

var map = L.map("leaflet", {
    center: [x, y],
    zoom: zoom,
});

//pedir ubicación, solo funciona por ssh
let user_location = map.locate({ setView: true, timeout: timeout });
//manejar error de ubicación
//map.on("locationerror", (err: any) => console.log(err));

// dibujar el mapa por encima del leaflet
L.tileLayer(`https://tile.openstreetmap.org/{z}/{x}/{y}.png`, {
    maxZoom: maxZoom,
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// PRUEBAS
let res: Ubicacion[] = [
    { latitud: 35.652832, longitud: 139.839478 }, // Punto original
    { latitud: 35.653000, longitud: 139.839800 }, // 20 metros al noreste
    { latitud: 35.652500, longitud: 139.839300 }, // 30 metros al suroeste
    { latitud: 35.652900, longitud: 139.838900 }, // 50 metros al oeste
    { latitud: 35.652600, longitud: 139.839600 }, // 25 metros al sureste
    { latitud: 35.653200, longitud: 139.839000 }, // 40 metros al norte
    { latitud: 35.652700, longitud: 139.839200 }, // 10 metros al sur
    { latitud: 35.652800, longitud: 139.838800 }, // 45 metros al oeste
    { latitud: 35.652950, longitud: 139.839400 }, // 15 metros al este
    { latitud: 35.652850, longitud: 139.839550 }, // 20 metros al noreste
];

for (let loc of res) {
    colocarMarcador(map, loc.latitud, loc.longitud);
}
