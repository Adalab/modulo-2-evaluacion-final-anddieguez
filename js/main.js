"use strict";

const inputSearch = document.querySelector(".js-search-text");
const btnInput = document.querySelector(".js-search-btn");
const ulFilms = document.querySelector(".js-films");


let dataApi = [];

function handleclick(event) {
  event.preventDefault();
  const searchValue = inputSearch.value;
  fetch(`https://api.tvmaze.com/search/shows?q=${searchValue}`) //con fetch nos traemos de la api la información que se introduce en el cuadro de búsqueda.
    .then((response) => response.json()) // en el primer then convertimos la primera respuesta al formato json
    .then((data) => {
        //ulFilms.innerHTML = "";
        //ulFilmImg.innerHTML = "";
        console.log(data);
        dataApi = data;
        for (const data of dataApi) {
            ulFilms.innerHTML += `<li id=${data.show.id}><h2>${data.show.name}</h2><img src=${data.show.image.medium} alt""></li>`;
        }
    });
}

btnInput.addEventListener("click", handleclick);
