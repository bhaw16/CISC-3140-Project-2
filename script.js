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
    console.log(countries);
    createMedals();
    for (var i = 0; i < countries.length; i++) {
        countries[i].addEventListener("click", displayMedals);
        countriesCopy.push(countries[i]);
        countries[i].insertAdjacentElement("afterend", document.createElement("p"));
    }
    //document.addEventListener("click", onClick);
}

function createMedals() {
    medals = [new Medal("China", 9, 7, 3), new Medal("France", 8, 10, 8)];
}

function displayMedals() {
    //medalsDisplayed = true;
    var index = countriesCopy.indexOf(event.currentTarget);
    try {
        if (!medalsDisplayed) {
            medalsDisplayed.innerText = "Display Medals";
            console.log(index);
            document.getElementsByTagName("p")[index].innerText = medals[index].toString();
        }
        else {
            event.currentTarget.innerText = "Hide Medals";
            console.log(document.getElementsByTagName("p")[0]);
            document.getElementsByTagName("p")[index].innerText = null;
            //document.getElementsByTagName("p")[index].style.display = "none";
        
            //countries[index].removeChild(countries[index].children[0]);
        }
        medalsDisplayed.innerHTML = medalsDisplayed.innerText;
    }
    catch(err) {
        document.getElementsByTagName("p")[index].innerText = "No rankings yet.";
    }
    finally {
        medalsDisplayed = !medalsDisplayed;
    }
    //medalsDisplayed = !medalsDisplayed;
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