export function ellipseAddress(
  address: string = "",
  width: number = 4
): string {
  return `xdc${address.slice(2, width + 2)}...${address.slice(-width)}`;
}

export function toHHMMSS(secs) {
  var sec_num = parseInt(secs, 10);
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor(sec_num / 60) % 60;
  var seconds = sec_num % 60;

  return [hours, minutes, seconds].map((v) => (v < 10 ? "0" + v : v)).join(":");
}

export function getPercentage(num, total) {
  return ((num / total) * 100).toFixed(0);
}
