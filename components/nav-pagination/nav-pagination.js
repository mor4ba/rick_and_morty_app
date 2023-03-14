// with this function we are assuring that the next and previous buttons are not going beyond the available amount of data, ie. less than 1 and more than 42
// the buttons are basically enabled unless the arguments of the if statement are met
import { nextButton } from "../../index.js";
import { prevButton } from "../../index.js";
import { page } from "../../index.js";
import { maxPage } from "../../index.js";

export function handleNavigation() {
  nextButton.disabled = false;
  prevButton.disabled = false;

  if (page === maxPage) {
    nextButton.disabled = true;
  } else if (page === 1) {
    prevButton.disabled = true;
  }
}
