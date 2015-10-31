
    var r=$('#txt').val();
    var forecast= [];
    var dt=[];
    var rob=[];
function aja(){
    var r=$('#txt').val();
    $('#menu').html('');
    $('#2').html('');
    $('#3').html('');
    $.ajax({
                    url: 'http://api.openweathermap.org/data/2.5/weather',
                    method: 'get',
                    data: {q: r, appid: '345b2115001d6d2f1f3a365a4075e3ad',lang: 'ru'},
                    dataType: 'jsonp',
                    crossDomain: true,
                    success : function(resp){
                        if(r.toUpperCase()!==resp.name.toUpperCase()){
                            alert("Ваш город не найден,но ,возможно, Вам подойдет этот,похожий на него")
                        }
                        $('#menu').html('<button class="btn btn-link" id="btn1" onclick="days5()" color:#C10C02>Температура на ближайшие дни</button>');
                        $('#menu').append('<button class="btn btn-link" id="btn2" onclick="diag()" >Изменение давления в городе</button>');
                        $('#menu').append('<button class="btn btn-link",data-toggle="dropdown" class="btn btn-default dropdown-toggle" id="btn3"   onclick="cit()">Города с одинаковым началом<span class="caret"></span></button>');
                        $('#menu').append('<div id="123"  style="width:1200px;height:34px" ><ul class="dropdown-menu" id="55"></ul></div>');
                        $('#city').html('<strong>Город:</strong>'+'&nbsp;'+'<font color="#B40404">'+resp.name);
                        $('#temp').html('<strong>Температура:</strong>'+'&nbsp;'+'<font color="#B40404">'+Math.round(resp.main.temp-270)+'&deg');
                        $('#pressure').html('<strong>Давление:</strong>'+'&nbsp;'+'<font color="#B40404">'+Math.round(resp.main.pressure*0.75)+"мм.рт.с");
                        $('#humidity').html('<strong>Влажность:</strong>'+'&nbsp;'+'<font color="#B40404">'+resp.main.humidity+"%");
                        $('#speedwind').html('<strong>Скорость ветра:</strong>'+'&nbsp;'+'<font color="#B40404">'+resp.wind.speed+"м/с");
                },
                    error: function(data){
                        alert("Извините,Ваш город не найден.Проверьте корректность вводимых данных");
                        $('#txt').val('');

                    }
                });
};

function days5(){
    var r=$('#txt').val();
    var forecast= [];

                $.ajax({
                    url: 'http://api.openweathermap.org/data/2.5/forecast/daily',
                    method: 'get',
                    data:{q: r,cnt:'5',appid: '345b2115001d6d2f1f3a365a4075e3ad',lang: 'ru'},
                    dataType:'jsonp',
                    crossDomain:true,
                    success:function(data){
                        for( i=0;i<5;i++)
                        {
                            forecast[i]=Math.round(data.list[i].temp.day-273);
                            dt[i]=new Date(data.list[i].dt*1000);
                        }
                        grap(forecast,dt,r);
                        },
                    error: function(){alert("Произошел сбой,повторите действие заново")}
                })
            };


    function diag(){
    var r=$('#txt').val();
                var pressure1= [];
                var dt=[];
                $.ajax({
                    url: 'http://api.openweathermap.org/data/2.5/forecast/daily',
                    method: 'get',
                    data:{q: r,cnt:'5',appid: '345b2115001d6d2f1f3a365a4075e3ad',lang: 'ru'},
                    dataType:'jsonp',
                    crossDomain:true,
                    success:function(data){
                        for( i=0;i<5;i++)
                        {
                            pressure1[i]=Math.round(data.list[i].pressure*0.75);
                            dt[i]=new Date(data.list[i].dt*1000);
                        }
                        diag2(pressure1,dt,r);
                    },
                    error: function(){alert("Произошел сбой,повторите действие заново")}
                })
            };

function cit(){
    var r=$('#txt').val();
    var k=r.charAt(0)+r.charAt(1)+r.charAt(2);
    var temp=[];
    $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/find',
        method: 'get',
        data:{q: k,cnt:'5',type:'like',appid: '345b2115001d6d2f1f3a365a4075e3ad',lang: 'ru'},
        dataType:'jsonp',
        crossDomain:true,
        success:function(data){
            if(data.list.length==1){
                $('#123').html("Похожих городов ,к сожалению,нет.Попробуйте ввести название на английском языке")


            }
            else{
            if(data.list.length<=5){
                for(j=0;j<=data.list.length;j++){
                    temp[j]=[]
                    for(i=0;i<1;i++){
                        if(i==0){
                            temp[j][i]=Math.round(data.list[j].main.temp-273)}
                            if(i==1){
                                temp[j][i]=data.list[j].name;
                            }
                        }
                    }
                }
                else{
                    for(j=0;j<5;j++){
                        temp[j]=[]
                        for(i=0;i<2;i++){
                            if(i==0){
                                temp[j][i]=Math.round(data.list[j].main.temp-273)
                            }
                            if(i==1){
                                temp[j][i]=data.list[j].name;
                            }
                        }
                    }
                }
                $('#123').html('');
                for(i=0;i<temp.length;i++){
                    rob[i]=temp[i][1]
                    $('#123').append('<li id="'+(i+100)+'"style="display:inline; margin-right: 5px;color:#7FFFD4" onclick="d5(this)" >'+temp[i][1]+'</li>');
                }
            }},
            error: function(){alert("Произошел сбой,повторите действие заново")}
        })
};

function d5(el){
    var a=(el.id-100);
    var r= rob[a];
    var r1=$('#txt').val();
    var forecast= [];
    var dt=[];
    var forecast1=[];
    $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/forecast/daily',
        method: 'get',
        data:{q: r,cnt:'5',appid: '345b2115001d6d2f1f3a365a4075e3ad',lang: 'ru'},
        dataType:'jsonp',
        crossDomain:true,
        success:function(data){
            for( i=0;i<5;i++)
            {
                forecast[i]=Math.round(data.list[i].temp.day-273);
                dt[i]=new Date(data.list[i].dt*1000);
            }
            if(r!==r1)
            {
                $.ajax({
                    url: 'http://api.openweathermap.org/data/2.5/forecast/daily',
                    method: 'get',
                    data:{q: r1,cnt:'5',appid: '345b2115001d6d2f1f3a365a4075e3ad',lang: 'ru'},
                    dataType:'jsonp',
                    crossDomain:true,
                    success:function(data){
                        for( i=0;i<5;i++){
                            forecast1[i]=Math.round(data.list[i].temp.day-273);
                        }
                        grap2(forecast,forecast1,dt,r,r1)
                    },
                    error: function(){alert("Произошел сбой,повторите действие заново")}
                })
            }
        },
        error: function(){alert("Произошел сбой,повторите действие заново")}
    })
};


function down(){
    $('#123').html('');
};

function grap(forecast,dt,r){
    $('#2').highcharts({
        title: {
            text: 'Температура на ближайшие 5 дней',
            x: -20 
        },
        xAxis: {
            categories: [dt[0], dt[1], dt[2], dt[3], dt[4]]
        },
        yAxis: {
            title: {
                text: 'Temperature (°C)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '°C'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: r,
            data: [forecast[0],forecast[1],forecast[2],forecast[3],forecast[4]]
        }]
    });
};

function diag2(pressure1,dt,r){
    $('#3').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Изменение давления'
        },
        xAxis: {
            categories: [dt[0],dt[1],dt[2],dt[3],dt[4]
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Pressure'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: r,
            data:[ pressure1[0],pressure1[1],pressure1[2],pressure1[3],pressure1[4]]

        }]
    });
};

function grap2(forecast,forecast2,dt,r,r1){
    $('#2').highcharts({
        title: {
            text: 'Температура на ближайшие 5 дней',
            x: -20 
        },
        xAxis: {
            categories: [dt[0], dt[1], dt[2], dt[3], dt[4]]
        },
        yAxis: {
            title: {
                text: 'Temperature (°C)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '°C'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: r,
            data: [forecast[0],forecast[1],forecast[2],forecast[3],forecast[4]]
        },{
            name: r1,
            data: [forecast2[0],forecast2[1],forecast2[2],forecast2[3],forecast2[4]]
        },
        ]
    });
};