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
        this.petCard.addEventListener("click", () => {
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

Array.prototype.shuffle = function() {
    for (var i = this.length - 1; i > 0; i--) {
        var num = Math.floor(Math.random() * (i + 1));
        var d = this[num];
        this[num] = this[i];
        this[i] = d;
    }
    return this;
}

const helpItems = document.querySelector(".help__items");
const menuLinks = document.querySelectorAll(".header__link");
const petsArea = document.querySelector(".pets__items");
const btnForward = document.querySelector(".forward");
const btnForwardForce = document.querySelector(".forward-force");
const btnBack = document.querySelector(".back");
const btnBackForce = document.querySelector(".back-force");
const shadow = document.querySelector(".shadow");
let petCards;
const logo = document.querySelector(".header__logo");
const burger = document.querySelector(".burger");
const burgerShadow = document.querySelector(".burger__shadow");
const pageNumber = document.querySelector(".center");
let n;
let screenSize;

[...menuLinks, logo].forEach((el) => {
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

}));
const btns = [btnBack, btnBackForce, btnForward, btnForwardForce];
btns.forEach(el => {
    el.addEventListener("click", (e) => {
        document.body.style.pointerEvents = "none";
        petsArea.classList.add("disappere");
        setTimeout(() => {
            let page = +pageNumber.textContent;
            switch(true) {
                case e.target.classList.contains("back"): page--; break;
                case e.target.classList.contains("forward"): page++; break;
                case e.target.classList.contains("back-force"): page = 1; break;
                case e.target.classList.contains("forward-force"): page = petCards.length / n;
            }
            setPage(page);
            fillPetsArea(petCards, page);
            petsArea.classList.remove("disappere");
            document.body.style.pointerEvents = "inherit";
        }, 300);
    })
});

function setPage (page) {
    switch(page) {
        case 1:
            [btnBack, btnBackForce].forEach(el => el.classList.add("disable"));
            [btnForward, btnForwardForce].forEach(el => el.classList.remove("disable"));
            break;
        case petCards.length / n:
            [btnForward, btnForwardForce].forEach(el => el.classList.add("disable"));
            [btnBack, btnBackForce].forEach(el => el.classList.remove("disable"));
            break;
        default: btns.forEach(el => el.classList.remove("disable"));
    }
    pageNumber.textContent = page;
}

function checkSize() {
    switch (true) {
        case window.screen.width >= 1280:
            screenSize = 1280;
            break;
        case window.screen.width < 768:
            screenSize = 320;
            break;
        default:
            screenSize = 768;
    }
}

function setNumberOfElements() {
    switch (screenSize) {
        case 1280:
            n = 8;
            break;
        case 320:
            n = 3;
            break;
        default:
            n = 6;
    }
}

function fillPetsArea(arr, page) {
    petsArea.innerHTML = "";
    const nowCards = [];
    page--;
    let startIndex = page*n;
    for (let i = startIndex; i < startIndex + n; i++) {
        petsArea.append(arr[i].getPetCard());
        nowCards.push(arr[i]);
    }
    return nowCards;
}

async function getPost () {
    const response = await fetch ("../../static/pets.json");
    const data = await response.json();
    let page = 1;
    setPage(page);
    checkSize();
    setNumberOfElements();
    petCards = fillCards2(data);
    let nowCards = fillPetsArea(petCards, page);
    window.addEventListener("resize", () => {
        let currentScreenSize = screenSize;
        checkSize();
        if (currentScreenSize !== screenSize) {
            setTimeout(() => {
                getPost();
            }, 1000);
        }
    });
    petCards.forEach(el => {
        el.showDialog();
    })
}

function getRandomArray(array) {
    let fullArr = [];
    if (n === 8) {
        while(fullArr.length !== 48) {
            let arr = array.shuffle();
            fullArr.push(...array);
        }
    } else {
        while(fullArr.length !== 48) {
            fullArr.push(...array);
        }
        let buffer = [];
        for (let i = 0; i < fullArr.length; i += 6) {
            buffer.push(...fullArr.slice(i, i+6).shuffle());
        }
        fullArr = buffer;
    }
    return fullArr;
}

function fillCards2(array) {
    const fullArr = getRandomArray(array);
    const arrOfPets = [];
    fullArr.forEach(el => arrOfPets.push(new PetCard2(el)));
    return arrOfPets;
}

shadow.addEventListener("click", () => {
    shadow.classList.add("hide");
    document.querySelectorAll(".pet__dialog").forEach(el => el.classList.add("hide"));
    document.body.style.overflowY = "auto";
})
shadow.addEventListener("mouseover", () => {
    document.querySelectorAll(".pet-card__close").forEach(el => el.classList.add("hover"))
})
shadow.addEventListener("mouseout", () => {
    document.querySelectorAll(".pet-card__close").forEach(el => el.classList.remove("hover"))
})

getPost();