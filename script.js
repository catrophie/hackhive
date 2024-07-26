var input = document.getElementById("input");
var named = document.getElementById("name");
var unit = document.getElementById("unit");
var img = document.getElementById("img");
var price = document.getElementById("price");
var name1 = document.getElementById('name1');
var tp = document.getElementById('tp');
var td = document.getElementById('td');
var cp = document.getElementById('cp');
var cd = document.getElementById('cd');
let d1 = "";
let d2 = 0;
let d3 = "";
let d4 = "";
let imgs = "";
var dist = 0;
var rp = 1;
var rd = 1;
var rrp = 100;
var rrd = 100;
var tp = 0;
var td = 0; 
var pooleri = 0;
const myElement = document.getElementById("lr");


function p1() {
    const au1 = `https://api.spoonacular.com/food/ingredients/search?apiKey=daf8f52c6b1e4826931b9f1575584476&number=1&query=${input.value}`;

    fetch(au1)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                d1 = data.results[0].id;
                console.log("ID from p1:", d1);
                p2();
            } else {
                console.log("No results found in p1");
            }
        })
        .catch(error => {
            console.error("Error in p1:", error);
        });
}

function p2() {
    const au21 = "https://api.spoonacular.com/food/ingredients/";
    const au22 = "/information?amount=1&apiKey=daf8f52c6b1e4826931b9f1575584476";
    
    const fullUrl = au21 + d1 + au22;

    fetch(fullUrl)
        .then(response => response.json())
        .then(data => {
            console.log("Data from p2:", data);
            if (data.estimatedCost && data.estimatedCost.value) {
                d3 = data;
                const costInCents = data.estimatedCost.value;
                const costInUsd = costInCents / 100; // Convert cents to USD
                const exchangeRate = 79; // Example exchange rate for USD to INR
                d2 = Math.ceil(costInUsd * exchangeRate);
                console.log("Cost price in INR:", d2);
                alert('it works lmaooooo: ', d2);
            } else {
                console.log("Cost information not available in p2");
            }
        })
        .catch(error => {
            console.error("Error in p2:", error);
        });
}

function p3() {
    named = d3.name;
    img.src = "img/a/" + imgs;
    unit = d3.possibleUnits[1] + "," + d3.possibleUnits[1] + "," + d3.possibleUnits[1] + "," + d3.possibleUnits[1] + ", and " + (d3.length-4) + " more...";
    price = 'rupees' + d2;
}

document.getElementById("enter").addEventListener("click", send);

function fakeLocation() {
    document.getElementById('location1').innerHTML = document.getElementById('location').value;
    switch(document.getElementById('location').value) {
        case "Mumbai Market":
            dist = 726;
        break;
        case "Chennai Market":
            dist = 321;
        break;
        default:
            dist = 0;
    }
    calcPD();
}

function getLocation() {
   if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(showPosition);
    } else {
     myElement.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    myElement.innerHTML = "Latitude: " + position.coords.latitude +
    "&nbsp;Longitude: " + position.coords.longitude;
  }

function calcPD() {
    tp = Math.ceil((dist/rp)*rrp);
    td = Math.ceil((dist/rd)*rrd);
    document.getElementById('cp').innerHTML = Math.ceil((dist/rp)*rrp);
    document.getElementById('cd').innerHTML = Math.ceil((dist/rd)*rrd);
    document.getElementById('tp').innerHTML = Math.ceil(dist/rp);
    document.getElementById('td').innerHTML = Math.ceil(dist/rd);
}

function send() {
    document.getElementById('result').hidden = false;
    document.getElementById('finalresult').hidden = false;
    checkItem();
    fakeLocation();
    calcDist();
    p4();
}

function checkItem() {
    p1();
    p3();
}

function findPooler() {
        alert(`${pooleri} pooler(s) are heading in this area. ${pooleri} pooler(s) are heading for this state.`);
}

function becomePooler() {
    pooleri++;
    alert('Thank you for becoming a pooler!');
}