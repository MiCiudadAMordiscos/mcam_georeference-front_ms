import { error } from "node_modules/astro/dist/core/logger/core";

//url para el post
const api_gateway_url = "http://localhost:8080";

// estructura de la ubicación
export interface Ubicacion {
    latitud: number;
    longitud: number;
}

export async function fetchRestaurants(
    latitud: number,
    longitud: number,
) {
    let coordinates: Ubicacion = { latitud: latitud, longitud: longitud };
    return fetch(api_gateway_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(coordinates),
        // recibe la respuesta
    }).then((res) => {
        // verifica que este bien
        if (!res.ok) {
            throw new Error(
                `Error en la respuesta fetchRestaurants ${res.status}`,
            );
        }
        return res.json();
        //maneja la data
    }).then((data: Ubicacion[]) => {
        return data;
    }).catch((error) =>
        console.error("Algo salió mal enviando la ubicación fetchRestaurants: ", error)
    );
}

//pruebas
const location: Ubicacion = {
    latitud: 40.7128,
    longitud: -74,
};
