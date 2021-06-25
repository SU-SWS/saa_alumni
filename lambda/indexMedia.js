const config = require('./config/indexMedia.config')
const fetch = require('node-fetch')
const cheerio = require('cheerio')
const algoliasearch = require('algoliasearch')
const crypto = require('crypto');
const client = algoliasearch(process.env.GATSBY_ALGOLIA_APP_ID, process.env.ALGOLIA_WRITE_KEY)

exports.handler = async(event, context) => {
  try {
    if (!event.queryStringParameters.key || event.queryStringParameters.key !== process.env.LAMBDA_SECRET) {
      throw 'Secret key is missing or invalid'
    }
    
    console.log('Fetching iTunes episodes...')
    const podcastEpisodes = await getItunesPodcasts()
    console.log('Fetching Soundcloud tracks...')
    const soundcloudTracks = await getSoundcloudTracks()
    console.log('Fetching Youtube videos...')
    const youtubeVideos = await getYoutubeVideos()

    console.log('Updating alumni_media index on Algolia...')
    const index = client.initIndex('alumni_media')
    await index.saveObjects(podcastEpisodes)
    await index.saveObjects(soundcloudTracks)
    await index.saveObjects(youtubeVideos)

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'alumni_media index updated'
      })
    }
  }
  catch(err) {
    console.log('Media indexing failed: ', err)
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Failed to update alumni_media index. Check logs for errors'
      })
    }
  }
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
          objectID: `itunes-${item.trackId}`,
          podcast: item.collectionName,
          title: item.trackName,
          description: item.description,
          url: item.trackViewUrl,
          image: item.artworkUrl160,
          releaseDate: item.releaseDate,
          type: 'itunes-podcast-episode'
        })
      }
    }
  }
  return episodes
}

async function getSoundcloudTracks() {
  const userId = config.soundcloud.userId
  const body = await fetch(`https://soundcloud.com/user-${userId}/tracks`).then((res) => res.text())
  const $ = cheerio.load(body, {xmlMode: true, normalizeWhitespace: true})
  let items = []
  $('article[itemprop="track"]').each((i, el) => {
    const title = $('[itemprop="name"]', el).text();
    const url = 'https://soundcloud.com' + $('[itemprop="url"]', el).attr('href');
    const md5sum = crypto.createHash('md5')
    const hash = md5sum.update(url).digest('hex')
    const releaseDate = $('time[pubdate]', el).text()
    
    items.push({
      objectID: `soundcloud-${hash}`,
      title,
      url,
      image: config.soundcloud.defaultThumbnail,
      releaseDate,
      type: 'soundcloud-track'
    })
  })
  return items
}

async function getYoutubeVideos() {
  const channelId = config.youtube.channelId
  const videos = []
  let res
  let pageToken=''
  do {
    res = await fetch(`https://www.googleapis.com/youtube/v3/search?channelId=${channelId}&part=snippet&maxResults=50&pageToken=${pageToken}&key=${process.env.YOUTUBE_API_KEY}`).then((res) => res.json())
    console.log(res)
      
    for (item of res.items) {
      if (item.id.kind == 'youtube#video') {
        videos.push({
          objectID: `youtube-${item.id.videoId}`,
          title: item.snippet.title,
          releaseDate: item.snippet.publishTime,
          description: item.snippet.description,
          // 120x90 thumbnail. 320x180 and 480x360 are also available.
          image: item.snippet.thumbnails.default.url,
          url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          type: 'youtube-video'
        })
      }
    }
    pageToken = res.nextPageToken ? res.nextPageToken : ''
  }
  while (res.nextPageToken)

  return videos
}