$(document).ready(function() {
var ricerca = "ritorno al futuro";
  $.ajax(
    {
      "url": "https://api.themoviedb.org/3/search/movie",
      "data": {
        "api_key" : "e809f4ea095436f35151e7d0e1a01040",
        "query" : ricerca
      },
      "method": "GET",
      "success": function (data, stato) {
        console.log(data);
      },
      "error": function (richiesta, stato, errori) {
        console.log(errori);
      }
    }
  );

  // e809f4ea095436f35151e7d0e1a01040

  // Handlebars
  var source = $("#film-template").html();
  var template = Handlebars.compile(source);
  var context = {
    title: "My New Post",
    body: "This is my first post!"
  };
  var html = template(context);
  $("#lista-film").append(html);
});
