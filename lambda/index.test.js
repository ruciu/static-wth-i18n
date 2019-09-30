const { handler } = require('./index');

const createMockCallback = () => jest.fn((error, response) => undefined);

test('It should redirect to language when it goes to index', () => {
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
                        "uri": "/",
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
    expect(response.status).toEqual(301);
    const locationHeader = response.headers.Location[0];
    expect(locationHeader.value).toEqual('https://d76k91vi4ppj8.cloudfront.net/pl/');
});

test('It should change uri to /en/index.html for /en/', () => {
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
                        "uri": "/en/",
                        "method": "GET",
                        "headers": {
                            "host": [
                                {
                                    "key": "Host",
                                    "value": "d111111abcdef8.cloudfront.net"
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
    expect(response.uri).toEqual('/en/index.html');
});

test('it should do nothing for properly formed link', () => {
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
                        "uri": "/en/site.html",
                        "method": "GET",
                        "headers": {
                            "host": [
                                {
                                    "key": "Host",
                                    "value": "d111111abcdef8.cloudfront.net"
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
                                "domainName": "example.com",
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
    expect(response.uri).toEqual('/en/site.html');
});

test('Should redirect to index for /en', () => {
    const mockCallback = createMockCallback();
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
                        "uri": "/en",
                        "method": "GET",
                        "headers": {
                            "host": [
                                {
                                    "key": "Host",
                                    "value": "d111111abcdef8.cloudfront.net"
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
                                "domainName": "example.com",
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
                    }
                }
            }
        ]
    };
    handler(event, {}, mockCallback);
    const args = mockCallback.mock.calls[0];
    expect(args[0]).toEqual(null);
    const response = args[1];
    expect(response.uri).toEqual('/en/index.html');
});

test('Should redirect to page.html for /en/page', () => {
    const mockCallback = createMockCallback();
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
                        "uri": "/en/page",
                        "method": "GET",
                        "headers": {
                            "host": [
                                {
                                    "key": "Host",
                                    "value": "d111111abcdef8.cloudfront.net"
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
                                "domainName": "example.com",
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
                    }
                }
            }
        ]
    };
    handler(event, {}, mockCallback);
    const args = mockCallback.mock.calls[0];
    expect(args[0]).toEqual(null);
    const response = args[1];
    expect(response.uri).toEqual('/en/page.html');
});

test('Shouldnt touch static files', () => {
    const mockCallback = createMockCallback();
    const url = '/static/img/image.png';
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
                        "uri": `${url}`,
                        "method": "GET",
                        "headers": {
                            "host": [
                                {
                                    "key": "Host",
                                    "value": "d111111abcdef8.cloudfront.net"
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
                                "domainName": "example.com",
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
                    }
                }
            }
        ]
    };
    handler(event, {}, mockCallback);
    const args = mockCallback.mock.calls[0];
    expect(args[0]).toEqual(null);
    const response = args[1];
    expect(response.uri).toEqual(url);
});

test('Shouldnt touch _next files', () => {
    const mockCallback = createMockCallback();
    const url = '/_next/static/6FMP6TI1U0PteDzVjIfMc/pages/_app.js';
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
                        "uri": `${url}`,
                        "method": "GET",
                        "headers": {
                            "host": [
                                {
                                    "key": "Host",
                                    "value": "d111111abcdef8.cloudfront.net"
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
                                "domainName": "example.com",
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
                    }
                }
            }
        ]
    };
    handler(event, {}, mockCallback);
    const args = mockCallback.mock.calls[0];
    expect(args[0]).toEqual(null);
    const response = args[1];
    expect(response.uri).toEqual(url);
});

test('Shouldnt touch service-worker.js', () => {
    const mockCallback = createMockCallback();
    const url = '/service-worker.js';
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
                        "uri": `${url}`,
                        "method": "GET",
                        "headers": {
                            "host": [
                                {
                                    "key": "Host",
                                    "value": "d111111abcdef8.cloudfront.net"
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
                                "domainName": "example.com",
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
                    }
                }
            }
        ]
    };
    handler(event, {}, mockCallback);
    const args = mockCallback.mock.calls[0];
    expect(args[0]).toEqual(null);
    const response = args[1];
    expect(response.uri).toEqual(url);
});

test('It should redirect to correct language when it goes to page without language in it', () => {
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
                        "uri": "/site",
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
    expect(response.status).toEqual(302);
    const locationHeader = response.headers.Location[0];
    expect(locationHeader.value).toEqual('https://d76k91vi4ppj8.cloudfront.net/pl/site');
});

test('It shouldnt redirect robots', () => {
    const mockCallback = createMockCallback();
    const url = '/';
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
                        "uri": `${url}`,
                        "method": "GET",
                        "headers": {
                            "host": [
                                {
                                    "key": "Host",
                                    "value": "d111111abcdef8.cloudfront.net"
                                }
                            ],
                            "user-agent": [
                                {
                                    "key": "User-Agent",
                                    "value": "Slackbot-LinkExpanding 1.0"
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
                                "domainName": "example.com",
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
                    }
                }
            }
        ]
    };
    handler(event, {}, mockCallback);
    const args = mockCallback.mock.calls[0];
    expect(args[0]).toEqual(null);
    const response = args[1];
    expect(response.uri).toEqual(url);
});

