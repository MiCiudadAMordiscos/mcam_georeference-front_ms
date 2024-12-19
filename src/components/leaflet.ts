// el type es porque es un tipo xd
import type {
    RestaurantPoint,
    UserPoint,
} from "@services/fetch_near_restaurants";
//obtener lista de restaurantes
import { fetchRestaurants } from "@services/fetch_near_restaurants";
import { placePin } from "@components/pin";
import { createMap } from "./map";


// ubicación fija mientras tanto
let x = 35.652832,
    y = 139.839478;

let location: UserPoint = { latitud: x, longitud: y };
const map = createMap(location);

// PRUEBAS

let res: RestaurantPoint[] = (await fetchRestaurants(location))!;

console.log(res);
for (let loc of res) {
    placePin(map, loc);
}
