function giveFormat(editor) {
    var text = document.getElementById("instructions").value;
    var textFormated;

    if (text == "") return 0;
    textFormated = editor == "Smart" ? smartFormat(text) : tortoiseFormat(text);

    result.style.visibility = "visible";
    btnCopy.style.visibility = "visible";

    result.value =
        textFormated == "error" || textFormated.length == 0
            ? "Error en el formato. Tal vez escogiste el formato mal."
            : textFormated;
}

function smartFormat(text) {
    try {
        var lines = text.split("\n");

        for (i = 0; i < lines.length; i++) {
            lines[i] = lines[i].replace(",", "@");
            lines[i] = lines[i].substr(1);

            var firstOcurrence = lines[i].indexOf("/");
            lines[i] = lines[i].slice(firstOcurrence + 1);

            lines[i] = lines[i].split("/");
        }
    } catch (error) {
        console.error(error);
        return "error";
    }

    return returnFormat(lines);
}

function tortoiseFormat(text) {
    try {
        var lines = text.split("\n");
        var revision = lines[0].split(":")[1].trim();

        for (i = 0; i < lines.length; i++) {
            lines[i] = lines[i].replace(".sql", ".sql@" + revision);

            var firstOcurrence = lines[i].indexOf("/");
            lines[i] = lines[i].slice(firstOcurrence + 1);

            lines[i] = lines[i].split("/");
            lines[i].shift();
            lines[i].shift();
        }
    } catch (error) {
        console.error(error);
        return "error";
    }

    return returnFormat(lines);
}

function returnFormat(array) {
    var typeOfLine = ["Packages", "PackageBodies", "Tables", "Scripts"];
    var arrayFormat = [];
    var newFormat = "";

    typeOfLine.forEach((type) => {
        for (i = 0; i < array.length; i++) {
            if (array[i].length > 1 && array[i][1] == type) {
                arrayFormat.push(array[i]);
            }
        }
    });

    for (i = 0; i < arrayFormat.length; i++) {
        newFormat +=
            arrayFormat[i][0] +
            "/" +
            arrayFormat[i][1] +
            "/" +
            arrayFormat[i][2];
        if (i < arrayFormat.length - 1) newFormat += "|";
    }

    return newFormat;
}

function copy() {
    var copyText = document.getElementById("result");

    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/

    document.execCommand("copy");
}
