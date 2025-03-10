import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/db";
import QueryBuilder from "@/app/lib/qb";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    try {
        const qb = new QueryBuilder("pegawai");
        qb.where("id");
        const [pegawai]: any = await pool.query(qb.query(), [id]);

        const qbTP = new QueryBuilder("tunjangan_pegawai");
        qbTP.where("id_pegawai");
        const [tunjangan_pegawai]: any = await pool.query(qbTP.query(), [id]);

        return NextResponse.json({ pegawai: pegawai[0], tunjangan_pegawai: tunjangan_pegawai });
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

        const nama_pegawai = formData.get("nama_pegawai")
        const tgl_join = formData.get("tgl_join")
        const jabatan = formData.get("jabatan")
        const status = formData.get("status")
        const tanggungan = formData.get("tanggungan")
        const gaji_pokok = formData.get("gaji_pokok")
        const npwp = formData.get("npwp")

        const tunjangan_pegawai: any = formData.get("tunjangan_pegawai");
        const json_tunjangan_pegawai = JSON.parse(tunjangan_pegawai);

        const qb = new QueryBuilder("pegawai");
        qb.column('nama_pegawai')
        qb.column('tgl_join')
        qb.column('jabatan')
        qb.column('status')
        qb.column('tanggungan')
        qb.column('gaji_pokok')
        qb.column('npwp')
        qb.where("id");
        await pool.execute(qb.update(), [
            nama_pegawai,
            tgl_join,
            jabatan,
            status,
            tanggungan,
            gaji_pokok,
            npwp,
            id
        ]);

        // delete tunjangan pegawai
        const qbDelTP = new QueryBuilder("tunjangan_pegawai");
        qbDelTP.where("id_pegawai");
        await pool.execute(qbDelTP.delete(), [id]);

        // insert tunjangan pegawai
        const qbTP = new QueryBuilder('tunjangan_pegawai')
        qbTP.column('id_pegawai')
        qbTP.column('id_tunjangan')
        qbTP.column('nominal')

        for (const dt of json_tunjangan_pegawai) {
            pool.execute(qbTP.insert(),
                [
                    id,
                    dt.id_tunjangan,
                    dt.nominal
                ])
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
        const qbTP = new QueryBuilder("tunjangan_pegawai");
        qbTP.where("id_pegawai");
        await pool.execute(qbTP.delete(), [id]);

        const qb = new QueryBuilder("pegawai");
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
