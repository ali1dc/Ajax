/* Namespace */
var MiniFireBugConsole = {};

function runThisStatement(id) {
    var script = document.getElementById(id).value;
    var outputDiv = document.getElementById("fire-bug-output");
    var result = outputDiv.innerHTML;
    outputDiv.innerHTML = result + "<div class='new-line'>" + eval(script) + "</div>";

    // for scrolling
    outputDiv.scrollTop = outputDiv.scrollHeight;
}

function clearMiniFireBug() {
    document.getElementById("fire-bug-output").innerHTML = "";
}

//http://www.randomsnippets.com/2008/02/12/how-to-hide-and-show-your-div/
function toggle() {
    var ele = document.getElementById("fire-bug-console");
    var text = document.getElementById("toggle-my-firebug");
    if (ele.style.display == "block") {
        ele.style.display = "none";
        text.value = "mini fire bug";
    }
    else {
        ele.style.display = "block";
        text.value = "Close";
    }
} 