var express = require('express')
var fs = require('fs')
var request = require('request')
var axios = require('axios')
var cheerio = require('cheerio')

var helpFuncs = require('./helpFunctions.js')

var app = express()
app.set('view engine', 'pug')

var running = false
var checkedAppartments = []
var promises = []

const SETTINGS = {
  url: 'https://wahlinfastigheter.se/lediga-objekt/lagenhet/',
  blacklist: ['Farsta', 'Vällingby', 'Hässelby', 'Barkarby', 'Ursvik', 'Märsta'],
  showBlacklisted: true,
  maxPrice: 10500,
  interval: 1 * 60 * 1000
}

const fromTime = '1030'
const toTime = '1500'
const viewedAppartments = []

const getAvailableFlats = () => {
  return axios.get(SETTINGS.url).then(function(response) {
    const $ = cheerio.load(response.data)
    const h3list = $('.subpage-content').find('h3')
    let noFlats = false
    for (var i = 0; i < h3list.length; i++) {
      noFlats = !!(
        h3list[i] &&
        h3list[i].children &&
        h3list[i].children[0] &&
        h3list[i].children[0].data ===
          'Just nu har vi tyvärr inga lediga lägenheter att förmedla här.'
      )
      console.log(
        h3list[i] && h3list[i].children && h3list[i].children[0] && h3list[i].children[0].data
      )
    }
    if (noFlats) return { available: false }

    const subpageContent = $('.fastighet')
    const appartments = []
    subpageContent.map(function(i, el) {
      if (i !== 0) {
        const appartmentInfo = $(this).find('.fastighetsinfo')[0].children[1].children[1]
          .children[0].data
        console.log({ appartmentInfo })

        const link = $(this).find('.readmore')[0].children[1].attribs.href
        console.log({ link })

        appartments.push({ info: appartmentInfo, link })
      }
    })
    console.log({ appartments })
    return { available: true, appartments }
  })
}

const findFlats = function(firstTime) {
  console.log('LOOP... ')

  if (firstTime) {
    const slackInput = {
      text: 'Flat Finder is up an running!!'
    }
    axios
      .post(
        'https://hooks.slack.com/services/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',
        slackInput
      )
      .then(function(response) {
        console.log('Slack-meddelande skickat')
      })
  }

  const now = new Date()
  const nowMinutes = now.getMinutes() > 9 ? now.getMinutes() : `0${now.getMinutes()}`
  const nowTime = `${now.getHours()}${nowMinutes}`
  let timeToHunt = nowTime >= fromTime && nowTime <= toTime
  
  if (timeToHunt) {
    console.log('GETTING APPARTMENTS... ')
  }
  
  timeToHunt &&
    getAvailableFlats()
      .then(function(res) {
        if (res.available) {
          const { appartments } = res
          appartments.forEach(flat => {
            const id = `${flat.link} - ${flat.info}`
            if (!viewedAppartments.includes(id)) {
              viewedAppartments.push(id)
              const appartment = {
                isBlacklisted: SETTINGS.blacklist.find(keyword =>
                  id.toLowerCase().includes(keyword.toLowerCase())
                ),
                link: `https://wahlinfastigheter.se/lediga-objekt/lagenhet/${flat.link}`,
                subject: 'Lägenhet ledig',
                text: `https://wahlinfastigheter.se/lediga-objekt/lagenhet/${flat.link}`,
                title: flat.info
              }
              const slackText = appartment.title
              const slackAttachments = [
                {
                  color: appartment.isBlacklisted ? '#FF3344' : '#28286D',
                  text: appartment.text,
                  title: appartment.title,
                  title_link: appartment.link
                }
              ]

              axios
                .post(
                  'https://hooks.slack.com/services/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',
                  {
                    text: slackText,
                    attachments: slackAttachments
                  }
                )
                .then(function(response) {
                  console.log('Slack-meddelande skickat')
                })
            }
          })
        }
      })
      .then(() => console.log('DONE.'))
      .catch(function(error) {
        console.log('\n\nERROR', error + '\n\n\n')

        const appartment = {
          isBlacklisted: true,
          subject: 'ERROR',
          text: 'ERROR',
          title: 'ERROR'
        }
        const slackText = '*' + appartment.subject + '*'
        const slackAttachments = [
          {
            text: appartment.text,
            color: appartment.isBlacklisted ? '#FF3344' : '#28286D',
            title: 'Länk',
            title_link: appartment.link
          }
        ]
        const slackInput = {
          text: slackText,
          attachments: slackAttachments
        }
        axios
          .post(
            'https://hooks.slack.com/services/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',
            slackInput
          )
          .then(function(response) {
            console.log('Slack-meddelande skickat')
          })
      })
}

findFlats(true)
setInterval(findFlats, SETTINGS.interval)

app.get('/', (req, res) => {
  res.send('Hellow world')
})

app.listen(8080, () => {
  console.log('Flat finding on 8080')
})
