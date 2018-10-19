module.exports = {
  checkBlacklist: function(text, blacklistedWords) {
    return blacklistedWords.some(word => {
      re = new RegExp(word, "g");
      let matches = text.match(re);
      return matches && matches.length ? true : false;
    });
  },

  doesAppartmentPassFilters: function(rent, size, maxPrice) {
    if (rent <= maxPrice) {
      if (size > 22) {
        return true;
      }
    }
    return false;
  },

  transformText: function(item) {
    let re = new RegExp(/&#xC4;/, "g");
    item.text = item.text.replace(re, "Ä");
    item.subject = item.subject.replace(re, "Ä");
    item.day = item.day.replace(re, "Ä");

    re = new RegExp(/&#xE4;/, "g");
    item.text = item.text.replace(re, "ä");
    item.subject = item.subject.replace(re, "ä");
    item.day = item.day.replace(re, "ä");

    re = new RegExp(/&#xD6;/, "g");
    item.text = item.text.replace(re, "Ö");
    item.subject = item.subject.replace(re, "Ö");
    item.day = item.day.replace(re, "Ö");

    re = new RegExp(/&#xF6;/, "g");
    item.text = item.text.replace(re, "ö");
    item.subject = item.subject.replace(re, "ö");
    item.day = item.day.replace(re, "ö");

    re = new RegExp(/&#xC5;/, "g");
    item.text = item.text.replace(re, "Å");
    item.subject = item.subject.replace(re, "Å");
    item.day = item.day.replace(re, "Å");

    re = new RegExp(/&#xE5;/, "g");
    item.text = item.text.replace(re, "å");
    item.subject = item.subject.replace(re, "å");
    item.day = item.day.replace(re, "å");

    re = new RegExp(/<br>/, "g");
    item.text = item.text.replace(re, "\n\n");
    item.subject = item.subject.replace(re, "\n\n");

    re = new RegExp(/&#xE9;/, "g");
    item.text = item.text.replace(re, "é");
    item.subject = item.subject.replace(re, "é");

    re = new RegExp(/&#x2028;/, "g");
    item.text = item.text.replace(re, "");
    item.subject = item.subject.replace(re, "");

    re = new RegExp(/&quot;/, "g");
    item.text = item.text.replace(re, '"');
    item.subject = item.subject.replace(re, '"');

    re = new RegExp(/&#xB2;/, "g");
    item.text = item.text.replace(re, "2");
    item.subject = item.subject.replace(re, "2");

    return item;
  }
};
