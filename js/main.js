"use strict";

const inputSearch = document.querySelector(".js-search-text");
const btnInput = document.querySelector(".js-search-btn");
const ulFilms = document.querySelector(".js-films");
const ulFav = document.querySelector(".js-ul-favorites");

const btnDelete = document.querySelector('.js-delete-btn');
const xDelete = document.querySelector('.js-delete');

let dataApi = [];

let filmsList = [];
let filmsFav = [];


//LocalStorage
//hago una nueva constante para buscar si existe el item en el localstorage.
//si existe (contiene algo) será distinto de null y entra en el if. si es null seguirá su curso.
//si entramos en el if, llamamos a la funcion Painthtml para que pinte los fav recuperador del LS.
const filmFavLS= JSON.parse(localStorage.getItem("localFav")); 
if(filmFavLS !==null){
    filmsFav = filmFavLS;
    PaintHtmlFav(filmsFav);
} 

function handleSearch(event) {
  event.preventDefault();
  const searchValue = inputSearch.value;
  fetch(`//api.tvmaze.com/search/shows?q=${searchValue}`) //con fetch nos traemos de la api la información que se introduce en el cuadro de búsqueda.
    .then((response) => response.json()) // en el primer then convertimos la primera respuesta al formato json
    .then((dataApi) => {
      //console.log(dataApi);
      PaintHtml(dataApi); //con esto le llega a la funcion paintHtml el paquete (dataApi)
      addFav();
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
      ulFilms.innerHTML += `<li id=${films.show.id} class="list-films js-list-films"><h2 class="h2-list">${films.show.name}</h2><img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt""></li>`;
      //console.log("no hay foto");
    } else {
      ulFilms.innerHTML += `<li id=${films.show.id} class="list-films js-list-films"><h2 class="h2-list">${films.show.name}</h2><img src=${films.show.image.medium} alt""></li>`;

     // console.log("hay foto");
    }
    filmsList.push(films.show);
  }
  //console.log(filmsList);
  //checkFav(filmsList);
}

function PaintHtmlFav(filmsFav) {
    //funcion para pintar en el html lo q
    ulFav.innerHTML = ""; //se define el input vacio para limpiarlo en cada nueva busqueda.
    for (const films of filmsFav) {
      // ulFilms.innerHTML += `<li id=${films.show.id}><h2>${films.show.name}</h2><img src=${films.show.image.medium} alt""></li>`;
      //Ya no hace falta al poner el condicional. Ahora se pinta una cosa u otra en funcion del if. (si se queda se pintaria dos veces.)
  
      if (films.image === null) {
        //tambien vale si poner !== null dando la vuelta a la logica.
        ulFav.innerHTML += `<span class="js-delete">&#10008;</span><li id=${films.id} class="list-films-fav js-list-films-fav"><h2 class="h2-fav">${films.name}</h2><img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt""></li>`;
      } else {
        ulFav.innerHTML += `<span class="js-delete">&#10008;</span><li id=${films.id} class="list-films-fav js-list-films-fav"><h2 class="h2-fav">${films.name}</h2><img src=${films.image.medium} alt""></li>`;
      }
    }
  }
  
 



//creo una funcion manejadora para añadir a favoritos la pelicula cuando haga click sobre ella.
function handleClickFav(event) {
   //nos traemos a la funcion el id de la pelicula sobre la que hemos hecho click. 
  const idFilmClicked = parseInt(event.currentTarget.id);//convertir a entero el id del current target (que venia como string) y asi no lo podia comparar con el id de cada elemento de la lista de peliculas.
  //Busco dentro de la lista de películas, cual de todas coincide con el id de la pelicula sobre la que hemos hecho click.
  let foundFilm = filmsList.find((elem) => elem.id === idFilmClicked);
  //busco la pelicula sobre la que hice click para añadirla a favoritos.
  const positionFav = filmsFav.findIndex((elem) => elem.id === idFilmClicked);
//
//console.log(filmsFav);
  if (positionFav === -1) {
    filmsFav.push(foundFilm);//si sale -1 (no esta en fav, no lo encuentra) por lo tanto lo añade a favoritos(filmsFav).
    changeColorsFav(idFilmClicked);//al añadir la peli a fav llamamos a la funcion que cambia su clase
  } else {
    filmsFav.splice(positionFav, 1);//si no sale -1 ya esta en fav, y lo elimina
    removeColorsFav(idFilmClicked);//al eliminar la peli a fav llamamos a la funcion que cambia su clase
  }
  //console.log(filmsFav);
  PaintHtmlFav(filmsFav);//una vez que tenemos la caja de favoritos, llamamos a la funcion pintarHtmlFav, para que nos pinte la caja de favoritos.

  localStorage.setItem("localFav", JSON.stringify(filmsFav));

}

function addFav() {
  //me tengo que traer las peliculas favoritas cuando ya esten cargado el listado de peliculas.
  //utlizamos ul que se definio al principio. Al principio estaba vacio y ahora contiene el listado de películas que se ha buscado.
  //console.log(ulFilms);
  const allFilms = document.querySelectorAll('.js-list-films');
  for (const eachFilm of allFilms ) {
    eachFilm.addEventListener("click", handleClickFav);
   // debugger;
    //console.log(eachFilm);
  }
}

function handleDelete(event) {//para borrar primero vacio el let de las peliculas favoritas y vuelvo a llamar a la funcion paintHtmlFav. para que lo vuelva a pintar vacio.
    event.preventDefault();
    let filmsFav = [];
    PaintHtmlFav(filmsFav);
    localStorage.setItem("localFav", JSON.stringify(filmsFav));
}


 function changeColorsFav(idFilmClicked) {//recibimos el id en el que hemos hecho el click
    let liFav = document.getElementById(idFilmClicked);//definimos variable liFav con el id de la pelicula sobre la que hemos hecho click con DOM
    liFav.classList.add('js-is-fav');//añadimos la clase al li cuyo id coincide con el que se ha hecho click.
 }

 function removeColorsFav(idFilmClicked) {
    let liFav = document.getElementById(idFilmClicked);
    liFav.classList.remove('js-is-fav');
 }

btnInput.addEventListener("click", handleSearch);
btnDelete.addEventListener("click", handleDelete);

