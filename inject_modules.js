console.log(document.URL);

var g = document.createElement('script');
g.src = chrome.extension.getURL('moduleMessage.js');
(document.head||document.documentElement).appendChild(g);
g.onload = function() {
    g.parentNode.removeChild(g);
};


var s = document.createElement('script');
s.src = chrome.extension.getURL('moduleScraperNC.js');
(document.head||document.documentElement).appendChild(s);
s.onload = function() {
    s.parentNode.removeChild(s);
};
