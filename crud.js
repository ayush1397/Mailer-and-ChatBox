 var httpMsgs = require('./httpMsgs');	
 var mysql = require('mysql');
 var setting = require("./settings");
 var qs = require('querystring');
 var nodemailer = require('nodemailer');


var conn = mysql.createConnection(setting.dbConfig); 

conn.connect(function(err){
    if(!err){
        console.log("db connection established");
    }
    else{
        console.log("db connection failed");
    }
});    

 exports.add = function(req,res,body){		
 		console.log(body);
        var data = qs.parse(body);
        console.log(data);
 		console.log("6");
 		if(data){ 		
        console.log("7");		
 				conn.query("INSERT into maildb set ?",data,function(err,final){
 			if (err) {
                console.log("8");
 				if (setting.httpMsgsFormate === "HTML") {
				res.writeHead(500,"Internal server error occured",{'Content-type':'text/plain'});
 				res.write("<html><head><title>500</title></head><body>500:Internal error details:"+ err +"</body></html>");
					}else{
				res.writeHead(500,"Internal server error occured",{'Content-type':'application/json'});
 				res.write(JSON.stringify({data:"internal server error occured" + err}));
						}
			res.end();
 			}else{		
 			//	console.log(data);
 						
 						var from = data['from'];
 						console.log(from);
 						var subject = data['subject'];
 						console.log(subject);
 						var body = data['body'];
 						console.log(body);	
 						var attachment =data['attachment'];

 						console.log(attachment);

 					    var transport = nodemailer.createTransport({
 								service : 'Gmail',
 								auth :{
 									user:'ayush@turningcloud.com',
 									pass:'ayush123'
 								}


 					});
 					var mailOption ={
 						
 						from: from, // sender address 
    					to: '<ayush@turningcloud.com>', // list of receivers 
    					subject: subject, // Subject line 
    					text: 'Hello world 🐴', // plaintext body 
    					html: '🐴'+body+'.',

    					attachments:  [
        {   // utf-8 string as an attachment 
            filename: attachment,
            content: new Buffer('its cloud!','utf-8')
        },
        ]	

 					};

 					transport.sendMail(mailOption,function(err,info){
 							if (err) {
 								console.log('mail not send');
 							}else{
 								console.log('send');
 							}

 					});



 				res.writeHead(200,"Success",{'Content-type':'text/plain'});
 				console.log("hi");
				res.end("<html><head><title>200</title></head><body>Success</body></html>");	
 			}
 		});		
 		}else{
 					console.log("data is invalid or not found");		
 		}	
 	
 };