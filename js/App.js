import {Controller} from "./Controller.js";

function addListeners(controller) {
    controller.readText();
}

$("document").ready(function() {
    let controller = new Controller();

    addListeners(controller);
});
