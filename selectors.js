const SELECTORS = {
  details: {
    contactPerson:
      '#page > div.fullw.white-bg.subpage > div > div > div.col-xs-12.col-sm-12.col-md-8.col-lg-9.subpage-content > div > div.block.lightgrey-bg > div > div.col-xs-12.col-sm-5',
    objectNumber:
      '#page > div.fullw.white-bg.subpage > div > div > div.col-xs-12.col-sm-12.col-md-8.col-lg-9.subpage-content > div > div.block.lightgrey-bg > div > div.col-xs-12.col-sm-7 > div > div > ul > li:nth-child(2)',
    about:
      '#page > div.fullw.white-bg.subpage > div > div > div.col-xs-12.col-sm-12.col-md-8.col-lg-9.subpage-content > div > div.block.lightgrey-bg > div > div.col-xs-12.col-sm-7 > div > div > ul > li:nth-child(4)',
    room:
      '#page > div.fullw.white-bg.subpage > div > div > div.col-xs-12.col-sm-12.col-md-8.col-lg-9.subpage-content > div > div.block.lightgrey-bg > div > div.col-xs-12.col-sm-7 > div > div > ul > li:nth-child(7)',
    area:
      '#page > div.fullw.white-bg.subpage > div > div > div.col-xs-12.col-sm-12.col-md-8.col-lg-9.subpage-content > div > div.block.lightgrey-bg > div > div.col-xs-12.col-sm-7 > div > div > ul > li:nth-child(10)',
    rent:
      '#page > div.fullw.white-bg.subpage > div > div > div.col-xs-12.col-sm-12.col-md-8.col-lg-9.subpage-content > div > div.block.lightgrey-bg > div > div.col-xs-12.col-sm-7 > div > div > ul > li:nth-child(13)',
    moveIn:
      '#page > div.fullw.white-bg.subpage > div > div > div.col-xs-12.col-sm-12.col-md-8.col-lg-9.subpage-content > div > div.block.lightgrey-bg > div > div.col-xs-12.col-sm-7 > div > div > ul > li:nth-child(16)',
    type:
      '#page > div.fullw.white-bg.subpage > div > div > div.col-xs-12.col-sm-12.col-md-8.col-lg-9.subpage-content > div > div.block.lightgrey-bg > div > div.col-xs-12.col-sm-7 > div > div > ul > li:nth-child(19)'
  },
  form: {
    firstName: 'input[name="Förnamn"]',
    lastName: 'input[name="Efternamn"]',
    street: 'input[name="Gatuadress"]',
    city: 'input[name="Postort"]',
    postalCode: 'input[name="Postkod"]',
    currentLiving: 'input[name="Typ_av_boende"]',
    pno: 'input[name="Personnummer"]',
    email: 'input[name="E-post"]',
    phoneWork: 'input[name="Telefon"]',
    phoneMobile: 'input[name="Mobil"]',
    employer: 'input[name="Arbetsgivare"]',
    yearlyIncome: 'input[name="Årsinkomst"]',
    peopleInHousehold: 'select[name="Hushållet_personer"]',
    policy: 'input[id="gdpr_checkbox"]',
    submitButton: 'input[name="Submit"]'
  }
}
