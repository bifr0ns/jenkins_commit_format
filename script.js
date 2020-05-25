function giveFormat(editor) {
    var text = document.getElementById('instructions').value

    if(text == null)
        return 0;
    if(editor == 'svn') {
        var textFormated = svnFormat(text)

        result.style.visibility = "visible"; 
        btnCopy.style.visibility = "visible"; 

        result.value = textFormated
    }
}

function svnFormat(text) {
    var var1 = text.split("\n")
    
    for(i = 0; i < var1.length; i++) {
        var1[i] = var1[i].replace(",", "@")
        var1[i] = var1[i].substr(1)

        var firstOcurrence = var1[i].indexOf('/')
        var1[i] = var1[i].slice(firstOcurrence+1)

        var1[i] = var1[i].split("/")
    }

    return returnFormat(var1)
}

function returnFormat(array) {
    var typeOfLine = ["Packages", "PackageBodies", "Tables", "Scripts"]
    var arrayFormat = []
    var newFormat = ""

    typeOfLine.forEach(type => {
        for(i = 0; i < array.length; i++) {
            if(array[i][1] == type) {
                arrayFormat.push(array[i])
            }
        }
    });

    for(i = 0; i < arrayFormat.length; i++) {
        newFormat += arrayFormat[i][0] + "/" + arrayFormat[i][1] + "/" + arrayFormat[i][2]
        if(i < arrayFormat.length - 1)
            newFormat += "|"
    }
    
    return newFormat
}

function copy() {
    var copyText = document.getElementById("result")
  
    copyText.select();
    copyText.setSelectionRange(0, 99999) /*For mobile devices*/
  
    document.execCommand("copy")
  } 