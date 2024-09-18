var color = ["red", "blue", "green", "yellow"];

var gamepattern = [];

var userChosenColour = [];

var level = 0;

var curr_level = 0;

function next_sequence() { 

    level++;
    $("h1").text("Level "+level);

    var randomno = Math.floor(Math.random()*4);

    gamepattern.push(color[randomno]);

    $("#"+color[randomno]).fadeOut(100).fadeIn(100);

    var audio = new Audio("sounds/"+color[randomno]+".mp3");
    audio.play();

    // $("#"+color[randomno]).addClass("pressed");

    // setTimeout(function(){

    //     $("#"+color[randomno]).removeClass("pressed");
    
    // },100);

    //return color[randomno];

}


function check_answer(){

    if((userChosenColour[curr_level-1]===gamepattern[curr_level-1]) && (curr_level===level))
    {
        //console.log("Success");
        curr_level=0;
        userChosenColour=[];
        setTimeout(function(){

            next_sequence();
        
        },1000);
       
        
    }
    else if(userChosenColour[curr_level-1]!==gamepattern[curr_level-1])
    {
        level = 0;
        curr_level=0;
        gamepattern=[];
        userChosenColour=[];
        $("h1").text("Game over press any key to Start");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").css("background-color","red");
        setTimeout(function(){

            $("body").css("background-color","#011f3f");
        
        },100);
        //console.log("Failed");
    }
}


$(".btn").click(function() { 

    var color_chossed =$(this).attr("id");
    userChosenColour.push(color_chossed);

    var audio = new Audio("sounds/"+color_chossed+".mp3");
    audio.play();

    $("#"+color_chossed).addClass("pressed");

    setTimeout(function(){

        $("#"+color_chossed).removeClass("pressed");
    
    },100);

    curr_level++;

    check_answer();

    //console.log(userChosenColour);
});


$(document).keypress(function () { 
    if(level===0)
    {
        next_sequence();
    }
});









