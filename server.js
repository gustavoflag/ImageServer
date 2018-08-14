require('./extends');
var http = require('http');
var url = require('url');
var fileFinder = require('./routes/fileFinder');
var port = process.env.PORT || 7000;


var config = {
  imagePath: process.argv[2],
  cssPath: process.argv[3]
}

log = function(data){
  return console.log('[%s] - %s',new Date().toISOString(), data);
}

findImage = function(res, name){
  fileFinder.findFile(config.imagePath, name, function(err, image){
    if (err){
      log(err);
      res.writeText(err);
    }
    else {
      log('Imagem ' + name + ' encontrada');
      res.writeImage(image.buffer);
    }
  });
}

findCss = function(res, name){
  fileFinder.findFile(config.cssPath, name, function(err, file){
    if (err){
      log(err);
      res.writeText(err);
    }
    else {
      log('Arquivo ' + name + ' encontrado');
      res.writeCss(file.buffer);
    }
  });
}


var server = http.createServer(function (req, res) {
  var parsedUrl = url.parse(req.url, true);

  if (!parsedUrl.query.name)
  {
    log('Nenhum nome informado');
    res.writeText('Nenhum nome informado');
  }
  else {
    switch (parsedUrl.pathname) {
      case '/image':
        findImage(res, parsedUrl.query.name);
        break;
      case '/css':
        findCss(res, parsedUrl.query.name);
        break;
      default:
        log('Caminho não encontrado');
        res.writeText('Caminho não encontrado');
    }

  }
});

server.listen(port, function(){
  log('Servidor no ar, porta ' + port);
});
