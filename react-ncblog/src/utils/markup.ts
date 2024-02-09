// import cheerio from "cheerio";

export function removeHtmlMarkup(htmlString: string) {
  // return cheerio.load(htmlString).text(); 

  return htmlString.replace(/<[^>]*>/g, '');
}
