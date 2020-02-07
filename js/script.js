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

// 8cfa14c1d900fdb373cd185f1f9c9c7f
$(document).ready(function() {
  $('#button').click(function() {
   var query = $('.input').val();
   deleteInput(query);
   callServer(query);



  });

  $('.input').keypress(function(event) {
    if (event.which == 13) {
      var query = $('.input').val();
      callServer(query);
      deleteInput(query);
    }
  });
});

// FUNZIONI ----------------------------------------------

// stampa film
function printFilm(films) {
  var source = $('#entry-template').html();
  var template = Handlebars.compile(source);

  for (var i = 0; i < films.length; i++) {
    // (singolo oggetto(film))
    var thisFilm = films[i];
    var html = template(thisFilm);
    $('.lista-film').append(html);
  }
}
// comando tastiera

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
        console.log(films);

        printFilm(films);
        totalResult(data);
        numInt(data);
        numInt(data);
        numInt(data);


    },
      error: function (richiesta, stato, errors) {
        console.log(errors);
      }
    });
}
// formattazione contenuto prec
function deleteInput(string) {
  $('.lista-film').html('');
  var string = $('.input').val('');
}
// contenuto non trovato + mess
function totalResult(data) {
  if (!data.total_results > 0) {
    alert('Film non trovato!');
  }
}
function numInt(num) {
  var num = data.vote_average;
  var numInt = Math.ceil(num);
}
