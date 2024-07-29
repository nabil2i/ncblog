export function removeHtmlMarkup(htmlString: string) {
  // return cheerio.load(htmlString).text(); 
  return htmlString.replace(/<[^>]*>/g, '');
}


export const makeSlug = (title: string) => {
  return removeHtmlMarkup(title).split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]+/g, '');
}
