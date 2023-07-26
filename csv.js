const fs = require('fs');
const csvParser = require('csv-parser');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'thyler',
    password: 'k',
    database: 'asteriskdb',
});

const csvFilePath = 'Master.csv'; // Replace with the path to your CSV file

fs.readFile(csvFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the CSV file:', err);
        return;
    }

    const linesArray = data.split('\n'); // Split by new line to get an array of lines

    const lastLine = linesArray[linesArray.length - 2]; // Get the last line (skip the empty line)
    const fieldsArray = lastLine.split(','); // Split the last line by comma to get an array of fields


    const cdrEntry = {
        clientName: fieldsArray[0].trim().replace(/"/g, ''),
        clientId: fieldsArray[1].trim(),
        extension: fieldsArray[2].trim(),
        context: fieldsArray[3].trim(),
        src: fieldsArray[4].trim(),
        dst: fieldsArray[5].trim(),
        dialstatus: fieldsArray[6].trim(),
        application: fieldsArray[7].trim(),
        start: fieldsArray[8].trim(),
        answer: fieldsArray[9].trim(),
        end: fieldsArray[10].trim(),
        billsec: fieldsArray[11].trim(),
        duration: fieldsArray[12].trim(),
        disposition: fieldsArray[13].trim(),
        amaflags: fieldsArray[14].trim(),
        uniqueid: fieldsArray[15].trim(),
        userfield: fieldsArray[16].trim(),
        sequencenumber: fieldsArray[17].trim(),
    };


    console.log('Data to be inserted:', cdrEntry);
});
