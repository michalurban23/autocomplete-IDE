export function loadKeywords() {
    let keywords = [];

    $.get("assets/keywords.txt", function (data) {
        let lines = data.split('\n');
        for (let line of lines) {
            keywords.push(line);
        }
    });
    return keywords;
}