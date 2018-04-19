import {Dictionary} from "./Dictionary.js";

export class Controller {

    constructor() {
        this.dictionary = new Dictionary();
        this.keywords = this.dictionary.loadKeywords();

    }

    readText() {

        let self = this;

        $("#code").on("input", function () {
            console.log($(this)[0]);
            self.giveSuggestions($(this)[0].value);
        });
    }

    giveSuggestions(input) {

        let startsWith = [];
        let includes = [];

        let inputArray = this.filterString(input);
        let lastInput = inputArray[inputArray.length - 1];

        for (let keyword of this.keywords) {
            if (lastInput.length >= 2 && keyword.includes(lastInput) && keyword.startsWith(lastInput)) {
                startsWith.push(keyword);
            }
            else if (lastInput.length >= 2 && keyword.includes(lastInput) && !keyword.startsWith(lastInput)) {
                includes.push(keyword)
            }
        }
        let suggestions = startsWith.concat(includes);

        if (suggestions.length > 0) {
            this.createSuggestionsDiv(suggestions);
            console.log(suggestions);
        } else {
            this.closeOtherLists();
        }
    }

    createSuggestionsDiv(suggestions) {

        let div = document.createElement("div");
        div.setAttribute("class", "suggestions");
        let offset = this.calculateOffset();
        div.setAttribute("style", "top: " + offset[0] + "px; left: " + offset[1] + "px;");
        div.innerText = suggestions;
        this.closeOtherLists();
        $(".autocomplete").append(div);
    }

    calculateOffset() {
        return [100, 100];
    }

    closeOtherLists() {
        $(".suggestions").hide();
    }

    filterString(string) {
        string = string.replace(/\n/g, " ");
        string = string.replace('[', " ").replace(']', " ");
        string = string.replace('(', " ").replace(')', " ");
        string = string.replace('{', " ").replace('}', " ");
        string = string.replace('.', " ").replace(',', " ").replace(':', " ").replace('+', " ");
        string = string.replace('-', " ").replace('*', " ").replace('/', " ").replace('%', " ");
        string = string.replace('$', " ").replace('#', " ").replace('!', " ").replace('?', " ");
        string = string.replace('^', " ").replace('\"', " ").replace('\'', " ").replace('&', " ");
        string = string.replace('@', " ").replace('=', " ").replace('_', " ").replace(';', " ");
        string = string.replace('>', " ").replace('<', " ");

        return string.split(" ");
    }
}