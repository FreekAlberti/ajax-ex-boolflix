$(document).ready(function() {
  $(".btn").click(function() {
    $("h1").show();
    removeLi();
    chiamataAjaxTv();
    chiamataAjaxFilm();
  });
  $(document).keydown(function(e){
    if (e.keyCode == 13) {
      $("h1").show();
      removeLi();
      chiamataAjaxTv();
      chiamataAjaxFilm();
    }
  });
});


// FUNCTION

// TV function

function risultatiTv(tvAPI, ricerca) {
  console.log(tvAPI);
  console.log(ricerca);
  var source = $("#tv-template").html();
  var template = Handlebars.compile(source);
  for (var i = 0; i < tvAPI.length; i++) {
    var name = tvAPI[i].name;
    var originalName = tvAPI[i].original_name;
    var lan = tvAPI[i].original_language;
    var voto = tvAPI[i].vote_average;
    var votoIntero = votoInt(voto);
    var starRating = stars(votoIntero);
    var context = {
      "name" : name,
      "original_name" : originalName,
      "original_language" : lan,
      "vote_average" : starRating
    };
    var html = template(context);
    $("#lista-tv").append(html);
  }
}

function chiamataAjaxTv() {
  var ricerca = $(".input-titolo").val();
  $.ajax(
    {
      "url": "https://api.themoviedb.org/3/search/tv",
      "data": {
        "api_key" : "e809f4ea095436f35151e7d0e1a01040",
        "query" : ricerca,
        "language" : "it-IT",
        "include_adult" : false
      },
      "method": "GET",
      "success": function (data, stato) {
        var tvAPI = data.results;
        risultatiTv(tvAPI, ricerca);
      },
      "error": function (richiesta, stato, errori) {
        console.log(errori);
      }
    }
  );
}

// Film function

function risultatiFilm(filmAPI, ricerca) {
  var source = $("#film-template").html();
  var template = Handlebars.compile(source);
  for (var i = 0; i < filmAPI.length; i++) {
    var title = filmAPI[i].title;
    var originalTitle = filmAPI[i].original_title;
    var lan = filmAPI[i].original_language;
    var voto = filmAPI[i].vote_average;
    var votoIntero = votoInt(voto);
    var starRating = stars(votoIntero);
    var context = {
      "title" : title,
      "original_title" : originalTitle,
      "original_language" : lan,
      "vote_average" : starRating
    };
    var html = template(context);
    $("#lista-film").append(html);
  }
  $(".input-titolo").val("");
}

function chiamataAjaxFilm() {
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
        risultatiFilm(filmAPI, ricerca);
      },
      "error": function (richiesta, stato, errori) {
        console.log(errori);
      }
    }
  );
}

// funzioni genriche

function votoInt(voto) {
  var votoCinque = voto / 2;
  var votoIntero = Math.ceil(votoCinque);
  return votoIntero;
}

function stars(votoIntero) {
  var starRating = "";
  for (var i = 1; i <= 5; i++) {
    if (votoIntero >= i) {
      starRating += '<i class="fas fa-star"></i>';
    } else {
      starRating += '<i class="far fa-star"></i>';
    }
  }
  return starRating;
}

function removeLi() {
  $("li").each(function() {
    $(this).remove();
  });
}
