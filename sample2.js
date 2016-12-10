	var http = require('http');
    var fs = require('fs');
    var qs = require('querystring');
    var  crud = require('./crud');
    var nodemailer = require('nodemailer');
    var  httpMsgs = require('./httpMsgs');
 
    var htmlFile;
    var cssFile;
    var img1;


    fs.readFile('./sample2.html', function(err, data) {
        if(!err){
           htmlFile = data;
        }   
    });

    fs.readFile('./assets/vendor/slick-carousel/slick.css', function(err, data) {
        if(!err){
           cssFile = data;
        }   
    });

    fs.readFile("./chat.jpg",function(err,data){
        if(!err){
            img1 = data;
        }
    });

var app = http.createServer(function (request, response) {
        

        switch (request.url) {
            case "./assets/vendor/slick-carousel/slick.css" :
                response.writeHead(200, {"Content-Type": "text/css"});
                 response.write(cssFile);
                 break;
            case "./chat.jpg":
                response.writeHead(200, {"Content-Type": "image/jpg"}); 
                response.write(img1); 
                break;   
            default :    
                response.writeHead(200, {"Content-Type": "text/html"});
                response.write(htmlFile);
                break;
         }



       // response.writeHead(200, {'Content-Type': 'text/html'});
      //   response.write(data);

        switch(request.method){
                case "POST":
                console.log("3");
                    if (request.url==="/") {    
                    console.log("/");
                    }

            else if (request.url==="/send") {
                            //var reqBody ='';
                            var body = '';
                                 console.log("4");   
                    request.on('data', function (data) {
                        body+=data;
                            console.log(body);
                        
                        
                        var parameters=qs.parse(body);
                        console.log(parameters);            
                      console.log(parameters['from']);
                            if (body.length > 1e6)          
                            request.connection.destroy();
                            });
                            
                            request.on("end",function(){                                            
                                console.log("5");
                                crud.add(request,response,body);
                            });                                 
                    }else{
                        httpMsgs.show404(request,response);
                                
                    }
                break;
                default:
                // httpMsgs.show405(request,response,err);
                // console.log("error");
                break;
            }

             response.end();

     
}).listen(8080);

//  var app = http.createServer(function (request, response) {
//     fs.readFile('./' + request.url, function(err, data) {
//         if (!err) {
//             var dotoffset = request.url.lastIndexOf('.');
//             var mimetype = dotoffset == -1
//                             ? 'text/plain'
//                             : {
//                                 '.html' : 'text/html',
//                                 '.ico' : 'image/x-icon',
//                                 '.jpg' : 'image/jpeg',
//                                 '.png' : 'image/png',
//                                 '.gif' : 'image/gif',
//                                 '.css' : 'text/css',
//                                 '.js' : 'text/javascript'
//                                 }[ request.url.substr(dotoffset) ];
//             response.setHeader('Content-type' , mimetype);
//             response.end(data);
//             console.log( request.url, mimetype );
//         } else {
//             console.log ('file not found: ' + request.url);
//             response.writeHead(404, "Not Found");
//             response.end();
//         }
//     });
// }).listen(8080);   
 
var io = require('socket.io').listen(app);
 
io.sockets.on('connection', function(socket) {
    socket.on('message_to_server', function(data) {
        io.sockets.emit("message_to_client",{ message: data["message"] });
    });
});