import { NextRequest, NextResponse } from 'next/server';
import pool from '@/app/lib/db';
import QueryBuilder from '@/app/lib/qb';

export async function GET() {
    try {
        const qb = new QueryBuilder('pegawai')
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

        const nama_pegawai = formData.get("nama_pegawai")
        const tgl_join = formData.get("tgl_join")
        const jabatan = formData.get("jabatan")
        const status = formData.get("status")
        const tanggungan = formData.get("tanggungan")
        const gaji_pokok = formData.get("gaji_pokok")
        const npwp = formData.get("npwp")

        const tunjangan_pegawai: any = formData.get("tunjangan_pegawai");
        const json_tunjangan_pegawai = JSON.parse(tunjangan_pegawai);

        // Validasi data
        if (!nama_pegawai) {
            return NextResponse.json({ error: "Please fill all required fields" }, { status: 400 });
        }

        const qb = new QueryBuilder('pegawai')
        qb.column('nama_pegawai')
        qb.column('tgl_join')
        qb.column('jabatan')
        qb.column('status')
        qb.column('tanggungan')
        qb.column('gaji_pokok')
        qb.column('npwp')

        const [result]: any = await pool.execute(qb.insert(),
            [
                nama_pegawai,
                tgl_join,
                jabatan,
                status,
                tanggungan,
                gaji_pokok,
                npwp
            ]);
        const insertedId = result.insertId;

        // insert tunjangan pegawai
        const qbTP = new QueryBuilder('tunjangan_pegawai')
        qbTP.column('id_pegawai')
        qbTP.column('id_tunjangan')
        qbTP.column('nominal')

        for (const dt of json_tunjangan_pegawai) {
            pool.execute(qbTP.insert(),
                [
                    insertedId,
                    dt.id_tunjangan,
                    dt.nominal
                ])
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