var http = require('http');

http.ServerResponse.prototype.writeText = function(text){
  this.writeHead(200, { 'content-type': 'text/plain' });
  this.end(text);
}

http.ServerResponse.prototype.writeImage = function(buffer){
  this.writeHead(200, { 'content-type': 'image/png' });
  this.end(buffer);
}

http.ServerResponse.prototype.writeCss = function(buffer){
  this.writeHead(200, { 'content-type': 'text/css' });
  this.end(buffer);
}
