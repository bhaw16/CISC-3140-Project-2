var sections;
var list;
//var sectionsArray = [];

window.onload = () => {
    list = document.getElementsByClassName("nav-item");
    sections = document.getElementsByTagName("section");
    //console.log(`${list}\n${sections}`);
    console.log(list);
    console.log(sections);
    //document.addEventListener("click", onClick);
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