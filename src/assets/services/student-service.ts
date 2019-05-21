import { IpcMain } from 'electron';
import * as path from "path";

export class StudentService {

    constructor (db, ipcMain: IpcMain){
        const fs = require('fs');

        const crypto = require('crypto');
        const algorithm = 'aes-256-cbc';
        const key = fs.readFileSync(path.join(__dirname, '../../../../../src/assets/config/enc.nsusi'));    
        /*const key = crypto.randomBytes(32);
        fs.writeFile("temp.txt", Buffer.from(key), (err) => {
            if (err) console.log(err);
            console.log("Successfully Written to File.");
          });*/
        const iv = crypto.randomBytes(16);
        const students = db.collection('students');

        ipcMain.on('getStudents', (event, arg) => {
            
            students.find({}).toArray( (err, docs) => {
              if (err) throw err;
              docs.forEach(stud => {
                  stud._id = stud._id.toString();
                  stud.brLicne = decrypt(stud.brLicne);
                  stud.jmbg = decrypt(stud.jmbg);
              });
              event.sender.send('sendStudents', docs);
            });
        })

        ipcMain.on('addStudent', (event, arg) => {
            arg.brLicne = encrypt(arg.brLicne);
            arg.jmbg = encrypt(arg.jmbg);
            students.insertOne(arg,  (error, response) => {  
                if (error) throw error
                let stud = response.ops[0];
                stud._id = stud._id.toString();
                stud.brLicne = decrypt(stud.brLicne);
                stud.jmbg = decrypt(stud.jmbg);
                event.sender.send('newStudent', stud);
              });
        })

        var ObjectID = require('mongodb').ObjectID;

        ipcMain.on('updateStudent', (event, arg) => {
            arg.brLicne = encrypt(arg.brLicne);
            arg.jmbg = encrypt(arg.jmbg);
            let id = ObjectID(arg._id);
            delete arg._id;
            students.updateOne({_id: id}, { $set:arg }, error  => {  
                if (error) throw error
                event.sender.send('confirmUpdate', {});
              });
        })

        ipcMain.on('addFeesToAll', (event, arg) => {
            students.updateMany({}, { $push: { clanarine : arg } }, error => {
                if (error) throw error
                event.sender.send('feesAdded', "students updated");
              });
        })
     
        const encrypt = (text) => {
         let cipher = crypto.createCipheriv(algorithm, key, iv);
         let encrypted = cipher.update(text);
         encrypted = Buffer.concat([encrypted, cipher.final()]);
         return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
        }
        
         const decrypt = (text) => {
         let iv = Buffer.from(text.iv, 'hex');
         let encryptedText = Buffer.from(text.encryptedData, 'hex');
         let decipher = crypto.createDecipheriv(algorithm, key, iv);
         let decrypted = decipher.update(encryptedText);
         decrypted = Buffer.concat([decrypted, decipher.final()]);
         return decrypted.toString();
        }

    }



}