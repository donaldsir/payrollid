import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/db";
import QueryBuilder from "@/app/lib/qb";

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
      console.error("Error inserting data:", error.toUpperCase());
      return NextResponse.json({ success: false, error: error.toUpperCase() }, { status: 500 });
    } else if (error instanceof Error) {
      console.error("Error inserting data:", error.message);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }
}
