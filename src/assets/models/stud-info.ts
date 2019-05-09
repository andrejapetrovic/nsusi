import { Student } from './student';

export class StudInfo {
    id: string;
    fakultet: string;
    smer: string;
    godUpis: string;
    godStud: number;

    public constructor(init?:Partial<StudInfo>) {
        Object.assign(this, init);
    }
}