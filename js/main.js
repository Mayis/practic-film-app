"use strict";

const poster = document.querySelector("header img");
const adv = document.querySelectorAll("#main_promo .mp");
const pageTitle = document.querySelector("title");
const films = document.querySelector("#films");

const _DB = {
  movies: [
    "Logan",
    "Spider-Man",
    "The Seven Samurai",
    "Bonnie and Clyde",
    "Reservoir Dogs",
    "Doctor Zhivago",
    "The Deer Hunter",
    "Rocky",
    "Crid",
  ],
};

poster.src = "img/bg2.jpg";
poster.alt = "Hitman's Wife's Bodyguard";
adv.forEach((adv) => adv.remove());
pageTitle.textContent = poster.alt;

function printFavFilms() {
  _DB.movies.forEach((film, index) => {
    films.innerHTML += `
					<p>
						${index + 1}. ${film} 
						<span data-rm>&#128465</span>
					</p>
				`;
    document.querySelectorAll("[data-rm]").forEach((rec) => {
      rec.addEventListener("click", (e) => {
        e.target.parentElement.remove();
      });
    });
  });
}

printFavFilms();

const input = document.querySelector("#add > input");
const addBtn = document.querySelector("#add >button");
console.log(input);

addBtn.addEventListener("click", (e) => {
  if (input.value !== "") {
    _DB.movies.push(input.value);
    films.innerHTML = ``;
    printFavFilms();
  }
});

console.log(_DB.movies);
