"use strict";
const poster = document.querySelector("header img");
const adv = document.querySelectorAll("#main_promo .mp");
const filmsBlock = document.querySelector("#films");
const form = document.querySelector("#add");

poster.src = "img/bg2.jpg";
poster.alt = "Hitman's Wife's Bodyguard";
adv.forEach((adv) => adv.remove());
document.title = poster.alt;

const _DB = {
  allMovies: [
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
  movies: [],
  favMovies: [],
};
function getFilms() {
  if (_DB.allMovies.length > 19) {
    _DB.movies = [];
    for (let i = 0; i < 20; i++) {
      let filmIndex = Math.floor(Math.random() * _DB.allMovies.length);
      console.log(filmIndex);
      if (_DB.movies.includes(_DB.allMovies[filmIndex])) {
        i--;
        console.log("film alredy extends");
      } else {
        _DB.movies.push(_DB.allMovies[filmIndex]);
      }
    }
  } else {
    _DB.movies = _DB.allMovies;
  }
}
getFilms();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let val = e.target.firstElementChild.value.trim();
  let valCopy = val;
  const check = document.querySelector("input[name='favorite']");

  if (val !== "") {
    _DB.allMovies.push(valCopy);

    if (val.length >= 21) {
      val = `${val.slice(0, 21)}...`;
    }
    if (check.checked) {
      console.log(`This film <${valCopy}> added to favorite`);
      _DB.favMovies.push(valCopy);
    }
  }
  getFilms();
  setSort(_DB.movies);

  createFilmsList(_DB.movies, filmsBlock);

  e.target.reset();
});

function setSort(arr) {
  arr.sort();
}

function createFilmsList(films, parent) {
  parent.innerHTML = "";
  setSort(films);

  films.forEach((film, index) => {
    parent.innerHTML += `
			<p >
				${index + 1}. ${film} 
				<span data-rm>&#128465</span>
				<span class="fav"> &#11088</span>
			</p>
		`;
  });

  removeFilmFromList("[data-rm]");
  addToFav();
}

function removeFilmFromList(selector) {
  setSort(_DB.movies);
  document.querySelectorAll(selector).forEach((btn, index) => {
    btn.addEventListener("click", () => {
      btn.parentElement.remove();
      _DB.movies.splice(index, 1);
      createFilmsList(_DB.movies, filmsBlock);
    });
  });
}
function addToFav() {
  const favs = document.querySelectorAll(".fav");

  favs.forEach((fav, i) => {
    fav.addEventListener("click", () => {
      let text = fav.parentElement.textContent
        .replace(/[^a-zA-Z_ ]/g, "")
        .trim();
      _DB.favMovies.push(text);
      fav.parentElement.style.color !== "red"
        ? (fav.parentElement.style.color = "red")
        : (fav.parentElement.style.color = "black");
    });
  });
}

createFilmsList(_DB.movies, filmsBlock);
