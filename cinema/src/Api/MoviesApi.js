import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:7777/';

export const getAllMovies = () => {
    return axios.get('movies')
        .then((response) => {
          // console.log("response", response.data)
            return response.data;
        })
        .catch((error) => {
            return error;
        });
}

export const getMovie = (id) => {
    return axios.get('movies/' + id)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
}

export const addMovie = (body) => {
    console.log("MoviesApi post", body.data)
    console.log("MoviesApi post", body)
    return axios.post("/movies", body)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
}

export const editMovie = (id, body) => {
    return axios.put("/movies/" + id, body)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
}

export const deleteMovie = (id) => {
    return axios.delete("/movies/" + id)
        .then(response => {
            return response;
        })
        .catch((error) => {
            return error;
        });
}
