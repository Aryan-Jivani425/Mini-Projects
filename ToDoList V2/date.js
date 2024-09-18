

module.exports = getdate;


function getdate() { 
    let today =  new Date();
    //https://stackoverflow.com/questions/3552461/how-do-i-format-a-date-in-javascript
    //let currentday = today.getDay();
    // let day ='';

    const options ={
        weekday:'long',day:'numeric',month:'long'
    };

    let day = today.toLocaleDateString('en-US',options);
    return day;
 }