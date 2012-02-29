/* Namespace for avoiding name conflicts*/
var MiniFireBugConsole = {};

MiniFireBugConsole.logs = new Array();

MiniFireBugConsole.executeScript = function () {
    var outputDiv = document.getElementById("fire-bug-output");
    var script = document.getElementById("input-text-area").value;
    if (script == "") return;
    var scriptEval;
    outputDiv.innerHTML += "<div class='input-command'><span>command>>> " + script + "</span></div>";
    try {
        // this will take care of global eval!
        //http://perfectionkills.com/global-eval-what-are-the-options/
        //scriptEval = this.eval(script);
        scriptEval = eval.call(this, script);
    }
    catch (err) {
        scriptEval = "<span class='error'>error>>> " + err.message + "</span>";
    }
    if (typeof scriptEval != "undefined") {
        //outputDiv.innerHTML += "<div class='input-command'><span> >>> " + script + "</span></div>";
        outputDiv.innerHTML += "<div class='new-line'>" + scriptEval + "</div>";
    }
    // for scrolling down to new output
    outputDiv.scrollTop = outputDiv.scrollHeight;
}

MiniFireBugConsole.log = function (input) {
    if (document.getElementById("fire-bug-console").style.display == "none") {
        MiniFireBugConsole.logs.push(input);
    } else {
        document.getElementById("fire-bug-output").innerHTML += "<div class='mini-firebug-log'><span>log>>> " + input + "</span></div>";
    }
}

MiniFireBugConsole.printExistingLogs = function () {
    var outputDiv = document.getElementById("fire-bug-output");
    if (outputDiv != null) {
        for (var i in MiniFireBugConsole.logs) {
            outputDiv.innerHTML += "<div class='mini-firebug-log'><span>log>>> " + MiniFireBugConsole.logs[i] + "</span></div>";
        }
    }
}

// clear input command area
MiniFireBugConsole.clearMiniFireBug = function() {
    document.getElementById("input-text-area").value = "";
}

//http://www.randomsnippets.com/2008/02/12/how-to-hide-and-show-your-div/
//for show and hide mini fire bug
MiniFireBugConsole.toggle = function () {
    var ele = document.getElementById("fire-bug-console");
    var text = document.getElementById("toggle-my-firebug");
    if (ele.style.display == "block") {
        ele.style.display = "none";
        text.value = "mini fire bug";
        // clear current history and logs // same as Firebug!
        document.getElementById("fire-bug-output").innerHTML = "";
        document.getElementById("input-text-area").value = "";
        MiniFireBugConsole.logs = new Array();
    }
    else {
        ele.style.display = "block";
        text.value = "Close";
        // print existing logs
        MiniFireBugConsole.printExistingLogs()
    }
}

// dynamically add mini firebug to the page
MiniFireBugConsole.miniFirebugStartup = function() {
    var html = "<div id='fire-bug'>" +
                    "<input type='button' id='toggle-my-firebug' value='mini fire bug' onclick='MiniFireBugConsole.toggle()' />" +
                    "<div id='fire-bug-console'>" +
                        "<textarea id='input-text-area' rows='4'></textarea> <br />" +
                        "<input type='button' value='Run' onclick=\"MiniFireBugConsole.executeScript()\"' />" +
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

//window.onload = function () { alert("salam ali agha!"); };

// to handle the onload event existence
MiniFireBugConsole.onLoadHandler = function () {
    if (!window.onload) {
        window.onload = function () {
            MiniFireBugConsole.miniFirebugStartup();
        };
    } else {
        var oldWindowLoadFunction = window.onload;
        window.onload = function () {
            oldWindowLoadFunction();
            MiniFireBugConsole.miniFirebugStartup();
        };
    }
}

MiniFireBugConsole.onLoadHandler();
