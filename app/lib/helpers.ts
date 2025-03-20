export function formattedNumber(num: number) {
  return num.toLocaleString("id-ID"); // Format untuk Indonesia (IDR)
}

export function dateMySql(date: Date) {
  const dtDate = new Date(date);
  const dtShort = dtDate.toLocaleDateString("en-GB", { dateStyle: "short" });
  const arrDt = dtShort.split("/");

  return `${arrDt[2]}-${arrDt[1]}-${arrDt[0]}`;
}

export const list_bpjs_employment = [
  { id: 0, label: "None", percentage: 0 },
  { id: 1, label: "JKK 1 (0.24%)", percentage: 0.24 },
  { id: 2, label: "JKK 2 (0.54%)", percentage: 0.54 },
  { id: 3, label: "JKK 3 (0.89%)", percentage: 0.89 },
  { id: 4, label: "JKK 4 (1.27%)", percentage: 1.27 },
  { id: 5, label: "JKK 5 (1.74%)", percentage: 1.74 },
];
