export function dateTimeToString(dateTime: Date | null): string {
    if (!dateTime) {
        return "";
    }

    const year = dateTime.getFullYear();
    const month = leftPadNumber(dateTime.getMonth() + 1); // getMonth is 0-based
    const day = leftPadNumber(dateTime.getDate());
    const hour = leftPadNumber(dateTime.getHours());
    const minute = leftPadNumber(dateTime.getMinutes());

    return `${year}-${month}-${day}T${hour}:${minute}`;
}

function leftPadNumber(value: number): string {
    return value > 9 ? value.toString() : `0${value}`;
}
