var createDiv = () => {
  var div = document.createElement("DIV");
  div.id = "floater";
  div.style.textAlign = "center";
  div.style.zIndex = "100";
  div.style.backgroundColor = "#f1f1f1";
  div.style.border = "1px solid #d3d3d3";
  div.style.position = "absolute";
  div.style.top = "20px";
  div.style.left = (document.body.clientWidth / 2.7) + "px";
  
  var dh  = document.createElement("DIV");
  dh.id = "floaterHeader";
  dh.style.paddingTop = "10px";
  dh.style.cursor = "move";
  dh.style.zIndex = "101";
  dh.style.backgroundColor = "#2196F3";
  
  var dhp = document.createElement("P");
  dhp.innerText = "Canvas De Suckifier";
  dhp.style.display = "inline-block";
  dhp.style.paddingRight = "10px";
  dh.appendChild(dhp);
  
  var closeButton = document.createElement("BUTTON");
  closeButton.style.backgroundColor = "red";
  closeButton.style.color = "white";
  closeButton.innerText = "X";
  closeButton.onclick = function() {
      document.body.removeChild(
        document.getElementById("floater")
      );
  }
  dh.appendChild(closeButton);
  
  var p   = document.createElement("P");
  p.innerText = "Aðgerðir";
  
  div.appendChild(dh);
  div.appendChild(p);
  
  return div;
}

document.body.appendChild(createDiv());

// From https://www.w3schools.com/howto/howto_js_draggable.asp

// Make the DIV element draggable:
dragElement(document.getElementById("floater"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV: 
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
// End w3
