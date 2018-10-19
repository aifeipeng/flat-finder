var express = require("express");
var fs = require("fs");
var request = require("request");
var axios = require("axios");
var cheerio = require("cheerio");

var helpFuncs = require("./helpFunctions.js");

var app = express();
app.set("view engine", "pug");

var running = false;
var checkedAppartments = [];
var result = [];
var promises = [];

const SETTINGS = {
  url: "https://wahlinfastigheter.se/lediga-objekt/lagenhet/",
  blacklist: ["Farsta", "Vällingby", "Hässelby", "Barkarby"],
  showBlacklisted: true,
  maxPrice: 10500,
  interval: 3 * 60 * 1000
};

const getAvailableFlats = () => {
  return axios.get(SETTINGS.url).then(function(response) {
    let $ = cheerio.load(response.data);
    let h3list = $(".subpage-content").find("h3");
    let noFlats = false;
    for (var i = 0; i < h3list.length; i++) {
      noFlats = !!(
        h3list[i] &&
        h3list[i].children &&
        h3list[i].children[0] &&
        h3list[i].children[0].data ===
          "Just nu har vi tyvärr inga lediga lägenheter att förmedla här."
      );
      console.log(
        h3list[i] && h3list[i].children && h3list[i].children[0] && h3list[i].children[0].data
      );
    }
    return !noFlats;
    // for (let i = 1; i < list.length - 1; i += 2) {
    //   let rent = $(list[i])
    //     .find(".details .monthly_rent")
    //     .html();
    //   let day = datetime.split(" ")[0];
    //
    //   if (rent !== null) {
    //     let rentArray = rent.split(" kr");
    //     let rentValue = rentArray[0].replace(/ /g, "");
    //     let link = $(list[i])
    //       .find(".vi-link-overlay")
    //       .attr("href");
    //     let sizeValue = size !== null ? size.split(" ")[0].replace(/ /g, "") : 100;
    //     if (checkedAppartments.indexOf(link) > -1) {
    //       // Already seen
    //     } else if (helpFuncs.doesAppartmentPassFilters(rentValue, sizeValue, SETTINGS.minPrice, SETTINGS.maxPrice)) {
    //       let promise = axios.get(link).then(function(unitRes) {
    //         let apartment = getAppartment(unitRes, rentValue, link, sizeValue, day);
    //         if (SETTINGS.showBlacklisted || !apartment.isBlacklisted) result.push(apartment);
    //         checkedAppartments.push(link);
    //       });
    //       promises.push(promise);
    //     }
    //   }
    // }
  });
};

// const getAppartment = function(response, rentValue, link, size, day) {
//   let $ = cheerio.load(response.data);
//   let subject = $("h2")
//     .html()
//     .trim();
//   let appartmentText = $(".object-text").html();
//   let isBlacklisted = helpFuncs.checkBlacklist(subject + appartmentText, SETTINGS.blacklist);
//   return {
//     rent: rentValue,
//     subject: subject,
//     text: appartmentText,
//     link: link,
//     size: size,
//     day: day,
//     isBlacklisted: isBlacklisted
//   };
// };

const fromTime = "1215";
const toTime = "1415";

const findFlats = function() {
  result = [];
  console.log("GET APARTMENTS... ");

  const now = new Date();
  const nowMinutes = now.getMinutes() > 9 ? now.getMinutes() : `0${now.getMinutes()}`;
  const nowTime = `${now.getHours()}${nowMinutes}`;
  let timeToHunt = nowTime >= fromTime && nowTime <= toTime;

  timeToHunt &&
    getAvailableFlats()
      .then(function(hasAppartments) {
        console.log("There are appartments available: ", hasAppartments);
        if (hasAppartments) {
          const appartment = {
            isBlacklisted: false,
            rent: 1000,
            size: 33,
            subject: "Lgh!",
            text: "There is an appartment: https://wahlinfastigheter.se/lediga-objekt/lagenhet/",
            title: "Wåhlin Lediga Lägenheter",
            title_link: "https://wahlinfastigheter.se/lediga-objekt/lagenhet/"
          };
          const slackText =
            "*" +
            appartment.subject +
            "*" +
            "\n" +
            "Hyra: " +
            appartment.rent +
            "\n" +
            "Storlek: " +
            appartment.size +
            " kvm" +
            "\n" +
            "Upplagd: " +
            appartment.day;
          const slackAttachments = [
            {
              text: appartment.text,
              color: appartment.isBlacklisted ? "#FF3344" : "#3AA3E3",
              title: "Länk",
              title_link: appartment.link
            }
          ];
          const slackInput = {
            text: slackText,
            attachments: slackAttachments,
            mrkdwn: true
          };
          axios
            .post(
              "https://hooks.slack.com/services/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",
              slackInput
            )
            .then(function(response) {
              console.log("Slack-meddelande skickat");
            });
        }
      })
      .catch(function(error) {
        console.log("\n\nERROR", error + "\n\n\n");
      });
  console.log("DONE.");
};

findFlats();
setInterval(findFlats, SETTINGS.interval);

app.get("/", function(req, res) {});
app.listen(4000);
