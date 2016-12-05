module.exports = function(notFound) {
    var message = 'Missing required parameter' + (notFound.length > 1 ? 's' : '') + '.';
    return {
        error: {
            code: 400,
            name: 'Bad Request'
        },
        message: message,
        params: notFound
    };
}
