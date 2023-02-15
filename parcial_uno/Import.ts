import axios from 'axios';

export const reqApi = axios.create({
    baseURL:'https://pokeapi.co/api/v2/pokemon/',
})
