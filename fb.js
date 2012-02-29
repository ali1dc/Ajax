/* Namespace */
var MiniFireBugConsole = {};

MiniFireBugConsole.runThisStatement = function(id) {
    var outputDiv = document.getElementById("fire-bug-output");
    var script = document.getElementById(id).value;
    if (script == "") return;

    var scriptEval;
    try {
        // this will take care of global eval!
        //http://perfectionkills.com/global-eval-what-are-the-options/
        //scriptEval = this.eval(script);
        scriptEval = eval.call(this, script);
    }
    catch (err) {
        scriptEval = "<span class='error'>" + err.message + "</span>";
    }
    if (typeof scriptEval == "undefined") {
        outputDiv.innerHTML += "<div class='input-command'><span> >>> " + script + "</span></div>";
    }
    else {
        outputDiv.innerHTML += "<div class='input-command'><span> >>> " + script + "</span></div>";
        outputDiv.innerHTML += "<div class='new-line'>" + scriptEval + "</div>";
    }
    // for scrolling
    outputDiv.scrollTop = outputDiv.scrollHeight;
}

MiniFireBugConsole.clearMiniFireBug = function() {
    document.getElementById("input-text-area").value = "";
}

//http://www.randomsnippets.com/2008/02/12/how-to-hide-and-show-your-div/
MiniFireBugConsole.toggle = function() {
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

// dynamically add mini firebug to the page
MiniFireBugConsole.miniFirebugStartup = function() {
    var html = "<div id='fire-bug'>" +
                    "<input type='button' id='toggle-my-firebug' value='mini fire bug' onclick='MiniFireBugConsole.toggle()' />" +
                    "<div id='fire-bug-console'>" +
                        "<textarea id='input-text-area' rows='4'></textarea> <br />" +
                        "<input type='button' value='Run' onclick=\"MiniFireBugConsole.runThisStatement('input-text-area')\"' />" +
                        "<input type='button' value='Clear' onclick='MiniFireBugConsole.clearMiniFireBug()' />" +
                        "<div id='fire-bug-output'>" +
                        "</div>" +
                    "</div>" +
                "</div>";
    var firebugDiv = document.createElement('div');
    firebugDiv.id = "fire-bug-wrapper";
    document.body.appendChild(firebugDiv);
    document.getElementById("fire-bug-wrapper").innerHTML = html;
}

window.onload = function () { MiniFireBugConsole.miniFirebugStartup(); };
