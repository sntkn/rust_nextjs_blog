import dayjs from "dayjs";
export default function date(date: string) {
  return dayjs(date).format("YYYY/MM/DD HH:mm");
}
