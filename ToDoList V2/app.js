//EJS: EJS or Embedded Javascript Templating is a templating engine used by Node.js

const express = require('express');
const bodyparser= require('body-parser');
const app = express();
const mongoose = require('mongoose');
const _ = require('lodash'); 

mongoose.connect('mongodb://127.0.0.1:27017/todolistDB');
const itemsSchema ={
    name:String
};


const Item = mongoose.model("item",itemsSchema);
//const date = require(__dirname+"/date.js");


//https://github.com/mde/ejs/wiki/Using-EJS-with-Express
//telling out app to use ejs
app.set('view engine', 'ejs');

const port = 3000;

app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended:true}));


const listSchema={
    name:String,
    items:[itemsSchema]
};

const List = mongoose.model('List',listSchema);


const item1 = new Item({
    name: "Welcome to your todolist!"
});
const item2 = new Item({
    name: "Hit the + button to add a new list"
});
const item3 = new Item({
    name: "<-- Hit this to delete an item"
});

const defaultitems = [item1,item2,item3];



// let items=['Buy food','Cook food','Eat food'];
// let work=[];
app.get('/', (req, res) => {
    
    // let today =  new Date();
    // //https://stackoverflow.com/questions/3552461/how-do-i-format-a-date-in-javascript
    // //let currentday = today.getDay();
    // // let day ='';

    // const options ={
    //     weekday:'long',day:'numeric',month:'long'
    // };

    // let day = today.toLocaleDateString('en-US',options);

    //let day = date();

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
    
    Item.find({}).then(foundfromdb=>{

        if(foundfromdb.length===0)
        {
            Item.insertMany(defaultitems).then(res=>{
                // console.log("Done Sucessfully");
            }).catch(err=>{
                console.log(err);
            });

            res.render('list',{
                Worklist:"Today",
                listitems:defaultitems,
            });

        }
        else
        {
            res.render('list',{
                Worklist:"Today",
                listitems:foundfromdb,
                //buttvalue:'general'
            });
        }
        
    });


    

});


app.get('/:topic', (req, res) => {
  let customlistname = _.capitalize(req.params.topic);

  List.findOne({name:customlistname}).then(element=>{
    
    if(element===null)
    {     
        const list = new List({
            name:customlistname,
            items:defaultitems
        });

        list.save(); 
        res.redirect('/'+ customlistname);
    }
    else
    {
        res.render('list',{
           Worklist:element.name,
           listitems:element.items
        });
    }

  }).catch(err=>{
    console.log(err);
  });



})


app.post('/',(req,res)=>{

    let itemname = req.body.newitem;
    let listname = req.body.list;
    
    if(listname==='Today')
    {
        const newitem = new Item({
            name: itemname
        });
    
        newitem.save();
        res.redirect("/");
    }
    else
    {
        const item = new Item({
            name:itemname
        });

        List.findOne({name:listname}).then(element=>{
            element.items.push(item);
            element.save();
        });
        res.redirect('/'+listname);
    }
    
    
    
});

app.post('/delete',(req,res)=>{

    let itemtobedeletedid = req.body.check;
    let listname = req.body.listname;

    if(listname==='Today')
    {
        Item.deleteOne({_id:itemtobedeletedid}).exec()
        .then(res=>{
            // console.log(res);
        }).catch(err=>{
            console.log(err);
        });
        res.redirect('/');
    }
    else
    {
        List.findOneAndUpdate({name:listname},{$pull:{items:{_id:itemtobedeletedid} }}).then(res=>{
            // console.log(res);
        });

        res.redirect('/' + listname );
    }


   
});





app.listen(port, () => {
   console.log('Server started on port 3000'); 
});