import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/db";
import QueryBuilder from "@/app/lib/qb";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  try {
    const qb = new QueryBuilder("etr");
    qb.where("id");
    const [etr]: any = await pool.query(qb.query(), [id]);

    const qbPTKP = new QueryBuilder("etr_ptkp");
    qbPTKP.where("id_etr");
    const [etr_ptkp]: any = await pool.query(qbPTKP.query(), [id]);

    const qbBruto = new QueryBuilder("etr_bruto");
    qbBruto.where("id_etr");
    const [etr_bruto]: any = await pool.query(qbBruto.query(), [id]);

    return NextResponse.json({ etr: etr[0], etr_ptkp: etr_ptkp, etr_bruto: etr_bruto });
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

export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  try {
    const formData = await req.formData(); // Ambil FormData dari request

    const nama_etr = formData.get("nama_etr") as string;
    const keterangan = formData.get("keterangan") as string;

    const etr_ptkp: any = formData.get("etr_ptkp");
    const json_etr_ptkp = JSON.parse(etr_ptkp);

    const etr_bruto: any = formData.get("etr_bruto");
    const json_etr_bruto = JSON.parse(etr_bruto);

    const qb = new QueryBuilder("etr");
    qb.column("nama_etr");
    qb.column("keterangan");
    qb.where("id");
    await pool.execute(qb.update(), [nama_etr, keterangan, id]);

    // delete etr ptkp
    const qbETRPTKP = new QueryBuilder("etr_ptkp");
    qbETRPTKP.where("id_etr");
    await pool.execute(qbETRPTKP.delete(), [id]);

    // delete etr bruto
    const qbETRBruto = new QueryBuilder("etr_bruto");
    qbETRBruto.where("id_etr");
    await pool.execute(qbETRBruto.delete(), [id]);

    // insert etr ptkp
    const qbPTKP = new QueryBuilder('etr_ptkp')
    qbPTKP.column('id_etr')
    qbPTKP.column('status')
    qbPTKP.column('tanggungan')
    qbPTKP.column('ptkp')

    for (const dt of json_etr_ptkp) {
      const qbCheck = new QueryBuilder('etr_ptkp')
      qbCheck.where('status')
      qbCheck.where('tanggungan')
      const [rows]: any = await pool.query(qbCheck.query(), [dt.status, dt.tanggungan]);

      if (rows.length === 0) {
        pool.execute(qbPTKP.insert(),
          [
            id,
            dt.status,
            dt.tanggungan,
            dt.ptkp
          ])
      }
    }

    // insert etr bruto
    const qbBruto = new QueryBuilder('etr_bruto')
    qbBruto.column('id_etr')
    qbBruto.column('minimum')
    qbBruto.column('maksimum')
    qbBruto.column('persentasi')

    for (const dt of json_etr_bruto) {
      const qbCheck = new QueryBuilder('etr_bruto')
      qbCheck.where('id_etr')
      qbCheck.where('minimum')
      qbCheck.where('maksimum')
      const [rows]: any = await pool.query(qbCheck.query(), [id, dt.minimum, dt.maksimum]);

      if (rows.length === 0) {
        pool.execute(qbBruto.insert(),
          [
            id,
            dt.minimum,
            dt.maksimum,
            dt.persentasi
          ])
      }
    }

    return NextResponse.json({ message: "Updated successfully", success: true });
  } catch (error) {
    if (typeof error === "string") {
      console.error("Error updating data:", error.toUpperCase());
      return NextResponse.json({ success: false, error: error.toUpperCase() }, { status: 500 });
    } else if (error instanceof Error) {
      console.error("Error updating data:", error.message);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  try {
    const qbETRPTKP = new QueryBuilder("etr_ptkp");
    qbETRPTKP.where("id_etr");
    await pool.execute(qbETRPTKP.delete(), [id]);

    const qbETRBruto = new QueryBuilder("etr_bruto");
    qbETRBruto.where("id_etr");
    await pool.execute(qbETRBruto.delete(), [id]);

    const qb = new QueryBuilder("etr");
    qb.where("id");
    await pool.execute(qb.delete(), [id]);

    return NextResponse.json({ message: "Deleted successfully", success: true });
  } catch (error) {
    if (typeof error === "string") {
      console.error("Error deleting data:", error.toUpperCase());
      return NextResponse.json({ success: false, error: error.toUpperCase() }, { status: 500 });
    } else if (error instanceof Error) {
      console.error("Error deleting data:", error.message);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }
}
