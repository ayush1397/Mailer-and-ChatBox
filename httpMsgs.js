var settings = require('./settings');


exports.show500 = function(req,res,err){
		if (settings.httpMsgsFormate === "HTML") {
				res.writeHead(500,"Internal server error occured",{'Content-type':'text/plain'});
 				res.write("<html><head><title>500</title></head><body>500:Internal error details:"+ err +"</body></html>");
		}else{
				res.writeHead(500,"Internal server error occured",{'Content-type':'application/json'});
 				res.write(JSOJ.stringify({data:"internal server error occured" + err}));
		}
			res.end();
};

exports.show405 = function(req,res,err){
		if (settings.httpMsgsFormate === "HTML") {
				res.writeHead(405,"Method not suported",{'Content-type':'text/plain'});
 				res.write("<html><head><title>405</title></head><body>405:Method not suported:"+ err +"</body></html>");
		}else{
				res.writeHead(500,"Method not suported",{'Content-type':'application/json'});
 				res.write(JSON.stringify({data:"Method not suported" + err}));
		}
			res.end();
};

exports.show404 = function(req,res,err){
		if (settings.httpMsgsFormate === "HTML") {
				res.writeHead(404,"Resourse not found",{'Content-type':'text/plain'});
 				res.write("<html><head><title>404</title></head><body>404:Resourse not found:"+ err +"</body></html>");
		}else{
				res.writeHead(404,"Resourse not found",{'Content-type':'application/json'});
 				res.write(JSON.stringify({data:"Resourse not found" + err}));
		}
			res.end();
};

exports.show413 = function(req,res,err){
		if (settings.httpMsgsFormate === "HTML") {
				res.writeHead(413,"Requested Data is too large",{'Content-type':'text/plain'});
 				res.write("<html><head><title>413</title></head><body>413::"+ err +"</body></html>");
		}else{
				res.writeHead(500,"Requested data is too large",{'Content-type':'application/json'});
 				res.write(JSON.stringify({data:"Requested data is too large" + err}));
		}
			res.end();
};

exports.show200 = function(req,res){
		
				res.writeHead(200,"Success",{'Content-type':'text/plain'});
 				res.write("<html><head><title>200</title></head><body>Success</body></html>");
				res.end();
		};

exports.showHome = function(req,res){
if (settings.httpMsgsFormate === "HTML") {
				res.writeHead(200,{'Content-type':'text/plain'});
 				res.write("<html><head><title>413</title></head><body>User need to specific about requirment</body></html>");
		}else{
				res.writeHead(200,{'Content-type':'application/json'});
 				res.write(JSON.stringify({data:"User need to specific about requirment"}));
		}
			res.end();
};

exports.sendJson = function(req,res){
	
				res.writeHead(200,{'Content-type':'application/json'});
 	
 				res.write(JSON.stringify(data));
	
	res.end();

};
