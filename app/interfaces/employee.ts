export interface Employee {
  id: number;
  nama_pegawai: string;
  tgl_join: string;
  jabatan: string;
  status: number;
  tanggungan: number;
  gaji_pokok: number;
  npwp: number;
  bpjs_health: number;
  bpjs_employment: number;
  tipe_pajak: number;
}

export interface EmployeeAllowance {
  id: number;
  id_pegawai: number;
  id_tunjangan: number;
  nominal: number;
}
