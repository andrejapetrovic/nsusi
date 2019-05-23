import { IpcMain } from 'electron';

export class FeeService {

    constructor(db, ipcMain: IpcMain) {
        //const fees = db.collection('fees');
        const fees = db;
        ipcMain.on('addFee', (event, arg) => {
            fees.insert(arg,  (error, response) => {  
                if (error) throw error
                let fee = response;

                event.sender.send('newFee', fee);
              });
        })

        ipcMain.on('getFees', (event, arg) => {
                
            fees.find({}, (err, docs) => {
              if (err) throw err;
              event.sender.send('sendFees', docs);
            });
        })
    }

}