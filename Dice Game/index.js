var dice1 = Math.floor(Math.random() * 6) + 1 ;
var dice2 = Math.floor(Math.random() * 6) + 1 ;

var img1 = "images/dice" + dice1 + ".png";
var img2 = "images/dice" + dice2 + ".png";

var img = document.querySelectorAll("img");

img[0].setAttribute("src",img1);
img[1].setAttribute("src",img2);

if(dice1>dice2)
{
    document.querySelector("h1").textContent = "🚩Player 1 Wins";
}
else if(dice1<dice2)
{
    document.querySelector("h1").textContent = "Player 2 Wins🚩";
}
else
{
    document.querySelector("h1").textContent = "Draw";
}