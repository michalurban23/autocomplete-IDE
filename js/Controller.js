export class Controller {

    readText(dict) {
        $("#code").on("input", function () {
            console.log($(this)[0].value);
            Controller.giveSuggestions(dict, $(this)[0].value);
        });
    }

    static giveSuggestions(dict, input) {

        let suggestions = [];

        let splittedInput = input.replace(/\n/g, " ").split(" ");
        let lastInput = splittedInput[splittedInput.length - 1];

        for (let keyword of dict) {
            if (lastInput.length >= 2 && keyword.includes(lastInput) && keyword.startsWith(lastInput)) {
                suggestions.push(keyword);
            }
        }

        console.log(suggestions.toString())
    }
}
