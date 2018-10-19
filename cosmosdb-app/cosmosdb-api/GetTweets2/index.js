module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // sender is expected as a query parameter
    if(req.query.sender) {
        var tweets = context.bindings.tweets;
    
        context.res = {
            status: 200,
            body: tweets
        };
    } else {
        context.res = {
            status: 500
        };
    }

};