module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    sender = context.bindingData.sender;

    // sender is expected as a query parameter
    if(sender) {
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