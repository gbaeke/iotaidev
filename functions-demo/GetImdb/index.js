axios = require('axios');

module.exports = async function (context, req) {
    context.log('Sample with axios');

    try {
        const {data: movie} = await axios.get("http://www.omdbapi.com/?apikey=dssdd&t=" + req.query.movie)
        if(movie) {
            return {
                body: `IMDB rating of ${movie.Title} is ${movie.imdbRating}\nPlot: ${movie.Plot}\n`
            }
        }
    } 
    catch(error) {
        console.log(error);
        return {
            body: "Error getting data",
            status: 500
        }
    }    
        
};