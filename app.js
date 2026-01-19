// Initializing variables
const cleanButton = document.getElementById("clean");
const copyButton = document.getElementById("copy");
const clearButton = document.getElementById("clear");

const suffixes=[" gmbh & co. kg"," gmbh & co kg"," corporation"," company"," e.u.r.l"," g.m.b.h"," limited"," s a r.l"," s à r.l"," s a.r l"," s à.r l"," s.a r l"," s.à r l"," s.a r.l"," s.à r.l"," s.a.r.l"," s.à.r.l"," s.a.s.u"," soparfi"," sarl-s"," selarl"," corp."," l.l.c"," l.l.p"," l.t.d"," o.h.g"," p.l.c"," s.a.s"," s.c.a"," s.c.s"," s.n.c"," selas"," corp"," eurl"," gmbh"," inc."," sarl"," sàrl"," sasu"," a.g"," co."," e.g"," inc"," k.g"," l.p"," llc"," llp"," ltd"," ohg"," plc"," s.a"," s.e"," sas"," sca"," scs"," snc"," ag"," co"," eg"," kg"," lp"," sa"," se"];


// Clean function on cleanButton click (reads and writes to output for now)
cleanButton.onclick = function () {
    // Read input
    const input = document.getElementById("input").value;

    // Turn raw input into array of lines
    const lines = input.split("\n");

    
    for (let i = 0; i < lines.length; i++) {

        // Remove leading/trailing spaces,
        lines[i] = lines[i].trim()

        // Remove trailing ponctuation
        while (lines[i].endsWith(".") || lines[i].endsWith(",")) {
            lines[i] = lines[i].slice(0, -1);
        }

        // Collapse multiple spaces into one
        lines[i] = lines[i].replace(/\s+/g, " ");

        // Remove corporate suffixes
        for (let j = 0; j < suffixes.length; j++) {
            let lower = lines[i].toLowerCase();

            while (lower.endsWith(suffixes[j])) {
                // Remove the suffix
                lines[i] = lines[i].slice(0, lines[i].length - suffixes[j].length).trim();

                // Remove trailing punctuation again if needed
                while (lines[i].endsWith(".") || lines[i].endsWith(",")) {
                    lines[i] = lines[i].slice(0, -1);
                }

                // Remove trailing "&" left by cases like "GmbH & Co"
                if (lines[i].endsWith("&")) {
                    ines[i] = lines[i].slice(0, -1).trim();
                }

                // Update comparison string after mutation
                lower = lines[i].toLowerCase();
            }
        }
    
    }

    // Remove empty lines
    const cleanLines = lines.filter(line => line !== "");




    // Status 
    document.getElementById("status").innerText = "cleaned " + lines.length + " lines";

    // Cleaned list text area
    document.getElementById("output").value = cleanLines.join("\n");
};

// copy function on copyButton click
copyButton.onclick = function () {
    navigator.clipboard.writeText(document.getElementById("output").value);
    document.getElementById("status").innerText = "copied";
};

// clear function on clearButton click
clearButton.onclick = function () {
    document.getElementById("input").value = "";
    document.getElementById("output").value = "";
    document.getElementById("status").innerText = "\n";
};