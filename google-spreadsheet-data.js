var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');
var fs = require("fs");

const creds = require("./API-XXXXX.json");
const doc = new GoogleSpreadsheet("XXXXX-XXXX-XXXX");
const sheetNumber = 1;
const exportFilename = "./_data/posts.yml";
const orderBy = "col1";
const offset = 1;
const limit = null;

let sheet;

async.series([
        function setAuth(step) {
            doc.useServiceAccountAuth(creds, step);
        },
        function getInfoAndWorksheets(step) {
            doc.getInfo((err, info) => {
                console.log("Spreadsheet: " + info.title + " by " + info.author.email);
                // Get sheets
                sheet = info.worksheets[sheetNumber];
                console.log("Sheet " + sheetNumber + ": " + sheet.title + " " + sheet.rowCount + "x" + sheet.colCount);
                step();
            });
        },
        function getData(step) {
            sheet.getRows({
                offset: offset,
                limit: limit,
                orderby: orderBy
            },
            function(err, rows) {
                console.log("Read " + rows.length + " rows\n");
                // Clean export file
                fs.truncate(exportFilename, 0, () => {});
                // Save rows as items in the export file
                for (let row of rows) {
                    fs.appendFile(
                        exportFilename,
                        "- name: " + row.name + "\n\x20\x20" +
                        "description: " + row.description + "\n\x20\x20" +
                        "url: " + row.url +"\n\n",
                        err => {}
                    );
                }
            });
        }
    ],
    function(err){
        if( err ) {
        console.log('Error: '+err);
        }
    }
);
