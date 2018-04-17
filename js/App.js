import {readText} from "./Controller.js";
import {loadKeywords} from "./Dictionary.js";

function addListeners() {
    readText();
}

function keywordController(keywords) {

    let suggestions = [];
    let input = readText();

    for (let keyword of keywords) {
        if (keyword.contains(input)) {
            suggestions.push(keyword);
        }
    }

    console.log(suggestions.toString())

}


$("document").ready(function() {
    const dict = loadKeywords();
    addListeners();
});
