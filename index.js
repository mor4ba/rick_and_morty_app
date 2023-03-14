import { createCharacterCard } from "./components/card/card.js";

const cardContainer = document.querySelector('[data-js="card-container"]');

const searchBarInput = document.querySelector(".search-bar__input");
const searchBar = document.querySelector('[data-js="search-bar"]');

const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 42;
let page = 1;
let query = "";

// this event listener is targetting the input of the search bar (as you are typing, whithout needing to press submit)
// we target the value of the query, on page 1 and call our fetchCharacters function, which passes two parameters
//if the search bar is empty we are automatically redirected to the fetch

searchBarInput.addEventListener("input", (event) => {
  query = event.target.value;
  page = 1;
  fetchCharacters(page, query);

  if (query === "") {
    fetchCharacters();
  }
});

// with this function we are assuring that the next and previous buttons are not going beyond the available amount of data, ie. less than 1 and more than 42
// the buttons are basically enabled unless the arguments of the if statement are met

function handleNavigation() {
  nextButton.disabled = false;
  prevButton.disabled = false;

  if (page === maxPage) {
    nextButton.disabled = true;
  } else if (page === 1) {
    prevButton.disabled = true;
  }
}

//this async function is the central piece of our app:
//it passes two parameters: pageCount - from the data fetched from our API and searchQuery from the input of the search bar

async function fetchCharacters(pageCount = 1, searchQuery = "") {
  try {
    const fetchJsonData = await fetch(
      `https://rickandmortyapi.com/api/character?page=${pageCount}&name=${searchQuery}`
    );
    const data = await fetchJsonData.json();

    // First we fetch the API and the relevant json docs
    // then we access the values of the "result" and the "info" elements if the retrieved obj via destructuring

    let { results: characters } = data;
    let { info } = data;
    console.log(data);

    maxPage = info.pages; // set to match the value contained in the API object
    page = pageCount; // defining page to match pageCount as in the url and change dynamically
    pagination.innerHTML = `${pageCount} / ${maxPage}`; //the pagination text box needs to show the corresponding page nr

    handleNavigation(); // we call the function to handle the behaviour of the buttons

    cardContainer.innerHTML = "";

    // in order to make our card element diynamic we use array method for each to access the corresponding information from the API's array elements
    // you need to pass these parameters (fetched on line 61) in the function you created to iterate through the original HTML 

    characters.forEach((character) => {
      let name = character.name;
      let imgSrc = character.image;
      let status = character.status;
      let type = character.type;
      let occ = character.episode.length;

      //we append the new card containers and call the function that will iterate through the relevant parameters
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

//finally we are just changing the the pagination number by calling the fetchCharacters and adjusting the "page" parameters to behave accordingly, 

nextButton.addEventListener("click", () => {
  fetchCharacters(++page, query);
});

prevButton.addEventListener("click", () => {
  fetchCharacters(--page, query);
});

fetchCharacters();
