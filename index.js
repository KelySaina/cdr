const fs = require('fs');
//const csvParser = require('csv-parser');
const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(express.json());

app.use(cors())

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'thyler',
    password: 'k',
    database: 'asteriskdb',
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database as id', connection.threadId);
})

app.get("/insert", (req, res) => {

    const insertQuery = 'INSERT INTO cdr (clientName, clientId, extension, context, src, dst, dialstatus, application, start, answer, end, billsec, duration, disposition, amaflags, uniqueid, userfield, sequencenumber) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    const csvFilePath = 'Master.csv'; // Replace with the path to your CSV file

    fs.readFile(csvFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the CSV file:', err);
            return;
        }

        const linesArray = data.split('\n'); // Split by new line to get an array of lines

        const lastLine = linesArray[linesArray.length - 2]; // Get the last line (skip the empty line)
        const fieldsArray = lastLine.split(','); // Split the last line by comma to get an array of fields



        const clientName = fieldsArray[0].trim().replace(/"/g, '')
        const clientId = fieldsArray[1].trim().replace(/"/g, '')
        const extension = fieldsArray[2].trim().replace(/"/g, '')
        const context = fieldsArray[3].trim().replace(/"/g, '')
        const src = fieldsArray[4].trim().replace(/"/g, '')
        const dst = fieldsArray[5].trim().replace(/"/g, '')
        const dialstatus = fieldsArray[6].trim().replace(/"/g, '')
        const application = fieldsArray[7].trim().replace(/"/g, '')
        const start = fieldsArray[8].trim().replace(/"/g, '')
        const answer = fieldsArray[9].trim().replace(/"/g, '')
        const end = fieldsArray[10].trim().replace(/"/g, '')
        const billsec = fieldsArray[11].trim().replace(/"/g, '')
        const duration = fieldsArray[12].trim().replace(/"/g, '')
        const disposition = fieldsArray[13].trim().replace(/"/g, '')
        const amaflags = fieldsArray[14].trim().replace(/"/g, '')
        const uniqueid = fieldsArray[15].trim().replace(/"/g, '')
        const userfield = fieldsArray[16].trim().replace(/"/g, '')
        const sequencenumber = fieldsArray[17].trim().replace(/"/g, '')


        connection.query(
            insertQuery,
            [
                clientName,
                clientId,
                extension,
                context,
                src,
                dst,
                dialstatus,
                application,
                start,
                answer,
                end,
                billsec,
                duration,
                disposition,
                amaflags,
                uniqueid,
                userfield,
                sequencenumber,
            ],
            (err, result) => {
                if (err) {
                    console.error('Error inserting data into the database:', err);
                } else {
                    console.log('Data inserted successfully.');
                }
            }
        );
    })
});

app.get("/aff", (req, res) => {
    connection.query('select src,dst,start,end,disposition,answer from cdr', (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return;
        }
        res.send(results)
    });
})



app.listen(port, () => {
    console.log(`Backend server is running on ${port}`);
});


