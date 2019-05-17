import { Student } from './student';

export class Clanarina {
    iznos: string;
    dat: Date;
    placena: boolean;
    god: string;

    public constructor(init?:Partial<Clanarina>) {
        Object.assign(this, init);
    }
}