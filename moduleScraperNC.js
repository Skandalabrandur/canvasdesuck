var executeModuleExtraction = function() {
    var moduleLinksCollection = document.getElementsByClassName("for-nvda");
    var moduleLinks = [];
    for(var i = 0; i < moduleLinksCollection.length; i++) {
        if(moduleLinksCollection[i].href.indexOf("%") == -1) {
            moduleLinks.push(moduleLinksCollection[i])
        }
    }
    var fileLinks = [];
    var downloadQueue = function(countdown, files) {
        var downloadWindow = window.open(files[countdown])
        $(downloadWindow).unload(function() {
            countdown -= 1;
            if (countdown >= 0) {
                downloadQueue(countdown, files);
            }
        });
    };
    var promises = [];
    for(var i = 0; i < moduleLinks.length; i++) {
        var request = $.get(moduleLinks[i].href, function(response) {
            var modulefileLinks  = response.match(/href=\\\"https:\/\/reykjavik.*?download\?wrap=1\\\"/g)
            var modulefileLinks2 = response.match(/href=\\\"https:\/\/reykjavik.*?download\?download_frd=1\\\"/g)
            if(modulefileLinks !== null) {
                for(var j = 0; j < modulefileLinks.length; j++) {
                    fileLinks.push(modulefileLinks[j].match(/http.*wrap=1/)[0]);
                }   
            }

            if(modulefileLinks2 !== null) {
                for(var j = 0; j < modulefileLinks2.length; j++) {
                    fileLinks.push(modulefileLinks2[j].match(/http.*frd=1/)[0]);
                }
            }   
        });
        promises.push(request);
    }
    $.when.apply(null, promises).done(function() {
        downloadQueue(fileLinks.length - 1, fileLinks)
    });
}
