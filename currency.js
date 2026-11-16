// World Currency Converter Module (Covering All 166 World Countries & Currencies)
const CurrencyConverter = (() => {
  const API_URL = 'https://open.er-api.com/v6/latest/USD';

  // Master World Currencies Catalog (166 Countries & Territories)
  const WORLD_CURRENCIES = {
  "AED": {
    "rate": 3.6725,
    "flag": "🇦🇪",
    "name": "UAE Dirham",
    "country": "United Arab Emirates"
  },
  "AFN": {
    "rate": 65.273218,
    "flag": "🇦🇫",
    "name": "Afghan Afghani",
    "country": "Afghanistan"
  },
  "ALL": {
    "rate": 81.782882,
    "flag": "🇦🇱",
    "name": "Albanian Lek",
    "country": "Albania"
  },
  "AMD": {
    "rate": 360.536135,
    "flag": "🇦🇲",
    "name": "Armenian Dram",
    "country": "Armenia"
  },
  "ANG": {
    "rate": 1.79,
    "flag": "🇨🇼",
    "name": "Netherlands Antillean Guilder",
    "country": "Curaçao / Sint Maarten"
  },
  "AOA": {
    "rate": 927.396784,
    "flag": "🇦🇴",
    "name": "Angolan Kwanza",
    "country": "Angola"
  },
  "ARS": {
    "rate": 1547.0336,
    "flag": "🇦🇷",
    "name": "Argentine Peso",
    "country": "Argentina"
  },
  "AUD": {
    "rate": 1.475083,
    "flag": "🇦🇺",
    "name": "Australian Dollar",
    "country": "Australia"
  },
  "AWG": {
    "rate": 1.79,
    "flag": "🇦🇼",
    "name": "Aruban Florin",
    "country": "Aruba"
  },
  "AZN": {
    "rate": 1.700405,
    "flag": "🇦🇿",
    "name": "Azerbaijani Manat",
    "country": "Azerbaijan"
  },
  "BAM": {
    "rate": 1.771886,
    "flag": "🇧🇦",
    "name": "Convertible Mark",
    "country": "Bosnia & Herzegovina"
  },
  "BBD": {
    "rate": 2.0,
    "flag": "🇧🇧",
    "name": "Barbadian Dollar",
    "country": "Barbados"
  },
  "BDT": {
    "rate": 124.501956,
    "flag": "🇧🇩",
    "name": "Bangladeshi Taka",
    "country": "Bangladesh"
  },
  "BGN": {
    "rate": 1.771886,
    "flag": "🇧🇬",
    "name": "Bulgarian Lev",
    "country": "Bulgaria"
  },
  "BHD": {
    "rate": 0.376,
    "flag": "🇧🇭",
    "name": "Bahraini Dinar",
    "country": "Bahrain"
  },
  "BIF": {
    "rate": 3008.875611,
    "flag": "🇧🇮",
    "name": "Burundian Franc",
    "country": "Burundi"
  },
  "BMD": {
    "rate": 1.0,
    "flag": "🇧🇲",
    "name": "Bermudian Dollar",
    "country": "Bermuda"
  },
  "BND": {
    "rate": 1.287798,
    "flag": "🇧🇳",
    "name": "Brunei Dollar",
    "country": "Brunei"
  },
  "BOB": {
    "rate": 11.794187,
    "flag": "🇧🇴",
    "name": "Bolivian Boliviano",
    "country": "Bolivia"
  },
  "BRL": {
    "rate": 5.648277,
    "flag": "🇧🇷",
    "name": "Brazilian Real",
    "country": "Brazil"
  },
  "BSD": {
    "rate": 1.0,
    "flag": "🇧🇸",
    "name": "Bahamian Dollar",
    "country": "Bahamas"
  },
  "BTN": {
    "rate": 94.289254,
    "flag": "🇧🇹",
    "name": "Bhutanese Ngultrum",
    "country": "Bhutan"
  },
  "BWP": {
    "rate": 14.448566,
    "flag": "🇧🇼",
    "name": "Botswanan Pula",
    "country": "Botswana"
  },
  "BYN": {
    "rate": 2.994599,
    "flag": "🇧🇾",
    "name": "Belarusian Ruble",
    "country": "Belarus"
  },
  "BZD": {
    "rate": 2.0,
    "flag": "🇧🇿",
    "name": "Belize Dollar",
    "country": "Belize"
  },
  "CAD": {
    "rate": 1.426026,
    "flag": "🇨🇦",
    "name": "Canadian Dollar",
    "country": "Canada"
  },
  "CDF": {
    "rate": 2250.682264,
    "flag": "🇨🇩",
    "name": "Congolese Franc",
    "country": "DR Congo"
  },
  "CHF": {
    "rate": 0.838606,
    "flag": "🇨🇭",
    "name": "Swiss Franc",
    "country": "Switzerland"
  },
  "CLF": {
    "rate": 0.0251,
    "flag": "🇨🇱",
    "name": "Unidad de Fomento",
    "country": "Chile"
  },
  "CLP": {
    "rate": 992.125487,
    "flag": "🇨🇱",
    "name": "Chilean Peso",
    "country": "Chile"
  },
  "CNH": {
    "rate": 6.67347,
    "flag": "🇨🇳",
    "name": "Chinese Yuan (Offshore)",
    "country": "China"
  },
  "CNY": {
    "rate": 6.684938,
    "flag": "🇨🇳",
    "name": "Chinese Yuan",
    "country": "China"
  },
  "COP": {
    "rate": 3286.103569,
    "flag": "🇨🇴",
    "name": "Colombian Peso",
    "country": "Colombia"
  },
  "CRC": {
    "rate": 452.662235,
    "flag": "🇨🇷",
    "name": "Costa Rican Colón",
    "country": "Costa Rica"
  },
  "CUP": {
    "rate": 24.0,
    "flag": "🇨🇺",
    "name": "Cuban Peso",
    "country": "Cuba"
  },
  "CVE": {
    "rate": 99.894667,
    "flag": "🇨🇻",
    "name": "Cape Verdean Escudo",
    "country": "Cape Verde"
  },
  "CZK": {
    "rate": 22.089471,
    "flag": "🇨🇿",
    "name": "Czech Koruna",
    "country": "Czech Republic"
  },
  "DJF": {
    "rate": 177.721,
    "flag": "🇩🇯",
    "name": "Djiboutian Franc",
    "country": "Djibouti"
  },
  "DKK": {
    "rate": 6.764725,
    "flag": "🇩🇰",
    "name": "Danish Krone",
    "country": "Denmark"
  },
  "DOP": {
    "rate": 60.957776,
    "flag": "🇩🇴",
    "name": "Dominican Peso",
    "country": "Dominican Republic"
  },
  "DZD": {
    "rate": 136.836374,
    "flag": "🇩🇿",
    "name": "Algerian Dinar",
    "country": "Algeria"
  },
  "EGP": {
    "rate": 53.437041,
    "flag": "🇪🇬",
    "name": "Egyptian Pound",
    "country": "Egypt"
  },
  "ERN": {
    "rate": 15.0,
    "flag": "🇪🇷",
    "name": "Eritrean Nakfa",
    "country": "Eritrea"
  },
  "ETB": {
    "rate": 161.215372,
    "flag": "🇪🇹",
    "name": "Ethiopian Birr",
    "country": "Ethiopia"
  },
  "EUR": {
    "rate": 0.905954,
    "flag": "🇪🇺",
    "name": "Euro",
    "country": "European Union"
  },
  "FJD": {
    "rate": 2.26326,
    "flag": "🇫🇯",
    "name": "Fijian Dollar",
    "country": "Fiji"
  },
  "FKP": {
    "rate": 0.756419,
    "flag": "🇫🇰",
    "name": "Falkland Islands Pound",
    "country": "Falkland Islands"
  },
  "FOK": {
    "rate": 6.764718,
    "flag": "🇫🇴",
    "name": "Faroese Króna",
    "country": "Faroe Islands"
  },
  "GBP": {
    "rate": 0.756419,
    "flag": "🇬🇧",
    "name": "British Pound",
    "country": "United Kingdom"
  },
  "GEL": {
    "rate": 2.594049,
    "flag": "🇬🇪",
    "name": "Georgian Lari",
    "country": "Georgia"
  },
  "GGP": {
    "rate": 0.756419,
    "flag": "🇬🇬",
    "name": "Guernsey Pound",
    "country": "Guernsey"
  },
  "GHS": {
    "rate": 11.755865,
    "flag": "🇬🇭",
    "name": "Ghanaian Cedi",
    "country": "Ghana"
  },
  "GIP": {
    "rate": 0.756419,
    "flag": "🇬🇮",
    "name": "Gibraltar Pound",
    "country": "Gibraltar"
  },
  "GMD": {
    "rate": 74.816831,
    "flag": "🇬🇲",
    "name": "Gambian Dalasi",
    "country": "Gambia"
  },
  "GNF": {
    "rate": 8854.512383,
    "flag": "🇬🇳",
    "name": "Guinean Franc",
    "country": "Guinea"
  },
  "GTQ": {
    "rate": 7.658724,
    "flag": "🇬🇹",
    "name": "Guatemalan Quetzal",
    "country": "Guatemala"
  },
  "GYD": {
    "rate": 209.409371,
    "flag": "🇬🇾",
    "name": "Guyanese Dollar",
    "country": "Guyana"
  },
  "HKD": {
    "rate": 7.846025,
    "flag": "🇭🇰",
    "name": "Hong Kong Dollar",
    "country": "Hong Kong"
  },
  "HNL": {
    "rate": 26.955582,
    "flag": "🇭🇳",
    "name": "Honduran Lempira",
    "country": "Honduras"
  },
  "HRK": {
    "rate": 6.825886,
    "flag": "🇭🇷",
    "name": "Croatian Kuna",
    "country": "Croatia"
  },
  "HTG": {
    "rate": 131.153134,
    "flag": "🇭🇹",
    "name": "Haitian Gourde",
    "country": "Haiti"
  },
  "HUF": {
    "rate": 330.574421,
    "flag": "🇭🇺",
    "name": "Hungarian Forint",
    "country": "Hungary"
  },
  "IDR": {
    "rate": 18231.963325,
    "flag": "🇮🇩",
    "name": "Indonesian Rupiah",
    "country": "Indonesia"
  },
  "ILS": {
    "rate": 3.207553,
    "flag": "🇮🇱",
    "name": "Israeli New Shekel",
    "country": "Israel"
  },
  "IMP": {
    "rate": 0.756419,
    "flag": "🇮🇲",
    "name": "Manx Pound",
    "country": "Isle of Man"
  },
  "INR": {
    "rate": 94.289707,
    "flag": "🇮🇳",
    "name": "Indian Rupee",
    "country": "India"
  },
  "IQD": {
    "rate": 1514.27115,
    "flag": "🇮🇶",
    "name": "Iraqi Dinar",
    "country": "Iraq"
  },
  "IRR": {
    "rate": 1852769.267598,
    "flag": "🇮🇷",
    "name": "Iranian Rial",
    "country": "Iran"
  },
  "ISK": {
    "rate": 123.443822,
    "flag": "🇮🇸",
    "name": "Icelandic Króna",
    "country": "Iceland"
  },
  "JEP": {
    "rate": 0.756419,
    "flag": "🇯🇪",
    "name": "Jersey Pound",
    "country": "Jersey"
  },
  "JMD": {
    "rate": 158.822234,
    "flag": "🇯🇲",
    "name": "Jamaican Dollar",
    "country": "Jamaica"
  },
  "JOD": {
    "rate": 0.709,
    "flag": "🇯🇴",
    "name": "Jordanian Dinar",
    "country": "Jordan"
  },
  "JPY": {
    "rate": 159.799454,
    "flag": "🇯🇵",
    "name": "Japanese Yen",
    "country": "Japan"
  },
  "KES": {
    "rate": 129.992415,
    "flag": "🇰🇪",
    "name": "Kenyan Shilling",
    "country": "Kenya"
  },
  "KGS": {
    "rate": 87.470898,
    "flag": "🇰🇬",
    "name": "Kyrgystani Som",
    "country": "Kyrgyzstan"
  },
  "KHR": {
    "rate": 4065.494383,
    "flag": "🇰🇭",
    "name": "Cambodian Riel",
    "country": "Cambodia"
  },
  "KID": {
    "rate": 1.47508,
    "flag": "🇰🇮",
    "name": "Kiribati Dollar",
    "country": "Kiribati"
  },
  "KMF": {
    "rate": 445.698584,
    "flag": "🇰🇲",
    "name": "Comorian Franc",
    "country": "Comoros"
  },
  "KRW": {
    "rate": 1336.179911,
    "flag": "🇰🇷",
    "name": "South Korean Won",
    "country": "South Korea"
  },
  "KWD": {
    "rate": 0.311288,
    "flag": "🇰🇼",
    "name": "Kuwaiti Dinar",
    "country": "Kuwait"
  },
  "KYD": {
    "rate": 0.833333,
    "flag": "🇰🇾",
    "name": "Cayman Islands Dollar",
    "country": "Cayman Islands"
  },
  "KZT": {
    "rate": 444.996883,
    "flag": "🇰🇿",
    "name": "Kazakhstani Tenge",
    "country": "Kazakhstan"
  },
  "LAK": {
    "rate": 22400.937945,
    "flag": "🇱🇦",
    "name": "Laotian Kip",
    "country": "Laos"
  },
  "LBP": {
    "rate": 89500.0,
    "flag": "🇱🇧",
    "name": "Lebanese Pound",
    "country": "Lebanon"
  },
  "LKR": {
    "rate": 332.56566,
    "flag": "🇱🇰",
    "name": "Sri Lankan Rupee",
    "country": "Sri Lanka"
  },
  "LRD": {
    "rate": 170.803351,
    "flag": "🇱🇷",
    "name": "Liberian Dollar",
    "country": "Liberia"
  },
  "LSL": {
    "rate": 16.89775,
    "flag": "🇱🇸",
    "name": "Lesotho Loti",
    "country": "Lesotho"
  },
  "LYD": {
    "rate": 6.427682,
    "flag": "🇱🇾",
    "name": "Libyan Dinar",
    "country": "Libya"
  },
  "MAD": {
    "rate": 9.888419,
    "flag": "🇲🇦",
    "name": "Moroccan Dirham",
    "country": "Morocco"
  },
  "MDL": {
    "rate": 18.136432,
    "flag": "🇲🇩",
    "name": "Moldovan Leu",
    "country": "Moldova"
  },
  "MGA": {
    "rate": 4574.227628,
    "flag": "🇲🇬",
    "name": "Malagasy Ariary",
    "country": "Madagascar"
  },
  "MKD": {
    "rate": 54.865608,
    "flag": "🇲🇰",
    "name": "Macedonian Denar",
    "country": "North Macedonia"
  },
  "MMK": {
    "rate": 2101.377643,
    "flag": "🇲🇲",
    "name": "Myanmar Kyat",
    "country": "Myanmar"
  },
  "MNT": {
    "rate": 3615.403421,
    "flag": "🇲🇳",
    "name": "Mongolian Tugrik",
    "country": "Mongolia"
  },
  "MOP": {
    "rate": 8.081406,
    "flag": "🇲🇴",
    "name": "Macanese Pataca",
    "country": "Macau"
  },
  "MRU": {
    "rate": 40.548759,
    "flag": "🇲🇷",
    "name": "Mauritanian Ouguiya",
    "country": "Mauritania"
  },
  "MUR": {
    "rate": 47.637942,
    "flag": "🇲🇺",
    "name": "Mauritian Rupee",
    "country": "Mauritius"
  },
  "MVR": {
    "rate": 15.463778,
    "flag": "🇲🇻",
    "name": "Maldivian Rufiyaa",
    "country": "Maldives"
  },
  "MWK": {
    "rate": 1747.005601,
    "flag": "🇲🇼",
    "name": "Malawian Kwacha",
    "country": "Malawi"
  },
  "MXN": {
    "rate": 18.561557,
    "flag": "🇲🇽",
    "name": "Mexican Peso",
    "country": "Mexico"
  },
  "MYR": {
    "rate": 4.086467,
    "flag": "🇲🇾",
    "name": "Malaysian Ringgit",
    "country": "Malaysia"
  },
  "MZN": {
    "rate": 63.742058,
    "flag": "🇲🇿",
    "name": "Mozambican Metical",
    "country": "Mozambique"
  },
  "NAD": {
    "rate": 16.89775,
    "flag": "🇳🇦",
    "name": "Namibian Dollar",
    "country": "Namibia"
  },
  "NGN": {
    "rate": 1352.362126,
    "flag": "🇳🇬",
    "name": "Nigerian Naira",
    "country": "Nigeria"
  },
  "NIO": {
    "rate": 36.897272,
    "flag": "🇳🇮",
    "name": "Nicaraguan Córdoba",
    "country": "Nicaragua"
  },
  "NOK": {
    "rate": 9.566938,
    "flag": "🇳🇴",
    "name": "Norwegian Krone",
    "country": "Norway"
  },
  "NPR": {
    "rate": 150.862806,
    "flag": "🇳🇵",
    "name": "Nepalese Rupee",
    "country": "Nepal"
  },
  "NZD": {
    "rate": 1.809216,
    "flag": "🇳🇿",
    "name": "New Zealand Dollar",
    "country": "New Zealand"
  },
  "OMR": {
    "rate": 0.384497,
    "flag": "🇴🇲",
    "name": "Omani Rial",
    "country": "Oman"
  },
  "PAB": {
    "rate": 1.0,
    "flag": "🇵🇦",
    "name": "Panamanian Balboa",
    "country": "Panama"
  },
  "PEN": {
    "rate": 3.403819,
    "flag": "🇵🇪",
    "name": "Peruvian Sol",
    "country": "Peru"
  },
  "PGK": {
    "rate": 4.549114,
    "flag": "🇵🇬",
    "name": "Papua New Guinean Kina",
    "country": "Papua New Guinea"
  },
  "PHP": {
    "rate": 63.857758,
    "flag": "🇵🇭",
    "name": "Philippine Peso",
    "country": "Philippines"
  },
  "PKR": {
    "rate": 276.595456,
    "flag": "🇵🇰",
    "name": "Pakistani Rupee",
    "country": "Pakistan"
  },
  "PLN": {
    "rate": 3.989114,
    "flag": "🇵🇱",
    "name": "Polish Zloty",
    "country": "Poland"
  },
  "PYG": {
    "rate": 6204.967082,
    "flag": "🇵🇾",
    "name": "Paraguayan Guarani",
    "country": "Paraguay"
  },
  "QAR": {
    "rate": 3.64,
    "flag": "🇶🇦",
    "name": "Qatari Rial",
    "country": "Qatar"
  },
  "RON": {
    "rate": 4.834831,
    "flag": "🇷🇴",
    "name": "Romanian Leu",
    "country": "Romania"
  },
  "RSD": {
    "rate": 106.520001,
    "flag": "🇷🇸",
    "name": "Serbian Dinar",
    "country": "Serbia"
  },
  "RUB": {
    "rate": 82.504954,
    "flag": "🇷🇺",
    "name": "Russian Ruble",
    "country": "Russia"
  },
  "RWF": {
    "rate": 1479.744909,
    "flag": "🇷🇼",
    "name": "Rwandan Franc",
    "country": "Rwanda"
  },
  "SAR": {
    "rate": 3.75,
    "flag": "🇸🇦",
    "name": "Saudi Riyal",
    "country": "Saudi Arabia"
  },
  "SBD": {
    "rate": 7.985337,
    "flag": "🇸🇧",
    "name": "Solomon Islands Dollar",
    "country": "Solomon Islands"
  },
  "SCR": {
    "rate": 13.916821,
    "flag": "🇸🇨",
    "name": "Seychellois Rupee",
    "country": "Seychelles"
  },
  "SDG": {
    "rate": 480.872722,
    "flag": "🇸🇩",
    "name": "Sudanese Pound",
    "country": "Sudan"
  },
  "SEK": {
    "rate": 10.06553,
    "flag": "🇸🇪",
    "name": "Swedish Krona",
    "country": "Sweden"
  },
  "SGD": {
    "rate": 1.287798,
    "flag": "🇸🇬",
    "name": "Singapore Dollar",
    "country": "Singapore"
  },
  "SHP": {
    "rate": 0.756419,
    "flag": "🇸🇭",
    "name": "Saint Helena Pound",
    "country": "Saint Helena"
  },
  "SLE": {
    "rate": 23.06523,
    "flag": "🇸🇱",
    "name": "Sierra Leonean Leone",
    "country": "Sierra Leone"
  },
  "SLL": {
    "rate": 23065.229822,
    "flag": "🇸🇱",
    "name": "Sierra Leonean Leone",
    "country": "Sierra Leone"
  },
  "SOS": {
    "rate": 571.811558,
    "flag": "🇸🇴",
    "name": "Somali Shilling",
    "country": "Somalia"
  },
  "SRD": {
    "rate": 37.731985,
    "flag": "🇸🇷",
    "name": "Surinamese Dollar",
    "country": "Suriname"
  },
  "SSP": {
    "rate": 5751.932593,
    "flag": "🇸🇸",
    "name": "South Sudanese Pound",
    "country": "South Sudan"
  },
  "STN": {
    "rate": 22.195795,
    "flag": "🇸🇹",
    "name": "São Tomé Dobra",
    "country": "São Tomé & Príncipe"
  },
  "SYP": {
    "rate": 121.919972,
    "flag": "🇸🇾",
    "name": "Syrian Pound",
    "country": "Syria"
  },
  "SZL": {
    "rate": 16.89775,
    "flag": "🇸🇿",
    "name": "Swazi Lilangeni",
    "country": "Eswatini"
  },
  "THB": {
    "rate": 33.882849,
    "flag": "🇹🇭",
    "name": "Thai Baht",
    "country": "Thailand"
  },
  "TJS": {
    "rate": 9.208521,
    "flag": "🇹🇯",
    "name": "Tajikistani Somoni",
    "country": "Tajikistan"
  },
  "TMT": {
    "rate": 3.500345,
    "flag": "🇹🇲",
    "name": "Turkmenistani Manat",
    "country": "Turkmenistan"
  },
  "TND": {
    "rate": 3.02005,
    "flag": "🇹🇳",
    "name": "Tunisian Dinar",
    "country": "Tunisia"
  },
  "TOP": {
    "rate": 2.396452,
    "flag": "🇹🇴",
    "name": "Tongan Paʻanga",
    "country": "Tonga"
  },
  "TRY": {
    "rate": 50.369257,
    "flag": "🇹🇷",
    "name": "Turkish Lira",
    "country": "Turkey"
  },
  "TTD": {
    "rate": 6.733961,
    "flag": "🇹🇹",
    "name": "Trinidad & Tobago Dollar",
    "country": "Trinidad & Tobago"
  },
  "TVD": {
    "rate": 1.47508,
    "flag": "🇹🇻",
    "name": "Tuvaluan Dollar",
    "country": "Tuvalu"
  },
  "TWD": {
    "rate": 32.913996,
    "flag": "🇹🇼",
    "name": "New Taiwan Dollar",
    "country": "Taiwan"
  },
  "TZS": {
    "rate": 2642.092137,
    "flag": "🇹🇿",
    "name": "Tanzanian Shilling",
    "country": "Tanzania"
  },
  "UAH": {
    "rate": 45.442046,
    "flag": "🇺🇦",
    "name": "Ukrainian Hryvnia",
    "country": "Ukraine"
  },
  "UGX": {
    "rate": 4024.600571,
    "flag": "🇺🇬",
    "name": "Ugandan Shilling",
    "country": "Uganda"
  },
  "USD": {
    "rate": 1.0,
    "flag": "🇺🇸",
    "name": "US Dollar",
    "country": "United States"
  },
  "UYU": {
    "rate": 40.702627,
    "flag": "🇺🇾",
    "name": "Uruguayan Peso",
    "country": "Uruguay"
  },
  "UZS": {
    "rate": 11998.663015,
    "flag": "🇺🇿",
    "name": "Uzbekistani Som",
    "country": "Uzbekistan"
  },
  "VES": {
    "rate": 914.0218,
    "flag": "🇻🇪",
    "name": "Venezuelan Bolívar",
    "country": "Venezuela"
  },
  "VND": {
    "rate": 25735.189593,
    "flag": "🇻🇳",
    "name": "Vietnamese Dong",
    "country": "Vietnam"
  },
  "VUV": {
    "rate": 120.261451,
    "flag": "🇻🇺",
    "name": "Vanuatu Vatu",
    "country": "Vanuatu"
  },
  "WST": {
    "rate": 2.764454,
    "flag": "🇼🇸",
    "name": "Samoan Tala",
    "country": "Samoa"
  },
  "XAF": {
    "rate": 594.264779,
    "flag": "🇨🇲",
    "name": "Central African CFA Franc",
    "country": "Central Africa (CEMAC)"
  },
  "XCD": {
    "rate": 2.7,
    "flag": "🇦🇬",
    "name": "East Caribbean Dollar",
    "country": "East Caribbean"
  },
  "XCG": {
    "rate": 1.79,
    "flag": "🇨🇼",
    "name": "Caribbean Guilder",
    "country": "Curaçao & Sint Maarten"
  },
  "XDR": {
    "rate": 0.742079,
    "flag": "🌐",
    "name": "Special Drawing Rights",
    "country": "IMF"
  },
  "XOF": {
    "rate": 594.264779,
    "flag": "🇸🇳",
    "name": "West African CFA Franc",
    "country": "West Africa (UEMOA)"
  },
  "XPF": {
    "rate": 108.108923,
    "flag": "🇵🇫",
    "name": "CFP Franc",
    "country": "French Polynesia"
  },
  "YER": {
    "rate": 236.705403,
    "flag": "🇾🇪",
    "name": "Yemeni Rial",
    "country": "Yemen"
  },
  "ZAR": {
    "rate": 16.898089,
    "flag": "🇿🇦",
    "name": "South African Rand",
    "country": "South Africa"
  },
  "ZMW": {
    "rate": 20.440081,
    "flag": "🇿🇲",
    "name": "Zambian Kwacha",
    "country": "Zambia"
  },
  "ZWG": {
    "rate": 26.5861,
    "flag": "🇿🇼",
    "name": "Zimbabwe Gold",
    "country": "Zimbabwe"
  },
  "ZWL": {
    "rate": 26.5861,
    "flag": "🇿🇼",
    "name": "Zimbabwean Dollar",
    "country": "Zimbabwe"
  }
};

  // Extract fallback rates
  const FALLBACK_RATES = {};
  for (const [code, info] of Object.entries(WORLD_CURRENCIES)) {
    FALLBACK_RATES[code] = info.rate;
  }

  let rates = { ...FALLBACK_RATES };
  let lastUpdated = 'Using cached offline rates for 166 world countries';
  let isLive = false;
  let showAllCross = false;
  let crossSearchQuery = '';

  const TOP_BENCHMARKS = [
    'USD', 'EUR', 'GBP', 'JPY', 'CNY', 'INR',
    'KES', 'NGN', 'ZAR', 'GHS', 'EGP', 'TZS', 'UGX', 'ETB',
    'CAD', 'AUD', 'CHF', 'BRL', 'MXN', 'AED', 'SAR', 'QAR',
    'SGD', 'KRW', 'TRY', 'THB', 'IDR', 'PHP', 'VND', 'NZD'
  ];

  async function init() {
    renderSelects();
    renderMarquee();
    await fetchRates();
    convert();
  }

  async function fetchRates() {
    const statusEl = document.getElementById('currency-status');
    if (statusEl) statusEl.innerHTML = '<span class="loading-dot">Fetching live rates for 166 countries…</span>';
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      if (data.result === 'success' && data.rates) {
        rates = { ...FALLBACK_RATES, ...data.rates };
        const d = new Date(data.time_last_update_utc);
        lastUpdated = `166 World Currencies · Live · ${d.toLocaleDateString()} ${d.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}`;
        isLive = true;
        if (statusEl) statusEl.innerHTML = `<span class="live-badge">● LIVE</span> ${lastUpdated}`;
        renderMarquee();
      } else throw new Error('API error');
    } catch {
      isLive = false;
      if (statusEl) statusEl.innerHTML = `<span class="offline-badge">⚠ OFFLINE</span> 166 countries ready (cached rates)`;
    }
  }

  function filterSelects() {
    const q = document.getElementById('currency-search')?.value?.trim().toLowerCase() || '';
    renderSelects(q);
  }

  function renderSelects(filter = '') {
    const fromEl = document.getElementById('currency-from');
    const toEl = document.getElementById('currency-to');
    if (!fromEl || !toEl) return;

    const currentFrom = fromEl.value || 'USD';
    const currentTo = toEl.value || 'EUR';

    const entries = Object.entries(WORLD_CURRENCIES);
    const filtered = filter ? entries.filter(([code, info]) => {
      const searchStr = `${code} ${info.name} ${info.country}`.toLowerCase();
      return searchStr.includes(filter);
    }) : entries;

    const makeOptions = (selectedVal) => {
      if (filtered.length === 0) {
        return '<option value="">No matching country found</option>';
      }
      return filtered.map(([code, info]) => `
        <option value="${code}" ${code === selectedVal ? 'selected' : ''}>
          ${info.flag} ${code} — ${info.name} (${info.country})
        </option>
      `).join('');
    };

    fromEl.innerHTML = makeOptions(currentFrom);
    toEl.innerHTML = makeOptions(currentTo);

    // If filtered out, keep previous value selected if it exists
    if (!filtered.some(([c]) => c === fromEl.value) && WORLD_CURRENCIES[currentFrom]) {
      const opt = document.createElement('option');
      opt.value = currentFrom;
      opt.selected = true;
      const inf = WORLD_CURRENCIES[currentFrom];
      opt.textContent = `${inf.flag} ${currentFrom} — ${inf.name} (${inf.country})`;
      fromEl.prepend(opt);
    }

    if (!filtered.some(([c]) => c === toEl.value) && WORLD_CURRENCIES[currentTo]) {
      const opt = document.createElement('option');
      opt.value = currentTo;
      opt.selected = true;
      const inf = WORLD_CURRENCIES[currentTo];
      opt.textContent = `${inf.flag} ${currentTo} — ${inf.name} (${inf.country})`;
      toEl.prepend(opt);
    }
  }

  function convert() {
    const from = document.getElementById('currency-from')?.value;
    const to = document.getElementById('currency-to')?.value;
    const amtEl = document.getElementById('currency-amount');
    const resEl = document.getElementById('currency-result');
    const rateEl = document.getElementById('currency-rate');
    if (!from || !to || !amtEl || !resEl) return;

    const amount = parseFloat(amtEl.value) || 1;
    const rateFrom = rates[from] || 1;
    const rateTo = rates[to] || 1;
    const rate = rateTo / rateFrom;
    const result = amount * rate;

    const fromInfo = WORLD_CURRENCIES[from] || { flag: '', name: from, country: '' };
    const toInfo = WORLD_CURRENCIES[to] || { flag: '', name: to, country: '' };

    if (resEl) {
      resEl.innerHTML = `${toInfo.flag} ${formatCurrency(result, to)} <span class="curr-code-badge">${to}</span>`;
    }
    if (rateEl) {
      rateEl.textContent = `1 ${from} (${fromInfo.name}) = ${formatCurrency(rate, to)} ${to}  |  1 ${to} = ${formatCurrency(1/rate, from)} ${from}`;
    }

    renderCrossRates(from, amount);
  }

  function toggleCrossView() {
    showAllCross = !showAllCross;
    const btn = document.getElementById('cross-toggle-btn');
    if (btn) btn.textContent = showAllCross ? 'Show Major (30)' : 'Show All (166 Countries)';
    convert();
  }

  function filterCrossRates() {
    crossSearchQuery = document.getElementById('cross-search')?.value?.trim().toLowerCase() || '';
    const from = document.getElementById('currency-from')?.value || 'USD';
    const amount = parseFloat(document.getElementById('currency-amount')?.value) || 1;
    renderCrossRates(from, amount);
  }

  function renderCrossRates(from, amount) {
    const el = document.getElementById('cross-rates');
    if (!el) return;

    const fromRate = rates[from] || 1;
    const fromInfo = WORLD_CURRENCIES[from] || { flag: '', name: from, country: '' };

    let candidateCodes = showAllCross ? Object.keys(WORLD_CURRENCIES) : TOP_BENCHMARKS;
    candidateCodes = candidateCodes.filter(c => c !== from);

    if (crossSearchQuery) {
      candidateCodes = Object.keys(WORLD_CURRENCIES).filter(c => {
        if (c === from) return false;
        const inf = WORLD_CURRENCIES[c];
        const s = `${c} ${inf?.name || ''} ${inf?.country || ''}`.toLowerCase();
        return s.includes(crossSearchQuery);
      });
    }

    const titleEl = document.getElementById('cross-rates-header-title');
    if (titleEl) {
      titleEl.textContent = `World Conversions for ${fromInfo.flag} ${amount} ${from} (${candidateCodes.length} countries)`;
    }

    if (candidateCodes.length === 0) {
      el.innerHTML = '<div style="text-align:center;padding:24px;color:var(--text-dim);font-size:12px;">No matching world country found.</div>';
      return;
    }

    el.innerHTML = candidateCodes.map(c => {
      const inf = WORLD_CURRENCIES[c] || { flag: '🏳️', name: c, country: c };
      const converted = amount * (rates[c] || 1) / fromRate;
      return `
        <div class="cross-item" onclick="CurrencyConverter.selectTarget('${c}')" title="Click to set as destination currency">
          <span class="cross-flag">${inf.flag}</span>
          <div class="cross-meta">
            <span class="cross-code">${c}</span>
            <span class="cross-country">${inf.country}</span>
          </div>
          <span class="cross-name">${inf.name}</span>
          <span class="cross-val">${formatCurrency(converted, c)}</span>
        </div>`;
    }).join('');
  }

  function selectTarget(code) {
    const toEl = document.getElementById('currency-to');
    if (toEl && WORLD_CURRENCIES[code]) {
      toEl.value = code;
      convert();
      showToast(`Selected ${WORLD_CURRENCIES[code].flag} ${code} (${WORLD_CURRENCIES[code].country})`, 'info');
    }
  }

  function renderMarquee() {
    const el = document.getElementById('rate-marquee-inner');
    if (!el) return;

    // Global rotation covering Americas, Europe, Asia, Africa, Middle East, Oceania
    const marqueeCurrencies = [
      'EUR', 'GBP', 'JPY', 'CNY', 'INR', 'KES', 'NGN', 'ZAR',
      'CAD', 'AUD', 'CHF', 'BRL', 'MXN', 'AED', 'SAR', 'SGD',
      'KRW', 'EGP', 'GHS', 'TZS', 'UGX', 'TRY', 'THB', 'NZD'
    ];

    const usdRate = rates['USD'] || 1;
    el.innerHTML = marqueeCurrencies.map(c => {
      const r = (rates[c] || 1) / usdRate;
      const inf = WORLD_CURRENCIES[c] || { flag: '' };
      return `<span class="marquee-item">${inf.flag} <strong>${c}</strong>: ${r >= 100 ? r.toFixed(1) : r.toFixed(3)}</span>`;
    }).join('');
  }

  function formatCurrency(n, code) {
    if (isNaN(n)) return '0.00';
    if (Math.abs(n) >= 1000000) return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
    if (Math.abs(n) >= 100) return n.toFixed(2);
    if (Math.abs(n) >= 1) return n.toFixed(3);
    return n.toFixed(4);
  }

  function swap() {
    const f = document.getElementById('currency-from');
    const t = document.getElementById('currency-to');
    if (!f || !t) return;
    [f.value, t.value] = [t.value, f.value];
    convert();
  }

  function refresh() {
    fetchRates().then(convert);
    showToast('Refreshing live rates for 166 world currencies…', 'info');
  }

  return {
    init,
    convert,
    swap,
    refresh,
    filterSelects,
    filterCrossRates,
    toggleCrossView,
    selectTarget
  };
})();
