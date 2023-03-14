import { createCharacterCard } from "./components/card/card.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
const maxPage = 42;
let page = 1;
const searchQuery = "";

async function fetchCharacters(pageCount = 1) {
  const fetchJsonData = await fetch(
    `https://rickandmortyapi.com/api/character?page=${pageCount}`
  );

  const data = await fetchJsonData.json();

  let { results: characters } = data;
  page = pageCount;
  pagination.innerHTML = `${pageCount} / ${maxPage}`;

  cardContainer.innerHTML = "";

  characters.forEach((character, index) => {
    let index1 = index;
    let name = character.name;
    let imgSrc = character.image;
    let status = character.status;
    let type = character.type;
    let occ = character.episode.length;
    cardContainer.append(createCharacterCard(name, status, type, occ, imgSrc));
  });
}

fetchCharacters();

nextButton.addEventListener("click", (event) => {
  let currentPage = page;
  if (currentPage >= 42) {
    event.target.disabled = true;
    event.preventDefault();
  }
  event.target.disabled = false;
  fetchCharacters(++currentPage);
  console.log(page);
});

prevButton.addEventListener("click", (event) => {
  let currentPage = page;
  if (currentPage <= 1) {
    event.target.disabled = true;
    event.preventDefault();
  }
  event.target.disabled = false;
  fetchCharacters(--currentPage);
  console.log(page);
});
