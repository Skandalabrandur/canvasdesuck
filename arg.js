var courseId = window.location.href.replace(/\D/g,'');
var globalJSON = [];
var callsActive = true;
var counter = 1;
var filterReference;

function begin() {
    $("div[role='list']").css("visibility", "hidden");
    $("#breadcrumbs").empty();
    $("#breadcrumbs").html("<h1>Fyrsta kall farið í gang, vinsamlegast bíðið</h1><h1>Hópar munu koma inn 100 í einu</h1>");
    callCanvas(counter);
}

function beginWithOffset() {
    skip = prompt("Hversu x*100 mörgum hópum viltu sleppa?\n    Settu t.d. inn 4 ef þú vilt sleppa fyrstu 400 hópunum");
    counter += parseInt(skip);
    begin();
}

function addHtmlToBread(string) {
    $("#breadcrumbs").append(string);
}

function addHtmlToFloater(string) {
    $("#floater").append(string);
}

function joinRequest(groupID) {
    $.post( "https://reykjavik.instructure.com/api/v1/groups/" + groupID + "/memberships/", { user_id: "self" });
    alert("Búinn að senda beiðni um að 'join-a' þessa grúppu. \nAthugið að þessi beiðni mun ekki virka ef hópur er:\n  Fullur\n  Ekki opið fyrir skráningu");
    if(confirm("Viltu opna síðu hóps til að staðfesta?")) {    
        window.location = "https://reykjavik.instructure.com/groups/" + groupID + "/users";
    }
}

function injectFilter(string) {
  if(string != "") {
    $("#filterStatus").text("Leit í gangi");
    string = string.toLowerCase();
    var groupElements = document.getElementsByClassName("injectedGroup");
    for(var i = 0; i < groupElements.length; i++) {
        $(groupElements[i]).hide();
    }
    
    var groupStudents = document.getElementsByClassName("injectedStudentName");
    
    for(var i = 0; i < groupStudents.length; i++) {
      if (groupStudents[i].textContent.toLowerCase().indexOf(string) != -1) {
        $("#filterStatus").hide();
        $(groupStudents[i].parentNode).show();
      }
    }
  }
}

function updateFilter() {
  injectFilter(filterReference.value);
}

function joinByGroupID() {
    givenID = prompt("Ef félagi þinn er kominn í grúppu þá getur hann skoðað grúppuna sína. \
\nLáttu hann gefa þér slóðann sem lítur einhvern veginn svona út\n    https://reykjavik.instructure.com/groups/1234567\n\nÞú getur sett inn slóða eða einfaldlega töluna í slóðanum");
    givenID = givenID.replace(/\D/g,'');
    joinRequest(givenID);
}

function canvasCallback(x) {
    for(i = 0; i < x.length; i++) {
      
        if(i == 0 && counter == 1) {
          addHtmlToBread("<span>Leita eftir nafni</span><input type='text' id='nameFilter' onkeyup='injectFilter(this.value)' placeholder='nafn nemanda'/><span id='filterStatus'></span>");
          filterReference = document.getElementById("nameFilter");
        }
      
        var userString = "";
        if(x[i].members_count > 0) {
            for(j = 0; j < x[i].members_count; j++) {
                userString += "<p class='injectedStudentName'>"+x[i].users[j].name+"</p>";
            }
        }
        addHtmlToBread("<div class='injectedGroup' style='width: 350px; padding: 5px 5px; margin: 10px auto; border: solid black 1px;'<h2 >"+x[i].name+" <a href='#' style='color: blue' onclick='joinRequest("+x[i].id+")'>JOIN</a></h2>"+userString+"</div>");
    }
    updateFilter();

    if(callsActive) {
        counter += 1;
        callCanvas(counter);
    }
}



function callCanvas(counter) {
    $.getJSON("https://reykjavik.instructure.com/api/v1/courses/" + courseId + "/groups?include%5B%5D=users&include%5B%5D=group_category&include%5B%5D=permissions&include_inactive_users=true&page=" + counter + "&per_page=100", canvasCallback);
}

addHtmlToFloater("<p style='margin: 0 5px;'><a href='#' style='color: blue' onclick='begin();'>Hlaða inn hópum hraðar</a></p><br>");
addHtmlToFloater("<p style='margin: 0 5px;'><a href='#' style='color: blue' onclick='beginWithOffset();'>Hlaða inn hópum hraðar og sleppa X*100 fyrstu hópunum</a></p><br>");
addHtmlToFloater("<p style='margin: 0 5px;'><a href='#' style='color: blue' onclick='joinByGroupID();'>Join-a grúppu strax með link eða groupID</a></p>");

