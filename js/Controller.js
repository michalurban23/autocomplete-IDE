import {Dictionary} from "./Dictionary.js";
import {getCoords as getCaretCoordinates} from "./CaretCoordinates.js";

export class Controller {

    constructor() {
        this.dictionary = new Dictionary();
        this.keywords = this.dictionary.loadKeywords();

    }

    readText() {

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
            self.giveSuggestions($(this)[0].value);
        });
    }

    readCaret() {

        $("#code").keydown(function (e) {
            if (e.keyCode === 38) {  // UP ARROW
                console.log($(".suggestions")[0]);
            } else if (e.keyCode === 40) {  // DOWN ARROW
                console.log("dupa");
            } else if (e.keyCode === 13 && $(".suggestions")[0] !== undefined) {  // ENTER
                e.preventDefault();
                console.log("123");
            }
        })
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
            console.log(suggestions.length);
            this.createSuggestionsDiv(input, suggestions);
        } else {
            this.closeOtherLists();
        }
    }

    createSuggestionsDiv(input, suggestions) {

        input = $.trim(input);
        input = this.filterString(input);

        this.closeOtherLists();
        let div = document.createElement("div");
        let offset = this.calculateOffset();

        div.setAttribute("class", "suggestions");
        div.setAttribute("style", "top: " + offset[0] + "px; left: " + offset[1] + "px;");
        $(".autocomplete").append(div);

        let self = this;
        for (let word of suggestions) {
            let startIndex = word.search(input);
            let innerDiv = document.createElement("div");
            innerDiv.setAttribute("class", "suggestion");
            innerDiv.setAttribute("id", word);
            innerDiv.innerHTML = word.substr(0, startIndex);
            innerDiv.innerHTML += "<span class='highlight'>" + word.substr(startIndex, input.length) + "</span>";
            innerDiv.innerHTML += word.substr(startIndex + input.length);
            innerDiv.innerHTML += "<input type='hidden' value='" + input + "'>";

            // innerDiv.addEventListener("change", function() {
            //     console.log(this);
            //     // input = this.getElementsByTagName("input")[0].value;
            //     self.closeOtherLists();
            // });
            $(".suggestions").append(innerDiv);
        }
    }

    calculateOffset() {

        let coords = getCaretCoordinates();
        let top = coords.top + $("#code").offset().top;
        let left = coords.left;// + $("#code").offset().left;

        return [top, left];
    }

    closeOtherLists() {
        $(".suggestions").remove();
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