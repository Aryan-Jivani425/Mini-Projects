// document.querySelector("button").addEventListener("click",handelclick);

// function handelclick()
// {
//     var audio = new Audio("sounds/tom-1.mp3");
//     audio.play();
// }

var butt = document.querySelectorAll(".drum");

for(var i = 0 ; i<butt.length; i++)
{
    butt[i].addEventListener("click", function (){

        console.log(this.textContent);
        //this.style.color="white";
        var whichbutton = this.textContent;
        //console.log(whichbutton);
        makesound(whichbutton);
        applyanimation(whichbutton);
        
        
    
    });
}

document.addEventListener("keypress",function(event){

    //console.log(event.key);
    makesound(event.key);
    applyanimation(event.key);

});


function makesound(key){
    switch(key)
        {
            case "w":
                var tom1 = new Audio("sounds/tom-1.mp3");
                tom1.play();
                break;
            case "a":
                var tom2 = new Audio("sounds/tom-2.mp3");
                tom2.play();
                break;
            case "s":
                var tom3 = new Audio("sounds/tom-3.mp3");
                tom3.play();
                break;
            case "d":
                var tom4 = new Audio("sounds/tom-4.mp3");
                tom4.play();
                break;
            case "j":
                var snare = new Audio("sounds/snare.mp3");
                snare.play();
                break;
            case "k":
                var crash = new Audio("sounds/crash.mp3");
                crash.play();
                break;

            case "l":
                var kick = new Audio("sounds/kick-bass.mp3");
                kick.play();
                break;    
            default:
                 
        }
}

function  applyanimation(key)
{
    var keyclass ="."+key;
    var buttonanimation = document.querySelector(keyclass);
    buttonanimation.classList.add("pressed");
    
    setTimeout(function(){

    buttonanimation.classList.remove("pressed");

    },100);
    
}
