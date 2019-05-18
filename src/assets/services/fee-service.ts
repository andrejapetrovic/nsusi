import { IpcMain } from 'electron';

export class FeeService {

    constructor(db, ipcMain: IpcMain) {
        const fees = db.collection('fees');

        ipcMain.on('addFee', (event, arg) => {
            fees.insert(arg,  (error, response) => {  
                if (error) throw error
                //console.log(response.ops[0]);
                let fee = response.ops[0];

                event.sender.send('newFee', fee);
              });
        })
    }
}