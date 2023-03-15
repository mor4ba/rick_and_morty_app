import { fetchCharacters } from "../../index.js";
import { prevButton } from "../../index.js";
import { nextButton } from "../../index.js";

export function navButton() {
    nextButton.addEventListener("click", () => {
        fetchCharacters(++page, query);
      });
      
      prevButton.addEventListener("click", () => {
        fetchCharacters(--page, query);
      });


}
