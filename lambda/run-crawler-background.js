/* eslint-disable no-console */
const activeEnv = process.env.NODE_ENV || "development";
const poll = require("easy-polling");
const fetch = require("node-fetch");
const indexMedia = require("./util/indexMedia");

require("dotenv").config({
  path: `.env.${activeEnv}`,
});

const baseUrl = "https://crawler.algolia.com/api/1/";
const crawlerId = process.env.ALGOLIA_CRAWLER_ID;

const token = `Basic ${Buffer.from(
  `${process.env.ALOGLIA_CRAWLER_USER_ID}:${process.env.ALGOLIA_CRAWLER_API_KEY}`
).toString("base64")}`;

async function reindex() {
  const result = await fetch(`${baseUrl}/crawlers/${crawlerId}/reindex`, {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  return result;
}

async function checkCrawlerStatus() {
  const response = await fetch(`${baseUrl}/crawlers/${crawlerId}`, {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  console.log(response);
  return response;
}

function crawlComplete(response) {
  if (!response.running && !response.reindexing) {
    return true;
  }
  return false;
}

exports.handler = async function (event) {
  if (
    !event.queryStringParameters.key ||
    event.queryStringParameters.key !== process.env.LAMBDA_SECRET
  ) {
    throw Error("Secret key is missing or invalid");
  }

  console.log("Starting crawl on Algolia search index...");

  const response = await reindex();

  // Poll status until crawl is complete. Timeout after 5 minutes.
  console.log("Waiting for crawler to complete");
  poll(checkCrawlerStatus, crawlComplete, 3000, 60 * 5 * 1000).then(
    (pollingResponse) => {
      console.log("Crawl completed. Adding other items to index.");
      indexMedia();
    }
  );
};
