/* Namespace for avoiding name conflicts*/
var MFBConsole = {};

/* Array for saving logs */
MFBConsole.logs = new Array();

/* execute the input command and print it out */
MFBConsole.executeScript = function () {
    var outputDiv = document.getElementById("fire-bug-output");
    var script = document.getElementById("input-text-area").value;
    if (script == "") return;
    var scriptEval;
    outputDiv.innerHTML += "<div class='input-command'><span>command>>> " + script + "</span></div>";
    try {
        // this will take care of global eval!
        //http://perfectionkills.com/global-eval-what-are-the-options/
        scriptEval = eval.call(this, script);
    }
    catch (err) {
        scriptEval = "<span class='error'>error>>> " + err.message + "</span>";
    }
    if (typeof scriptEval != "undefined") {
        outputDiv.innerHTML += "<div class='new-line'>" + scriptEval + "</div>";
    }
    // for scrolling down to new output
    outputDiv.scrollTop = outputDiv.scrollHeight;
}

/* logging function */
MFBConsole.log = function (input) {
    if (document.getElementById("fire-bug-console").style.display == "none") {
        MFBConsole.logs.push(input);
    } else {
        var outputDiv = document.getElementById("fire-bug-output");
        outputDiv.innerHTML += "<div class='mini-firebug-log'><span>log>>> " + input + "</span></div>";
        outputDiv.scrollTop = outputDiv.scrollHeight;
    }
}

MFBConsole.printExistingLogs = function () {
    var outputDiv = document.getElementById("fire-bug-output");
    if (outputDiv != null) {
        for (var i in MFBConsole.logs) {
            outputDiv.innerHTML += "<div class='mini-firebug-log'><span>log>>> " + MFBConsole.logs[i] + "</span></div>";
        }
        outputDiv.scrollTop = outputDiv.scrollHeight;
    }
}

/* clear input command area */
MFBConsole.clearMiniFireBug = function() {
    document.getElementById("input-text-area").value = "";
}

/* for show and hide mini fire bug */
MFBConsole.toggle = function () {
    var fbc = document.getElementById("fire-bug-console");
    var fbcButton = document.getElementById("toggle-my-firebug");
    if (fbc.style.display == "block") {
        fbcButton.value = "mini fire bug";
        fbc.style.display = "none";
        // clear current history and logs - same as Firebug!
        document.getElementById("fire-bug-output").innerHTML = "";
        document.getElementById("input-text-area").value = "";
        MFBConsole.logs = new Array();
    }
    else {
        fbcButton.value = "Close";
        fbc.style.display = "block";
        // print existing logs
        MFBConsole.printExistingLogs()
    }
}

/* dynamically add mini firebug to the page */
MFBConsole.miniFirebugStartup = function() {
    var html = "<div id='fire-bug'>" +
                    "<input type='button' id='toggle-my-firebug' value='mini fire bug' onclick='MFBConsole.toggle()' />" +
                    "<div id='fire-bug-console'>" +
                        "<textarea id='input-text-area' rows='4'></textarea> <br />" +
                        "<input type='button' value='Run' onclick=\"MFBConsole.executeScript()\"' />" +
                        "<input type='button' value='Clear' onclick='MFBConsole.clearMiniFireBug()' />" +
                        "<div id='fire-bug-output'>" +
                        "</div>" +
                    "</div>" +
                "</div>";
    var firebugDiv = document.createElement('div');
    firebugDiv.id = "fire-bug-wrapper";
    document.body.appendChild(firebugDiv);
    document.getElementById("fire-bug-wrapper").innerHTML = html;
}

/* to handle the onload event existence */
MFBConsole.onLoadHandler = function () {
    if (!window.onload) {
        window.onload = function () {
            MFBConsole.miniFirebugStartup();
        };
    } else {
        var oldWindowLoadFunction = window.onload;
        window.onload = function () {
            oldWindowLoadFunction();
            MFBConsole.miniFirebugStartup();
        };
    }
}

MFBConsole.onLoadHandler();
