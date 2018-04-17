function readText() {
    $("#code").keyup(function () {
        console.log($(this)[0].value);
        return $(this)[0].value;
    });
}

function loadKeywords() {
    let keywords = [];

    $.get("assets/keywords.txt", function (data) {
        let lines = data.split('\n');
        for (let line of lines) {
            keywords.push(line);
        }
    });

    return keywords;
}

function keywordController(keywords) {

    let suggestions = [];
    let input = readText();

    for (let keyword of keywords) {
        if (keyword.contains(input)) {
            suggestions.push(keyword);
        }
    }

    console.log(suggestions.toString())

}


$("document").ready(function() {
    keywordController(loadKeywords());
});
