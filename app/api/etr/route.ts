import { NextRequest, NextResponse } from 'next/server';
import pool from '@/app/lib/db';
import QueryBuilder from '@/app/lib/qb';

export async function GET() {
    try {
        const qb = new QueryBuilder('etr')
        const [rows] = await pool.query(qb.query())

        return NextResponse.json(rows)
    } catch (error) {
        if (typeof error === "string") {
            console.error("Error fetching data:", error.toUpperCase());
            return NextResponse.json({ success: false, error: error.toUpperCase() }, { status: 500 });
        } else if (error instanceof Error) {
            console.error("Error fetching data:", error.message);
            return NextResponse.json({ success: false, error: error.message }, { status: 500 });
        }
    }
}

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData(); // Ambil FormData dari request

        const nama_etr = formData.get("nama_etr") as string;
        const keterangan = formData.get("keterangan") as string;

        const etr_ptkp: any = formData.get("etr_ptkp");
        const json_etr_ptkp = JSON.parse(etr_ptkp);

        const etr_bruto: any = formData.get("etr_bruto");
        const json_etr_bruto = JSON.parse(etr_bruto);

        // Validasi data
        if (!nama_etr) {
            return NextResponse.json({ error: "Please fill all required fields" }, { status: 400 });
        }

        const qb = new QueryBuilder('etr')
        qb.column('nama_etr')
        qb.column('keterangan')

        const [result]: any = await pool.execute(qb.insert(), [nama_etr, keterangan]);
        const insertedId = result.insertId;

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
                        insertedId,
                        dt.status,
                        dt.tanggungan,
                        dt.ptkp
                    ])
            } else {
                const qbDelete = new QueryBuilder("etr");
                qbDelete.where("id");
                await pool.execute(qbDelete.delete(), [insertedId]);

                return NextResponse.json({ success: false, error: "Duplicate Entry" }, { status: 500 });
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
            const [rows]: any = await pool.query(qbCheck.query(), [insertedId, dt.minimum, dt.maksimum]);

            if (rows.length === 0) {
                pool.execute(qbBruto.insert(),
                    [
                        insertedId,
                        dt.minimum,
                        dt.maksimum,
                        parseFloat(dt.persentasi.toFixed(2))
                    ])
            }
        }

        return NextResponse.json({ message: "Saved successfully", success: true });
    } catch (error) {
        if (typeof error === "string") {
            console.error("Error inserting data:", error.toUpperCase());
            return NextResponse.json({ success: false, error: error.toUpperCase() }, { status: 500 });
        } else if (error instanceof Error) {
            console.error("Error inserting data:", error.message);
            return NextResponse.json({ success: false, error: error.message }, { status: 500 });
        }
    }
}
