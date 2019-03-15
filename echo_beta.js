var filteredLis = [];
var counter = -1;

var downloadSlide = function(iter) {
    if(iter >= 0) {
        filteredLis[iter].children[0].click();
        setTimeout(function() {
            if(iter > 0) {
                    downloadSlide(iter - 1);
            }
        }, 1000);
    }
}

var extractSlidesFromEcho = function() {
    var openers = document.getElementsByClassName("opener");

    for(var i = 0; i < openers.length; i++) {
        openers[i].click();
    }

    var menuOpeners = document.getElementsByClassName("menu-opener");
    for(var i = 0; i < menuOpeners.length; i++) {
        if(menuOpeners[i].getAttribute("aria-label").indexOf("Presentation") != -1) {
            menuOpeners[i].click();
        }
    }

    var menuItems = document.getElementsByClassName("menu-items");

    for(var i = 0; i < menuItems.length; i++) {
        var lis = menuItems[i].getElementsByTagName("li");
        for(var j = 0; j < lis.length; j++) {
            if(lis[j].innerText.indexOf("Download") != -1) {
                filteredLis.push(lis[j]);
                counter += 1;
            }
        }
    }
    downloadSlide(counter);
}

var extractor = document.createElement("h2");
var linker = document.createElement("a");
linker.id = "extractionLinker";
linker.textContent = "Downloada öllum presentation glærum af echo fyrir þennan kúrs";
linker.href="#";
linker.addEventListener("click", function() {
    extractSlidesFromEcho();
});
extractor.appendChild(linker);

document.getElementById("floater").appendChild(extractor);

