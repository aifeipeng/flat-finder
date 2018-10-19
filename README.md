# flat-finder

<!--
const getList = () => {
  return axios.get(settings.url).then(function(response) {
    let $ = cheerio.load(response.data);
    let list = $("#item_list")[0].children;
    for (let i = 1; i < list.length - 1; i += 2) {
      let rent = $(list[i])
        .find(".details .monthly_rent")
        .html();
      let size = $(list[i])
        .find(".details .size")
        .html();
      let datetime = $(list[i])
        .find(".jlist_date_image")
        .html()
        .trim();
      let day = datetime.split(" ")[0];
      let timestamp;
      if (
        $(list[i])
          .find(".jlist_date_image")
          .find(".list_date")
          .html() !== null
      ) {
        timestamp = $(list[i])
          .find(".jlist_date_image")
          .find(".list_date")
          .html()
          .trim();
      } else {
        timestamp = undefined;
      }

      if (rent !== null) {
        let rentArray = rent.split(" kr");
        let rentValue = rentArray[0].replace(/ /g, "");
        let link = $(list[i])
          .find(".vi-link-overlay")
          .attr("href");
        let sizeValue = size !== null ? size.split(" ")[0].replace(/ /g, "") : 100;
        if (checkedAppartments.indexOf(link) > -1) {
          // Already seen
        } else if (helpFuncs.doesAppartmentPassFilters(rentValue, sizeValue, settings.minPrice, settings.maxPrice) && timestamp) {
          let promise = axios.get(link).then(function(unitRes) {
            let apartment = getAppartment(unitRes, rentValue, link, sizeValue, day, timestamp);
            if (settings.showBlacklisted || !apartment.isBlacklisted) result.push(apartment);
            checkedAppartments.push(link);
          });
          promises.push(promise);
        }
      }
    }
  });
};

const getAppartment = function(response, rentValue, link, size, day, timestamp) {
  let $ = cheerio.load(response.data);
  let subject = $("h2")
    .html()
    .trim();
  let appartmentText = $(".object-text").html();
  let isBlacklisted = helpFuncs.checkBlacklist(subject + appartmentText, settings.blacklist);
  return {
    rent: rentValue,
    subject: subject,
    text: appartmentText,
    link: link,
    size: size,
    day: day,
    timestamp: timestamp,
    isBlacklisted: isBlacklisted
  };
}; -->
