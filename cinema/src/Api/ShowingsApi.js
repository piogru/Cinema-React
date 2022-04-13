import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:7777/';

export const getShowings = () => {
    return axios.get('showings')
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
}

export const getShowing = (id) => {
    return axios.get('showings/' + id)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
}

export const addShowing = (body) => {
    return axios.post("/showings", body)
        .then((response) => {
          console.log("showings api response", response)
            return response;
        })
        .catch((error) => {
            return error;
        });
}

export const editShowing = (id, body) => {
    return axios.put("/showings/" + id, body)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
}

export const deleteShowing = (id) => {
    return axios.delete("/showings/" + id)
        .then(response => {
            return response;
        })
        .catch((error) => {
            return error;
        });
}
