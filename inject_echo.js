console.log(document.URL);

var g = document.createElement('script');
g.src = chrome.extension.getURL('draggable.js');
(document.head||document.documentElement).appendChild(g);
g.onload = function() {
    g.parentNode.removeChild(g);
};


var s = document.createElement('script');
s.src = chrome.extension.getURL('echo_test.js');
(document.head||document.documentElement).appendChild(s);
s.onload = function() {
    s.parentNode.removeChild(s);
};
