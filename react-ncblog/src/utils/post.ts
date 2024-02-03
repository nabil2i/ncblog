export function readingTime(content: string, wordsPerMinute = 200) {
  const wordCount = content.split(/\s+/).length;
  const minutes = wordCount / wordsPerMinute;

  // console.log(minutes)
  if (minutes < 1) {
    return `Less than 1 min`;
  } else {
    return `${Math.ceil(minutes)} mins`;
  }
}
