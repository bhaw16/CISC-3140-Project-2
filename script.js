var sections;
var list;
var countries;
var medals;
var countriesCopy = [];
var medalsDisplayed = false;

//var sectionsArray = [];

window.onload = () => {
    list = document.getElementsByClassName("nav-item");
    sections = document.getElementsByTagName("section");
    countries = document.getElementsByClassName("medal-button");

    //console.log(`${list}\n${sections}`);
    console.log(list);
    console.log(sections);
    createMedals();
    for (var i = 0; i < countries.length; i++) {
        countries[i].addEventListener("click", displayMedals);
        countriesCopy.push(countries[i]);
    }
    //document.addEventListener("click", onClick);
}

function createMedals() {
    medals = [new Medal("China", 9, 7, 3), new Medal("France", 8, 10, 8)];
}

function displayMedals() {
    var index = countriesCopy.indexOf(event.currentTarget);
    if (!medalsDisplayed) {
        medalsDisplayed.innerText = "Display Medals";
        console.log(index);
        countries[index].insertAdjacentText("afterend", medals[index].toString());
    }
    else {
        event.currentTarget.innerText = "Hide Medals";
        //document.getElementsByTagName("p")[index].style.display = "none";
        console.log(document.getElementsByTagName("p")[index]);
        //countries[index].removeChild(countries[index].children[0]);
    }
    medalsDisplayed = !medalsDisplayed;
}
/*
function onClick() {
    console.log("clicked");
    if (list[0].innerText.includes("Medal Rankings")) {
        sections[0].scrollIntoView();
    }
    else if (list[1].innerText.includes("Sports")) {
        sections[1].scrollIntoView();
    }
    else if (list[2].innerText.includes("News")) {
        sections[2].scrollIntoView();
    }
}
*/