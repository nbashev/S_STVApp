var express = require('express');
var app = express();
var request = require('request');

var answer = {
    result: true,
    error: [],
    data: []
};
/* Данные о сервисах */
var methods = {
    getcatalog: [
        {
            service: 'serviceName', // Название сервиса латиницей
            method: 'GET', // Метод запроса
            methodUri: 'videos.get' // Вторая часть ссылки, содержащая методы и параметры
        },
        {
            service: 'serviceName',
            method: 'GET',
            methodUri: 'videos.get'
        }
    ]
};

var services = {
    'serviceName': {
        uri: 'https://api.serviceName.com/method/', // Первая часть ссылки на API сервиса
        token: null // Секретный код доступа token
    }
};

/* Запрос и анализ */
getData = function (methodName, index) {
    var method = methods[methodName][index];
    var requestParam = {};
    requestParam.uri = services[method.service].uri + method.methodUri;
    requestParam.method = method.method || 'GET';
    requestParam.headers = {
        'X-Auth-Token': (services[method.service].token) ? services[method.service].token : ''
    }

    request(requestParam, function (error, response, body) {
        if (error) {
            answer.result = false;
            answer.error[index] = 2;
            answer.data[index] = {};
            console.log("Ошибка: сервер не может выполнить запрос");
            return;
        }
        if (response.statusCode !== 200) {
            answer.result = false;
            answer.error[index] = response.statusCode;
            answer.data[index] = {};
            console.log("Ошибка: запрос к сервису возможно некорректный. Код:  " + response.statusCode);
            return;
        }

        var data = JSON.parse(body);
        if (data.error) {
            answer.result = false;
            answer.error[index] = 3;
            answer.data[index] = {};
            console.log("Ошибка: неправильный метод сервиса");
            return;
        }
        //Успешное выполнение answer.result = true;
        answer.data[index] = data;
    });
};

/* Запрос к серверу */
app.get('/:page', function (req, res) {
    var page = req.params.page;
    console.log("*Запрос: " + page);
    if (Object.keys(methods).indexOf(page) > -1){
        getData(page, 0);
        getData(page, 1);
    } else {
        answer.result = false;
        answer.error = 1;
        answer.data = {};
        console.log("Ошибка: " + page + " неправильный метод сервера");
    }
    res.status(200).jsonp(answer);
});

/* Запуск сервера */
app.listen(3000, function(){
    console.log("Сервер запущен успешно!");
});
