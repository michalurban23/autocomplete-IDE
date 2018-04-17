export class Controller {
    readText() {
        $("#code").on("input", function () {
            console.log($(this)[0].value);
        });
    }

    keywordController(keywords) {

        let suggestions = [];
        let input = this.readText();

        for (let keyword of keywords) {
            if (keyword.contains(input)) {
                suggestions.push(keyword);
            }
        }

        console.log(suggestions.toString())
    }
}
