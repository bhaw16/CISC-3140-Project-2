var sections, list;
var listCopy = [], sectionsCopy = [];
var countries, medals = createMedals();
var countriesCopy = [];
var medalsDisplayed = false, circleClicked = false, mouseDown = false, wasHoldingCircle = holdingCircleFirst = false;
var newsLinks = setupNews();
var scrollButtons;
var currentLink = 0;
var circleSpans, circleSpansCopy = [];
var hHeight, nHeight, divHeight;
var circleSpanHeld;

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
    document.addEventListener("mousedown", holdMouse);
    document.addEventListener("mouseup", letGo);
    hHeight = document.getElementsByTagName("header")[0].offsetHeight;
    nHeight = document.getElementsByTagName("nav")[0].offsetHeight;
    divHeight = document.getElementsByClassName("navigation")[0].offsetHeight;
    console.log(`header\'s height: ${hHeight}`);
    console.log(`nav\'s height: ${nHeight}`);
    console.log(`height of container div for nav and header: ${divHeight}`);
    console.log(`div height == nav\'s height + header\'s height? ${(hHeight + nHeight) == divHeight}`);
    document.getElementById("icon").addEventListener("click", iconClick = () => {
        scrollTo(0, 0);
    });
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
        document.getElementsByTagName("p")[i].style.backgroundColor = null;
    }
    document.getElementById("news-link").innerHTML = newsLinks[currentLink].innerHTML;
    document.getElementById("news-link").href = newsLinks[currentLink].href;
    document.getElementById("news-link").title = newsLinks[currentLink].title;
    for (var i = 0; i < scrollButtons.length; i++) {
        scrollButtons[i].addEventListener("click", cycleThroughLinks);
    }
    for (var i = 0; i < newsLinks.length; i++) {
        var circleSpan = document.createElement("span");
        circleSpan.className = "headline-scroller-selector";
        circleSpan.style.backgroundColor = "lightgrey";
        circleSpan.addEventListener("click", cycleThroughLinks);
        circleSpan.addEventListener("mouseover", changeHoverStyle);
        circleSpan.addEventListener("mouseout", resetHoverStyle);
        circleSpan.addEventListener("mousedown", changeHoldingStyle);

        console.log(circleSpan);
        circleSpansCopy.push(circleSpan);
        document.getElementById("news").insertAdjacentElement("beforeend", circleSpan);
    }
    circleSpans = document.getElementsByClassName("headline-scroller-selector");
    console.log(circleSpans);
    changeCircleSpanSelected();
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
            document.getElementsByClassName("medal-count")[index].style.color = window.getComputedStyle(document.getElementsByClassName("medal-count")[index]).getPropertyValue("--bgColor");
            document.getElementsByClassName("medal-count")[index].style.backgroundColor = window.getComputedStyle(document.getElementsByClassName("medal-count")[index]).getPropertyValue("--textBgColor");
            document.getElementsByClassName("medal-count")[index].innerText = medals[index].toString();
        }
        else {
            event.currentTarget.innerText = "Display Medals";
            console.log(document.getElementsByClassName("medal-count")[index]);
            document.getElementsByClassName("medal-count")[index].innerText = null;
            document.getElementsByClassName("medal-count")[index].style.backgroundColor = null;
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
            circleClicked = !circleClicked;
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
        changeCircleSpanSelected();
        console.log(currentLink);
        console.log(newsLinks[currentLink]);
        console.log(`${newsLinks[currentLink].title}\n${newsLinks[currentLink].href}\n${newsLinks[currentLink].innerText}`);
    }
}

function changeCircleSpanSelected() {
    circleSpans[currentLink].style.backgroundColor = window.getComputedStyle(circleSpans[currentLink]).getPropertyValue("--darkerBgColor");
    for (var i = 0; i < circleSpans.length; i++) {
        if (i != currentLink) {
            circleSpans[i].style.backgroundColor = window.getComputedStyle(circleSpans[i]).getPropertyValue("--bgColor");
        }
    }
}

function changeHoverStyle() {
    event.currentTarget.style.cursor = "pointer";
    if ((event.currentTarget != circleSpans[circleSpansCopy.indexOf(circleSpans[currentLink])]) && (!holdingCircleFirst)) {
        event.currentTarget.style.backgroundColor = "gray";
    }
    if (mouseDown && holdingCircleFirst) {
        circleSpanHeld.style.backgroundColor = window.getComputedStyle(circleSpanHeld).getPropertyValue("--darkerBgColor");
    }
}

/*to remove the hover color after holding down
on the circle and dragging the mouse outside of it,
comment out the outermost conditional
*/
function resetHoverStyle() {
    if (!holdingCircleFirst) {
        for (var i = 0; i < circleSpans.length; i++) {
            if (i != currentLink) {
                circleSpans[i].style.backgroundColor = window.getComputedStyle(circleSpans[i]).getPropertyValue("--bgColor");
            }
            else {
                circleSpans[i].style.backgroundColor = window.getComputedStyle(circleSpans[i]).getPropertyValue("--darkerBgColor");
            }
        }
    }
}

function changeHoldingStyle() {
    event.currentTarget.style.backgroundColor = window.getComputedStyle(event.currentTarget).getPropertyValue("--darkerBgColor");
    holdingCircleFirst = true;
    circleSpanHeld = event.currentTarget;
    console.log(mouseDown);
}

function holdMouse() {
    mouseDown = true;
    console.log(mouseDown);
}

function letGo() {
    mouseDown = false;
    console.log(mouseDown);
    wasHoldingCircle = holdingCircleFirst;
    holdingCircleFirst = false;
    if (wasHoldingCircle) {
        resetHoverStyle();
        wasHoldingCircle = false;
    }
}

function navScroll() {
    divHeight = document.getElementsByClassName("navigation")[0].offsetHeight;
    scrollTo(0, sections[listCopy.indexOf(event.currentTarget)].offsetTop - divHeight);
    //sections[listCopy.indexOf(event.currentTarget)].scrollIntoView(true);
    console.log(sections[listCopy.indexOf(event.currentTarget)].offsetTop);
    console.log(sections[listCopy.indexOf(event.currentTarget)]);
    console.log("successful!");
}