require('shelljs/global');
var csv=require("csvtojson");
var _ = require('lodash');

var csvData = cat('table.csv')
csv()                       // passing no options gives array of objects
// {
//      noheader:false,     // noheader: false will INCLUDE the header
//      output: "csv"       // "csc" will give an array of arrays
// }
    .fromString(csvData)
    .then(rows => {
        echo(rows.map(r=>r.Date)+',')
        var closes = rows.map(r => +r.Close);
        var avg = _.sum(closes) / closes.length;
        console.log(avg);
    })
