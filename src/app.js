/* eslint-disable */
import "bootstrap";
import "./style.css";

const BODY = document.querySelector("body");
const DRAW = document.querySelector(".draw");
const BUBBLESORT = document.querySelector(".buble-sort");
const SELECTSORT = document.querySelector(".selection-sort");
const SECTION1 = document.querySelector(".cards-line1");
const SECTION2 = document.querySelector(".cards-line2");
const INPUT = document.querySelector(".number-cards");
const VALUE = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13"
];
const SUIT = ["♠", "♥", "♦", "♣"];

window.onload = function() {
  BODY.classList.add("background");
  let cardList = [];

  DRAW.addEventListener("click", event => {
    cardList = GETCARD(event);
    SECTION2.innerHTML = "";
  });

  BUBBLESORT.addEventListener("click", event => {
    SECTION2.innerHTML = "";
    bubbleSort(cardList);
  });

  SELECTSORT.addEventListener("click", event => {
    SECTION2.innerHTML = "";
    selectionSort(cardList);
  });
};

function GETCARD(event) {
  event.preventDefault();
  SECTION1.innerHTML = "";
  let cards = [];
  for (let i = 0; i < INPUT.value; i++) {
    cards.push(DRAWCARD());
  }
  return cards;
}
function DRAWCARD(family = null, number = null) {
  let card;

  if (family == null || number == null) {
    card = {
      suit: SUIT[getRandom(SUIT)],
      value: VALUE[getRandom(VALUE)],
      index: null
    };
  } else {
    card = {
      suit: family,
      value: number,
      index: null
    };
  }

  if (card.value == "1") {
    card.value = "A";
  }
  if (card.value == "11") {
    card.value = "J";
  }
  if (card.value == "12") {
    card.value = "Q";
  }
  if (card.value == "13") {
    card.value = "K";
  }

  card.index = card.value;

  let DRAWCARD = document.createElement("div");
  DRAWCARD.classList.add("poker-card");

  let firstSuitContainer = document.createElement("div");
  let firstSuit = document.createTextNode(card.suit);
  firstSuitContainer.appendChild(firstSuit);
  firstSuitContainer.classList.add("align-start");
  DRAWCARD.appendChild(firstSuitContainer);

  let valueContainer = document.createElement("div");
  let value = document.createTextNode(card.value);
  valueContainer.classList.add("card-value");
  valueContainer.appendChild(value);
  DRAWCARD.appendChild(valueContainer);

  let secondSuitContainer = document.createElement("div");
  let secondSuit = document.createTextNode(card.suit);
  secondSuitContainer.appendChild(secondSuit);
  secondSuitContainer.classList.add("align-end");
  secondSuitContainer.classList.add("invert");
  DRAWCARD.appendChild(secondSuitContainer);

  if (card.suit == "♥" || card.suit == "♦") {
    firstSuitContainer.classList.add("red");
    valueContainer.classList.add("red");
    secondSuitContainer.classList.add("red");
  } else {
    firstSuitContainer.classList.add("black");
    valueContainer.classList.add("black");
    secondSuitContainer.classList.add("black");
  }

  if (family == null || number == null) {
    SECTION1.appendChild(DRAWCARD);
    return card;
  } else {
    SECTION2.appendChild(DRAWCARD);
  }
}

function bubbleSort(cardList) {
  for (var i = 0; i < cardList.length; i++) {
    for (var j = 0; j < cardList.length - i - 1; j++) {
      if (cardList[j].index > cardList[j + 1].index) {
        var temp = cardList[j];
        cardList[j] = cardList[j + 1];
        cardList[j + 1] = temp;
      }
    }
  }
  for (let i = 0; i < cardList.length; i++) {
    DRAWCARD(cardList[i].suit, cardList[i].value);
  }
}

function selectionSort(cardList) {
  let min = 0;
  while (min < cardList.length - 1) {
    for (let i = min + 1; i < cardList.length; i++) {
      if (cardList[min].index > cardList[i].index) {
        let aux = cardList[min];
        cardList[min] = cardList[i];
        cardList[i] = aux;
      }
    }
    min++;
  }
  for (let i = 0; i < cardList.length; i++) {
    DRAWCARD(cardList[i].suit, cardList[i].value);
  }
}

function getRandom(list) {
  return Math.floor(Math.random() * list.length);
}
