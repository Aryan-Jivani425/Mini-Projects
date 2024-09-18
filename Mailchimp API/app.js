const express = require('express');
const request = require('request');
//const mailchimp = require("@mailchimp/mailchimp_marketing");
const https = require('https');
const bodyparser = require('body-parser');
//const { log } = require('console');
const app = express();

//specify the static folder where we have all files
app.use(express.static("public"));

app.use(bodyparser.urlencoded({extended:true}));

//apiKey: "8a85107474c32c913287e94a465c20da-us21",
// mailchimp.setConfig({
//     apiKey: "8a85107474c32c913287e94a465c20da-us21",
//     server: "us21",
//   });



app.listen(3000,()=>{
    console.log("Server running on port 3000.");
});

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/signup.html");
});

app.post('/',(req, res)=> {
  
    const firstname = req.body.fname;
    const lastname = req.body.lname;
    const email = req.body.email;

    const listId = "a3e5eaa981";

    //console.log(firstname , lastname  , email);

    const data = {
        members:[
            {
                email_address:email,
                status: "subscribed",
                merge_fields:{
                    FNAME:firstname,
                    LNAME:lastname
                }
            }
        ]
    }

    const jsondata = JSON.stringify(data);

     const url = "https://us21.api.mailchimp.com/3.0/lists/a3e5eaa981";

    const options={
        method:"POST",
        auth: "iamspamming:8a85107474c32c913287e94a465c20da-us21"
    }

    const request = https.request(url,options,(response)=>{
        response.on("data",(duta)=>{
            duta =hexToString(duta);
            if(JSON.parse(duta).errors.length>0 && response.statusCode===200)
            {
                res.sendFile(__dirname+"/alreadymember.html");
            }
            else if(response.statusCode!==200)
            {
                res.sendFile(__dirname+"/failure.html");
            }
            else
            {
                res.sendFile(__dirname+"/success.html");
            }
        });
        
    });

    request.write(jsondata);
    request.end();
});

app.post("/fail",(req,res)=>{
    res.redirect("/");
});


function hexToString(str)
{
    const buf = new Buffer(str, 'hex');
    return buf.toString('utf8');
}


//API Key
//8a85107474c32c913287e94a465c20da-us21
//tijeyih967@ipniel.com
//Spam@123
//List ID
//a3e5eaa981

