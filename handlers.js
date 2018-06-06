const { getMLHSite, parseMLHSite } = require('./listMLH.js');

/**
 * @param event The AWS Lambda event passed in. Relevant queryParams are region and year
 * @return List of MLH events and a self-identifying hash of their string.
 */

exports.listMLH = async event => {
  return new Promise(resolve => {
    getMLHSite(
      event.queryStringParameters.region,
      event.queryStringParameters.year
    )
      .then(data => {
        resolve({
          body: JSON.stringify(parseMLHSite(data)),
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json'
          }
        });
      })
      .catch(err => {
        resolve({
          body: JSON.stringify(err),
          statusCode: 500,
          headers: {
            'Content-Type': 'application/json'
          }
        });
      });
  });
};
