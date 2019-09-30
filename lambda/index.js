const parser = require('accept-language-parser');

const supportedLanguages = ['pl', 'en'];
const nonPageDirectories = [
    '/static',
    '/_next',
    '/service-worker.js'
];

const robotsRegex = /aolbuild|baidu|bingbot|bingpreview|msnbot|duckduckgo|adsbot-google|googlebot|mediapartners-google|teoma|slurp|yandex|bot|crawl|spider|slack/g;


exports.handler = (event, context, callback) => {
    const request = event.Records[0].cf.request;
    const userAgent = request['headers']['user-agent'][0]['value'].toLowerCase() || "";
    const isCrawler = userAgent.match(robotsRegex);
    // if its non page directory or crawler
    if (isCrawler || nonPageDirectories.some((directory) => request.uri.startsWith(directory))) {
        return callback(null, request);
    }
    // if it has language prepare response
    const languageRe = /^\/(pl|en)(\/(.*))*/;
    const hasLanguage = languageRe.exec(request.uri);
    if (hasLanguage) {
        // if is index go to index
        if (hasLanguage[2] === undefined || hasLanguage[2] === '/') {
            request.uri = `/${hasLanguage[1]}/index.html`;
        }
        // if doesnt have .html in the end add it
        const htmlRe = /.*(\.html)/;
        const htmlResult = htmlRe.exec(request.uri);
        if (!htmlResult) {
            request.uri = `${request.uri}.html`;
        }
        return callback(null, request);
    }

    const languageHeader = request.headers['accept-language'][0].value;
    const domain = request.headers['host'][0].value;
    const language = parser.pick(supportedLanguages, languageHeader, { loose: true }) || 'en';
    const response = {
        ...event.Records[0].cf.response,
        status: 302,
        headers: {
            'Location' : [{
                value: `https://${domain}/${language}${request.uri}`
            }]
        },
    };
    return callback(null, response);
};