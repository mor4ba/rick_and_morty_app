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
const maxPage = 1;
const page = 1;
const searchQuery = "";

async function fetchCharacters() {
  const fetchJsonData = await fetch(
    "https://rickandmortyapi.com/api/character?2=<pageIndex>"
  );

  const data = await fetchJsonData.json();
  console.log(data);

  let { results: characters } = data;

  console.log(characters);

  characters.forEach((character, index) => {
    let index1 = index;
    let name = character.name;
    let imgSrc = character.image;
    let status = character.status;
    let type = character.type;
    let occ = character.episode.length;

    //testing stuff w/o actual function
    let li = document.createElement("li");
    li.innerText = `Name: ${name} \r\n Occurances: ${occ} \r\n Status: ${status} \r\n Img-Source: ${imgSrc} \r\n  Type: ${type} \r\n Index: ${index1}`;
    cardContainer.append(li);
  });
}

fetchCharacters();
