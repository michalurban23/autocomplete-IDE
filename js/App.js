import {Controller} from "./Controller.js";
import {Dictionary} from "./Dictionary.js";

function addListeners(controller) {
    controller.readText();
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
    let controller = new Controller();
    let dictionary = new Dictionary();

    const dict = dictionary.loadKeywords();
    addListeners(controller);
});
