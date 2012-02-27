/* Namespace */
var MiniFireBugConsole = {};

function runThisStatement(id) {
    var outputDiv = document.getElementById("fire-bug-output");
    var script = document.getElementById(id).value;
    if (script == "") return;
    var scriptEval = eval(script);
    if (typeof scriptEval == "undefined") {
        outputDiv.innerHTML += "<div class='input-command'><span> >>> " + script + "</span></div>";
        return;
    }
    outputDiv.innerHTML += "<div class='input-command'><span> >>> " + script + "</span></div>";
    outputDiv.innerHTML += "<div class='new-line'>" + scriptEval + "</div>";

    // for scrolling
    outputDiv.scrollTop = outputDiv.scrollHeight;
}

function clearMiniFireBug() {
    document.getElementById("input-text-area").value = "";
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
        // clear current history
        document.getElementById("fire-bug-output").innerHTML = "";
        document.getElementById("input-text-area").value = "";
    }
} 