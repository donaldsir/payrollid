export function formattedNumber(num: number) {
    return num.toLocaleString("id-ID"); // Format untuk Indonesia (IDR)
};

export function dateMySql(date: Date) {
    const dtDate = new Date(date);
    const dtShort = dtDate.toLocaleDateString('en-GB', { dateStyle: "short" })
    const arrDt = dtShort.split("/")

    return `${arrDt[2]}-${arrDt[1]}-${arrDt[0]}`
}