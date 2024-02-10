export function removeHtmlMarkup(htmlString) {
  // return cheerio.load(htmlString).text(); 
  return htmlString.replace(/<[^>]*>/g, '');
}


export const makeSlug = (title) => {
  return removeHtmlMarkup(title).split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]+/g, '');
}
