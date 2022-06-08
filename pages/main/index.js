import help from '../../assets/scripts/help.js';

class PetCard2 {
    constructor(pet) {
        this.petName = document.createElement("h6");
        this.petName.classList.add("pet__name");
        this.petName.textContent = pet.name;
        this.breed = document.createElement("span");
        this.breed.classList.add("pet-card__breed");
        this.breed.textContent = `${pet.type} - ${pet.breed}`;
        this.description = document.createElement("span");
        this.description.classList.add("pet-card__description");
        this.description.textContent = pet.description;
        this.img = document.createElement("div");
        this.img.classList.add("pet__img");
        this.img.style.backgroundImage = `url(${pet.img})`;
        this.petInfo = document.createElement("ul");
        this.petInfo.classList.add("pet-card__bottom");
        const age = document.createElement("li");
        age.classList.add("pet-card__point");
        age.innerHTML = `<strong>Age:</strong> ${pet.age}`;
        const inoculations = document.createElement("li");
        inoculations.classList.add("pet-card__point");
        inoculations.innerHTML =`<strong>Inoculations:</strong> ${pet.inoculations.join(", ")}`;
        const diseases = document.createElement("li");
        diseases.classList.add("pet-card__point");
        diseases.innerHTML =`<strong>Inoculations:</strong> ${pet.diseases.join(", ")}`;
        const parasites = document.createElement("li");
        parasites.classList.add("pet-card__point");
        parasites.innerHTML =`<strong>Inoculations:</strong> ${pet.parasites.join(", ")}`;
        this.petInfo.append(age, inoculations, diseases, parasites);
        this.button = document.createElement("button");
        this.button.classList.add("button", "pet__button");
        this.button.textContent = "Learn more";
        this.isShow = false;
        this.buttonClose = document.createElement("button");
        this.buttonClose.classList.add("round__button", "material-icons", "pet-card__close");
        this.buttonClose.textContent = "close";
        this.petCard = document.createElement("div");
    }

    getPetCard() {
        this.petCard.classList.add("pets__item", "pet");
        const petInfo = document.createElement("div");
        petInfo.classList.add("pet__info", "pet-card");

        this.petDialog = document.createElement("div");
        this.petDialog.classList.add("pet__dialog", "hide");
        const cardImg = document.createElement("div");
        cardImg.classList.add("pet-card__img");
        cardImg.style.backgroundImage = this.img.style.backgroundImage;
        const top = document.createElement("div");
        top.classList.add("pet-card__top");
        const petNameModal = document.createElement("h3");
        petNameModal.classList.add("pet-card__name");
        petNameModal.textContent = this.petName.textContent;
        top.append(petNameModal, this.breed);
        petInfo.append(this.buttonClose, top, this.description, this.petInfo);
        this.petDialog.append(cardImg, petInfo);

        this.petCard.append(this.img, this.petName, this.button, this.petDialog);
        return this.petCard;
    }

    showDialog() {
        this.petCard.addEventListener("click", (e) => {
            this.petDialog.classList.remove("hide");
            shadow.classList.remove("hide");
            document.body.style.overflowY = "hidden";
        })
        this.buttonClose.addEventListener("click", (e) => {
            e.stopPropagation();
            this.petDialog.classList.add("hide");
            shadow.classList.add("hide");
            document.body.style.overflowY = "auto";
        })
    }
}

const helpItems = document.querySelector(".help__items");
const menuLinks = document.querySelectorAll(".header__link");
const petsArea = document.querySelector(".carousel__center");
const carousel = document.querySelector(".carousel");
const carouselRight = document.querySelector(".carousel__right");
const carouselLeft = document.querySelector(".carousel__left");
const btnForward = document.querySelector(".forward");
const btnBack = document.querySelector(".back");
const shadow = document.querySelector(".shadow");
let petCards;
const logo = document.querySelector(".header__logo");
const burger = document.querySelector(".burger");
const burgerShadow = document.querySelector(".burger__shadow");
let screenSize;

[...menuLinks, logo].forEach((el, i) => {
    el.addEventListener("click", (e) =>{
        document.querySelector(".header__link-active").classList.remove("header__link-active");
        e.target.classList.add("header__link-active");
        burger.classList.remove("open");
        logo.classList.remove("open");
        document.querySelector(".header__menu").classList.remove("open");
        burgerShadow.classList.remove("open");
        document.body.style.overflowY = "auto";
    });
});
[burger, burgerShadow].forEach(el => el.addEventListener("click", () => {
    burger.classList.toggle("open");
    document.querySelector(".header__menu").classList.toggle("open");
    burgerShadow.classList.toggle("open");
    logo.classList.toggle("open");
    if (document.body.style.overflowY === "hidden") document.body.style.overflowY = "auto";
    else document.body.style.overflowY = "hidden";

}))

help.forEach(el => {
    const item = document.createElement("div");
    item.classList.add("item");
    const img = document.createElement("img");
    img.classList.add("item__img");
    img.src = el.img;
    const title = document.createElement("h4");
    title.classList.add("item__title");
    title.textContent = el.title;
    item.append(img, title);
    helpItems.append(item);
})

function fillPetsArea(arr, area) {
    let n = 3;
    const nowCards = [];
    for (let i = 0; i < n; i++) {
        let card = getRandomCard(arr);
        area.append(card.getPetCard());
        card.isShow = true;
        nowCards.push(card);
    }
    arr.forEach(el => el.isShow = nowCards.includes(el));
    return nowCards;
}

function getRandomCard(arr) {
    let i = Math.floor(Math.random()*arr.length);
    return arr[i].isShow ? getRandomCard(arr) : arr[i];
}

async function getPost () {
    const response = await fetch ("../../static/pets.json");
    const data = await response.json();
    petCards = fillCards2(data);
    let nowCards = fillPetsArea(petCards, petsArea);
    const btns = [btnForward, btnBack];
    btns.forEach(el => el.addEventListener("click", (e) => {
        document.body.style.pointerEvents = "none";
        if (e.target.classList.contains("forward")) {
            carouselRight.innerHTML = "";
            nowCards = fillPetsArea(petCards, carouselRight);
            carousel.classList.add("move-right");
        }
        else {
            carouselLeft.innerHTML = "";
            nowCards = fillPetsArea(petCards, carouselLeft);
            carousel.classList.add("move-left");
        }
        setTimeout(() => {
            petsArea.innerHTML = "";
            nowCards.forEach(el => petsArea.append(el.getPetCard()));
            if (e.target.classList.contains("forward")) carousel.classList.remove("move-right");
            else carousel.classList.remove("move-left");
            document.body.style.pointerEvents = "inherit";
        }, 800);
    }));
    petCards.forEach(el => {
        el.showDialog();
    })
}

function getScreenSize() {
    switch (true) {
        case window.screen.width >= 1280: screenSize = 1280; break;
        case window.screen.width < 768: screenSize = 320; break;
        default: screenSize = 768;
    }
}

function getCardsNumber() {
    getScreenSize();
    let n;
    switch (screenSize) {
        case 1280: n = 3; break;
        case 768: n = 2; break;
        default: n = 1;
    }
    return n;
}

function fillCards2(array) {
    const arrOfPets = [];
    array.forEach(el => arrOfPets.push(new PetCard2(el)));
    return arrOfPets;
}

shadow.addEventListener("click", () => {
    shadow.classList.add("hide");
    document.querySelectorAll(".pet__dialog").forEach(el => el.classList.add("hide"));
    document.body.style.overflowY = "auto";
})

getPost();