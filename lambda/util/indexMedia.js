/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
const fetch = require("node-fetch");
const algoliasearch = require("algoliasearch");
const xmlParser = require("xml2js").parseString;
const config = require("../config/indexMedia.config");

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
          domain: "podcasts.apple.com",
          siteName: "Apple Podcasts",
          podcast: item.collectionName,
          title: item.trackName,
          body: item.description,
          url: item.trackViewUrl,
          image: item.artworkUrl160,
          releaseDate: item.releaseDate,
          fileType: "audio",
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
          domain: "soundcloud.com",
          siteName: "SoundCloud",
          podcast: podcastName,
          title: item.title[0],
          body: item.description[0],
          url: item.link[0],
          image,
          releaseDate: dateISO,
          fileType: "audio",
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
          domain: "www.youtube.com",
          siteName: "YouTube",
          title: item.snippet.title,
          releaseDate: item.snippet.publishTime,
          body: item.snippet.description,
          // 120x90 thumbnail. 320x180 and 480x360 are also available.
          image: item.snippet.thumbnails.default.url,
          url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          fileType: "video",
        });
      }
    }
    pageToken = res.nextPageToken ? res.nextPageToken : "";
  } while (res.nextPageToken);

  return videos;
}

module.exports = async () => {
  try {
    console.log("Fetching iTunes episodes...");
    const podcastEpisodes = await getItunesPodcasts();
    console.log("Fetching Soundcloud tracks...");
    const soundcloudTracks = await getSoundcloudTracks();

    console.log("Fetching Youtube videos...");
    const youtubeVideos = await getYoutubeVideos();

    console.log("Updating media items to index on Algolia...");
    const index = client.initIndex("crawler_federated-search");
    await index.saveObjects(podcastEpisodes);
    await index.saveObjects(soundcloudTracks);
    await index.saveObjects(youtubeVideos);

    console.log("Media items added to index!");
  } catch (err) {
    console.error("Media indexing failed: ", err);
  }
};
