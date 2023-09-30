"use strict";

const inputSearch = document.querySelector(".js-search-text");
const btnInput = document.querySelector(".js-search-btn");
const ulFilms = document.querySelector(".js-films");
const ulFav = document.querySelector(".js-ul-favorites");

let dataApi = [];

let filmsList = [];
let filmsFav = [];

function handleSearch(event) {
  event.preventDefault();
  const searchValue = inputSearch.value;
  fetch(`//api.tvmaze.com/search/shows?q=${searchValue}`) //con fetch nos traemos de la api la información que se introduce en el cuadro de búsqueda.
    .then((response) => response.json()) // en el primer then convertimos la primera respuesta al formato json
    .then((dataApi) => {
      //console.log(dataApi);
      PaintHtml(dataApi); //con esto le llega a la funcion paintHtml el paquete (dataApi)
      addToFav();
    });
}

function PaintHtml(data) {
  //funcion para pintar en el html lo q
  ulFilms.innerHTML = ""; //se define el input vacio para limpiarlo en cada nueva busqueda.
  for (const films of data) {
    // ulFilms.innerHTML += `<li id=${films.show.id}><h2>${films.show.name}</h2><img src=${films.show.image.medium} alt""></li>`;
    //Ya no hace falta al poner el condicional. Ahora se pinta una cosa u otra en funcion del if. (si se queda se pintaria dos veces.)

    if (films.show.image === null) {
      //tambien vale si poner !== null dando la vuelta a la logica.
      ulFilms.innerHTML += `<li id=${films.show.id} class="list-films js-list-films"><h2>${films.show.name}</h2><img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt""></li>`;
      //console.log("no hay foto");
    } else {
      ulFilms.innerHTML += `<li id=${films.show.id} class="list-films js-list-films"><h2>${films.show.name}</h2><img src=${films.show.image.medium} alt""></li>`;

     // console.log("hay foto");
    }
    filmsList.push(films.show);
  }
  console.log(filmsList);
}

function PaintHtmlFav(filmsFav) {
    //funcion para pintar en el html lo q
    ulFav.innerHTML = ""; //se define el input vacio para limpiarlo en cada nueva busqueda.
    for (const films of filmsFav) {
      // ulFilms.innerHTML += `<li id=${films.show.id}><h2>${films.show.name}</h2><img src=${films.show.image.medium} alt""></li>`;
      //Ya no hace falta al poner el condicional. Ahora se pinta una cosa u otra en funcion del if. (si se queda se pintaria dos veces.)
  
      if (films.image === null) {
        //tambien vale si poner !== null dando la vuelta a la logica.
        ulFav.innerHTML += `<li id=${films.id} class="list-films-fav js-list-films-fav"><h2>${films.name}</h2><img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt""></li>`;
      } else {
        ulFav.innerHTML += `<li id=${films.id} class="list-films-fav js-list-films-fav"><h2>${films.name}</h2><img src=${films.image.medium} alt""></li>`;
      }
    }
  }
  



function handleClickFav(event) {
    console.log(event.currentTarget.id);
   // console.log(event.target.id);
  const idFilmClicked = parseInt(event.currentTarget.id);
  let foundFilm = filmsList.find((elem) => elem.id === idFilmClicked);
  //console.log(foundFilm);
  const positionFav = filmsFav.findIndex((elem) => elem.id === idFilmClicked);
//console.log(positionFav);
//console.log(filmsFav);
  if (positionFav === -1) {
    filmsFav.push(foundFilm);
  } else {
    filmsFav.splice(positionFav, 1);
  }
  console.log(filmsFav);
  PaintHtmlFav(filmsFav);
}

function addToFav() {
  //me tengo que traer las peliculas favoritas cuando ya esten cargado el listado de peliculas.
  //utlizamos ul que se definio al principio. Al principio estaba vacio y ahora contiene el listado de películas que se ha buscado.
  //console.log(ulFilms);
  const allFilms = document.querySelectorAll('.js-list-films');
  for (const eachFilm of allFilms ) {
    eachFilm.addEventListener("click", handleClickFav);
    //console.log(eachFilm);
  }
}


btnInput.addEventListener("click", handleSearch);