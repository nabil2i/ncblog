export function formatDate(commentDate: Date) {
  const now = new Date();
  const diff = now.getTime() - commentDate.getTime();

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const year = 365 * day;

  if (diff < minute) {
    return `${Math.floor(diff / 1000)}sec ago`;
  } else if (diff < hour) {
    return `${Math.floor(diff / minute)}min ago`;
  } else if (diff < day) {
    return `${Math.floor(diff / hour)}h ago`;
  } else if (diff < week) {
    return `${Math.floor(diff / day)}d ago`;
  } else if (diff < year) {
    return `${Math.floor(diff / week)}w ago`;
  } else {
    return `${Math.floor(diff / year)}y ago`;
  }
  // if (diff < minute) {
  //   return Math.floor(diff / 1000) < 2
  //     ? `${Math.floor(diff / 1000)} second ago`
  //     : `${Math.floor(diff / 1000)} seconds ago`;
  // } else if (diff < hour) {
  //   return Math.floor(diff / minute)
  //     ? `${Math.floor(diff / minute)} minute ago`
  //     : `${Math.floor(diff / minute)} minutes ago`;
  // } else if (diff < day) {
  //   return Math.floor(diff / hour) < 2
  //     ? `${Math.floor(diff / hour)} hour ago`
  //     : `${Math.floor(diff / hour)} hours ago`;
  // } else if (diff < week) {
  //   return Math.floor(diff / day) < 2
  //     ? `${Math.floor(diff / day)} day ago`
  //     : `${Math.floor(diff / day)} days ago`;
  // } else if (diff < year) {
  //   return Math.floor(diff / week) < 2
  //     ? `${Math.floor(diff / week)} week ago`
  //     : `${Math.floor(diff / week)} weeks ago`;
  // } else {
  //   return `${Math.floor(diff / year)} years ago`;
  // }
}
