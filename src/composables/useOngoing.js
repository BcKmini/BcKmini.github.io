function monthKey(str) {
  const [y, m] = str.split("-").map(Number);
  return y * 12 + (m - 1);
}

const now = new Date();
const nowKey = monthKey(`${now.getFullYear()}-${now.getMonth() + 1}`);

export function isOngoing(item) {
  const start = monthKey(item.start);
  const end = item.end ? monthKey(item.end) : Infinity;
  return nowKey >= start && nowKey <= end;
}

export function countOngoing(items) {
  return items.filter(isOngoing).length;
}
