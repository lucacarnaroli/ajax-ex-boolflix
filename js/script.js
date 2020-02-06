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
  $.ajax(
    {
      url: "https://api.themoviedb.org/3/search/movie",
      method: "GET",
      data: {
        api_key: '8cfa14c1d900fdb373cd185f1f9c9c7f',

      },
      success: function (data) {
        console.log(data);
     },
      error: function (richiesta, stato, errors) {
        console.log(errors);
      }
    });
});

// "title": "Ritorno al futuro",
// "original_language": "en",
// "original_title": "Back to the Future",
// "vote_average": 8.2,
//  "original_language": "en",
