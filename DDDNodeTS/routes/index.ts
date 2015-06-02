/// <reference path="../Scripts/typings/express/express.d.ts" />
/// <reference path="../Scripts/typings/node/node.d.ts" />
/// <reference path="../Scripts/typings/stylus/stylus.d.ts" />
/// <reference path="../Scripts/typings/htmlparser2/htmlparser2.d.ts" />



import http = require("http");
import express = require("express");


export function index(req: express.Request, res: express.Response) {
    res.render("index", { title: "DDD Node TS Express 06/05", year: new Date().getFullYear() });
}

export function about(req: express.Request, res: express.Response) {
    res.render("about", { title: "About", year: new Date().getFullYear(), message: "Your node application description page." });
}

export function contact(req: express.Request, res: express.Response) {
    res.render("contact", { title: "Contact", year: new Date().getFullYear(), message: "Your contact page." });
}




import hp2 = require("htmlparser2");

export function getUrlText(req: express.Request, res: express.Response) {
  var
    targetPage = "http://en.wikipedia.org/wiki/Sahara"; 
    //targetPage = "http://www.mediawiki.org/w/index.php?title=Project:General_disclaimer&action=info";
    //targetPage = "./test.html";
    var currentTag = "";    
    var indenter = <string[]>[];
    var alltext = ""
    var lengthTextTransfered = 0;
    var tagsToExclude = ["script", "link", "style", "pre"];
    

    var parser = new hp2.Parser(<hp2.Handler>{
        onerror: () => console.log("parser error hit"),
        onopentag: tname => {
            currentTag = tname;
            indenter.push("=>");
            console.log(indenter.join("") + "open  " + currentTag );
        }, // track which tag we are in
        onclosetag: (tname) => {
            console.log(indenter.join("") + "close " + tname);
            indenter.pop();
            currentTag = currentTag ? currentTag : "";// fuse
    
        },
        ontext: (textchunk: string) => {
            if (tagsToExclude.indexOf(currentTag) < 0) {
                if (textchunk && textchunk.length > 0) {
                    lengthTextTransfered += textchunk.length;
                    //alltext += textchunk;
                    res.write(textchunk + " ");
                }
            }
        },
        onend: () => {
            //res.render("urlText", { title: "text content of " + targetPage, urltext: alltext });
          res.end();
            console.log("finished stack is at " + indenter.length);
        }
    });

    http.get(targetPage,
        ((p: hp2.Parser) => (resi: any) => {
            resi.pipe(p);// stream to the html parser
        })(parser))
        .on("error", (err) => {
        console.log("This URL is invalid");
        console.log(err);
    });
}
