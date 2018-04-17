import {Dictionary} from "./Dictionary.js";

export class Controller {

    constructor() {
        this.dictionary = new Dictionary();
        this.keywords = this.dictionary.loadKeywords();
    }

    readText() {
        var self = this;
        $("#code").on("input", function () {
            console.log($(this)[0].value);
            self.giveSuggestions($(this)[0].value);
        });
    }

    giveSuggestions(input) {

        let startsWith = [];
        let includes = [];

        let inputArray = input.replace(/\n/g, " ").split(" ");
        let lastInput = inputArray[inputArray.length - 1];

        for (let keyword of this.keywords) {
            if (lastInput.length >= 2 && keyword.includes(lastInput) && keyword.startsWith(lastInput)) {
                startsWith.push(keyword);
            }
            else if (lastInput.length >= 2 && keyword.includes(lastInput) && !keyword.startsWith(lastInput)) {
                includes.push(keyword)
            }
        }

        let suggestions = startsWith + includes;
        console.log(suggestions.toString())
    }
}