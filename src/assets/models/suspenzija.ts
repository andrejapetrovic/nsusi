import { Student } from './student';

export class Suspenzija {
    datSusp: Date;
    godSusp: string
    razlog: string;
    datPrestanka: Date;
    godPrestanka: string

    public constructor(init?:Partial<Suspenzija>) {
        Object.assign(this, init);
    }
}