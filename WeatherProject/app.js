const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(request,response){
    response.sendFile(__dirname +"/index.html");

    
});
app.post("/", function(request,response){
    const query=request.body.cityName;
    const apikey="b9b2e33d6fff81761a21370ed57f00ac";
    const unit ="metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit;
    https.get(url, function(res){
        console.log(res.statusCode);

        res.on("data", function(data){
           const weatherData= JSON.parse(data);
           
           const temp = weatherData.main.temp;
           const pressure = weatherData.weather[0].description;

           const icon = weatherData.weather[0].icon
           const imageURL = "https://api.openweathermap.org/img/wn/" + icon +"10d@2x.png"
           response.write("<p>The weather description is " + pressure + "<p>");
           response.write("<h1>The temperature in " + query + " is " + temp + " degree Celsius.</h1>");
           response.write("<img src=" + imageURL+ ">");
           response.send()
        })
    })


})










app.listen(3000,function(){
    console.log("server is running on 3000.");
});