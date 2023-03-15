import { createCharacterCard } from "./components/card/card.js";
import { handleNavigation } from "./components/nav-pagination/nav-pagination.js";
import { navButton } from "./components/nav-button/nav-button.js";

const cardContainer = document.querySelector('[data-js="card-container"]');

export const searchBarInput = document.querySelector(".search-bar__input");
const searchBar = document.querySelector('[data-js="search-bar"]');

export const prevButton = document.querySelector('[data-js="button-prev"]');
export const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
export let maxPage = 42;
export let page = 1;
export let query = "";

searchBarInput.addEventListener("input", updateBySearchQuery);
searchBarInput.addEventListener("submit", updateBySearchQuery);

function updateBySearchQuery() {
  query = event.target.value;
  page = 1;
  fetchCharacters(page, query);

  if (query === "") {
    fetchCharacters();
  }
}

// handleNavigation();

export async function fetchCharacters(pageCount = 1, searchQuery = "") {
  try {
    const fetchJsonData = await fetch(
      `https://rickandmortyapi.com/api/character?page=${pageCount}&name=${searchQuery}`
    );
    const data = await fetchJsonData.json();

    let { results: characters } = data;
    let { info } = data;
    console.log(data);

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
    query = "";
    searchBar.reset();
    console.error(error);
  }
}

navButton();

nextButton.addEventListener("click", () => {
  fetchCharacters(++page, query);
});

prevButton.addEventListener("click", () => {
  fetchCharacters(--page, query);
});

fetchCharacters();
