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
  var query = 'ritorno al futuro';
  $.ajax(
    {
      url: "https://api.themoviedb.org/3/search/movie",
      method: "GET",
      data: {
        api_key: '8cfa14c1d900fdb373cd185f1f9c9c7f',
        query: query,
      },
      success: function (data) {
        var films = data.results;
        printFilm(films);
     },
      error: function (richiesta, stato, errors) {
        console.log(errors);
      }
    });
});

function printFilm(films) {
  var source = $('#entry-template').html();
  var template = Handlebars.compile(source);

  for (var i = 0; i < films.length; i++) {
    // (singolo oggetto(film))
    var thisFilm = films[i];
    console.log(thisFilm);
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
// "title": "Ritorno al futuro",
// "original_language": "en",
// "original_title": "Back to the Future",
// "vote_average": 8.2,
