process.stdin.setEncoding('utf8');

var output = "";

process.stdin.on('readable', function () {
    var chunk = process.stdin.read();
    if (chunk !== null) {
        output += chunk;
    }
});

process.stdin.on('end', function () {
    if (output != "" && output != "\n") {
        throw "the only expected output is a single newline but got --" + output + "--";
    }
});
