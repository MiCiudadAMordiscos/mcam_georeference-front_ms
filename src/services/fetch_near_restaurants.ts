//url para el post
const api_gateway_url = "http://localhost:8080";

// estructura de la ubicación
export interface RestaurantPoint {
    lat: number;
    lng: number;
    name: string;
}

export interface UserPoint {
    lat: number;
    lng: number;
}

export async function fetchRestaurants(
    coordinates: UserPoint,
) {
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
    }).then((data: RestaurantPoint[]) => {
        return data;
    }).catch((error) =>
        console.error(
            "Algo salió mal enviando la ubicación fetchRestaurants: ",
            error,
        )
    );
}
