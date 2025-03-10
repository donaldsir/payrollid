import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/db";
import QueryBuilder from "@/app/lib/qb";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    try {
        const qbPegawai = new QueryBuilder("pegawai");
        qbPegawai.where("id");
        const [pegawai]: any = await pool.query(qbPegawai.query(), [id]);

        const qbTP = new QueryBuilder('tunjangan_pegawai')
        qbTP.innerJoin('pegawai', 'pegawai.id', 'tunjangan_pegawai.id_pegawai')
        qbTP.innerJoin('tunjangan', 'tunjangan_pegawai.id_tunjangan', 'tunjangan.id')
        qbTP.where('tunjangan_pegawai.id_pegawai')
        qbTP.column('tunjangan.id')
        qbTP.column('tunjangan.nama_tunjangan')
        qbTP.column('tunjangan.ptkp')
        qbTP.column('tunjangan_pegawai.nominal')
        const [tunjangan_pegawai]: any = await pool.query(qbTP.query(), [id]);

        const data = [
            {
                nama_tunjangan: "Basic Salary",
                ptkp: 0,
                nominal: pegawai[0].gaji_pokok
            }
        ]

        for (let tp of tunjangan_pegawai) {
            let newItem = {
                nama_tunjangan: tp.nama_tunjangan,
                ptkp: tp.ptkp,
                nominal: tp.nominal,
            }

            data.push(newItem);
        }

        return NextResponse.json(data);
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