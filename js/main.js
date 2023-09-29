"use strict";

const inputSearch = document.querySelector(".js-search-text");
const btnInput = document.querySelector(".js-search-btn");
const ulFilms = document.querySelector(".js-films");
const ulFilmImg = document.querySelector(".js-film-img");

//let dataApi = [];

function handleclick(event) {
  event.preventDefault();
  const searchValue = inputSearch.value;
  fetch(`https://api.tvmaze.com/search/shows?q=${searchValue}`) //con fetch nos traemos de la api la información que se introduce en el cuadro de búsqueda.
    .then((response) => response.json()) // en el primer then convertimos la primera respuesta al formato json
    .then((data) => {
        console.log(data);
       for (let i = 0; i < data.length; i++) {
            ulFilms.innerHTML = `<li>${data[i]["show"]["name"]}</li>`;
            ulFilmImg.src = `${data[i]["show"]["image"]["medium"]}`;
            //console.log(data[i]["show"]["name"]);  
        }
      
    });
}

btnInput.addEventListener("click", handleclick);
