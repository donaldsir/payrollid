import { NextRequest, NextResponse } from 'next/server';
import pool from '@/app/lib/db';
import QueryBuilder from '@/app/lib/qb';
import { use } from "react";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    try {
        const qb = new QueryBuilder('tunjangan')
        qb.where('id')
        const [rows]: any = await pool.query(qb.query(), [id])

        return NextResponse.json(rows[0]);
    } catch (error) {
        if (typeof error === "string") {
            console.error("Error inserting data:", error.toUpperCase());
            return NextResponse.json({ error: error.toUpperCase() }, { status: 500 });
        } else if (error instanceof Error) {
            console.error("Error inserting data:", error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }
}

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    try {

        const formData = await req.formData(); // Ambil FormData dari request

        const nama_tunjangan = formData.get("nama_tunjangan") as string;
        const keterangan = formData.get("keterangan") as string;
        const aktif = formData.get("aktif") as string;

        const qb = new QueryBuilder('tunjangan')
        qb.column('nama_tunjangan')
        qb.column('keterangan')
        qb.column('aktif')
        qb.where('id')
        await pool.execute(qb.update(), [nama_tunjangan, keterangan, aktif, id])

        return NextResponse.json({ message: "Updated successfully", success: true });
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

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;

    try {
        const qb = new QueryBuilder('tunjangan')
        qb.where('id')
        await pool.execute(qb.delete(), [id])

        return NextResponse.json({ message: "Deleted successfully", success: true });
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