export function readText() {
    $("#code").on("input", function () {
        console.log($(this)[0].value);
    });
}