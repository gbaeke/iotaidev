axios = require('axios');

module.exports = function (context, req) {
    context.log('Sample with axios');

    
    axios.get("http://www.omdbapi.com/?apikey=<APIKEY>&t=" + req.query.movie)
        .then((response) => {
            context.log("Got result...");
            // context.done() is implicitly called after this
            // note we did not use context.bindings.res here (syntax below more convenient)
            context.res.send(`IMDB rating of ${response.data.Title} is ${response.data.imdbRating}\nPlot: ${response.data.Plot}\n`);             
        })
        .catch((error) => {
            context.log("Error getting data...");
            context.res.status=500;
            context.res.send("Error getting data");
                     
        
        });
            
     
        
        
};