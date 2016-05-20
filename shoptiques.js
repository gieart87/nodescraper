var request = require('request');
var cheerio = require('cheerio');

var fs = require('fs');

var offset = 0;
var last_offset = 360;
while (offset <= last_offset){
	request("http://www.shoptiques.com/categories/bags?offset="+offset, function(error, response, body) {
	  if(error) {
	    console.log("Error: " + error);
	  }
	  console.log("Status code: " + response.statusCode);

	  var $ = cheerio.load(body);

	  $('.products-list__product').each(function( index ) {
	    var name = $(this).find('.products-list__product__description header a').text().trim();
	    var original_url = $(this).find('a').first().attr('href');
	    var price = $(this).find('.products-list__product__description div').text();
	    var image_url = $(this).find($('img')).attr('src');

	    console.log("Name: " + name);
	    console.log("Url: " + original_url);
	    console.log("Price: " + price);
	    // console.log("Image Url: " + image_url);

	    fs.appendFileSync('archives/shoptiques.txt', original_url + '\n');
	  });

	});

	offset = offset + 90;
}
