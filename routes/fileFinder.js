var fs = require('fs');

exports.findFile = function(pathDir, name, callback) {
  var directory = fs.readdir(pathDir, function (err, list) {

      if (err) {
        callback(err, null);
      }

      for (var i = 0; i < list.length; i++){

        if (list[i] == name){

          fs.readFile(pathDir + '/' + list[i], function (err, buffer) {
            if (err) {
              callback(err, null);
            }

            var image = {
              name: list[i],
              buffer: buffer
            }

            callback(null, image);
					});

          break;
        }

        if((i + 1) == list.length){
          callback('Imagem ' + name + ' não encontrada', null);
        }
	   }
  });
}
