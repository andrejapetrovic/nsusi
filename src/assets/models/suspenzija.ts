import { Student } from './student';

export class Suspenzija {
    datSusp: Date;
    razlog: string;
    datPrestanka: Date;

    public constructor(init?:Partial<Suspenzija>) {
        Object.assign(this, init);
    }
}