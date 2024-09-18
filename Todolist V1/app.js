//EJS: EJS or Embedded Javascript Templating is a templating engine used by Node.js

const express = require('express');
const bodyparser= require('body-parser');
const app = express();

const date = require(__dirname+"/date.js");

//https://github.com/mde/ejs/wiki/Using-EJS-with-Express
//telling out app to use ejs
app.set('view engine', 'ejs');

app.use(express.static('public'));

const port = 3000;

app.use(bodyparser.urlencoded({extended:true}));


let items=['Buy food','Cook food','Eat food'];
let work=[];
app.get('/', (req, res) => {
    
    // let today =  new Date();
    // //https://stackoverflow.com/questions/3552461/how-do-i-format-a-date-in-javascript
    // //let currentday = today.getDay();
    // // let day ='';

    // const options ={
    //     weekday:'long',day:'numeric',month:'long'
    // };

    // let day = today.toLocaleDateString('en-US',options);

    let day = date();

    // switch (currentday) {
    //     case 0:
    //         day = 'Sunday';
    //         break;
    //     case 1:
    //         day = 'Monday';
    //         break;
    //     case 2:
    //         day = 'Tuesday';
    //         break;
    //     case 3:
    //         day = 'Wednesday';
    //         break;
    //     case 4:
    //         day = 'Thursday';
    //         break;
    //     case 5:
    //         day = 'Friday';
    //         break;
    //     case 6:
    //         day = 'Saturday';
    //         break;
    //     default:
    //         break;
    // }

    res.render('list',{
        Worklist:day,
        listitems:items,
        //buttvalue:'general'
    });

});

app.get('/work',(req,res)=>{

    res.render('list',{
        Worklist:'Work',
        listitems:work,
        //buttvalue:'work'
    });
});

app.post('/',(req,res)=>{

    
    if(req.body.list==='Work')
    {
        res.redirect('/work');
        work.push(req.body.newitem);
    }
    else
    {
        items.push(req.body.newitem);
        res.redirect('/');
    }    

});

app.post('/work',(req,res)=>{
    work.push(req.body.newitem); 
    res.redirect('/work');
});


app.listen(port, () => {
   console.log('Server started on port 3000'); 
});