const express = require('express');
const https = require('https');
const bodyparser = require('body-parser');
const app = express();

app.use(bodyparser.urlencoded({extended:true}));

app.listen(3000,()=>{
    console.log("Server running on port 3000.");
});

app.get("/",(req,res)=>{

    res.sendFile(__dirname + "/index.html");

});

app.post("/",(req,res)=>{

    //console.log(req.body.cityname);
    const city = req.body.cityname;

    const unit = "metric";

    const APIkey = "3d221f6bf15490dc492d54943e42cbe8";

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+APIkey+"&units="+unit ;
//https://api.openweathermap.org/data/2.5/weather?q=ahmedabad&appid=3d221f6bf15490dc492d54943e42cbe8&units=metric
    https.get(url, (response)=>{
        //console.log(response);
        //console.log(response.statusCode);

        response.on("data",(data)=>{

            //console.log(data);

            const weatherData = JSON.parse(data);

            const icon = weatherData.weather[0].icon;

            const imgurl = " https://openweathermap.org/img/wn/"+icon+"@2x.png";

            //console.log(weatherData);
            //console.log(weatherData.wind.speed);

            // const obj ={
            //     name:"aryan",
            //     favfodd:"susi"
            // }
            // console.log(JSON.stringify(obj));
            //res.send("<h1>The temperature in Rajkot is " + weatherData.main.temp + " degree celcius.</h1>");
            res.write("<h1>The temperature in "+city+ " is " + weatherData.main.temp + " degree celcius.</h1>");
            res.write("<p>The weather is currently " + weatherData.weather[0].description+ ".</p>");
            res.write("<img src="+imgurl+" >");
            res.send();
        });
    });

});


