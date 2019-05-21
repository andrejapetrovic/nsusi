import { Student } from 'src/assets/models/student';
import { Clanarina } from 'src/assets/models/clanarina';
import { Suspenzija } from 'src/assets/models/suspenzija';

export interface SuspenzijaRow {
    datSusp : string;
    datPrestanka: string;
    razlog: string;
}

export class StudentRow {

    _id: string;
    ime: string;
    prz: string;
    jmbg: string;
    tip: string;
    tipInv: string;
    dat: string;
    mob: string;
    tel: string;
    aktivan: boolean;
    pisanjeProj: boolean;
    radVes: boolean;
    nedostupan: boolean;
    stari: boolean;
    susp: boolean;
    suspDat: string;
    suspRazlog: string;
    brLicne: string;
    ulica: string;
    dijagnoza: string;
    ispit: string;
    dodatnaPodrska: string;
    mestoRodj: string;
    mestoStan: string;
    racVest: string;
    drugeVes: string;
    jezici: string;
    studOrgs: string;
    prisSkup: string;
    datUcl: string;
    fakultet: string;
    smer: string;
    godStud: number;
    godUpis: string;
    clanarina: boolean;
    editable: boolean;
    suspenzije: SuspenzijaRow[]; 
    godUcl: string;
    clnPostoji: boolean;

    public constructor(public student: Student) {
        this._id = student._id;
        this.ime = student.ime;
        this.prz = student.prz;
        this.jmbg = student.jmbg;
        this.tip = student.tip;
        this.tipInv = student.tipInv;
        this.mob = student.mob;
        this.tel = student.tel;
        this.aktivan = student.aktivan;
        this.pisanjeProj = student.pisanjeProj;
        this.radVes = student.radVes;
        this.nedostupan = student.nedostupan;
        this.susp = this.isSuspended(student.suspenzije);
        this.suspDat = this.getSuspInfo(student.suspenzije)[0];
        this.suspRazlog = this.getSuspInfo(student.suspenzije)[1];
        this.dat = this.parseDate(student.dat);
        this.brLicne = student.brLicne;
        this.ulica = student.ulica;
        this.dijagnoza = student.dijagnoza;
        this.ispit = student.ispit;
        this.dodatnaPodrska = student.dodatnaPodrska;
        this.mestoRodj = student.mestoRodj;
        this.mestoStan = student.mestoStan;
        this.racVest = this.joinArr(student.racVest);
        this.drugeVes = this.joinArr(student.drugeVes);
        this.jezici = this.joinArr(student.jezici);
        this.studOrgs = this.joinArr(student.studOrgs);
        this.prisSkup = this.joinArr(student.prisSkup);
        this.fakultet = student.studInfo.fakultet;
        this.smer = student.studInfo.smer;
        this.godStud = student.studInfo.godStud;
        this.godUpis = student.studInfo.godUpis;
        //this.clanarina = this.platioClanarinu(student.clanarine);
        this.datUcl = this.parseDate(student.datUcl);
        this.editable = false;
        this.suspenzije = this.convertToSuspRow(student.suspenzije); 
        this.godUcl = student.godUcl;
    }

    private parseDate(date: Date): string {
        if (!date) return "";
        return date.getDate() + '. ' + (date.getMonth()+1) + '. ' + date.getFullYear();
    }

    private isSuspended(suspenzije: Suspenzija[]) {
        if(suspenzije.length == 0) return false;
        let susp = suspenzije[suspenzije.length-1];
        if(!susp)
            return true;        
        if (!susp.datPrestanka)
            return true;
        return false;
    }

    private getSuspInfo(suspenzije: Suspenzija[]) {
        if(suspenzije.length == 0) return ["", ""];
        let susp = suspenzije[suspenzije.length-1];      
        return [this.parseDate(susp.datSusp), susp.razlog];
    }

    private platioClanarinu(clanarine: Clanarina[]) {
        if(!clanarine) return false;
        return clanarine[clanarine.length-1].placena; 
    }

    private joinArr(arr: any[]) {
        if(!arr) return [];
        return arr.length == 0 ? arr[0] : arr.join(', '); 
    }

    private convertToSuspRow(suspenzije: Suspenzija[]): SuspenzijaRow[] {
        if (!suspenzije) return [];
        let retVal: SuspenzijaRow[] = [];
        suspenzije.forEach( s => {
            retVal.push({
                datPrestanka: this.parseDate(s.datPrestanka),
                datSusp: this.parseDate(s.datSusp),
                razlog: s.razlog
            });
        });
        return retVal;
    }

    public updateModel(): Student {
        this.student.ime = this.ime;
        this.student.prz = this.prz;
        this.student.jmbg = this.jmbg;
        this.student.tip = this.tip;
        this.student.tipInv = this.tipInv;
        this.student.mob = this.mob;
        this.student.tel = this.tel;
        this.student.aktivan = this.aktivan;
        this.student.pisanjeProj = this.pisanjeProj;
        this.student.radVes = this.radVes;
        this.student.nedostupan = this.nedostupan;
        this.student.dat = this.str2Date(this.dat);
        this.student.brLicne = this.brLicne;
        this.student.ulica = this.ulica;
        this.student.dijagnoza = this.dijagnoza;
        this.student.ispit = this.ispit;
        this.student.dodatnaPodrska = this.dodatnaPodrska;
        this.student.mestoRodj = this.mestoRodj;
        this.student.mestoStan = this.mestoStan;
        this.student.racVest = this.str2Arr(this.racVest);
        this.student.drugeVes = this.str2Arr(this.drugeVes);
        this.student.jezici = this.str2Arr(this.jezici);
        this.student.studOrgs = this.str2Arr(this.studOrgs);
        this.student.prisSkup = this.str2Arr(this.prisSkup);
        this.student.studInfo.fakultet = this.fakultet;
        this.student.studInfo.smer = this.smer;
        this.student.studInfo.godStud = this.godStud;
        this.student.studInfo.godUpis = this.godUpis;
        this.student.datUcl = this.str2Date(this.datUcl);
        this.student.godUcl = this.godUcl;
        this.student.stari = this.stari;
        return this.student;
    }

    public platiClanarinu(cln: Clanarina): StudentRow {
        if (!this.student.clanarine) return;
        this.clanarina = true;
        let idx = this.student.clanarine.indexOf( this.student.clanarine.find( c => c.god === cln.god) );
        this.student.clanarine[idx].placena = true;
        this.student.clanarine[idx].dat = cln.dat;
        return this;
    }

    public obrisiClanarinu(cln: Clanarina){
        if (!this.student.clanarine) return;
        this.student.clanarine = this.student.clanarine.filter(c => c !== cln);
        this.clanarina = this.platioClanarinu(this.student.clanarine);
    }

    public dodajClanarinu(cln: any){
        this.student.clanarine.push(new Clanarina(cln));
    }

    public ukiniSuspenziju(suspenzija: Suspenzija) {
        this.susp = false;
        this.suspDat = "";
        this.suspRazlog = "";
        let susp = this.student.suspenzije[this.student.suspenzije.length-1];
        susp.datPrestanka = suspenzija.datPrestanka;
        susp.godPrestanka = suspenzija.godPrestanka;
    }

    public dodajSuspenziju(susp): StudentRow {
        this.suspenzije.push(Object.assign({}, susp));
        this.suspDat = susp.datSusp; 
        susp.datSusp = this.str2Date(susp.datSusp);
        this.susp = true;
        this.suspRazlog = susp.razlog;
        this.student.suspenzije.push(susp);
        return this;
    }

    private str2Date(dateStr: string): Date {
        let d = dateStr.split('. ');          
        return new Date(parseInt(d[2]), parseInt(d[1])-1, parseInt(d[0]));
    }

    private str2Arr(arrStr: string): any[] {
        if (!arrStr) return [];
        arrStr = arrStr.replace(/\s/g, '');
        return arrStr.includes(',') ? arrStr.split(',') : [arrStr];
    } 

    public getModel() {
        return this.student;
    }

    public arhiviraj(val: any) {
        let stari; 
        val.arh === 'stari' ? stari = true : stari = false;
        if (stari) {
            this.student.stari = true;
            this.stari = true;
        } else {
            this.student.nedostupan = true;
            this.nedostupan = true;
        }
    }

    public vratiIzArhive() {
        this.student.nedostupan = false;
        this.student.stari = false;
        this.nedostupan = false;
        this.stari = false
    }

    public setClanarineZaGod(god: string) {

        let gods = this.student.clanarine.map(x => x.god);
        if (gods.includes(god)) {
            this.clnPostoji = true;
        } else {
            this.clnPostoji = false;
        }

        this.student.clanarine.forEach( cln => {  
            if (cln.god === god) {
                this.clanarina = cln.placena;
            } 
        })
    }
} 