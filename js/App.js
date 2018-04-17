function readText() {
    $("#code").keyup(function () {
        console.log($(this)[0].value);
    });
}

function loadKeywords() {
    var keywords = [];

    $.get("assets/keywords.txt", function (data) {
        var lines = data.split('\n');
        for (let line of lines) {
            keywords.push(line);
        }
    })

    return keywords;
}

$("document").ready(function() {
    loadKeywords()
    readText();
});

