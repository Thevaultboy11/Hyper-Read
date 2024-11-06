export const get_last_months = (date: any, option: any) => {
  const currentDate = date || new Date();
  const months = [];
  const numMonths = option === 2 ? 12 : 6;
  for (let i = 0; i < numMonths; i++) {
    let month = currentDate.getMonth() - i;
    let year = currentDate.getFullYear();
    if (month < 0) {
      month += 12;
      year -= 1;
    }
    const monthString = `${year}-${(month + 1).toString().padStart(2, "0")}`;
    months.push(monthString);
  }
  return months;
};
