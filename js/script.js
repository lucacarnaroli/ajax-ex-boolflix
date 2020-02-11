// MILESTONE 1
// Creare un layout base con una searchbar (una input e un button) in cui possiamo
// scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il
// bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni
// film trovato:
// 1. Titolo
// 2. Titolo Originale
// 3. Lingua
// 4. Voto

// MILESTONE 2
// Trasformiamo il voto da 1 a 10 decimale in un numero intero da 1 a 5, così da permetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5, lasciando le restanti vuote (troviamo le icone in FontAwesome).
// Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera della nazione corrispondente, gestendo il caso in cui non abbiamo la bandiera della nazione ritornata dall’API (le flag non ci sono in FontAwesome).

// 8cfa14c1d900fdb373cd185f1f9c9c7f
$(document).ready(function() {
  $('#button').click(function() {
   var query = $('.input').val();
   deleteInput(query);
   callServer(query);
   callServerTv(query);

  });
// comando tastiera
  $('.input').keypress(function(event) {
    if (event.which == 13) {
      var query = $('.input').val();
      deleteInput(query);
      callServer(query);
      callServerTv(query);
    }
  });
  // hover
  $(document).on('mouseenter','.list-box',function() {
    $(this).find('.lista-program').addClass('active');
  });
  $(document).on('mouseleave','.list-box',function() {
    $(this).find('.lista-program').removeClass('active');
  });

});

// FUNZIONI ----------------------------------------------

// stampa film
function printResult(type, result) {
  var source = $('#entry-template').html();
  var template = Handlebars.compile(source);
  var title;
  var originalTitle;

  for (var i = 0; i < result.length; i++) {
    // (singolo oggetto(film))
    var thisFilm = result[i];

    if (type == 'film') {
      title = thisFilm.title;
      originalTitle = thisFilm.original_title;

    } else if (type == 'serie-tv') {
      title = thisFilm.name;
      originalTitle = thisFilm.original_name;
    }
    var urlImg = 'https://image.tmdb.org/t/p/w200/';
    var post;
    // post Null
    if (thisFilm.poster_path == null) {
      post = '<img src="img/not_found.jpg" alt="">';
    } else {
      post = '<img src="'+ urlImg + thisFilm.poster_path +'" alt="">'
    };


    var context = {
      'type': type,
      'title': title,
      'original_title': originalTitle,
      'original_language': printFlag(thisFilm.original_language),
      'vote_average': thisFilm.vote_average,
      'star': printStar(thisFilm.vote_average),
      'overview': thisFilm.overview,
      'poster_path': post

    }


    var html = template(context);
    $('.lista-film').append(html);
  }
}

// chiamta api
function callServer(string) {
  $.ajax(
    {
      url: "https://api.themoviedb.org/3/search/movie",
      method: "GET",
      data: {
        api_key: '8cfa14c1d900fdb373cd185f1f9c9c7f',
        query: string,
        language: 'it-IT',
    },
      success: function (data) {
        var films = data.results;
        // console.log(films);
        printResult('film', films);
        // totalResult(data);
        if (data.total_results === 0) {
          alert('Film non trovato!');
        }
    },
      error: function (richiesta, stato, errore) {
        alert('errors'+errore);
      }
    });
}
function callServerTv(string) {
  $.ajax(
    {
      url: "https://api.themoviedb.org/3/search/tv",
      method: "GET",
      data: {
        api_key: '8cfa14c1d900fdb373cd185f1f9c9c7f',
        query: string,
        language: 'it-IT',
    },
      success: function (data) {
        var serie = data.results;
        // console.log(serie);
        printResult('serie-tv', serie);
        // totalResult(data);
        if (data.total_results === 0) {
          alert('Serie tv non trovata!');
        }

    },
      error: function (richiesta, stato, errore) {
        alert('errors'+ errore);
      }
    });
}
// formattazione contenuto prec
function deleteInput() {
  $('.lista-film').html('');
  $('.input').val('');
}

// stampa stella
function printStar(vote) {
  var vote = Math.round(vote / 2);
  var star = '';
  for (var i = 1; i <= 5; i++) {
    if (i <= vote) {
      star += '<i class="fas fa-star"></i>';
    } else {
      star += '<i class="far fa-star"></i>';
    }
  }
  return star
}
// stampa bandiere
function printFlag(lang) {
  // array con acronimi
  var arrayLang = ['it','es','en','fr','ja','da','tr','de','pt','cn','nl'];
  // se data.original_language(lang) è incluso nell'array, prendi l'img
  if (arrayLang.includes(lang)) {
    var lang = '<img src="flags-mini/' + lang + '.png">';
  }
  return lang
}
