import { fetchCharacters, page } from "../../index.js";
import { searchBarInput } from "../../index.js";
import { query } from "../../index.js";


searchBarInput.addEventListener("input", updateBySearchQuery);
searchBarInput.addEventListener("submit", updateBySearchQuery);

export function updateBySearchQuery(){
    query = target.value;
    page = 1;
    fetchCharacters(page, query);

    if (query === ""){
        fetchCharacters();
    } 
}