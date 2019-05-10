"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var DataManager = /** @class */ (function () {
    function DataManager() {
        var MongoClient = require('mongodb').MongoClient;
        var url = 'mongodb+srv://aki:123@cluster0-jgedm.gcp.mongodb.net';
        var client = new MongoClient(url, { useNewUrlParser: true });
        client.connect(function (err) {
            if (err)
                throw err;
            console.log("Connected correctly to server");
            var dbs = client.db('nsusi');
            // Get the documents collection
            var students = dbs.collection('students');
            // Find some documents
            students.find({}).toArray(function (err, docs) {
                if (err)
                    throw err;
                console.log("Found the following records");
                console.log(docs);
            });
        });
        var Datastore = require('nedb');
        var db = {};
        db.students = new Datastore({ filename: 'src/assets/data/student.db', autoload: true });
        electron_1.ipcMain.on('getStudents', function (event, arg) {
            db.students.find({}, function (error, studs) {
                if (error)
                    throw error;
                event.sender.send('sendStudents', studs);
            });
        });
        electron_1.ipcMain.on('addStudent', function (event, arg) {
            db.students.insert(arg, function (error, newStud) {
                if (error)
                    throw error;
                event.sender.send('newStudent', newStud);
            });
        });
        var bcrypt = require('bcryptjs');
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash("test", salt, function (err, hash) {
                // Store hash in your password DB.
                console.log(hash);
                bcrypt.compare("test", hash, function (err, res) {
                    // res === true
                    console.log(res);
                });
                bcrypt.compare("not_bacon", hash, function (err, res) {
                    console.log(res);
                });
            });
        });
    }
    return DataManager;
}());
exports.DataManager = DataManager;
//# sourceMappingURL=datamanager.js.map