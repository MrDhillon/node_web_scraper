var request = require('request');
var cheerio = require('cheerio');
var path = require('path');
var fs = require('fs');
var data = [];

fs.writeFile('images.csv',data,function(err){
  if (err) throw err;
  console.log('it saved!');
});

request('http://substack.net/images/',function(error,response,body){
  $ = cheerio.load(body);
  linkStrip();
});

function linkStrip(){
  $('tr').each( function (stuff) {
     var link = $(this).find('a').attr('href');
     var permission = $(this).find('code').text();
     data.push(('http://substack.net'+link)+","+(path.extname(link))+","+(permission)+"/n");
  });
  fs.writeFile('images.csv',data,function(err){
    if (err) throw err;
    console.log('it saved!');
  });
}

// function extenionStrip(link){
//   link.forEach(function(v){
//     path.extname(v);
//   });
// }
