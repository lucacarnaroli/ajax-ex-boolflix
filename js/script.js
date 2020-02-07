// Creare un layout base con una searchbar (una input e un button) in cui possiamo
// scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il
// bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni
// film trovato:
// 1. Titolo
// 2. Titolo Originale
// 3. Lingua
// 4. Voto

// 8cfa14c1d900fdb373cd185f1f9c9c7f
$(document).ready(function() {
  $('#button').click(function() {

  var query = $('.input').val();
   deleteInput(query);
  callServer(query);

  });
});

function printFilm(films) {
  var source = $('#entry-template').html();
  var template = Handlebars.compile(source);

  for (var i = 0; i < films.length; i++) {
    // (singolo oggetto(film))
    var thisFilm = films[i];
    // var context = {
    //   title : thisFilm.title,
    //   original_title: thisFilm.original_title,
    //   original_language: thisFilm.original_language,
    //   vote_average: thisFilm.vote_average,
    // }

    var html = template(thisFilm);
    $('.lista-film').append(html);
  }
}

$('.input').keypress(function(event) {
  if (event.which == 13) {
    var query = $('.input').val();
    callServer(query);
    deleteInput(query);
  }
})

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
        console.log(films);
        printFilm(films);
        totalResult(data);

     },
      error: function (richiesta, stato, errors) {
        console.log(errors);
      }
    });
}
function deleteInput(string) {
  $('.lista-film').html('');
    var string = $('.input').val('');
}
function totalResult(data) {
  if (!data.total_results > 0) {
    alert('Film non trovato!');
  }
}
