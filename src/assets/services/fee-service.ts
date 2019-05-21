import { IpcMain } from 'electron';

export class FeeService {

    constructor(db, ipcMain: IpcMain) {
        const fees = db.collection('fees');

        ipcMain.on('addFee', (event, arg) => {
            fees.insertOne(arg,  (error, response) => {  
                if (error) throw error
                let fee = response.ops[0];

                event.sender.send('newFee', fee);
              });
        })

        ipcMain.on('getFees', (event, arg) => {
                
            fees.find({}).toArray( (err, docs) => {
              if (err) throw err;
              event.sender.send('sendFees', docs);
            });
        })
    }

}