"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var StudentService = /** @class */ (function () {
    function StudentService(db, ipcMain) {
        var fs = require('fs');
        var crypto = require('crypto');
        var algorithm = 'aes-256-cbc';
        var key = fs.readFileSync(path.join(__dirname, '../../../../../src/assets/config/enc.nsusi'));
        var iv = crypto.randomBytes(16);
        var students = db.collection('students');
        ipcMain.on('getStudents', function (event, arg) {
            students.find({}).toArray(function (err, docs) {
                if (err)
                    throw err;
                console.log("students: ");
                docs.forEach(function (stud) {
                    stud._id = stud._id.toString();
                    stud.brLicne = decrypt(stud.brLicne);
                    stud.jmbg = decrypt(stud.jmbg);
                });
                event.sender.send('sendStudents', docs);
            });
        });
        ipcMain.on('addStudent', function (event, arg) {
            arg.brLicne = encrypt(arg.brLicne);
            arg.jmbg = encrypt(arg.jmbg);
            students.insert(arg, function (error, response) {
                if (error)
                    throw error;
                //console.log(response.ops[0]);
                var stud = response.ops[0];
                stud._id = stud._id.toString();
                stud.brLicne = decrypt(stud.brLicne);
                stud.jmbg = decrypt(stud.jmbg);
                event.sender.send('newStudent', stud);
            });
        });
        var ObjectID = require('mongodb').ObjectID;
        ipcMain.on('updateStudent', function (event, arg) {
            arg.brLicne = encrypt(arg.brLicne);
            arg.jmbg = encrypt(arg.jmbg);
            var id = ObjectID(arg._id);
            delete arg._id;
            console.log(arg);
            students.updateOne({ _id: id }, { $set: arg }, function (error) {
                if (error)
                    throw error;
                event.sender.send('confirmUpdate', {});
            });
        });
        /*        var bcrypt = require('bcryptjs');
        
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash("test", salt, function(err, hash) {
                        // Store hash in your password DB.
                        console.log(hash);
                        bcrypt.compare("test", hash, function(err, res) {
                            // res === true
                            console.log(res);
                        });
                        bcrypt.compare("not_bacon", hash, function(err, res) {
                            console.log(res);
                        });
        
                    });
                });*/
        var encrypt = function (text) {
            var cipher = crypto.createCipheriv(algorithm, key, iv);
            var encrypted = cipher.update(text);
            encrypted = Buffer.concat([encrypted, cipher.final()]);
            return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
        };
        var decrypt = function (text) {
            var iv = Buffer.from(text.iv, 'hex');
            var encryptedText = Buffer.from(text.encryptedData, 'hex');
            var decipher = crypto.createDecipheriv(algorithm, key, iv);
            var decrypted = decipher.update(encryptedText);
            decrypted = Buffer.concat([decrypted, decipher.final()]);
            return decrypted.toString();
        };
    }
    return StudentService;
}());
exports.StudentService = StudentService;
//# sourceMappingURL=student-service.js.map