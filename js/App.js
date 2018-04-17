import {readText} from "./Controller.js";
import {loadKeywords} from "./Dictionary.js";

function addListeners() {
    readText();
}

$("document").ready(function() {
    const dict = loadKeywords();
    addListeners();
});

