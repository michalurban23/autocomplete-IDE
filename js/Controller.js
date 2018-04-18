import {Dictionary} from "./Dictionary.js";

export class Controller {

    constructor() {
        this.dictionary = new Dictionary();
        this.keywords = this.dictionary.loadKeywords();
    }

    readText(dict) {

        let self = this;

        $("textarea").keydown(function(e) {
            if(e.keyCode === 9) {

                var start = this.selectionStart;
                var end = this.selectionEnd;

                var $this = $(this);
                var value = $this.val();


                $this.val(value.substring(0, start)
                    + "\t"
                    + value.substring(end));

                this.selectionStart = this.selectionEnd = start + 1;

                e.preventDefault();
            }
        });

        let isCtrl = false;
        $(document).keyup(function (e) {
            if(e.which == 17) isCtrl=false;
        }).keydown(function (e) {
            if(e.which == 17) isCtrl=true;
            if(e.which == 13 && isCtrl == true) {
                alert('skrót dziabie');
                // let form = document.getElementsByTagName("input")[0];
                // form.submit();
                let console = document.getElementsByClassName("testheader")[0];
                console.innerHTML = "DEEZ NUTZ";
                return false;
            }
        });

        $("#code").on("input", function () {
            console.log($(this)[0]);
            self.giveSuggestions(dict, $(this)[0].value);
        });
    }

    giveSuggestions(dict, input) {

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
}