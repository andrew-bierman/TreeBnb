export const convertISODateToUTC = (date) => {
    const newDate = new Date(date);
    const utcOffset = newDate.getTimezoneOffset();
    newDate.setMinutes(newDate.getMinutes() + utcOffset);
    return `${newDate.getMonth() + 1} / ${newDate.getDate()} / ${newDate.getFullYear()}`
}

