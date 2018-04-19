export class Dictionary {

    loadKeywords() {
        let keywords = [];

        $.get("assets/keywords.txt", function (data) {
            let lines = data.split('\n');
            for (let line of lines) {
                keywords.push(line);
            }
        });
        return keywords;
    }

    loadFunctionalKeywords() {
        var functionalKeywords = [];

        $.get("assets/functionalKeywords.txt", function (data) {
            let lines = data.split('\n');
            for (let line of lines) {
                functionalKeywords.push(line);
            }
        });
        return functionalKeywords;
    }
}