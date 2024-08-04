var sections, list;
var listCopy = [], sectionsCopy = [];
var countries, medals = createMedals();
var countriesCopy = [];
var medalsDisplayed = false;
var newsLinks = setupNews();
var scrollButtons;
var currentLink = 0;
var circleSpans, circleSpansCopy = [];

//var sectionsArray = [];

window.onload = () => {
    list = document.getElementsByClassName("nav-item");
    sections = document.getElementsByTagName("section");
    countries = document.getElementsByClassName("medal-button");
    sports = document.getElementsByClassName("schedule-button");
    scrollButtons = document.getElementsByClassName("left-and-right-buttons");

    //console.log(`${list}\n${sections}`);
    console.log(list);
    console.log(sections);
    console.log(countries);
    for (var i = 0; i < list.length; i++) {
        list[i].addEventListener("click", navScroll);
        listCopy.push(list[i]);
    }
    for (var i = 0; i < sections.length; i++) {
        sectionsCopy.push(sections[i]);
    }
    for (var i = 0; i < countries.length; i++) {
        countries[i].addEventListener("click", displayMedals);
        countriesCopy.push(countries[i]);
        countries[i].insertAdjacentElement("afterend", document.createElement("p"));
        document.getElementsByTagName("p")[i].className = "medal-count";
    }
    document.getElementById("news-link").innerHTML = newsLinks[currentLink].innerHTML;
    document.getElementById("news-link").href = newsLinks[currentLink].href;
    document.getElementById("news-link").title = newsLinks[currentLink].title;
    for (var i = 0; i < scrollButtons.length; i++) {
        scrollButtons[i].addEventListener("click", cycleThroughLinks);
    }
    for (var i = 0; i < newsLinks.length; i++) {
        var circleSpan = document.createElement("span");
        circleSpan.innerText = "b";
        circleSpan.className = "headline-scroller-selector";
        circleSpan.addEventListener("click", cycleThroughLinks);
        console.log(circleSpan);
        circleSpansCopy.push(circleSpan);
        document.getElementsByTagName("body")[0].insertAdjacentElement("beforeend", circleSpan);
    }
    circleSpans = document.getElementsByTagName("span");
    console.log(circleSpans);
    //document.addEventListener("click", onClick);
}

function createMedals() {
    return [
        new Medal("China", 11, 7, 6), new Medal("USA", 9, 15, 13),
        new Medal("France", 8, 11, 8), new Medal("Australia", 8, 6, 4),
        new Medal("Japan", 8, 3, 5), new Medal("Great Britain", 6, 7, 7),
        new Medal("Korea", 6, 3, 3), new Medal("Italy", 5, 7, 4),
        new Medal("Canada", 3, 2, 3), new Medal("Germany", 2, 2, 2)
    ];
}

function displayMedals() {
    var index = countriesCopy.indexOf(event.currentTarget);
    try {
        if (!medalsDisplayed) {
            event.currentTarget.innerText = "Hide Medals";
            console.log(index);
            document.getElementsByClassName("medal-count")[index].innerText = medals[index].toString();
        }
        else {
            event.currentTarget.innerText = "Display Medals";
            console.log(document.getElementsByClassName("medal-count")[index]);
            document.getElementsByClassName("medal-count")[index].innerText = null;
        }
        event.currentTarget.innerHTML = event.currentTarget.innerText;
    }
    catch(err) {
        document.getElementsByClassName("medal-count")[index].innerText = "No rankings yet.";
    }
    finally {
        medalsDisplayed = !medalsDisplayed;
    }
}

function getJudoSchedules() {
    window.open("https://olympics.com/en/paris-2024/schedule/judo?day=3-august");  
}

function get3_3BasketballSchedules() {
    window.open("https://olympics.com/en/paris-2024/schedule/3x3-basketball?day=31-july");  
}

function getMarathonSwimmingSchedules() {
    window.open("https://olympics.com/en/paris-2024/schedule/marathon-swimming?day=8-august");  
}

function getSurfingSchedules() {
    window.open("https://olympics.com/en/paris-2024/schedule/surfing?day=29-july");  
}

function getSkateboardingSchedules() {
    window.open("https://olympics.com/en/paris-2024/schedule/skateboarding?day=6-august");  
}

function setupNews() {
    return [
        new AnchorProperties(
            "https://olympics.com/en/news/paris-2024-tennis-nadal-eliminated-other-stars-advance",
            "Rafael Nadal Article",
            "Rafael Nadal ousted as Carlos Alcaraz, other stars advance <br> to third round of men's and women's singles"
        ),
        new AnchorProperties(
            "https://olympics.com/en/paris-2024/sport-explainers",
            "Sport Explainers Video",
            "Get Ready for the Action: Wach Allianz Sports Explainers"
        ),
        new AnchorProperties(
            "https://olympics.com/en/news/tom-daley-olympic-gold-paris-2024-kids-watching",
            "Tom Daley Article",
            "Tom Daley: \"My Olympic gold medal is having my kids there to watch\""
        )
    ];
}

function cycleThroughLinks() {
    try {
        if (event.currentTarget == document.getElementById("left")) {
            currentLink--;
        }
        else if (event.currentTarget == document.getElementById("right")) {
            currentLink++;
        }
        else {
            currentLink = circleSpansCopy.indexOf(event.currentTarget);
        }
        if (currentLink < 0 || currentLink >= newsLinks.length) {
            throw new RangeError("currentLink must be a valid index of newsLinks.");
        }
    }
    catch (err) {
        if (currentLink < 0) {
            currentLink = newsLinks.length - 1;
        }
        else {
            currentLink = 0;
        }
    }
    finally {
        document.getElementById("news-link").innerHTML = newsLinks[currentLink].innerHTML;
        document.getElementById("news-link").href = newsLinks[currentLink].href;
        document.getElementById("news-link").title = newsLinks[currentLink].title;
        console.log(currentLink);
        console.log(newsLinks[currentLink]);
        console.log(`${newsLinks[currentLink].title}\n${newsLinks[currentLink].href}\n${newsLinks[currentLink].innerText}`);
    }
}

function navScroll() {
    scrollTo(0, sections[listCopy.indexOf(event.currentTarget)].offsetTop);
    //sections[listCopy.indexOf(event.currentTarget)].scrollIntoView(true);
    console.log(sections[listCopy.indexOf(event.currentTarget)].offsetTop);
    console.log(sections[listCopy.indexOf(event.currentTarget)]);
    console.log("successful!");
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