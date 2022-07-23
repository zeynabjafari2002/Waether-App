const APIKey='cbc1871627d910e7a3dc730129d2ae8d';
var cityInput=document.getElementById("input");
var searchBtn=document.getElementById("submitBtn");
var cityOutput=document.getElementById("cityOutput");
var cityDesc=document.getElementById("desc");
var kTemp=document.getElementById("k-temp");
var cTemp=document.getElementById("c-temp");
var prev=document.querySelector(".prev");
var next=document.querySelector(".next");
var slide=document.getElementsByClassName("slide");
var resultContainer=document.querySelector(".result-container");
var resultImg=document.querySelector(".resultImg");
var count=0;


// deleting div element
if(searchBtn!=onclick){
    resultContainer.classList.add("hide")
}
else{
    resultContainer.classList.add("show");
    
    
}




// getting information
async function checkWeather(){
    var result=await (
        await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${APIKey}`)
    ).json();

    setInfo(result);
    prev.classList.add("hideA");
    next.classList.add("hideA");
    


}
// setting information
function setInfo(data){
    var cityName=data['name'];
    var description=data['weather'][0]['description'];
    var kTemperature=data['main']['temp'];
    var cTemperature=data['main']['temp'];

    cityOutput.innerHTML=`city : ${cityName}`;
    cityDesc.innerHTML=`description : ${description}`;
    kTemp.innerHTML=`kelvin : ${kTemperature}`;
    cTemp.innerHTML=`celsius : ${((cTemperature)-273).toFixed(2)}`;


    if(description=="clear sky"){
        resultImg.setAttribute("src","photos/sunny.png")
    }
    else if(description=="scattered clouds" || description=="broken clouds" || description=="few clouds" || description=="overcast clouds"){
        resultImg.setAttribute("src","photos/cloudy.png")
    } 
    else if(description=="light rain" || description=="shower rain" || description=="rain" || description=="moderate rain" ){
        resultImg.setAttribute("src","photos/rainy.png")
    }
    else if(description=="thunderstorm"){
        resultImg.setAttribute("src","photos/stormy.png")
    }
    else if(description=="snow" || description=="light snow"){
        resultImg.setAttribute("src","photos/snowy.png")
    }
    else if(description=="fog" || description=="mist"){
        resultImg.setAttribute("src","photos/foggy.png")
    }
    else if(description=="shower sleet"){
        resultImg.setAttribute("src","photos/sleeting.png")
    }
    else if(description=="wind"){
        resultImg.setAttribute("src","photos/windy.png")
    }
    else{
        resultImg.removeAttribute()
    }
    
}
searchBtn.addEventListener("click" , checkWeather);


// the style of appearing data
searchBtn.addEventListener("click",()=>{
    let imgSlider1=document.querySelector(".photo1");
    imgSlider1.style.display="none";

    let imgSlider2=document.querySelector(".photo2");
    imgSlider2.style.display="none";
    
    let imgSlider3=document.querySelector(".photo3");
    imgSlider3.style.display="none";

    let imgSlider4=document.querySelector(".photo4");
    imgSlider4.style.display="none";

    let imgSlider5=document.querySelector(".photo5");
    imgSlider5.style.display="none";

    let imgSlider6=document.querySelector(".photo6");
    imgSlider6.style.display="none";

    let imgSlider7=document.querySelector(".photo7");
    imgSlider7.style.display="none";

    let imgSlider8=document.querySelector(".photo8");
    imgSlider8.style.display="none";

    next.classList.add("hideA");
    prev.classList.add("hideA");

    let txtBox=document.querySelector(".txtBox");
    let imgBox=document.querySelector(".imgBox");
    txtBox.classList.add("txtAnimation");
    imgBox.classList.add("imgAnimation")
})

// slider
function noneDisplay(){
    for(var i=0 ; i<slide.length ; i++){
        slide[i].style.display="none"
    }
}
next.addEventListener("click" , function(e){
    e.preventDefault();
    count++;
    if(count>slide.length-1){
        count=0
    }
    noneDisplay();
    slide[count].style.display="block";
})
prev.addEventListener("click" , function(e){
    e.preventDefault();
    count--;
    if(count<0){
        count=slide.length-1
    }
    noneDisplay();
    slide[count].style.display="block";
})


// setting timer for slider
var slideIndex=1;
var setTimeId;
showDivs(slideIndex);

function plusDivs(n){
    showDivs(slideIndex += n)
}

function showDivs(n){
    clearTimeout(setTimeId);

    var i;
    var x=document.getElementsByClassName("slide");

    if(n==undefined){
        n= ++slideIndex
    }
    if(n>x.length){
        slideIndex=1
    }
    if(n<1){
        slideIndex=x.length
    }
    for(i=0 ; i<x.length ; i++){
        x[i].style.display="none";
    }

    x[slideIndex-1].style.display="block";

    setTimeout(showDivs,2000)
}