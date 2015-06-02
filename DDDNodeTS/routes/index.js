/// <reference path="../Scripts/typings/express/express.d.ts" />
/// <reference path="../Scripts/typings/node/node.d.ts" />
/// <reference path="../Scripts/typings/stylus/stylus.d.ts" />
/// <reference path="../Scripts/typings/htmlparser2/htmlparser2.d.ts" />
var http = require("http");
function index(req, res) {
    res.render("index", { title: "DDD Node TS Express 06/05", year: new Date().getFullYear() });
}
exports.index = index;
function about(req, res) {
    res.render("about", { title: "About", year: new Date().getFullYear(), message: "Your node application description page." });
}
exports.about = about;
function contact(req, res) {
    res.render("contact", { title: "Contact", year: new Date().getFullYear(), message: "Your contact page." });
}
exports.contact = contact;
var hp2 = require("htmlparser2");
function getUrlText(req, res) {
    var 
    //targetPage = "http://en.wikipedia.org/wiki/Sahara";
    //targetPage = "http://www.mediawiki.org/w/index.php?title=Project:General_disclaimer&action=info";
    targetPage = "/test.html";
    var currentTag = "";
    var indenter = [];
    var alltext = "";
    var lengthTextTransfered = 0;
    var tagsToExclude = ["script", "link", "style", "pre"];
    var parser = new hp2.Parser({
        onerror: function () { return console.log("parser error hit"); },
        onopentag: function (tname) {
            currentTag = tname;
            indenter.push("=>");
            console.log(indenter.join("") + "open  " + currentTag);
        },
        onclosetag: function (tname) {
            console.log(indenter.join("") + "close " + tname);
            indenter.pop();
            currentTag = currentTag ? currentTag : ""; // fuse
        },
        ontext: function (textchunk) {
            if (tagsToExclude.indexOf(currentTag) < 0) {
                if (textchunk && textchunk.length > 0) {
                    lengthTextTransfered += textchunk.length;
                    //alltext += textchunk;
                    res.write(textchunk + " ");
                }
            }
        },
        onend: function () {
            //res.render("urlText", { title: "text content of " + targetPage, urltext: alltext });
            res.end();
            console.log("finished stack is at " + indenter.length);
        }
    });
    http.get(targetPage, (function (p) { return function (resi) {
        resi.pipe(p); // stream to the html parser
    }; })(parser)).on("error", function (err) {
        console.log("This URL is invalid");
    });
}
exports.getUrlText = getUrlText;
//# sourceMappingURL=index.js.map