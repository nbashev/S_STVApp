(function () {
    "use strict";
    window.App.videos = [];
    var req="http://localhost:3000/getcatalog";

    $.ajax({
        url : req,
        type : "GET",
        dataType : "jsonp",
        success : function(data){
            console.log(data);
            var videos = data.data;
            if (data.result === true){
                window.App.videos = videos;
            } else {
                var errors = data.error;
                if (Array.isArray(errors)){
                    errors.forEach(function(item, i, errors){
                        if (item > 0){
                            window.App.videos[i] = {
                                title:"Видео не доступно",
                                url:"",
                                type: "",
                                ctg: ""
                            };
                            switch (item) {
                                case 2:
                                    window.App.videos[i].desc = "Сервис потоковой передачи не доступен";
                                    break;
                                case 3:
                                    window.App.videos[i].desc = "Неизвестный метод сервиса ";
                                    break;
                                default:
                                    window.App.videos[i].desc = "Ошибка " + item;
                            }
                        } else {
                            window.App.videos[i] = videos[i];
                        }
                    });
                } else {
                    window.App.videos = [
                        {
                            title:"Видео не доступно",
                            url:"",
                            desc: "Неизвестный метод сервера",
                            type: "",
                            ctg: ""
                        }

                    ];
                }
            }
        }
    });
    console.log(window.App.videos);
})();
