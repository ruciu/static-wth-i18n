const { handler } = require('./index');

const createMockCallback = () => jest.fn((error, response) => undefined);

test('It should redirect to 404 page with correct language', () => {
    const event = {
        "Records": [
            {
                "cf": {
                    "config": {
                        "distributionDomainName": "d123.cloudfront.net",
                        "distributionId": "EDFDVBD6EXAMPLE",
                        "eventType": "viewer-request",
                        "requestId": "MRVMF7KydIvxMWfJIglgwHQwZsbG2IhRJ07sn9AkKUFSHS9EXAMPLE=="
                    },
                    "request": {
                        "body": {
                            "action": "read-only",
                            "data": "eyJ1c2VybmFtZSI6IkxhbWJkYUBFZGdlIiwiY29tbWVudCI6IlRoaXMgaXMgcmVxdWVzdCBib2R5In0=",
                            "encoding": "base64",
                            "inputTruncated": false
                        },
                        "clientIp": "2001:0db8:85a3:0:0:8a2e:0370:7334",
                        "querystring": "size=large",
                        "uri": "/en/non-existent",
                        "method": "GET",
                        "headers": {
                            "host": [
                                {
                                    "key": "Host",
                                    "value": "d76k91vi4ppj8.cloudfront.net"
                                }
                            ],
                            "user-agent": [
                                {
                                    "key": "User-Agent",
                                    "value": "curl/7.51.0"
                                }
                            ],
                            "accept-language": [
                                {
                                    "key": "Accept-Language",
                                    "value": "pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7"
                                }
                            ],
                        },
                        "origin": {
                            "custom": {
                                "customHeaders": {
                                    "my-origin-custom-header": [
                                        {
                                            "key": "My-Origin-Custom-Header",
                                            "value": "Test"
                                        }
                                    ]
                                },
                                "domainName": "d76k91vi4ppj8.cloudfront.net",
                                "keepaliveTimeout": 5,
                                "path": "/custom_path",
                                "port": 443,
                                "protocol": "https",
                                "readTimeout": 5,
                                "sslProtocols": [
                                    "TLSv1",
                                    "TLSv1.1"
                                ]
                            },
                            "s3": {
                                "authMethod": "origin-access-identity",
                                "customHeaders": {
                                    "my-origin-custom-header": [
                                        {
                                            "key": "My-Origin-Custom-Header",
                                            "value": "Test"
                                        }
                                    ]
                                },
                                "domainName": "my-bucket.s3.amazonaws.com",
                                "path": "/s3_path",
                                "region": "us-east-1"
                            }
                        }
                    },
                    "response": {
                        "status": "404",
                        "statusDescription": "Not found",
                        "headers": {
                            "server": [
                                {
                                    "key": "Server",
                                    "value": "MyCustomOrigin"
                                }
                            ],
                            "set-cookie": [
                                {
                                    "key": "Set-Cookie",
                                    "value": "theme=light"
                                },
                                {
                                    "key": "Set-Cookie",
                                    "value": "sessionToken=abc123; Expires=Wed, 09 Jun 2021 10:18:14 GMT"
                                }
                            ]
                        }
                    }
                }
            }
        ]
    };
    const mockCallback = createMockCallback();
    handler(event, {}, mockCallback);
    const args = mockCallback.mock.calls[0];
    expect(args[0]).toEqual(null);
    const response = args[1];
    expect(response.status).toEqual('302');
    const locationHeader = response.headers.Location[0];
    expect(locationHeader.value).toEqual('https://d76k91vi4ppj8.cloudfront.net/en/404');
});

test('Should change code for /en/404 to 404', () => {
    const event = {
        "Records": [
            {
                "cf": {
                    "config": {
                        "distributionDomainName": "d123.cloudfront.net",
                        "distributionId": "EDFDVBD6EXAMPLE",
                        "eventType": "viewer-request",
                        "requestId": "MRVMF7KydIvxMWfJIglgwHQwZsbG2IhRJ07sn9AkKUFSHS9EXAMPLE=="
                    },
                    "request": {
                        "body": {
                            "action": "read-only",
                            "data": "eyJ1c2VybmFtZSI6IkxhbWJkYUBFZGdlIiwiY29tbWVudCI6IlRoaXMgaXMgcmVxdWVzdCBib2R5In0=",
                            "encoding": "base64",
                            "inputTruncated": false
                        },
                        "clientIp": "2001:0db8:85a3:0:0:8a2e:0370:7334",
                        "querystring": "size=large",
                        "uri": "/en/404.html",
                        "method": "GET",
                        "headers": {
                            "host": [
                                {
                                    "key": "Host",
                                    "value": "d76k91vi4ppj8.cloudfront.net"
                                }
                            ],
                            "user-agent": [
                                {
                                    "key": "User-Agent",
                                    "value": "curl/7.51.0"
                                }
                            ],
                            "accept-language": [
                                {
                                    "key": "Accept-Language",
                                    "value": "pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7"
                                }
                            ],
                        },
                        "origin": {
                            "custom": {
                                "customHeaders": {
                                    "my-origin-custom-header": [
                                        {
                                            "key": "My-Origin-Custom-Header",
                                            "value": "Test"
                                        }
                                    ]
                                },
                                "domainName": "d76k91vi4ppj8.cloudfront.net",
                                "keepaliveTimeout": 5,
                                "path": "/custom_path",
                                "port": 443,
                                "protocol": "https",
                                "readTimeout": 5,
                                "sslProtocols": [
                                    "TLSv1",
                                    "TLSv1.1"
                                ]
                            },
                            "s3": {
                                "authMethod": "origin-access-identity",
                                "customHeaders": {
                                    "my-origin-custom-header": [
                                        {
                                            "key": "My-Origin-Custom-Header",
                                            "value": "Test"
                                        }
                                    ]
                                },
                                "domainName": "my-bucket.s3.amazonaws.com",
                                "path": "/s3_path",
                                "region": "us-east-1"
                            }
                        }
                    },
                    "response": {
                        "status": "200",
                        "statusDescription": "OK",
                        "headers": {
                            "server": [
                                {
                                    "key": "Server",
                                    "value": "MyCustomOrigin"
                                }
                            ],
                            "set-cookie": [
                                {
                                    "key": "Set-Cookie",
                                    "value": "theme=light"
                                },
                                {
                                    "key": "Set-Cookie",
                                    "value": "sessionToken=abc123; Expires=Wed, 09 Jun 2021 10:18:14 GMT"
                                }
                            ]
                        }
                    }
                }
            }
        ]
    };
    const mockCallback = createMockCallback();
    handler(event, {}, mockCallback);
    const args = mockCallback.mock.calls[0];
    expect(args[0]).toEqual(null);
    const response = args[1];
    expect(response.status).toEqual('404');
});


