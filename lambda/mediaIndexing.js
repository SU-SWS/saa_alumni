const config = require('./config/mediaIndexing.config')
const fetch = require('node-fetch')
const cheerio = require('cheerio')

exports.handler = async function(event, context) {
  const podcastEpisodes = await getItunesPodcasts()
  const soundcloudItems = await getSoundcloudItems()
  console.log('soundcloud', soundcloudItems)
}

async function getItunesPodcasts() {
  const podcastIds = config.itunes.podcasts
  let episodes = []
  for (podcastId of podcastIds) {
    const response = await fetch(`https://itunes.apple.com/lookup?id=${podcastId}&entity=podcastEpisode`)
    .then((res) => res.json())

    for (item of response.results) {
      if (item.kind == 'podcast-episode') {
        episodes.push({
          podcast: item.collectionName,
          title: item.trackName,
          url: item.trackViewUrl,
          image: item.artworkUrl160,
          releaseDate: item.releaseDate,
          // TODO: Standardize format with Soundcloud
          duration: item.trackTimeMillis
        })
      }
    }
  }
  return episodes
}

async function getSoundcloudItems() {
  const body = await fetch(`https://soundcloud.com/user-762914689`).then((res) => res.text())
  const $ = cheerio.load(body, {xmlMode: true, normalizeWhitespace: true})
  let items = []
  $('article[itemprop="track"]').each((i, el) => {
    const title = $('[itemprop="name"]', el).text();
    const url = 'https://soundcloud.com' + $('[itemprop="url"]', el).attr('href');
    const duration = $('[itemprop="duration"]', el).attr('content');
    const releaseDate = $('time[pubdate]', el).text()

    items.push({
      title,
      url,
      releaseDate,
      // TODO: Standardize format with iTunes.
      duration
    })
  })
  return items
}