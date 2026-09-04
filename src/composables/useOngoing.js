function monthKey(str) {
  const [y, m] = str.split("-").map(Number);
  return y * 12 + (m - 1);
}

const now = new Date();
const nowKey = monthKey(`${now.getFullYear()}-${now.getMonth() + 1}`);
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

export function isOngoing(item) {
  const start = monthKey(item.start);
  const end = item.end ? monthKey(item.end) : Infinity;
  if (nowKey < start || nowKey > end) return false;
  // endDate gives day-level precision for items that finish partway through their end month
  if (nowKey === end && item.endDate) {
    const [y, m, d] = item.endDate.split("-").map(Number);
    return today <= new Date(y, m - 1, d);
  }
  return true;
}

export function countOngoing(items) {
  return items.filter(isOngoing).length;
}
