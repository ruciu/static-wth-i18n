exports.handler = (event, context, callback) => {
    const { request, response } = event.Records[0].cf;

    // redirect all misses from origin to 404 page
    if (response.status === '404') {
        response.status = '302';
        response.statusDescription = 'Found';
        response.body = '';
        const domain = request.headers['host'][0].value;
        const languageRe = /^\/(pl|en)(\/(.*))*/;
        const language = languageRe.exec(request.uri);
        response.headers['Location'] = [{
            value: `https://${domain}/${language[1]}/404`
        }];
        return callback(null, response);
    }
    // check if uri ends with 404.html and change code to 404 if it is
    const regexNotFound = /(.*)404.html$/;
    const is404PageRequest = regexNotFound.test(request.uri);
    if (is404PageRequest) {
        response.status = '404';
        response.statusDescription = 'Not Found';
    }
    callback(null, response);
};