/*
 * Copyright 2010-2016 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

var apigClientFactory = {};
apigClientFactory.newClient = function (config) {
    var apigClient = { };
    if(config === undefined) {
        config = {
            accessKey: '',
            secretKey: '',
            sessionToken: '',
            region: '',
            apiKey: undefined,
            defaultContentType: 'application/json',
            defaultAcceptType: 'application/json'
        };
    }
    if(config.accessKey === undefined) {
        config.accessKey = '';
    }
    if(config.secretKey === undefined) {
        config.secretKey = '';
    }
    if(config.apiKey === undefined) {
        config.apiKey = '';
    }
    if(config.sessionToken === undefined) {
        config.sessionToken = '';
    }
    if(config.region === undefined) {
        config.region = 'us-east-1';
    }
    //If defaultContentType is not defined then default to application/json
    if(config.defaultContentType === undefined) {
        config.defaultContentType = 'application/json';
    }
    //If defaultAcceptType is not defined then default to application/json
    if(config.defaultAcceptType === undefined) {
        config.defaultAcceptType = 'application/json';
    }

    
    // extract endpoint and path from url
    var invokeUrl = 'https://eods3s8ki0.execute-api.eu-west-1.amazonaws.com/dev';
    var endpoint = /(^https?:\/\/[^\/]+)/g.exec(invokeUrl)[1];
    var pathComponent = invokeUrl.substring(endpoint.length);

    var sigV4ClientConfig = {
        accessKey: config.accessKey,
        secretKey: config.secretKey,
        sessionToken: config.sessionToken,
        serviceName: 'execute-api',
        region: config.region,
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var authType = 'NONE';
    if (sigV4ClientConfig.accessKey !== undefined && sigV4ClientConfig.accessKey !== '' && sigV4ClientConfig.secretKey !== undefined && sigV4ClientConfig.secretKey !== '') {
        authType = 'AWS_IAM';
    }

    var simpleHttpClientConfig = {
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var apiGatewayClient = apiGateway.core.apiGatewayClientFactory.newClient(simpleHttpClientConfig, sigV4ClientConfig);
    
    
    
    apigClient.rootOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var rootOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(rootOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.loginBasicPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var loginBasicPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/login/basic').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(loginBasicPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.loginBasicOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var loginBasicOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/login/basic').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(loginBasicOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.loginUUIDBasicPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var loginUUIDBasicPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/loginUUID/basic').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(loginUUIDBasicPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.loginUUIDBasicOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var loginUUIDBasicOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/loginUUID/basic').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(loginUUIDBasicOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.logoutBasicPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var logoutBasicPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/logout/basic').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(logoutBasicPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.logoutBasicOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var logoutBasicOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/logout/basic').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(logoutBasicOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.mobileconfigAppIdOrgIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['appId', 'orgId'], ['body']);
        
        var mobileconfigAppIdOrgIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/mobileconfig/{appId}/{orgId}').expand(apiGateway.core.utils.parseParametersToObject(params, ['appId', 'orgId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(mobileconfigAppIdOrgIdGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.mobileconfigAppIdOrgIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var mobileconfigAppIdOrgIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/mobileconfig/{appId}/{orgId}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(mobileconfigAppIdOrgIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.permissionsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['userId', 'orgId'], ['body']);
        
        var permissionsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/permissions').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['userId', 'orgId']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(permissionsGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.permissionsPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['userId', 'orgId'], ['body']);
        
        var permissionsPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/permissions').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['userId', 'orgId']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(permissionsPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.permissionsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var permissionsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/permissions').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(permissionsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.pushPublishTopicPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var pushPublishTopicPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/push/publish/topic').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(pushPublishTopicPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.pushPublishTopicOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var pushPublishTopicOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/push/publish/topic').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(pushPublishTopicOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.pushPublishUserPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var pushPublishUserPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/push/publish/user').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(pushPublishUserPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.pushPublishUserOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var pushPublishUserOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/push/publish/user').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(pushPublishUserOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.pushRegisterPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var pushRegisterPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/push/register').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(pushRegisterPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.pushRegisterOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var pushRegisterOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/push/register').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(pushRegisterOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.recordsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId', 'projection', 'name', 'type', 'createdBy'], ['body']);
        
        var recordsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/records').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['orgId', 'projection', 'name', 'type', 'createdBy']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(recordsGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.recordsPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId', 'body'], ['body']);
        
        var recordsPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/records').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['orgId', ]),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(recordsPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.recordsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var recordsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/records').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(recordsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.recordsSearchPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId', 'body', 'projection'], ['body']);
        
        var recordsSearchPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/records/search').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['orgId', 'projection']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(recordsSearchPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.recordsIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId', 'id', 'projection'], ['body']);
        
        var recordsIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/records/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['orgId', 'projection']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(recordsIdGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.recordsIdPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId', 'id', 'body'], ['body']);
        
        var recordsIdPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/records/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['orgId', ]),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(recordsIdPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.recordsIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);
        
        var recordsIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/records/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(recordsIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.reportsOrgidRoundsRoundIdReportS3Get = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['roundId', 'orgid'], ['body']);
        
        var reportsOrgidRoundsRoundIdReportS3GetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/reports/{orgid}/rounds/{roundId}/report-s3').expand(apiGateway.core.utils.parseParametersToObject(params, ['roundId', 'orgid'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(reportsOrgidRoundsRoundIdReportS3GetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.reportsOrgidRoundsRoundIdReportS3Options = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var reportsOrgidRoundsRoundIdReportS3OptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/reports/{orgid}/rounds/{roundId}/report-s3').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(reportsOrgidRoundsRoundIdReportS3OptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.templatesGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId', 'projection', 'name', 'type', 'createdBy'], ['body']);
        
        var templatesGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/templates').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['orgId', 'projection', 'name', 'type', 'createdBy']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(templatesGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.templatesPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId', 'body'], ['body']);
        
        var templatesPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/templates').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['orgId', ]),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(templatesPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.templatesOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var templatesOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/templates').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(templatesOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.templatesSearchPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId', 'body', 'projection'], ['body']);
        
        var templatesSearchPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/templates/search').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['orgId', 'projection']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(templatesSearchPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.templatesIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId', 'id', 'projection'], ['body']);
        
        var templatesIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/templates/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['orgId', 'projection']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(templatesIdGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.templatesIdPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId', 'id', 'body'], ['body']);
        
        var templatesIdPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/templates/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['orgId', ]),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(templatesIdPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.templatesIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);
        
        var templatesIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/templates/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(templatesIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.useradminOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var useradminOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/useradmin').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(useradminOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.useradminOrgIdUsersGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId', 'AttributesToGet', 'PaginationToken', 'Limit'], ['body']);
        
        var useradminOrgIdUsersGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/useradmin/{orgId}/users').expand(apiGateway.core.utils.parseParametersToObject(params, ['orgId', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['AttributesToGet', 'PaginationToken', 'Limit']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(useradminOrgIdUsersGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.useradminOrgIdUsersPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId'], ['body']);
        
        var useradminOrgIdUsersPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/useradmin/{orgId}/users').expand(apiGateway.core.utils.parseParametersToObject(params, ['orgId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(useradminOrgIdUsersPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.useradminOrgIdUsersOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var useradminOrgIdUsersOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/useradmin/{orgId}/users').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(useradminOrgIdUsersOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.useradminOrgIdUsersUserIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['userId', 'orgId'], ['body']);
        
        var useradminOrgIdUsersUserIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/useradmin/{orgId}/users/{userId}').expand(apiGateway.core.utils.parseParametersToObject(params, ['userId', 'orgId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(useradminOrgIdUsersUserIdGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.useradminOrgIdUsersUserIdPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['userId', 'orgId', 'action'], ['body']);
        
        var useradminOrgIdUsersUserIdPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/useradmin/{orgId}/users/{userId}').expand(apiGateway.core.utils.parseParametersToObject(params, ['userId', 'orgId', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['action']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(useradminOrgIdUsersUserIdPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.useradminOrgIdUsersUserIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var useradminOrgIdUsersUserIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/useradmin/{orgId}/users/{userId}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(useradminOrgIdUsersUserIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.useradminOrgIdUsersUserIdPermissionsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['userId', 'orgId'], ['body']);
        
        var useradminOrgIdUsersUserIdPermissionsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/useradmin/{orgId}/users/{userId}/permissions').expand(apiGateway.core.utils.parseParametersToObject(params, ['userId', 'orgId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(useradminOrgIdUsersUserIdPermissionsGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.useradminOrgIdUsersUserIdPermissionsPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['userId', 'orgId'], ['body']);
        
        var useradminOrgIdUsersUserIdPermissionsPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/useradmin/{orgId}/users/{userId}/permissions').expand(apiGateway.core.utils.parseParametersToObject(params, ['userId', 'orgId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(useradminOrgIdUsersUserIdPermissionsPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.useradminOrgIdUsersUserIdPermissionsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var useradminOrgIdUsersUserIdPermissionsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/useradmin/{orgId}/users/{userId}/permissions').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(useradminOrgIdUsersUserIdPermissionsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.useradminOrgIdUsersearchGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId', 'name'], ['body']);
        
        var useradminOrgIdUsersearchGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/useradmin/{orgId}/usersearch').expand(apiGateway.core.utils.parseParametersToObject(params, ['orgId', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['name']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(useradminOrgIdUsersearchGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.useradminOrgIdUsersearchOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var useradminOrgIdUsersearchOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/useradmin/{orgId}/usersearch').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(useradminOrgIdUsersearchOptionsRequest, authType, additionalParams, config.apiKey);
    };
    

    return apigClient;
};
