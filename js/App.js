function createEditorContainer() {
    return "<div>dupa</div>";
}

function loadKeywords() {

    var keywords = [];

    $.get("assets/keywords.txt", function (data) {
        var lines = data.split('\n');
        $.forEach(lines, function (line) {
            keywords.push(line)
            console.log(line)
        })
    })
}

$("document").ready(function() {
    $("#app").append(createEditorContainer);
    loadKeywords()
});

