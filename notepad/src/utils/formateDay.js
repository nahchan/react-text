export const formateDay = () => {
  const d = new Date()
  let year = d.getFullYear()
  let mon = d.getMonth() + 1
  let day = d.getDate()
  let hour = d.getHours()
  let minute = d.getMinutes()
  const s = year + '年' + (mon < 10 ? ('0' + mon) : mon) + '月' + (day < 10 ? ('0' + day) : day)
    + "日" + hour + '时' + minute + '分'
  return s
}
console.log(formateDay(Date.now()))