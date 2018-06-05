const rp = require('request-promise');
const cheerio = require('cheerio');
const sha1 = require('sha1');

/**
    @param region Either NA or EU
    @param year The year that you wish to retrive the site for
    @return     A Promise containing the raw HTML contents of the site
*/
const getMLHSite = (region, year) => {
  return rp(
    `https://mlh.io/seasons/${region}-${
      year > 2000 ? year : year + 2000
    }/events`
  );
};
/**
      @param rawHtml the HTML from the MLH events site to parse
      @return     A JSON with the event name, dates and URL
  */
const parseMLHSite = rawHtml => {
  const rtn = [];
  const $ = cheerio.load(rawHtml);
  const events = $('.event-wrapper');

  events.each((index, hackathon) => {
    const outerLink = hackathon.children.filter(child => child.name === 'a')[0];

    const thisHackathon = {};
    thisHackathon.baseLink = outerLink.attribs.href;

    const hackathonData = outerLink.children.filter(child =>
      checkAttribute(child, 'class', 'inner')
    )[0];

    Array.from(hackathonData.children).forEach(element => {
      if (checkAttribute(element, 'itemprop', 'name')) {
        thisHackathon.name = element.children[0].data;
      }

      if (checkAttribute(element, 'itemprop', 'startDate')) {
        thisHackathon.start = element.attribs.content;
      }

      if (checkAttribute(element, 'itemprop', 'endDate')) {
        thisHackathon.end = element.attribs.content;
      }

      rtn.push(thisHackathon);
    });
  });
  return {
    hash: `sha1-${sha1(rtn)}`,
    data: rtn
  };
};

/**
      @description A safe method of comparing an attribute of an element to a desired value
      @param  element  The HTML element to be evaluated
      @param  attribute   The attribute of the HTML element to compare
      @param  shouldBe    What the value of that element should be
      @return A boolean if they are equal
  */
const checkAttribute = (element, attribute, shouldBe) => {
  try {
    return element.attribs[attribute] === shouldBe;
  } catch (err) {
    return false;
  }
};

module.exports = { getMLHSite, parseMLHSite };
