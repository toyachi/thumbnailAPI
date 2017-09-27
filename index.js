var client = require('cheerio-httpcli');

exports.handler = function(event, context, callback) {
  console.log("parm:" + event['url']);
  var url = decodeURIComponent(event['url']);
  console.log("url:" + decodeURIComponent(event['url']));

  client.fetch(url)
  .then(function (result) {
    var $ = result.$;
    var tbtitle = $('title').text();
    if (tbtitle.length > 50){
      tbtitle = tbtitle.substring(0,50) + "…";
    }
    $('script, style, a').remove();
    var tbtext = $('body').text().replace(/\s/g,"");
    if (tbtext.length > 60){
      tbtext = tbtext.substring(0,60) + "…";
    }
    var tbimg = $('img').eq(0).url('data-original-src');
    console.log({ title: tbtitle, text: tbtext, img: tbimg });
    callback(null, { title: tbtitle, text: tbtext, img :tbimg });
  })
  .catch(function (err) {
    console.log({ error: "ERROR"});
    console.log(err);
    callback("Not Found");
  })
  .finally(function () {
  });
};
