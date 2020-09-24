$(document).ready(function() {
  $(".btn").click(function() {
    $("h2").show();
    removeLi();
    chiamataAjaxTv();
    chiamataAjaxFilm();
  });
  $(document).keydown(function(e){
    if (e.keyCode == 13) {
      $("h2").show();
      removeLi();
      chiamataAjaxTv();
      chiamataAjaxFilm();
    }
  });
});


// FUNCTION

function chiamataAjaxTv() {
  var ricerca = $(".input-titolo").val();
  $.ajax(
    {
      "url": "https://api.themoviedb.org/3/search/tv",
      "data": {
        "api_key" : "e809f4ea095436f35151e7d0e1a01040",
        "query" : ricerca,
        "language" : "it-IT",
        "include_adult" : false,
      },
      "method": "GET",
      "success": function (data, stato) {
        var risultatiAPI = data.results;
        risultatiRender(risultatiAPI, ricerca);
      },
      "error": function (richiesta, stato, errori) {
        console.log(errori);
      }
    }
  );
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
        "include_adult" : false,
      },
      "method": "GET",
      "success": function (data, stato) {
        var risultatiAPI = data.results;
        risultatiRender(risultatiAPI, ricerca);
      },
      "error": function (richiesta, stato, errori) {
        console.log(errori);
      }
    }
  );
}

function risultatiRender(risultatiAPI, ricerca) {
  var source = $("#richiesta-template").html();
  var template = Handlebars.compile(source);
  for (var i = 0; i < risultatiAPI.length; i++) {
    if (risultatiAPI[i].title != undefined) {
      var title = risultatiAPI[i].title;
      var originalTitle = risultatiAPI[i].original_title;
      var container = $("#lista-film");
    } else {
      var title = risultatiAPI[i].name;
      var originalTitle = risultatiAPI[i].original_name;
      var container = $("#lista-tv");
    }
    var story = risultatiAPI[i].overview;
    var lan = risultatiAPI[i].original_language;
    var voto = risultatiAPI[i].vote_average;
    var poster = "https://image.tmdb.org/t/p/w300/" + risultatiAPI[i].poster_path;
    var votoIntero = votoInt(voto);
    var starRating = stars(votoIntero);
    var bandieraLingua = lanFlag(lan);
    var context = {
      "title" : title,
      "poster_path" : poster,
      "original_title" : originalTitle,
      "vote_average" : starRating,
      "flag-icon": bandieraLingua,
      "story" : story
    };
    var html = template(context);
    container.append(html);
  }
  $(".input-titolo").val("");
}

// funzioni generiche

// star rating

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

// languages flag

function lanFlag(lan) {
  var arrayLan = ["it", "en", "fr", "ja"];
  if (arrayLan.includes(lan)) {
    return "<img class='bandiera' src='img/"+ lan +".svg' alt='bandiera'>"
  } else {
    return lan;
  }
}

// altro

function removeLi() {
  $("li").each(function() {
    $(this).remove();
  });
}
