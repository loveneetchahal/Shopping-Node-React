import { API } from "../../backend";

const getProducts = () => {
    return fetch(`${API}/products`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export default getProducts;