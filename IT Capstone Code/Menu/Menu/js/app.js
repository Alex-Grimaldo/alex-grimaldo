/*
    Settings for the Menu Columan Swap
    Swap Columns Every 5 Minutes
*/
setInterval(flip, 300000);

function flip(){
    var strCurrent = '';
    if(strCurrent = 'one'){
        $('#one').appendTo('#all');
        strCurrent = 'two';
    }
}

setInterval(flipAgain, 600000);
function flipAgain(){
    if(strCurrent ='two'){
        $('#two').appendTo('#all');
        strCurrent = 'one';
    }
}

/*
    Apply screen saver before 0600 (6am) and after 1700 (7pm); check time every 5 seconds
*/

setInterval(applyScreenSaver, 10000);

var index = 0;

function applyScreenSaver (){
    var imageSources = [
        'images/Transparent_Logo.png',
        'images/theexceptionalbean_14.JPG',
        'images/theexceptionalbean_19.JPG',
        'images/Coffee_With_Flavoring.jpg',
        'images/Coffee_bg_blur2.jpg',
        'images/Coffee_With_Crumbs.jpg',
        'images/Coffee_Drink.jpg',
        'images/Coffee_With_Marshmallows.jpg',
        'images/Bean_Group_Photo.jpg',
        'images/Handing_Coffee.jpg',
        'images/Cigi_Logo.jpg',
        'images/Cigi_1.JPG',
        'images/Bean_Outside_Sign.JPG',
        'images/Michael2.jpg',
        'images/Michael_With_2.jpg',
        'images/Michael_Cigi_2.JPG',
        'images/Group_With_Cigi.JPG'
    ]
    //Apply dark background and center images
    const screenSaver = document.getElementById("content");

    function slideShow (){
        $("#content").removeAttr("style");
        $("#content").css({"background-color": "black", "background-repeat": "no-repeat", "cursor": "none"});
        $("#content").html("");
        if(index == imageSources.length) {
            index = 0;
        }else{
            $("#content").css('background-image', 'url(' + imageSources[index] + ')');
            index++;
        }
    }

    const date = new Date();
    let hour = date.getHours();
    let day = date.getDay();
    
    if(day == 0) {
        screenSaver.style = null;
        screenSaver.innerHTML='';
        screenSaver.style.backgroundColor = 'black';
        screenSaver.style.cursor = 'none';
    } else if (day == 6) {
        if(hour < 7 || hour >= 16) {
            slideShow();
        }
    } else if (day >= 1 || day <= 5) {  
        if(hour < 7 || hour > 18) {
            slideShow();
        }
    }
}

/*
    Refresh menu at 7am
*/
refreshAt(7,0,0);

function refreshAt(hours, minutes, seconds) {
    var now = new Date();
    var today = now.getDay();
    var then = new Date();
    if(today != 0){
        if(now.getHours() > hours ||
            (now.getHours() == hours && now.getMinutes() > minutes) ||
            now.getHours() == hours && now.getMinutes() == minutes && now.getSeconds() >= seconds) {
            then.setDate(now.getDate() + 1);
        }
        then.setHours(hours);
        then.setMinutes(minutes);
        then.setSeconds(seconds);
    
        var timeout = (then.getTime() - now.getTime());
        setTimeout(function() { 
            window.location.reload(true); 
        }, timeout);
    }
}

/*
    Settings for the Menu Clock
*/
setInterval(time, 1000);
function time (){
    var currentTime = document.getElementById("time");
    const date = new Date();
    date.setSeconds(0);
    currentTime.innerHTML = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
}

setInterval(updateTemp, 3600000);
$(document).ready(updateTemp());

function updateTemp(){
    $.getJSON('https://api.openweathermap.org/data/2.5/weather?lat=36.1628&lon=-85.5016&appid=2a9cd22211d71c5fbd5007b1a354cc6e&units=Imperial', function(result){
        let temperature = result.main.temp;
        temperature = Math.round(temperature);
        $('#weatherWidget').empty();
        $('#weatherWidget').append(temperature + "&deg;F");
    })
}