import { format } from "date-fns";

export function formatDate(date: string) {
    return format(date, "YYYY-MM-DD");
}
// format bdata string  form dd-mm-yyyy to yyyy-mm-dd

export function formatDateDDMMYYYY(date: string) {
    const [day, month, year] = date.split("-");
    return `${year}-${month}-${day}`;
}
