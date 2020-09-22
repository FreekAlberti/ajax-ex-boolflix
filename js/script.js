$(document).ready(function() {
$(".btn").click(function() {
  var ricerca = $(".input-titolo").val();
  $.ajax(
    {
      "url": "https://api.themoviedb.org/3/search/movie",
      "data": {
        "api_key" : "e809f4ea095436f35151e7d0e1a01040",
        "query" : ricerca,
        "language" : "it-IT",
        "include_adult" : false
      },
      "method": "GET",
      "success": function (data, stato) {
        var filmAPI = data.results;
        $("li").each(function() {
          $(this).remove();
        });
        risultatiFilm(filmAPI, ricerca);
      },
      "error": function (richiesta, stato, errori) {
        console.log(errori);
      }
    }
  );
});
});

function risultatiFilm(filmAPI, ricerca) {
  var source = $("#film-template").html();
  var template = Handlebars.compile(source);
  for (var i = 0; i < filmAPI.length; i++) {
    var title = filmAPI[i].title;
    var originalTitle = filmAPI[i].original_title;
    var lan = filmAPI[i].original_language;
    var voto = filmAPI[i].vote_average;
    var context = {
      "title" : title,
      "original_title" : originalTitle,
      "original_language" : lan,
      "vote_average" : voto
    };
    var html = template(context);
    $("#lista-film").append(html);
  }
  $(".input-titolo").val("");
}
