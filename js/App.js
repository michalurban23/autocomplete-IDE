function readText() {
    $("#code").keyup(function () {
        console.log($(this)[0].value);
    });
}

$("document").ready(function () {
    readText();
});