export function GetDate() {
    let date:any = new Date();
    date = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
    if(date[1] < 9)
        date[1] = '0' + date[1]
    if(date[2] < 9)
        date[2] = '0' + date[2]
    return `${date[0]}-${date[1]}-${date[2]}`;
}