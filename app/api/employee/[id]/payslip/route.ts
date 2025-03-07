import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/db";
import QueryBuilder from "@/app/lib/qb";

export async function POST(req: NextRequest) {

    try {

        const formData = await req.formData(); // Ambil FormData dari request

        const id_pegawai = formData.get("id_pegawai")
        const bruto = parseFloat(formData.get("bruto") as string) || 0

        const qbPegawai = new QueryBuilder("pegawai");
        qbPegawai.where("id");
        const [p]: any = await pool.query(qbPegawai.query(), [id_pegawai]);

        const qbETR = new QueryBuilder('etr_bruto')
        qbETR.innerJoin('etr_ptkp', 'etr_bruto.id_etr', 'etr_ptkp.id_etr')
        qbETR.where('etr_ptkp.status')
        qbETR.where('etr_ptkp.tanggungan')
        qbETR.where('etr_bruto.minimum', '<=')
        qbETR.where('etr_bruto.maksimum', '>=')
        qbETR.column('etr_bruto.persentasi')

        const [etr]: any = await pool.query(qbETR.query(),
            [
                p[0].status,
                p[0].tanggungan,
                bruto,
                bruto,
            ]
        );

        const pph = Math.round((bruto * etr[0].persentasi / 100) * 1.2)

        return NextResponse.json(pph);
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