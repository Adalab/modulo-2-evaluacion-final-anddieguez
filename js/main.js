"use strict";

const inputSearch = document.querySelector(".js-search-text");
const btnInput = document.querySelector(".js-search-btn");
const ulFilms = document.querySelector(".js-films");

let data = [];

function handleclick(event) {
  event.preventDefault();
  const searchValue = inputSearch.value;
  fetch(`//api.tvmaze.com/search/shows?q=${searchValue}`) //con fetch nos traemos de la api la información que se introduce en el cuadro de búsqueda.
    .then((response) => response.json()) // en el primer then convertimos la primera respuesta al formato json
    .then((data) => {
      ulFilms.innerHTML = ""; //se define el input vacio para limpiarlo en cada nueva busqueda.

      console.log(data);

      for (const films of data) {
        // ulFilms.innerHTML += `<li id=${films.show.id}><h2>${films.show.name}</h2><img src=${films.show.image.medium} alt""></li>`;
        //Ya no hace falta al poner el condicional. Ahora se pinta una cosa u otra en funcion del if. (si se queda se pintaria dos veces.)

        if (films.show.image === null) {//tambien vale si poner !== null dando la vuelta a la logica.
            ulFilms.innerHTML += `<li id=${films.show.id}><h2>${films.show.name}</h2><img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt""></li>`;
            console.log('no hay foto');
        } else {
          
          ulFilms.innerHTML += `<li id=${films.show.id}><h2>${films.show.name}</h2><img src=${films.show.image.medium} alt""></li>`;

          console.log('hay foto');
        }
      }
    });
}

btnInput.addEventListener("click", handleclick);
