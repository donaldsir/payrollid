export interface ETR {
    id: number;
    nama_etr: string;
    keterangan: string;
}

export interface ETRPTKP {
    id: number;
    id_etr: number;
    status: number;
    tanggungan: number;
    ptkp: number;
}

export interface ETRBruto {
    id: number;
    id_etr: number;
    minimum: number;
    maksimum: number;
    persentasi: number;
}