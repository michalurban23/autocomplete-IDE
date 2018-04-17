import {Controller} from "./Controller.js";
import {Dictionary} from "./Dictionary.js";

function addListeners(controller) {
    controller.readText();
}

$("document").ready(function() {
    let controller = new Controller();
    let dictionary = new Dictionary();

    const dict = dictionary.loadKeywords();
    addListeners(controller);
});
