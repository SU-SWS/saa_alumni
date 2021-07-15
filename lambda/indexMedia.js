/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
const fetch = require("node-fetch");
const algoliasearch = require("algoliasearch");
const xmlParser = require("xml2js").parseString;
const config = require("./config/indexMedia.config");

const client = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.ALGOLIA_WRITE_KEY
);

async function getItunesPodcasts() {
  const podcastIds = config.itunes.podcasts;
  const episodes = [];
  for (const podcastId of podcastIds) {
    const response = await fetch(
      `https://itunes.apple.com/lookup?id=${podcastId}&entity=podcastEpisode`
    ).then((res) => res.json());

    for (const item of response.results) {
      if (item.kind === "podcast-episode") {
        episodes.push({
          objectID: `itunes-${item.trackId}`,
          podcast: item.collectionName,
          title: item.trackName,
          description: item.description,
          url: item.trackViewUrl,
          image: item.artworkUrl160,
          releaseDate: item.releaseDate,
          type: "itunes-podcast-episode",
        });
      }
    }
  }
  return episodes;
}

async function getSoundcloudTracks() {
  const feeds = config.soundcloud.podcastFeeds;
  const soundcloudTracks = [];
  for (const feedUrl of feeds) {
    const body = await fetch(feedUrl).then((res) => res.text());

    xmlParser(body, (err, data) => {
      const podcastName = data.rss.channel[0].title[0];
      const image = data.rss.channel[0].image[0].url[0];

      data.rss.channel[0].item.forEach((item) => {
        const rawDate = item.pubDate[0];
        const dateObj = new Date(rawDate);
        const dateISO = dateObj.toISOString();
        soundcloudTracks.push({
          objectID: item.guid[0]._,
          podcast: podcastName,
          title: item.title[0],
          description: item.description[0],
          url: item.link[0],
          image,
          releaseDate: dateISO,
          type: "soundcloud-podcast-episode",
        });
      });
    });
  }

  return soundcloudTracks;
}

async function getYoutubeVideos() {
  const { channelId } = config.youtube;
  const videos = [];
  let pageToken = "";
  let res;
  do {
    res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?channelId=${channelId}&part=snippet&maxResults=50&pageToken=${pageToken}&key=${process.env.YOUTUBE_API_KEY}`
    ).then((result) => result.json());

    for (const item of res.items) {
      if (item.id.kind === "youtube#video") {
        videos.push({
          objectID: `youtube-${item.id.videoId}`,
          title: item.snippet.title,
          releaseDate: item.snippet.publishTime,
          description: item.snippet.description,
          // 120x90 thumbnail. 320x180 and 480x360 are also available.
          image: item.snippet.thumbnails.default.url,
          url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          type: "youtube-video",
        });
      }
    }
    pageToken = res.nextPageToken ? res.nextPageToken : "";
  } while (res.nextPageToken);

  return videos;
}

exports.handler = async (event, context) => {
  try {
    if (
      !event.queryStringParameters.key ||
      event.queryStringParameters.key !== process.env.LAMBDA_SECRET
    ) {
      throw Error("Secret key is missing or invalid");
    }

    console.log("Fetching iTunes episodes...");
    const podcastEpisodes = await getItunesPodcasts();
    console.log("Fetching Soundcloud tracks...");
    const soundcloudTracks = await getSoundcloudTracks();

    console.log("Fetching Youtube videos...");
    const youtubeVideos = await getYoutubeVideos();

    console.log("Updating alumni_media index on Algolia...");
    const index = client.initIndex("alumni_media");
    await index.saveObjects(podcastEpisodes);
    await index.saveObjects(soundcloudTracks);
    await index.saveObjects(youtubeVideos);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "alumni_media index updated",
      }),
    };
  } catch (err) {
    console.log("Media indexing failed: ", err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to update alumni_media index. Check logs for errors",
      }),
    };
  }
};
