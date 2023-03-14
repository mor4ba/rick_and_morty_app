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
// Anzahl max. Seiten, wird nicht verändert
const maxPage = 42;

//Aktuelle Seitenzahl, verändert sich durch die fetchCharacters() Funktion und passt sich der aktuellen Seitenzahl an.
let page = 1;
const searchQuery = "";

async function fetchCharacters(pageCount = 1) {
  //Fetch Rick&Morty Datensatz mit entsprechender Seitenzahl (= pageCount)
  const fetchJsonData = await fetch(
    `https://rickandmortyapi.com/api/character?page=${pageCount}`
  );

  //Transformiere Datensatz in JavaScript-verwertbares Objekt
  const data = await fetchJsonData.json();

  //Store Array of Characters in Variable 'characters'
  let { results: characters } = data;

  //reset global variable to current pageCount (Parameter der Funktion, der unsere Seitenzahl der API widesspiegelt)
  page = pageCount;

  if (pageCount === 42) {
    nextButton.disabled = true;
  } else if (pageCount === 1) {
    prevButton.disabled = true;
  } else {
    nextButton.disabled = false;
    prevButton.disabled = false;
  }

  //Set new Pagination in Seitenanzeige
  pagination.innerHTML = `${pageCount} / ${maxPage}`;

  //Cardcontainer leeren
  cardContainer.innerHTML = "";

  //Iterate over each character Object and define the parameters, needed for our CreateCards Function
  characters.forEach((character, index) => {
    let name = character.name;
    let imgSrc = character.image;
    let status = character.status;
    let type = character.type;
    let occ = character.episode.length;

    //append each Card to the CardContainer
    cardContainer.append(createCharacterCard(name, status, type, occ, imgSrc));
  });
}

//Set NextButton Eventlistener
nextButton.addEventListener("click", () => {
  fetchCharacters(++page);
});

prevButton.addEventListener("click", () => {
  fetchCharacters(--page);
});

fetchCharacters();
