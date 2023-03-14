import { createCharacterCard } from "./components/card/card.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBarInput = document.querySelector(".search-bar__input");
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 42;
let page = 1;
let query = "";

searchBarInput.addEventListener("input", (event) => {
  query = event.target.value;
  page = 1;
  fetchCharacters(page, query);

  if (query === "") {
    fetchCharacters();
  }
});

function handleNavigation() {
  nextButton.disabled = false;
  prevButton.disabled = false;

  if (page === maxPage) {
    nextButton.disabled = true;
  } else if (page === 1) {
    prevButton.disabled = true;
  }
}

async function fetchCharacters(pageCount = 1, searchQuery = "") {
  try {
    const fetchJsonData = await fetch(
      `https://rickandmortyapi.com/api/character?page=${pageCount}&name=${searchQuery}`
    );
    const data = await fetchJsonData.json();

    let { results: characters } = data;
    let { info } = data;

    maxPage = info.pages;
    page = pageCount;
    pagination.innerHTML = `${pageCount} / ${maxPage}`;

    handleNavigation();

    cardContainer.innerHTML = "";

    characters.forEach((character) => {
      let name = character.name;
      let imgSrc = character.image;
      let status = character.status;
      let type = character.type;
      let occ = character.episode.length;

      cardContainer.append(
        createCharacterCard(name, status, type, occ, imgSrc)
      );
    });
  } catch (error) {
    alert(
      `WUBBA LUBBA DUB DUB \r\nOops! something went wrong: No characters for your search query! Try again!`
    );
    fetchCharacters();
    searchBar.reset();
    console.error(error);
  }
}

nextButton.addEventListener("click", () => {
  fetchCharacters(++page, query);
});

prevButton.addEventListener("click", () => {
  fetchCharacters(--page, query);
});

fetchCharacters();
