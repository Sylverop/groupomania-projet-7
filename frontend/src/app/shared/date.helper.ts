export class DateHelper {
  static isToday(date: Date) {
    let today = new Date();
    let elementDate = new Date(date);
    today.setUTCHours(0, 0, 0, 0);
    elementDate.setUTCHours(0, 0, 0, 0);
    if (elementDate < today) return false;
    else return true;
  }
}
