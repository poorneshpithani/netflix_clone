//const { default: axios } = require("axios");

const axios = require('axios')

require("dotenv").config();

  
//   fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));

const fetchFromTMDB = async (url) => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer '+ process.env.TMDB_API_KEY
        }
      };
      const response = await axios.get(url, options);

      if(response.status !== 200){
        throw new Error("Failed to fetch data from TMDB " + response.statusText)
      }
      return response.data;
}


module.exports = fetchFromTMDB;