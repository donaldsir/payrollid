export default class QueryBuilder {
    private _column: string[] = [];
    private _innerJoin: string[] = [];
    private _leftJoin: string[] = [];
    private _where: string[] = [];
    private _whereIn: string[] = [];
    private _whereBetween: string[] = [];
    private _orderBy: string[] = [];
    private _groupBy: string[] = [];
    private _table: string = "";

    constructor(table: string) {
        this._table = table;
        this._column = [];
        this._where = [];
        this._orderBy = [];
    }

    public column(columnName: string) {
        this._column.push(columnName);
    }

    public innerJoin(tableName: string, col1: string, col2: string) {
        this._innerJoin.push(`INNER JOIN ${tableName} ON ${col1} = ${col2}`);
    }

    public leftJoin(tableName: string, col1: string, col2: string) {
        this._innerJoin.push(`LEFT JOIN ${tableName} ON ${col1} = ${col2}`);
    }

    public where(columnName: string, operand?: string, prefix?: string) {
        let pref = "";

        if (this._where.length === 0 && this._whereIn.length === 0 && this._whereBetween.length === 0) {
            pref = "WHERE";
        } else {
            pref = prefix ? prefix : "AND";
        }

        if (operand) {
            this._where.push(`${pref} ${columnName} ${operand} ?`);
        } else {
            this._where.push(`${pref} ${columnName} = ?`);
        }
    }

    public whereIn(columnName: string, numColumn: number) {
        let pref = "";

        if (this._where.length === 0 && this._whereIn.length === 0 && this._whereBetween.length === 0) {
            pref = "WHERE";
        } else {
            pref = "AND";
        }

        let values = new Array()
        for (let i = 0; i < numColumn; i++) {
            values.push('?')
        }

        this._whereIn.push(`${pref} ${columnName} IN (${values.join(',')})`)
    }

    public whereBetween(columnName: string) {
        let pref = "";

        if (this._where.length === 0 && this._whereIn.length === 0 && this._whereBetween.length === 0) {
            pref = "WHERE";
        } else {
            pref = "AND";
        }

        this._whereBetween.push(`${pref} ${columnName} BETWEEN ? AND ?`)
    }

    public orderBy(columnName: string, sort: string) {
        this._orderBy.push(`${columnName} ${sort}`);
    }

    public groupBy(columnName: string) {
        this._groupBy.push(columnName);
    }

    query(): string {
        const column: string = this._column.length ? this._column.join(", ") : "*";
        const innerJoin: string = this._innerJoin.length ? this._innerJoin.join(" ") : "";
        const leftJoin: string = this._leftJoin.length ? this._leftJoin.join(" ") : "";
        const where: string = this._where.length ? this._where.join(" ") : "";
        const whereIn: string = this._whereIn.length ? this._whereIn.join(" ") : "";
        const whereBetween: string = this._whereBetween.length ? this._whereBetween.join(" ") : "";
        const orderBy: string = this._orderBy.length ? `ORDER BY ${this._orderBy.join(", ")}` : "";
        const groupBy: string = this._groupBy.length ? `GROUP BY ${this._groupBy.join(", ")}` : "";
        let query = `SELECT ${column} FROM ${this._table} ${innerJoin} ${leftJoin} ${where} ${whereIn} ${whereBetween} ${groupBy} ${orderBy}`;
        return query.replace(/ +(?= )/g, "").trimEnd();
    }

    insert(): string {
        const column: string = this._column.length ? this._column.join(", ") : "";
        const values = new Array(this._column.length).fill("?");

        let query = `INSERT INTO ${this._table} (${column}) VALUES (${values})`;
        return query.replace(/ +(?= )/g, "").trimEnd();
    }

    update(): string {
        const where: string = this._where.length ? this._where.join(" ") : "";
        const whereIn: string = this._whereIn.length ? this._whereIn.join(" ") : "";
        const values = new Array(this._column.length).fill("?");

        let query = `UPDATE ${this._table} SET `;

        for (let i = 0; i < this._column.length; i++) {
            if (i === 0) {
                query += `${this._column[i]} = ${values[i]}`;
            } else {
                query += `, ${this._column[i]} = ${values[i]}`;
            }
        }

        query += ` ${where} ${whereIn}`;

        return query.replace(/ +(?= )/g, "").trimEnd();
    }

    delete(): string {
        const where: string = this._where.length ? this._where.join(" ") : "";
        const whereIn: string = this._whereIn.length ? this._whereIn.join(" ") : "";

        let query = `DELETE FROM ${this._table} ${where} ${whereIn}`;
        return query.replace(/ +(?= )/g, "").trimEnd();
    }
}
