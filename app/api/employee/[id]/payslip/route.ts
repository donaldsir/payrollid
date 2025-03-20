import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/db";
import QueryBuilder from "@/app/lib/qb";
import { list_bpjs_employment } from "@/app/lib/helpers";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;

    const qbPegawai = new QueryBuilder("pegawai");
    qbPegawai.where("id");
    const [p]: any = await pool.query(qbPegawai.query(), [id]);

    const qbTunjangan = new QueryBuilder("tunjangan_pegawai");
    qbTunjangan.innerJoin("tunjangan", "tunjangan_pegawai.id_tunjangan", "tunjangan.id");
    qbTunjangan.column("IFNULL(SUM(tunjangan_pegawai.nominal),0) AS bruto");
    qbTunjangan.where("tunjangan_pegawai.id_pegawai");
    qbTunjangan.where("tunjangan.ptkp");

    const [tunjangan]: any = await pool.query(qbTunjangan.query(), [id, 0]);
    const bruto = p[0].gaji_pokok + tunjangan[0].bruto;

    const qbETR = new QueryBuilder("etr_bruto");
    qbETR.innerJoin("etr_ptkp", "etr_bruto.id_etr", "etr_ptkp.id_etr");
    qbETR.where("etr_ptkp.status");
    qbETR.where("etr_ptkp.tanggungan");
    qbETR.where("etr_bruto.minimum", "<=");
    qbETR.where("etr_bruto.maksimum", ">=");
    qbETR.column("etr_bruto.persentasi");

    const [etr]: any = await pool.query(qbETR.query(), [p[0].status, p[0].tanggungan, bruto, bruto]);

    // earning
    let jht_company = 0;
    let jp_company = 0;
    let jkm = 0;
    let jkk = 0;
    let bpjs_health_company = 0;
    let tunjangan_pph = 0;

    // deduction
    let jht_employee = 0;
    let jp_employee = 0;
    let bpjs_health_employee = 0;
    let pph = 0;

    if (p[0].bpjs_employment > 0) {
      jht_company = 0.037 * bruto;
      jp_company = 0.02 * bruto;
      jkm = 0.003 * bruto;

      jht_employee = 0.02 * bruto;
      jp_employee = 0.01 * bruto;

      const filtered = list_bpjs_employment.filter((dt) => dt.id === p[0].bpjs_employment);
      jkk = (filtered[0].percentage * bruto) / 100;
    }

    if (p[0].bpjs_health > 0) {
      bpjs_health_company = bruto > 12000000 ? 480000 : 0.04 * bruto;
      bpjs_health_employee = bruto > 12000000 ? 120000 : 0.01 * bruto;
    }

    let pkp = bruto + jkm + jkk + bpjs_health_company;
    let constanta = p[0].npwp ? 1 : 1.2;

    if (p[0].tipe_pajak > 0) {
      const total_bruto = Math.round((pkp / (1 - etr[0].persentasi / 100)) * constanta);
      tunjangan_pph = total_bruto - pkp;
    } else {
      pph = pkp * (etr[0].persentasi / 100) * constanta;
    }

    const earning = {
      gaji_pokok: p[0].gaji_pokok,
      tunjangan: tunjangan[0].bruto,
      jht_company,
      jp_company,
      jkm,
      jkk,
      bpjs_health_company,
      tunjangan_pph,
    };

    const deduction = {
      jht_employee,
      jp_employee,
      bpjs_health_employee,
      pph,
    };

    return NextResponse.json({ earning, deduction });
  } catch (error) {
    if (typeof error === "string") {
      console.error("Error fetching data:", error.toUpperCase());
      return NextResponse.json({ error: error.toUpperCase() }, { status: 500 });
    } else if (error instanceof Error) {
      console.error("Error fetching data:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
