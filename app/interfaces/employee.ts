export interface Employee {
    id: number;
    nama_pegawai: string;
    tgl_join: string;
    jabatan: string;
    status: number;
    tanggungan: number;
    gaji_pokok: number;
    npwp: string;
}

export interface EmployeeAllowance {
    id: number;
    id_pegawai: number;
    id_tunjangan: number;
    nominal: number;
}