import { NextRequest, NextResponse } from 'next/server';
import pool from '@/app/lib/db';
import QueryBuilder from '@/app/lib/qb';

export async function GET() {
    try {
        const qb = new QueryBuilder('tunjangan')
        qb.column('tunjangan.*')
        const [rows] = await pool.query(qb.query());

        return NextResponse.json(rows);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData(); // Ambil FormData dari request

        const nama_tunjangan = formData.get("nama_tunjangan") as string;
        const keterangan = formData.get("keterangan") as string;
        const aktif = formData.get("aktif") as string;

        // Validasi data
        if (!nama_tunjangan) {
            return NextResponse.json({ error: "Please fill all required fields" }, { status: 400 });
        }

        const qb = new QueryBuilder('tunjangan')
        qb.column('nama_tunjangan')
        qb.column('keterangan')
        qb.column('aktif')

        await pool.execute(qb.insert(), [nama_tunjangan, keterangan, aktif]);

        return NextResponse.json({ message: "Data berhasil ditambahkan", success: true });
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