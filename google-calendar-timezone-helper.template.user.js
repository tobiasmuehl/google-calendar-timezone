// ==UserScript==
// @name         Google Calendar Timezone Helper
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Add city search inputs to Google Calendar timezone dropdowns with keyboard-only fuzzy matching
// @author       You
// @match        https://calendar.google.com/*
// @grant        GM_getValue
// @grant        GM_setValue
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    // ============================================================================
    // CITY-TIMEZONE DATA
    // ============================================================================
    // NOTE: This data was auto-generated from city-timezones npm package
    // // 361 timezones, 6618 cities, 66 aliases

    const CITY_TIMEZONE_DATA = {
  "Asia/Kabul": [
    {
      "n": "Kabul",
      "c": "Afghanistan",
      "p": 3160266,
      "a": []
    },
    {
      "n": "Kandahar",
      "c": "Afghanistan",
      "p": 613871,
      "a": []
    },
    {
      "n": "Herat",
      "c": "Afghanistan",
      "p": 439232.5,
      "a": []
    },
    {
      "n": "Jalalabad",
      "c": "Afghanistan",
      "p": 401697,
      "a": []
    },
    {
      "n": "Mazar-e Sharif",
      "c": "Afghanistan",
      "p": 365432.5,
      "a": []
    },
    {
      "n": "Kondoz",
      "c": "Afghanistan",
      "p": 210855.5,
      "a": []
    },
    {
      "n": "Lashkar Gah",
      "c": "Afghanistan",
      "p": 201546,
      "a": []
    },
    {
      "n": "Meymaneh",
      "c": "Afghanistan",
      "p": 199795,
      "a": []
    },
    {
      "n": "Baghlan",
      "c": "Afghanistan",
      "p": 163598.5,
      "a": []
    },
    {
      "n": "Balkh",
      "c": "Afghanistan",
      "p": 147426,
      "a": []
    },
    {
      "n": "Ghazni",
      "c": "Afghanistan",
      "p": 129892.5,
      "a": []
    },
    {
      "n": "Gardiz",
      "c": "Afghanistan",
      "p": 82680.5,
      "a": []
    },
    {
      "n": "Sheberghan",
      "c": "Afghanistan",
      "p": 74441,
      "a": []
    },
    {
      "n": "Taloqan",
      "c": "Afghanistan",
      "p": 64256,
      "a": []
    },
    {
      "n": "Bamian",
      "c": "Afghanistan",
      "p": 61863,
      "a": []
    },
    {
      "n": "Farah",
      "c": "Afghanistan",
      "p": 58604,
      "a": []
    },
    {
      "n": "Charikar",
      "c": "Afghanistan",
      "p": 53676,
      "a": []
    },
    {
      "n": "Feyzabad",
      "c": "Afghanistan",
      "p": 52490,
      "a": []
    },
    {
      "n": "Andkhvoy",
      "c": "Afghanistan",
      "p": 50469,
      "a": []
    },
    {
      "n": "Zaranj",
      "c": "Afghanistan",
      "p": 49851,
      "a": []
    },
    {
      "n": "Asadabad",
      "c": "Afghanistan",
      "p": 48400,
      "a": []
    },
    {
      "n": "Pol-e Khomri",
      "c": "Afghanistan",
      "p": 41029,
      "a": []
    },
    {
      "n": "Mayda Shahr",
      "c": "Afghanistan",
      "p": 35008,
      "a": []
    },
    {
      "n": "Aybak",
      "c": "Afghanistan",
      "p": 24000,
      "a": []
    },
    {
      "n": "Baraki Barak",
      "c": "Afghanistan",
      "p": 22305,
      "a": []
    },
    {
      "n": "Mehtar Lam",
      "c": "Afghanistan",
      "p": 17345,
      "a": []
    },
    {
      "n": "Chaghcharan",
      "c": "Afghanistan",
      "p": 15000,
      "a": []
    },
    {
      "n": "Karokh",
      "c": "Afghanistan",
      "p": 14388.5,
      "a": []
    },
    {
      "n": "Zareh Sharan",
      "c": "Afghanistan",
      "p": 13737,
      "a": []
    },
    {
      "n": "Qalat",
      "c": "Afghanistan",
      "p": 12191,
      "a": []
    },
    {
      "n": "Tarin Kowt",
      "c": "Afghanistan",
      "p": 10000,
      "a": []
    },
    {
      "n": "Mahmud-E Eraqi",
      "c": "Afghanistan",
      "p": 7407,
      "a": []
    },
    {
      "n": "Qal eh-ye Now",
      "c": "Afghanistan",
      "p": 2997,
      "a": []
    }
  ],
  "Europe/Mariehamn": [
    {
      "n": "Mariehamn",
      "c": "Aland",
      "p": 10682,
      "a": []
    }
  ],
  "Europe/Tirane": [
    {
      "n": "Tirana",
      "c": "Albania",
      "p": 658318,
      "a": []
    },
    {
      "n": "Elbasan",
      "c": "Albania",
      "p": 132956.5,
      "a": []
    },
    {
      "n": "Durres",
      "c": "Albania",
      "p": 132233,
      "a": []
    },
    {
      "n": "Shkoder",
      "c": "Albania",
      "p": 122006,
      "a": []
    },
    {
      "n": "Vlore",
      "c": "Albania",
      "p": 89508.5,
      "a": []
    },
    {
      "n": "Fier",
      "c": "Albania",
      "p": 69747.5,
      "a": []
    },
    {
      "n": "Korce",
      "c": "Albania",
      "p": 58259,
      "a": []
    },
    {
      "n": "Berat",
      "c": "Albania",
      "p": 46866,
      "a": []
    },
    {
      "n": "Lushnje",
      "c": "Albania",
      "p": 41469,
      "a": []
    },
    {
      "n": "Pogradec",
      "c": "Albania",
      "p": 35000,
      "a": []
    },
    {
      "n": "Gjirokaster",
      "c": "Albania",
      "p": 23437,
      "a": []
    },
    {
      "n": "Kruje",
      "c": "Albania",
      "p": 21286,
      "a": []
    },
    {
      "n": "Lezhe",
      "c": "Albania",
      "p": 18695,
      "a": []
    },
    {
      "n": "Kukes",
      "c": "Albania",
      "p": 17832,
      "a": []
    },
    {
      "n": "Burrel",
      "c": "Albania",
      "p": 15405,
      "a": []
    },
    {
      "n": "Sarande",
      "c": "Albania",
      "p": 15147,
      "a": []
    },
    {
      "n": "Peshkopi",
      "c": "Albania",
      "p": 14848,
      "a": []
    },
    {
      "n": "Corovode",
      "c": "Albania",
      "p": 14046,
      "a": []
    },
    {
      "n": "Librazhd",
      "c": "Albania",
      "p": 12691,
      "a": []
    },
    {
      "n": "Tepelene",
      "c": "Albania",
      "p": 11955,
      "a": []
    },
    {
      "n": "Gramsh",
      "c": "Albania",
      "p": 11556,
      "a": []
    },
    {
      "n": "Permet",
      "c": "Albania",
      "p": 10686,
      "a": []
    },
    {
      "n": "Rreshen",
      "c": "Albania",
      "p": 10064,
      "a": []
    },
    {
      "n": "Bajram Curri",
      "c": "Albania",
      "p": 7967,
      "a": []
    },
    {
      "n": "Erseke",
      "c": "Albania",
      "p": 7890,
      "a": []
    },
    {
      "n": "Puke",
      "c": "Albania",
      "p": 6495,
      "a": []
    }
  ],
  "Africa/Algiers": [
    {
      "n": "Algiers",
      "c": "Algeria",
      "p": 2665831.5,
      "a": []
    },
    {
      "n": "Oran",
      "c": "Algeria",
      "p": 721992,
      "a": []
    },
    {
      "n": "Constantine",
      "c": "Algeria",
      "p": 527638,
      "a": []
    },
    {
      "n": "Chlef",
      "c": "Algeria",
      "p": 449167,
      "a": []
    },
    {
      "n": "Arak",
      "c": "Algeria",
      "p": 423251,
      "a": []
    },
    {
      "n": "Blida",
      "c": "Algeria",
      "p": 388174,
      "a": []
    },
    {
      "n": "Annaba",
      "c": "Algeria",
      "p": 355047,
      "a": []
    },
    {
      "n": "Setif",
      "c": "Algeria",
      "p": 274744,
      "a": []
    },
    {
      "n": "Bejaia",
      "c": "Algeria",
      "p": 274520,
      "a": []
    },
    {
      "n": "Batna",
      "c": "Algeria",
      "p": 269467,
      "a": []
    },
    {
      "n": "Biskra",
      "c": "Algeria",
      "p": 202103,
      "a": []
    },
    {
      "n": "Sidi bel Abbes",
      "c": "Algeria",
      "p": 200186.5,
      "a": []
    },
    {
      "n": "Skikda",
      "c": "Algeria",
      "p": 193941.5,
      "a": []
    },
    {
      "n": "Tiarat",
      "c": "Algeria",
      "p": 184195,
      "a": []
    },
    {
      "n": "Tlimcen",
      "c": "Algeria",
      "p": 181059,
      "a": []
    },
    {
      "n": "El Oued",
      "c": "Algeria",
      "p": 177497,
      "a": []
    },
    {
      "n": "Ouargla",
      "c": "Algeria",
      "p": 176271,
      "a": []
    },
    {
      "n": "Tebessa",
      "c": "Algeria",
      "p": 171742,
      "a": []
    },
    {
      "n": "Djelfa",
      "c": "Algeria",
      "p": 170901,
      "a": []
    },
    {
      "n": "Mostaganem",
      "c": "Algeria",
      "p": 159177,
      "a": []
    },
    {
      "n": "Jijel",
      "c": "Algeria",
      "p": 148000,
      "a": []
    },
    {
      "n": "Medea",
      "c": "Algeria",
      "p": 145863.5,
      "a": []
    },
    {
      "n": "Tizi-Ouzou",
      "c": "Algeria",
      "p": 144000,
      "a": []
    },
    {
      "n": "Bechar",
      "c": "Algeria",
      "p": 142415.5,
      "a": []
    },
    {
      "n": "Souk Ahras",
      "c": "Algeria",
      "p": 134947,
      "a": []
    },
    {
      "n": "Saida",
      "c": "Algeria",
      "p": 134855,
      "a": []
    },
    {
      "n": "Bordj Bou Arreridj",
      "c": "Algeria",
      "p": 134500,
      "a": []
    },
    {
      "n": "Ghardaia",
      "c": "Algeria",
      "p": 125480,
      "a": []
    },
    {
      "n": "M'sila",
      "c": "Algeria",
      "p": 125000,
      "a": []
    },
    {
      "n": "Guelma",
      "c": "Algeria",
      "p": 123590,
      "a": []
    },
    {
      "n": "Bouira",
      "c": "Algeria",
      "p": 110144,
      "a": []
    },
    {
      "n": "Laghouat",
      "c": "Algeria",
      "p": 108279,
      "a": []
    },
    {
      "n": "Mascara",
      "c": "Algeria",
      "p": 108230,
      "a": []
    },
    {
      "n": "Oum el Bouaghi",
      "c": "Algeria",
      "p": 100821,
      "a": []
    },
    {
      "n": "Touggourt",
      "c": "Algeria",
      "p": 91499,
      "a": []
    },
    {
      "n": "Tamanrasset",
      "c": "Algeria",
      "p": 71808,
      "a": []
    },
    {
      "n": "El Bayadh",
      "c": "Algeria",
      "p": 67413,
      "a": []
    },
    {
      "n": "Adrar",
      "c": "Algeria",
      "p": 56910,
      "a": []
    },
    {
      "n": "Sefra",
      "c": "Algeria",
      "p": 51118,
      "a": []
    },
    {
      "n": "El Golea",
      "c": "Algeria",
      "p": 32049,
      "a": []
    },
    {
      "n": "I-n-Salah",
      "c": "Algeria",
      "p": 28632,
      "a": []
    },
    {
      "n": "Timimoun",
      "c": "Algeria",
      "p": 26568,
      "a": []
    },
    {
      "n": "Reggane",
      "c": "Algeria",
      "p": 22351.5,
      "a": []
    },
    {
      "n": "Tindouf",
      "c": "Algeria",
      "p": 18270,
      "a": []
    },
    {
      "n": "Hassi Messaoud",
      "c": "Algeria",
      "p": 18124,
      "a": []
    },
    {
      "n": "Abadla",
      "c": "Algeria",
      "p": 14364,
      "a": []
    },
    {
      "n": "Illizi",
      "c": "Algeria",
      "p": 7293,
      "a": []
    },
    {
      "n": "Beni Ounif",
      "c": "Algeria",
      "p": 5628,
      "a": []
    },
    {
      "n": "In Amguel",
      "c": "Algeria",
      "p": 3030,
      "a": []
    },
    {
      "n": "Djanet",
      "c": "Algeria",
      "p": 666,
      "a": []
    },
    {
      "n": "I-n-Amenas",
      "c": "Algeria",
      "p": 216,
      "a": []
    }
  ],
  "Pacific/Pago_Pago": [
    {
      "n": "Pago Pago",
      "c": "American Samoa",
      "p": 12038,
      "a": []
    }
  ],
  "Europe/Andorra": [
    {
      "n": "Andorra",
      "c": "Andorra",
      "p": 38127,
      "a": []
    }
  ],
  "Africa/Luanda": [
    {
      "n": "Luanda",
      "c": "Angola",
      "p": 3562086,
      "a": []
    },
    {
      "n": "Huambo",
      "c": "Angola",
      "p": 986000,
      "a": []
    },
    {
      "n": "Lobito",
      "c": "Angola",
      "p": 170733,
      "a": []
    },
    {
      "n": "Benguela",
      "c": "Angola",
      "p": 142017,
      "a": []
    },
    {
      "n": "Namibe",
      "c": "Angola",
      "p": 128130.5,
      "a": []
    },
    {
      "n": "Lubango",
      "c": "Angola",
      "p": 114086.5,
      "a": []
    },
    {
      "n": "Kuito",
      "c": "Angola",
      "p": 113955,
      "a": []
    },
    {
      "n": "Malanje",
      "c": "Angola",
      "p": 106451,
      "a": []
    },
    {
      "n": "Capenda-Camulemba",
      "c": "Angola",
      "p": 79842.5,
      "a": []
    },
    {
      "n": "Cabinda",
      "c": "Angola",
      "p": 78905.5,
      "a": []
    },
    {
      "n": "Soyo",
      "c": "Angola",
      "p": 65329,
      "a": []
    },
    {
      "n": "Uige",
      "c": "Angola",
      "p": 56787.5,
      "a": []
    },
    {
      "n": "Mbanza-Congo",
      "c": "Angola",
      "p": 42201,
      "a": []
    },
    {
      "n": "Saurimo",
      "c": "Angola",
      "p": 40907,
      "a": []
    },
    {
      "n": "Tômbua",
      "c": "Angola",
      "p": 40000,
      "a": []
    },
    {
      "n": "Mavinga",
      "c": "Angola",
      "p": 30000,
      "a": []
    },
    {
      "n": "Sumbe",
      "c": "Angola",
      "p": 29638.5,
      "a": []
    },
    {
      "n": "Lucapa",
      "c": "Angola",
      "p": 25578,
      "a": []
    },
    {
      "n": "Nzeto",
      "c": "Angola",
      "p": 19705.5,
      "a": []
    },
    {
      "n": "Camacupa",
      "c": "Angola",
      "p": 19489,
      "a": []
    },
    {
      "n": "Luena",
      "c": "Angola",
      "p": 17276.5,
      "a": []
    },
    {
      "n": "Ambriz",
      "c": "Angola",
      "p": 17000,
      "a": []
    },
    {
      "n": "Caxito",
      "c": "Angola",
      "p": 15665.5,
      "a": []
    },
    {
      "n": "Menongue",
      "c": "Angola",
      "p": 13030,
      "a": []
    },
    {
      "n": "Camabatela",
      "c": "Angola",
      "p": 12731,
      "a": []
    },
    {
      "n": "Dundo",
      "c": "Angola",
      "p": 11985,
      "a": []
    },
    {
      "n": "Waku Kungo",
      "c": "Angola",
      "p": 11519.5,
      "a": []
    },
    {
      "n": "Songo",
      "c": "Angola",
      "p": 10579,
      "a": []
    },
    {
      "n": "Luau",
      "c": "Angola",
      "p": 9964,
      "a": []
    },
    {
      "n": "Ondjiva",
      "c": "Angola",
      "p": 8748,
      "a": []
    },
    {
      "n": "Ndalatando",
      "c": "Angola",
      "p": 8144,
      "a": []
    },
    {
      "n": "Quibala",
      "c": "Angola",
      "p": 5248.5,
      "a": []
    },
    {
      "n": "Cubal",
      "c": "Angola",
      "p": 4837,
      "a": []
    },
    {
      "n": "Dondo",
      "c": "Angola",
      "p": 2353,
      "a": []
    },
    {
      "n": "Muconda",
      "c": "Angola",
      "p": 2324,
      "a": []
    },
    {
      "n": "Chibemba",
      "c": "Angola",
      "p": 1502,
      "a": []
    },
    {
      "n": "Chibia",
      "c": "Angola",
      "p": 1411,
      "a": []
    },
    {
      "n": "Cangamba",
      "c": "Angola",
      "p": 1307,
      "a": []
    },
    {
      "n": "Cacolo",
      "c": "Angola",
      "p": 984,
      "a": []
    },
    {
      "n": "Calulo",
      "c": "Angola",
      "p": 795,
      "a": []
    },
    {
      "n": "Calucinga",
      "c": "Angola",
      "p": 531,
      "a": []
    },
    {
      "n": "Chitado",
      "c": "Angola",
      "p": 468.5,
      "a": []
    },
    {
      "n": "Xangongo",
      "c": "Angola",
      "p": 447,
      "a": []
    },
    {
      "n": "Cuangar",
      "c": "Namibia",
      "p": 425,
      "a": []
    },
    {
      "n": "Cazombo",
      "c": "Angola",
      "p": 298,
      "a": []
    },
    {
      "n": "Quipungo",
      "c": "Angola",
      "p": 186,
      "a": []
    },
    {
      "n": "Luiana",
      "c": "Angola",
      "p": 150,
      "a": []
    },
    {
      "n": "Cuito Caunavale",
      "c": "Angola",
      "p": 149,
      "a": []
    },
    {
      "n": "Mucusso",
      "c": "Angola",
      "p": 100,
      "a": []
    },
    {
      "n": "Lumbala Nguimbo",
      "c": "Angola",
      "p": 25,
      "a": []
    }
  ],
  "America/Antigua": [
    {
      "n": "Saint John's",
      "c": "Antigua and Barbuda",
      "p": 29862.5,
      "a": []
    }
  ],
  "America/Argentina/Rio_Gallegos": [
    {
      "n": "Rio Gallegos",
      "c": "Argentina",
      "p": 77183,
      "a": []
    },
    {
      "n": "El Calafate",
      "c": "Argentina",
      "p": 6329,
      "a": []
    },
    {
      "n": "28 de Noviembre",
      "c": "Argentina",
      "p": 5300,
      "a": []
    },
    {
      "n": "Perito Moreno",
      "c": "Argentina",
      "p": 3766,
      "a": []
    },
    {
      "n": "Puerto Deseado",
      "c": "Argentina",
      "p": 3305,
      "a": []
    },
    {
      "n": "Gobernador Gregores",
      "c": "Argentina",
      "p": 2519,
      "a": []
    },
    {
      "n": "Puerto San Julian",
      "c": "Argentina",
      "p": 2347,
      "a": []
    },
    {
      "n": "Comondante Luis Piedrabuena",
      "c": "Argentina",
      "p": 410,
      "a": []
    }
  ],
  "America/Argentina/Catamarca": [
    {
      "n": "Catamarca",
      "c": "Argentina",
      "p": 162586,
      "a": []
    },
    {
      "n": "Trelew",
      "c": "Argentina",
      "p": 93128.5,
      "a": []
    },
    {
      "n": "Puerto Madryn",
      "c": "Argentina",
      "p": 61159,
      "a": []
    },
    {
      "n": "Rawson",
      "c": "Argentina",
      "p": 25062.5,
      "a": []
    },
    {
      "n": "Esquel",
      "c": "Argentina",
      "p": 20048,
      "a": []
    },
    {
      "n": "Frias",
      "c": "Argentina",
      "p": 13594,
      "a": []
    },
    {
      "n": "Belen",
      "c": "Argentina",
      "p": 11359,
      "a": []
    },
    {
      "n": "Sarmiento",
      "c": "Argentina",
      "p": 5185,
      "a": []
    },
    {
      "n": "El Maiten",
      "c": "Argentina",
      "p": 4269,
      "a": []
    },
    {
      "n": "Chumbicha",
      "c": "Argentina",
      "p": 2572,
      "a": []
    },
    {
      "n": "Paso Rio Mayo",
      "c": "Argentina",
      "p": 1825,
      "a": []
    },
    {
      "n": "Alto Rio Sanguer",
      "c": "Argentina",
      "p": 1548,
      "a": []
    },
    {
      "n": "Las Plumas",
      "c": "Argentina",
      "p": 605,
      "a": []
    },
    {
      "n": "Tinogasta",
      "c": "Argentina",
      "p": 587,
      "a": []
    },
    {
      "n": "Gastre",
      "c": "Argentina",
      "p": 557,
      "a": []
    },
    {
      "n": "Telsen",
      "c": "Argentina",
      "p": 493,
      "a": []
    }
  ],
  "America/Argentina/Mendoza": [
    {
      "n": "Mendoza",
      "c": "Argentina",
      "p": 827815,
      "a": []
    },
    {
      "n": "San Martin",
      "c": "Argentina",
      "p": 99974,
      "a": []
    },
    {
      "n": "San Rafael",
      "c": "Argentina",
      "p": 79523.5,
      "a": []
    },
    {
      "n": "Las Heras",
      "c": "Argentina",
      "p": 66663,
      "a": []
    },
    {
      "n": "Tunuyan",
      "c": "Argentina",
      "p": 22834,
      "a": []
    },
    {
      "n": "Malargue",
      "c": "Argentina",
      "p": 11847,
      "a": []
    },
    {
      "n": "La Paz",
      "c": "Argentina",
      "p": 4400,
      "a": []
    },
    {
      "n": "Uspallata",
      "c": "Argentina",
      "p": 2390,
      "a": []
    }
  ],
  "America/Argentina/Salta": [
    {
      "n": "Salta",
      "c": "Argentina",
      "p": 484646,
      "a": []
    },
    {
      "n": "Neuquen",
      "c": "Argentina",
      "p": 213823.5,
      "a": []
    },
    {
      "n": "Santa Rosa",
      "c": "Argentina",
      "p": 97693.5,
      "a": []
    },
    {
      "n": "San Carlos de Bariloche",
      "c": "Argentina",
      "p": 91953,
      "a": []
    },
    {
      "n": "San Ramon de la Nueva Oran",
      "c": "Argentina",
      "p": 69461.5,
      "a": []
    },
    {
      "n": "Yacuiba",
      "c": "Argentina",
      "p": 64811,
      "a": []
    },
    {
      "n": "Tartagal",
      "c": "Argentina",
      "p": 59996.5,
      "a": []
    },
    {
      "n": "Viedma",
      "c": "Argentina",
      "p": 54031,
      "a": []
    },
    {
      "n": "Cutral Co",
      "c": "Argentina",
      "p": 47597,
      "a": []
    },
    {
      "n": "General Pico",
      "c": "Argentina",
      "p": 46483,
      "a": []
    },
    {
      "n": "General Roca",
      "c": "Argentina",
      "p": 38578,
      "a": []
    },
    {
      "n": "General Guemes",
      "c": "Argentina",
      "p": 19828,
      "a": []
    },
    {
      "n": "Zapala",
      "c": "Argentina",
      "p": 19152,
      "a": []
    },
    {
      "n": "25 de Mayo",
      "c": "Argentina",
      "p": 17430,
      "a": []
    },
    {
      "n": "Joaquin V. Gonzalez",
      "c": "Argentina",
      "p": 13376,
      "a": []
    },
    {
      "n": "Rio Colorado",
      "c": "Argentina",
      "p": 11499,
      "a": []
    },
    {
      "n": "Cerrillos",
      "c": "Argentina",
      "p": 11498,
      "a": []
    },
    {
      "n": "Choele Choel",
      "c": "Argentina",
      "p": 9895.5,
      "a": []
    },
    {
      "n": "Cafayate",
      "c": "Argentina",
      "p": 9478,
      "a": []
    },
    {
      "n": "Chos Malal",
      "c": "Argentina",
      "p": 8556,
      "a": []
    },
    {
      "n": "San Antonio Oeste",
      "c": "Argentina",
      "p": 8492,
      "a": []
    },
    {
      "n": "Ingeniero Jacobacci",
      "c": "Argentina",
      "p": 5719,
      "a": []
    },
    {
      "n": "Victorica",
      "c": "Argentina",
      "p": 4458,
      "a": []
    },
    {
      "n": "San Antonio de los Cobres",
      "c": "Argentina",
      "p": 4000,
      "a": []
    },
    {
      "n": "General Conesa",
      "c": "Argentina",
      "p": 2958,
      "a": []
    },
    {
      "n": "Sierra Colorado",
      "c": "Argentina",
      "p": 1522,
      "a": []
    },
    {
      "n": "Las Lajas",
      "c": "Argentina",
      "p": 1218,
      "a": []
    },
    {
      "n": "Los Blancos",
      "c": "Argentina",
      "p": 1145,
      "a": []
    },
    {
      "n": "Comallo",
      "c": "Argentina",
      "p": 741,
      "a": []
    }
  ],
  "America/Argentina/Buenos_Aires": [
    {
      "n": "Buenos Aires",
      "c": "Argentina",
      "p": 11862073,
      "a": [
        "EZE"
      ]
    },
    {
      "n": "Mar del Plata",
      "c": "Argentina",
      "p": 554916,
      "a": []
    },
    {
      "n": "La Plata",
      "c": "Argentina",
      "p": 440388.5,
      "a": []
    },
    {
      "n": "Bahia Blanca",
      "c": "Argentina",
      "p": 279041,
      "a": []
    },
    {
      "n": "San Nicolas",
      "c": "Argentina",
      "p": 117123.5,
      "a": []
    },
    {
      "n": "Zarate",
      "c": "Argentina",
      "p": 86192,
      "a": []
    },
    {
      "n": "Tandil",
      "c": "Argentina",
      "p": 84799.5,
      "a": []
    },
    {
      "n": "Campana",
      "c": "Argentina",
      "p": 77149.5,
      "a": []
    },
    {
      "n": "Pergamino",
      "c": "Argentina",
      "p": 71448,
      "a": []
    },
    {
      "n": "Necochea",
      "c": "Argentina",
      "p": 70562,
      "a": []
    },
    {
      "n": "Lujan",
      "c": "Argentina",
      "p": 69744.5,
      "a": []
    },
    {
      "n": "Junin",
      "c": "Argentina",
      "p": 66141.5,
      "a": []
    },
    {
      "n": "Olavarria",
      "c": "Argentina",
      "p": 65059,
      "a": []
    },
    {
      "n": "Punta Alta",
      "c": "Argentina",
      "p": 55969.5,
      "a": []
    },
    {
      "n": "Mercedes",
      "c": "Argentina",
      "p": 48408.5,
      "a": []
    },
    {
      "n": "Chivilcoy",
      "c": "Argentina",
      "p": 43719,
      "a": []
    },
    {
      "n": "Azul",
      "c": "Argentina",
      "p": 43407.5,
      "a": []
    },
    {
      "n": "Tres Arroyos",
      "c": "Argentina",
      "p": 34773.5,
      "a": []
    },
    {
      "n": "Nueve de Julio",
      "c": "Argentina",
      "p": 26716,
      "a": []
    },
    {
      "n": "Chacabuco",
      "c": "Argentina",
      "p": 26645,
      "a": []
    },
    {
      "n": "Dolores",
      "c": "Argentina",
      "p": 21586.5,
      "a": []
    },
    {
      "n": "Chascomus",
      "c": "Argentina",
      "p": 21054,
      "a": []
    },
    {
      "n": "Coronel Suarez",
      "c": "Argentina",
      "p": 20713,
      "a": []
    },
    {
      "n": "Lincoln",
      "c": "Argentina",
      "p": 19924,
      "a": []
    },
    {
      "n": "Balcarce",
      "c": "Argentina",
      "p": 18967,
      "a": []
    },
    {
      "n": "Veinticinco de Mayo",
      "c": "Argentina",
      "p": 18749,
      "a": []
    },
    {
      "n": "Lobos",
      "c": "Argentina",
      "p": 18278,
      "a": []
    },
    {
      "n": "Mar de Ajo",
      "c": "Argentina",
      "p": 13610,
      "a": []
    },
    {
      "n": "Juarez",
      "c": "Argentina",
      "p": 10609,
      "a": []
    },
    {
      "n": "Carhue",
      "c": "Argentina",
      "p": 7190,
      "a": []
    },
    {
      "n": "Pedro Luro",
      "c": "Argentina",
      "p": 7100,
      "a": []
    },
    {
      "n": "Darregueira",
      "c": "Argentina",
      "p": 3412,
      "a": []
    },
    {
      "n": "Villalonga",
      "c": "Argentina",
      "p": 2838,
      "a": []
    }
  ],
  "America/Argentina/Cordoba": [
    {
      "n": "Córdoba",
      "c": "Argentina",
      "p": 1374467.5,
      "a": []
    },
    {
      "n": "Rosario",
      "c": "Argentina",
      "p": 1094784.5,
      "a": []
    },
    {
      "n": "Santa Fe",
      "c": "Argentina",
      "p": 393504,
      "a": []
    },
    {
      "n": "Resistencia",
      "c": "Argentina",
      "p": 368455.5,
      "a": []
    },
    {
      "n": "Corrientes",
      "c": "Argentina",
      "p": 339945,
      "a": []
    },
    {
      "n": "Posadas",
      "c": "Argentina",
      "p": 334589.5,
      "a": []
    },
    {
      "n": "Santiago del Estero",
      "c": "Argentina",
      "p": 317549.5,
      "a": []
    },
    {
      "n": "Parana",
      "c": "Argentina",
      "p": 226852,
      "a": []
    },
    {
      "n": "Formosa",
      "c": "Argentina",
      "p": 202272,
      "a": []
    },
    {
      "n": "Rio Cuarto",
      "c": "Argentina",
      "p": 135959.5,
      "a": []
    },
    {
      "n": "Concordia",
      "c": "Argentina",
      "p": 132760.5,
      "a": []
    },
    {
      "n": "Reconquista",
      "c": "Argentina",
      "p": 86640.5,
      "a": []
    },
    {
      "n": "Villa Maria",
      "c": "Argentina",
      "p": 76701,
      "a": []
    },
    {
      "n": "Presidencia Roque Saenz Pena",
      "c": "Argentina",
      "p": 75958,
      "a": []
    },
    {
      "n": "Goya",
      "c": "Argentina",
      "p": 71274.5,
      "a": []
    },
    {
      "n": "Rafaela",
      "c": "Argentina",
      "p": 69649,
      "a": []
    },
    {
      "n": "Villa Carlos Paz",
      "c": "Argentina",
      "p": 60256,
      "a": []
    },
    {
      "n": "Gualeguaychu",
      "c": "Argentina",
      "p": 55860.5,
      "a": []
    },
    {
      "n": "Venado Tuerto",
      "c": "Argentina",
      "p": 52079,
      "a": []
    },
    {
      "n": "Concepcion del Uruguay",
      "c": "Argentina",
      "p": 48275,
      "a": []
    },
    {
      "n": "San Francisco",
      "c": "Argentina",
      "p": 43231,
      "a": [
        "SF",
        "SFO"
      ]
    },
    {
      "n": "Rio Tercero",
      "c": "Argentina",
      "p": 38049.5,
      "a": []
    },
    {
      "n": "Alta Gracia",
      "c": "Argentina",
      "p": 30593,
      "a": []
    },
    {
      "n": "Villa Constitucion",
      "c": "Argentina",
      "p": 30282.5,
      "a": []
    },
    {
      "n": "Villa Angela",
      "c": "Argentina",
      "p": 30051,
      "a": []
    },
    {
      "n": "Bell Ville",
      "c": "Argentina",
      "p": 29605,
      "a": []
    },
    {
      "n": "Gualeguay",
      "c": "Argentina",
      "p": 25913,
      "a": []
    },
    {
      "n": "San Lorenzo",
      "c": "Argentina",
      "p": 25833.5,
      "a": []
    },
    {
      "n": "Mercedes",
      "c": "Argentina",
      "p": 22872.5,
      "a": []
    },
    {
      "n": "Victoria",
      "c": "Argentina",
      "p": 20032.5,
      "a": []
    },
    {
      "n": "Charata",
      "c": "Argentina",
      "p": 18297,
      "a": []
    },
    {
      "n": "Eldorado",
      "c": "Argentina",
      "p": 17365,
      "a": []
    },
    {
      "n": "Anatuya",
      "c": "Argentina",
      "p": 14133,
      "a": []
    },
    {
      "n": "Sunchales",
      "c": "Argentina",
      "p": 12655,
      "a": []
    },
    {
      "n": "Monte Quemado",
      "c": "Argentina",
      "p": 11387,
      "a": []
    },
    {
      "n": "Vera",
      "c": "Argentina",
      "p": 9979,
      "a": []
    },
    {
      "n": "San Justo",
      "c": "Argentina",
      "p": 9607,
      "a": []
    },
    {
      "n": "Juan Jose Castelli",
      "c": "Argentina",
      "p": 9421,
      "a": []
    },
    {
      "n": "Las Lomitas",
      "c": "Argentina",
      "p": 7683,
      "a": []
    },
    {
      "n": "Ingeniero Guillermo N. Juarez",
      "c": "Argentina",
      "p": 6453,
      "a": []
    },
    {
      "n": "Comandante Fontana",
      "c": "Argentina",
      "p": 4277,
      "a": []
    },
    {
      "n": "Pampa del Infierno",
      "c": "Argentina",
      "p": 2921,
      "a": []
    },
    {
      "n": "Villa Rumipal",
      "c": "Argentina",
      "p": 1269,
      "a": []
    }
  ],
  "America/Argentina/Jujuy": [
    {
      "n": "San Salvador de Jujuy",
      "c": "Argentina",
      "p": 258739,
      "a": []
    },
    {
      "n": "San Pedro",
      "c": "Argentina",
      "p": 55249,
      "a": []
    },
    {
      "n": "Libertador General San Martin",
      "c": "Argentina",
      "p": 47559,
      "a": []
    },
    {
      "n": "Humahuaca",
      "c": "Argentina",
      "p": 11369,
      "a": []
    },
    {
      "n": "Rinconada",
      "c": "Argentina",
      "p": 6209.5,
      "a": []
    },
    {
      "n": "Abra Pampa",
      "c": "Argentina",
      "p": 4480,
      "a": []
    },
    {
      "n": "Susques",
      "c": "Argentina",
      "p": 1093,
      "a": []
    }
  ],
  "America/Argentina/La_Rioja": [
    {
      "n": "La Rioja",
      "c": "Argentina",
      "p": 147130,
      "a": []
    },
    {
      "n": "Chamical",
      "c": "Argentina",
      "p": 8989,
      "a": []
    },
    {
      "n": "Chepes",
      "c": "Argentina",
      "p": 6020,
      "a": []
    }
  ],
  "America/Argentina/Tucuman": [
    {
      "n": "Tucumán",
      "c": "Argentina",
      "p": 678803.5,
      "a": []
    },
    {
      "n": "Trancas",
      "c": "Argentina",
      "p": 1599,
      "a": []
    }
  ],
  "America/Asuncion": [
    {
      "n": "Asuncion",
      "c": "Paraguay",
      "p": 940846.5,
      "a": []
    },
    {
      "n": "San Lorenzo",
      "c": "Paraguay",
      "p": 385532,
      "a": []
    },
    {
      "n": "Ciudad del Este",
      "c": "Paraguay",
      "p": 320872,
      "a": []
    },
    {
      "n": "Encarnacion",
      "c": "Paraguay",
      "p": 251813.5,
      "a": []
    },
    {
      "n": "Coronel Oviedo",
      "c": "Paraguay",
      "p": 69693.5,
      "a": []
    },
    {
      "n": "Pedro Juan Caballero",
      "c": "Paraguay",
      "p": 66029,
      "a": []
    },
    {
      "n": "Concepcion",
      "c": "Paraguay",
      "p": 53620.5,
      "a": []
    },
    {
      "n": "Villarrica",
      "c": "Paraguay",
      "p": 41157,
      "a": []
    },
    {
      "n": "Ita",
      "c": "Paraguay",
      "p": 29774.5,
      "a": []
    },
    {
      "n": "Pilar",
      "c": "Paraguay",
      "p": 28435,
      "a": []
    },
    {
      "n": "Ypacarai",
      "c": "Paraguay",
      "p": 23805.5,
      "a": []
    },
    {
      "n": "Caacupe",
      "c": "Paraguay",
      "p": 21696,
      "a": []
    },
    {
      "n": "Villa Hayes",
      "c": "Paraguay",
      "p": 15643,
      "a": []
    },
    {
      "n": "Paraguari",
      "c": "Paraguay",
      "p": 14480,
      "a": []
    },
    {
      "n": "Coronel Bogado",
      "c": "Paraguay",
      "p": 14297,
      "a": []
    },
    {
      "n": "Horqueta",
      "c": "Paraguay",
      "p": 13351,
      "a": []
    },
    {
      "n": "Bella Vista",
      "c": "Paraguay",
      "p": 11252.5,
      "a": []
    },
    {
      "n": "Filadelfia",
      "c": "Paraguay",
      "p": 9259,
      "a": []
    },
    {
      "n": "San Juan Bautista",
      "c": "Paraguay",
      "p": 7882,
      "a": []
    },
    {
      "n": "San Pedro",
      "c": "Paraguay",
      "p": 7351,
      "a": []
    },
    {
      "n": "Belen",
      "c": "Paraguay",
      "p": 6490,
      "a": []
    },
    {
      "n": "Doctor Pedro P. Pena",
      "c": "Argentina",
      "p": 6143,
      "a": []
    },
    {
      "n": "Caazapa",
      "c": "Paraguay",
      "p": 5504,
      "a": []
    },
    {
      "n": "Hohenau",
      "c": "Paraguay",
      "p": 5306,
      "a": []
    },
    {
      "n": "La Victoria",
      "c": "Paraguay",
      "p": 5000,
      "a": []
    },
    {
      "n": "Rosario",
      "c": "Paraguay",
      "p": 3639,
      "a": []
    },
    {
      "n": "Ygatimi",
      "c": "Paraguay",
      "p": 2809,
      "a": []
    },
    {
      "n": "Abai",
      "c": "Paraguay",
      "p": 2788.5,
      "a": []
    },
    {
      "n": "Arroyos y Esteros",
      "c": "Paraguay",
      "p": 2755,
      "a": []
    },
    {
      "n": "Fuerte Olimpo",
      "c": "Paraguay",
      "p": 2475,
      "a": []
    },
    {
      "n": "Mariscal Estigarribia",
      "c": "Paraguay",
      "p": 2250,
      "a": []
    },
    {
      "n": "Pozo Colorado",
      "c": "Paraguay",
      "p": 2135,
      "a": []
    },
    {
      "n": "Capitan Pablo Lagerenza",
      "c": "Paraguay",
      "p": 1200,
      "a": []
    },
    {
      "n": "Nacunday",
      "c": "Paraguay",
      "p": 1185,
      "a": []
    },
    {
      "n": "General Eugenio Alejandrino Garay",
      "c": "Paraguay",
      "p": 972,
      "a": []
    },
    {
      "n": "Ype Jhu",
      "c": "Paraguay",
      "p": 598,
      "a": []
    },
    {
      "n": "Puerto Pinasco",
      "c": "Paraguay",
      "p": 473.5,
      "a": []
    },
    {
      "n": "Fortin Falcon",
      "c": "Paraguay",
      "p": -99,
      "a": []
    }
  ],
  "America/Argentina/San_Juan": [
    {
      "n": "San Juan",
      "c": "Argentina",
      "p": 433892,
      "a": []
    },
    {
      "n": "Rodeo",
      "c": "Argentina",
      "p": 701,
      "a": []
    }
  ],
  "America/Argentina/San_Luis": [
    {
      "n": "San Luis",
      "c": "Argentina",
      "p": 308146,
      "a": []
    },
    {
      "n": "Mercedes",
      "c": "Argentina",
      "p": 49345,
      "a": []
    }
  ],
  "America/Argentina/Ushuaia": [
    {
      "n": "Ushuaia",
      "c": "Argentina",
      "p": 50483.5,
      "a": []
    },
    {
      "n": "Rio Grande",
      "c": "Argentina",
      "p": 31095,
      "a": []
    }
  ],
  "Asia/Yerevan": [
    {
      "n": "Yerevan",
      "c": "Armenia",
      "p": 1097742.5,
      "a": []
    },
    {
      "n": "Gyumri",
      "c": "Armenia",
      "p": 140277.5,
      "a": []
    },
    {
      "n": "Vanadzor",
      "c": "Armenia",
      "p": 89295,
      "a": []
    },
    {
      "n": "Kapan",
      "c": "Azerbaijan",
      "p": 37724,
      "a": []
    },
    {
      "n": "Gavarr",
      "c": "Armenia",
      "p": 21680,
      "a": []
    },
    {
      "n": "Artashat",
      "c": "Armenia",
      "p": 20562,
      "a": []
    },
    {
      "n": "Ashtarak",
      "c": "Armenia",
      "p": 18779,
      "a": []
    },
    {
      "n": "Ijevan",
      "c": "Armenia",
      "p": 14737,
      "a": []
    },
    {
      "n": "Yeghegnadzor",
      "c": "Armenia",
      "p": 8200,
      "a": []
    }
  ],
  "America/Aruba": [
    {
      "n": "Oranjestad",
      "c": "Aruba",
      "p": 50887.5,
      "a": []
    }
  ],
  "Australia/Sydney": [
    {
      "n": "Sydney",
      "c": "Australia",
      "p": 5230330,
      "a": [
        "SYD"
      ]
    },
    {
      "n": "Newcastle",
      "c": "Australia",
      "p": 816285.5,
      "a": []
    },
    {
      "n": "Canberra",
      "c": "Australia",
      "p": 280866,
      "a": []
    },
    {
      "n": "Wollongong",
      "c": "Australia",
      "p": 201319.5,
      "a": []
    },
    {
      "n": "Albury",
      "c": "Australia",
      "p": 68534,
      "a": []
    },
    {
      "n": "Nowra",
      "c": "Australia",
      "p": 61036.5,
      "a": []
    },
    {
      "n": "Coffs Harbour",
      "c": "Australia",
      "p": 48961,
      "a": []
    },
    {
      "n": "Wagga Wagga",
      "c": "Australia",
      "p": 45549,
      "a": []
    },
    {
      "n": "Port Macquarie",
      "c": "Australia",
      "p": 42070,
      "a": []
    },
    {
      "n": "Orange",
      "c": "Australia",
      "p": 36708,
      "a": []
    },
    {
      "n": "Tamworth",
      "c": "Australia",
      "p": 35080,
      "a": []
    },
    {
      "n": "Tweed Heads",
      "c": "Australia",
      "p": 33065,
      "a": []
    },
    {
      "n": "Queanbeyan",
      "c": "Australia",
      "p": 32408,
      "a": []
    },
    {
      "n": "Dubbo",
      "c": "Australia",
      "p": 30467.5,
      "a": []
    },
    {
      "n": "Taree",
      "c": "Australia",
      "p": 30131.5,
      "a": []
    },
    {
      "n": "Lismore",
      "c": "Australia",
      "p": 28065.5,
      "a": []
    },
    {
      "n": "Armidale",
      "c": "Australia",
      "p": 21793.5,
      "a": []
    },
    {
      "n": "Katoomba",
      "c": "Australia",
      "p": 20334.5,
      "a": []
    },
    {
      "n": "Goulburn",
      "c": "Australia",
      "p": 16444,
      "a": []
    },
    {
      "n": "Ballina",
      "c": "Australia",
      "p": 13997.5,
      "a": []
    },
    {
      "n": "Forster-Tuncurry",
      "c": "Australia",
      "p": 13275.5,
      "a": []
    },
    {
      "n": "Griffith",
      "c": "Australia",
      "p": 11664.5,
      "a": []
    },
    {
      "n": "Kempsey",
      "c": "Australia",
      "p": 10681,
      "a": []
    },
    {
      "n": "Kiama",
      "c": "Australia",
      "p": 10379,
      "a": []
    },
    {
      "n": "Lithgow",
      "c": "Australia",
      "p": 10338,
      "a": []
    },
    {
      "n": "Maitland",
      "c": "Australia",
      "p": 10026.5,
      "a": []
    },
    {
      "n": "Richmond",
      "c": "Australia",
      "p": 9720,
      "a": []
    },
    {
      "n": "Singleton",
      "c": "Australia",
      "p": 8340.5,
      "a": []
    },
    {
      "n": "Muswellbrook",
      "c": "Australia",
      "p": 8171,
      "a": []
    },
    {
      "n": "Moree",
      "c": "Australia",
      "p": 8062,
      "a": []
    },
    {
      "n": "Grafton",
      "c": "Australia",
      "p": 7871.5,
      "a": []
    },
    {
      "n": "Parkes",
      "c": "Australia",
      "p": 7160,
      "a": []
    },
    {
      "n": "Inverell",
      "c": "Australia",
      "p": 6845.5,
      "a": []
    },
    {
      "n": "Ulladulla",
      "c": "Australia",
      "p": 6811,
      "a": []
    },
    {
      "n": "Young",
      "c": "Australia",
      "p": 6422,
      "a": []
    },
    {
      "n": "Leeton",
      "c": "Australia",
      "p": 6277,
      "a": []
    },
    {
      "n": "Gunnedah",
      "c": "Australia",
      "p": 6204,
      "a": []
    },
    {
      "n": "Bathurst",
      "c": "Australia",
      "p": 6111,
      "a": []
    },
    {
      "n": "Narrabri",
      "c": "Australia",
      "p": 6105.5,
      "a": []
    },
    {
      "n": "Deniliquin",
      "c": "Australia",
      "p": 6019.5,
      "a": []
    },
    {
      "n": "Cowra",
      "c": "Australia",
      "p": 5729.5,
      "a": []
    },
    {
      "n": "Cooma",
      "c": "Australia",
      "p": 5661.5,
      "a": []
    },
    {
      "n": "Batemans Bay",
      "c": "Australia",
      "p": 5604,
      "a": []
    },
    {
      "n": "Mudgee",
      "c": "Australia",
      "p": 5391,
      "a": []
    },
    {
      "n": "Byron Bay",
      "c": "Australia",
      "p": 5244.5,
      "a": []
    },
    {
      "n": "Tumut",
      "c": "Australia",
      "p": 4873,
      "a": []
    },
    {
      "n": "Scone",
      "c": "Australia",
      "p": 4624,
      "a": []
    },
    {
      "n": "Forbes",
      "c": "Australia",
      "p": 4076.5,
      "a": []
    },
    {
      "n": "Merimbula",
      "c": "Australia",
      "p": 3607.5,
      "a": []
    },
    {
      "n": "Central Coast",
      "c": "Australia",
      "p": 3026,
      "a": []
    },
    {
      "n": "Bourke",
      "c": "Australia",
      "p": 2475,
      "a": []
    },
    {
      "n": "Yamba",
      "c": "Australia",
      "p": 1806,
      "a": []
    },
    {
      "n": "Wilcannia",
      "c": "Australia",
      "p": 442,
      "a": []
    },
    {
      "n": "Ivanhoe",
      "c": "Australia",
      "p": 265,
      "a": []
    }
  ],
  "Australia/Brisbane": [
    {
      "n": "Brisbane",
      "c": "Australia",
      "p": 1393176.5,
      "a": []
    },
    {
      "n": "Gold Coast",
      "c": "Australia",
      "p": 429954.5,
      "a": []
    },
    {
      "n": "Cairns",
      "c": "Australia",
      "p": 132107,
      "a": []
    },
    {
      "n": "Townsville",
      "c": "Australia",
      "p": 129212,
      "a": []
    },
    {
      "n": "Toowoomba",
      "c": "Australia",
      "p": 86711,
      "a": []
    },
    {
      "n": "Mackay",
      "c": "Australia",
      "p": 66053.5,
      "a": []
    },
    {
      "n": "Rockhampton",
      "c": "Australia",
      "p": 59024.5,
      "a": []
    },
    {
      "n": "Sunshine Coast",
      "c": "Australia",
      "p": 57215.5,
      "a": []
    },
    {
      "n": "Bundaberg",
      "c": "Australia",
      "p": 46062,
      "a": []
    },
    {
      "n": "Caloundra",
      "c": "Australia",
      "p": 33737,
      "a": []
    },
    {
      "n": "Gladstone",
      "c": "Australia",
      "p": 29055,
      "a": []
    },
    {
      "n": "Mount Isa",
      "c": "Australia",
      "p": 27596,
      "a": []
    },
    {
      "n": "Caboolture",
      "c": "Australia",
      "p": 26495.5,
      "a": []
    },
    {
      "n": "Hervey Bay",
      "c": "Australia",
      "p": 25114,
      "a": []
    },
    {
      "n": "Maryborough",
      "c": "Australia",
      "p": 18920.5,
      "a": []
    },
    {
      "n": "Gympie",
      "c": "Australia",
      "p": 11338,
      "a": []
    },
    {
      "n": "Bowen",
      "c": "Australia",
      "p": 10983,
      "a": []
    },
    {
      "n": "Bongaree",
      "c": "Australia",
      "p": 10327.5,
      "a": []
    },
    {
      "n": "Warwick",
      "c": "Australia",
      "p": 10024,
      "a": []
    },
    {
      "n": "Dalby",
      "c": "Australia",
      "p": 9818.5,
      "a": []
    },
    {
      "n": "Innisfail",
      "c": "Australia",
      "p": 9707,
      "a": []
    },
    {
      "n": "Charters Towers",
      "c": "Australia",
      "p": 8369.5,
      "a": []
    },
    {
      "n": "Kingaroy",
      "c": "Australia",
      "p": 7494.5,
      "a": []
    },
    {
      "n": "Emerald",
      "c": "Australia",
      "p": 7489,
      "a": []
    },
    {
      "n": "Moranbah",
      "c": "Australia",
      "p": 7357,
      "a": []
    },
    {
      "n": "Ayr",
      "c": "Australia",
      "p": 7166,
      "a": []
    },
    {
      "n": "Yeppoon",
      "c": "Australia",
      "p": 6450.5,
      "a": []
    },
    {
      "n": "Atherton",
      "c": "Australia",
      "p": 6132.5,
      "a": []
    },
    {
      "n": "Ingham",
      "c": "Australia",
      "p": 5996.5,
      "a": []
    },
    {
      "n": "Roma",
      "c": "Australia",
      "p": 4560.5,
      "a": []
    },
    {
      "n": "Biloela",
      "c": "Australia",
      "p": 4366.5,
      "a": []
    },
    {
      "n": "Goondiwindi",
      "c": "Australia",
      "p": 4251,
      "a": []
    },
    {
      "n": "Proserpine",
      "c": "Australia",
      "p": 3976,
      "a": []
    },
    {
      "n": "Longreach",
      "c": "Australia",
      "p": 2894,
      "a": []
    },
    {
      "n": "Weipa",
      "c": "Australia",
      "p": 2830,
      "a": []
    },
    {
      "n": "Port Douglas",
      "c": "Australia",
      "p": 2004.5,
      "a": []
    },
    {
      "n": "Charleville",
      "c": "Australia",
      "p": 1900,
      "a": []
    },
    {
      "n": "Cloncurry",
      "c": "Australia",
      "p": 1202,
      "a": []
    },
    {
      "n": "Winton",
      "c": "Australia",
      "p": 1157,
      "a": []
    },
    {
      "n": "Barcaldine",
      "c": "Australia",
      "p": 1068,
      "a": []
    },
    {
      "n": "Georgetown",
      "c": "Australia",
      "p": 818,
      "a": []
    },
    {
      "n": "Quilpie",
      "c": "Australia",
      "p": 560,
      "a": []
    },
    {
      "n": "Eidsvold",
      "c": "Australia",
      "p": 459,
      "a": []
    },
    {
      "n": "Hughenden",
      "c": "Australia",
      "p": 421,
      "a": []
    },
    {
      "n": "Boulia",
      "c": "Australia",
      "p": 402.5,
      "a": []
    },
    {
      "n": "Richmond",
      "c": "Australia",
      "p": 296,
      "a": []
    },
    {
      "n": "Birdsville",
      "c": "Australia",
      "p": 283,
      "a": []
    },
    {
      "n": "Theodore",
      "c": "Australia",
      "p": 246,
      "a": []
    },
    {
      "n": "Thargomindah",
      "c": "Australia",
      "p": 203,
      "a": []
    },
    {
      "n": "Camooweal",
      "c": "Australia",
      "p": 187,
      "a": []
    },
    {
      "n": "Burketown",
      "c": "Australia",
      "p": 186.5,
      "a": []
    },
    {
      "n": "Karumba",
      "c": "Australia",
      "p": 173,
      "a": []
    },
    {
      "n": "Windorah",
      "c": "Australia",
      "p": 158,
      "a": []
    },
    {
      "n": "Bedourie",
      "c": "Australia",
      "p": 142,
      "a": []
    }
  ],
  "Australia/Darwin": [
    {
      "n": "Darwin",
      "c": "Australia",
      "p": 82973,
      "a": []
    },
    {
      "n": "Alice Springs",
      "c": "Australia",
      "p": 26949,
      "a": []
    },
    {
      "n": "Katherine",
      "c": "Australia",
      "p": 8171.5,
      "a": []
    },
    {
      "n": "McMinns Lagoon",
      "c": "Australia",
      "p": 5025,
      "a": []
    },
    {
      "n": "Tennant Creek",
      "c": "Australia",
      "p": 3490.5,
      "a": []
    },
    {
      "n": "Yulara",
      "c": "Australia",
      "p": 930,
      "a": []
    },
    {
      "n": "Pine Creek",
      "c": "Australia",
      "p": 505,
      "a": []
    },
    {
      "n": "Adelaide River",
      "c": "Australia",
      "p": 237,
      "a": []
    },
    {
      "n": "Newcastle Waters",
      "c": "Australia",
      "p": 10,
      "a": []
    },
    {
      "n": "Erldunda",
      "c": "Australia",
      "p": 10,
      "a": []
    }
  ],
  "Australia/Perth": [
    {
      "n": "Perth",
      "c": "Australia",
      "p": 1206108,
      "a": []
    },
    {
      "n": "Mandurah",
      "c": "Australia",
      "p": 52866,
      "a": []
    },
    {
      "n": "Kalgoorlie",
      "c": "Australia",
      "p": 32058,
      "a": []
    },
    {
      "n": "Geraldton",
      "c": "Australia",
      "p": 27065,
      "a": []
    },
    {
      "n": "Bunbury",
      "c": "Australia",
      "p": 26683.5,
      "a": []
    },
    {
      "n": "Albany",
      "c": "Australia",
      "p": 25179,
      "a": []
    },
    {
      "n": "Kwinana",
      "c": "Australia",
      "p": 18817.5,
      "a": []
    },
    {
      "n": "Karratha",
      "c": "Australia",
      "p": 16636,
      "a": []
    },
    {
      "n": "Broome",
      "c": "Australia",
      "p": 11890.5,
      "a": []
    },
    {
      "n": "Roebourne",
      "c": "Australia",
      "p": 11281.5,
      "a": []
    },
    {
      "n": "Busselton",
      "c": "Australia",
      "p": 9595,
      "a": []
    },
    {
      "n": "Port Hedland",
      "c": "Australia",
      "p": 8997,
      "a": []
    },
    {
      "n": "Carnarvon",
      "c": "Australia",
      "p": 7392,
      "a": []
    },
    {
      "n": "Esperance",
      "c": "Australia",
      "p": 7205,
      "a": []
    },
    {
      "n": "Northam",
      "c": "Australia",
      "p": 5330,
      "a": []
    },
    {
      "n": "Kununurra",
      "c": "Australia",
      "p": 5229.5,
      "a": []
    },
    {
      "n": "Manjimup",
      "c": "Australia",
      "p": 4016.5,
      "a": []
    },
    {
      "n": "Narrogin",
      "c": "Australia",
      "p": 3995,
      "a": []
    },
    {
      "n": "Derby",
      "c": "Australia",
      "p": 3199,
      "a": []
    },
    {
      "n": "Katanning",
      "c": "Australia",
      "p": 3140,
      "a": []
    },
    {
      "n": "Newman",
      "c": "Australia",
      "p": 2678,
      "a": []
    },
    {
      "n": "Merredin",
      "c": "Australia",
      "p": 2054,
      "a": []
    },
    {
      "n": "Tom Price",
      "c": "Australia",
      "p": 1822,
      "a": []
    },
    {
      "n": "Mount Barker",
      "c": "Australia",
      "p": 1771.5,
      "a": []
    },
    {
      "n": "Kalbarri",
      "c": "Australia",
      "p": 1537,
      "a": []
    },
    {
      "n": "Gingin",
      "c": "Australia",
      "p": 1446,
      "a": []
    },
    {
      "n": "Port Denison",
      "c": "Australia",
      "p": 1213,
      "a": []
    },
    {
      "n": "Halls Creek",
      "c": "Australia",
      "p": 1209,
      "a": []
    },
    {
      "n": "Exmouth",
      "c": "Australia",
      "p": 1085,
      "a": []
    },
    {
      "n": "Wagin",
      "c": "Australia",
      "p": 1037.5,
      "a": []
    },
    {
      "n": "Norseman",
      "c": "Australia",
      "p": 1004,
      "a": []
    },
    {
      "n": "Wyndham",
      "c": "Australia",
      "p": 734.5,
      "a": []
    },
    {
      "n": "Pannawonica",
      "c": "Australia",
      "p": 686,
      "a": []
    },
    {
      "n": "Meekatharra",
      "c": "Australia",
      "p": 654,
      "a": []
    },
    {
      "n": "Ravensthorpe",
      "c": "Australia",
      "p": 639,
      "a": []
    },
    {
      "n": "Onslow",
      "c": "Australia",
      "p": 573,
      "a": []
    },
    {
      "n": "Mount Magnet",
      "c": "Australia",
      "p": 424,
      "a": []
    },
    {
      "n": "Kaltukatjara",
      "c": "Australia",
      "p": 355,
      "a": []
    },
    {
      "n": "Laverton",
      "c": "Australia",
      "p": 316,
      "a": []
    },
    {
      "n": "Morawa",
      "c": "Australia",
      "p": 259,
      "a": []
    },
    {
      "n": "Leonara",
      "c": "Australia",
      "p": 227,
      "a": []
    },
    {
      "n": "Three Springs",
      "c": "Australia",
      "p": 190,
      "a": []
    },
    {
      "n": "Southern Cross",
      "c": "Australia",
      "p": 187,
      "a": []
    }
  ],
  "Australia/Melbourne": [
    {
      "n": "Melbourne",
      "c": "Australia",
      "p": 4936000,
      "a": [
        "MEL"
      ]
    },
    {
      "n": "Cranbourne",
      "c": "Australia",
      "p": 249955,
      "a": []
    },
    {
      "n": "Geelong",
      "c": "Australia",
      "p": 149336,
      "a": []
    },
    {
      "n": "Ballarat",
      "c": "Australia",
      "p": 73404,
      "a": []
    },
    {
      "n": "Bendigo",
      "c": "Australia",
      "p": 68790,
      "a": []
    },
    {
      "n": "Shepparton",
      "c": "Australia",
      "p": 33430.5,
      "a": []
    },
    {
      "n": "Mildura",
      "c": "Australia",
      "p": 33324.5,
      "a": []
    },
    {
      "n": "Warrnambool",
      "c": "Australia",
      "p": 29882,
      "a": []
    },
    {
      "n": "Melton",
      "c": "Australia",
      "p": 29750,
      "a": []
    },
    {
      "n": "Sunbury",
      "c": "Australia",
      "p": 18677.5,
      "a": []
    },
    {
      "n": "Sale",
      "c": "Australia",
      "p": 17701.5,
      "a": []
    },
    {
      "n": "Traralgon",
      "c": "Australia",
      "p": 16982.5,
      "a": []
    },
    {
      "n": "Echuca",
      "c": "Australia",
      "p": 13460,
      "a": []
    },
    {
      "n": "Horsham",
      "c": "Australia",
      "p": 11985.5,
      "a": []
    },
    {
      "n": "Wangaratta",
      "c": "Australia",
      "p": 11369.5,
      "a": []
    },
    {
      "n": "Portland",
      "c": "Australia",
      "p": 10324.5,
      "a": [
        "PDX"
      ]
    },
    {
      "n": "Bairnsdale",
      "c": "Australia",
      "p": 9427,
      "a": []
    },
    {
      "n": "Swan Hill",
      "c": "Australia",
      "p": 9073,
      "a": []
    },
    {
      "n": "Oakleigh",
      "c": "Australia",
      "p": 7893,
      "a": []
    },
    {
      "n": "Colac",
      "c": "Australia",
      "p": 7450,
      "a": []
    },
    {
      "n": "Hamilton",
      "c": "Australia",
      "p": 6992.5,
      "a": []
    },
    {
      "n": "Maryborough",
      "c": "Australia",
      "p": 5838.5,
      "a": []
    },
    {
      "n": "Ararat",
      "c": "Australia",
      "p": 5464,
      "a": []
    },
    {
      "n": "Cobram",
      "c": "Australia",
      "p": 4659,
      "a": []
    },
    {
      "n": "Stawell",
      "c": "Australia",
      "p": 4596,
      "a": []
    },
    {
      "n": "Wonthaggi",
      "c": "Australia",
      "p": 4471.5,
      "a": []
    },
    {
      "n": "Seymour",
      "c": "Australia",
      "p": 3693,
      "a": []
    },
    {
      "n": "Ouyen",
      "c": "Australia",
      "p": 912,
      "a": []
    }
  ],
  "Australia/Adelaide": [
    {
      "n": "Adelaide",
      "c": "Australia",
      "p": 990677,
      "a": []
    },
    {
      "n": "Mount Gambier",
      "c": "Australia",
      "p": 21818.5,
      "a": []
    },
    {
      "n": "Whyalla",
      "c": "Australia",
      "p": 21102,
      "a": []
    },
    {
      "n": "Gawler",
      "c": "Australia",
      "p": 15542.5,
      "a": []
    },
    {
      "n": "Murray Bridge",
      "c": "Australia",
      "p": 14185.5,
      "a": []
    },
    {
      "n": "Port Lincoln",
      "c": "Australia",
      "p": 12438.5,
      "a": []
    },
    {
      "n": "Port Pirie",
      "c": "Australia",
      "p": 12417,
      "a": []
    },
    {
      "n": "Port Augusta",
      "c": "Australia",
      "p": 11186.5,
      "a": []
    },
    {
      "n": "Victor Harbor",
      "c": "Australia",
      "p": 7489,
      "a": []
    },
    {
      "n": "Berri",
      "c": "Australia",
      "p": 4523,
      "a": []
    },
    {
      "n": "Clare",
      "c": "Australia",
      "p": 2729,
      "a": []
    },
    {
      "n": "Wallaroo",
      "c": "Australia",
      "p": 2442,
      "a": []
    },
    {
      "n": "Bordertown",
      "c": "Australia",
      "p": 1976,
      "a": []
    },
    {
      "n": "Tumby Bay",
      "c": "Australia",
      "p": 1791,
      "a": []
    },
    {
      "n": "Penola",
      "c": "Australia",
      "p": 1513,
      "a": []
    },
    {
      "n": "Peterborough",
      "c": "Australia",
      "p": 1351,
      "a": []
    },
    {
      "n": "Ceduna",
      "c": "Australia",
      "p": 1252.5,
      "a": []
    },
    {
      "n": "Meningie",
      "c": "Australia",
      "p": 850,
      "a": []
    },
    {
      "n": "Kimba",
      "c": "Australia",
      "p": 636,
      "a": []
    },
    {
      "n": "Streaky Bay",
      "c": "Australia",
      "p": 614.5,
      "a": []
    },
    {
      "n": "Cowell",
      "c": "Australia",
      "p": 537,
      "a": []
    },
    {
      "n": "Andamooka",
      "c": "Australia",
      "p": 528,
      "a": []
    },
    {
      "n": "Woomera",
      "c": "Australia",
      "p": 450,
      "a": []
    },
    {
      "n": "Kingston South East",
      "c": "Australia",
      "p": 206,
      "a": []
    },
    {
      "n": "Kingoonya",
      "c": "Australia",
      "p": 50,
      "a": []
    }
  ],
  "Australia/Hobart": [
    {
      "n": "Launceston",
      "c": "Australia",
      "p": 65106.5,
      "a": []
    },
    {
      "n": "Hobart",
      "c": "Australia",
      "p": 64285,
      "a": []
    },
    {
      "n": "Burnie",
      "c": "Australia",
      "p": 18490.5,
      "a": []
    },
    {
      "n": "Devonport",
      "c": "Australia",
      "p": 17932.5,
      "a": []
    },
    {
      "n": "Kingston",
      "c": "Australia",
      "p": 12652,
      "a": []
    },
    {
      "n": "Smithton",
      "c": "Australia",
      "p": 3351,
      "a": []
    },
    {
      "n": "Scottsdale",
      "c": "Australia",
      "p": 1683.5,
      "a": []
    },
    {
      "n": "Queenstown",
      "c": "Australia",
      "p": 1658,
      "a": []
    },
    {
      "n": "Oatlands",
      "c": "Australia",
      "p": 1157,
      "a": []
    },
    {
      "n": "Bicheno",
      "c": "Australia",
      "p": 177,
      "a": []
    }
  ],
  "Australia/Broken_Hill": [
    {
      "n": "Broken Hill",
      "c": "Australia",
      "p": 17232.5,
      "a": []
    }
  ],
  "Europe/Vienna": [
    {
      "n": "Vienna",
      "c": "Austria",
      "p": 2065500,
      "a": [
        "VIE"
      ]
    },
    {
      "n": "Linz",
      "c": "Austria",
      "p": 265161.5,
      "a": []
    },
    {
      "n": "Graz",
      "c": "Austria",
      "p": 242780,
      "a": []
    },
    {
      "n": "Salzburg",
      "c": "Austria",
      "p": 178274,
      "a": []
    },
    {
      "n": "Innsbruck",
      "c": "Austria",
      "p": 133840.5,
      "a": []
    },
    {
      "n": "Klagenfurt",
      "c": "Austria",
      "p": 88588,
      "a": []
    },
    {
      "n": "Wiener Neustadt",
      "c": "Austria",
      "p": 60621.5,
      "a": []
    },
    {
      "n": "Bregenz",
      "c": "Austria",
      "p": 26928,
      "a": []
    },
    {
      "n": "Eisenstadt",
      "c": "Austria",
      "p": 13165,
      "a": []
    }
  ],
  "Europe/Berlin": [
    {
      "n": "Berlin",
      "c": "Germany",
      "p": 3250007,
      "a": [
        "BER"
      ]
    },
    {
      "n": "Frankfurt",
      "c": "Germany",
      "p": 1787332,
      "a": []
    },
    {
      "n": "Stuttgart",
      "c": "Germany",
      "p": 1775644,
      "a": []
    },
    {
      "n": "Hamburg",
      "c": "Germany",
      "p": 1748058.5,
      "a": []
    },
    {
      "n": "Mannheim",
      "c": "Germany",
      "p": 1337587,
      "a": []
    },
    {
      "n": "Munich",
      "c": "Germany",
      "p": 1267695.5,
      "a": []
    },
    {
      "n": "Essen",
      "c": "Germany",
      "p": 1157801.5,
      "a": []
    },
    {
      "n": "Cologne",
      "c": "Germany",
      "p": 983697.5,
      "a": []
    },
    {
      "n": "Düsseldorf",
      "c": "Germany",
      "p": 906196.5,
      "a": []
    },
    {
      "n": "Duisburg",
      "c": "Germany",
      "p": 882381,
      "a": []
    },
    {
      "n": "Bremen",
      "c": "Germany",
      "p": 635705,
      "a": []
    },
    {
      "n": "Hannover",
      "c": "Germany",
      "p": 618815,
      "a": []
    },
    {
      "n": "Nürnberg",
      "c": "Germany",
      "p": 618270.5,
      "a": []
    },
    {
      "n": "Dortmund",
      "c": "Germany",
      "p": 588462,
      "a": []
    },
    {
      "n": "Wuppertal",
      "c": "Germany",
      "p": 562997.5,
      "a": []
    },
    {
      "n": "Dresden",
      "c": "Germany",
      "p": 552184.5,
      "a": []
    },
    {
      "n": "Leipzig",
      "c": "Germany",
      "p": 523750,
      "a": []
    },
    {
      "n": "Bonn",
      "c": "Germany",
      "p": 496834,
      "a": []
    },
    {
      "n": "Saarbrucken",
      "c": "Germany",
      "p": 472871,
      "a": []
    },
    {
      "n": "Wiesbaden",
      "c": "Germany",
      "p": 444779,
      "a": []
    },
    {
      "n": "Karlsruhe",
      "c": "Germany",
      "p": 330643,
      "a": []
    },
    {
      "n": "Bielefeld",
      "c": "Germany",
      "p": 311739.5,
      "a": []
    },
    {
      "n": "Augsburg",
      "c": "Germany",
      "p": 309092.5,
      "a": []
    },
    {
      "n": "Heidelberg",
      "c": "Germany",
      "p": 284967.5,
      "a": []
    },
    {
      "n": "Chemnitz",
      "c": "Germany",
      "p": 274931.5,
      "a": []
    },
    {
      "n": "Münster",
      "c": "Germany",
      "p": 253612.5,
      "a": []
    },
    {
      "n": "Kiel",
      "c": "Germany",
      "p": 251092.5,
      "a": []
    },
    {
      "n": "Kassel",
      "c": "Germany",
      "p": 242212.5,
      "a": []
    },
    {
      "n": "Braunschweig",
      "c": "Germany",
      "p": 239884.5,
      "a": []
    },
    {
      "n": "Freiburg",
      "c": "Germany",
      "p": 235427.5,
      "a": []
    },
    {
      "n": "Magdeburg",
      "c": "Germany",
      "p": 227378.5,
      "a": []
    },
    {
      "n": "Lubeck",
      "c": "Germany",
      "p": 223798.5,
      "a": []
    },
    {
      "n": "Koblenz",
      "c": "Germany",
      "p": 209976,
      "a": []
    },
    {
      "n": "Rostock",
      "c": "Germany",
      "p": 200686.5,
      "a": []
    },
    {
      "n": "Osnabrück",
      "c": "Germany",
      "p": 198865,
      "a": []
    },
    {
      "n": "Erfurt",
      "c": "Germany",
      "p": 189365,
      "a": []
    },
    {
      "n": "Mainz",
      "c": "Germany",
      "p": 184997,
      "a": []
    },
    {
      "n": "Potsdam",
      "c": "Germany",
      "p": 181693.5,
      "a": []
    },
    {
      "n": "Furth",
      "c": "Germany",
      "p": 174934.5,
      "a": []
    },
    {
      "n": "Oldenburg",
      "c": "Germany",
      "p": 163338,
      "a": []
    },
    {
      "n": "Wurzburg",
      "c": "Germany",
      "p": 151146,
      "a": []
    },
    {
      "n": "Regensburg",
      "c": "Germany",
      "p": 146755,
      "a": []
    },
    {
      "n": "Ulm",
      "c": "Germany",
      "p": 146703,
      "a": []
    },
    {
      "n": "Ingolstadt",
      "c": "Germany",
      "p": 141991.5,
      "a": []
    },
    {
      "n": "Gottingen",
      "c": "Germany",
      "p": 130784,
      "a": []
    },
    {
      "n": "Bremerhaven",
      "c": "Germany",
      "p": 127598.5,
      "a": []
    },
    {
      "n": "Gera",
      "c": "Germany",
      "p": 103857,
      "a": []
    },
    {
      "n": "Jena",
      "c": "Germany",
      "p": 99941.5,
      "a": []
    },
    {
      "n": "Schwerin",
      "c": "Germany",
      "p": 96641,
      "a": []
    },
    {
      "n": "Cottbus",
      "c": "Germany",
      "p": 94910.5,
      "a": []
    },
    {
      "n": "Flensburg",
      "c": "Germany",
      "p": 91884,
      "a": []
    },
    {
      "n": "Giessen",
      "c": "Germany",
      "p": 78384.5,
      "a": []
    },
    {
      "n": "Rosenheim",
      "c": "Germany",
      "p": 76488,
      "a": []
    },
    {
      "n": "Stralsund",
      "c": "Germany",
      "p": 60172,
      "a": []
    },
    {
      "n": "Hof",
      "c": "Germany",
      "p": 52696,
      "a": []
    },
    {
      "n": "Coburg",
      "c": "Germany",
      "p": 51477.5,
      "a": []
    },
    {
      "n": "Passau",
      "c": "Austria",
      "p": 50000,
      "a": []
    },
    {
      "n": "Emden",
      "c": "Germany",
      "p": 49786,
      "a": []
    }
  ],
  "Asia/Baku": [
    {
      "n": "Baku",
      "c": "Azerbaijan",
      "p": 2007150,
      "a": []
    },
    {
      "n": "Ganca",
      "c": "Azerbaijan",
      "p": 301699.5,
      "a": []
    },
    {
      "n": "Sumqayt",
      "c": "Azerbaijan",
      "p": 272154.5,
      "a": []
    },
    {
      "n": "Naxcivan",
      "c": "Azerbaijan",
      "p": 79771,
      "a": []
    },
    {
      "n": "Ali Bayramli",
      "c": "Azerbaijan",
      "p": 70452,
      "a": []
    },
    {
      "n": "Saki",
      "c": "Azerbaijan",
      "p": 63579.5,
      "a": []
    },
    {
      "n": "Lankaran",
      "c": "Azerbaijan",
      "p": 60180,
      "a": []
    },
    {
      "n": "Stepanakert",
      "c": "Azerbaijan",
      "p": 57473,
      "a": []
    },
    {
      "n": "Yevlax",
      "c": "Azerbaijan",
      "p": 50014,
      "a": []
    },
    {
      "n": "Goycay",
      "c": "Azerbaijan",
      "p": 35031.5,
      "a": []
    },
    {
      "n": "Tovuz",
      "c": "Azerbaijan",
      "p": 12626,
      "a": []
    },
    {
      "n": "Qabala",
      "c": "Azerbaijan",
      "p": 11867,
      "a": []
    },
    {
      "n": "Gadabay",
      "c": "Azerbaijan",
      "p": 8657,
      "a": []
    },
    {
      "n": "Goranboy",
      "c": "Azerbaijan",
      "p": 7333,
      "a": []
    },
    {
      "n": "Oguz",
      "c": "Azerbaijan",
      "p": 6876,
      "a": []
    },
    {
      "n": "Agdam",
      "c": "Azerbaijan",
      "p": 0,
      "a": []
    }
  ],
  "Asia/Bahrain": [
    {
      "n": "Manama",
      "c": "Bahrain",
      "p": 360697,
      "a": []
    }
  ],
  "Asia/Dhaka": [
    {
      "n": "Dhaka",
      "c": "Bangladesh",
      "p": 9899167,
      "a": []
    },
    {
      "n": "Chittagong",
      "c": "Bangladesh",
      "p": 4224611,
      "a": []
    },
    {
      "n": "Khulna",
      "c": "Bangladesh",
      "p": 1447669.5,
      "a": []
    },
    {
      "n": "Rajshahi",
      "c": "Bangladesh",
      "p": 755066.5,
      "a": []
    },
    {
      "n": "Comilla",
      "c": "Bangladesh",
      "p": 389411,
      "a": []
    },
    {
      "n": "Mymensingh",
      "c": "Bangladesh",
      "p": 330126,
      "a": []
    },
    {
      "n": "Rangpur",
      "c": "Bangladesh",
      "p": 285564,
      "a": []
    },
    {
      "n": "Jessore",
      "c": "Bangladesh",
      "p": 243987,
      "a": []
    },
    {
      "n": "Sylhet",
      "c": "Bangladesh",
      "p": 237000,
      "a": []
    },
    {
      "n": "Saidpur",
      "c": "Bangladesh",
      "p": 232209,
      "a": []
    },
    {
      "n": "Narayanganj",
      "c": "Bangladesh",
      "p": 223622,
      "a": []
    },
    {
      "n": "Barisal",
      "c": "Bangladesh",
      "p": 202242,
      "a": []
    },
    {
      "n": "Tangail",
      "c": "Bangladesh",
      "p": 180144,
      "a": []
    },
    {
      "n": "Jamalpur",
      "c": "Bangladesh",
      "p": 167900,
      "a": []
    },
    {
      "n": "Nawabganj",
      "c": "Bangladesh",
      "p": 142361,
      "a": []
    },
    {
      "n": "Pabna",
      "c": "Bangladesh",
      "p": 137888,
      "a": []
    }
  ],
  "America/Barbados": [
    {
      "n": "Bridgetown",
      "c": "Barbados",
      "p": 143865,
      "a": []
    }
  ],
  "Europe/Minsk": [
    {
      "n": "Minsk",
      "c": "Belarus",
      "p": 1691069,
      "a": []
    },
    {
      "n": "Homyel",
      "c": "Belarus",
      "p": 472337.5,
      "a": []
    },
    {
      "n": "Mahilyow",
      "c": "Belarus",
      "p": 343527,
      "a": []
    },
    {
      "n": "Vitsyebsk",
      "c": "Belarus",
      "p": 333318.5,
      "a": []
    },
    {
      "n": "Hrodna",
      "c": "Belarus",
      "p": 285867,
      "a": []
    },
    {
      "n": "Brest",
      "c": "Belarus",
      "p": 266775,
      "a": []
    },
    {
      "n": "Babruysk",
      "c": "Belarus",
      "p": 212821.5,
      "a": []
    },
    {
      "n": "Baranavichy",
      "c": "Belarus",
      "p": 156514.5,
      "a": []
    },
    {
      "n": "Orsha",
      "c": "Belarus",
      "p": 130276.5,
      "a": []
    },
    {
      "n": "Barysaw",
      "c": "Belarus",
      "p": 127694.5,
      "a": []
    },
    {
      "n": "Pinsk",
      "c": "Belarus",
      "p": 120838.5,
      "a": []
    },
    {
      "n": "Mazyr",
      "c": "Belarus",
      "p": 100936,
      "a": []
    },
    {
      "n": "Lida",
      "c": "Belarus",
      "p": 99126,
      "a": []
    },
    {
      "n": "Maladzyechna",
      "c": "Belarus",
      "p": 96055,
      "a": []
    },
    {
      "n": "Polatsk",
      "c": "Belarus",
      "p": 79216,
      "a": []
    }
  ],
  "Europe/Brussels": [
    {
      "n": "Brussels",
      "c": "Belgium",
      "p": 1381011,
      "a": []
    },
    {
      "n": "Antwerpen",
      "c": "Belgium",
      "p": 689902.5,
      "a": []
    },
    {
      "n": "Liege",
      "c": "Belgium",
      "p": 472803,
      "a": []
    },
    {
      "n": "Gent",
      "c": "Belgium",
      "p": 337914.5,
      "a": []
    },
    {
      "n": "Charleroi",
      "c": "Belgium",
      "p": 272749.5,
      "a": []
    },
    {
      "n": "Brugge",
      "c": "Belgium",
      "p": 131589,
      "a": []
    },
    {
      "n": "Namur",
      "c": "Belgium",
      "p": 97155.5,
      "a": []
    },
    {
      "n": "Mons",
      "c": "Belgium",
      "p": 91277,
      "a": []
    },
    {
      "n": "Hasselt",
      "c": "Belgium",
      "p": 69222,
      "a": []
    },
    {
      "n": "Arlon",
      "c": "Belgium",
      "p": 26179,
      "a": []
    }
  ],
  "America/Belize": [
    {
      "n": "Belize City",
      "c": "Belize",
      "p": 62244.5,
      "a": []
    },
    {
      "n": "Orange Walk",
      "c": "Belize",
      "p": 18066.5,
      "a": []
    },
    {
      "n": "Belmopan",
      "c": "Belize",
      "p": 14300.5,
      "a": []
    },
    {
      "n": "El Cayo",
      "c": "Belize",
      "p": 13451,
      "a": []
    },
    {
      "n": "Corozal",
      "c": "Belize",
      "p": 8724,
      "a": []
    },
    {
      "n": "Dangriga",
      "c": "Belize",
      "p": 8506,
      "a": []
    },
    {
      "n": "Punta Gorda",
      "c": "Belize",
      "p": 6387,
      "a": []
    }
  ],
  "Africa/Porto-Novo": [
    {
      "n": "Cotonou",
      "c": "Benin",
      "p": 726292,
      "a": []
    },
    {
      "n": "Porto-Novo",
      "c": "Benin",
      "p": 267084,
      "a": []
    },
    {
      "n": "Parakou",
      "c": "Benin",
      "p": 176303,
      "a": []
    },
    {
      "n": "Djougou",
      "c": "Benin",
      "p": 152708.5,
      "a": []
    },
    {
      "n": "Lokossa",
      "c": "Benin",
      "p": 86971,
      "a": []
    },
    {
      "n": "Ouidah",
      "c": "Benin",
      "p": 83503,
      "a": []
    },
    {
      "n": "Abomey",
      "c": "Benin",
      "p": 82154,
      "a": []
    },
    {
      "n": "Kandi",
      "c": "Benin",
      "p": 73483,
      "a": []
    },
    {
      "n": "Natitingou",
      "c": "Benin",
      "p": 65356.5,
      "a": []
    }
  ],
  "Atlantic/Bermuda": [
    {
      "n": "Hamilton",
      "c": "Bermuda",
      "p": 32910,
      "a": []
    }
  ],
  "Asia/Thimphu": [
    {
      "n": "Thimphu",
      "c": "Bhutan",
      "p": 88930.5,
      "a": []
    },
    {
      "n": "Paro",
      "c": "Bhutan",
      "p": 15000,
      "a": []
    },
    {
      "n": "Punakha",
      "c": "Bhutan",
      "p": 5000,
      "a": []
    },
    {
      "n": "Wangdue Prodrang",
      "c": "Bhutan",
      "p": 5000,
      "a": []
    }
  ],
  "America/La_Paz": [
    {
      "n": "Santa Cruz",
      "c": "Bolivia",
      "p": 1859530.5,
      "a": []
    },
    {
      "n": "La Paz",
      "c": "Bolivia",
      "p": 1201399.5,
      "a": []
    },
    {
      "n": "Cochabamba",
      "c": "Bolivia",
      "p": 804138,
      "a": []
    },
    {
      "n": "Santa Ana",
      "c": "Bolivia",
      "p": 234478,
      "a": []
    },
    {
      "n": "Oruro",
      "c": "Bolivia",
      "p": 227592.5,
      "a": []
    },
    {
      "n": "Quillacollo",
      "c": "Bolivia",
      "p": 227052,
      "a": []
    },
    {
      "n": "Sucre",
      "c": "Bolivia",
      "p": 223287,
      "a": []
    },
    {
      "n": "Potosi",
      "c": "Bolivia",
      "p": 160576,
      "a": []
    },
    {
      "n": "Tarija",
      "c": "Bolivia",
      "p": 155513,
      "a": []
    },
    {
      "n": "Montero",
      "c": "Bolivia",
      "p": 83821,
      "a": []
    },
    {
      "n": "Riberalta",
      "c": "Bolivia",
      "p": 74014,
      "a": []
    },
    {
      "n": "Trinidad",
      "c": "Bolivia",
      "p": 69333.5,
      "a": []
    },
    {
      "n": "Guajara-Miram",
      "c": "Brazil",
      "p": 51852.5,
      "a": []
    },
    {
      "n": "Bermejo",
      "c": "Bolivia",
      "p": 36544,
      "a": []
    },
    {
      "n": "Guayaramerin",
      "c": "Bolivia",
      "p": 36008,
      "a": []
    },
    {
      "n": "Viacha",
      "c": "Bolivia",
      "p": 34776,
      "a": []
    },
    {
      "n": "Villazon",
      "c": "Bolivia",
      "p": 33734,
      "a": []
    },
    {
      "n": "Llallagua",
      "c": "Bolivia",
      "p": 28069,
      "a": []
    },
    {
      "n": "Tupiza",
      "c": "Bolivia",
      "p": 25499.5,
      "a": []
    },
    {
      "n": "San Ignacio",
      "c": "Bolivia",
      "p": 24480,
      "a": []
    },
    {
      "n": "Punata",
      "c": "Bolivia",
      "p": 20758.5,
      "a": []
    },
    {
      "n": "San Borja",
      "c": "Bolivia",
      "p": 19640,
      "a": []
    },
    {
      "n": "Camiri",
      "c": "Bolivia",
      "p": 19212.5,
      "a": []
    },
    {
      "n": "Villamontes",
      "c": "Bolivia",
      "p": 18761,
      "a": []
    },
    {
      "n": "Puerto Suarez",
      "c": "Bolivia",
      "p": 17273,
      "a": []
    },
    {
      "n": "Cliza",
      "c": "Bolivia",
      "p": 12235,
      "a": []
    },
    {
      "n": "Ascension",
      "c": "Bolivia",
      "p": 12085,
      "a": []
    },
    {
      "n": "Rurrenabaque",
      "c": "Bolivia",
      "p": 11749,
      "a": []
    },
    {
      "n": "Uyuni",
      "c": "Bolivia",
      "p": 11616,
      "a": []
    },
    {
      "n": "Puerto Quijarro",
      "c": "Bolivia",
      "p": 10392,
      "a": []
    },
    {
      "n": "Portachuelo",
      "c": "Bolivia",
      "p": 9982,
      "a": []
    },
    {
      "n": "Robore",
      "c": "Bolivia",
      "p": 9959,
      "a": []
    },
    {
      "n": "San José",
      "c": "Bolivia",
      "p": 9211,
      "a": []
    },
    {
      "n": "Challapata",
      "c": "Bolivia",
      "p": 8565,
      "a": []
    },
    {
      "n": "Achacachi",
      "c": "Bolivia",
      "p": 8447,
      "a": []
    },
    {
      "n": "Reyes",
      "c": "Bolivia",
      "p": 7376,
      "a": []
    },
    {
      "n": "Vallegrande",
      "c": "Bolivia",
      "p": 6857.5,
      "a": []
    },
    {
      "n": "San Matias",
      "c": "Bolivia",
      "p": 6352,
      "a": []
    },
    {
      "n": "Aiquile",
      "c": "Bolivia",
      "p": 5844,
      "a": []
    },
    {
      "n": "San Ramon",
      "c": "Bolivia",
      "p": 5439.5,
      "a": []
    },
    {
      "n": "San Carlos",
      "c": "Bolivia",
      "p": 5266.5,
      "a": []
    },
    {
      "n": "Uncia",
      "c": "Bolivia",
      "p": 4723,
      "a": []
    },
    {
      "n": "Camargo",
      "c": "Bolivia",
      "p": 4715,
      "a": []
    },
    {
      "n": "Betanzos",
      "c": "Bolivia",
      "p": 4629.5,
      "a": []
    },
    {
      "n": "San Javier",
      "c": "Bolivia",
      "p": 4210,
      "a": []
    },
    {
      "n": "Apolo",
      "c": "Bolivia",
      "p": 4189,
      "a": []
    },
    {
      "n": "Magdalena",
      "c": "Bolivia",
      "p": 3445,
      "a": []
    },
    {
      "n": "Quime",
      "c": "Bolivia",
      "p": 3224.5,
      "a": []
    },
    {
      "n": "Charagua",
      "c": "Bolivia",
      "p": 3025,
      "a": []
    },
    {
      "n": "San Lorenzo",
      "c": "Bolivia",
      "p": 3000,
      "a": []
    },
    {
      "n": "Samaipata",
      "c": "Bolivia",
      "p": 2926,
      "a": []
    },
    {
      "n": "Entre Rios",
      "c": "Bolivia",
      "p": 2685,
      "a": []
    },
    {
      "n": "Baures",
      "c": "Bolivia",
      "p": 2422,
      "a": []
    },
    {
      "n": "Tarabuco",
      "c": "Bolivia",
      "p": 2364,
      "a": []
    },
    {
      "n": "Coroico",
      "c": "Bolivia",
      "p": 2361,
      "a": []
    },
    {
      "n": "Padilla",
      "c": "Bolivia",
      "p": 2276.5,
      "a": []
    },
    {
      "n": "Sorata",
      "c": "Bolivia",
      "p": 2190,
      "a": []
    },
    {
      "n": "Coro Coro",
      "c": "Bolivia",
      "p": 1884,
      "a": []
    },
    {
      "n": "Puerto Villarroel",
      "c": "Bolivia",
      "p": 1778,
      "a": []
    },
    {
      "n": "San Rafael",
      "c": "Bolivia",
      "p": 1201,
      "a": []
    },
    {
      "n": "Puerto Acosta",
      "c": "Bolivia",
      "p": 1123,
      "a": []
    },
    {
      "n": "Sica Sica",
      "c": "Bolivia",
      "p": 1006,
      "a": []
    },
    {
      "n": "Cuevo",
      "c": "Bolivia",
      "p": 953,
      "a": []
    },
    {
      "n": "Sabaya",
      "c": "Bolivia",
      "p": 573,
      "a": []
    },
    {
      "n": "Llica",
      "c": "Bolivia",
      "p": 553,
      "a": []
    },
    {
      "n": "Charana",
      "c": "Bolivia",
      "p": 197,
      "a": []
    },
    {
      "n": "Piso Firme",
      "c": "Bolivia",
      "p": 72,
      "a": []
    },
    {
      "n": "Villa Martin",
      "c": "Bolivia",
      "p": 10,
      "a": []
    }
  ],
  "America/Lima": [
    {
      "n": "Lima",
      "c": "Peru",
      "p": 7385117,
      "a": []
    },
    {
      "n": "Callao",
      "c": "Peru",
      "p": 786231.5,
      "a": []
    },
    {
      "n": "Arequipa",
      "c": "Peru",
      "p": 775785,
      "a": []
    },
    {
      "n": "Chiclayo",
      "c": "Peru",
      "p": 587083.5,
      "a": []
    },
    {
      "n": "Trujillo",
      "c": "Peru",
      "p": 521046,
      "a": []
    },
    {
      "n": "Iquitos",
      "c": "Peru",
      "p": 448174.5,
      "a": []
    },
    {
      "n": "Huancayo",
      "c": "Peru",
      "p": 394695,
      "a": []
    },
    {
      "n": "Piura",
      "c": "Peru",
      "p": 361199,
      "a": []
    },
    {
      "n": "Cusco",
      "c": "Peru",
      "p": 336661,
      "a": []
    },
    {
      "n": "Chimbote",
      "c": "Peru",
      "p": 333406,
      "a": []
    },
    {
      "n": "Pucallpa",
      "c": "Peru",
      "p": 304917,
      "a": []
    },
    {
      "n": "Ica",
      "c": "Peru",
      "p": 263132,
      "a": []
    },
    {
      "n": "Tacna",
      "c": "Peru",
      "p": 261042.5,
      "a": []
    },
    {
      "n": "Juliaca",
      "c": "Peru",
      "p": 234428,
      "a": []
    },
    {
      "n": "Ayacucho",
      "c": "Peru",
      "p": 153173.5,
      "a": []
    },
    {
      "n": "Huanuco",
      "c": "Peru",
      "p": 153052,
      "a": []
    },
    {
      "n": "Cajamarca",
      "c": "Peru",
      "p": 138832.5,
      "a": []
    },
    {
      "n": "Chincha Alta",
      "c": "Peru",
      "p": 138608,
      "a": []
    },
    {
      "n": "Sullana",
      "c": "Peru",
      "p": 114496.5,
      "a": []
    },
    {
      "n": "Puno",
      "c": "Peru",
      "p": 111350,
      "a": []
    },
    {
      "n": "Cerro de Pasco",
      "c": "Peru",
      "p": 108071,
      "a": []
    },
    {
      "n": "Tumbes",
      "c": "Peru",
      "p": 105783,
      "a": []
    },
    {
      "n": "Huaraz",
      "c": "Peru",
      "p": 74986.5,
      "a": []
    },
    {
      "n": "Talara",
      "c": "Peru",
      "p": 74760.5,
      "a": []
    },
    {
      "n": "Pisco",
      "c": "Peru",
      "p": 71538,
      "a": []
    },
    {
      "n": "Huacho",
      "c": "Peru",
      "p": 67509.5,
      "a": []
    },
    {
      "n": "Chulucanas",
      "c": "Peru",
      "p": 60435,
      "a": []
    },
    {
      "n": "Abancay",
      "c": "Peru",
      "p": 53981,
      "a": []
    },
    {
      "n": "Ilo",
      "c": "Peru",
      "p": 53192,
      "a": []
    },
    {
      "n": "Puerto Maldonado",
      "c": "Peru",
      "p": 52349,
      "a": []
    },
    {
      "n": "Jaen",
      "c": "Peru",
      "p": 49171,
      "a": []
    },
    {
      "n": "Paita",
      "c": "Peru",
      "p": 47891.5,
      "a": []
    },
    {
      "n": "Moyobamba",
      "c": "Peru",
      "p": 46005,
      "a": []
    },
    {
      "n": "Chosica",
      "c": "Peru",
      "p": 44572.5,
      "a": []
    },
    {
      "n": "Huancavelica",
      "c": "Peru",
      "p": 42982,
      "a": []
    },
    {
      "n": "Ferrenafe",
      "c": "Peru",
      "p": 42270.5,
      "a": []
    },
    {
      "n": "Mollendo",
      "c": "Peru",
      "p": 38993,
      "a": []
    },
    {
      "n": "Moquegua",
      "c": "Peru",
      "p": 38610,
      "a": []
    },
    {
      "n": "Tingo Maria",
      "c": "Peru",
      "p": 36138.5,
      "a": []
    },
    {
      "n": "Pacasmayo",
      "c": "Peru",
      "p": 34223.5,
      "a": []
    },
    {
      "n": "La Oroya",
      "c": "Peru",
      "p": 33345,
      "a": []
    },
    {
      "n": "Huaura",
      "c": "Peru",
      "p": 30561.5,
      "a": []
    },
    {
      "n": "Casma",
      "c": "Peru",
      "p": 27421,
      "a": []
    },
    {
      "n": "Juanjui",
      "c": "Peru",
      "p": 27352.5,
      "a": []
    },
    {
      "n": "Huamachuco",
      "c": "Peru",
      "p": 26301.5,
      "a": []
    },
    {
      "n": "Tarma",
      "c": "Peru",
      "p": 25906,
      "a": []
    },
    {
      "n": "Nasca",
      "c": "Peru",
      "p": 23387,
      "a": []
    },
    {
      "n": "Chachapoyas",
      "c": "Peru",
      "p": 23128.5,
      "a": []
    },
    {
      "n": "Pativilca",
      "c": "Peru",
      "p": 22744,
      "a": []
    },
    {
      "n": "Jauja",
      "c": "Peru",
      "p": 21057,
      "a": []
    },
    {
      "n": "Sicuani",
      "c": "Peru",
      "p": 20924.5,
      "a": []
    },
    {
      "n": "Camana",
      "c": "Peru",
      "p": 18695,
      "a": []
    },
    {
      "n": "Chancay",
      "c": "Peru",
      "p": 18601,
      "a": []
    },
    {
      "n": "Requena",
      "c": "Peru",
      "p": 17097.5,
      "a": []
    },
    {
      "n": "Contamana",
      "c": "Peru",
      "p": 16403,
      "a": []
    },
    {
      "n": "Ilave",
      "c": "Peru",
      "p": 16033,
      "a": []
    },
    {
      "n": "Tocache",
      "c": "Peru",
      "p": 15822.5,
      "a": []
    },
    {
      "n": "Sechura",
      "c": "Peru",
      "p": 15811,
      "a": []
    },
    {
      "n": "Huanta",
      "c": "Peru",
      "p": 15534.5,
      "a": []
    },
    {
      "n": "Satipo",
      "c": "Peru",
      "p": 15532,
      "a": []
    },
    {
      "n": "Pimentel",
      "c": "Peru",
      "p": 14422.5,
      "a": []
    },
    {
      "n": "Chota",
      "c": "Peru",
      "p": 13452,
      "a": []
    },
    {
      "n": "Lamas",
      "c": "Peru",
      "p": 13098,
      "a": []
    },
    {
      "n": "Ayaviri",
      "c": "Peru",
      "p": 12524.5,
      "a": []
    },
    {
      "n": "Cajabamba",
      "c": "Peru",
      "p": 12036.5,
      "a": []
    },
    {
      "n": "Junin",
      "c": "Peru",
      "p": 11495,
      "a": []
    },
    {
      "n": "San Ramon",
      "c": "Peru",
      "p": 10599,
      "a": []
    },
    {
      "n": "Santiago",
      "c": "Peru",
      "p": 10449,
      "a": [
        "SCL"
      ]
    },
    {
      "n": "Huarmey",
      "c": "Peru",
      "p": 9184,
      "a": []
    },
    {
      "n": "Motupe",
      "c": "Peru",
      "p": 9048,
      "a": []
    },
    {
      "n": "Puquio",
      "c": "Peru",
      "p": 9027.5,
      "a": []
    },
    {
      "n": "Otuzco",
      "c": "Peru",
      "p": 8754.5,
      "a": []
    },
    {
      "n": "Sechura",
      "c": "Peru",
      "p": 8602,
      "a": []
    },
    {
      "n": "Putina",
      "c": "Peru",
      "p": 8118,
      "a": []
    },
    {
      "n": "Olmos",
      "c": "Peru",
      "p": 7579.5,
      "a": []
    },
    {
      "n": "Salaverry",
      "c": "Peru",
      "p": 7228,
      "a": []
    },
    {
      "n": "Chilca",
      "c": "Peru",
      "p": 6556,
      "a": []
    },
    {
      "n": "Coracora",
      "c": "Peru",
      "p": 6433.5,
      "a": []
    },
    {
      "n": "Urubamba",
      "c": "Peru",
      "p": 5985,
      "a": []
    },
    {
      "n": "Desaguadero",
      "c": "Peru",
      "p": 5120,
      "a": []
    },
    {
      "n": "Santo Tomas",
      "c": "Peru",
      "p": 3695.5,
      "a": []
    },
    {
      "n": "Caballococha",
      "c": "Peru",
      "p": 3195,
      "a": []
    },
    {
      "n": "Nauta",
      "c": "Peru",
      "p": 2308.5,
      "a": []
    },
    {
      "n": "Tarapoto",
      "c": "Peru",
      "p": 936,
      "a": []
    },
    {
      "n": "Tournavista",
      "c": "Peru",
      "p": 511,
      "a": []
    },
    {
      "n": "Puerto Heath",
      "c": "Bolivia",
      "p": 10,
      "a": []
    },
    {
      "n": "Puca Urco",
      "c": "Peru",
      "p": 10,
      "a": []
    },
    {
      "n": "Andoas",
      "c": "Peru",
      "p": 10,
      "a": []
    },
    {
      "n": "Soldado Bartra",
      "c": "Peru",
      "p": 10,
      "a": []
    },
    {
      "n": "Gueppi",
      "c": "Peru",
      "p": 10,
      "a": []
    }
  ],
  "America/Rio_Branco": [
    {
      "n": "Rio Branco",
      "c": "Brazil",
      "p": 257642,
      "a": []
    },
    {
      "n": "Cruzeiro do Sul",
      "c": "Brazil",
      "p": 56862,
      "a": []
    },
    {
      "n": "Cobija",
      "c": "Bolivia",
      "p": 35511,
      "a": []
    },
    {
      "n": "Sena Madureira",
      "c": "Brazil",
      "p": 23354,
      "a": []
    }
  ],
  "Europe/Sarajevo": [
    {
      "n": "Sarajevo",
      "c": "Bosnia and Herzegovina",
      "p": 662816.5,
      "a": []
    },
    {
      "n": "Banja Luka",
      "c": "Bosnia and Herzegovina",
      "p": 221422,
      "a": []
    },
    {
      "n": "Zenica",
      "c": "Bosnia and Herzegovina",
      "p": 151388,
      "a": []
    },
    {
      "n": "Tuzla",
      "c": "Bosnia and Herzegovina",
      "p": 143410,
      "a": []
    },
    {
      "n": "Mostar",
      "c": "Bosnia and Herzegovina",
      "p": 133792.5,
      "a": []
    },
    {
      "n": "Prijedor",
      "c": "Bosnia and Herzegovina",
      "p": 70602.5,
      "a": []
    }
  ],
  "Africa/Gaborone": [
    {
      "n": "Gaborone",
      "c": "Botswana",
      "p": 183827,
      "a": []
    },
    {
      "n": "Francistown",
      "c": "Botswana",
      "p": 89179.5,
      "a": []
    },
    {
      "n": "Molepolole",
      "c": "Botswana",
      "p": 57713,
      "a": []
    },
    {
      "n": "Lobatse",
      "c": "Botswana",
      "p": 50343.5,
      "a": []
    },
    {
      "n": "Serowe",
      "c": "Botswana",
      "p": 47996,
      "a": []
    },
    {
      "n": "Mahalapye",
      "c": "Botswana",
      "p": 47607.5,
      "a": []
    },
    {
      "n": "Maun",
      "c": "Botswana",
      "p": 47059,
      "a": []
    },
    {
      "n": "Kanye",
      "c": "Botswana",
      "p": 45773.5,
      "a": []
    },
    {
      "n": "Mochudi",
      "c": "Botswana",
      "p": 39700,
      "a": []
    },
    {
      "n": "Palapye",
      "c": "Botswana",
      "p": 27179,
      "a": []
    },
    {
      "n": "Tshabong",
      "c": "Botswana",
      "p": 9679,
      "a": []
    },
    {
      "n": "Kasane",
      "c": "Botswana",
      "p": 7774.5,
      "a": []
    },
    {
      "n": "Ghanzi",
      "c": "Botswana",
      "p": 6306,
      "a": []
    },
    {
      "n": "Mopipi",
      "c": "Botswana",
      "p": 3301,
      "a": []
    },
    {
      "n": "Nata",
      "c": "Botswana",
      "p": 2492.5,
      "a": []
    },
    {
      "n": "Lehututu",
      "c": "Botswana",
      "p": 1942,
      "a": []
    },
    {
      "n": "Nokaneng",
      "c": "Botswana",
      "p": 1763,
      "a": []
    },
    {
      "n": "Lokhwabe",
      "c": "Botswana",
      "p": 1473,
      "a": []
    },
    {
      "n": "Tsau",
      "c": "Botswana",
      "p": 1409,
      "a": []
    },
    {
      "n": "Mohembo",
      "c": "Botswana",
      "p": 757,
      "a": []
    }
  ],
  "America/Fortaleza": [
    {
      "n": "Fortaleza",
      "c": "Brazil",
      "p": 2958717.5,
      "a": []
    },
    {
      "n": "Natal",
      "c": "Brazil",
      "p": 925521.5,
      "a": []
    },
    {
      "n": "Joao Pessoa",
      "c": "Brazil",
      "p": 803441.5,
      "a": []
    },
    {
      "n": "Teresina",
      "c": "Brazil",
      "p": 746860.5,
      "a": []
    },
    {
      "n": "São Luís",
      "c": "Brazil",
      "p": 524692.5,
      "a": []
    },
    {
      "n": "Campina Grande",
      "c": "Brazil",
      "p": 383098.5,
      "a": []
    },
    {
      "n": "Juazeiro do Norte",
      "c": "Brazil",
      "p": 222861,
      "a": []
    },
    {
      "n": "Imperatriz",
      "c": "Brazil",
      "p": 203339.5,
      "a": []
    },
    {
      "n": "Timon",
      "c": "Brazil",
      "p": 203157,
      "a": []
    },
    {
      "n": "Mossoro",
      "c": "Brazil",
      "p": 202294,
      "a": []
    },
    {
      "n": "Crato",
      "c": "Brazil",
      "p": 164149.5,
      "a": []
    },
    {
      "n": "Sobral",
      "c": "Brazil",
      "p": 148439.5,
      "a": []
    },
    {
      "n": "Caxias",
      "c": "Brazil",
      "p": 134640,
      "a": []
    },
    {
      "n": "Parnaiba",
      "c": "Brazil",
      "p": 125699,
      "a": []
    },
    {
      "n": "Patos",
      "c": "Brazil",
      "p": 85720.5,
      "a": []
    },
    {
      "n": "Codo",
      "c": "Brazil",
      "p": 83288,
      "a": []
    },
    {
      "n": "Santa Ines",
      "c": "Brazil",
      "p": 58511.5,
      "a": []
    },
    {
      "n": "Bacabal",
      "c": "Brazil",
      "p": 57296.5,
      "a": []
    },
    {
      "n": "Iguatu",
      "c": "Brazil",
      "p": 56638,
      "a": []
    },
    {
      "n": "Barra do Corda",
      "c": "Brazil",
      "p": 48901,
      "a": []
    },
    {
      "n": "Picos",
      "c": "Brazil",
      "p": 47694.5,
      "a": []
    },
    {
      "n": "Caico",
      "c": "Brazil",
      "p": 42378,
      "a": []
    },
    {
      "n": "Sao Jose de Ribamar",
      "c": "Brazil",
      "p": 41521,
      "a": []
    },
    {
      "n": "Crateus",
      "c": "Brazil",
      "p": 40338,
      "a": []
    },
    {
      "n": "Balsas",
      "c": "Brazil",
      "p": 39761.5,
      "a": []
    },
    {
      "n": "Floriano",
      "c": "Brazil",
      "p": 35923,
      "a": []
    },
    {
      "n": "Coroata",
      "c": "Brazil",
      "p": 34129,
      "a": []
    },
    {
      "n": "Russas",
      "c": "Brazil",
      "p": 33613.5,
      "a": []
    },
    {
      "n": "Acu",
      "c": "Brazil",
      "p": 33303,
      "a": []
    },
    {
      "n": "Piripiri",
      "c": "Brazil",
      "p": 32639,
      "a": []
    },
    {
      "n": "Caninde",
      "c": "Brazil",
      "p": 32085,
      "a": []
    },
    {
      "n": "Itapipoca",
      "c": "Brazil",
      "p": 31041,
      "a": []
    },
    {
      "n": "Quixada",
      "c": "Brazil",
      "p": 30723.5,
      "a": []
    },
    {
      "n": "Presidente Dutra",
      "c": "Brazil",
      "p": 30330,
      "a": []
    },
    {
      "n": "Grajau",
      "c": "Brazil",
      "p": 30217,
      "a": []
    },
    {
      "n": "Chapadinha",
      "c": "Brazil",
      "p": 29807.5,
      "a": []
    },
    {
      "n": "Taua",
      "c": "Brazil",
      "p": 29188,
      "a": []
    },
    {
      "n": "Aracati",
      "c": "Brazil",
      "p": 28126.5,
      "a": []
    },
    {
      "n": "Camocim",
      "c": "Brazil",
      "p": 27794.5,
      "a": []
    },
    {
      "n": "Pinheiro",
      "c": "Brazil",
      "p": 24912,
      "a": []
    },
    {
      "n": "Campo Maior",
      "c": "Brazil",
      "p": 24089.5,
      "a": []
    },
    {
      "n": "Nova Cruz",
      "c": "Brazil",
      "p": 22563.5,
      "a": []
    },
    {
      "n": "Itapecuru Mirim",
      "c": "Brazil",
      "p": 22347,
      "a": []
    },
    {
      "n": "Santa Cruz",
      "c": "Brazil",
      "p": 22003.5,
      "a": []
    },
    {
      "n": "Acarau",
      "c": "Brazil",
      "p": 21024.5,
      "a": []
    },
    {
      "n": "Paracuru",
      "c": "Brazil",
      "p": 19860,
      "a": []
    },
    {
      "n": "Baturite",
      "c": "Brazil",
      "p": 17797.5,
      "a": []
    },
    {
      "n": "Granja",
      "c": "Brazil",
      "p": 17233,
      "a": []
    },
    {
      "n": "Ico",
      "c": "Brazil",
      "p": 15820,
      "a": []
    },
    {
      "n": "Viana",
      "c": "Brazil",
      "p": 15808.5,
      "a": []
    },
    {
      "n": "Ipu",
      "c": "Brazil",
      "p": 14479.5,
      "a": []
    },
    {
      "n": "Pedreiras",
      "c": "Brazil",
      "p": 13638,
      "a": []
    },
    {
      "n": "Colinas",
      "c": "Brazil",
      "p": 13562.5,
      "a": []
    },
    {
      "n": "Barras",
      "c": "Brazil",
      "p": 11951.5,
      "a": []
    },
    {
      "n": "Apodi",
      "c": "Brazil",
      "p": 8586,
      "a": []
    },
    {
      "n": "Rosario",
      "c": "Brazil",
      "p": 6798,
      "a": []
    }
  ],
  "America/Belem": [
    {
      "n": "Belem",
      "c": "Brazil",
      "p": 1787368.5,
      "a": []
    },
    {
      "n": "Vila Velha",
      "c": "Brazil",
      "p": 742413.5,
      "a": []
    },
    {
      "n": "Macapá",
      "c": "Brazil",
      "p": 433781.5,
      "a": []
    },
    {
      "n": "Maraba",
      "c": "Brazil",
      "p": 166182,
      "a": []
    },
    {
      "n": "Castanhal",
      "c": "Brazil",
      "p": 125314.5,
      "a": []
    },
    {
      "n": "Abaetetuba",
      "c": "Brazil",
      "p": 78735,
      "a": []
    },
    {
      "n": "Porto Santana",
      "c": "Brazil",
      "p": 68849,
      "a": []
    },
    {
      "n": "Braganca",
      "c": "Brazil",
      "p": 56864.5,
      "a": []
    },
    {
      "n": "Jacundá",
      "c": "Brazil",
      "p": 51375,
      "a": []
    },
    {
      "n": "Breves",
      "c": "Brazil",
      "p": 46818.5,
      "a": []
    },
    {
      "n": "Capanema",
      "c": "Brazil",
      "p": 45831,
      "a": []
    },
    {
      "n": "Tucurui",
      "c": "Brazil",
      "p": 38472,
      "a": []
    },
    {
      "n": "Paragominas",
      "c": "Brazil",
      "p": 38095.5,
      "a": []
    },
    {
      "n": "Capitao Poco",
      "c": "Brazil",
      "p": 32704,
      "a": []
    },
    {
      "n": "Salinopolis",
      "c": "Brazil",
      "p": 32384.5,
      "a": []
    },
    {
      "n": "Conceicao do Araguaia",
      "c": "Brazil",
      "p": 27115,
      "a": []
    },
    {
      "n": "Cameta",
      "c": "Brazil",
      "p": 22705,
      "a": []
    },
    {
      "n": "Itupiranga",
      "c": "Brazil",
      "p": 21301,
      "a": []
    },
    {
      "n": "Portel",
      "c": "Brazil",
      "p": 10855,
      "a": []
    },
    {
      "n": "Viseu",
      "c": "Brazil",
      "p": 9992.5,
      "a": []
    },
    {
      "n": "Xinguara",
      "c": "Brazil",
      "p": 4047,
      "a": []
    },
    {
      "n": "Amapa",
      "c": "Brazil",
      "p": 1947,
      "a": []
    }
  ],
  "America/Porto_Velho": [
    {
      "n": "Porto Velho",
      "c": "Brazil",
      "p": 289534.5,
      "a": []
    },
    {
      "n": "Ji-Parana",
      "c": "Brazil",
      "p": 65016,
      "a": []
    },
    {
      "n": "Vilhena",
      "c": "Brazil",
      "p": 63231,
      "a": []
    },
    {
      "n": "Ariquemes",
      "c": "Brazil",
      "p": 58096,
      "a": []
    },
    {
      "n": "Pimenta Bueno",
      "c": "Brazil",
      "p": 25762,
      "a": []
    },
    {
      "n": "Rolim de Moura",
      "c": "Brazil",
      "p": 24516,
      "a": []
    },
    {
      "n": "Abuna",
      "c": "Brazil",
      "p": 1929,
      "a": []
    },
    {
      "n": "Principe da Beira",
      "c": "Brazil",
      "p": 956,
      "a": []
    }
  ],
  "America/Campo_Grande": [
    {
      "n": "Campo Grande",
      "c": "Brazil",
      "p": 687723,
      "a": []
    },
    {
      "n": "Dourados",
      "c": "Brazil",
      "p": 144743.5,
      "a": []
    },
    {
      "n": "Ponta Pora",
      "c": "Brazil",
      "p": 75047,
      "a": []
    },
    {
      "n": "Corumba",
      "c": "Brazil",
      "p": 70035.5,
      "a": []
    },
    {
      "n": "Tres Lagoas",
      "c": "Brazil",
      "p": 64217.5,
      "a": []
    },
    {
      "n": "Aquidauana",
      "c": "Brazil",
      "p": 38053,
      "a": []
    },
    {
      "n": "Paranaiba",
      "c": "Brazil",
      "p": 25278.5,
      "a": []
    },
    {
      "n": "Jardim",
      "c": "Brazil",
      "p": 21252.5,
      "a": []
    },
    {
      "n": "Maracaju",
      "c": "Brazil",
      "p": 18156,
      "a": []
    }
  ],
  "America/Sao_Paulo": [
    {
      "n": "Sao Paulo",
      "c": "Brazil",
      "p": 14433147.5,
      "a": []
    },
    {
      "n": "Rio de Janeiro",
      "c": "Brazil",
      "p": 6879087.5,
      "a": [
        "GIG",
        "RIO"
      ]
    },
    {
      "n": "Belo Horizonte",
      "c": "Brazil",
      "p": 3974112,
      "a": []
    },
    {
      "n": "Brasilia",
      "c": "Brazil",
      "p": 3139979.5,
      "a": []
    },
    {
      "n": "Porto Alegre",
      "c": "Brazil",
      "p": 2644870.5,
      "a": []
    },
    {
      "n": "Curitiba",
      "c": "Brazil",
      "p": 2291430,
      "a": []
    },
    {
      "n": "Campinas",
      "c": "Brazil",
      "p": 1911277,
      "a": []
    },
    {
      "n": "Goiania",
      "c": "Brazil",
      "p": 1596597.5,
      "a": []
    },
    {
      "n": "Santos",
      "c": "Brazil",
      "p": 1060201.5,
      "a": []
    },
    {
      "n": "Vitória",
      "c": "Brazil",
      "p": 1008328,
      "a": []
    },
    {
      "n": "Niteroi",
      "c": "Brazil",
      "p": 993920,
      "a": []
    },
    {
      "n": "Nova Iguacu",
      "c": "Brazil",
      "p": 844583,
      "a": []
    },
    {
      "n": "Duque de Caxias",
      "c": "Brazil",
      "p": 842890,
      "a": []
    },
    {
      "n": "Vila Velha",
      "c": "Brazil",
      "p": 742413.5,
      "a": []
    },
    {
      "n": "Joinville",
      "c": "Brazil",
      "p": 710737.5,
      "a": []
    },
    {
      "n": "Sao Jose dos Campos",
      "c": "Brazil",
      "p": 695322.5,
      "a": []
    },
    {
      "n": "Santo Andre",
      "c": "Brazil",
      "p": 662373,
      "a": []
    },
    {
      "n": "Florianopolis",
      "c": "Brazil",
      "p": 568783,
      "a": []
    },
    {
      "n": "Sorocaba",
      "c": "Brazil",
      "p": 561071.5,
      "a": []
    },
    {
      "n": "Novo Hamburgo",
      "c": "Brazil",
      "p": 557017,
      "a": []
    },
    {
      "n": "Ribeirao Preto",
      "c": "Brazil",
      "p": 520774,
      "a": []
    },
    {
      "n": "Londrina",
      "c": "Brazil",
      "p": 496035,
      "a": []
    },
    {
      "n": "Uberlandia",
      "c": "Brazil",
      "p": 484862,
      "a": []
    },
    {
      "n": "Sao Jose dos Pinhais",
      "c": "Brazil",
      "p": 472180,
      "a": []
    },
    {
      "n": "Canoas",
      "c": "Brazil",
      "p": 466661,
      "a": []
    },
    {
      "n": "Juiz de Fora",
      "c": "Brazil",
      "p": 464764.5,
      "a": []
    },
    {
      "n": "Jundiai",
      "c": "Brazil",
      "p": 413568.5,
      "a": []
    },
    {
      "n": "Campos",
      "c": "Brazil",
      "p": 378943,
      "a": []
    },
    {
      "n": "Caxias do Sul",
      "c": "Brazil",
      "p": 377580.5,
      "a": []
    },
    {
      "n": "Foz do Iguacu",
      "c": "Brazil",
      "p": 366989,
      "a": []
    },
    {
      "n": "Sao Jose do Rio Preto",
      "c": "Brazil",
      "p": 358243.5,
      "a": []
    },
    {
      "n": "Volta Redonda",
      "c": "Brazil",
      "p": 352971,
      "a": []
    },
    {
      "n": "Americana",
      "c": "Brazil",
      "p": 337747,
      "a": []
    },
    {
      "n": "Piracicaba",
      "c": "Brazil",
      "p": 329530,
      "a": []
    },
    {
      "n": "Taubate",
      "c": "Brazil",
      "p": 327600.5,
      "a": []
    },
    {
      "n": "Maringa",
      "c": "Brazil",
      "p": 320029.5,
      "a": []
    },
    {
      "n": "Ipatinga",
      "c": "Brazil",
      "p": 318320,
      "a": []
    },
    {
      "n": "Bauru",
      "c": "Brazil",
      "p": 307929.5,
      "a": []
    },
    {
      "n": "Montes Claros",
      "c": "Brazil",
      "p": 300022,
      "a": []
    },
    {
      "n": "Pelotas",
      "c": "Brazil",
      "p": 299270,
      "a": []
    },
    {
      "n": "Blumenau",
      "c": "Brazil",
      "p": 286326,
      "a": []
    },
    {
      "n": "Franca",
      "c": "Brazil",
      "p": 281149.5,
      "a": []
    },
    {
      "n": "Petropolis",
      "c": "Brazil",
      "p": 279381,
      "a": []
    },
    {
      "n": "Anapolis",
      "c": "Brazil",
      "p": 278595.5,
      "a": []
    },
    {
      "n": "Ponta Grossa",
      "c": "Brazil",
      "p": 271321.5,
      "a": []
    },
    {
      "n": "Itajai",
      "c": "Brazil",
      "p": 241421,
      "a": []
    },
    {
      "n": "Limeira",
      "c": "Brazil",
      "p": 241071,
      "a": []
    },
    {
      "n": "Santa Maria",
      "c": "Brazil",
      "p": 239211.5,
      "a": []
    },
    {
      "n": "Uberaba",
      "c": "Brazil",
      "p": 234807,
      "a": []
    },
    {
      "n": "Cascavel",
      "c": "Brazil",
      "p": 229300,
      "a": []
    },
    {
      "n": "Itu",
      "c": "Brazil",
      "p": 228878,
      "a": []
    },
    {
      "n": "Governador Valadares",
      "c": "Brazil",
      "p": 201317,
      "a": []
    },
    {
      "n": "Presidente Prudente",
      "c": "Brazil",
      "p": 199722,
      "a": []
    },
    {
      "n": "Sete Lagoas",
      "c": "Brazil",
      "p": 195032,
      "a": []
    },
    {
      "n": "Marilia",
      "c": "Brazil",
      "p": 191083.5,
      "a": []
    },
    {
      "n": "Cabo Frio",
      "c": "Brazil",
      "p": 184980,
      "a": []
    },
    {
      "n": "Criciuma",
      "c": "Brazil",
      "p": 183085.5,
      "a": []
    },
    {
      "n": "Divinopolis",
      "c": "Brazil",
      "p": 181457,
      "a": []
    },
    {
      "n": "Rio Claro",
      "c": "Brazil",
      "p": 177710,
      "a": []
    },
    {
      "n": "Sao Carlos",
      "c": "Brazil",
      "p": 175219,
      "a": []
    },
    {
      "n": "Cachoeiro de Itapemirim",
      "c": "Brazil",
      "p": 174808.5,
      "a": []
    },
    {
      "n": "Barra Mansa",
      "c": "Brazil",
      "p": 166719,
      "a": []
    },
    {
      "n": "Aracatuba",
      "c": "Brazil",
      "p": 166305,
      "a": []
    },
    {
      "n": "Passo Fundo",
      "c": "Brazil",
      "p": 164047,
      "a": []
    },
    {
      "n": "Nova Friburgo",
      "c": "Brazil",
      "p": 162676,
      "a": []
    },
    {
      "n": "Xapeco",
      "c": "Brazil",
      "p": 154794,
      "a": []
    },
    {
      "n": "Guaratingueta",
      "c": "Brazil",
      "p": 154730,
      "a": []
    },
    {
      "n": "Rio Grande",
      "c": "Brazil",
      "p": 143150,
      "a": []
    },
    {
      "n": "Lajes",
      "c": "Brazil",
      "p": 139972,
      "a": []
    },
    {
      "n": "Paranagua",
      "c": "Brazil",
      "p": 135071,
      "a": []
    },
    {
      "n": "Macae",
      "c": "Brazil",
      "p": 133083,
      "a": []
    },
    {
      "n": "Jaragua do Sul",
      "c": "Brazil",
      "p": 128803.5,
      "a": []
    },
    {
      "n": "Braganca Paulista",
      "c": "Brazil",
      "p": 126386,
      "a": []
    },
    {
      "n": "Pocos de Caldas",
      "c": "Brazil",
      "p": 125498.5,
      "a": []
    },
    {
      "n": "Pindamonhangaba",
      "c": "Brazil",
      "p": 123985,
      "a": []
    },
    {
      "n": "Guarapuava",
      "c": "Brazil",
      "p": 123381.5,
      "a": []
    },
    {
      "n": "Itapetininga",
      "c": "Brazil",
      "p": 120889,
      "a": []
    },
    {
      "n": "Santa Cruz do Sul",
      "c": "Brazil",
      "p": 109869,
      "a": []
    },
    {
      "n": "Catanduva",
      "c": "Brazil",
      "p": 105238,
      "a": []
    },
    {
      "n": "Conselheiro Lafaiete",
      "c": "Brazil",
      "p": 102926,
      "a": []
    },
    {
      "n": "Apucarana",
      "c": "Brazil",
      "p": 102577,
      "a": []
    },
    {
      "n": "Jau",
      "c": "Brazil",
      "p": 102565.5,
      "a": []
    },
    {
      "n": "Bage",
      "c": "Brazil",
      "p": 102519,
      "a": []
    },
    {
      "n": "Pouso Alegre",
      "c": "Brazil",
      "p": 102517.5,
      "a": []
    },
    {
      "n": "Barbacena",
      "c": "Brazil",
      "p": 101628.5,
      "a": []
    },
    {
      "n": "Uruguaiana",
      "c": "Brazil",
      "p": 97736.5,
      "a": []
    },
    {
      "n": "Barretos",
      "c": "Brazil",
      "p": 97562,
      "a": []
    },
    {
      "n": "Ourinhos",
      "c": "Brazil",
      "p": 96994,
      "a": []
    },
    {
      "n": "Botucatu",
      "c": "Brazil",
      "p": 94938.5,
      "a": []
    },
    {
      "n": "Trindade",
      "c": "Brazil",
      "p": 93113,
      "a": []
    },
    {
      "n": "Bento Goncalves",
      "c": "Brazil",
      "p": 92561.5,
      "a": []
    },
    {
      "n": "Arapongas",
      "c": "Brazil",
      "p": 91203.5,
      "a": []
    },
    {
      "n": "Santana do Livramento",
      "c": "Brazil",
      "p": 87312,
      "a": []
    },
    {
      "n": "Teofilo Otoni",
      "c": "Brazil",
      "p": 86865,
      "a": []
    },
    {
      "n": "Linhares",
      "c": "Brazil",
      "p": 86413,
      "a": []
    },
    {
      "n": "Erechim",
      "c": "Brazil",
      "p": 85365.5,
      "a": []
    },
    {
      "n": "Passos",
      "c": "Brazil",
      "p": 85136.5,
      "a": []
    },
    {
      "n": "Itanhaem",
      "c": "Brazil",
      "p": 82722,
      "a": []
    },
    {
      "n": "Tatui",
      "c": "Brazil",
      "p": 81936,
      "a": []
    },
    {
      "n": "Uba",
      "c": "Brazil",
      "p": 81698.5,
      "a": []
    }
  ],
  "America/Cuiaba": [
    {
      "n": "Cuiaba",
      "c": "Brazil",
      "p": 603143.5,
      "a": []
    },
    {
      "n": "Varzea Grande",
      "c": "Brazil",
      "p": 242088,
      "a": []
    },
    {
      "n": "Rondonopolis",
      "c": "Brazil",
      "p": 146794,
      "a": []
    },
    {
      "n": "Cáceres",
      "c": "Brazil",
      "p": 85274,
      "a": []
    },
    {
      "n": "Barra do Garcas",
      "c": "Brazil",
      "p": 41214.5,
      "a": []
    },
    {
      "n": "Alta Floresta",
      "c": "Brazil",
      "p": 40466,
      "a": []
    },
    {
      "n": "Colider",
      "c": "Brazil",
      "p": 27139,
      "a": []
    },
    {
      "n": "Aripuana",
      "c": "Brazil",
      "p": 26983,
      "a": []
    },
    {
      "n": "Pontes e Lacerda",
      "c": "Brazil",
      "p": 22694.5,
      "a": []
    },
    {
      "n": "Barra do Bugres",
      "c": "Brazil",
      "p": 22386,
      "a": []
    },
    {
      "n": "Sinop",
      "c": "Brazil",
      "p": 8961,
      "a": []
    },
    {
      "n": "Mato Grosso",
      "c": "Brazil",
      "p": 1612,
      "a": []
    },
    {
      "n": "Juina",
      "c": "Brazil",
      "p": 980,
      "a": []
    }
  ],
  "America/Maceio": [
    {
      "n": "Maceio",
      "c": "Brazil",
      "p": 1000215.5,
      "a": []
    },
    {
      "n": "Aracaju",
      "c": "Brazil",
      "p": 587765.5,
      "a": []
    },
    {
      "n": "Arapiraca",
      "c": "Brazil",
      "p": 177115,
      "a": []
    },
    {
      "n": "Rio Largo",
      "c": "Brazil",
      "p": 110966,
      "a": []
    },
    {
      "n": "Estancia",
      "c": "Brazil",
      "p": 50690,
      "a": []
    },
    {
      "n": "Palmeira dos Indios",
      "c": "Brazil",
      "p": 41095,
      "a": []
    },
    {
      "n": "Penedo",
      "c": "Brazil",
      "p": 37515.5,
      "a": []
    }
  ],
  "America/Bahia": [
    {
      "n": "Salvador",
      "c": "Brazil",
      "p": 3081422.5,
      "a": []
    },
    {
      "n": "Feira de Santana",
      "c": "Brazil",
      "p": 449194.5,
      "a": []
    },
    {
      "n": "Vitoria da Conquista",
      "c": "Brazil",
      "p": 272320.5,
      "a": []
    },
    {
      "n": "Itabuna",
      "c": "Brazil",
      "p": 213799,
      "a": []
    },
    {
      "n": "Ilheus",
      "c": "Brazil",
      "p": 193060.5,
      "a": []
    },
    {
      "n": "Jequie",
      "c": "Brazil",
      "p": 131524.5,
      "a": []
    },
    {
      "n": "Alagoinhas",
      "c": "Brazil",
      "p": 123379,
      "a": []
    },
    {
      "n": "Juazeiro",
      "c": "Brazil",
      "p": 95132,
      "a": []
    },
    {
      "n": "Barreiras",
      "c": "Brazil",
      "p": 86245.5,
      "a": []
    },
    {
      "n": "Paulo Afonso",
      "c": "Brazil",
      "p": 85350,
      "a": []
    },
    {
      "n": "Porto Seguro",
      "c": "Brazil",
      "p": 72031,
      "a": []
    },
    {
      "n": "Valenca",
      "c": "Brazil",
      "p": 56584.5,
      "a": []
    },
    {
      "n": "Serrinha",
      "c": "Brazil",
      "p": 52953.5,
      "a": []
    },
    {
      "n": "Irece",
      "c": "Brazil",
      "p": 48079.5,
      "a": []
    },
    {
      "n": "Guanambi",
      "c": "Brazil",
      "p": 45730,
      "a": []
    },
    {
      "n": "Senhor do Bonfim",
      "c": "Brazil",
      "p": 43577,
      "a": []
    },
    {
      "n": "Itapetinga",
      "c": "Brazil",
      "p": 43224,
      "a": []
    },
    {
      "n": "Bom Jesus da Lapa",
      "c": "Brazil",
      "p": 40691,
      "a": []
    },
    {
      "n": "Remanso",
      "c": "Brazil",
      "p": 37945,
      "a": []
    },
    {
      "n": "Itamaraju",
      "c": "Brazil",
      "p": 35055,
      "a": []
    },
    {
      "n": "Itaberaba",
      "c": "Brazil",
      "p": 31722,
      "a": []
    },
    {
      "n": "Jaguaquara",
      "c": "Brazil",
      "p": 30554.5,
      "a": []
    },
    {
      "n": "Nova Vicosa",
      "c": "Brazil",
      "p": 30250,
      "a": []
    },
    {
      "n": "Brumado",
      "c": "Brazil",
      "p": 29300,
      "a": []
    },
    {
      "n": "Ubaitaba",
      "c": "Brazil",
      "p": 27411.5,
      "a": []
    },
    {
      "n": "Canavieiras",
      "c": "Brazil",
      "p": 26375,
      "a": []
    },
    {
      "n": "Xique-Xique",
      "c": "Brazil",
      "p": 18633,
      "a": []
    },
    {
      "n": "Tucano",
      "c": "Brazil",
      "p": 16199,
      "a": []
    },
    {
      "n": "Itambe",
      "c": "Brazil",
      "p": 15450.5,
      "a": []
    },
    {
      "n": "Santa Maria da Vitoria",
      "c": "Brazil",
      "p": 13176,
      "a": []
    },
    {
      "n": "Santa Cruz Cabralia",
      "c": "Brazil",
      "p": 9980.5,
      "a": []
    }
  ],
  "America/Recife": [
    {
      "n": "Recife",
      "c": "Brazil",
      "p": 2564549,
      "a": []
    },
    {
      "n": "Jaboatao",
      "c": "Brazil",
      "p": 681214,
      "a": []
    },
    {
      "n": "Olinda",
      "c": "Brazil",
      "p": 659554,
      "a": []
    },
    {
      "n": "Caruaru",
      "c": "Brazil",
      "p": 238732.5,
      "a": []
    },
    {
      "n": "Petrolina",
      "c": "Brazil",
      "p": 227817.5,
      "a": []
    },
    {
      "n": "Cabo de Santo Agostinho",
      "c": "Brazil",
      "p": 144662,
      "a": []
    },
    {
      "n": "Carpina",
      "c": "Brazil",
      "p": 118134,
      "a": []
    },
    {
      "n": "Garanhuns",
      "c": "Brazil",
      "p": 107115,
      "a": []
    },
    {
      "n": "Goiana",
      "c": "Brazil",
      "p": 57764.5,
      "a": []
    },
    {
      "n": "Arcoverde",
      "c": "Brazil",
      "p": 53066,
      "a": []
    },
    {
      "n": "Timbauba",
      "c": "Brazil",
      "p": 51327.5,
      "a": []
    },
    {
      "n": "Barreiros",
      "c": "Brazil",
      "p": 35472.5,
      "a": []
    },
    {
      "n": "Salgueiro",
      "c": "Brazil",
      "p": 31565,
      "a": []
    }
  ],
  "America/Manaus": [
    {
      "n": "Manaus",
      "c": "Brazil",
      "p": 1636622,
      "a": []
    },
    {
      "n": "Natal",
      "c": "Brazil",
      "p": 980588,
      "a": []
    },
    {
      "n": "Crato",
      "c": "Brazil",
      "p": 164149.5,
      "a": []
    },
    {
      "n": "Parintins",
      "c": "Brazil",
      "p": 64428,
      "a": []
    },
    {
      "n": "Manacapuru",
      "c": "Brazil",
      "p": 55780.5,
      "a": []
    },
    {
      "n": "Coari",
      "c": "Brazil",
      "p": 51897.5,
      "a": []
    },
    {
      "n": "Itacoatiara",
      "c": "Brazil",
      "p": 51509,
      "a": []
    },
    {
      "n": "Tefe",
      "c": "Brazil",
      "p": 48189.5,
      "a": []
    },
    {
      "n": "Maues",
      "c": "Brazil",
      "p": 27518,
      "a": []
    },
    {
      "n": "Manicore",
      "c": "Brazil",
      "p": 17802,
      "a": []
    },
    {
      "n": "Sao Cabriel da Cachoeira",
      "c": "Brazil",
      "p": 15231,
      "a": []
    },
    {
      "n": "Fonte Boa",
      "c": "Brazil",
      "p": 13974.5,
      "a": []
    },
    {
      "n": "Barcelos",
      "c": "Brazil",
      "p": 9968.5,
      "a": []
    },
    {
      "n": "Novo Airao",
      "c": "Brazil",
      "p": 9049,
      "a": []
    },
    {
      "n": "Tonantins",
      "c": "Brazil",
      "p": 2722,
      "a": []
    }
  ],
  "America/Santarem": [
    {
      "n": "Santarem",
      "c": "Brazil",
      "p": 209737.5,
      "a": []
    },
    {
      "n": "Itaituba",
      "c": "Brazil",
      "p": 78532,
      "a": []
    },
    {
      "n": "Altamira",
      "c": "Brazil",
      "p": 56769,
      "a": []
    },
    {
      "n": "Laranjal do Jari",
      "c": "Brazil",
      "p": 43344,
      "a": []
    },
    {
      "n": "Oriximina",
      "c": "Brazil",
      "p": 35300,
      "a": []
    },
    {
      "n": "Jacareacanga",
      "c": "Brazil",
      "p": 31661,
      "a": []
    },
    {
      "n": "Alenquer",
      "c": "Brazil",
      "p": 26290,
      "a": []
    },
    {
      "n": "Obidos",
      "c": "Brazil",
      "p": 26278.5,
      "a": []
    },
    {
      "n": "Uruara",
      "c": "Brazil",
      "p": 10,
      "a": []
    }
  ],
  "America/Araguaina": [
    {
      "n": "Palmas",
      "c": "Brazil",
      "p": 215793.5,
      "a": []
    },
    {
      "n": "Araguaina",
      "c": "Brazil",
      "p": 50444,
      "a": []
    },
    {
      "n": "Gurupi",
      "c": "Brazil",
      "p": 45595.5,
      "a": []
    },
    {
      "n": "Alvorada",
      "c": "Brazil",
      "p": 9273,
      "a": []
    },
    {
      "n": "Porto Nacional",
      "c": "Brazil",
      "p": 9129,
      "a": []
    },
    {
      "n": "Tocantinopolis",
      "c": "Brazil",
      "p": 8750,
      "a": []
    }
  ],
  "America/Boa_Vista": [
    {
      "n": "Boa Vista",
      "c": "Brazil",
      "p": 202299.5,
      "a": []
    },
    {
      "n": "Caracarai",
      "c": "Brazil",
      "p": 11368,
      "a": []
    }
  ],
  "America/Eirunepe": [
    {
      "n": "Eirunepe",
      "c": "Brazil",
      "p": 19462.5,
      "a": []
    }
  ],
  "Asia/Brunei": [
    {
      "n": "Bandar Seri Begawan",
      "c": "Brunei",
      "p": 218250,
      "a": []
    }
  ],
  "Europe/Sofia": [
    {
      "n": "Sofia",
      "c": "Bulgaria",
      "p": 1029913.5,
      "a": []
    },
    {
      "n": "Plovdiv",
      "c": "Bulgaria",
      "p": 319089.5,
      "a": []
    },
    {
      "n": "Varna",
      "c": "Bulgaria",
      "p": 245522,
      "a": []
    },
    {
      "n": "Burgas",
      "c": "Bulgaria",
      "p": 174254,
      "a": []
    },
    {
      "n": "Ruse",
      "c": "Bulgaria",
      "p": 170254,
      "a": []
    },
    {
      "n": "Stara Zagora",
      "c": "Bulgaria",
      "p": 128315.5,
      "a": []
    },
    {
      "n": "Pleven",
      "c": "Bulgaria",
      "p": 110445.5,
      "a": []
    },
    {
      "n": "Sliven",
      "c": "Bulgaria",
      "p": 87346.5,
      "a": []
    },
    {
      "n": "Pernik",
      "c": "Bulgaria",
      "p": 80625,
      "a": []
    },
    {
      "n": "Shumen",
      "c": "Bulgaria",
      "p": 75487.5,
      "a": []
    },
    {
      "n": "Dobrich",
      "c": "Bulgaria",
      "p": 73813,
      "a": []
    },
    {
      "n": "Khaskovo",
      "c": "Bulgaria",
      "p": 72805,
      "a": []
    },
    {
      "n": "Vratsa",
      "c": "Bulgaria",
      "p": 68287,
      "a": []
    },
    {
      "n": "Turnovo",
      "c": "Bulgaria",
      "p": 53115,
      "a": []
    },
    {
      "n": "Kyustendil",
      "c": "Bulgaria",
      "p": 49676.5,
      "a": []
    },
    {
      "n": "Montana",
      "c": "Bulgaria",
      "p": 47445,
      "a": []
    },
    {
      "n": "Lovec",
      "c": "Bulgaria",
      "p": 42211,
      "a": []
    },
    {
      "n": "Razgrad",
      "c": "Bulgaria",
      "p": 38285,
      "a": []
    }
  ],
  "Africa/Ouagadougou": [
    {
      "n": "Ouagadougou",
      "c": "Burkina Faso",
      "p": 992228.5,
      "a": []
    },
    {
      "n": "Bobo Dioulasso",
      "c": "Burkina Faso",
      "p": 346035,
      "a": []
    },
    {
      "n": "Koudougou",
      "c": "Burkina Faso",
      "p": 85339,
      "a": []
    },
    {
      "n": "Ouahigouya",
      "c": "Burkina Faso",
      "p": 70300,
      "a": []
    },
    {
      "n": "Banfora",
      "c": "Burkina Faso",
      "p": 45903.5,
      "a": []
    },
    {
      "n": "Dedougou",
      "c": "Burkina Faso",
      "p": 45341,
      "a": []
    },
    {
      "n": "Kaya",
      "c": "Burkina Faso",
      "p": 39623,
      "a": []
    },
    {
      "n": "Tenkodogo",
      "c": "Burkina Faso",
      "p": 37883,
      "a": []
    },
    {
      "n": "Dori",
      "c": "Burkina Faso",
      "p": 37806,
      "a": []
    },
    {
      "n": "Reo",
      "c": "Burkina Faso",
      "p": 37535,
      "a": []
    },
    {
      "n": "Fada Ngourma",
      "c": "Burkina Faso",
      "p": 33910,
      "a": []
    },
    {
      "n": "Koupela",
      "c": "Burkina Faso",
      "p": 32052,
      "a": []
    },
    {
      "n": "Kombissiri",
      "c": "Burkina Faso",
      "p": 30137,
      "a": []
    },
    {
      "n": "Nouna",
      "c": "Burkina Faso",
      "p": 29048,
      "a": []
    },
    {
      "n": "Gaoua",
      "c": "Burkina Faso",
      "p": 28023,
      "a": []
    },
    {
      "n": "Leo",
      "c": "Burkina Faso",
      "p": 26884,
      "a": []
    },
    {
      "n": "Diapaga",
      "c": "Burkina Faso",
      "p": 26013,
      "a": []
    },
    {
      "n": "Zorgo",
      "c": "Burkina Faso",
      "p": 23892,
      "a": []
    },
    {
      "n": "Yako",
      "c": "Burkina Faso",
      "p": 22904,
      "a": []
    },
    {
      "n": "Djibo",
      "c": "Burkina Faso",
      "p": 22223,
      "a": []
    },
    {
      "n": "Orodara",
      "c": "Burkina Faso",
      "p": 18632,
      "a": []
    },
    {
      "n": "Po",
      "c": "Burkina Faso",
      "p": 17924,
      "a": []
    },
    {
      "n": "Tougan",
      "c": "Burkina Faso",
      "p": 17590,
      "a": []
    },
    {
      "n": "Boulsa",
      "c": "Burkina Faso",
      "p": 17489,
      "a": []
    },
    {
      "n": "Manga",
      "c": "Burkina Faso",
      "p": 15173,
      "a": []
    },
    {
      "n": "Diebougou",
      "c": "Burkina Faso",
      "p": 12732,
      "a": []
    },
    {
      "n": "Ziniare",
      "c": "Burkina Faso",
      "p": 12703,
      "a": []
    },
    {
      "n": "Solenzo",
      "c": "Burkina Faso",
      "p": 10385,
      "a": []
    },
    {
      "n": "Bogande",
      "c": "Burkina Faso",
      "p": 9854,
      "a": []
    },
    {
      "n": "Gorom Gorom",
      "c": "Burkina Faso",
      "p": 6691,
      "a": []
    },
    {
      "n": "Sapouy",
      "c": "Burkina Faso",
      "p": 3837,
      "a": []
    },
    {
      "n": "Sebba",
      "c": "Burkina Faso",
      "p": 3273,
      "a": []
    }
  ],
  "Africa/Bujumbura": [
    {
      "n": "Bujumbura",
      "c": "Burundi",
      "p": 331700,
      "a": []
    },
    {
      "n": "Muyinga",
      "c": "Burundi",
      "p": 71076,
      "a": []
    },
    {
      "n": "Ruyigi",
      "c": "Burundi",
      "p": 38458,
      "a": []
    },
    {
      "n": "Gitega",
      "c": "Burundi",
      "p": 23167,
      "a": []
    },
    {
      "n": "Ngozi",
      "c": "Burundi",
      "p": 21506,
      "a": []
    },
    {
      "n": "Rutana",
      "c": "Burundi",
      "p": 20893,
      "a": []
    },
    {
      "n": "Bururi",
      "c": "Burundi",
      "p": 20066.5,
      "a": []
    },
    {
      "n": "Makamba",
      "c": "Burundi",
      "p": 19642,
      "a": []
    },
    {
      "n": "Kayanza",
      "c": "Burundi",
      "p": 19443,
      "a": []
    },
    {
      "n": "Muramvya",
      "c": "Burundi",
      "p": 18041,
      "a": []
    },
    {
      "n": "Bubanza",
      "c": "Burundi",
      "p": 12728,
      "a": []
    },
    {
      "n": "Karusi",
      "c": "Burundi",
      "p": 10705,
      "a": []
    },
    {
      "n": "Cankuzo",
      "c": "Burundi",
      "p": 6585,
      "a": []
    },
    {
      "n": "Kirundo",
      "c": "Burundi",
      "p": 6083,
      "a": []
    }
  ],
  "Asia/Phnom_Penh": [
    {
      "n": "Phnom Penh",
      "c": "Cambodia",
      "p": 1466000,
      "a": []
    },
    {
      "n": "Battambang",
      "c": "Cambodia",
      "p": 152608.5,
      "a": []
    },
    {
      "n": "Siem Reap",
      "c": "Cambodia",
      "p": 97199,
      "a": []
    },
    {
      "n": "Prey Veng",
      "c": "Cambodia",
      "p": 74000,
      "a": []
    },
    {
      "n": "Kampong Cham",
      "c": "Cambodia",
      "p": 72491.5,
      "a": []
    },
    {
      "n": "Kompong Chhnang",
      "c": "Cambodia",
      "p": 65817,
      "a": []
    },
    {
      "n": "Sisophon",
      "c": "Cambodia",
      "p": 36760,
      "a": []
    },
    {
      "n": "Kampot",
      "c": "Cambodia",
      "p": 36398,
      "a": []
    },
    {
      "n": "Kampong Spoe",
      "c": "Cambodia",
      "p": 33231,
      "a": []
    },
    {
      "n": "Pursat",
      "c": "Cambodia",
      "p": 32961,
      "a": []
    },
    {
      "n": "Krong Koh Kong",
      "c": "Cambodia",
      "p": 30285,
      "a": []
    },
    {
      "n": "Stoeng Treng",
      "c": "Cambodia",
      "p": 29665,
      "a": []
    },
    {
      "n": "Phnum Tbeng Meanchey",
      "c": "Cambodia",
      "p": 24380,
      "a": []
    },
    {
      "n": "Svay Rieng",
      "c": "Cambodia",
      "p": 23956,
      "a": []
    },
    {
      "n": "Kracheh",
      "c": "Cambodia",
      "p": 19975,
      "a": []
    },
    {
      "n": "Kampong Thum",
      "c": "Cambodia",
      "p": 19951,
      "a": []
    },
    {
      "n": "Lumphat",
      "c": "Cambodia",
      "p": 19205,
      "a": []
    },
    {
      "n": "Takeo",
      "c": "Cambodia",
      "p": 15264,
      "a": []
    },
    {
      "n": "Senmonorom",
      "c": "Cambodia",
      "p": 7944,
      "a": []
    }
  ],
  "Africa/Douala": [
    {
      "n": "Douala",
      "c": "Cameroon",
      "p": 1622041,
      "a": []
    },
    {
      "n": "Yaounde",
      "c": "Cameroon",
      "p": 1335793.5,
      "a": []
    },
    {
      "n": "Bamenda",
      "c": "Cameroon",
      "p": 419567,
      "a": []
    },
    {
      "n": "Garoua",
      "c": "Cameroon",
      "p": 365436.5,
      "a": []
    },
    {
      "n": "Bafoussam",
      "c": "Cameroon",
      "p": 290768,
      "a": []
    },
    {
      "n": "Maroua",
      "c": "Cameroon",
      "p": 260656,
      "a": []
    },
    {
      "n": "Bertoua",
      "c": "Cameroon",
      "p": 153286.5,
      "a": []
    },
    {
      "n": "Limbe",
      "c": "Cameroon",
      "p": 142290,
      "a": []
    },
    {
      "n": "Ngaoundere",
      "c": "Cameroon",
      "p": 134322.5,
      "a": []
    },
    {
      "n": "Kumba",
      "c": "Cameroon",
      "p": 131122,
      "a": []
    },
    {
      "n": "Edea",
      "c": "Cameroon",
      "p": 109506.5,
      "a": []
    },
    {
      "n": "Nkongsamba",
      "c": "Cameroon",
      "p": 105069,
      "a": []
    },
    {
      "n": "Buea",
      "c": "Cameroon",
      "p": 90088,
      "a": []
    },
    {
      "n": "Kumbo",
      "c": "Cameroon",
      "p": 89728,
      "a": []
    },
    {
      "n": "Bafang",
      "c": "Cameroon",
      "p": 86916.5,
      "a": []
    },
    {
      "n": "Ebolowa",
      "c": "Cameroon",
      "p": 83687.5,
      "a": []
    },
    {
      "n": "Guider",
      "c": "Cameroon",
      "p": 83319,
      "a": []
    },
    {
      "n": "Foumban",
      "c": "Cameroon",
      "p": 64399,
      "a": []
    },
    {
      "n": "Meiganga",
      "c": "Cameroon",
      "p": 54864.5,
      "a": []
    },
    {
      "n": "Mbalmayo",
      "c": "Cameroon",
      "p": 53501.5,
      "a": []
    },
    {
      "n": "Wum",
      "c": "Cameroon",
      "p": 42601,
      "a": []
    },
    {
      "n": "Batouri",
      "c": "Cameroon",
      "p": 42271,
      "a": []
    },
    {
      "n": "Bafia",
      "c": "Cameroon",
      "p": 41201,
      "a": []
    },
    {
      "n": "Kribi",
      "c": "Cameroon",
      "p": 31473,
      "a": []
    },
    {
      "n": "Tibati",
      "c": "Cameroon",
      "p": 22096,
      "a": []
    },
    {
      "n": "Eseka",
      "c": "Cameroon",
      "p": 14102,
      "a": []
    },
    {
      "n": "Belabo",
      "c": "Cameroon",
      "p": 11455.5,
      "a": []
    },
    {
      "n": "Abong Mbang",
      "c": "Cameroon",
      "p": 7698,
      "a": []
    },
    {
      "n": "Kontcha",
      "c": "Cameroon",
      "p": 5846,
      "a": []
    },
    {
      "n": "Eyumojok",
      "c": "Cameroon",
      "p": 5798,
      "a": []
    },
    {
      "n": "Mbe",
      "c": "Cameroon",
      "p": 3950,
      "a": []
    }
  ],
  "America/Winnipeg": [
    {
      "n": "Winnipeg",
      "c": "Canada",
      "p": 603688,
      "a": []
    },
    {
      "n": "Brandon",
      "c": "Canada",
      "p": 27326,
      "a": []
    },
    {
      "n": "Thompson",
      "c": "Canada",
      "p": 13097,
      "a": []
    },
    {
      "n": "Kenora",
      "c": "Canada",
      "p": 10852,
      "a": []
    },
    {
      "n": "Selkirk",
      "c": "Canada",
      "p": 9819.5,
      "a": []
    },
    {
      "n": "Steinbach",
      "c": "Canada",
      "p": 9668,
      "a": []
    },
    {
      "n": "Dauphin",
      "c": "Canada",
      "p": 8747.5,
      "a": []
    },
    {
      "n": "Dryden",
      "c": "Canada",
      "p": 7862,
      "a": []
    },
    {
      "n": "Flin Flon",
      "c": "Canada",
      "p": 6197.5,
      "a": []
    },
    {
      "n": "Norway House",
      "c": "Canada",
      "p": 5500,
      "a": []
    },
    {
      "n": "The Pas",
      "c": "Canada",
      "p": 4928.5,
      "a": []
    },
    {
      "n": "Sioux Lookout",
      "c": "Canada",
      "p": 4570,
      "a": []
    },
    {
      "n": "Deer Lake",
      "c": "Canada",
      "p": 3743,
      "a": []
    },
    {
      "n": "Nelson House",
      "c": "Canada",
      "p": 2500,
      "a": []
    },
    {
      "n": "Gimli",
      "c": "Canada",
      "p": 2316,
      "a": []
    },
    {
      "n": "Red Lake",
      "c": "Canada",
      "p": 1765,
      "a": []
    },
    {
      "n": "Gillam",
      "c": "Canada",
      "p": 1281,
      "a": []
    },
    {
      "n": "Churchill",
      "c": "Canada",
      "p": 961.5,
      "a": []
    },
    {
      "n": "Shamattawa",
      "c": "Canada",
      "p": 870,
      "a": []
    },
    {
      "n": "Berens River",
      "c": "Canada",
      "p": 522.5,
      "a": []
    },
    {
      "n": "Lynn Lake",
      "c": "Canada",
      "p": 482,
      "a": []
    },
    {
      "n": "Pukatawagan",
      "c": "Canada",
      "p": 431,
      "a": []
    },
    {
      "n": "Brochet",
      "c": "Canada",
      "p": 278,
      "a": []
    },
    {
      "n": "Cat Lake",
      "c": "Canada",
      "p": 277,
      "a": []
    },
    {
      "n": "Oxford House",
      "c": "Canada",
      "p": 184,
      "a": []
    },
    {
      "n": "Island Lake",
      "c": "Canada",
      "p": 10,
      "a": []
    },
    {
      "n": "Big Beaver House",
      "c": "Canada",
      "p": 10,
      "a": []
    }
  ],
  "America/Regina": [
    {
      "n": "Saskatoon",
      "c": "Canada",
      "p": 194075.5,
      "a": []
    },
    {
      "n": "Regina",
      "c": "Canada",
      "p": 176183,
      "a": []
    },
    {
      "n": "Moose Jaw",
      "c": "Canada",
      "p": 31436.5,
      "a": []
    },
    {
      "n": "Prince Albert",
      "c": "Canada",
      "p": 29643.5,
      "a": []
    },
    {
      "n": "North Battleford",
      "c": "Canada",
      "p": 15721.5,
      "a": []
    },
    {
      "n": "Swift Current",
      "c": "Canada",
      "p": 14804.5,
      "a": []
    },
    {
      "n": "Yorkton",
      "c": "Canada",
      "p": 14377.5,
      "a": []
    },
    {
      "n": "Weyburn",
      "c": "Canada",
      "p": 9302.5,
      "a": []
    },
    {
      "n": "Meadow Lake",
      "c": "Canada",
      "p": 5081.5,
      "a": []
    },
    {
      "n": "Kindersley",
      "c": "Canada",
      "p": 4316,
      "a": []
    },
    {
      "n": "Melville",
      "c": "Canada",
      "p": 4226,
      "a": []
    },
    {
      "n": "La Ronge",
      "c": "Canada",
      "p": 3427,
      "a": []
    },
    {
      "n": "Biggar",
      "c": "Canada",
      "p": 2130,
      "a": []
    },
    {
      "n": "Hudson Bay",
      "c": "Canada",
      "p": 1909,
      "a": []
    },
    {
      "n": "Stony Rapids",
      "c": "Canada",
      "p": 152,
      "a": []
    },
    {
      "n": "Uranium City",
      "c": "Canada",
      "p": 89,
      "a": []
    }
  ],
  "America/Edmonton": [
    {
      "n": "Calgary",
      "c": "Canada",
      "p": 1012661,
      "a": [
        "YYC"
      ]
    },
    {
      "n": "Edmonton",
      "c": "Canada",
      "p": 885195.5,
      "a": []
    },
    {
      "n": "Red Deer",
      "c": "Canada",
      "p": 74225,
      "a": []
    },
    {
      "n": "Lethbridge",
      "c": "Canada",
      "p": 64594,
      "a": []
    },
    {
      "n": "Medicine Hat",
      "c": "Canada",
      "p": 58382,
      "a": []
    },
    {
      "n": "Grand Prairie",
      "c": "Canada",
      "p": 41153.5,
      "a": []
    },
    {
      "n": "Fort McMurray",
      "c": "Canada",
      "p": 21863,
      "a": []
    },
    {
      "n": "Cranbrook",
      "c": "Canada",
      "p": 17990,
      "a": []
    },
    {
      "n": "Camrose",
      "c": "Canada",
      "p": 15747,
      "a": []
    },
    {
      "n": "Brooks",
      "c": "Canada",
      "p": 13453.5,
      "a": []
    },
    {
      "n": "Wetaskiwin",
      "c": "Canada",
      "p": 11562.5,
      "a": []
    },
    {
      "n": "Hinton",
      "c": "Canada",
      "p": 10077,
      "a": []
    },
    {
      "n": "Banff",
      "c": "Canada",
      "p": 6897,
      "a": []
    },
    {
      "n": "Vegreville",
      "c": "Canada",
      "p": 5745.5,
      "a": []
    },
    {
      "n": "Stettler",
      "c": "Canada",
      "p": 5449.5,
      "a": []
    },
    {
      "n": "Peace River",
      "c": "Canada",
      "p": 5014.5,
      "a": []
    },
    {
      "n": "Jasper",
      "c": "Canada",
      "p": 3504.5,
      "a": []
    },
    {
      "n": "Fort Chipewyan",
      "c": "Canada",
      "p": 3222,
      "a": []
    },
    {
      "n": "Lac La Biche",
      "c": "Canada",
      "p": 2952.5,
      "a": []
    },
    {
      "n": "Athabasca",
      "c": "Canada",
      "p": 2399.5,
      "a": []
    },
    {
      "n": "Lake Louise",
      "c": "Canada",
      "p": 1248,
      "a": []
    },
    {
      "n": "Meander River",
      "c": "Canada",
      "p": 200,
      "a": []
    }
  ],
  "America/Creston": [
    {
      "n": "Creston",
      "c": "Canada",
      "p": 4816,
      "a": []
    }
  ],
  "America/Vancouver": [
    {
      "n": "Vancouver",
      "c": "Canada",
      "p": 1458415,
      "a": [
        "YVR"
      ]
    },
    {
      "n": "Victoria",
      "c": "Canada",
      "p": 270491.5,
      "a": []
    },
    {
      "n": "Abbotsford",
      "c": "Canada",
      "p": 151683,
      "a": []
    },
    {
      "n": "Kelowna",
      "c": "Canada",
      "p": 110207.5,
      "a": []
    },
    {
      "n": "Nanaimo",
      "c": "Canada",
      "p": 82698,
      "a": []
    },
    {
      "n": "Kamloops",
      "c": "Canada",
      "p": 68671,
      "a": []
    },
    {
      "n": "Prince George",
      "c": "Canada",
      "p": 64132.5,
      "a": []
    },
    {
      "n": "Chilliwack",
      "c": "Canada",
      "p": 51942,
      "a": []
    },
    {
      "n": "Penticton",
      "c": "Canada",
      "p": 34035,
      "a": []
    },
    {
      "n": "Campbell River",
      "c": "Canada",
      "p": 29941.5,
      "a": []
    },
    {
      "n": "Courtenay",
      "c": "Canada",
      "p": 28946,
      "a": []
    },
    {
      "n": "Terrace",
      "c": "Canada",
      "p": 14772,
      "a": []
    },
    {
      "n": "Prince Rupert",
      "c": "Canada",
      "p": 14708,
      "a": []
    },
    {
      "n": "Quesnel",
      "c": "Canada",
      "p": 13788,
      "a": []
    },
    {
      "n": "Williams Lake",
      "c": "Canada",
      "p": 12361,
      "a": []
    },
    {
      "n": "Nelson",
      "c": "Canada",
      "p": 10796,
      "a": []
    },
    {
      "n": "Powell River",
      "c": "Canada",
      "p": 7999.5,
      "a": []
    },
    {
      "n": "Revelstoke",
      "c": "Canada",
      "p": 7600.5,
      "a": []
    },
    {
      "n": "Smithers",
      "c": "Canada",
      "p": 5841.5,
      "a": []
    },
    {
      "n": "Lillooet",
      "c": "Canada",
      "p": 2893,
      "a": []
    },
    {
      "n": "Burns Lake",
      "c": "Canada",
      "p": 2633,
      "a": []
    },
    {
      "n": "Port Hardy",
      "c": "Canada",
      "p": 2295,
      "a": []
    },
    {
      "n": "Tofino",
      "c": "Canada",
      "p": 1655,
      "a": []
    },
    {
      "n": "Bella Bella",
      "c": "Canada",
      "p": 1400,
      "a": []
    },
    {
      "n": "Sandspit",
      "c": "Canada",
      "p": 538,
      "a": []
    },
    {
      "n": "Dease Lake",
      "c": "Canada",
      "p": 303,
      "a": []
    }
  ],
  "America/Iqaluit": [
    {
      "n": "Iqaluit",
      "c": "Canada",
      "p": 6124,
      "a": []
    },
    {
      "n": "Igloolik",
      "c": "Canada",
      "p": 1612,
      "a": []
    },
    {
      "n": "Pond Inlet",
      "c": "Canada",
      "p": 1549,
      "a": []
    },
    {
      "n": "Cape Dorset",
      "c": "Canada",
      "p": 1326,
      "a": []
    },
    {
      "n": "Hall Beach",
      "c": "Canada",
      "p": 654,
      "a": []
    },
    {
      "n": "Kimmirut",
      "c": "Canada",
      "p": 385,
      "a": []
    },
    {
      "n": "Grise Fiord",
      "c": "Canada",
      "p": 23,
      "a": []
    }
  ],
  "America/Yellowknife": [
    {
      "n": "Yellowknife",
      "c": "Canada",
      "p": 18658.5,
      "a": []
    },
    {
      "n": "Hay River",
      "c": "Canada",
      "p": 3774,
      "a": []
    },
    {
      "n": "Fort McPherson",
      "c": "Canada",
      "p": 1069,
      "a": []
    },
    {
      "n": "Tuktoyaktuk",
      "c": "Canada",
      "p": 899.5,
      "a": []
    },
    {
      "n": "Norman Wells",
      "c": "Canada",
      "p": 650,
      "a": []
    },
    {
      "n": "Fort Good Hope",
      "c": "Canada",
      "p": 597,
      "a": []
    },
    {
      "n": "Fort Smith",
      "c": "Canada",
      "p": 518,
      "a": []
    },
    {
      "n": "Holman",
      "c": "Canada",
      "p": 449,
      "a": []
    },
    {
      "n": "Fort Resolution",
      "c": "Canada",
      "p": 448,
      "a": []
    },
    {
      "n": "Déline",
      "c": "Canada",
      "p": 393.5,
      "a": []
    },
    {
      "n": "Paulatuk",
      "c": "Canada",
      "p": 294,
      "a": []
    },
    {
      "n": "Fort Simpson",
      "c": "Canada",
      "p": 283,
      "a": []
    },
    {
      "n": "Tsiigehtchic",
      "c": "Canada",
      "p": 175,
      "a": []
    },
    {
      "n": "Lutselke",
      "c": "Canada",
      "p": 102,
      "a": []
    }
  ],
  "America/Toronto": [
    {
      "n": "Toronto",
      "c": "Canada",
      "p": 4573710.5,
      "a": [
        "YYZ"
      ]
    },
    {
      "n": "Ottawa",
      "c": "Canada",
      "p": 978564.5,
      "a": []
    },
    {
      "n": "Hamilton",
      "c": "Canada",
      "p": 620501,
      "a": []
    },
    {
      "n": "Kitchener",
      "c": "Canada",
      "p": 413056.5,
      "a": []
    },
    {
      "n": "Oshawa",
      "c": "Canada",
      "p": 349476,
      "a": []
    },
    {
      "n": "London",
      "c": "Canada",
      "p": 340900,
      "a": [
        "LON"
      ]
    },
    {
      "n": "Barrie",
      "c": "Canada",
      "p": 150886.5,
      "a": []
    },
    {
      "n": "Sudbury",
      "c": "Canada",
      "p": 119182,
      "a": []
    },
    {
      "n": "Sarnia",
      "c": "Canada",
      "p": 113585,
      "a": []
    },
    {
      "n": "Kingston",
      "c": "Canada",
      "p": 108297.5,
      "a": []
    },
    {
      "n": "Peterborough",
      "c": "Canada",
      "p": 79752,
      "a": []
    },
    {
      "n": "Cornwall",
      "c": "Canada",
      "p": 47601.5,
      "a": []
    },
    {
      "n": "North Bay",
      "c": "Canada",
      "p": 45988.5,
      "a": []
    },
    {
      "n": "Belleville",
      "c": "Canada",
      "p": 43990,
      "a": []
    },
    {
      "n": "Timmins",
      "c": "Canada",
      "p": 33937.5,
      "a": []
    },
    {
      "n": "Orillia",
      "c": "Canada",
      "p": 33830.5,
      "a": []
    },
    {
      "n": "Orangeville",
      "c": "Canada",
      "p": 30812,
      "a": []
    },
    {
      "n": "Brockville",
      "c": "Canada",
      "p": 25172,
      "a": []
    },
    {
      "n": "Owen Sound",
      "c": "Canada",
      "p": 22625,
      "a": []
    },
    {
      "n": "Kapuskasing",
      "c": "Canada",
      "p": 8732,
      "a": []
    },
    {
      "n": "Parry Sound",
      "c": "Canada",
      "p": 6787,
      "a": []
    },
    {
      "n": "New Liskeard",
      "c": "Canada",
      "p": 5203,
      "a": []
    },
    {
      "n": "Hearst",
      "c": "Canada",
      "p": 4894.5,
      "a": []
    },
    {
      "n": "Marathon",
      "c": "Canada",
      "p": 4627,
      "a": []
    },
    {
      "n": "Cochrane",
      "c": "Canada",
      "p": 4441,
      "a": []
    },
    {
      "n": "Chapleau",
      "c": "Canada",
      "p": 2663,
      "a": []
    },
    {
      "n": "Wiarton",
      "c": "Canada",
      "p": 2182,
      "a": []
    },
    {
      "n": "Wawa",
      "c": "Canada",
      "p": 2174,
      "a": []
    },
    {
      "n": "Attawapiskat",
      "c": "Canada",
      "p": 1802,
      "a": []
    },
    {
      "n": "Moosonee",
      "c": "Canada",
      "p": 1725,
      "a": []
    },
    {
      "n": "Little Current",
      "c": "Canada",
      "p": 1595,
      "a": []
    },
    {
      "n": "Thessalon",
      "c": "Canada",
      "p": 1416.5,
      "a": []
    },
    {
      "n": "Cobalt",
      "c": "Canada",
      "p": 1372,
      "a": []
    },
    {
      "n": "Geraldton",
      "c": "Canada",
      "p": 1290,
      "a": []
    },
    {
      "n": "Fort Severn",
      "c": "Canada",
      "p": 125,
      "a": []
    },
    {
      "n": "Lansdowne House",
      "c": "Canada",
      "p": 120,
      "a": []
    }
  ],
  "America/Montreal": [
    {
      "n": "Montréal",
      "c": "Canada",
      "p": 3017278,
      "a": []
    },
    {
      "n": "Québec",
      "c": "Canada",
      "p": 576386,
      "a": []
    },
    {
      "n": "Sherbrooke",
      "c": "Canada",
      "p": 134549.5,
      "a": []
    },
    {
      "n": "Trois-Rivières",
      "c": "Canada",
      "p": 118051,
      "a": []
    },
    {
      "n": "St.-Jerome",
      "c": "Canada",
      "p": 66693.5,
      "a": []
    },
    {
      "n": "Drummondville",
      "c": "Canada",
      "p": 56806,
      "a": []
    },
    {
      "n": "Chicoutimi",
      "c": "Canada",
      "p": 53940,
      "a": []
    },
    {
      "n": "Shawinigan",
      "c": "Canada",
      "p": 41751.5,
      "a": []
    },
    {
      "n": "Joliette",
      "c": "Canada",
      "p": 40066.5,
      "a": []
    },
    {
      "n": "Victoriaville",
      "c": "Canada",
      "p": 37963,
      "a": []
    },
    {
      "n": "Rimouski",
      "c": "Canada",
      "p": 35584,
      "a": []
    },
    {
      "n": "Saint-Georges",
      "c": "Canada",
      "p": 26149,
      "a": []
    },
    {
      "n": "Sept-Îles",
      "c": "Canada",
      "p": 25686,
      "a": []
    },
    {
      "n": "Rouyn-Noranda",
      "c": "Canada",
      "p": 24312.5,
      "a": []
    },
    {
      "n": "Val d'Or",
      "c": "Canada",
      "p": 20625,
      "a": []
    },
    {
      "n": "Riviere-du-Loup",
      "c": "Canada",
      "p": 16403,
      "a": []
    },
    {
      "n": "Pembroke",
      "c": "Canada",
      "p": 15551,
      "a": []
    },
    {
      "n": "Dolbeau",
      "c": "Canada",
      "p": 13126.5,
      "a": []
    },
    {
      "n": "Mont-Laurier",
      "c": "Canada",
      "p": 11642,
      "a": []
    },
    {
      "n": "Amos",
      "c": "Canada",
      "p": 10475.5,
      "a": []
    },
    {
      "n": "Baie-Comeau",
      "c": "Canada",
      "p": 8808,
      "a": []
    },
    {
      "n": "La Sarre",
      "c": "Canada",
      "p": 6366.5,
      "a": []
    },
    {
      "n": "Gaspe",
      "c": "Canada",
      "p": 3504,
      "a": []
    },
    {
      "n": "Mistassini",
      "c": "Canada",
      "p": 2645,
      "a": []
    },
    {
      "n": "Inukjuak",
      "c": "Canada",
      "p": 1597,
      "a": []
    },
    {
      "n": "Matagami",
      "c": "Canada",
      "p": 1574.5,
      "a": []
    },
    {
      "n": "Cap-Chat",
      "c": "Canada",
      "p": 1475,
      "a": []
    },
    {
      "n": "Kuujjuaq",
      "c": "Canada",
      "p": 1273,
      "a": []
    },
    {
      "n": "Kuujjuarapik",
      "c": "Canada",
      "p": 1243,
      "a": []
    },
    {
      "n": "Natashquan",
      "c": "Canada",
      "p": 722,
      "a": []
    },
    {
      "n": "Mingan",
      "c": "Canada",
      "p": 588,
      "a": []
    },
    {
      "n": "Kangirsuk",
      "c": "Canada",
      "p": 549,
      "a": []
    },
    {
      "n": "Schefferville",
      "c": "Canada",
      "p": 471,
      "a": []
    },
    {
      "n": "Eastmain",
      "c": "Canada",
      "p": 335,
      "a": []
    },
    {
      "n": "Radisson",
      "c": "Canada",
      "p": 270,
      "a": []
    },
    {
      "n": "Port-Menier",
      "c": "Canada",
      "p": 263,
      "a": []
    },
    {
      "n": "Ivugivik",
      "c": "Canada",
      "p": 156,
      "a": []
    },
    {
      "n": "Salluit",
      "c": "Canada",
      "p": 106,
      "a": []
    }
  ],
  "America/Blanc-Sablon": [
    {
      "n": "St-Augustin",
      "c": "Canada",
      "p": 3961,
      "a": []
    },
    {
      "n": "Chevery",
      "c": "Canada",
      "p": 284,
      "a": []
    }
  ],
  "America/Halifax": [
    {
      "n": "Halifax",
      "c": "Canada",
      "p": 290992.5,
      "a": []
    },
    {
      "n": "Charlottetown",
      "c": "Canada",
      "p": 36847.5,
      "a": []
    },
    {
      "n": "New Glasgow",
      "c": "Canada",
      "p": 19883.5,
      "a": []
    },
    {
      "n": "Amherst",
      "c": "Canada",
      "p": 8631.5,
      "a": []
    },
    {
      "n": "Yarmouth",
      "c": "Canada",
      "p": 7433,
      "a": []
    },
    {
      "n": "Antigonish",
      "c": "Canada",
      "p": 5871,
      "a": []
    },
    {
      "n": "Liverpool",
      "c": "Canada",
      "p": 4331,
      "a": []
    },
    {
      "n": "Windsor",
      "c": "Canada",
      "p": 3759,
      "a": []
    },
    {
      "n": "Digby",
      "c": "Canada",
      "p": 3000.5,
      "a": []
    },
    {
      "n": "Shelburne",
      "c": "Canada",
      "p": 2553,
      "a": []
    },
    {
      "n": "Baddeck",
      "c": "Canada",
      "p": 852,
      "a": []
    }
  ],
  "America/St_Johns": [
    {
      "n": "St. John’s",
      "c": "Canada",
      "p": 115325.5,
      "a": []
    },
    {
      "n": "Corner Brook",
      "c": "Canada",
      "p": 19742,
      "a": []
    },
    {
      "n": "Stephenville",
      "c": "Canada",
      "p": 6666,
      "a": []
    },
    {
      "n": "Deer Lake",
      "c": "Canada",
      "p": 3953,
      "a": []
    },
    {
      "n": "Gander",
      "c": "Canada",
      "p": 3345,
      "a": []
    },
    {
      "n": "Channel-Port aux Basques",
      "c": "Canada",
      "p": 3232,
      "a": []
    },
    {
      "n": "Argentia",
      "c": "Canada",
      "p": 1063,
      "a": []
    },
    {
      "n": "La Scie",
      "c": "Canada",
      "p": 817,
      "a": []
    },
    {
      "n": "Buchans",
      "c": "Canada",
      "p": 685,
      "a": []
    },
    {
      "n": "Trout River",
      "c": "Canada",
      "p": 452,
      "a": []
    },
    {
      "n": "Forteau",
      "c": "Canada",
      "p": 448,
      "a": []
    },
    {
      "n": "Trepassey",
      "c": "Canada",
      "p": 398,
      "a": []
    },
    {
      "n": "St. Anthony",
      "c": "Canada",
      "p": 224,
      "a": []
    },
    {
      "n": "Port Hope Simpson",
      "c": "Canada",
      "p": 197,
      "a": []
    }
  ],
  "America/Goose_Bay": [
    {
      "n": "Labrador City",
      "c": "Canada",
      "p": 8840,
      "a": []
    },
    {
      "n": "Happy Valley - Goose Bay",
      "c": "Canada",
      "p": 4309.5,
      "a": []
    },
    {
      "n": "Port Burwell",
      "c": "Canada",
      "p": 2762,
      "a": []
    },
    {
      "n": "Nain",
      "c": "Canada",
      "p": 1151,
      "a": []
    },
    {
      "n": "Cartwright",
      "c": "Canada",
      "p": 505,
      "a": []
    },
    {
      "n": "Hopedale",
      "c": "Canada",
      "p": 442,
      "a": []
    },
    {
      "n": "Rigolet",
      "c": "Canada",
      "p": 124,
      "a": []
    },
    {
      "n": "Churchill Falls",
      "c": "Canada",
      "p": 75,
      "a": []
    }
  ],
  "America/Dawson_Creek": [
    {
      "n": "Dawson Creek",
      "c": "Canada",
      "p": 10676.5,
      "a": []
    }
  ],
  "America/Coral_Harbour": [
    {
      "n": "Coral Harbour",
      "c": "Canada",
      "p": 834,
      "a": []
    }
  ],
  "America/Rankin_Inlet": [
    {
      "n": "Rankin Inlet",
      "c": "Canada",
      "p": 2403,
      "a": []
    },
    {
      "n": "Arviat",
      "c": "Canada",
      "p": 1868,
      "a": []
    },
    {
      "n": "Baker Lake",
      "c": "Canada",
      "p": 1584,
      "a": []
    },
    {
      "n": "Repulse Bay",
      "c": "Canada",
      "p": 874,
      "a": []
    },
    {
      "n": "Arctic Bay",
      "c": "Canada",
      "p": 604,
      "a": []
    },
    {
      "n": "Chesterfield Inlet",
      "c": "Canada",
      "p": 374,
      "a": []
    },
    {
      "n": "Ennadai",
      "c": "Canada",
      "p": 0,
      "a": []
    }
  ],
  "America/Whitehorse": [
    {
      "n": "Whitehorse",
      "c": "Canada",
      "p": 23274,
      "a": []
    },
    {
      "n": "Watson Lake",
      "c": "Canada",
      "p": 802,
      "a": []
    },
    {
      "n": "Burwash Landing",
      "c": "Canada",
      "p": 73,
      "a": []
    }
  ],
  "America/Nipigon": [
    {
      "n": "Nipigon",
      "c": "Canada",
      "p": 1204,
      "a": []
    }
  ],
  "America/Atikokan": [
    {
      "n": "Atikokan",
      "c": "Canada",
      "p": 3625,
      "a": []
    }
  ],
  "America/Moncton": [
    {
      "n": "Moncton",
      "c": "Canada",
      "p": 89051,
      "a": []
    },
    {
      "n": "Saint John",
      "c": "Canada",
      "p": 71153,
      "a": []
    },
    {
      "n": "Fredericton",
      "c": "Canada",
      "p": 44525,
      "a": []
    },
    {
      "n": "Edmundston",
      "c": "Canada",
      "p": 17894,
      "a": []
    },
    {
      "n": "Bathurst",
      "c": "Canada",
      "p": 5303.5,
      "a": []
    }
  ],
  "America/Pangnirtung": [
    {
      "n": "Pangnirtung",
      "c": "Canada",
      "p": 1320,
      "a": []
    },
    {
      "n": "Alert",
      "c": "Canada",
      "p": 97.5,
      "a": []
    }
  ],
  "America/Detroit": [
    {
      "n": "Detroit",
      "c": "United States of America",
      "p": 2526135,
      "a": []
    },
    {
      "n": "Grand Rapids",
      "c": "United States of America",
      "p": 361934.5,
      "a": []
    },
    {
      "n": "Windsor",
      "c": "Canada",
      "p": 265068.5,
      "a": []
    },
    {
      "n": "Flint",
      "c": "United States of America",
      "p": 206235,
      "a": []
    },
    {
      "n": "Lansing",
      "c": "United States of America",
      "p": 198821.5,
      "a": []
    },
    {
      "n": "Ann Arbor",
      "c": "United States of America",
      "p": 189893,
      "a": []
    },
    {
      "n": "Kalamazoo",
      "c": "United States of America",
      "p": 128759.5,
      "a": []
    },
    {
      "n": "Saginaw",
      "c": "United States of America",
      "p": 89457.5,
      "a": []
    },
    {
      "n": "Muskegon",
      "c": "United States of America",
      "p": 70644.5,
      "a": []
    },
    {
      "n": "Pontiac",
      "c": "United States of America",
      "p": 67994,
      "a": []
    },
    {
      "n": "Battle Creek",
      "c": "United States of America",
      "p": 62454,
      "a": []
    },
    {
      "n": "Bay City",
      "c": "United States of America",
      "p": 51558.5,
      "a": []
    },
    {
      "n": "Sault Ste. Marie",
      "c": "United States of America",
      "p": 50173.5,
      "a": []
    },
    {
      "n": "Benton Harbor",
      "c": "United States of America",
      "p": 34637.5,
      "a": []
    },
    {
      "n": "Traverse City",
      "c": "United States of America",
      "p": 28807,
      "a": []
    },
    {
      "n": "Marquette",
      "c": "United States of America",
      "p": 23711,
      "a": []
    },
    {
      "n": "Escanaba",
      "c": "United States of America",
      "p": 14970,
      "a": []
    },
    {
      "n": "Alpena",
      "c": "United States of America",
      "p": 14524,
      "a": []
    },
    {
      "n": "Cadillac",
      "c": "United States of America",
      "p": 12177.5,
      "a": []
    },
    {
      "n": "Hancock",
      "c": "United States of America",
      "p": 10322.5,
      "a": []
    },
    {
      "n": "Petoskey",
      "c": "United States of America",
      "p": 9424,
      "a": []
    }
  ],
  "America/Fort_Nelson": [
    {
      "n": "Fort Nelson",
      "c": "Canada",
      "p": 6315,
      "a": []
    }
  ],
  "America/Cambridge_Bay": [
    {
      "n": "Cambridge Bay",
      "c": "Canada",
      "p": 1477,
      "a": []
    },
    {
      "n": "Kugluktuk",
      "c": "Canada",
      "p": 1302,
      "a": []
    },
    {
      "n": "Gjoa Haven",
      "c": "Canada",
      "p": 1109,
      "a": []
    },
    {
      "n": "Taloyoak",
      "c": "Canada",
      "p": 774,
      "a": []
    }
  ],
  "America/Inuvik": [
    {
      "n": "Inuvik",
      "c": "Canada",
      "p": 3022,
      "a": []
    }
  ],
  "America/Dawson": [
    {
      "n": "Dawson City",
      "c": "Canada",
      "p": 1319,
      "a": []
    }
  ],
  "America/Glace_Bay": [
    {
      "n": "Sydney",
      "c": "Canada",
      "p": 37538,
      "a": [
        "SYD"
      ]
    }
  ],
  "America/Resolute": [
    {
      "n": "Resolute",
      "c": "Canada",
      "p": 239.5,
      "a": []
    }
  ],
  "America/Thunder_Bay": [
    {
      "n": "Thunder Bay",
      "c": "Canada",
      "p": 98354,
      "a": []
    }
  ],
  "Atlantic/Cape_Verde": [
    {
      "n": "Praia",
      "c": "Cape Verde",
      "p": 101111.5,
      "a": []
    },
    {
      "n": "Mindelo",
      "c": "Cape Verde",
      "p": 62962,
      "a": []
    }
  ],
  "America/Cayman": [
    {
      "n": "George Town",
      "c": "Cayman Islands",
      "p": 2770.5,
      "a": []
    }
  ],
  "Africa/Bangui": [
    {
      "n": "Bangui",
      "c": "Central African Republic",
      "p": 727348,
      "a": []
    },
    {
      "n": "Berberati",
      "c": "Central African Republic",
      "p": 60605,
      "a": []
    },
    {
      "n": "Bambari",
      "c": "Central African Republic",
      "p": 47322.5,
      "a": []
    },
    {
      "n": "Bossangoa",
      "c": "Central African Republic",
      "p": 45246,
      "a": []
    },
    {
      "n": "Mbaiki",
      "c": "Central African Republic",
      "p": 43566,
      "a": []
    },
    {
      "n": "Kaga Bandoro",
      "c": "Central African Republic",
      "p": 42673.5,
      "a": []
    },
    {
      "n": "Carnot",
      "c": "Central African Republic",
      "p": 32298,
      "a": []
    },
    {
      "n": "Bouar",
      "c": "Central African Republic",
      "p": 31476.5,
      "a": []
    },
    {
      "n": "Bangassou",
      "c": "Central African Republic",
      "p": 28601,
      "a": []
    },
    {
      "n": "Sibut",
      "c": "Central African Republic",
      "p": 26304.5,
      "a": []
    },
    {
      "n": "Bozoum",
      "c": "Central African Republic",
      "p": 25440.5,
      "a": []
    },
    {
      "n": "Nola",
      "c": "Central African Republic",
      "p": 25301,
      "a": []
    },
    {
      "n": "Bria",
      "c": "Central African Republic",
      "p": 24985.5,
      "a": []
    },
    {
      "n": "Mobaye",
      "c": "Central African Republic",
      "p": 19431,
      "a": []
    },
    {
      "n": "Zemio",
      "c": "Central African Republic",
      "p": 19239,
      "a": []
    },
    {
      "n": "Obo",
      "c": "Central African Republic",
      "p": 12837,
      "a": []
    },
    {
      "n": "Ndele",
      "c": "Central African Republic",
      "p": 7355.5,
      "a": []
    },
    {
      "n": "Bossembele",
      "c": "Central African Republic",
      "p": 7287,
      "a": []
    },
    {
      "n": "Birao",
      "c": "Central African Republic",
      "p": 5641,
      "a": []
    },
    {
      "n": "Ouadda",
      "c": "Central African Republic",
      "p": 3424.5,
      "a": []
    },
    {
      "n": "Yakossi",
      "c": "Central African Republic",
      "p": 409.5,
      "a": []
    }
  ],
  "Africa/Ndjamena": [
    {
      "n": "Ndjamena",
      "c": "Chad",
      "p": 835193.5,
      "a": []
    },
    {
      "n": "Moundou",
      "c": "Chad",
      "p": 145936,
      "a": []
    },
    {
      "n": "Sarh",
      "c": "Chad",
      "p": 135862,
      "a": []
    },
    {
      "n": "Abeche",
      "c": "Chad",
      "p": 116252.5,
      "a": []
    },
    {
      "n": "Bongor",
      "c": "Chad",
      "p": 112229.5,
      "a": []
    },
    {
      "n": "Kelo",
      "c": "Chad",
      "p": 69378.5,
      "a": []
    },
    {
      "n": "Am Timan",
      "c": "Chad",
      "p": 29664,
      "a": []
    },
    {
      "n": "Mongo",
      "c": "Chad",
      "p": 27763,
      "a": []
    },
    {
      "n": "Doba",
      "c": "Chad",
      "p": 26966.5,
      "a": []
    },
    {
      "n": "Ati",
      "c": "Chad",
      "p": 24723.5,
      "a": []
    },
    {
      "n": "Lai",
      "c": "Chad",
      "p": 19382,
      "a": []
    },
    {
      "n": "Pala",
      "c": "Chad",
      "p": 17835,
      "a": []
    },
    {
      "n": "Mao",
      "c": "Chad",
      "p": 15040,
      "a": []
    },
    {
      "n": "Faya Largeau",
      "c": "Chad",
      "p": 13400,
      "a": []
    },
    {
      "n": "Oum Hadjer",
      "c": "Chad",
      "p": 11582.5,
      "a": []
    },
    {
      "n": "Biltine",
      "c": "Chad",
      "p": 6682.5,
      "a": []
    },
    {
      "n": "Bol",
      "c": "Chad",
      "p": 3303,
      "a": []
    },
    {
      "n": "Fada",
      "c": "Chad",
      "p": 448,
      "a": []
    },
    {
      "n": "Zouar",
      "c": "Chad",
      "p": 204,
      "a": []
    }
  ],
  "America/Santiago": [
    {
      "n": "Santiago",
      "c": "Chile",
      "p": 2883305.5,
      "a": [
        "SCL"
      ]
    },
    {
      "n": "Concepcion",
      "c": "Chile",
      "p": 550864,
      "a": []
    },
    {
      "n": "Valparaiso",
      "c": "Chile",
      "p": 434969,
      "a": []
    },
    {
      "n": "Vina del Mar",
      "c": "Chile",
      "p": 399042.5,
      "a": []
    },
    {
      "n": "Antofagasta",
      "c": "Chile",
      "p": 295539,
      "a": []
    },
    {
      "n": "Talcahuano",
      "c": "Chile",
      "p": 270521,
      "a": []
    },
    {
      "n": "Temuco",
      "c": "Chile",
      "p": 252015,
      "a": []
    },
    {
      "n": "San Bernardo",
      "c": "Chile",
      "p": 243950,
      "a": []
    },
    {
      "n": "Iquique",
      "c": "Chile",
      "p": 223012,
      "a": []
    },
    {
      "n": "Rancagua",
      "c": "Chile",
      "p": 222981.5,
      "a": []
    },
    {
      "n": "Talca",
      "c": "Chile",
      "p": 186283.5,
      "a": []
    },
    {
      "n": "Arica",
      "c": "Chile",
      "p": 178446.5,
      "a": []
    },
    {
      "n": "Puerto Montt",
      "c": "Chile",
      "p": 167341.5,
      "a": []
    },
    {
      "n": "Coquimbo",
      "c": "Chile",
      "p": 159082.5,
      "a": []
    },
    {
      "n": "La Serena",
      "c": "Chile",
      "p": 151290,
      "a": []
    },
    {
      "n": "Chillan",
      "c": "Chile",
      "p": 149874,
      "a": []
    },
    {
      "n": "Valdivia",
      "c": "Chile",
      "p": 146509,
      "a": []
    },
    {
      "n": "Osorno",
      "c": "Chile",
      "p": 144952,
      "a": []
    },
    {
      "n": "Los Angeles",
      "c": "Chile",
      "p": 135334.5,
      "a": [
        "LA",
        "LAX"
      ]
    },
    {
      "n": "Calama",
      "c": "Chile",
      "p": 134336.5,
      "a": []
    },
    {
      "n": "Copiapo",
      "c": "Chile",
      "p": 117316.5,
      "a": []
    },
    {
      "n": "Curico",
      "c": "Chile",
      "p": 108074.5,
      "a": []
    },
    {
      "n": "Punta Arenas",
      "c": "Chile",
      "p": 106296,
      "a": []
    },
    {
      "n": "San Antonio",
      "c": "Chile",
      "p": 94971.5,
      "a": []
    },
    {
      "n": "Coronel",
      "c": "Chile",
      "p": 78594.5,
      "a": []
    },
    {
      "n": "Linares",
      "c": "Chile",
      "p": 75275,
      "a": []
    },
    {
      "n": "Quillota",
      "c": "Chile",
      "p": 73732.5,
      "a": []
    },
    {
      "n": "Ovalle",
      "c": "Chile",
      "p": 72984,
      "a": []
    },
    {
      "n": "San Fernando",
      "c": "Chile",
      "p": 60746,
      "a": []
    },
    {
      "n": "Los Andes",
      "c": "Chile",
      "p": 53135,
      "a": []
    },
    {
      "n": "San Felipe",
      "c": "Chile",
      "p": 49256.5,
      "a": []
    },
    {
      "n": "Coihaique",
      "c": "Chile",
      "p": 43221,
      "a": []
    },
    {
      "n": "Angol",
      "c": "Chile",
      "p": 38384.5,
      "a": []
    },
    {
      "n": "Vallenar",
      "c": "Chile",
      "p": 37876.5,
      "a": []
    },
    {
      "n": "Lota",
      "c": "Chile",
      "p": 32702,
      "a": []
    },
    {
      "n": "Constitucion",
      "c": "Chile",
      "p": 26902.5,
      "a": []
    },
    {
      "n": "La Ligua",
      "c": "Chile",
      "p": 25761,
      "a": []
    },
    {
      "n": "Castro",
      "c": "Chile",
      "p": 25184.5,
      "a": []
    },
    {
      "n": "Illapel",
      "c": "Chile",
      "p": 24578,
      "a": []
    },
    {
      "n": "Ancud",
      "c": "Chile",
      "p": 24241,
      "a": []
    },
    {
      "n": "Cauquenes",
      "c": "Chile",
      "p": 24155,
      "a": []
    },
    {
      "n": "La Union",
      "c": "Chile",
      "p": 22843,
      "a": []
    },
    {
      "n": "Tocopilla",
      "c": "Chile",
      "p": 22355.5,
      "a": []
    },
    {
      "n": "Curanilahue",
      "c": "Chile",
      "p": 22352.5,
      "a": []
    },
    {
      "n": "Puerto Varas",
      "c": "Chile",
      "p": 19569,
      "a": []
    },
    {
      "n": "Diego de Almagro",
      "c": "Chile",
      "p": 18137,
      "a": []
    },
    {
      "n": "Victoria",
      "c": "Chile",
      "p": 17989.5,
      "a": []
    },
    {
      "n": "Villarica",
      "c": "Chile",
      "p": 16818,
      "a": []
    },
    {
      "n": "Salamanca",
      "c": "Chile",
      "p": 16739.5,
      "a": []
    },
    {
      "n": "Lebu",
      "c": "Chile",
      "p": 16624.5,
      "a": []
    },
    {
      "n": "Chanaral",
      "c": "Chile",
      "p": 13543,
      "a": []
    },
    {
      "n": "Vicuna",
      "c": "Chile",
      "p": 13496,
      "a": []
    },
    {
      "n": "Nueva Imperial",
      "c": "Chile",
      "p": 13322.5,
      "a": []
    },
    {
      "n": "Rio Bueno",
      "c": "Chile",
      "p": 13059.5,
      "a": []
    },
    {
      "n": "Los Lagos",
      "c": "Chile",
      "p": 12813,
      "a": []
    },
    {
      "n": "Chuquicamata",
      "c": "Chile",
      "p": 11941,
      "a": []
    },
    {
      "n": "Pichilemu",
      "c": "Chile",
      "p": 11603,
      "a": []
    },
    {
      "n": "Collipulli",
      "c": "Chile",
      "p": 11307.5,
      "a": []
    },
    {
      "n": "Pozo Almonte",
      "c": "Chile",
      "p": 10830,
      "a": []
    },
    {
      "n": "Tierra Amarilla",
      "c": "Chile",
      "p": 10733,
      "a": []
    },
    {
      "n": "Puerto Natales",
      "c": "Chile",
      "p": 10393,
      "a": []
    },
    {
      "n": "Caldera",
      "c": "Chile",
      "p": 10259,
      "a": []
    },
    {
      "n": "Taltal",
      "c": "Chile",
      "p": 8947.5,
      "a": []
    },
    {
      "n": "Loncoche",
      "c": "Chile",
      "p": 8653.5,
      "a": []
    },
    {
      "n": "Carahue",
      "c": "Chile",
      "p": 8592,
      "a": []
    },
    {
      "n": "Lonquimay",
      "c": "Chile",
      "p": 8519.5,
      "a": []
    },
    {
      "n": "Puerto Aisen",
      "c": "Chile",
      "p": 8067,
      "a": []
    },
    {
      "n": "Quellon",
      "c": "Chile",
      "p": 7029,
      "a": []
    },
    {
      "n": "Calbuco",
      "c": "Chile",
      "p": 6933.5,
      "a": []
    },
    {
      "n": "Quirihue",
      "c": "Chile",
      "p": 6529,
      "a": []
    },
    {
      "n": "Combarbala",
      "c": "Chile",
      "p": 5134,
      "a": []
    },
    {
      "n": "Cochrane",
      "c": "Chile",
      "p": 4441,
      "a": []
    },
    {
      "n": "Santa Barbara",
      "c": "Chile",
      "p": 3494,
      "a": []
    },
    {
      "n": "Huasco",
      "c": "Chile",
      "p": 2558,
      "a": []
    },
    {
      "n": "Puerto Williams",
      "c": "Chile",
      "p": 2381,
      "a": []
    },
    {
      "n": "Maria Elena",
      "c": "Chile",
      "p": 2370,
      "a": []
    },
    {
      "n": "Tolten",
      "c": "Chile",
      "p": 2293,
      "a": []
    },
    {
      "n": "Mejillones",
      "c": "Chile",
      "p": 2041,
      "a": []
    },
    {
      "n": "Chonchi",
      "c": "Chile",
      "p": 381,
      "a": []
    },
    {
      "n": "Toconao",
      "c": "Chile",
      "p": 378,
      "a": []
    },
    {
      "n": "Rio Verde",
      "c": "Chile",
      "p": 358,
      "a": []
    },
    {
      "n": "Villa O'Higgins",
      "c": "Chile",
      "p": 175,
      "a": []
    },
    {
      "n": "Cuya",
      "c": "Chile",
      "p": 20,
      "a": []
    },
    {
      "n": "Lagunas",
      "c": "Chile",
      "p": 10,
      "a": []
    }
  ],
  "Asia/Urumqi": [
    {
      "n": "Urumqi",
      "c": "China",
      "p": 1829612.5,
      "a": []
    },
    {
      "n": "Maoming",
      "c": "China",
      "p": 1217715,
      "a": []
    },
    {
      "n": "Zhanjiang",
      "c": "China",
      "p": 1113895,
      "a": []
    },
    {
      "n": "Shihezi",
      "c": "China",
      "p": 572977,
      "a": []
    },
    {
      "n": "Yumen",
      "c": "China",
      "p": 233097,
      "a": []
    },
    {
      "n": "Hami",
      "c": "China",
      "p": 218960,
      "a": []
    },
    {
      "n": "Korla",
      "c": "China",
      "p": 192919,
      "a": []
    },
    {
      "n": "Turpan",
      "c": "China",
      "p": 178863.5,
      "a": []
    },
    {
      "n": "Lhasa",
      "c": "China",
      "p": 169160,
      "a": []
    },
    {
      "n": "Altay",
      "c": "China",
      "p": 140670.5,
      "a": []
    },
    {
      "n": "Dunhuang",
      "c": "China",
      "p": 139225,
      "a": []
    },
    {
      "n": "Karamay",
      "c": "China",
      "p": 108769,
      "a": []
    },
    {
      "n": "Golmud",
      "c": "China",
      "p": 107092,
      "a": []
    },
    {
      "n": "Chamdo",
      "c": "China",
      "p": 93140,
      "a": []
    },
    {
      "n": "Kuqa",
      "c": "China",
      "p": 89802,
      "a": []
    },
    {
      "n": "Koktokay",
      "c": "China",
      "p": 60000,
      "a": []
    },
    {
      "n": "Xigaze",
      "c": "China",
      "p": 59314.5,
      "a": []
    },
    {
      "n": "Tacheng",
      "c": "China",
      "p": 49796,
      "a": []
    },
    {
      "n": "Quiemo",
      "c": "China",
      "p": 32494,
      "a": []
    },
    {
      "n": "Anxi",
      "c": "China",
      "p": 17886,
      "a": []
    },
    {
      "n": "Jyekundo",
      "c": "China",
      "p": 16500,
      "a": []
    },
    {
      "n": "Gyangze",
      "c": "China",
      "p": 10000,
      "a": []
    },
    {
      "n": "Nagchu",
      "c": "China",
      "p": 2250,
      "a": []
    },
    {
      "n": "Nyingchi",
      "c": "China",
      "p": 55,
      "a": []
    },
    {
      "n": "Dulan",
      "c": "China",
      "p": 50,
      "a": []
    }
  ],
  "Asia/Chongqing": [
    {
      "n": "Chongqing",
      "c": "China",
      "p": 5214014,
      "a": []
    },
    {
      "n": "Chengdu",
      "c": "China",
      "p": 4036718.5,
      "a": []
    },
    {
      "n": "Xian",
      "c": "China",
      "p": 3617406,
      "a": []
    },
    {
      "n": "Hechi",
      "c": "China",
      "p": 3275189.5,
      "a": []
    },
    {
      "n": "Guiyang",
      "c": "China",
      "p": 2416816.5,
      "a": []
    },
    {
      "n": "Lanzhou",
      "c": "China",
      "p": 2282609,
      "a": []
    },
    {
      "n": "Nanchong",
      "c": "China",
      "p": 2174000,
      "a": []
    },
    {
      "n": "Kunming",
      "c": "China",
      "p": 1977337,
      "a": []
    },
    {
      "n": "Wanzhou",
      "c": "China",
      "p": 1680000,
      "a": []
    },
    {
      "n": "Haikou",
      "c": "China",
      "p": 1606808.5,
      "a": []
    },
    {
      "n": "Luzhou",
      "c": "China",
      "p": 1537000,
      "a": []
    },
    {
      "n": "Nanning",
      "c": "China",
      "p": 1485394,
      "a": []
    },
    {
      "n": "Liuzhou",
      "c": "China",
      "p": 1436030.5,
      "a": []
    },
    {
      "n": "Suining",
      "c": "China",
      "p": 1425000,
      "a": []
    },
    {
      "n": "Hohhot",
      "c": "China",
      "p": 1250238.5,
      "a": []
    },
    {
      "n": "Baotou",
      "c": "China",
      "p": 1229664.5,
      "a": []
    },
    {
      "n": "Xianyang",
      "c": "China",
      "p": 1126000,
      "a": []
    },
    {
      "n": "Ankang",
      "c": "China",
      "p": 1025000,
      "a": []
    },
    {
      "n": "Neijiang",
      "c": "China",
      "p": 1006427,
      "a": []
    },
    {
      "n": "Baoshan",
      "c": "China",
      "p": 925000,
      "a": []
    },
    {
      "n": "Xining",
      "c": "China",
      "p": 907765.5,
      "a": []
    },
    {
      "n": "Zigong",
      "c": "China",
      "p": 897480.5,
      "a": []
    },
    {
      "n": "Lupanshui",
      "c": "China",
      "p": 886256,
      "a": []
    },
    {
      "n": "Mianyang",
      "c": "China",
      "p": 830068,
      "a": []
    },
    {
      "n": "Guilin",
      "c": "China",
      "p": 818176,
      "a": []
    },
    {
      "n": "Baoji",
      "c": "China",
      "p": 800000,
      "a": []
    },
    {
      "n": "Yangjiang",
      "c": "China",
      "p": 751181.5,
      "a": []
    },
    {
      "n": "Zunyi",
      "c": "China",
      "p": 657646,
      "a": []
    },
    {
      "n": "Yinchuan",
      "c": "China",
      "p": 657614,
      "a": []
    },
    {
      "n": "Leshan",
      "c": "China",
      "p": 655738.5,
      "a": []
    },
    {
      "n": "Zhanyi",
      "c": "China",
      "p": 652604,
      "a": []
    },
    {
      "n": "Tianshui",
      "c": "China",
      "p": 649883.5,
      "a": []
    },
    {
      "n": "Yulin",
      "c": "China",
      "p": 637742.5,
      "a": []
    },
    {
      "n": "Anshun",
      "c": "China",
      "p": 600468,
      "a": []
    },
    {
      "n": "Yibin",
      "c": "China",
      "p": 572055.5,
      "a": []
    },
    {
      "n": "Beihai",
      "c": "China",
      "p": 567289,
      "a": []
    },
    {
      "n": "Xingyi",
      "c": "China",
      "p": 539536,
      "a": []
    },
    {
      "n": "Wuwei",
      "c": "China",
      "p": 493092,
      "a": []
    },
    {
      "n": "Zhaotang",
      "c": "China",
      "p": 459200,
      "a": []
    },
    {
      "n": "Panzhihua",
      "c": "China",
      "p": 446298,
      "a": []
    },
    {
      "n": "Linxia",
      "c": "China",
      "p": 368478.5,
      "a": []
    },
    {
      "n": "Longxi",
      "c": "China",
      "p": 355037,
      "a": []
    },
    {
      "n": "Wuzhou",
      "c": "China",
      "p": 354080.5,
      "a": []
    },
    {
      "n": "Yaan",
      "c": "China",
      "p": 340000,
      "a": []
    },
    {
      "n": "Guangyuan",
      "c": "China",
      "p": 325400,
      "a": []
    },
    {
      "n": "Mengzi",
      "c": "China",
      "p": 303341,
      "a": []
    },
    {
      "n": "Jining",
      "c": "China",
      "p": 270236.5,
      "a": []
    },
    {
      "n": "Chuxiong",
      "c": "China",
      "p": 254370,
      "a": []
    },
    {
      "n": "Sanya",
      "c": "China",
      "p": 253721,
      "a": []
    },
    {
      "n": "Xichang",
      "c": "China",
      "p": 253390,
      "a": []
    },
    {
      "n": "Tongchuan",
      "c": "China",
      "p": 252930.5,
      "a": []
    },
    {
      "n": "Yuxi",
      "c": "China",
      "p": 250077,
      "a": []
    },
    {
      "n": "Wuhai",
      "c": "China",
      "p": 218427,
      "a": []
    },
    {
      "n": "Qinzhou",
      "c": "China",
      "p": 173186,
      "a": []
    },
    {
      "n": "Weinan",
      "c": "China",
      "p": 172321,
      "a": []
    },
    {
      "n": "Zhangye",
      "c": "China",
      "p": 163478,
      "a": []
    },
    {
      "n": "Simao",
      "c": "China",
      "p": 162725,
      "a": []
    },
    {
      "n": "Pingliang",
      "c": "China",
      "p": 157706,
      "a": []
    },
    {
      "n": "Deyang",
      "c": "China",
      "p": 152194,
      "a": []
    },
    {
      "n": "Hanzhong",
      "c": "China",
      "p": 145986,
      "a": []
    },
    {
      "n": "Dali",
      "c": "China",
      "p": 145362.5,
      "a": []
    },
    {
      "n": "Gejiu",
      "c": "China",
      "p": 142620,
      "a": []
    },
    {
      "n": "Jinchang",
      "c": "China",
      "p": 141670,
      "a": []
    },
    {
      "n": "Hancheng",
      "c": "China",
      "p": 140092,
      "a": []
    },
    {
      "n": "Jiayuguan",
      "c": "China",
      "p": 135337.5,
      "a": []
    },
    {
      "n": "Bose",
      "c": "China",
      "p": 132942.5,
      "a": []
    },
    {
      "n": "Tengchong",
      "c": "China",
      "p": 126058,
      "a": []
    },
    {
      "n": "Yulin",
      "c": "China",
      "p": 123415,
      "a": []
    },
    {
      "n": "Shizuishan",
      "c": "China",
      "p": 109824,
      "a": []
    },
    {
      "n": "Dali",
      "c": "China",
      "p": 109696,
      "a": []
    },
    {
      "n": "Wenshan",
      "c": "China",
      "p": 108396,
      "a": []
    },
    {
      "n": "Tongren",
      "c": "China",
      "p": 104441.5,
      "a": []
    },
    {
      "n": "Fengzhen",
      "c": "China",
      "p": 85809,
      "a": []
    },
    {
      "n": "Minxian",
      "c": "China",
      "p": 67826,
      "a": []
    },
    {
      "n": "Langzhong",
      "c": "China",
      "p": 60542,
      "a": []
    },
    {
      "n": "Alxa Zuoqi",
      "c": "China",
      "p": 56387,
      "a": []
    },
    {
      "n": "Rongzhag",
      "c": "China",
      "p": 52500,
      "a": []
    },
    {
      "n": "Fengjie",
      "c": "China",
      "p": 49168,
      "a": []
    },
    {
      "n": "Yishan",
      "c": "China",
      "p": 47062,
      "a": []
    },
    {
      "n": "Hanggin Houqi",
      "c": "China",
      "p": 39954,
      "a": []
    },
    {
      "n": "Pingxiang",
      "c": "China",
      "p": 31109,
      "a": []
    },
    {
      "n": "Wuyuan",
      "c": "China",
      "p": 30057,
      "a": []
    },
    {
      "n": "Bayan Obo",
      "c": "China",
      "p": 27476,
      "a": []
    },
    {
      "n": "Wuchuan",
      "c": "China",
      "p": 23776,
      "a": []
    },
    {
      "n": "Shangdu",
      "c": "China",
      "p": 18831,
      "a": []
    },
    {
      "n": "Lijiang",
      "c": "China",
      "p": 18445,
      "a": []
    },
    {
      "n": "Guide",
      "c": "China",
      "p": 7642,
      "a": []
    },
    {
      "n": "Huize",
      "c": "China",
      "p": 5170,
      "a": []
    },
    {
      "n": "Fulin",
      "c": "China",
      "p": 1049,
      "a": []
    }
  ],
  "Asia/Shanghai": [
    {
      "n": "Shanghai",
      "c": "China",
      "p": 14797756,
      "a": [
        "SHA",
        "PVG"
      ]
    },
    {
      "n": "Beijing",
      "c": "China",
      "p": 9293300.5,
      "a": [
        "BEI",
        "PEK"
      ]
    },
    {
      "n": "Guangzhou",
      "c": "China",
      "p": 5990912.5,
      "a": []
    },
    {
      "n": "Wuhan",
      "c": "China",
      "p": 5713603,
      "a": []
    },
    {
      "n": "Tianjin",
      "c": "China",
      "p": 5473103.5,
      "a": []
    },
    {
      "n": "Dongguan",
      "c": "China",
      "p": 4528000,
      "a": []
    },
    {
      "n": "Shenzhen",
      "c": "China",
      "p": 4291796,
      "a": []
    },
    {
      "n": "Shenyeng",
      "c": "China",
      "p": 4149596,
      "a": []
    },
    {
      "n": "Nanjing",
      "c": "China",
      "p": 3383005,
      "a": []
    },
    {
      "n": "Taiyuan",
      "c": "China",
      "p": 2817737.5,
      "a": []
    },
    {
      "n": "Dalian",
      "c": "China",
      "p": 2601153.5,
      "a": []
    },
    {
      "n": "Hangzhou",
      "c": "China",
      "p": 2442564.5,
      "a": []
    },
    {
      "n": "Zhangzhou",
      "c": "China",
      "p": 2434799.5,
      "a": []
    },
    {
      "n": "Jinan",
      "c": "China",
      "p": 2433633,
      "a": []
    },
    {
      "n": "Changsha",
      "c": "China",
      "p": 2338969,
      "a": []
    },
    {
      "n": "Zhengzhou",
      "c": "China",
      "p": 2325062.5,
      "a": []
    },
    {
      "n": "Qingdao",
      "c": "China",
      "p": 2254122.5,
      "a": []
    },
    {
      "n": "Shijianzhuang",
      "c": "China",
      "p": 2204737,
      "a": []
    },
    {
      "n": "Xiangtan",
      "c": "China",
      "p": 2183454,
      "a": []
    },
    {
      "n": "Nanchang",
      "c": "China",
      "p": 2110675.5,
      "a": []
    },
    {
      "n": "Suzhou",
      "c": "China",
      "p": 1964000,
      "a": []
    },
    {
      "n": "Fuzhou",
      "c": "China",
      "p": 1892860,
      "a": []
    },
    {
      "n": "Zibo",
      "c": "China",
      "p": 1865385,
      "a": []
    },
    {
      "n": "Shuyang",
      "c": "China",
      "p": 1770000,
      "a": []
    },
    {
      "n": "Tangshan",
      "c": "China",
      "p": 1737974.5,
      "a": []
    },
    {
      "n": "Hefei",
      "c": "China",
      "p": 1711952,
      "a": []
    },
    {
      "n": "Xuzhou",
      "c": "China",
      "p": 1645096.5,
      "a": []
    },
    {
      "n": "Taian",
      "c": "China",
      "p": 1629000,
      "a": []
    },
    {
      "n": "Wenzhou",
      "c": "China",
      "p": 1607836,
      "a": []
    },
    {
      "n": "Luoyang",
      "c": "China",
      "p": 1552790.5,
      "a": []
    },
    {
      "n": "Xiamen",
      "c": "China",
      "p": 1548668.5,
      "a": []
    },
    {
      "n": "Suzhou",
      "c": "China",
      "p": 1496545.5,
      "a": []
    },
    {
      "n": "Handan",
      "c": "China",
      "p": 1494659,
      "a": []
    },
    {
      "n": "Shantou",
      "c": "China",
      "p": 1467486.5,
      "a": []
    },
    {
      "n": "Datong",
      "c": "China",
      "p": 1462839,
      "a": []
    },
    {
      "n": "Fushun",
      "c": "China",
      "p": 1435323,
      "a": []
    },
    {
      "n": "Wuxi",
      "c": "China",
      "p": 1428823.5,
      "a": []
    },
    {
      "n": "Anshan",
      "c": "China",
      "p": 1419137.5,
      "a": []
    },
    {
      "n": "Yantai",
      "c": "China",
      "p": 1417666,
      "a": []
    },
    {
      "n": "Xinyang",
      "c": "China",
      "p": 1411944,
      "a": []
    },
    {
      "n": "Luan",
      "c": "China",
      "p": 1408227.5,
      "a": []
    },
    {
      "n": "Jinxi",
      "c": "China",
      "p": 1369623.5,
      "a": []
    },
    {
      "n": "Ningbo",
      "c": "China",
      "p": 1321433.5,
      "a": []
    },
    {
      "n": "Huainan",
      "c": "China",
      "p": 1239327.5,
      "a": []
    },
    {
      "n": "Ganzhou",
      "c": "China",
      "p": 1216134.5,
      "a": []
    },
    {
      "n": "Linyi",
      "c": "China",
      "p": 1176334.5,
      "a": []
    },
    {
      "n": "Zaozhuang",
      "c": "China",
      "p": 1164332.5,
      "a": []
    },
    {
      "n": "Changzhou",
      "c": "China",
      "p": 1138009,
      "a": []
    },
    {
      "n": "Nanyang",
      "c": "China",
      "p": 1097766,
      "a": []
    },
    {
      "n": "Baoding",
      "c": "China",
      "p": 1051326,
      "a": []
    },
    {
      "n": "Zhuhai",
      "c": "China",
      "p": 1023000,
      "a": []
    },
    {
      "n": "Maanshan",
      "c": "China",
      "p": 1000121,
      "a": []
    },
    {
      "n": "Changde",
      "c": "China",
      "p": 993390,
      "a": []
    },
    {
      "n": "Yichun",
      "c": "China",
      "p": 982000,
      "a": []
    },
    {
      "n": "Weifang",
      "c": "China",
      "p": 973866,
      "a": []
    },
    {
      "n": "Shangqiu",
      "c": "China",
      "p": 967109,
      "a": []
    },
    {
      "n": "Xinyi",
      "c": "China",
      "p": 962656,
      "a": []
    },
    {
      "n": "Jianmen",
      "c": "China",
      "p": 937875,
      "a": []
    },
    {
      "n": "Benxi",
      "c": "China",
      "p": 923933,
      "a": []
    },
    {
      "n": "Shangrao",
      "c": "China",
      "p": 922421.5,
      "a": []
    },
    {
      "n": "Huaiyin",
      "c": "China",
      "p": 909615,
      "a": []
    },
    {
      "n": "Huaibei",
      "c": "China",
      "p": 908019.5,
      "a": []
    },
    {
      "n": "Xiantao",
      "c": "China",
      "p": 897703,
      "a": []
    },
    {
      "n": "Zhuzhou",
      "c": "China",
      "p": 894679,
      "a": []
    },
    {
      "n": "Hengyang",
      "c": "China",
      "p": 887801,
      "a": []
    },
    {
      "n": "Zhucheng",
      "c": "China",
      "p": 881963.5,
      "a": []
    },
    {
      "n": "Qinhuangdao",
      "c": "China",
      "p": 881359,
      "a": []
    },
    {
      "n": "Kaifeng",
      "c": "China",
      "p": 872000,
      "a": []
    },
    {
      "n": "Xuanzhou",
      "c": "China",
      "p": 866000,
      "a": []
    },
    {
      "n": "Yangquan",
      "c": "China",
      "p": 851801.5,
      "a": []
    },
    {
      "n": "Pingdingshan",
      "c": "China",
      "p": 849000,
      "a": []
    },
    {
      "n": "Yancheng",
      "c": "China",
      "p": 839000,
      "a": []
    },
    {
      "n": "Anyang",
      "c": "China",
      "p": 834064.5,
      "a": []
    },
    {
      "n": "Yueyang",
      "c": "China",
      "p": 826000,
      "a": []
    },
    {
      "n": "Quanzhou",
      "c": "China",
      "p": 823571.5,
      "a": []
    },
    {
      "n": "Xinxiang",
      "c": "China",
      "p": 823300.5,
      "a": []
    },
    {
      "n": "Jining",
      "c": "China",
      "p": 818163.5,
      "a": []
    },
    {
      "n": "Chifeng",
      "c": "China",
      "p": 811827,
      "a": []
    },
    {
      "n": "Nantong",
      "c": "China",
      "p": 806625.5,
      "a": []
    },
    {
      "n": "Lingyuan",
      "c": "China",
      "p": 806000,
      "a": []
    },
    {
      "n": "Zhangjiakou",
      "c": "China",
      "p": 802820.5,
      "a": []
    },
    {
      "n": "Heze",
      "c": "China",
      "p": 796301,
      "a": []
    },
    {
      "n": "Foshan",
      "c": "China",
      "p": 785174,
      "a": []
    },
    {
      "n": "Jinzhou",
      "c": "China",
      "p": 780134.5,
      "a": []
    },
    {
      "n": "Yiyang",
      "c": "China",
      "p": 777304,
      "a": []
    },
    {
      "n": "Fuyang",
      "c": "China",
      "p": 771000,
      "a": []
    },
    {
      "n": "Xiangfan",
      "c": "China",
      "p": 765978,
      "a": []
    },
    {
      "n": "Dandong",
      "c": "China",
      "p": 750986.5,
      "a": []
    },
    {
      "n": "Zhenjiang",
      "c": "China",
      "p": 743276,
      "a": []
    },
    {
      "n": "Liaoyang",
      "c": "China",
      "p": 740945,
      "a": []
    },
    {
      "n": "Bengbu",
      "c": "China",
      "p": 735324,
      "a": []
    },
    {
      "n": "Fuxin",
      "c": "China",
      "p": 729525,
      "a": []
    },
    {
      "n": "Jiaxing",
      "c": "China",
      "p": 727050.5,
      "a": []
    },
    {
      "n": "Lianyungang",
      "c": "China",
      "p": 715600,
      "a": []
    },
    {
      "n": "Qingyuan",
      "c": "China",
      "p": 706717,
      "a": []
    },
    {
      "n": "Changzhi",
      "c": "China",
      "p": 706000,
      "a": []
    },
    {
      "n": "Yongzhou",
      "c": "China",
      "p": 700180.5,
      "a": []
    },
    {
      "n": "Huzhou",
      "c": "China",
      "p": 694660,
      "a": []
    },
    {
      "n": "Langfang",
      "c": "China",
      "p": 694465.5,
      "a": []
    },
    {
      "n": "Yingkow",
      "c": "China",
      "p": 693079.5,
      "a": []
    }
  ],
  "Asia/Harbin": [
    {
      "n": "Harbin",
      "c": "China",
      "p": 3425441.5,
      "a": []
    },
    {
      "n": "Changchun",
      "c": "China",
      "p": 2860210.5,
      "a": []
    },
    {
      "n": "Jilin",
      "c": "China",
      "p": 2138988.5,
      "a": []
    },
    {
      "n": "Qiqihar",
      "c": "China",
      "p": 1261682,
      "a": []
    },
    {
      "n": "Mudangiang",
      "c": "China",
      "p": 954957.5,
      "a": []
    },
    {
      "n": "Daqing",
      "c": "China",
      "p": 948244,
      "a": []
    },
    {
      "n": "Jiamusi",
      "c": "China",
      "p": 784774.5,
      "a": []
    },
    {
      "n": "Jixi",
      "c": "China",
      "p": 684379.5,
      "a": []
    },
    {
      "n": "Hegang",
      "c": "China",
      "p": 657833.5,
      "a": []
    },
    {
      "n": "Siping",
      "c": "China",
      "p": 528811,
      "a": []
    },
    {
      "n": "Shuangyashan",
      "c": "China",
      "p": 500000,
      "a": []
    },
    {
      "n": "Liaoyuan",
      "c": "China",
      "p": 485898.5,
      "a": []
    },
    {
      "n": "Yichun",
      "c": "China",
      "p": 443111.5,
      "a": []
    },
    {
      "n": "Yanji",
      "c": "China",
      "p": 407848.5,
      "a": []
    },
    {
      "n": "Qitaihe",
      "c": "China",
      "p": 397825,
      "a": []
    },
    {
      "n": "Baicheng",
      "c": "China",
      "p": 351915.5,
      "a": []
    },
    {
      "n": "Baishan",
      "c": "China",
      "p": 330000,
      "a": []
    },
    {
      "n": "Hulan Ergi",
      "c": "China",
      "p": 277671.5,
      "a": []
    },
    {
      "n": "Suihua",
      "c": "China",
      "p": 250903,
      "a": []
    },
    {
      "n": "Fuyu",
      "c": "China",
      "p": 247804.5,
      "a": []
    },
    {
      "n": "Jiutai",
      "c": "China",
      "p": 190257,
      "a": []
    },
    {
      "n": "Anda",
      "c": "China",
      "p": 181402,
      "a": []
    },
    {
      "n": "Dunhua",
      "c": "China",
      "p": 170357,
      "a": []
    },
    {
      "n": "Zhaodong",
      "c": "China",
      "p": 167193,
      "a": []
    },
    {
      "n": "Beian",
      "c": "China",
      "p": 154936,
      "a": []
    },
    {
      "n": "Nongan",
      "c": "China",
      "p": 141482,
      "a": []
    },
    {
      "n": "Shuangcheng",
      "c": "China",
      "p": 118525,
      "a": []
    },
    {
      "n": "Taonan",
      "c": "China",
      "p": 114715,
      "a": []
    },
    {
      "n": "Tieli",
      "c": "China",
      "p": 109228.5,
      "a": []
    },
    {
      "n": "Hailun",
      "c": "China",
      "p": 104848.5,
      "a": []
    },
    {
      "n": "Nancha",
      "c": "China",
      "p": 104570.5,
      "a": []
    },
    {
      "n": "Jiaohe",
      "c": "China",
      "p": 90420,
      "a": []
    },
    {
      "n": "Shangzhi",
      "c": "China",
      "p": 89699.5,
      "a": []
    },
    {
      "n": "Tumen",
      "c": "China",
      "p": 89220,
      "a": []
    },
    {
      "n": "Longjiang",
      "c": "China",
      "p": 87115,
      "a": []
    },
    {
      "n": "Daan",
      "c": "China",
      "p": 84795.5,
      "a": []
    },
    {
      "n": "Boli",
      "c": "China",
      "p": 83317,
      "a": []
    },
    {
      "n": "Panshi",
      "c": "China",
      "p": 83208,
      "a": []
    },
    {
      "n": "Helong",
      "c": "China",
      "p": 83032.5,
      "a": []
    },
    {
      "n": "Mishan",
      "c": "China",
      "p": 80459,
      "a": []
    },
    {
      "n": "Fujin",
      "c": "China",
      "p": 80092.5,
      "a": []
    },
    {
      "n": "Wangqing",
      "c": "China",
      "p": 79825,
      "a": []
    },
    {
      "n": "Nenjiang",
      "c": "China",
      "p": 79685,
      "a": []
    },
    {
      "n": "Shulan",
      "c": "China",
      "p": 78092,
      "a": []
    },
    {
      "n": "Linjiang",
      "c": "China",
      "p": 76732,
      "a": []
    },
    {
      "n": "Nehe",
      "c": "China",
      "p": 74937.5,
      "a": []
    },
    {
      "n": "Keshan",
      "c": "China",
      "p": 72403,
      "a": []
    },
    {
      "n": "Tailai",
      "c": "China",
      "p": 71307.5,
      "a": []
    },
    {
      "n": "Liuhe",
      "c": "China",
      "p": 67956.5,
      "a": []
    },
    {
      "n": "Lanxi",
      "c": "China",
      "p": 67011,
      "a": []
    },
    {
      "n": "Linkou",
      "c": "China",
      "p": 66426.5,
      "a": []
    },
    {
      "n": "Qinggang",
      "c": "China",
      "p": 60955,
      "a": []
    },
    {
      "n": "Suileng",
      "c": "China",
      "p": 57456.5,
      "a": []
    },
    {
      "n": "Heihe",
      "c": "China",
      "p": 54923,
      "a": []
    },
    {
      "n": "Ningan",
      "c": "China",
      "p": 54636,
      "a": []
    },
    {
      "n": "Qingan",
      "c": "China",
      "p": 53206,
      "a": []
    },
    {
      "n": "Baiquan",
      "c": "China",
      "p": 52679.5,
      "a": []
    },
    {
      "n": "Gannan",
      "c": "China",
      "p": 46854.5,
      "a": []
    },
    {
      "n": "Changling",
      "c": "China",
      "p": 46703.5,
      "a": []
    },
    {
      "n": "Huinan",
      "c": "China",
      "p": 43261.5,
      "a": []
    },
    {
      "n": "Xinqing",
      "c": "China",
      "p": 42617.5,
      "a": []
    },
    {
      "n": "Hulin",
      "c": "China",
      "p": 42559,
      "a": []
    },
    {
      "n": "Yian",
      "c": "China",
      "p": 39924,
      "a": []
    },
    {
      "n": "Tonghua",
      "c": "China",
      "p": 27227,
      "a": []
    },
    {
      "n": "Angangxi",
      "c": "China",
      "p": 24317,
      "a": []
    }
  ],
  "Asia/Kashgar": [
    {
      "n": "Kashgar",
      "c": "China",
      "p": 472069.5,
      "a": []
    },
    {
      "n": "Yining",
      "c": "China",
      "p": 403489,
      "a": []
    },
    {
      "n": "Aksu",
      "c": "China",
      "p": 309704.5,
      "a": []
    },
    {
      "n": "Shache",
      "c": "China",
      "p": 282391.5,
      "a": []
    },
    {
      "n": "Hotan",
      "c": "China",
      "p": 187865,
      "a": []
    },
    {
      "n": "Gar",
      "c": "China",
      "p": 5250,
      "a": []
    }
  ],
  "America/Bogota": [
    {
      "n": "Bogota",
      "c": "Colombia",
      "p": 7052830.5,
      "a": []
    },
    {
      "n": "Medellin",
      "c": "Colombia",
      "p": 2648489.5,
      "a": []
    },
    {
      "n": "Cali",
      "c": "Colombia",
      "p": 2216418,
      "a": []
    },
    {
      "n": "Barranquilla",
      "c": "Colombia",
      "p": 1521245.5,
      "a": []
    },
    {
      "n": "Cartagena",
      "c": "Colombia",
      "p": 887000,
      "a": []
    },
    {
      "n": "Bucaramanga",
      "c": "Colombia",
      "p": 790410,
      "a": []
    },
    {
      "n": "Cucuta",
      "c": "Colombia",
      "p": 721772,
      "a": []
    },
    {
      "n": "Soledad",
      "c": "Colombia",
      "p": 520704,
      "a": []
    },
    {
      "n": "Pereira",
      "c": "Colombia",
      "p": 504434,
      "a": []
    },
    {
      "n": "Bello",
      "c": "Colombia",
      "p": 456304.5,
      "a": []
    },
    {
      "n": "Santa Marta",
      "c": "Colombia",
      "p": 417211,
      "a": []
    },
    {
      "n": "Ibague",
      "c": "Colombia",
      "p": 415156,
      "a": []
    },
    {
      "n": "Pasto",
      "c": "Colombia",
      "p": 371138.5,
      "a": []
    },
    {
      "n": "Manizales",
      "c": "Colombia",
      "p": 366831,
      "a": []
    },
    {
      "n": "Villavicencio",
      "c": "Colombia",
      "p": 348240,
      "a": []
    },
    {
      "n": "Neiva",
      "c": "Colombia",
      "p": 318566,
      "a": []
    },
    {
      "n": "Armenia",
      "c": "Colombia",
      "p": 314797.5,
      "a": []
    },
    {
      "n": "Valledupar",
      "c": "Colombia",
      "p": 297627.5,
      "a": []
    },
    {
      "n": "Monteria",
      "c": "Colombia",
      "p": 273809,
      "a": []
    },
    {
      "n": "Popayan",
      "c": "Colombia",
      "p": 258750,
      "a": []
    },
    {
      "n": "Buenaventura",
      "c": "Colombia",
      "p": 246596,
      "a": []
    },
    {
      "n": "Sincelejo",
      "c": "Colombia",
      "p": 239787.5,
      "a": []
    },
    {
      "n": "Barrancabermeja",
      "c": "Colombia",
      "p": 177802,
      "a": []
    },
    {
      "n": "Tulua",
      "c": "Colombia",
      "p": 164281.5,
      "a": []
    },
    {
      "n": "Tunja",
      "c": "Colombia",
      "p": 139445.5,
      "a": []
    },
    {
      "n": "Cartago",
      "c": "Colombia",
      "p": 123170,
      "a": []
    },
    {
      "n": "Girardot",
      "c": "Colombia",
      "p": 121830.5,
      "a": []
    },
    {
      "n": "Sogamoso",
      "c": "Colombia",
      "p": 120071.5,
      "a": []
    },
    {
      "n": "Riohacha",
      "c": "Colombia",
      "p": 112808.5,
      "a": []
    },
    {
      "n": "Cienaga",
      "c": "Colombia",
      "p": 109741,
      "a": []
    },
    {
      "n": "Duitama",
      "c": "Colombia",
      "p": 96598,
      "a": []
    },
    {
      "n": "Magangue",
      "c": "Colombia",
      "p": 94912,
      "a": []
    },
    {
      "n": "Ipiales",
      "c": "Colombia",
      "p": 93673.5,
      "a": []
    },
    {
      "n": "Florencia",
      "c": "Colombia",
      "p": 87599,
      "a": []
    },
    {
      "n": "Tumaco",
      "c": "Colombia",
      "p": 86713,
      "a": []
    },
    {
      "n": "Quibdo",
      "c": "Colombia",
      "p": 83942,
      "a": []
    },
    {
      "n": "Ocana",
      "c": "Colombia",
      "p": 83401.5,
      "a": []
    },
    {
      "n": "Sabanalarga",
      "c": "Colombia",
      "p": 65781,
      "a": []
    },
    {
      "n": "Yopal",
      "c": "Colombia",
      "p": 61029,
      "a": []
    },
    {
      "n": "San Andres",
      "c": "Colombia",
      "p": 58257,
      "a": []
    },
    {
      "n": "El Carmen de Bolivar",
      "c": "Colombia",
      "p": 54468.5,
      "a": []
    },
    {
      "n": "Pamplona",
      "c": "Colombia",
      "p": 52917,
      "a": []
    },
    {
      "n": "Chiquinquira",
      "c": "Colombia",
      "p": 49634.5,
      "a": []
    },
    {
      "n": "Arjona",
      "c": "Colombia",
      "p": 47225,
      "a": []
    },
    {
      "n": "Lorica",
      "c": "Colombia",
      "p": 46688,
      "a": []
    },
    {
      "n": "Arauca",
      "c": "Colombia",
      "p": 46530.5,
      "a": []
    },
    {
      "n": "Leticia",
      "c": "Colombia",
      "p": 46012.5,
      "a": []
    },
    {
      "n": "Garzon",
      "c": "Colombia",
      "p": 43027,
      "a": []
    },
    {
      "n": "Turbo",
      "c": "Colombia",
      "p": 42257.5,
      "a": []
    },
    {
      "n": "El Banco",
      "c": "Colombia",
      "p": 39628.5,
      "a": []
    },
    {
      "n": "Yarumal",
      "c": "Colombia",
      "p": 35315,
      "a": []
    },
    {
      "n": "Puerto Berrio",
      "c": "Colombia",
      "p": 33194,
      "a": []
    },
    {
      "n": "Honda",
      "c": "Colombia",
      "p": 31813.5,
      "a": []
    },
    {
      "n": "Tuquerres",
      "c": "Colombia",
      "p": 27081.5,
      "a": []
    },
    {
      "n": "Tame",
      "c": "Colombia",
      "p": 25030,
      "a": []
    },
    {
      "n": "Ayapel",
      "c": "Colombia",
      "p": 23120.5,
      "a": []
    },
    {
      "n": "Mocoa",
      "c": "Colombia",
      "p": 22035,
      "a": []
    },
    {
      "n": "San Jose del Guaviare",
      "c": "Colombia",
      "p": 21675,
      "a": []
    },
    {
      "n": "Socorro",
      "c": "Colombia",
      "p": 21323.5,
      "a": []
    },
    {
      "n": "Tolu",
      "c": "Colombia",
      "p": 19719.5,
      "a": []
    },
    {
      "n": "Sonson",
      "c": "Colombia",
      "p": 18024.5,
      "a": []
    },
    {
      "n": "Campoalegre",
      "c": "Colombia",
      "p": 17058.5,
      "a": []
    },
    {
      "n": "Guapi",
      "c": "Colombia",
      "p": 13853,
      "a": []
    },
    {
      "n": "San Martin",
      "c": "Colombia",
      "p": 12304,
      "a": []
    },
    {
      "n": "Puerto Lopez",
      "c": "Colombia",
      "p": 12163.5,
      "a": []
    },
    {
      "n": "Obando",
      "c": "Colombia",
      "p": 8181.5,
      "a": []
    },
    {
      "n": "Puerto Carreno",
      "c": "Colombia",
      "p": 8038.5,
      "a": []
    },
    {
      "n": "Mitu",
      "c": "Colombia",
      "p": 5917,
      "a": []
    },
    {
      "n": "Jurado",
      "c": "Colombia",
      "p": 2351,
      "a": []
    },
    {
      "n": "Orocue",
      "c": "Colombia",
      "p": 2126.5,
      "a": []
    },
    {
      "n": "Nuqui",
      "c": "Colombia",
      "p": 1487,
      "a": []
    },
    {
      "n": "San Vicente del Caguan",
      "c": "Colombia",
      "p": 1250,
      "a": []
    }
  ],
  "Indian/Comoro": [
    {
      "n": "Moroni",
      "c": "Comoros",
      "p": 85785,
      "a": []
    }
  ],
  "Africa/Brazzaville": [
    {
      "n": "Brazzaville",
      "c": "Congo (Brazzaville)",
      "p": 1259445,
      "a": []
    },
    {
      "n": "Pointe-Noire",
      "c": "Congo (Brazzaville)",
      "p": 602440.5,
      "a": []
    },
    {
      "n": "Loubomo",
      "c": "Congo (Brazzaville)",
      "p": 97929.5,
      "a": []
    },
    {
      "n": "Kayes",
      "c": "Congo (Brazzaville)",
      "p": 60629,
      "a": []
    },
    {
      "n": "Owando",
      "c": "Congo (Brazzaville)",
      "p": 29011,
      "a": []
    },
    {
      "n": "Ouesso",
      "c": "Congo (Brazzaville)",
      "p": 26117.5,
      "a": []
    },
    {
      "n": "Mossendjo",
      "c": "Congo (Brazzaville)",
      "p": 24583.5,
      "a": []
    },
    {
      "n": "Madingou",
      "c": "Congo (Brazzaville)",
      "p": 22760,
      "a": []
    },
    {
      "n": "Sibiti",
      "c": "Congo (Brazzaville)",
      "p": 20950,
      "a": []
    },
    {
      "n": "Gamboma",
      "c": "Congo (Brazzaville)",
      "p": 20877,
      "a": []
    },
    {
      "n": "Impfondo",
      "c": "Congo (Brazzaville)",
      "p": 20859,
      "a": []
    },
    {
      "n": "Kinkala",
      "c": "Congo (Brazzaville)",
      "p": 13882,
      "a": []
    },
    {
      "n": "Moloundou",
      "c": "Congo (Brazzaville)",
      "p": 12244,
      "a": []
    },
    {
      "n": "Makoua",
      "c": "Congo (Brazzaville)",
      "p": 10335,
      "a": []
    },
    {
      "n": "Djambala",
      "c": "Congo (Brazzaville)",
      "p": 9650.5,
      "a": []
    },
    {
      "n": "Ewo",
      "c": "Congo (Brazzaville)",
      "p": 7786.5,
      "a": []
    },
    {
      "n": "Sembe",
      "c": "Congo (Brazzaville)",
      "p": 6396,
      "a": []
    }
  ],
  "Africa/Lubumbashi": [
    {
      "n": "Lubumbashi",
      "c": "Congo (Kinshasa)",
      "p": 1114317,
      "a": []
    },
    {
      "n": "Mbuji-Mayi",
      "c": "Congo (Kinshasa)",
      "p": 1084880.5,
      "a": []
    },
    {
      "n": "Kananga",
      "c": "Congo (Kinshasa)",
      "p": 614273,
      "a": []
    },
    {
      "n": "Kisangani",
      "c": "Congo (Kinshasa)",
      "p": 558814,
      "a": []
    },
    {
      "n": "Likasi",
      "c": "Congo (Kinshasa)",
      "p": 428411,
      "a": []
    },
    {
      "n": "Kolwezi",
      "c": "Congo (Kinshasa)",
      "p": 418000,
      "a": []
    },
    {
      "n": "Bukavu",
      "c": "Congo (Kinshasa)",
      "p": 331084,
      "a": []
    },
    {
      "n": "Butembo",
      "c": "Congo (Kinshasa)",
      "p": 220512,
      "a": []
    },
    {
      "n": "Beni",
      "c": "Congo (Kinshasa)",
      "p": 211275.5,
      "a": []
    },
    {
      "n": "Tshikapa",
      "c": "Congo (Kinshasa)",
      "p": 201256.5,
      "a": []
    },
    {
      "n": "Kindu",
      "c": "Congo (Kinshasa)",
      "p": 199306,
      "a": []
    },
    {
      "n": "Kalemie",
      "c": "Congo (Kinshasa)",
      "p": 176615.5,
      "a": []
    },
    {
      "n": "Uvira",
      "c": "Congo (Kinshasa)",
      "p": 164353,
      "a": []
    },
    {
      "n": "Mwene-Ditu",
      "c": "Congo (Kinshasa)",
      "p": 153328.5,
      "a": []
    },
    {
      "n": "Goma",
      "c": "Congo (Kinshasa)",
      "p": 144124,
      "a": []
    },
    {
      "n": "Isiro",
      "c": "Congo (Kinshasa)",
      "p": 142136,
      "a": []
    },
    {
      "n": "Gandajika",
      "c": "Congo (Kinshasa)",
      "p": 105769.5,
      "a": []
    },
    {
      "n": "Kamina",
      "c": "Congo (Kinshasa)",
      "p": 101180,
      "a": []
    },
    {
      "n": "Kipushi",
      "c": "Congo (Kinshasa)",
      "p": 87839.5,
      "a": []
    },
    {
      "n": "Wamba",
      "c": "Congo (Kinshasa)",
      "p": 82122,
      "a": []
    },
    {
      "n": "Ilebo",
      "c": "Congo (Kinshasa)",
      "p": 71125.5,
      "a": []
    },
    {
      "n": "Kongolo",
      "c": "Congo (Kinshasa)",
      "p": 68572.5,
      "a": []
    },
    {
      "n": "Lodja",
      "c": "Congo (Kinshasa)",
      "p": 68244,
      "a": []
    },
    {
      "n": "Bunia",
      "c": "Congo (Kinshasa)",
      "p": 61537,
      "a": []
    },
    {
      "n": "Kasongo",
      "c": "Congo (Kinshasa)",
      "p": 59059,
      "a": []
    },
    {
      "n": "Aketi",
      "c": "Congo (Kinshasa)",
      "p": 46881,
      "a": []
    },
    {
      "n": "Manono",
      "c": "Congo (Kinshasa)",
      "p": 46111,
      "a": []
    },
    {
      "n": "Mweka",
      "c": "Congo (Kinshasa)",
      "p": 45222,
      "a": []
    },
    {
      "n": "Buta",
      "c": "Congo (Kinshasa)",
      "p": 44195,
      "a": []
    },
    {
      "n": "Kabinda",
      "c": "Congo (Kinshasa)",
      "p": 37366,
      "a": []
    },
    {
      "n": "Kaniama",
      "c": "Congo (Kinshasa)",
      "p": 32946.5,
      "a": []
    },
    {
      "n": "Lusambo",
      "c": "Congo (Kinshasa)",
      "p": 26803,
      "a": []
    },
    {
      "n": "Lubao",
      "c": "Congo (Kinshasa)",
      "p": 26142.5,
      "a": []
    },
    {
      "n": "Basoko",
      "c": "Congo (Kinshasa)",
      "p": 22953,
      "a": []
    },
    {
      "n": "Kabalo",
      "c": "Congo (Kinshasa)",
      "p": 21851,
      "a": []
    },
    {
      "n": "Bukama",
      "c": "Congo (Kinshasa)",
      "p": 20900.5,
      "a": []
    },
    {
      "n": "Bondo",
      "c": "Congo (Kinshasa)",
      "p": 20688.5,
      "a": []
    },
    {
      "n": "Kampene",
      "c": "Congo (Kinshasa)",
      "p": 19719.5,
      "a": []
    },
    {
      "n": "Kambove",
      "c": "Congo (Kinshasa)",
      "p": 18934.5,
      "a": []
    },
    {
      "n": "Yangambi",
      "c": "Congo (Kinshasa)",
      "p": 18035.5,
      "a": []
    },
    {
      "n": "Watsa",
      "c": "Congo (Kinshasa)",
      "p": 17721.5,
      "a": []
    },
    {
      "n": "Luebo",
      "c": "Congo (Kinshasa)",
      "p": 17682.5,
      "a": []
    },
    {
      "n": "Demba",
      "c": "Congo (Kinshasa)",
      "p": 17008.5,
      "a": []
    },
    {
      "n": "Nyunzu",
      "c": "Congo (Kinshasa)",
      "p": 15397,
      "a": []
    },
    {
      "n": "Kasaji",
      "c": "Congo (Kinshasa)",
      "p": 11969,
      "a": []
    },
    {
      "n": "Moba",
      "c": "Congo (Kinshasa)",
      "p": 10006,
      "a": []
    },
    {
      "n": "Dilolo",
      "c": "Congo (Kinshasa)",
      "p": 7854,
      "a": []
    },
    {
      "n": "Mongbwalu",
      "c": "Congo (Kinshasa)",
      "p": 2819,
      "a": []
    },
    {
      "n": "Mwenga",
      "c": "Congo (Kinshasa)",
      "p": 2216,
      "a": []
    },
    {
      "n": "Lubutu",
      "c": "Congo (Kinshasa)",
      "p": 1313,
      "a": []
    },
    {
      "n": "Buluko",
      "c": "Congo (Kinshasa)",
      "p": 1192,
      "a": []
    },
    {
      "n": "Luanza",
      "c": "Congo (Kinshasa)",
      "p": 861,
      "a": []
    },
    {
      "n": "Dibaya",
      "c": "Congo (Kinshasa)",
      "p": 603,
      "a": []
    },
    {
      "n": "Kalima",
      "c": "Congo (Kinshasa)",
      "p": 194,
      "a": []
    },
    {
      "n": "Bafwasende",
      "c": "Congo (Kinshasa)",
      "p": 149,
      "a": []
    }
  ],
  "Africa/Kinshasa": [
    {
      "n": "Kinshasa",
      "c": "Congo (Kinshasa)",
      "p": 6704351.5,
      "a": []
    },
    {
      "n": "Kikwit",
      "c": "Congo (Kinshasa)",
      "p": 465973,
      "a": []
    },
    {
      "n": "Mbandaka",
      "c": "Congo (Kinshasa)",
      "p": 229590.5,
      "a": []
    },
    {
      "n": "Matadi",
      "c": "Congo (Kinshasa)",
      "p": 212985.5,
      "a": []
    },
    {
      "n": "Boma",
      "c": "Congo (Kinshasa)",
      "p": 178638,
      "a": []
    },
    {
      "n": "Gemena",
      "c": "Congo (Kinshasa)",
      "p": 157847.5,
      "a": []
    },
    {
      "n": "Moanda",
      "c": "Congo (Kinshasa)",
      "p": 153915,
      "a": []
    },
    {
      "n": "Mbanza-Ngungu",
      "c": "Congo (Kinshasa)",
      "p": 141950.5,
      "a": []
    },
    {
      "n": "Bumba",
      "c": "Congo (Kinshasa)",
      "p": 128029.5,
      "a": []
    },
    {
      "n": "Bandundu",
      "c": "Congo (Kinshasa)",
      "p": 107997.5,
      "a": []
    },
    {
      "n": "Binga",
      "c": "Congo (Kinshasa)",
      "p": 64639,
      "a": []
    },
    {
      "n": "Lisala",
      "c": "Congo (Kinshasa)",
      "p": 64270,
      "a": []
    },
    {
      "n": "Basankusu",
      "c": "Congo (Kinshasa)",
      "p": 52216,
      "a": []
    },
    {
      "n": "Kahemba",
      "c": "Congo (Kinshasa)",
      "p": 45644.5,
      "a": []
    },
    {
      "n": "Bulungu",
      "c": "Congo (Kinshasa)",
      "p": 42310.5,
      "a": []
    },
    {
      "n": "Gbadolite",
      "c": "Congo (Kinshasa)",
      "p": 35197,
      "a": []
    },
    {
      "n": "Businga",
      "c": "Congo (Kinshasa)",
      "p": 31583,
      "a": []
    },
    {
      "n": "Inongo",
      "c": "Congo (Kinshasa)",
      "p": 30181,
      "a": []
    },
    {
      "n": "Boende",
      "c": "Congo (Kinshasa)",
      "p": 24679.5,
      "a": []
    },
    {
      "n": "Mushie",
      "c": "Congo (Kinshasa)",
      "p": 24013.5,
      "a": []
    },
    {
      "n": "Kasangulu",
      "c": "Congo (Kinshasa)",
      "p": 22645,
      "a": []
    },
    {
      "n": "Bolobo",
      "c": "Congo (Kinshasa)",
      "p": 22605.5,
      "a": []
    },
    {
      "n": "Mangai",
      "c": "Congo (Kinshasa)",
      "p": 19946,
      "a": []
    },
    {
      "n": "Tshela",
      "c": "Congo (Kinshasa)",
      "p": 19896,
      "a": []
    },
    {
      "n": "Kasongo-Lunda",
      "c": "Congo (Kinshasa)",
      "p": 18748,
      "a": []
    },
    {
      "n": "Zongo",
      "c": "Congo (Kinshasa)",
      "p": 17667,
      "a": []
    },
    {
      "n": "Libenge",
      "c": "Congo (Kinshasa)",
      "p": 17402,
      "a": []
    },
    {
      "n": "Kimpese",
      "c": "Congo (Kinshasa)",
      "p": 10578,
      "a": []
    },
    {
      "n": "Bosobolo",
      "c": "Congo (Kinshasa)",
      "p": 8968.5,
      "a": []
    },
    {
      "n": "Bongandanga",
      "c": "Congo (Kinshasa)",
      "p": 2896,
      "a": []
    },
    {
      "n": "Ikela",
      "c": "Congo (Kinshasa)",
      "p": 291,
      "a": []
    },
    {
      "n": "Kenge",
      "c": "Congo (Kinshasa)",
      "p": 241,
      "a": []
    },
    {
      "n": "Lusanga",
      "c": "Congo (Kinshasa)",
      "p": 177,
      "a": []
    }
  ],
  "Pacific/Rarotonga": [
    {
      "n": "Rarotonga",
      "c": "Cook Islands",
      "p": 2525,
      "a": []
    }
  ],
  "America/Costa_Rica": [
    {
      "n": "San Jose",
      "c": "Costa Rica",
      "p": 642862,
      "a": [
        "SJC"
      ]
    },
    {
      "n": "Alajuela",
      "c": "Costa Rica",
      "p": 217618.5,
      "a": []
    },
    {
      "n": "Cartago",
      "c": "Costa Rica",
      "p": 111770,
      "a": []
    },
    {
      "n": "Puerto Limon",
      "c": "Costa Rica",
      "p": 74041,
      "a": []
    },
    {
      "n": "Puntarenas",
      "c": "Costa Rica",
      "p": 46376,
      "a": []
    },
    {
      "n": "Liberia",
      "c": "Costa Rica",
      "p": 41538,
      "a": []
    },
    {
      "n": "Quesada",
      "c": "Costa Rica",
      "p": 29208,
      "a": []
    },
    {
      "n": "Heredia",
      "c": "Costa Rica",
      "p": 21947,
      "a": []
    },
    {
      "n": "Canas",
      "c": "Costa Rica",
      "p": 15365,
      "a": []
    },
    {
      "n": "Golfito",
      "c": "Costa Rica",
      "p": 6777,
      "a": []
    },
    {
      "n": "La Cruz",
      "c": "Costa Rica",
      "p": 4297.5,
      "a": []
    },
    {
      "n": "Ciudad Cortes",
      "c": "Costa Rica",
      "p": 3515.5,
      "a": []
    },
    {
      "n": "Sixaola",
      "c": "Costa Rica",
      "p": 1150,
      "a": []
    }
  ],
  "Europe/Zagreb": [
    {
      "n": "Zagreb",
      "c": "Croatia",
      "p": 710746,
      "a": []
    },
    {
      "n": "Split",
      "c": "Croatia",
      "p": 195527.5,
      "a": []
    },
    {
      "n": "Rijeka",
      "c": "Croatia",
      "p": 156082,
      "a": []
    },
    {
      "n": "Osijek",
      "c": "Croatia",
      "p": 91608.5,
      "a": []
    },
    {
      "n": "Slavonski Brod",
      "c": "Croatia",
      "p": 79230,
      "a": []
    },
    {
      "n": "Pula",
      "c": "Croatia",
      "p": 60338.5,
      "a": []
    },
    {
      "n": "Zadar",
      "c": "Croatia",
      "p": 59201.5,
      "a": []
    },
    {
      "n": "Karlovac",
      "c": "Croatia",
      "p": 51593,
      "a": []
    },
    {
      "n": "Sibenik",
      "c": "Croatia",
      "p": 37112,
      "a": []
    },
    {
      "n": "Dubrovnik",
      "c": "Croatia",
      "p": 32711,
      "a": []
    }
  ],
  "America/Havana": [
    {
      "n": "Havana",
      "c": "Cuba",
      "p": 2082458.5,
      "a": []
    },
    {
      "n": "Santiago de Cuba",
      "c": "Cuba",
      "p": 500964,
      "a": []
    },
    {
      "n": "Camaguey",
      "c": "Cuba",
      "p": 321583.5,
      "a": []
    },
    {
      "n": "Holguin",
      "c": "Cuba",
      "p": 309639.5,
      "a": []
    },
    {
      "n": "Guantanamo",
      "c": "Cuba",
      "p": 245069.5,
      "a": []
    },
    {
      "n": "Santa Clara",
      "c": "Cuba",
      "p": 234900,
      "a": []
    },
    {
      "n": "Las Tunas",
      "c": "Cuba",
      "p": 179898,
      "a": []
    },
    {
      "n": "Bayamo",
      "c": "Cuba",
      "p": 177623,
      "a": []
    },
    {
      "n": "Pinar del Rio",
      "c": "Cuba",
      "p": 173304,
      "a": []
    },
    {
      "n": "Cienfuegos",
      "c": "Cuba",
      "p": 146549.5,
      "a": []
    },
    {
      "n": "Matanzas",
      "c": "Cuba",
      "p": 135303,
      "a": []
    },
    {
      "n": "Ciego de Avila",
      "c": "Cuba",
      "p": 122343.5,
      "a": []
    },
    {
      "n": "Manzanillo",
      "c": "Cuba",
      "p": 107433,
      "a": []
    },
    {
      "n": "Sancti Spiritus",
      "c": "Cuba",
      "p": 101710.5,
      "a": []
    },
    {
      "n": "Palma Soriano",
      "c": "Cuba",
      "p": 85110,
      "a": []
    },
    {
      "n": "Moron",
      "c": "Cuba",
      "p": 57551.5,
      "a": []
    },
    {
      "n": "Guines",
      "c": "Cuba",
      "p": 57445,
      "a": []
    },
    {
      "n": "Banes",
      "c": "Cuba",
      "p": 47745.5,
      "a": []
    },
    {
      "n": "Nuevitas",
      "c": "Cuba",
      "p": 46796,
      "a": []
    },
    {
      "n": "Artemisa",
      "c": "Cuba",
      "p": 46024.5,
      "a": []
    },
    {
      "n": "Sagua la Grande",
      "c": "Cuba",
      "p": 40752.5,
      "a": []
    },
    {
      "n": "Colon",
      "c": "Cuba",
      "p": 40677,
      "a": []
    },
    {
      "n": "San Antonio de los Banos",
      "c": "Cuba",
      "p": 37676,
      "a": []
    },
    {
      "n": "Placetas",
      "c": "Cuba",
      "p": 34973,
      "a": []
    },
    {
      "n": "Caibarien",
      "c": "Cuba",
      "p": 25431,
      "a": []
    },
    {
      "n": "Nueva Gerona",
      "c": "Cuba",
      "p": 22915,
      "a": []
    }
  ],
  "America/Curacao": [
    {
      "n": "Willemstad",
      "c": "Curacao",
      "p": 146813,
      "a": []
    }
  ],
  "Asia/Nicosia": [
    {
      "n": "Nicosia",
      "c": "Cyprus",
      "p": 212376,
      "a": []
    },
    {
      "n": "Lemosos",
      "c": "Cyprus",
      "p": 149486,
      "a": []
    },
    {
      "n": "Larnaka",
      "c": "Cyprus",
      "p": 48947,
      "a": []
    },
    {
      "n": "Paphos",
      "c": "Cyprus",
      "p": 35961,
      "a": []
    }
  ],
  "Europe/Prague": [
    {
      "n": "Prague",
      "c": "Czech Republic",
      "p": 582043.5,
      "a": []
    },
    {
      "n": "Ostrava",
      "c": "Czech Republic",
      "p": 396025.5,
      "a": []
    },
    {
      "n": "Brno",
      "c": "Czech Republic",
      "p": 378918,
      "a": []
    },
    {
      "n": "Pizen",
      "c": "Czech Republic",
      "p": 161043,
      "a": []
    },
    {
      "n": "Zlin",
      "c": "Czech Republic",
      "p": 101893.5,
      "a": []
    },
    {
      "n": "Liberec",
      "c": "Czech Republic",
      "p": 99972.5,
      "a": []
    },
    {
      "n": "Pardubice",
      "c": "Czech Republic",
      "p": 97902.5,
      "a": []
    },
    {
      "n": "Olomouc",
      "c": "Czech Republic",
      "p": 97829,
      "a": []
    },
    {
      "n": "Ceske Budejovice",
      "c": "Czech Republic",
      "p": 97452,
      "a": []
    },
    {
      "n": "Hradec Kralove",
      "c": "Czech Republic",
      "p": 95195,
      "a": []
    },
    {
      "n": "Usti Nad Labem",
      "c": "Czech Republic",
      "p": 94105,
      "a": []
    },
    {
      "n": "Jihlava",
      "c": "Czech Republic",
      "p": 52010.5,
      "a": []
    }
  ],
  "Europe/Copenhagen": [
    {
      "n": "København",
      "c": "Denmark",
      "p": 1085000,
      "a": []
    },
    {
      "n": "Copenhagen",
      "c": "Denmark",
      "p": 602481,
      "a": []
    },
    {
      "n": "Århus",
      "c": "Denmark",
      "p": 232325.5,
      "a": []
    },
    {
      "n": "Odense",
      "c": "Denmark",
      "p": 152076.5,
      "a": []
    },
    {
      "n": "Aalborg",
      "c": "Denmark",
      "p": 111917.5,
      "a": []
    },
    {
      "n": "Esbjerg",
      "c": "Denmark",
      "p": 68076,
      "a": []
    },
    {
      "n": "Vejle",
      "c": "Denmark",
      "p": 51177,
      "a": []
    },
    {
      "n": "Roskilde",
      "c": "Denmark",
      "p": 42284.5,
      "a": []
    },
    {
      "n": "Viborg",
      "c": "Denmark",
      "p": 32944,
      "a": []
    },
    {
      "n": "Svendborg",
      "c": "Denmark",
      "p": 28366.5,
      "a": []
    },
    {
      "n": "Hillerod",
      "c": "Denmark",
      "p": 28313,
      "a": []
    },
    {
      "n": "Frederikshavn",
      "c": "Denmark",
      "p": 22385,
      "a": []
    },
    {
      "n": "Soro",
      "c": "Denmark",
      "p": 7167,
      "a": []
    }
  ],
  "Africa/Djibouti": [
    {
      "n": "Djibouti",
      "c": "Djibouti",
      "p": 763506.5,
      "a": []
    },
    {
      "n": "Ali Sabih",
      "c": "Djibouti",
      "p": 32165.5,
      "a": []
    },
    {
      "n": "Tadjoura",
      "c": "Djibouti",
      "p": 22193,
      "a": []
    },
    {
      "n": "Obock",
      "c": "Djibouti",
      "p": 13142,
      "a": []
    },
    {
      "n": "Dikhil",
      "c": "Djibouti",
      "p": 12043,
      "a": []
    }
  ],
  "America/Dominica": [
    {
      "n": "Roseau",
      "c": "Dominica",
      "p": 19953.5,
      "a": []
    }
  ],
  "America/Santo_Domingo": [
    {
      "n": "Santiago",
      "c": "Dominican Republic",
      "p": 1471007.5,
      "a": [
        "SCL"
      ]
    },
    {
      "n": "Santo Domingo",
      "c": "Dominican Republic",
      "p": 1078436.5,
      "a": []
    },
    {
      "n": "San Pedro de Macoris",
      "c": "Dominican Republic",
      "p": 211019.5,
      "a": []
    },
    {
      "n": "La Romana",
      "c": "Dominican Republic",
      "p": 202471.5,
      "a": []
    },
    {
      "n": "San Cristobal",
      "c": "Dominican Republic",
      "p": 154040,
      "a": []
    },
    {
      "n": "San Francisco de Macoris",
      "c": "Dominican Republic",
      "p": 138650.5,
      "a": []
    },
    {
      "n": "La Vega",
      "c": "Dominican Republic",
      "p": 132811.5,
      "a": []
    },
    {
      "n": "Higuey",
      "c": "Dominican Republic",
      "p": 123787,
      "a": []
    },
    {
      "n": "Puerto Plata",
      "c": "Dominican Republic",
      "p": 119897,
      "a": []
    },
    {
      "n": "Barahona",
      "c": "Dominican Republic",
      "p": 83644,
      "a": []
    },
    {
      "n": "Bonao",
      "c": "Dominican Republic",
      "p": 73269,
      "a": []
    },
    {
      "n": "San Juan",
      "c": "Dominican Republic",
      "p": 72950,
      "a": []
    },
    {
      "n": "Bani",
      "c": "Dominican Republic",
      "p": 66709,
      "a": []
    },
    {
      "n": "Moca",
      "c": "Dominican Republic",
      "p": 61834,
      "a": []
    },
    {
      "n": "Azua",
      "c": "Dominican Republic",
      "p": 59139,
      "a": []
    },
    {
      "n": "Mao",
      "c": "Dominican Republic",
      "p": 48297,
      "a": []
    },
    {
      "n": "Salcedo",
      "c": "Dominican Republic",
      "p": 45299,
      "a": []
    },
    {
      "n": "Cotui",
      "c": "Dominican Republic",
      "p": 41641,
      "a": []
    },
    {
      "n": "Hato Mayor",
      "c": "Dominican Republic",
      "p": 35999,
      "a": []
    },
    {
      "n": "Comendador",
      "c": "Dominican Republic",
      "p": 35901,
      "a": []
    },
    {
      "n": "Nagua",
      "c": "Dominican Republic",
      "p": 33862,
      "a": []
    },
    {
      "n": "El Seibo",
      "c": "Dominican Republic",
      "p": 23547,
      "a": []
    },
    {
      "n": "Neiba",
      "c": "Dominican Republic",
      "p": 22200.5,
      "a": []
    },
    {
      "n": "Monte Cristi",
      "c": "Dominican Republic",
      "p": 16852.5,
      "a": []
    },
    {
      "n": "Dajabon",
      "c": "Dominican Republic",
      "p": 16398,
      "a": []
    },
    {
      "n": "Sabaneta",
      "c": "Dominican Republic",
      "p": 16380,
      "a": []
    },
    {
      "n": "Monte Plata",
      "c": "Dominican Republic",
      "p": 15532,
      "a": []
    },
    {
      "n": "Samana",
      "c": "Dominican Republic",
      "p": 11432,
      "a": []
    },
    {
      "n": "Pedernales",
      "c": "Dominican Republic",
      "p": 11072,
      "a": []
    },
    {
      "n": "Jimani",
      "c": "Dominican Republic",
      "p": 6567,
      "a": []
    },
    {
      "n": "Bavaro",
      "c": "Dominican Republic",
      "p": 795,
      "a": []
    }
  ],
  "Asia/Dili": [
    {
      "n": "Dili",
      "c": "East Timor",
      "p": 213947,
      "a": []
    }
  ],
  "America/Guayaquil": [
    {
      "n": "Guayaquil",
      "c": "Ecuador",
      "p": 2233014.5,
      "a": []
    },
    {
      "n": "Quito",
      "c": "Ecuador",
      "p": 1550407,
      "a": []
    },
    {
      "n": "Cuenca",
      "c": "Ecuador",
      "p": 281921,
      "a": []
    },
    {
      "n": "Ambato",
      "c": "Ecuador",
      "p": 217897,
      "a": []
    },
    {
      "n": "Machala",
      "c": "Ecuador",
      "p": 205578.5,
      "a": []
    },
    {
      "n": "Portoviejo",
      "c": "Ecuador",
      "p": 191963.5,
      "a": []
    },
    {
      "n": "Manta",
      "c": "Ecuador",
      "p": 176941,
      "a": []
    },
    {
      "n": "Riobamba",
      "c": "Ecuador",
      "p": 148471,
      "a": []
    },
    {
      "n": "Esmeraldas",
      "c": "Ecuador",
      "p": 134365.5,
      "a": []
    },
    {
      "n": "Ibarra",
      "c": "Ecuador",
      "p": 127703.5,
      "a": []
    },
    {
      "n": "Loja",
      "c": "Ecuador",
      "p": 122082,
      "a": []
    },
    {
      "n": "Sangolqui",
      "c": "Ecuador",
      "p": 91848,
      "a": []
    },
    {
      "n": "Tulcan",
      "c": "Ecuador",
      "p": 83000,
      "a": []
    },
    {
      "n": "Latacunga",
      "c": "Ecuador",
      "p": 73344.5,
      "a": []
    },
    {
      "n": "Babahoyo",
      "c": "Ecuador",
      "p": 59873,
      "a": []
    },
    {
      "n": "Milagro",
      "c": "Ecuador",
      "p": 55433.5,
      "a": []
    },
    {
      "n": "Azogues",
      "c": "Ecuador",
      "p": 51982,
      "a": []
    },
    {
      "n": "Chone",
      "c": "Ecuador",
      "p": 40379,
      "a": []
    },
    {
      "n": "Jipijapa",
      "c": "Ecuador",
      "p": 28741,
      "a": []
    },
    {
      "n": "Cayambe",
      "c": "Ecuador",
      "p": 27231.5,
      "a": []
    },
    {
      "n": "Puyo",
      "c": "Ecuador",
      "p": 24881,
      "a": []
    },
    {
      "n": "Salinas",
      "c": "Ecuador",
      "p": 24616.5,
      "a": []
    },
    {
      "n": "Tena",
      "c": "Ecuador",
      "p": 24149,
      "a": []
    },
    {
      "n": "Guaranda",
      "c": "Ecuador",
      "p": 23933,
      "a": []
    },
    {
      "n": "Macas",
      "c": "Ecuador",
      "p": 20644,
      "a": []
    },
    {
      "n": "San Lorenzo",
      "c": "Ecuador",
      "p": 20209,
      "a": []
    },
    {
      "n": "Pinas",
      "c": "Ecuador",
      "p": 16981,
      "a": []
    },
    {
      "n": "San Gabriel",
      "c": "Ecuador",
      "p": 15589,
      "a": []
    },
    {
      "n": "Alausi",
      "c": "Ecuador",
      "p": 14294,
      "a": []
    },
    {
      "n": "Macara",
      "c": "Ecuador",
      "p": 11748,
      "a": []
    },
    {
      "n": "Zamora",
      "c": "Ecuador",
      "p": 11581.5,
      "a": []
    },
    {
      "n": "Muisne",
      "c": "Ecuador",
      "p": 8252.5,
      "a": []
    },
    {
      "n": "Valdez",
      "c": "Ecuador",
      "p": 6985.5,
      "a": []
    },
    {
      "n": "Yaupi",
      "c": "Ecuador",
      "p": 293,
      "a": []
    },
    {
      "n": "Nuevo Rocafuerte",
      "c": "Peru",
      "p": 40,
      "a": []
    }
  ],
  "Pacific/Galapagos": [
    {
      "n": "Santa Cruz",
      "c": "Ecuador",
      "p": 8147.5,
      "a": []
    },
    {
      "n": "Puerto Baquerizo Moreno",
      "c": "Ecuador",
      "p": 5122,
      "a": []
    },
    {
      "n": "Puerto Villamil",
      "c": "Ecuador",
      "p": 2000,
      "a": []
    }
  ],
  "Africa/Cairo": [
    {
      "n": "Cairo",
      "c": "Egypt",
      "p": 9813807,
      "a": [
        "CAI"
      ]
    },
    {
      "n": "Alexandria",
      "c": "Egypt",
      "p": 3988258,
      "a": []
    },
    {
      "n": "El Giza",
      "c": "Egypt",
      "p": 2681863,
      "a": []
    },
    {
      "n": "Bur Said",
      "c": "Egypt",
      "p": 561932,
      "a": []
    },
    {
      "n": "Luxor",
      "c": "Egypt",
      "p": 548572,
      "a": []
    },
    {
      "n": "El Mansura",
      "c": "Egypt",
      "p": 540247,
      "a": []
    },
    {
      "n": "Suez",
      "c": "Egypt",
      "p": 498230,
      "a": []
    },
    {
      "n": "Ismailia",
      "c": "Egypt",
      "p": 470474,
      "a": []
    },
    {
      "n": "Asyut",
      "c": "Egypt",
      "p": 420585,
      "a": []
    },
    {
      "n": "Tanta",
      "c": "Egypt",
      "p": 404901,
      "a": []
    },
    {
      "n": "Sohag",
      "c": "Egypt",
      "p": 404709.5,
      "a": []
    },
    {
      "n": "Damanhûr",
      "c": "Egypt",
      "p": 371350,
      "a": []
    },
    {
      "n": "El Minya",
      "c": "Egypt",
      "p": 363575,
      "a": []
    },
    {
      "n": "Beni Suef",
      "c": "Egypt",
      "p": 339537,
      "a": []
    },
    {
      "n": "El Faiyum",
      "c": "Egypt",
      "p": 311582.5,
      "a": []
    },
    {
      "n": "Zagazig",
      "c": "Egypt",
      "p": 285097,
      "a": []
    },
    {
      "n": "Aswan",
      "c": "Egypt",
      "p": 277351.5,
      "a": []
    },
    {
      "n": "Qena",
      "c": "Egypt",
      "p": 268694.5,
      "a": []
    },
    {
      "n": "Dumyat",
      "c": "Egypt",
      "p": 188149,
      "a": []
    },
    {
      "n": "Shibin el Kom",
      "c": "Egypt",
      "p": 182900,
      "a": []
    },
    {
      "n": "Kom Ombo",
      "c": "Egypt",
      "p": 181874.5,
      "a": []
    },
    {
      "n": "Mallawi",
      "c": "Egypt",
      "p": 179934.5,
      "a": []
    },
    {
      "n": "Benha",
      "c": "Egypt",
      "p": 167029,
      "a": []
    },
    {
      "n": "Hurghada",
      "c": "Egypt",
      "p": 157204,
      "a": []
    },
    {
      "n": "El Arish",
      "c": "Egypt",
      "p": 153753,
      "a": []
    },
    {
      "n": "Kafr el Sheikh",
      "c": "Egypt",
      "p": 143970,
      "a": []
    },
    {
      "n": "Rashid",
      "c": "Egypt",
      "p": 128970.5,
      "a": []
    },
    {
      "n": "Samalut",
      "c": "Egypt",
      "p": 121281,
      "a": []
    },
    {
      "n": "Girga",
      "c": "Egypt",
      "p": 115475.5,
      "a": []
    },
    {
      "n": "Isna",
      "c": "Egypt",
      "p": 84667.5,
      "a": []
    },
    {
      "n": "Matruh",
      "c": "Egypt",
      "p": 82756,
      "a": []
    },
    {
      "n": "Beni Mazar",
      "c": "Egypt",
      "p": 68853,
      "a": []
    },
    {
      "n": "El Kharga",
      "c": "Egypt",
      "p": 49991,
      "a": []
    },
    {
      "n": "Siwa",
      "c": "Egypt",
      "p": 23080,
      "a": []
    },
    {
      "n": "El Tur",
      "c": "Egypt",
      "p": 21300,
      "a": []
    },
    {
      "n": "Bur Safaga",
      "c": "Egypt",
      "p": 21035.5,
      "a": []
    },
    {
      "n": "El Daba",
      "c": "Egypt",
      "p": 14212,
      "a": []
    },
    {
      "n": "Salum",
      "c": "Egypt",
      "p": 7330,
      "a": []
    },
    {
      "n": "Qasr Farafra",
      "c": "Egypt",
      "p": 5000,
      "a": []
    },
    {
      "n": "El Alamein",
      "c": "Egypt",
      "p": 4938,
      "a": []
    },
    {
      "n": "El Qasr",
      "c": "Egypt",
      "p": 1716,
      "a": []
    },
    {
      "n": "Berenice",
      "c": "Egypt",
      "p": 10,
      "a": []
    }
  ],
  "America/El_Salvador": [
    {
      "n": "San Salvador",
      "c": "El Salvador",
      "p": 717903.5,
      "a": []
    },
    {
      "n": "Santa Ana",
      "c": "El Salvador",
      "p": 205569.5,
      "a": []
    },
    {
      "n": "San Miguel",
      "c": "El Salvador",
      "p": 181721.5,
      "a": []
    },
    {
      "n": "Sonsonate",
      "c": "El Salvador",
      "p": 139724,
      "a": []
    },
    {
      "n": "Nueva San Salvador",
      "c": "El Salvador",
      "p": 124694,
      "a": []
    },
    {
      "n": "Usulutan",
      "c": "El Salvador",
      "p": 51910,
      "a": []
    },
    {
      "n": "Cojutepeque",
      "c": "El Salvador",
      "p": 48411,
      "a": []
    },
    {
      "n": "Zacatecoluca",
      "c": "El Salvador",
      "p": 39613,
      "a": []
    },
    {
      "n": "San Vicente",
      "c": "El Salvador",
      "p": 37326,
      "a": []
    },
    {
      "n": "Ahuachapan",
      "c": "El Salvador",
      "p": 34102,
      "a": []
    },
    {
      "n": "Chalatenango",
      "c": "El Salvador",
      "p": 29271,
      "a": []
    },
    {
      "n": "La Union",
      "c": "El Salvador",
      "p": 26807,
      "a": []
    },
    {
      "n": "Sensuntepeque",
      "c": "El Salvador",
      "p": 23687.5,
      "a": []
    },
    {
      "n": "San Francisco Gotera",
      "c": "El Salvador",
      "p": 16152,
      "a": []
    }
  ],
  "Africa/Malabo": [
    {
      "n": "Malabo",
      "c": "Equatorial Guinea",
      "p": 155963,
      "a": []
    },
    {
      "n": "Bata",
      "c": "Equatorial Guinea",
      "p": 135943.5,
      "a": []
    },
    {
      "n": "Ebebiyin",
      "c": "Gabon",
      "p": 24831,
      "a": []
    },
    {
      "n": "Luba",
      "c": "Equatorial Guinea",
      "p": 8655,
      "a": []
    },
    {
      "n": "Evinayong",
      "c": "Equatorial Guinea",
      "p": 8462,
      "a": []
    },
    {
      "n": "Mongomo",
      "c": "Equatorial Guinea",
      "p": 6476.5,
      "a": []
    },
    {
      "n": "Calatrava",
      "c": "Equatorial Guinea",
      "p": 628,
      "a": []
    }
  ],
  "Africa/Asmara": [
    {
      "n": "Asmara",
      "c": "Eritrea",
      "p": 592366,
      "a": []
    },
    {
      "n": "Keren",
      "c": "Eritrea",
      "p": 148241.5,
      "a": []
    },
    {
      "n": "Massawa",
      "c": "Eritrea",
      "p": 142564,
      "a": []
    },
    {
      "n": "Mendefera",
      "c": "Eritrea",
      "p": 137585.5,
      "a": []
    },
    {
      "n": "Assab",
      "c": "Eritrea",
      "p": 105496,
      "a": []
    },
    {
      "n": "Agordat",
      "c": "Eritrea",
      "p": 18728.5,
      "a": []
    },
    {
      "n": "Tessenei",
      "c": "Eritrea",
      "p": 9504,
      "a": []
    }
  ],
  "Europe/Tallinn": [
    {
      "n": "Tallinn",
      "c": "Estonia",
      "p": 367025.5,
      "a": []
    },
    {
      "n": "Tartu",
      "c": "Estonia",
      "p": 90033.5,
      "a": []
    },
    {
      "n": "Narva",
      "c": "Estonia",
      "p": 65707,
      "a": []
    },
    {
      "n": "Parnu",
      "c": "Estonia",
      "p": 40256,
      "a": []
    },
    {
      "n": "Kohtla-Jarve",
      "c": "Estonia",
      "p": 31038,
      "a": []
    },
    {
      "n": "Viljandi",
      "c": "Estonia",
      "p": 20309,
      "a": []
    },
    {
      "n": "Haapsalu",
      "c": "Estonia",
      "p": 11805,
      "a": []
    }
  ],
  "Africa/Addis_Ababa": [
    {
      "n": "Addis Ababa",
      "c": "Ethiopia",
      "p": 2928864.5,
      "a": []
    },
    {
      "n": "Nazret",
      "c": "Ethiopia",
      "p": 345443.5,
      "a": []
    },
    {
      "n": "Dire Dawa",
      "c": "Ethiopia",
      "p": 250325.5,
      "a": []
    },
    {
      "n": "Bahir Dar",
      "c": "Ethiopia",
      "p": 187823.5,
      "a": []
    },
    {
      "n": "Harar",
      "c": "Ethiopia",
      "p": 161150,
      "a": []
    },
    {
      "n": "Dese",
      "c": "Ethiopia",
      "p": 159929,
      "a": []
    },
    {
      "n": "Gonder",
      "c": "Ethiopia",
      "p": 155072,
      "a": []
    },
    {
      "n": "Awasa",
      "c": "Ethiopia",
      "p": 133097,
      "a": []
    },
    {
      "n": "Jima",
      "c": "Ethiopia",
      "p": 128306,
      "a": []
    },
    {
      "n": "Adigrat",
      "c": "Ethiopia",
      "p": 104021,
      "a": []
    },
    {
      "n": "Shashemene",
      "c": "Ethiopia",
      "p": 100110.5,
      "a": []
    },
    {
      "n": "Mekele",
      "c": "Ethiopia",
      "p": 95856,
      "a": []
    },
    {
      "n": "Hosaina",
      "c": "Ethiopia",
      "p": 89300,
      "a": []
    },
    {
      "n": "Asela",
      "c": "Ethiopia",
      "p": 82240,
      "a": []
    },
    {
      "n": "Giyon",
      "c": "Ethiopia",
      "p": 76464,
      "a": []
    },
    {
      "n": "Nekemte",
      "c": "Ethiopia",
      "p": 73018,
      "a": []
    },
    {
      "n": "Gode",
      "c": "Ethiopia",
      "p": 71671,
      "a": []
    },
    {
      "n": "Sodo",
      "c": "Ethiopia",
      "p": 65737,
      "a": []
    },
    {
      "n": "Debre Markos",
      "c": "Ethiopia",
      "p": 65339,
      "a": []
    },
    {
      "n": "Debre Birhan",
      "c": "Ethiopia",
      "p": 61509,
      "a": []
    },
    {
      "n": "Arba Minch",
      "c": "Ethiopia",
      "p": 54343.5,
      "a": []
    },
    {
      "n": "Jijiga",
      "c": "Ethiopia",
      "p": 52507.5,
      "a": []
    },
    {
      "n": "Dila",
      "c": "Ethiopia",
      "p": 47021,
      "a": []
    },
    {
      "n": "Aksum",
      "c": "Ethiopia",
      "p": 44368,
      "a": []
    },
    {
      "n": "Hagere Hiywet",
      "c": "Ethiopia",
      "p": 39412.5,
      "a": []
    },
    {
      "n": "Yirga Alem",
      "c": "Ethiopia",
      "p": 36292,
      "a": []
    },
    {
      "n": "Goba",
      "c": "Ethiopia",
      "p": 33197,
      "a": []
    },
    {
      "n": "Dembi Dolo",
      "c": "Ethiopia",
      "p": 27264,
      "a": []
    },
    {
      "n": "Asosa",
      "c": "Ethiopia",
      "p": 24192,
      "a": []
    },
    {
      "n": "Gimbi",
      "c": "Ethiopia",
      "p": 22423.5,
      "a": []
    },
    {
      "n": "Bati",
      "c": "Ethiopia",
      "p": 12826.5,
      "a": []
    },
    {
      "n": "Dolo Bay",
      "c": "Ethiopia",
      "p": 11810,
      "a": []
    },
    {
      "n": "Nagele",
      "c": "Ethiopia",
      "p": 11772,
      "a": []
    },
    {
      "n": "Gore",
      "c": "Ethiopia",
      "p": 9352,
      "a": []
    }
  ],
  "Atlantic/Stanley": [
    {
      "n": "Stanley",
      "c": "Falkland Islands",
      "p": 2213,
      "a": []
    },
    {
      "n": "Fox Bay",
      "c": "Falkland Islands",
      "p": 90,
      "a": []
    }
  ],
  "Atlantic/Faroe": [
    {
      "n": "Tórshavn",
      "c": "Faroe Islands",
      "p": 14398,
      "a": []
    },
    {
      "n": "Klaksvik",
      "c": "Faroe Islands",
      "p": 4664,
      "a": []
    }
  ],
  "Pacific/Pohnpei": [
    {
      "n": "Palikir",
      "c": "Federated States of Micronesia",
      "p": 4645,
      "a": []
    }
  ],
  "Pacific/Fiji": [
    {
      "n": "Suva",
      "c": "Fiji",
      "p": 131835,
      "a": []
    },
    {
      "n": "Lautoka",
      "c": "Fiji",
      "p": 55894,
      "a": []
    },
    {
      "n": "Nandi",
      "c": "Fiji",
      "p": 27329,
      "a": []
    },
    {
      "n": "Labasa",
      "c": "Fiji",
      "p": 24187,
      "a": []
    }
  ],
  "Europe/Helsinki": [
    {
      "n": "Helsinki",
      "c": "Finland",
      "p": 836728.5,
      "a": []
    },
    {
      "n": "Tampere",
      "c": "Finland",
      "p": 230983,
      "a": []
    },
    {
      "n": "Turku",
      "c": "Finland",
      "p": 175442.5,
      "a": []
    },
    {
      "n": "Oulu",
      "c": "Finland",
      "p": 132685,
      "a": []
    },
    {
      "n": "Lahti",
      "c": "Finland",
      "p": 97508,
      "a": []
    },
    {
      "n": "Jyväskylä",
      "c": "Finland",
      "p": 91581,
      "a": []
    },
    {
      "n": "Kuopio",
      "c": "Finland",
      "p": 90502,
      "a": []
    },
    {
      "n": "Pori",
      "c": "Finland",
      "p": 71526,
      "a": []
    },
    {
      "n": "Lappeenranta",
      "c": "Finland",
      "p": 54516.5,
      "a": []
    },
    {
      "n": "Joensuu",
      "c": "Finland",
      "p": 53388,
      "a": []
    },
    {
      "n": "Vaasa",
      "c": "Finland",
      "p": 48930,
      "a": []
    },
    {
      "n": "Hameenlinna",
      "c": "Finland",
      "p": 47261,
      "a": []
    },
    {
      "n": "Kokkola",
      "c": "Finland",
      "p": 46714,
      "a": []
    },
    {
      "n": "Mikkeli",
      "c": "Finland",
      "p": 46550,
      "a": []
    },
    {
      "n": "Kouvola",
      "c": "Finland",
      "p": 31133,
      "a": []
    },
    {
      "n": "Rovaniemi",
      "c": "Finland",
      "p": 30085,
      "a": []
    },
    {
      "n": "Savonlinna",
      "c": "Finland",
      "p": 20233.5,
      "a": []
    },
    {
      "n": "Kemi",
      "c": "Finland",
      "p": 17060,
      "a": []
    },
    {
      "n": "Porvoo",
      "c": "Finland",
      "p": 12242,
      "a": []
    },
    {
      "n": "Kemijarvi",
      "c": "Finland",
      "p": 8883,
      "a": []
    },
    {
      "n": "Sodankylä",
      "c": "Finland",
      "p": 6516.5,
      "a": []
    }
  ],
  "Europe/Paris": [
    {
      "n": "Paris",
      "c": "France",
      "p": 4957588.5,
      "a": [
        "PAR"
      ]
    },
    {
      "n": "Marseille",
      "c": "France",
      "p": 1097405.5,
      "a": []
    },
    {
      "n": "Lyon",
      "c": "France",
      "p": 947658.5,
      "a": []
    },
    {
      "n": "Toulouse",
      "c": "France",
      "p": 640027.5,
      "a": []
    },
    {
      "n": "Lille",
      "c": "France",
      "p": 636164,
      "a": []
    },
    {
      "n": "Nice",
      "c": "France",
      "p": 632810,
      "a": []
    },
    {
      "n": "Bordeaux",
      "c": "France",
      "p": 517422,
      "a": []
    },
    {
      "n": "Nantes",
      "c": "France",
      "p": 357903,
      "a": []
    },
    {
      "n": "Strasbourg",
      "c": "France",
      "p": 357408.5,
      "a": []
    },
    {
      "n": "Rouen",
      "c": "France",
      "p": 321417.5,
      "a": []
    },
    {
      "n": "Montpellier",
      "c": "France",
      "p": 287753,
      "a": []
    },
    {
      "n": "Grenoble",
      "c": "France",
      "p": 273563,
      "a": []
    },
    {
      "n": "Metz",
      "c": "France",
      "p": 266550,
      "a": []
    },
    {
      "n": "Toulon",
      "c": "France",
      "p": 263197,
      "a": []
    },
    {
      "n": "Saint-Etienne",
      "c": "France",
      "p": 220982,
      "a": []
    },
    {
      "n": "Le Havre",
      "c": "France",
      "p": 214048,
      "a": []
    },
    {
      "n": "Rennes",
      "c": "France",
      "p": 204329.5,
      "a": []
    },
    {
      "n": "Tours",
      "c": "France",
      "p": 188858.5,
      "a": []
    },
    {
      "n": "Nancy",
      "c": "France",
      "p": 187155,
      "a": []
    },
    {
      "n": "Clermont-Ferrand",
      "c": "France",
      "p": 185865.5,
      "a": []
    },
    {
      "n": "Angers",
      "c": "France",
      "p": 178329.5,
      "a": []
    },
    {
      "n": "Reims",
      "c": "France",
      "p": 177939,
      "a": []
    },
    {
      "n": "Orleans",
      "c": "France",
      "p": 170725,
      "a": []
    },
    {
      "n": "Mulhouse",
      "c": "France",
      "p": 163442,
      "a": []
    },
    {
      "n": "Dijon",
      "c": "France",
      "p": 159864,
      "a": []
    },
    {
      "n": "Nimes",
      "c": "France",
      "p": 158891.5,
      "a": []
    },
    {
      "n": "Caen",
      "c": "France",
      "p": 150361.5,
      "a": []
    },
    {
      "n": "Limoges",
      "c": "France",
      "p": 146687.5,
      "a": []
    },
    {
      "n": "Aix-en-Provence",
      "c": "France",
      "p": 145309,
      "a": []
    },
    {
      "n": "Melun",
      "c": "France",
      "p": 144192.5,
      "a": []
    },
    {
      "n": "Le Mans",
      "c": "France",
      "p": 143392.5,
      "a": []
    },
    {
      "n": "Brest",
      "c": "France",
      "p": 142914,
      "a": []
    },
    {
      "n": "Perpignan",
      "c": "France",
      "p": 128663,
      "a": []
    },
    {
      "n": "Besancon",
      "c": "France",
      "p": 124193,
      "a": []
    },
    {
      "n": "Amiens",
      "c": "France",
      "p": 118908.5,
      "a": []
    },
    {
      "n": "Biarritz",
      "c": "France",
      "p": 89268,
      "a": []
    },
    {
      "n": "Versailles",
      "c": "France",
      "p": 85416,
      "a": []
    },
    {
      "n": "Poitier",
      "c": "France",
      "p": 85383.5,
      "a": []
    },
    {
      "n": "Calais",
      "c": "France",
      "p": 83317,
      "a": []
    },
    {
      "n": "Beziers",
      "c": "France",
      "p": 77759.5,
      "a": []
    },
    {
      "n": "Annecy",
      "c": "France",
      "p": 77490.5,
      "a": []
    },
    {
      "n": "La Rochelle",
      "c": "France",
      "p": 76903.5,
      "a": []
    },
    {
      "n": "Lorient",
      "c": "France",
      "p": 71532,
      "a": []
    },
    {
      "n": "Bourges",
      "c": "France",
      "p": 70163.5,
      "a": []
    },
    {
      "n": "Troyes",
      "c": "France",
      "p": 61244,
      "a": []
    },
    {
      "n": "Cherbourg",
      "c": "France",
      "p": 60991,
      "a": []
    },
    {
      "n": "Roanne",
      "c": "France",
      "p": 56577.5,
      "a": []
    },
    {
      "n": "Arras",
      "c": "France",
      "p": 55608.5,
      "a": []
    },
    {
      "n": "Brive",
      "c": "France",
      "p": 54457,
      "a": []
    },
    {
      "n": "Tarbes",
      "c": "France",
      "p": 53480,
      "a": []
    },
    {
      "n": "St.-Brieuc",
      "c": "France",
      "p": 52998.5,
      "a": []
    },
    {
      "n": "Ajaccio",
      "c": "France",
      "p": 46905,
      "a": []
    },
    {
      "n": "Agen",
      "c": "France",
      "p": 46295,
      "a": []
    },
    {
      "n": "Nevers",
      "c": "France",
      "p": 44958.5,
      "a": []
    },
    {
      "n": "Bastia",
      "c": "France",
      "p": 40558.5,
      "a": []
    },
    {
      "n": "Dieppe",
      "c": "France",
      "p": 39084,
      "a": []
    },
    {
      "n": "Auxerre",
      "c": "France",
      "p": 38034,
      "a": []
    },
    {
      "n": "Monaco",
      "c": "Monaco",
      "p": 36371,
      "a": []
    },
    {
      "n": "Vichy",
      "c": "France",
      "p": 35088.5,
      "a": []
    }
  ],
  "America/Cayenne": [
    {
      "n": "Cayenne",
      "c": "France",
      "p": 57179.5,
      "a": []
    },
    {
      "n": "Kourou",
      "c": "France",
      "p": 22425.5,
      "a": []
    },
    {
      "n": "Saint-Laurent-du-Maroni",
      "c": "France",
      "p": 20850.5,
      "a": []
    },
    {
      "n": "Sinnamary",
      "c": "France",
      "p": 2781.5,
      "a": []
    },
    {
      "n": "Roura",
      "c": "France",
      "p": 2069.5,
      "a": []
    },
    {
      "n": "Saint-Georges",
      "c": "France",
      "p": 1558,
      "a": []
    },
    {
      "n": "Iracoubo",
      "c": "France",
      "p": 881,
      "a": []
    }
  ],
  "America/Martinique": [
    {
      "n": "Fort-de-France",
      "c": "France",
      "p": 172622,
      "a": []
    }
  ],
  "America/Guadeloupe": [
    {
      "n": "Pointe-a-Pitre",
      "c": "France",
      "p": 81887.5,
      "a": []
    },
    {
      "n": "Basse-terre",
      "c": "France",
      "p": 307,
      "a": []
    }
  ],
  "Indian/Reunion": [
    {
      "n": "St.-Denis",
      "c": "France",
      "p": 163621,
      "a": []
    },
    {
      "n": "St.-Benoit",
      "c": "France",
      "p": 23979,
      "a": []
    }
  ],
  "Indian/Mayotte": [
    {
      "n": "Dzaoudzi",
      "c": "France",
      "p": 23099,
      "a": []
    }
  ],
  "Pacific/Tahiti": [
    {
      "n": "Papeete",
      "c": "French Polynesia",
      "p": 78856,
      "a": []
    }
  ],
  "Africa/Libreville": [
    {
      "n": "Libreville",
      "c": "Gabon",
      "p": 530755.5,
      "a": []
    },
    {
      "n": "Port-Gentil",
      "c": "Gabon",
      "p": 112999.5,
      "a": []
    },
    {
      "n": "Franceville",
      "c": "Gabon",
      "p": 41056,
      "a": []
    },
    {
      "n": "Oyem",
      "c": "Gabon",
      "p": 37146.5,
      "a": []
    },
    {
      "n": "Moanda",
      "c": "Gabon",
      "p": 28633,
      "a": []
    },
    {
      "n": "Mouila",
      "c": "Gabon",
      "p": 25234.5,
      "a": []
    },
    {
      "n": "Lambarene",
      "c": "Gabon",
      "p": 23012,
      "a": []
    },
    {
      "n": "Tchibanga",
      "c": "Gabon",
      "p": 19365,
      "a": []
    },
    {
      "n": "Makokou",
      "c": "Gabon",
      "p": 15320.5,
      "a": []
    },
    {
      "n": "Koulamoutou",
      "c": "Gabon",
      "p": 14343.5,
      "a": []
    },
    {
      "n": "Bitam",
      "c": "Gabon",
      "p": 13967,
      "a": []
    },
    {
      "n": "Gamba",
      "c": "Gabon",
      "p": 7230.5,
      "a": []
    },
    {
      "n": "Okandja",
      "c": "Gabon",
      "p": 7155,
      "a": []
    },
    {
      "n": "Ndende",
      "c": "Gabon",
      "p": 4101,
      "a": []
    },
    {
      "n": "Mitzik",
      "c": "Gabon",
      "p": 3998.5,
      "a": []
    },
    {
      "n": "Mayumba",
      "c": "Gabon",
      "p": 3996,
      "a": []
    },
    {
      "n": "Mekambo",
      "c": "Gabon",
      "p": 3170,
      "a": []
    },
    {
      "n": "Omboue",
      "c": "Gabon",
      "p": 1667,
      "a": []
    },
    {
      "n": "Bifoum",
      "c": "Gabon",
      "p": 134,
      "a": []
    }
  ],
  "Asia/Tbilisi": [
    {
      "n": "Tbilisi",
      "c": "Georgia",
      "p": 1052628.5,
      "a": []
    },
    {
      "n": "Kutaisi",
      "c": "Georgia",
      "p": 181141.5,
      "a": []
    },
    {
      "n": "Rustavi",
      "c": "Georgia",
      "p": 156770,
      "a": []
    },
    {
      "n": "Batumi",
      "c": "Georgia",
      "p": 138674,
      "a": []
    },
    {
      "n": "Sukhumi",
      "c": "Georgia",
      "p": 76219,
      "a": []
    },
    {
      "n": "Poti",
      "c": "Georgia",
      "p": 46001,
      "a": []
    },
    {
      "n": "Tskhinvali",
      "c": "Georgia",
      "p": 26751,
      "a": []
    }
  ],
  "Africa/Accra": [
    {
      "n": "Accra",
      "c": "Ghana",
      "p": 2042132,
      "a": []
    },
    {
      "n": "Kumasi",
      "c": "Ghana",
      "p": 1468575.5,
      "a": []
    },
    {
      "n": "Tamale",
      "c": "Ghana",
      "p": 342871,
      "a": []
    },
    {
      "n": "Sekondi",
      "c": "Ghana",
      "p": 212560,
      "a": []
    },
    {
      "n": "Tema",
      "c": "Ghana",
      "p": 184969.5,
      "a": []
    },
    {
      "n": "Obuasi",
      "c": "Ghana",
      "p": 158986.5,
      "a": []
    },
    {
      "n": "Cape Coast",
      "c": "Ghana",
      "p": 139265.5,
      "a": []
    },
    {
      "n": "Koforidua",
      "c": "Ghana",
      "p": 126459.5,
      "a": []
    },
    {
      "n": "Ho",
      "c": "Ghana",
      "p": 81521,
      "a": []
    },
    {
      "n": "Wa",
      "c": "Ghana",
      "p": 76891.5,
      "a": []
    },
    {
      "n": "Sunyani",
      "c": "Ghana",
      "p": 70299,
      "a": []
    },
    {
      "n": "Bolgatanga",
      "c": "Ghana",
      "p": 68303.5,
      "a": []
    },
    {
      "n": "Bawku",
      "c": "Ghana",
      "p": 65212,
      "a": []
    },
    {
      "n": "Nkawkaw",
      "c": "Ghana",
      "p": 54914.5,
      "a": []
    },
    {
      "n": "Winneba",
      "c": "Ghana",
      "p": 41911,
      "a": []
    },
    {
      "n": "Berekum",
      "c": "Ghana",
      "p": 36484.5,
      "a": []
    },
    {
      "n": "Yendi",
      "c": "Ghana",
      "p": 30841.5,
      "a": []
    }
  ],
  "Europe/Gibraltar": [
    {
      "n": "Gibraltar",
      "c": "Gibraltar",
      "p": 106813.5,
      "a": []
    }
  ],
  "Europe/Athens": [
    {
      "n": "Athens",
      "c": "Greece",
      "p": 1985568.5,
      "a": []
    },
    {
      "n": "Thessaloniki",
      "c": "Greece",
      "p": 591145,
      "a": []
    },
    {
      "n": "Piraiévs",
      "c": "Greece",
      "p": 320881,
      "a": []
    },
    {
      "n": "Patra",
      "c": "Greece",
      "p": 159579.5,
      "a": []
    },
    {
      "n": "Iraklio",
      "c": "Greece",
      "p": 134404,
      "a": []
    },
    {
      "n": "Larissa",
      "c": "Greece",
      "p": 120122.5,
      "a": []
    },
    {
      "n": "Volos",
      "c": "Greece",
      "p": 97528.5,
      "a": []
    },
    {
      "n": "Ioanina",
      "c": "Greece",
      "p": 75158,
      "a": []
    },
    {
      "n": "Hania",
      "c": "Greece",
      "p": 66646.5,
      "a": []
    },
    {
      "n": "Chalkida",
      "c": "Greece",
      "p": 63200,
      "a": []
    },
    {
      "n": "Kalamata",
      "c": "Greece",
      "p": 61465.5,
      "a": []
    },
    {
      "n": "Agrinio",
      "c": "Greece",
      "p": 59379,
      "a": []
    },
    {
      "n": "Rodos",
      "c": "Greece",
      "p": 56548.5,
      "a": []
    },
    {
      "n": "Kavala",
      "c": "Greece",
      "p": 56095,
      "a": []
    },
    {
      "n": "Seres",
      "c": "Greece",
      "p": 50910.5,
      "a": []
    },
    {
      "n": "Katerini",
      "c": "Greece",
      "p": 50850.5,
      "a": []
    },
    {
      "n": "Xanthi",
      "c": "Greece",
      "p": 49395.5,
      "a": []
    },
    {
      "n": "Alexandroupoli",
      "c": "Greece",
      "p": 48711.5,
      "a": []
    },
    {
      "n": "Lamia",
      "c": "Greece",
      "p": 47246,
      "a": []
    },
    {
      "n": "Komatini",
      "c": "Greece",
      "p": 45631,
      "a": []
    },
    {
      "n": "Kerkira",
      "c": "Greece",
      "p": 32760,
      "a": []
    },
    {
      "n": "Mitilini",
      "c": "Greece",
      "p": 28825,
      "a": []
    },
    {
      "n": "Tripoli",
      "c": "Greece",
      "p": 27765.5,
      "a": []
    },
    {
      "n": "Hios",
      "c": "Greece",
      "p": 25422,
      "a": []
    },
    {
      "n": "Pirgos",
      "c": "Greece",
      "p": 22311,
      "a": []
    },
    {
      "n": "Kos",
      "c": "Greece",
      "p": 18967.5,
      "a": []
    },
    {
      "n": "Sparti",
      "c": "Greece",
      "p": 15842,
      "a": []
    },
    {
      "n": "Ermoupoli",
      "c": "Greece",
      "p": 12260,
      "a": []
    },
    {
      "n": "Sitia",
      "c": "Greece",
      "p": 8770,
      "a": []
    },
    {
      "n": "Polygyros",
      "c": "Greece",
      "p": 5258,
      "a": []
    }
  ],
  "America/Godthab": [
    {
      "n": "Nuuk",
      "c": "Greenland",
      "p": 14798,
      "a": []
    },
    {
      "n": "Sisimiut",
      "c": "Greenland",
      "p": 5227,
      "a": []
    },
    {
      "n": "Ilulissat",
      "c": "Greenland",
      "p": 4413,
      "a": []
    },
    {
      "n": "Qaqortoq",
      "c": "Greenland",
      "p": 3224,
      "a": []
    },
    {
      "n": "Paamiut",
      "c": "Greenland",
      "p": 1862,
      "a": []
    },
    {
      "n": "Tasiilaq",
      "c": "Greenland",
      "p": 1829,
      "a": []
    },
    {
      "n": "Qasigiannguit",
      "c": "Greenland",
      "p": 1341,
      "a": []
    },
    {
      "n": "Uummannaq",
      "c": "Greenland",
      "p": 1299,
      "a": []
    },
    {
      "n": "Upernavik",
      "c": "Greenland",
      "p": 1129,
      "a": []
    },
    {
      "n": "Kangerlussuaq",
      "c": "Greenland",
      "p": 556,
      "a": []
    },
    {
      "n": "Kullorsuaq",
      "c": "Greenland",
      "p": 443,
      "a": []
    },
    {
      "n": "Kulusuk",
      "c": "Greenland",
      "p": 286,
      "a": []
    },
    {
      "n": "Tasiusaq",
      "c": "Greenland",
      "p": 249,
      "a": []
    },
    {
      "n": "Nuussuaq",
      "c": "Greenland",
      "p": 204,
      "a": []
    },
    {
      "n": "Kangersuatsiaq",
      "c": "Greenland",
      "p": 193,
      "a": []
    },
    {
      "n": "Narsarsuaq",
      "c": "Greenland",
      "p": 145,
      "a": []
    },
    {
      "n": "Timmiarmiut",
      "c": "Greenland",
      "p": 10,
      "a": []
    },
    {
      "n": "Nord",
      "c": "Greenland",
      "p": 10,
      "a": []
    },
    {
      "n": "Qeqertasuaq",
      "c": "Greenland",
      "p": 7.5,
      "a": []
    }
  ],
  "America/Danmarkshavn": [
    {
      "n": "Ittoqqortoormiit",
      "c": "Greenland",
      "p": 469,
      "a": []
    }
  ],
  "America/Thule": [
    {
      "n": "Qaanaaq",
      "c": "Greenland",
      "p": 437,
      "a": []
    },
    {
      "n": "Savissivik",
      "c": "Greenland",
      "p": 66,
      "a": []
    }
  ],
  "America/Grenada": [
    {
      "n": "Saint George's",
      "c": "Grenada",
      "p": 30538.5,
      "a": []
    }
  ],
  "Pacific/Guam": [
    {
      "n": "Agana",
      "c": "Guam",
      "p": 61755.5,
      "a": []
    }
  ],
  "America/Guatemala": [
    {
      "n": "Guatemala",
      "c": "Guatemala",
      "p": 1009469,
      "a": []
    },
    {
      "n": "Quetzaltenango",
      "c": "Guatemala",
      "p": 399983,
      "a": []
    },
    {
      "n": "El Progreso",
      "c": "Guatemala",
      "p": 147197,
      "a": []
    },
    {
      "n": "Escuintla",
      "c": "Guatemala",
      "p": 105401.5,
      "a": []
    },
    {
      "n": "Huehuetenango",
      "c": "Guatemala",
      "p": 82709,
      "a": []
    },
    {
      "n": "Chimaltenango",
      "c": "Guatemala",
      "p": 82370,
      "a": []
    },
    {
      "n": "Totonicapan",
      "c": "Guatemala",
      "p": 69734,
      "a": []
    },
    {
      "n": "San Luis",
      "c": "Guatemala",
      "p": 69623,
      "a": []
    },
    {
      "n": "Coban",
      "c": "Guatemala",
      "p": 59284.5,
      "a": []
    },
    {
      "n": "Puerto Barrios",
      "c": "Guatemala",
      "p": 54877.5,
      "a": []
    },
    {
      "n": "Mazatenango",
      "c": "Guatemala",
      "p": 54392,
      "a": []
    },
    {
      "n": "Jalapa",
      "c": "Guatemala",
      "p": 45834,
      "a": []
    },
    {
      "n": "Solola",
      "c": "Guatemala",
      "p": 45373,
      "a": []
    },
    {
      "n": "Jutiapa",
      "c": "Guatemala",
      "p": 42506.5,
      "a": []
    },
    {
      "n": "Chiquimula",
      "c": "Guatemala",
      "p": 41521,
      "a": []
    },
    {
      "n": "Salama",
      "c": "Guatemala",
      "p": 40000,
      "a": []
    },
    {
      "n": "Antigua Guatemala",
      "c": "Guatemala",
      "p": 39368,
      "a": []
    },
    {
      "n": "Retalhuleu",
      "c": "Guatemala",
      "p": 36656,
      "a": []
    },
    {
      "n": "Zacapa",
      "c": "Guatemala",
      "p": 36088,
      "a": []
    },
    {
      "n": "Flores",
      "c": "Guatemala",
      "p": 29249.5,
      "a": []
    },
    {
      "n": "San Marcos",
      "c": "Guatemala",
      "p": 25088,
      "a": []
    },
    {
      "n": "Santa Cruz Del Quiche",
      "c": "Guatemala",
      "p": 23618,
      "a": []
    },
    {
      "n": "Cuilapa",
      "c": "Guatemala",
      "p": 16484,
      "a": []
    },
    {
      "n": "San Jose",
      "c": "Guatemala",
      "p": 14248,
      "a": [
        "SJC"
      ]
    },
    {
      "n": "Livingston",
      "c": "Guatemala",
      "p": 12302.5,
      "a": []
    },
    {
      "n": "La Libertad",
      "c": "Guatemala",
      "p": 8584.5,
      "a": []
    }
  ],
  "Africa/Conakry": [
    {
      "n": "Conakry",
      "c": "Guinea",
      "p": 1494000,
      "a": []
    },
    {
      "n": "Gueckedou",
      "c": "Guinea",
      "p": 221715,
      "a": []
    },
    {
      "n": "Nzerekore",
      "c": "Guinea",
      "p": 150424.5,
      "a": []
    },
    {
      "n": "Boke",
      "c": "Guinea",
      "p": 116270,
      "a": []
    },
    {
      "n": "Kankan",
      "c": "Guinea",
      "p": 110457.5,
      "a": []
    },
    {
      "n": "Labe",
      "c": "Guinea",
      "p": 99612,
      "a": []
    },
    {
      "n": "Kindia",
      "c": "Guinea",
      "p": 93511,
      "a": []
    },
    {
      "n": "Kissidougou",
      "c": "Guinea",
      "p": 56957,
      "a": []
    },
    {
      "n": "Mamou",
      "c": "Guinea",
      "p": 56386,
      "a": []
    },
    {
      "n": "Siguiri",
      "c": "Guinea",
      "p": 46880,
      "a": []
    },
    {
      "n": "Macenta",
      "c": "Guinea",
      "p": 42167.5,
      "a": []
    },
    {
      "n": "Kamsar",
      "c": "Guinea",
      "p": 34973,
      "a": []
    },
    {
      "n": "Telimele",
      "c": "Guinea",
      "p": 30311,
      "a": []
    },
    {
      "n": "Tongue",
      "c": "Guinea",
      "p": 25531,
      "a": []
    },
    {
      "n": "Fria",
      "c": "Guinea",
      "p": 23729,
      "a": []
    },
    {
      "n": "Pita",
      "c": "Guinea",
      "p": 20052,
      "a": []
    },
    {
      "n": "Faranah",
      "c": "Guinea",
      "p": 14409.5,
      "a": []
    },
    {
      "n": "Kouroussa",
      "c": "Guinea",
      "p": 14223,
      "a": []
    },
    {
      "n": "Koundara",
      "c": "Guinea",
      "p": 13990,
      "a": []
    },
    {
      "n": "Beyla",
      "c": "Guinea",
      "p": 13204,
      "a": []
    },
    {
      "n": "Dabola",
      "c": "Guinea",
      "p": 13057,
      "a": []
    },
    {
      "n": "Forecariah",
      "c": "Guinea",
      "p": 12358,
      "a": []
    },
    {
      "n": "Kerouane",
      "c": "Guinea",
      "p": 11317,
      "a": []
    },
    {
      "n": "Gaoual",
      "c": "Guinea",
      "p": 7461,
      "a": []
    },
    {
      "n": "Dalaba",
      "c": "Guinea",
      "p": 6349,
      "a": []
    },
    {
      "n": "Dinguiraye",
      "c": "Guinea",
      "p": 6062,
      "a": []
    },
    {
      "n": "Mali",
      "c": "Guinea",
      "p": 5479,
      "a": []
    },
    {
      "n": "Yomou",
      "c": "Guinea",
      "p": 2607.5,
      "a": []
    },
    {
      "n": "Boffa",
      "c": "Guinea",
      "p": 2332,
      "a": []
    }
  ],
  "Africa/Bissau": [
    {
      "n": "Bissau",
      "c": "Guinea Bissau",
      "p": 395683.5,
      "a": []
    },
    {
      "n": "Bafata",
      "c": "Guinea Bissau",
      "p": 26112.5,
      "a": []
    },
    {
      "n": "Gabu",
      "c": "Guinea Bissau",
      "p": 14430,
      "a": []
    },
    {
      "n": "Cacheu",
      "c": "Guinea Bissau",
      "p": 10490,
      "a": []
    },
    {
      "n": "Catio",
      "c": "Guinea Bissau",
      "p": 9898,
      "a": []
    },
    {
      "n": "Bolama",
      "c": "Guinea Bissau",
      "p": 9179,
      "a": []
    },
    {
      "n": "Farim",
      "c": "Guinea Bissau",
      "p": 6792,
      "a": []
    },
    {
      "n": "Fulacunda",
      "c": "Guinea Bissau",
      "p": 1311,
      "a": []
    }
  ],
  "America/Guyana": [
    {
      "n": "Georgetown",
      "c": "Guyana",
      "p": 249683.5,
      "a": []
    },
    {
      "n": "New Amsterdam",
      "c": "Guyana",
      "p": 40956.5,
      "a": []
    },
    {
      "n": "Linden",
      "c": "Guyana",
      "p": 28041.5,
      "a": []
    },
    {
      "n": "Corriverton",
      "c": "Guyana",
      "p": 11787,
      "a": []
    },
    {
      "n": "Bartica",
      "c": "Guyana",
      "p": 11340.5,
      "a": []
    },
    {
      "n": "Anna Regina",
      "c": "Guyana",
      "p": 3113,
      "a": []
    },
    {
      "n": "Mabaruma",
      "c": "Guyana",
      "p": 2972,
      "a": []
    },
    {
      "n": "Kumaka",
      "c": "Guyana",
      "p": 1467.5,
      "a": []
    },
    {
      "n": "Lethem",
      "c": "Guyana",
      "p": 352,
      "a": []
    },
    {
      "n": "Ituni",
      "c": "Guyana",
      "p": 75,
      "a": []
    }
  ],
  "America/Port-au-Prince": [
    {
      "n": "Port-au-Prince",
      "c": "Haiti",
      "p": 1616371,
      "a": []
    },
    {
      "n": "Cap-Haitien",
      "c": "Haiti",
      "p": 208151,
      "a": []
    },
    {
      "n": "Gonaives",
      "c": "Haiti",
      "p": 125819.5,
      "a": []
    },
    {
      "n": "Les Cayes",
      "c": "Haiti",
      "p": 122728.5,
      "a": []
    },
    {
      "n": "Port-De-Paix",
      "c": "Haiti",
      "p": 34657,
      "a": []
    },
    {
      "n": "Jacmel",
      "c": "Haiti",
      "p": 33563,
      "a": []
    },
    {
      "n": "Jeremie",
      "c": "Haiti",
      "p": 30917,
      "a": []
    },
    {
      "n": "Hinche",
      "c": "Haiti",
      "p": 18590,
      "a": []
    },
    {
      "n": "Fort-Liberte",
      "c": "Haiti",
      "p": 11465,
      "a": []
    }
  ],
  "America/Tegucigalpa": [
    {
      "n": "Tegucigalpa",
      "c": "Honduras",
      "p": 898424,
      "a": []
    },
    {
      "n": "San Pedro Sula",
      "c": "Honduras",
      "p": 584778.5,
      "a": []
    },
    {
      "n": "La Ceiba",
      "c": "Honduras",
      "p": 138072,
      "a": []
    },
    {
      "n": "Choluteca",
      "c": "Honduras",
      "p": 87650.5,
      "a": []
    },
    {
      "n": "Comayagua",
      "c": "Honduras",
      "p": 64963,
      "a": []
    },
    {
      "n": "Juticalpa",
      "c": "Honduras",
      "p": 35564,
      "a": []
    },
    {
      "n": "Santa Rosa de Copan",
      "c": "Honduras",
      "p": 31641,
      "a": []
    },
    {
      "n": "Nacaome",
      "c": "Honduras",
      "p": 30464.5,
      "a": []
    },
    {
      "n": "La Paz",
      "c": "Honduras",
      "p": 17555,
      "a": []
    },
    {
      "n": "Yoro",
      "c": "Honduras",
      "p": 15774,
      "a": []
    },
    {
      "n": "Santa Barbara",
      "c": "Honduras",
      "p": 15119,
      "a": []
    },
    {
      "n": "Nueva Ocotepeque",
      "c": "Honduras",
      "p": 8780,
      "a": []
    },
    {
      "n": "Gracias",
      "c": "Honduras",
      "p": 7909,
      "a": []
    },
    {
      "n": "Roatan",
      "c": "Honduras",
      "p": 7514,
      "a": []
    },
    {
      "n": "Trujillo",
      "c": "Honduras",
      "p": 7366.5,
      "a": []
    },
    {
      "n": "La Esperanza",
      "c": "Honduras",
      "p": 5318,
      "a": []
    },
    {
      "n": "Puerto Lempira",
      "c": "Honduras",
      "p": 4760,
      "a": []
    },
    {
      "n": "Brus Laguna",
      "c": "Honduras",
      "p": 4067,
      "a": []
    },
    {
      "n": "Yuscaran",
      "c": "Honduras",
      "p": 2371,
      "a": []
    }
  ],
  "Asia/Hong_Kong": [
    {
      "n": "Hong Kong",
      "c": "Hong Kong S.A.R.",
      "p": 5878789.5,
      "a": [
        "HKG"
      ]
    }
  ],
  "Europe/Budapest": [
    {
      "n": "Budapest",
      "c": "Hungary",
      "p": 1679000,
      "a": []
    },
    {
      "n": "Debrecen",
      "c": "Hungary",
      "p": 217705,
      "a": []
    },
    {
      "n": "Miskolc",
      "c": "Hungary",
      "p": 210197,
      "a": []
    },
    {
      "n": "Szeged",
      "c": "Hungary",
      "p": 176324,
      "a": []
    },
    {
      "n": "Pecs",
      "c": "Hungary",
      "p": 171455.5,
      "a": []
    },
    {
      "n": "Nyiregyhaza",
      "c": "Hungary",
      "p": 146589,
      "a": []
    },
    {
      "n": "Gyor",
      "c": "Hungary",
      "p": 132173,
      "a": []
    },
    {
      "n": "Szekesfehervar",
      "c": "Hungary",
      "p": 122959.5,
      "a": []
    },
    {
      "n": "Kecskemet",
      "c": "Hungary",
      "p": 111871,
      "a": []
    },
    {
      "n": "Szombathely",
      "c": "Hungary",
      "p": 94526,
      "a": []
    },
    {
      "n": "Szolnok",
      "c": "Hungary",
      "p": 92367.5,
      "a": []
    },
    {
      "n": "Kaposvar",
      "c": "Hungary",
      "p": 88137,
      "a": []
    },
    {
      "n": "Tatabanya",
      "c": "Hungary",
      "p": 70541,
      "a": []
    },
    {
      "n": "Bekescsaba",
      "c": "Hungary",
      "p": 65206,
      "a": []
    },
    {
      "n": "Veszprem",
      "c": "Hungary",
      "p": 62023,
      "a": []
    },
    {
      "n": "Zalaegerszeg",
      "c": "Hungary",
      "p": 61898,
      "a": []
    },
    {
      "n": "Eger",
      "c": "Hungary",
      "p": 56647,
      "a": []
    },
    {
      "n": "Salgotarjan",
      "c": "Hungary",
      "p": 39640,
      "a": []
    },
    {
      "n": "Vac",
      "c": "Hungary",
      "p": 35200.5,
      "a": []
    },
    {
      "n": "Szekszard",
      "c": "Hungary",
      "p": 34174,
      "a": []
    }
  ],
  "Atlantic/Reykjavik": [
    {
      "n": "Reykjavík",
      "c": "Iceland",
      "p": 140059,
      "a": []
    },
    {
      "n": "Akureyi",
      "c": "Iceland",
      "p": 14754,
      "a": []
    },
    {
      "n": "Keflavík",
      "c": "Iceland",
      "p": 7377,
      "a": []
    },
    {
      "n": "Selfoss",
      "c": "Iceland",
      "p": 5030.5,
      "a": []
    },
    {
      "n": "Sauðárkrókur",
      "c": "Iceland",
      "p": 2191,
      "a": []
    },
    {
      "n": "Ísafjörður",
      "c": "Iceland",
      "p": 1949.5,
      "a": []
    },
    {
      "n": "Egilsstaðir",
      "c": "Iceland",
      "p": 1822.5,
      "a": []
    },
    {
      "n": "Borgarnes",
      "c": "Iceland",
      "p": 1783,
      "a": []
    },
    {
      "n": "Hofn",
      "c": "Iceland",
      "p": 1695,
      "a": []
    }
  ],
  "Asia/Kolkata": [
    {
      "n": "Mumbai",
      "c": "India",
      "p": 15834918,
      "a": [
        "BOM"
      ]
    },
    {
      "n": "Delhi",
      "c": "India",
      "p": 11779606.5,
      "a": [
        "DEL"
      ]
    },
    {
      "n": "Kolkata",
      "c": "India",
      "p": 9709196,
      "a": []
    },
    {
      "n": "Bengaluru",
      "c": "India",
      "p": 5945523.5,
      "a": []
    },
    {
      "n": "Chennai",
      "c": "India",
      "p": 5745531.5,
      "a": []
    },
    {
      "n": "Hyderabad",
      "c": "India",
      "p": 4986908,
      "a": []
    },
    {
      "n": "Ahmedabad",
      "c": "India",
      "p": 4547355,
      "a": []
    },
    {
      "n": "Pune",
      "c": "India",
      "p": 3803872,
      "a": []
    },
    {
      "n": "Surat",
      "c": "India",
      "p": 3368252,
      "a": []
    },
    {
      "n": "Kanpur",
      "c": "India",
      "p": 2992624.5,
      "a": []
    },
    {
      "n": "Haora",
      "c": "India",
      "p": 2934655,
      "a": []
    },
    {
      "n": "Jaipur",
      "c": "India",
      "p": 2814379,
      "a": []
    },
    {
      "n": "Lucknow",
      "c": "India",
      "p": 2583505.5,
      "a": []
    },
    {
      "n": "Nagpur",
      "c": "India",
      "p": 2341009,
      "a": []
    },
    {
      "n": "Indore",
      "c": "India",
      "p": 1931520.5,
      "a": []
    },
    {
      "n": "Patna",
      "c": "India",
      "p": 1878960,
      "a": []
    },
    {
      "n": "Bhopal",
      "c": "India",
      "p": 1663457,
      "a": []
    },
    {
      "n": "Ludhiana",
      "c": "India",
      "p": 1597184,
      "a": []
    },
    {
      "n": "Vadodara",
      "c": "India",
      "p": 1582738,
      "a": []
    },
    {
      "n": "Kalyan",
      "c": "India",
      "p": 1576614,
      "a": []
    },
    {
      "n": "Agra",
      "c": "India",
      "p": 1511027.5,
      "a": []
    },
    {
      "n": "Faridabad",
      "c": "India",
      "p": 1394000,
      "a": []
    },
    {
      "n": "Nasik",
      "c": "India",
      "p": 1381248.5,
      "a": []
    },
    {
      "n": "Asansol",
      "c": "India",
      "p": 1328000,
      "a": []
    },
    {
      "n": "Coimbatore",
      "c": "India",
      "p": 1327911.5,
      "a": []
    },
    {
      "n": "Meerut",
      "c": "India",
      "p": 1310592,
      "a": []
    },
    {
      "n": "Vishakhapatnam",
      "c": "India",
      "p": 1296089,
      "a": []
    },
    {
      "n": "Ghaziabad",
      "c": "India",
      "p": 1270095.5,
      "a": []
    },
    {
      "n": "Varanasi",
      "c": "India",
      "p": 1258202,
      "a": []
    },
    {
      "n": "Rajkot",
      "c": "India",
      "p": 1179941,
      "a": []
    },
    {
      "n": "Jabalpur",
      "c": "India",
      "p": 1157584,
      "a": []
    },
    {
      "n": "Amritsar",
      "c": "India",
      "p": 1152225,
      "a": []
    },
    {
      "n": "Prayagraj",
      "c": "India",
      "p": 1137219,
      "a": []
    },
    {
      "n": "Madurai",
      "c": "India",
      "p": 1101954,
      "a": []
    },
    {
      "n": "Bhilai",
      "c": "India",
      "p": 1097000,
      "a": []
    },
    {
      "n": "Chhatrapati Sambhajinagar",
      "c": "India",
      "p": 1064720.5,
      "a": []
    },
    {
      "n": "Kochi",
      "c": "India",
      "p": 1061848,
      "a": []
    },
    {
      "n": "Srinagar",
      "c": "India",
      "p": 1057928.5,
      "a": []
    },
    {
      "n": "Warangal",
      "c": "India",
      "p": 1034690,
      "a": []
    },
    {
      "n": "Sholapur",
      "c": "India",
      "p": 1009056,
      "a": []
    },
    {
      "n": "Vijayawada",
      "c": "India",
      "p": 1005793.5,
      "a": []
    },
    {
      "n": "Jodhpur",
      "c": "India",
      "p": 958238,
      "a": []
    },
    {
      "n": "Jamshedpur",
      "c": "India",
      "p": 958169,
      "a": []
    },
    {
      "n": "Chandigarh",
      "c": "India",
      "p": 946685.5,
      "a": []
    },
    {
      "n": "Ranchi",
      "c": "India",
      "p": 945227,
      "a": []
    },
    {
      "n": "Gwalior",
      "c": "India",
      "p": 930229,
      "a": []
    },
    {
      "n": "Mysuru",
      "c": "India",
      "p": 877656.5,
      "a": []
    },
    {
      "n": "Thiruvananthapuram",
      "c": "India",
      "p": 869076.5,
      "a": []
    },
    {
      "n": "Tiruchirappalli",
      "c": "India",
      "p": 863242,
      "a": []
    },
    {
      "n": "Hubballi",
      "c": "India",
      "p": 841402,
      "a": []
    },
    {
      "n": "Salem",
      "c": "India",
      "p": 825698,
      "a": []
    },
    {
      "n": "Jullundur",
      "c": "India",
      "p": 820089,
      "a": []
    },
    {
      "n": "Bhubaneshwar",
      "c": "India",
      "p": 803121.5,
      "a": []
    },
    {
      "n": "Kota",
      "c": "India",
      "p": 795044,
      "a": []
    },
    {
      "n": "Bareilly",
      "c": "India",
      "p": 781217.5,
      "a": []
    },
    {
      "n": "Aligarh",
      "c": "India",
      "p": 779103.5,
      "a": []
    },
    {
      "n": "Atal Nagar",
      "c": "India",
      "p": 777497.5,
      "a": []
    },
    {
      "n": "Moradabad",
      "c": "India",
      "p": 754069.5,
      "a": []
    },
    {
      "n": "Bhiwandi",
      "c": "India",
      "p": 751017.5,
      "a": []
    },
    {
      "n": "Dhanbad",
      "c": "India",
      "p": 732818,
      "a": []
    },
    {
      "n": "Kozhikode",
      "c": "India",
      "p": 696461,
      "a": []
    },
    {
      "n": "Gorakhpur",
      "c": "India",
      "p": 674246,
      "a": []
    },
    {
      "n": "Amravati",
      "c": "India",
      "p": 669144,
      "a": []
    },
    {
      "n": "Kolhapur",
      "c": "India",
      "p": 655920.5,
      "a": []
    },
    {
      "n": "Dehra Dun",
      "c": "India",
      "p": 646321.5,
      "a": []
    },
    {
      "n": "Jammu",
      "c": "India",
      "p": 628283.5,
      "a": []
    },
    {
      "n": "Jhansi",
      "c": "India",
      "p": 619710.5,
      "a": []
    },
    {
      "n": "Belagavi",
      "c": "India",
      "p": 609472.5,
      "a": []
    },
    {
      "n": "Sangli",
      "c": "India",
      "p": 601214,
      "a": []
    },
    {
      "n": "Mangaluru",
      "c": "India",
      "p": 597009.5,
      "a": []
    },
    {
      "n": "Nanded",
      "c": "India",
      "p": 587136,
      "a": []
    },
    {
      "n": "Cuttack",
      "c": "India",
      "p": 580000,
      "a": []
    },
    {
      "n": "Malegaon",
      "c": "India",
      "p": 563103,
      "a": []
    },
    {
      "n": "Raurkela",
      "c": "India",
      "p": 554730,
      "a": []
    },
    {
      "n": "Ajmer",
      "c": "India",
      "p": 553948,
      "a": []
    },
    {
      "n": "Tiruppur",
      "c": "India",
      "p": 547271.5,
      "a": []
    },
    {
      "n": "Nellore",
      "c": "India",
      "p": 541081,
      "a": []
    },
    {
      "n": "Guntur",
      "c": "India",
      "p": 530577,
      "a": []
    },
    {
      "n": "Siliguri",
      "c": "India",
      "p": 515574,
      "a": []
    },
    {
      "n": "Bhavnagar",
      "c": "India",
      "p": 509790,
      "a": []
    },
    {
      "n": "Guwahati",
      "c": "India",
      "p": 500258,
      "a": []
    },
    {
      "n": "Tirunelveli",
      "c": "India",
      "p": 489022,
      "a": []
    },
    {
      "n": "Shivamogga",
      "c": "India",
      "p": 486802.5,
      "a": []
    },
    {
      "n": "Bikaner",
      "c": "India",
      "p": 485961.5,
      "a": []
    },
    {
      "n": "Ujjain",
      "c": "India",
      "p": 485348,
      "a": []
    },
    {
      "n": "Saharanpur",
      "c": "India",
      "p": 484873,
      "a": []
    },
    {
      "n": "Bhatpara",
      "c": "India",
      "p": 483129,
      "a": []
    },
    {
      "n": "Gulbarga",
      "c": "India",
      "p": 482546.5,
      "a": []
    },
    {
      "n": "Davangere",
      "c": "India",
      "p": 469344.5,
      "a": []
    },
    {
      "n": "Akola",
      "c": "India",
      "p": 466179.5,
      "a": []
    },
    {
      "n": "Chandrapur",
      "c": "India",
      "p": 461734.5,
      "a": []
    },
    {
      "n": "Udaipur",
      "c": "India",
      "p": 446260.5,
      "a": []
    },
    {
      "n": "Bilaspur",
      "c": "India",
      "p": 436780,
      "a": []
    },
    {
      "n": "Tuticorin",
      "c": "India",
      "p": 436094,
      "a": []
    },
    {
      "n": "Gaya",
      "c": "India",
      "p": 423692,
      "a": []
    },
    {
      "n": "Hisar",
      "c": "India",
      "p": 423039,
      "a": []
    },
    {
      "n": "Dhule",
      "c": "India",
      "p": 423026.5,
      "a": []
    },
    {
      "n": "Kollam",
      "c": "India",
      "p": 394163,
      "a": []
    },
    {
      "n": "Ballari",
      "c": "India",
      "p": 391034.5,
      "a": []
    },
    {
      "n": "Ahmednagar",
      "c": "India",
      "p": 379450,
      "a": []
    }
  ],
  "Asia/Jakarta": [
    {
      "n": "Jakarta",
      "c": "Indonesia",
      "p": 8832560.5,
      "a": []
    },
    {
      "n": "Surabaya",
      "c": "Indonesia",
      "p": 2609829,
      "a": []
    },
    {
      "n": "Bandung",
      "c": "Indonesia",
      "p": 2046859.5,
      "a": []
    },
    {
      "n": "Bekasi",
      "c": "Indonesia",
      "p": 1949165,
      "a": []
    },
    {
      "n": "Medan",
      "c": "Indonesia",
      "p": 1932985.5,
      "a": []
    },
    {
      "n": "Palembang",
      "c": "Indonesia",
      "p": 1595250,
      "a": []
    },
    {
      "n": "Semarang",
      "c": "Indonesia",
      "p": 1342042,
      "a": []
    },
    {
      "n": "Cilacap",
      "c": "Indonesia",
      "p": 1174964,
      "a": []
    },
    {
      "n": "Bandar Lampung",
      "c": "Indonesia",
      "p": 881801,
      "a": []
    },
    {
      "n": "Bogor",
      "c": "Indonesia",
      "p": 859000,
      "a": []
    },
    {
      "n": "Padang",
      "c": "Indonesia",
      "p": 847676,
      "a": []
    },
    {
      "n": "Bandar Lampung",
      "c": "Indonesia",
      "p": 795757,
      "a": []
    },
    {
      "n": "Malang",
      "c": "Indonesia",
      "p": 775858,
      "a": []
    },
    {
      "n": "Pekanbaru",
      "c": "Indonesia",
      "p": 705218,
      "a": []
    },
    {
      "n": "Yogyakarta",
      "c": "Indonesia",
      "p": 636660,
      "a": []
    },
    {
      "n": "Surakarta",
      "c": "Indonesia",
      "p": 555308,
      "a": []
    },
    {
      "n": "Jambi",
      "c": "Indonesia",
      "p": 438706.5,
      "a": []
    },
    {
      "n": "Binjai",
      "c": "Indonesia",
      "p": 405494.5,
      "a": []
    },
    {
      "n": "Bengkulu",
      "c": "Indonesia",
      "p": 368192.5,
      "a": []
    },
    {
      "n": "Banda Aceh",
      "c": "Indonesia",
      "p": 344065.5,
      "a": []
    },
    {
      "n": "Pasuruan",
      "c": "Indonesia",
      "p": 343161,
      "a": []
    },
    {
      "n": "Bukittinggi",
      "c": "Indonesia",
      "p": 302855,
      "a": []
    },
    {
      "n": "Jember",
      "c": "Indonesia",
      "p": 298585,
      "a": []
    },
    {
      "n": "Sukabumi",
      "c": "Indonesia",
      "p": 276414,
      "a": []
    },
    {
      "n": "Pematangsiantar",
      "c": "Indonesia",
      "p": 275407,
      "a": []
    },
    {
      "n": "Tasikmalaya",
      "c": "Indonesia",
      "p": 271143,
      "a": []
    },
    {
      "n": "Pakalongan",
      "c": "Indonesia",
      "p": 264972.5,
      "a": []
    },
    {
      "n": "Cirebon",
      "c": "Indonesia",
      "p": 254298,
      "a": []
    },
    {
      "n": "Tegal",
      "c": "Indonesia",
      "p": 237084,
      "a": []
    },
    {
      "n": "Kediri",
      "c": "Indonesia",
      "p": 235143,
      "a": []
    },
    {
      "n": "Tebingtinggi",
      "c": "Indonesia",
      "p": 192786.5,
      "a": []
    },
    {
      "n": "Madiun",
      "c": "Indonesia",
      "p": 186099,
      "a": []
    },
    {
      "n": "Padangsidempuan",
      "c": "Indonesia",
      "p": 183721.5,
      "a": []
    },
    {
      "n": "Probolinggo",
      "c": "Indonesia",
      "p": 181656,
      "a": []
    },
    {
      "n": "Tanjungpinang",
      "c": "Indonesia",
      "p": 176069,
      "a": []
    },
    {
      "n": "Salatiga",
      "c": "Indonesia",
      "p": 174322.5,
      "a": []
    },
    {
      "n": "Serang",
      "c": "Indonesia",
      "p": 164767,
      "a": []
    },
    {
      "n": "Sibolga",
      "c": "Indonesia",
      "p": 148513,
      "a": []
    },
    {
      "n": "Banyuwangi",
      "c": "Indonesia",
      "p": 140295,
      "a": []
    },
    {
      "n": "Blitar",
      "c": "Indonesia",
      "p": 132416,
      "a": []
    },
    {
      "n": "Indramayu",
      "c": "Indonesia",
      "p": 123263,
      "a": []
    },
    {
      "n": "Pati",
      "c": "Indonesia",
      "p": 122785,
      "a": []
    },
    {
      "n": "Langsa",
      "c": "Indonesia",
      "p": 117256,
      "a": []
    },
    {
      "n": "Lhokseumawe",
      "c": "Indonesia",
      "p": 114648,
      "a": []
    },
    {
      "n": "Mojokerto",
      "c": "Indonesia",
      "p": 112557,
      "a": []
    },
    {
      "n": "Magelang",
      "c": "Indonesia",
      "p": 111461,
      "a": []
    },
    {
      "n": "Pangkalpinang",
      "c": "Indonesia",
      "p": 99785.5,
      "a": []
    },
    {
      "n": "Sumenep",
      "c": "Indonesia",
      "p": 84656,
      "a": []
    },
    {
      "n": "Perabumulih",
      "c": "Indonesia",
      "p": 83754,
      "a": []
    },
    {
      "n": "Tuban",
      "c": "Indonesia",
      "p": 76242,
      "a": []
    },
    {
      "n": "Tanjungpandan",
      "c": "Indonesia",
      "p": 61591,
      "a": []
    },
    {
      "n": "Sungaipenuh",
      "c": "Indonesia",
      "p": 56773,
      "a": []
    },
    {
      "n": "Lahat",
      "c": "Indonesia",
      "p": 50469.5,
      "a": []
    },
    {
      "n": "Sawahlunto",
      "c": "Indonesia",
      "p": 50354,
      "a": []
    },
    {
      "n": "Padangpanjang",
      "c": "Indonesia",
      "p": 44096,
      "a": []
    },
    {
      "n": "Kotabumi",
      "c": "Indonesia",
      "p": 42366,
      "a": []
    },
    {
      "n": "Tarutung",
      "c": "Indonesia",
      "p": 1305,
      "a": []
    },
    {
      "n": "Telukbutun",
      "c": "Indonesia",
      "p": 140,
      "a": []
    }
  ],
  "Asia/Jayapura": [
    {
      "n": "Ambon",
      "c": "Indonesia",
      "p": 227561,
      "a": []
    },
    {
      "n": "Jayapura",
      "c": "Indonesia",
      "p": 152118,
      "a": []
    },
    {
      "n": "Ternate",
      "c": "Indonesia",
      "p": 144626,
      "a": []
    },
    {
      "n": "Sorong",
      "c": "Indonesia",
      "p": 125535,
      "a": []
    },
    {
      "n": "Biak",
      "c": "Indonesia",
      "p": 103610,
      "a": []
    },
    {
      "n": "Manokwari",
      "c": "Indonesia",
      "p": 63847,
      "a": []
    },
    {
      "n": "Tidore",
      "c": "Indonesia",
      "p": 60611,
      "a": []
    },
    {
      "n": "Merauke",
      "c": "Indonesia",
      "p": 34412,
      "a": []
    },
    {
      "n": "Nabire",
      "c": "Indonesia",
      "p": 28834.5,
      "a": []
    },
    {
      "n": "Amahai",
      "c": "Indonesia",
      "p": 26172.5,
      "a": []
    },
    {
      "n": "Timika",
      "c": "Indonesia",
      "p": 26021,
      "a": []
    }
  ],
  "Asia/Makassar": [
    {
      "n": "Ujungpandang",
      "c": "Indonesia",
      "p": 1262000,
      "a": []
    },
    {
      "n": "Bandjarmasin",
      "c": "Indonesia",
      "p": 588206.5,
      "a": []
    },
    {
      "n": "Denpasar",
      "c": "Indonesia",
      "p": 569133.5,
      "a": []
    },
    {
      "n": "Palu",
      "c": "Indonesia",
      "p": 473871,
      "a": []
    },
    {
      "n": "Samarinda",
      "c": "Indonesia",
      "p": 473694,
      "a": []
    },
    {
      "n": "Manado",
      "c": "Indonesia",
      "p": 449497.5,
      "a": []
    },
    {
      "n": "Balikpapan",
      "c": "Indonesia",
      "p": 439885.5,
      "a": []
    },
    {
      "n": "Mataram",
      "c": "Indonesia",
      "p": 409041.5,
      "a": []
    },
    {
      "n": "Kupang",
      "c": "Indonesia",
      "p": 270798,
      "a": []
    },
    {
      "n": "Gorontalo",
      "c": "Indonesia",
      "p": 254846,
      "a": []
    },
    {
      "n": "Singaraja",
      "c": "Indonesia",
      "p": 184126,
      "a": []
    },
    {
      "n": "Pinrang",
      "c": "Indonesia",
      "p": 182731,
      "a": []
    },
    {
      "n": "Kendari",
      "c": "Indonesia",
      "p": 165377,
      "a": []
    },
    {
      "n": "Martapura",
      "c": "Indonesia",
      "p": 164844,
      "a": []
    },
    {
      "n": "Majene",
      "c": "Indonesia",
      "p": 155046,
      "a": []
    },
    {
      "n": "Tarakan",
      "c": "Indonesia",
      "p": 145273.5,
      "a": []
    },
    {
      "n": "Raba",
      "c": "Indonesia",
      "p": 106101,
      "a": []
    },
    {
      "n": "Bontang",
      "c": "Indonesia",
      "p": 101691,
      "a": []
    },
    {
      "n": "Parepare",
      "c": "Indonesia",
      "p": 87776,
      "a": []
    },
    {
      "n": "Maumere",
      "c": "Indonesia",
      "p": 75941.5,
      "a": []
    },
    {
      "n": "Ende",
      "c": "Indonesia",
      "p": 60930,
      "a": []
    },
    {
      "n": "Watampone",
      "c": "Indonesia",
      "p": 58953,
      "a": []
    },
    {
      "n": "Ruteng",
      "c": "Indonesia",
      "p": 44272.5,
      "a": []
    },
    {
      "n": "Luwuk",
      "c": "Indonesia",
      "p": 43550.5,
      "a": []
    },
    {
      "n": "Poso",
      "c": "Indonesia",
      "p": 41507,
      "a": []
    },
    {
      "n": "Waingapu",
      "c": "Indonesia",
      "p": 35990.5,
      "a": []
    },
    {
      "n": "Praya",
      "c": "Indonesia",
      "p": 35183,
      "a": []
    },
    {
      "n": "Baubau",
      "c": "Indonesia",
      "p": 24412,
      "a": []
    },
    {
      "n": "Kuta",
      "c": "Indonesia",
      "p": 22879.5,
      "a": []
    },
    {
      "n": "Makale",
      "c": "Indonesia",
      "p": 9960,
      "a": []
    },
    {
      "n": "Palopo",
      "c": "Indonesia",
      "p": 2444,
      "a": []
    }
  ],
  "Asia/Pontianak": [
    {
      "n": "Pontianak",
      "c": "Indonesia",
      "p": 578807.5,
      "a": []
    },
    {
      "n": "Singkawang",
      "c": "Indonesia",
      "p": 174925,
      "a": []
    },
    {
      "n": "Palangkaraya",
      "c": "Indonesia",
      "p": 148289,
      "a": []
    },
    {
      "n": "Sampit",
      "c": "Indonesia",
      "p": 79381.5,
      "a": []
    },
    {
      "n": "Kualakapuas",
      "c": "Indonesia",
      "p": 18512.5,
      "a": []
    }
  ],
  "Asia/Tehran": [
    {
      "n": "Tehran",
      "c": "Iran",
      "p": 7513154.5,
      "a": []
    },
    {
      "n": "Mashhad",
      "c": "Iran",
      "p": 2318126.5,
      "a": []
    },
    {
      "n": "Isfahan",
      "c": "Iran",
      "p": 1572883,
      "a": []
    },
    {
      "n": "Karaj",
      "c": "Iran",
      "p": 1423000,
      "a": []
    },
    {
      "n": "Tabriz",
      "c": "Iran",
      "p": 1304713,
      "a": []
    },
    {
      "n": "Shiraz",
      "c": "Iran",
      "p": 1240000,
      "a": []
    },
    {
      "n": "Qom",
      "c": "Iran",
      "p": 933478,
      "a": []
    },
    {
      "n": "Ahvaz",
      "c": "Iran",
      "p": 918572.5,
      "a": []
    },
    {
      "n": "Kermanshah",
      "c": "Iran",
      "p": 828313,
      "a": []
    },
    {
      "n": "Zahedan",
      "c": "Iran",
      "p": 575433.5,
      "a": []
    },
    {
      "n": "Kerman",
      "c": "Iran",
      "p": 556518,
      "a": []
    },
    {
      "n": "Rasht",
      "c": "Iran",
      "p": 544737.5,
      "a": []
    },
    {
      "n": "Arak",
      "c": "Iran",
      "p": 463449,
      "a": []
    },
    {
      "n": "Yazd",
      "c": "Iran",
      "p": 451923.5,
      "a": []
    },
    {
      "n": "Khomeini Shahr",
      "c": "Iran",
      "p": 437138,
      "a": []
    },
    {
      "n": "Bandar-e-Abbas",
      "c": "Iran",
      "p": 414503.5,
      "a": []
    },
    {
      "n": "Ardabil",
      "c": "Iran",
      "p": 412678,
      "a": []
    },
    {
      "n": "Qazvin",
      "c": "Iran",
      "p": 399093,
      "a": []
    },
    {
      "n": "Zanjan",
      "c": "Iran",
      "p": 355012.5,
      "a": []
    },
    {
      "n": "Khorramabad",
      "c": "Iran",
      "p": 352511.5,
      "a": []
    },
    {
      "n": "Sanandaj",
      "c": "Iran",
      "p": 331798,
      "a": []
    },
    {
      "n": "Dezful",
      "c": "Iran",
      "p": 315482,
      "a": []
    },
    {
      "n": "Abadan",
      "c": "Iran",
      "p": 315129,
      "a": []
    },
    {
      "n": "Hamadan",
      "c": "Iran",
      "p": 264293,
      "a": []
    },
    {
      "n": "Sari",
      "c": "Iran",
      "p": 263431.5,
      "a": []
    },
    {
      "n": "Gorgan",
      "c": "Iran",
      "p": 262980,
      "a": []
    },
    {
      "n": "Birjand",
      "c": "Iran",
      "p": 260842.5,
      "a": []
    },
    {
      "n": "Borujerd",
      "c": "Iran",
      "p": 251958,
      "a": []
    },
    {
      "n": "Kashan",
      "c": "Iran",
      "p": 249394.5,
      "a": []
    },
    {
      "n": "Neyshabur",
      "c": "Iran",
      "p": 221314.5,
      "a": []
    },
    {
      "n": "Sabzewar",
      "c": "Iran",
      "p": 215910.5,
      "a": []
    },
    {
      "n": "Amol",
      "c": "Iran",
      "p": 210516,
      "a": []
    },
    {
      "n": "Bojnurd",
      "c": "Iran",
      "p": 200311.5,
      "a": []
    },
    {
      "n": "Khvoy",
      "c": "Iran",
      "p": 189049,
      "a": []
    },
    {
      "n": "Zabol",
      "c": "Iran",
      "p": 177978.5,
      "a": []
    },
    {
      "n": "Malayer",
      "c": "Iran",
      "p": 176573,
      "a": []
    },
    {
      "n": "Varamin",
      "c": "Iran",
      "p": 172215,
      "a": []
    },
    {
      "n": "Sirjan",
      "c": "Iran",
      "p": 171007,
      "a": []
    },
    {
      "n": "Bandar-e Bushehr",
      "c": "Iran",
      "p": 167218.5,
      "a": []
    },
    {
      "n": "Mahabad",
      "c": "Iran",
      "p": 153428.5,
      "a": []
    },
    {
      "n": "Maragheh",
      "c": "Iran",
      "p": 151385,
      "a": []
    },
    {
      "n": "Ilam",
      "c": "Iran",
      "p": 146917,
      "a": []
    },
    {
      "n": "Gonbad-e Kavus",
      "c": "Iran",
      "p": 145699,
      "a": []
    },
    {
      "n": "Saveh",
      "c": "Iran",
      "p": 145384.5,
      "a": []
    },
    {
      "n": "Masjed Soleyman",
      "c": "Iran",
      "p": 132586.5,
      "a": []
    },
    {
      "n": "Shar e Kord",
      "c": "Iran",
      "p": 129153,
      "a": []
    },
    {
      "n": "Quchan",
      "c": "Iran",
      "p": 128641.5,
      "a": []
    },
    {
      "n": "Kashmar",
      "c": "Iran",
      "p": 126643,
      "a": []
    },
    {
      "n": "Shahrud",
      "c": "Iran",
      "p": 125304,
      "a": []
    },
    {
      "n": "Marv Dasht",
      "c": "Iran",
      "p": 124429,
      "a": []
    },
    {
      "n": "Qomsheh",
      "c": "Iran",
      "p": 118301,
      "a": []
    },
    {
      "n": "Semnan",
      "c": "Iran",
      "p": 117888,
      "a": []
    },
    {
      "n": "Fasa",
      "c": "Iran",
      "p": 111259.5,
      "a": []
    },
    {
      "n": "Bam",
      "c": "Iran",
      "p": 99268,
      "a": []
    },
    {
      "n": "Ahar",
      "c": "Iran",
      "p": 98993.5,
      "a": []
    },
    {
      "n": "Yasuj",
      "c": "Iran",
      "p": 96786,
      "a": []
    },
    {
      "n": "Behbehan",
      "c": "Iran",
      "p": 82517,
      "a": []
    },
    {
      "n": "Torbat-e Jam",
      "c": "Iran",
      "p": 81753,
      "a": []
    },
    {
      "n": "Chabahar",
      "c": "Iran",
      "p": 56544,
      "a": []
    },
    {
      "n": "Bijar",
      "c": "Iran",
      "p": 48806,
      "a": []
    },
    {
      "n": "Qasr-e Shirin",
      "c": "Iran",
      "p": 11202,
      "a": []
    },
    {
      "n": "Yazdan",
      "c": "Iran",
      "p": 1894,
      "a": []
    }
  ],
  "Asia/Baghdad": [
    {
      "n": "Baghdad",
      "c": "Iraq",
      "p": 5054000,
      "a": []
    },
    {
      "n": "Mosul",
      "c": "Iraq",
      "p": 1228467,
      "a": []
    },
    {
      "n": "Basra",
      "c": "Iraq",
      "p": 870000,
      "a": []
    },
    {
      "n": "Irbil",
      "c": "Iraq",
      "p": 795870,
      "a": []
    },
    {
      "n": "As Sulaymaniyah",
      "c": "Iraq",
      "p": 654318,
      "a": []
    },
    {
      "n": "Dahuk",
      "c": "Iraq",
      "p": 620500,
      "a": []
    },
    {
      "n": "An Najaf",
      "c": "Iraq",
      "p": 612776,
      "a": []
    },
    {
      "n": "Kirkuk",
      "c": "Iraq",
      "p": 555052.5,
      "a": []
    },
    {
      "n": "Al Hillah",
      "c": "Iraq",
      "p": 479652.5,
      "a": []
    },
    {
      "n": "Karbala",
      "c": "Iraq",
      "p": 472571,
      "a": []
    },
    {
      "n": "An Nasiriyah",
      "c": "Iraq",
      "p": 425898,
      "a": []
    },
    {
      "n": "Ad Diwaniyah",
      "c": "Iraq",
      "p": 338604.5,
      "a": []
    },
    {
      "n": "Al Amarah",
      "c": "Iraq",
      "p": 334154.5,
      "a": []
    },
    {
      "n": "Al Kut",
      "c": "Iraq",
      "p": 318341.5,
      "a": []
    },
    {
      "n": "Ar Ramadi",
      "c": "Iraq",
      "p": 284830,
      "a": []
    },
    {
      "n": "Baqubah",
      "c": "Iraq",
      "p": 226014.5,
      "a": []
    },
    {
      "n": "Al Fallujah",
      "c": "Iraq",
      "p": 210989,
      "a": []
    },
    {
      "n": "Az Aubayr",
      "c": "Iraq",
      "p": 192447.5,
      "a": []
    },
    {
      "n": "As Samawah",
      "c": "Iraq",
      "p": 163934,
      "a": []
    },
    {
      "n": "Samarra",
      "c": "Iraq",
      "p": 158508,
      "a": []
    },
    {
      "n": "Tall Afar",
      "c": "Iraq",
      "p": 144465,
      "a": []
    },
    {
      "n": "Ash Shatrah",
      "c": "Iraq",
      "p": 122340.5,
      "a": []
    },
    {
      "n": "Zakho",
      "c": "Iraq",
      "p": 114957.5,
      "a": []
    },
    {
      "n": "Al Musayyib",
      "c": "Iraq",
      "p": 59677.5,
      "a": []
    },
    {
      "n": "Tikrit",
      "c": "Iraq",
      "p": 49534,
      "a": []
    },
    {
      "n": "Ar Rutbah",
      "c": "Iraq",
      "p": 17199.5,
      "a": []
    },
    {
      "n": "Mandali",
      "c": "Iraq",
      "p": 16420.5,
      "a": []
    }
  ],
  "Europe/Dublin": [
    {
      "n": "Dublin",
      "c": "Ireland",
      "p": 1013988,
      "a": []
    },
    {
      "n": "Cork",
      "c": "Ireland",
      "p": 162852,
      "a": []
    },
    {
      "n": "Limerick",
      "c": "Ireland",
      "p": 84066,
      "a": []
    },
    {
      "n": "Galway",
      "c": "Ireland",
      "p": 73140,
      "a": []
    },
    {
      "n": "Waterford",
      "c": "Ireland",
      "p": 49275,
      "a": []
    },
    {
      "n": "Dundalk",
      "c": "Ireland",
      "p": 38884,
      "a": []
    },
    {
      "n": "Drogheda",
      "c": "Ireland",
      "p": 34987,
      "a": []
    },
    {
      "n": "Tralee",
      "c": "Ireland",
      "p": 24662.5,
      "a": []
    },
    {
      "n": "Kilkenny",
      "c": "Ireland",
      "p": 21401,
      "a": []
    },
    {
      "n": "Sligo",
      "c": "Ireland",
      "p": 17214,
      "a": []
    },
    {
      "n": "Killarney",
      "c": "Ireland",
      "p": 9601,
      "a": []
    },
    {
      "n": "Shannon",
      "c": "Ireland",
      "p": 8143.5,
      "a": []
    },
    {
      "n": "Muineachan",
      "c": "Ireland",
      "p": 5937,
      "a": []
    },
    {
      "n": "Ros Comain",
      "c": "Ireland",
      "p": 4860,
      "a": []
    },
    {
      "n": "Donegal",
      "c": "Ireland",
      "p": 2229,
      "a": []
    }
  ],
  "Europe/Isle_of_Man": [
    {
      "n": "Douglas",
      "c": "Isle of Man",
      "p": 31036,
      "a": []
    }
  ],
  "Asia/Jerusalem": [
    {
      "n": "Tel Aviv-Yafo",
      "c": "Israel",
      "p": 1745179,
      "a": []
    },
    {
      "n": "Jerusalem",
      "c": "Israel",
      "p": 915150,
      "a": []
    },
    {
      "n": "Haifa",
      "c": "Israel",
      "p": 639150,
      "a": []
    },
    {
      "n": "Beer Sheva",
      "c": "Israel",
      "p": 196504,
      "a": []
    },
    {
      "n": "Nazareth",
      "c": "Israel",
      "p": 108129.5,
      "a": []
    },
    {
      "n": "Ramla",
      "c": "Israel",
      "p": 63860,
      "a": []
    }
  ],
  "Europe/Rome": [
    {
      "n": "Milan",
      "c": "Italy",
      "p": 2125830.5,
      "a": []
    },
    {
      "n": "Rome",
      "c": "Italy",
      "p": 1687226,
      "a": [
        "ROM"
      ]
    },
    {
      "n": "Naples",
      "c": "Italy",
      "p": 1619486,
      "a": []
    },
    {
      "n": "Turin",
      "c": "Italy",
      "p": 1258631.5,
      "a": []
    },
    {
      "n": "Florence",
      "c": "Italy",
      "p": 935758.5,
      "a": []
    },
    {
      "n": "Palermo",
      "c": "Italy",
      "p": 767587.5,
      "a": []
    },
    {
      "n": "Genoa",
      "c": "Italy",
      "p": 624724,
      "a": []
    },
    {
      "n": "Salerno",
      "c": "Italy",
      "p": 546922,
      "a": []
    },
    {
      "n": "Catania",
      "c": "Italy",
      "p": 482908,
      "a": []
    },
    {
      "n": "Bologna",
      "c": "Italy",
      "p": 429694.5,
      "a": []
    },
    {
      "n": "Bari",
      "c": "Italy",
      "p": 408554.5,
      "a": []
    },
    {
      "n": "Verona",
      "c": "Italy",
      "p": 300333.5,
      "a": []
    },
    {
      "n": "Venice",
      "c": "Italy",
      "p": 270816,
      "a": []
    },
    {
      "n": "Cagliari",
      "c": "Italy",
      "p": 227880,
      "a": []
    },
    {
      "n": "Messina",
      "c": "Italy",
      "p": 224047.5,
      "a": []
    },
    {
      "n": "Pescara",
      "c": "Italy",
      "p": 215537.5,
      "a": []
    },
    {
      "n": "Trieste",
      "c": "Italy",
      "p": 213609.5,
      "a": []
    },
    {
      "n": "Reggio di Calabria",
      "c": "Italy",
      "p": 179034.5,
      "a": []
    },
    {
      "n": "Modena",
      "c": "Italy",
      "p": 175034.5,
      "a": []
    },
    {
      "n": "Como",
      "c": "Italy",
      "p": 167438,
      "a": []
    },
    {
      "n": "Caserta",
      "c": "Italy",
      "p": 164744,
      "a": []
    },
    {
      "n": "Parma",
      "c": "Italy",
      "p": 164734,
      "a": []
    },
    {
      "n": "Bergamo",
      "c": "Italy",
      "p": 160658,
      "a": []
    },
    {
      "n": "Taranto",
      "c": "Italy",
      "p": 148807,
      "a": []
    },
    {
      "n": "Foggia",
      "c": "Italy",
      "p": 147028,
      "a": []
    },
    {
      "n": "Pisa",
      "c": "Italy",
      "p": 146515,
      "a": []
    },
    {
      "n": "Livorno",
      "c": "Italy",
      "p": 145016.5,
      "a": []
    },
    {
      "n": "Perugia",
      "c": "Italy",
      "p": 141998,
      "a": []
    },
    {
      "n": "Treviso",
      "c": "Italy",
      "p": 128726.5,
      "a": []
    },
    {
      "n": "Ravenna",
      "c": "Italy",
      "p": 124302.5,
      "a": []
    },
    {
      "n": "Siracusa",
      "c": "Italy",
      "p": 123110,
      "a": []
    },
    {
      "n": "Lecce",
      "c": "Italy",
      "p": 122942.5,
      "a": []
    },
    {
      "n": "Ferrara",
      "c": "Italy",
      "p": 121754,
      "a": []
    },
    {
      "n": "Udine",
      "c": "Italy",
      "p": 107019.5,
      "a": []
    },
    {
      "n": "Trento",
      "c": "Italy",
      "p": 106377,
      "a": []
    },
    {
      "n": "Sassari",
      "c": "Italy",
      "p": 102822.5,
      "a": []
    },
    {
      "n": "Barletta",
      "c": "Italy",
      "p": 99962,
      "a": []
    },
    {
      "n": "Brindisi",
      "c": "Italy",
      "p": 96759,
      "a": []
    },
    {
      "n": "Ancona",
      "c": "Italy",
      "p": 95599,
      "a": []
    },
    {
      "n": "Bolzano",
      "c": "Italy",
      "p": 95442,
      "a": []
    },
    {
      "n": "Catanzaro",
      "c": "Italy",
      "p": 90541,
      "a": []
    },
    {
      "n": "Novara",
      "c": "Italy",
      "p": 88966,
      "a": []
    },
    {
      "n": "Arezzo",
      "c": "Italy",
      "p": 82613,
      "a": []
    },
    {
      "n": "Potenza",
      "c": "Italy",
      "p": 69060,
      "a": []
    },
    {
      "n": "Ragusa",
      "c": "Italy",
      "p": 67361,
      "a": []
    },
    {
      "n": "Asti",
      "c": "Italy",
      "p": 63410.5,
      "a": []
    },
    {
      "n": "L'Aquila",
      "c": "Italy",
      "p": 62201.5,
      "a": []
    },
    {
      "n": "Marsala",
      "c": "Italy",
      "p": 60481.5,
      "a": []
    },
    {
      "n": "Crotone",
      "c": "Italy",
      "p": 59313.5,
      "a": []
    },
    {
      "n": "Benevento",
      "c": "Italy",
      "p": 59280,
      "a": []
    },
    {
      "n": "Civitavecchia",
      "c": "Italy",
      "p": 55674,
      "a": []
    },
    {
      "n": "Campobasso",
      "c": "Italy",
      "p": 50762,
      "a": []
    },
    {
      "n": "Siena",
      "c": "Italy",
      "p": 48731,
      "a": []
    },
    {
      "n": "Olbia",
      "c": "Italy",
      "p": 44341,
      "a": []
    },
    {
      "n": "Aosta",
      "c": "Italy",
      "p": 34062,
      "a": []
    },
    {
      "n": "Vibo Valentia",
      "c": "Italy",
      "p": 32168,
      "a": []
    },
    {
      "n": "Vatican City",
      "c": "Vatican (Holy Sea)",
      "p": 832,
      "a": []
    }
  ],
  "Africa/Abidjan": [
    {
      "n": "Abidjan",
      "c": "Ivory Coast",
      "p": 3496197.5,
      "a": []
    },
    {
      "n": "Bouake",
      "c": "Ivory Coast",
      "p": 511151,
      "a": []
    },
    {
      "n": "Daloa",
      "c": "Ivory Coast",
      "p": 235410,
      "a": []
    },
    {
      "n": "San-Pedro",
      "c": "Ivory Coast",
      "p": 203512,
      "a": []
    },
    {
      "n": "Yamoussoukro",
      "c": "Ivory Coast",
      "p": 200514.5,
      "a": []
    },
    {
      "n": "Korhogo",
      "c": "Ivory Coast",
      "p": 172535,
      "a": []
    },
    {
      "n": "Man",
      "c": "Ivory Coast",
      "p": 143157.5,
      "a": []
    },
    {
      "n": "Divo",
      "c": "Ivory Coast",
      "p": 127867,
      "a": []
    },
    {
      "n": "Gagnoa",
      "c": "Ivory Coast",
      "p": 111188,
      "a": []
    },
    {
      "n": "Abengourou",
      "c": "Ivory Coast",
      "p": 87809,
      "a": []
    },
    {
      "n": "Soubre",
      "c": "Ivory Coast",
      "p": 83712.5,
      "a": []
    },
    {
      "n": "Agboville",
      "c": "Ivory Coast",
      "p": 73027.5,
      "a": []
    },
    {
      "n": "Dabou",
      "c": "Ivory Coast",
      "p": 71287,
      "a": []
    },
    {
      "n": "Grand Bassam",
      "c": "Ivory Coast",
      "p": 61226.5,
      "a": []
    },
    {
      "n": "Bouafle",
      "c": "Ivory Coast",
      "p": 60962,
      "a": []
    },
    {
      "n": "Ferkessedougou",
      "c": "Ivory Coast",
      "p": 57410,
      "a": []
    },
    {
      "n": "Dimbokro",
      "c": "Ivory Coast",
      "p": 46467.5,
      "a": []
    },
    {
      "n": "Toumodi",
      "c": "Ivory Coast",
      "p": 39005,
      "a": []
    },
    {
      "n": "Bondoukou",
      "c": "Ivory Coast",
      "p": 38501.5,
      "a": []
    },
    {
      "n": "Aboisso",
      "c": "Ivory Coast",
      "p": 37654,
      "a": []
    },
    {
      "n": "Guiglo",
      "c": "Ivory Coast",
      "p": 37490,
      "a": []
    },
    {
      "n": "Odienne",
      "c": "Ivory Coast",
      "p": 34488,
      "a": []
    },
    {
      "n": "Seguela",
      "c": "Ivory Coast",
      "p": 31880,
      "a": []
    },
    {
      "n": "Sassandra",
      "c": "Ivory Coast",
      "p": 30842.5,
      "a": []
    },
    {
      "n": "Touba",
      "c": "Ivory Coast",
      "p": 27504,
      "a": []
    }
  ],
  "America/Jamaica": [
    {
      "n": "Kingston",
      "c": "Jamaica",
      "p": 801336.5,
      "a": []
    },
    {
      "n": "Spanish Town",
      "c": "Jamaica",
      "p": 297531.5,
      "a": []
    },
    {
      "n": "Montego Bay",
      "c": "Jamaica",
      "p": 104437.5,
      "a": []
    },
    {
      "n": "Half Way Tree",
      "c": "Jamaica",
      "p": 96494,
      "a": []
    },
    {
      "n": "May Pen",
      "c": "Jamaica",
      "p": 89948.5,
      "a": []
    },
    {
      "n": "Mandeville",
      "c": "Jamaica",
      "p": 47115,
      "a": []
    },
    {
      "n": "Savanna-la-Mar",
      "c": "Jamaica",
      "p": 25260.5,
      "a": []
    },
    {
      "n": "Port Antonio",
      "c": "Jamaica",
      "p": 14400,
      "a": []
    },
    {
      "n": "St. Ann's Bay",
      "c": "Jamaica",
      "p": 13671,
      "a": []
    },
    {
      "n": "Port Morant",
      "c": "Jamaica",
      "p": 11536,
      "a": []
    },
    {
      "n": "Port Maria",
      "c": "Jamaica",
      "p": 7906,
      "a": []
    },
    {
      "n": "Falmouth",
      "c": "Jamaica",
      "p": 7779,
      "a": []
    },
    {
      "n": "Lucea",
      "c": "Jamaica",
      "p": 6289,
      "a": []
    },
    {
      "n": "Black River",
      "c": "Jamaica",
      "p": 4229,
      "a": []
    }
  ],
  "Asia/Tokyo": [
    {
      "n": "Tokyo",
      "c": "Japan",
      "p": 22006299.5,
      "a": [
        "TOK",
        "NRT"
      ]
    },
    {
      "n": "Osaka",
      "c": "Japan",
      "p": 6943206.5,
      "a": [
        "OSA",
        "KIX"
      ]
    },
    {
      "n": "Yokohama",
      "c": "Japan",
      "p": 3697894,
      "a": []
    },
    {
      "n": "Nagoya",
      "c": "Japan",
      "p": 2710639.5,
      "a": []
    },
    {
      "n": "Sapporo",
      "c": "Japan",
      "p": 2202893,
      "a": []
    },
    {
      "n": "Fukuoka",
      "c": "Japan",
      "p": 2092144.5,
      "a": []
    },
    {
      "n": "Sendai",
      "c": "Japan",
      "p": 1643781,
      "a": []
    },
    {
      "n": "Kyoto",
      "c": "Japan",
      "p": 1632320,
      "a": []
    },
    {
      "n": "Hiroshima",
      "c": "Japan",
      "p": 1594420.5,
      "a": []
    },
    {
      "n": "Kobe",
      "c": "Japan",
      "p": 1528478,
      "a": []
    },
    {
      "n": "Kawasaki",
      "c": "Japan",
      "p": 1372025.5,
      "a": []
    },
    {
      "n": "Kitakyushu",
      "c": "Japan",
      "p": 990286.5,
      "a": []
    },
    {
      "n": "Hamamatsu",
      "c": "Japan",
      "p": 887242.5,
      "a": []
    },
    {
      "n": "Okayama",
      "c": "Japan",
      "p": 752872,
      "a": []
    },
    {
      "n": "Kumamoto",
      "c": "Japan",
      "p": 699327.5,
      "a": []
    },
    {
      "n": "Shizuoka",
      "c": "Japan",
      "p": 686446.5,
      "a": []
    },
    {
      "n": "Naha",
      "c": "Japan",
      "p": 611572,
      "a": []
    },
    {
      "n": "Hachioji",
      "c": "Japan",
      "p": 579399,
      "a": []
    },
    {
      "n": "Utsunomiya",
      "c": "Japan",
      "p": 558808.5,
      "a": []
    },
    {
      "n": "Niigata",
      "c": "Japan",
      "p": 537534.5,
      "a": []
    },
    {
      "n": "Kagoshima",
      "c": "Japan",
      "p": 536092.5,
      "a": []
    },
    {
      "n": "Matsuyama",
      "c": "Japan",
      "p": 525089,
      "a": []
    },
    {
      "n": "Kanazawa",
      "c": "Japan",
      "p": 505093,
      "a": []
    },
    {
      "n": "Nagano",
      "c": "Japan",
      "p": 477243.5,
      "a": []
    },
    {
      "n": "Otsu",
      "c": "Japan",
      "p": 437802.5,
      "a": []
    },
    {
      "n": "Nagasaki",
      "c": "Japan",
      "p": 422829.5,
      "a": []
    },
    {
      "n": "Oita",
      "c": "Japan",
      "p": 412100.5,
      "a": []
    },
    {
      "n": "Gifu",
      "c": "Japan",
      "p": 405304.5,
      "a": []
    },
    {
      "n": "Wakayama",
      "c": "Japan",
      "p": 395503,
      "a": []
    },
    {
      "n": "Tsu",
      "c": "Japan",
      "p": 392484.5,
      "a": []
    },
    {
      "n": "Tokushima",
      "c": "Japan",
      "p": 355552.5,
      "a": []
    },
    {
      "n": "Asahikawa",
      "c": "Japan",
      "p": 341079.5,
      "a": []
    },
    {
      "n": "Kawagoe",
      "c": "Japan",
      "p": 337931,
      "a": []
    },
    {
      "n": "Takamatsu",
      "c": "Japan",
      "p": 329861.5,
      "a": []
    },
    {
      "n": "Toyama",
      "c": "Japan",
      "p": 329172,
      "a": []
    },
    {
      "n": "Iwaki",
      "c": "Japan",
      "p": 324677,
      "a": []
    },
    {
      "n": "Kochi",
      "c": "Japan",
      "p": 323095,
      "a": []
    },
    {
      "n": "Miyazaki",
      "c": "Japan",
      "p": 317793.5,
      "a": []
    },
    {
      "n": "Maebashi",
      "c": "Japan",
      "p": 313791,
      "a": []
    },
    {
      "n": "Koriyama",
      "c": "Japan",
      "p": 302581,
      "a": []
    },
    {
      "n": "Akita",
      "c": "Japan",
      "p": 300962.5,
      "a": []
    },
    {
      "n": "Mito",
      "c": "Japan",
      "p": 300215,
      "a": []
    },
    {
      "n": "Morioka",
      "c": "Japan",
      "p": 294782.5,
      "a": []
    },
    {
      "n": "Hakodate",
      "c": "Japan",
      "p": 289357,
      "a": []
    },
    {
      "n": "Aomori",
      "c": "Japan",
      "p": 281571.5,
      "a": []
    },
    {
      "n": "Fukushima",
      "c": "Japan",
      "p": 278961.5,
      "a": []
    },
    {
      "n": "Yamagata",
      "c": "Japan",
      "p": 263373.5,
      "a": []
    },
    {
      "n": "Fukui",
      "c": "Japan",
      "p": 241288.5,
      "a": []
    },
    {
      "n": "Shimonoseki",
      "c": "Japan",
      "p": 236198.5,
      "a": []
    },
    {
      "n": "Hachinohe",
      "c": "Japan",
      "p": 225575,
      "a": []
    },
    {
      "n": "Sasebo",
      "c": "Japan",
      "p": 224347.5,
      "a": []
    },
    {
      "n": "Matsumoto",
      "c": "Japan",
      "p": 217796.5,
      "a": []
    },
    {
      "n": "Kure",
      "c": "Japan",
      "p": 196807.5,
      "a": []
    },
    {
      "n": "Kofu",
      "c": "Japan",
      "p": 193770,
      "a": []
    },
    {
      "n": "Kushiro",
      "c": "Japan",
      "p": 191089,
      "a": []
    },
    {
      "n": "Nagaoka",
      "c": "Japan",
      "p": 187560,
      "a": []
    },
    {
      "n": "Hirosaki",
      "c": "Japan",
      "p": 171700.5,
      "a": []
    },
    {
      "n": "Obihiro",
      "c": "Japan",
      "p": 169614,
      "a": []
    },
    {
      "n": "Tomakomai",
      "c": "Japan",
      "p": 161355.5,
      "a": []
    },
    {
      "n": "Matsue",
      "c": "Japan",
      "p": 150527,
      "a": []
    },
    {
      "n": "Tottori",
      "c": "Japan",
      "p": 142635.5,
      "a": []
    },
    {
      "n": "Otaru",
      "c": "Japan",
      "p": 139260.5,
      "a": []
    },
    {
      "n": "Muroran",
      "c": "Japan",
      "p": 125936.5,
      "a": []
    },
    {
      "n": "Takaoka",
      "c": "Japan",
      "p": 124437,
      "a": []
    },
    {
      "n": "Kitami",
      "c": "Japan",
      "p": 103971.5,
      "a": []
    },
    {
      "n": "Tsuruoka",
      "c": "Japan",
      "p": 88052.5,
      "a": []
    },
    {
      "n": "Sakata",
      "c": "Japan",
      "p": 86507.5,
      "a": []
    },
    {
      "n": "Kanoya",
      "c": "Japan",
      "p": 68513.5,
      "a": []
    },
    {
      "n": "Maizuru",
      "c": "Japan",
      "p": 62531.5,
      "a": []
    }
  ],
  "Asia/Amman": [
    {
      "n": "Amman",
      "c": "Jordan",
      "p": 1060000,
      "a": []
    },
    {
      "n": "Az Zarqa",
      "c": "Jordan",
      "p": 843678,
      "a": []
    },
    {
      "n": "Irbid",
      "c": "Jordan",
      "p": 471020,
      "a": []
    },
    {
      "n": "As Salt",
      "c": "Jordan",
      "p": 110439,
      "a": []
    },
    {
      "n": "Al Aqabah",
      "c": "Jordan",
      "p": 95048,
      "a": []
    },
    {
      "n": "Al Mafraq",
      "c": "Jordan",
      "p": 57118,
      "a": []
    },
    {
      "n": "Al Karak",
      "c": "Jordan",
      "p": 50870,
      "a": []
    },
    {
      "n": "Ma'an",
      "c": "Jordan",
      "p": 50350,
      "a": []
    },
    {
      "n": "At Tafilah",
      "c": "Jordan",
      "p": 25429,
      "a": []
    }
  ],
  "Asia/Qyzylorda": [
    {
      "n": "Oostanay",
      "c": "Kazakhstan",
      "p": 223450.5,
      "a": []
    },
    {
      "n": "Qyzylorda",
      "c": "Kazakhstan",
      "p": 213259.5,
      "a": []
    },
    {
      "n": "Rudny",
      "c": "Kazakhstan",
      "p": 104235.5,
      "a": []
    },
    {
      "n": "Arqalyq",
      "c": "Kazakhstan",
      "p": 48760.5,
      "a": []
    },
    {
      "n": "Zhetiqara",
      "c": "Kazakhstan",
      "p": 44922,
      "a": []
    },
    {
      "n": "Baykonur",
      "c": "Kazakhstan",
      "p": 36175,
      "a": []
    },
    {
      "n": "Aral",
      "c": "Kazakhstan",
      "p": 30185,
      "a": []
    },
    {
      "n": "Shieli",
      "c": "Kazakhstan",
      "p": 25871,
      "a": []
    },
    {
      "n": "Zhosaly",
      "c": "Kazakhstan",
      "p": 19023.5,
      "a": []
    },
    {
      "n": "Komsomolets",
      "c": "Kazakhstan",
      "p": 5693.5,
      "a": []
    },
    {
      "n": "Turgay",
      "c": "Kazakhstan",
      "p": 5277,
      "a": []
    },
    {
      "n": "Qusmuryn",
      "c": "Kazakhstan",
      "p": 4345.5,
      "a": []
    },
    {
      "n": "Tobol",
      "c": "Kazakhstan",
      "p": 3913.5,
      "a": []
    },
    {
      "n": "Qazaly",
      "c": "Kazakhstan",
      "p": 3436,
      "a": []
    }
  ],
  "Asia/Aqtau": [
    {
      "n": "Mangyshlak",
      "c": "Kazakhstan",
      "p": 147443,
      "a": []
    },
    {
      "n": "Beyneu",
      "c": "Kazakhstan",
      "p": 32452,
      "a": []
    },
    {
      "n": "Zhangaozen",
      "c": "Kazakhstan",
      "p": 8895,
      "a": []
    },
    {
      "n": "Aktau",
      "c": "Kazakhstan",
      "p": 4479,
      "a": []
    },
    {
      "n": "Fort Shevchenko",
      "c": "Kazakhstan",
      "p": 3236,
      "a": []
    }
  ],
  "Asia/Atyrau": [
    {
      "n": "Atyrau",
      "c": "Kazakhstan",
      "p": 170583,
      "a": []
    },
    {
      "n": "Qulsary",
      "c": "Kazakhstan",
      "p": 37103,
      "a": []
    },
    {
      "n": "Balyqshy",
      "c": "Kazakhstan",
      "p": 25442,
      "a": []
    },
    {
      "n": "Maqat",
      "c": "Kazakhstan",
      "p": 12169,
      "a": []
    },
    {
      "n": "Makhambet",
      "c": "Kazakhstan",
      "p": 4761.5,
      "a": []
    }
  ],
  "Asia/Almaty": [
    {
      "n": "Almaty",
      "c": "Kazakhstan",
      "p": 1096256,
      "a": []
    },
    {
      "n": "Shymkent",
      "c": "Kazakhstan",
      "p": 439712,
      "a": []
    },
    {
      "n": "Qaraghandy",
      "c": "Kazakhstan",
      "p": 378273.5,
      "a": []
    },
    {
      "n": "Astana",
      "c": "Kazakhstan",
      "p": 335312.5,
      "a": []
    },
    {
      "n": "Taraz",
      "c": "Kazakhstan",
      "p": 332723.5,
      "a": []
    },
    {
      "n": "Pavlodar",
      "c": "Kazakhstan",
      "p": 316254,
      "a": []
    },
    {
      "n": "Semey",
      "c": "Kazakhstan",
      "p": 302066.5,
      "a": []
    },
    {
      "n": "Oskemen",
      "c": "Kazakhstan",
      "p": 284350.5,
      "a": []
    },
    {
      "n": "Petropavlovsk",
      "c": "Kazakhstan",
      "p": 214579,
      "a": []
    },
    {
      "n": "Temirtau",
      "c": "Kazakhstan",
      "p": 167193.5,
      "a": []
    },
    {
      "n": "Kokshetau",
      "c": "Kazakhstan",
      "p": 126658.5,
      "a": []
    },
    {
      "n": "Ekibastuz",
      "c": "Kazakhstan",
      "p": 124669,
      "a": []
    },
    {
      "n": "Zhezqazghan",
      "c": "Kazakhstan",
      "p": 104357,
      "a": []
    },
    {
      "n": "Taldyqorghan",
      "c": "Kazakhstan",
      "p": 88380,
      "a": []
    },
    {
      "n": "Turkistan",
      "c": "Kazakhstan",
      "p": 86743.5,
      "a": []
    },
    {
      "n": "Balqash",
      "c": "Kazakhstan",
      "p": 80586,
      "a": []
    },
    {
      "n": "Sarqan",
      "c": "Kazakhstan",
      "p": 61329,
      "a": []
    },
    {
      "n": "Kentau",
      "c": "Kazakhstan",
      "p": 55864.5,
      "a": []
    },
    {
      "n": "Ridder",
      "c": "Kazakhstan",
      "p": 54710,
      "a": []
    },
    {
      "n": "Zyryanovsk",
      "c": "Kazakhstan",
      "p": 47293.5,
      "a": []
    },
    {
      "n": "Shu",
      "c": "Kazakhstan",
      "p": 41112,
      "a": []
    },
    {
      "n": "Qapshaghay",
      "c": "Kazakhstan",
      "p": 40319.5,
      "a": []
    },
    {
      "n": "Ayakoz",
      "c": "Kazakhstan",
      "p": 39670,
      "a": []
    },
    {
      "n": "Arys",
      "c": "Kazakhstan",
      "p": 39466.5,
      "a": []
    },
    {
      "n": "Qaratau",
      "c": "Kazakhstan",
      "p": 35743,
      "a": []
    },
    {
      "n": "Zharkent",
      "c": "Kazakhstan",
      "p": 35459,
      "a": []
    },
    {
      "n": "Atbasar",
      "c": "Kazakhstan",
      "p": 35308,
      "a": []
    },
    {
      "n": "Esik",
      "c": "Kazakhstan",
      "p": 30883,
      "a": []
    },
    {
      "n": "Shemonaikha",
      "c": "Kazakhstan",
      "p": 23631.5,
      "a": []
    },
    {
      "n": "Lenger",
      "c": "Kazakhstan",
      "p": 22148,
      "a": []
    },
    {
      "n": "Boralday",
      "c": "Kazakhstan",
      "p": 20996,
      "a": []
    },
    {
      "n": "Makinsk",
      "c": "Kazakhstan",
      "p": 20365.5,
      "a": []
    },
    {
      "n": "Erymentau",
      "c": "Kazakhstan",
      "p": 19655,
      "a": []
    },
    {
      "n": "Ushtobe",
      "c": "Kazakhstan",
      "p": 19116.5,
      "a": []
    },
    {
      "n": "Qarazhal",
      "c": "Kazakhstan",
      "p": 17988.5,
      "a": []
    },
    {
      "n": "Atasu",
      "c": "Kazakhstan",
      "p": 16400,
      "a": []
    },
    {
      "n": "Oytal",
      "c": "Kazakhstan",
      "p": 16247,
      "a": []
    },
    {
      "n": "Derzhavinsk",
      "c": "Kazakhstan",
      "p": 14852,
      "a": []
    },
    {
      "n": "Zaysan",
      "c": "Kazakhstan",
      "p": 14199,
      "a": []
    },
    {
      "n": "Urzhar",
      "c": "Kazakhstan",
      "p": 13854,
      "a": []
    },
    {
      "n": "Otar",
      "c": "Kazakhstan",
      "p": 11238,
      "a": []
    },
    {
      "n": "Qulan",
      "c": "Kazakhstan",
      "p": 10200,
      "a": []
    },
    {
      "n": "Aqsu",
      "c": "Kazakhstan",
      "p": 8543,
      "a": []
    },
    {
      "n": "Bestobe",
      "c": "Kazakhstan",
      "p": 7189,
      "a": []
    },
    {
      "n": "Tayynsha",
      "c": "Kazakhstan",
      "p": 7128.5,
      "a": []
    },
    {
      "n": "Esil",
      "c": "Kazakhstan",
      "p": 7065.5,
      "a": []
    },
    {
      "n": "Kishkenekol",
      "c": "Kazakhstan",
      "p": 6779,
      "a": []
    },
    {
      "n": "Ertis",
      "c": "Kazakhstan",
      "p": 6311,
      "a": []
    },
    {
      "n": "Bulaevo",
      "c": "Kazakhstan",
      "p": 5383,
      "a": []
    },
    {
      "n": "Aqadyr",
      "c": "Kazakhstan",
      "p": 5359.5,
      "a": []
    },
    {
      "n": "Kachiry",
      "c": "Kazakhstan",
      "p": 5130.5,
      "a": []
    },
    {
      "n": "Shar",
      "c": "Kazakhstan",
      "p": 5124.5,
      "a": []
    },
    {
      "n": "Qarqaraly",
      "c": "Kazakhstan",
      "p": 4899,
      "a": []
    },
    {
      "n": "Osakarovka",
      "c": "Kazakhstan",
      "p": 4196,
      "a": []
    },
    {
      "n": "Zholymbet",
      "c": "Kazakhstan",
      "p": 3969,
      "a": []
    },
    {
      "n": "Shonzhy",
      "c": "Kazakhstan",
      "p": 3902,
      "a": []
    },
    {
      "n": "Saryshaghan",
      "c": "Kazakhstan",
      "p": 2331,
      "a": []
    },
    {
      "n": "Serebryansk",
      "c": "Kazakhstan",
      "p": 701,
      "a": []
    },
    {
      "n": "Zhaltyr",
      "c": "Kazakhstan",
      "p": 694,
      "a": []
    },
    {
      "n": "Sharbaqty",
      "c": "Kazakhstan",
      "p": 107,
      "a": []
    },
    {
      "n": "Burylbaytal",
      "c": "Kazakhstan",
      "p": 92.5,
      "a": []
    }
  ],
  "Asia/Aqtobe": [
    {
      "n": "Aktobe",
      "c": "Kazakhstan",
      "p": 260493,
      "a": []
    },
    {
      "n": "Algha",
      "c": "Kazakhstan",
      "p": 28267,
      "a": []
    },
    {
      "n": "Oktyabrsk",
      "c": "Kazakhstan",
      "p": 27284.5,
      "a": []
    },
    {
      "n": "Shalqar",
      "c": "Kazakhstan",
      "p": 27256,
      "a": []
    },
    {
      "n": "Khromtau",
      "c": "Kazakhstan",
      "p": 21614,
      "a": []
    },
    {
      "n": "Embi",
      "c": "Kazakhstan",
      "p": 10009.5,
      "a": []
    },
    {
      "n": "Bayghanin",
      "c": "Kazakhstan",
      "p": 4271,
      "a": []
    }
  ],
  "Asia/Oral": [
    {
      "n": "Oral",
      "c": "Kazakhstan",
      "p": 204894,
      "a": []
    },
    {
      "n": "Aqsay",
      "c": "Kazakhstan",
      "p": 30404.5,
      "a": []
    },
    {
      "n": "Zhanibek",
      "c": "Kazakhstan",
      "p": 6824,
      "a": []
    },
    {
      "n": "Chapaev",
      "c": "Kazakhstan",
      "p": 3515.5,
      "a": []
    }
  ],
  "Africa/Nairobi": [
    {
      "n": "Nairobi",
      "c": "Kenya",
      "p": 2880273.5,
      "a": []
    },
    {
      "n": "Mombasa",
      "c": "Kenya",
      "p": 840834,
      "a": []
    },
    {
      "n": "Nakuru",
      "c": "Kenya",
      "p": 312315,
      "a": []
    },
    {
      "n": "Kisumu",
      "c": "Kenya",
      "p": 306047,
      "a": []
    },
    {
      "n": "Eldoret",
      "c": "Kenya",
      "p": 285913.5,
      "a": []
    },
    {
      "n": "Kitale",
      "c": "Kenya",
      "p": 112809,
      "a": []
    },
    {
      "n": "Thika",
      "c": "Kenya",
      "p": 93571.5,
      "a": []
    },
    {
      "n": "Kendu Bay",
      "c": "Kenya",
      "p": 91248,
      "a": []
    },
    {
      "n": "Machakos",
      "c": "Kenya",
      "p": 88448,
      "a": []
    },
    {
      "n": "Malindi",
      "c": "Kenya",
      "p": 81160,
      "a": []
    },
    {
      "n": "Kericho",
      "c": "Kenya",
      "p": 67300,
      "a": []
    },
    {
      "n": "Garissa",
      "c": "Kenya",
      "p": 65948,
      "a": []
    },
    {
      "n": "Kakamega",
      "c": "Kenya",
      "p": 63426,
      "a": []
    },
    {
      "n": "Kilifi",
      "c": "Kenya",
      "p": 63228.5,
      "a": []
    },
    {
      "n": "Bungoma",
      "c": "Kenya",
      "p": 55962,
      "a": []
    },
    {
      "n": "Nyeri",
      "c": "Kenya",
      "p": 51084,
      "a": []
    },
    {
      "n": "Meru",
      "c": "Kenya",
      "p": 47226,
      "a": []
    },
    {
      "n": "Embu",
      "c": "Kenya",
      "p": 46771,
      "a": []
    },
    {
      "n": "Mandera",
      "c": "Somalia",
      "p": 44480.5,
      "a": []
    },
    {
      "n": "Naivasha",
      "c": "Kenya",
      "p": 41174.5,
      "a": []
    },
    {
      "n": "Wajir",
      "c": "Kenya",
      "p": 40240,
      "a": []
    },
    {
      "n": "Sotik",
      "c": "Kenya",
      "p": 36942.5,
      "a": []
    },
    {
      "n": "Nanyuki",
      "c": "Kenya",
      "p": 34342,
      "a": []
    },
    {
      "n": "Kisii",
      "c": "Kenya",
      "p": 28547,
      "a": []
    },
    {
      "n": "Voi",
      "c": "Kenya",
      "p": 28055.5,
      "a": []
    },
    {
      "n": "Maralal",
      "c": "Kenya",
      "p": 20841,
      "a": []
    },
    {
      "n": "Moyale",
      "c": "Kenya",
      "p": 20540,
      "a": []
    },
    {
      "n": "Lamu",
      "c": "Kenya",
      "p": 17435,
      "a": []
    },
    {
      "n": "Lodwar",
      "c": "Kenya",
      "p": 17089.5,
      "a": []
    },
    {
      "n": "Marsabit",
      "c": "Kenya",
      "p": 15910.5,
      "a": []
    },
    {
      "n": "Eldama Ravine",
      "c": "Kenya",
      "p": 15052.5,
      "a": []
    },
    {
      "n": "Mwingi",
      "c": "Kenya",
      "p": 9546.5,
      "a": []
    },
    {
      "n": "Namanga",
      "c": "Kenya",
      "p": 7664.5,
      "a": []
    },
    {
      "n": "Witu",
      "c": "Kenya",
      "p": 3945,
      "a": []
    },
    {
      "n": "Karungu",
      "c": "Kenya",
      "p": 2376,
      "a": []
    },
    {
      "n": "Konza",
      "c": "Kenya",
      "p": 2004,
      "a": []
    },
    {
      "n": "Tsavo",
      "c": "Kenya",
      "p": 414,
      "a": []
    }
  ],
  "Pacific/Tarawa": [
    {
      "n": "Tarawa",
      "c": "Kiribati",
      "p": 25668,
      "a": []
    }
  ],
  "Europe/Belgrade": [
    {
      "n": "Belgrade",
      "c": "Serbia",
      "p": 1099000,
      "a": []
    },
    {
      "n": "Pristina",
      "c": "Kosovo",
      "p": 331700,
      "a": []
    },
    {
      "n": "Nis",
      "c": "Serbia",
      "p": 230444,
      "a": []
    },
    {
      "n": "Novi Sad",
      "c": "Serbia",
      "p": 220428.5,
      "a": []
    },
    {
      "n": "Kragujevac",
      "c": "Serbia",
      "p": 159335,
      "a": []
    },
    {
      "n": "Prizren",
      "c": "Kosovo",
      "p": 157574.5,
      "a": []
    },
    {
      "n": "Pec",
      "c": "Serbia",
      "p": 137332.5,
      "a": []
    },
    {
      "n": "Subotica",
      "c": "Serbia",
      "p": 96704,
      "a": []
    },
    {
      "n": "Pec",
      "c": "Kosovo",
      "p": 93481.5,
      "a": []
    },
    {
      "n": "Zrenjanin",
      "c": "Serbia",
      "p": 64053,
      "a": []
    }
  ],
  "Asia/Kuwait": [
    {
      "n": "Kuwait",
      "c": "Kuwait",
      "p": 1061532,
      "a": []
    },
    {
      "n": "Al Jahra",
      "c": "Kuwait",
      "p": 194193,
      "a": []
    },
    {
      "n": "Hawalli",
      "c": "Kuwait",
      "p": 164212,
      "a": []
    },
    {
      "n": "Al Ahmadi",
      "c": "Kuwait",
      "p": 68763,
      "a": []
    }
  ],
  "Asia/Bishkek": [
    {
      "n": "Bishkek",
      "c": "Kyrgyzstan",
      "p": 820606,
      "a": []
    },
    {
      "n": "Osh",
      "c": "Kyrgyzstan",
      "p": 295638.5,
      "a": []
    },
    {
      "n": "Jalal Abad",
      "c": "Kyrgyzstan",
      "p": 162299.5,
      "a": []
    },
    {
      "n": "Tokmak",
      "c": "Kyrgyzstan",
      "p": 87953.5,
      "a": []
    },
    {
      "n": "Kara Balta",
      "c": "Kyrgyzstan",
      "p": 68464.5,
      "a": []
    },
    {
      "n": "Karakol",
      "c": "Kyrgyzstan",
      "p": 63411.5,
      "a": []
    },
    {
      "n": "Naryn",
      "c": "Kyrgyzstan",
      "p": 44003.5,
      "a": []
    },
    {
      "n": "Balykchy",
      "c": "Kyrgyzstan",
      "p": 40263.5,
      "a": []
    },
    {
      "n": "Talas",
      "c": "Kyrgyzstan",
      "p": 28646,
      "a": []
    },
    {
      "n": "Toktogul",
      "c": "Kyrgyzstan",
      "p": 22725.5,
      "a": []
    },
    {
      "n": "Tash Komur",
      "c": "Kyrgyzstan",
      "p": 19974.5,
      "a": []
    },
    {
      "n": "At Bashy",
      "c": "Kyrgyzstan",
      "p": 15413.5,
      "a": []
    },
    {
      "n": "Kok Yangak",
      "c": "Kyrgyzstan",
      "p": 14523,
      "a": []
    },
    {
      "n": "Cholpon Ata",
      "c": "Kyrgyzstan",
      "p": 14086.5,
      "a": []
    }
  ],
  "Asia/Vientiane": [
    {
      "n": "Vientiane",
      "c": "Laos",
      "p": 662174,
      "a": []
    },
    {
      "n": "Pakxe",
      "c": "Laos",
      "p": 95553.5,
      "a": []
    },
    {
      "n": "Louangphrabang",
      "c": "Laos",
      "p": 77260,
      "a": []
    },
    {
      "n": "Savannakhet",
      "c": "Laos",
      "p": 75725.5,
      "a": []
    },
    {
      "n": "Thakhek",
      "c": "Laos",
      "p": 51564,
      "a": []
    },
    {
      "n": "Xam Nua",
      "c": "Laos",
      "p": 38992,
      "a": []
    },
    {
      "n": "Xaignabouri",
      "c": "Laos",
      "p": 16200,
      "a": []
    },
    {
      "n": "Champasak",
      "c": "Laos",
      "p": 12994,
      "a": []
    },
    {
      "n": "Ban Houayxay",
      "c": "Laos",
      "p": 6347,
      "a": []
    },
    {
      "n": "Phongsali",
      "c": "Laos",
      "p": 6000,
      "a": []
    },
    {
      "n": "Saravan",
      "c": "Laos",
      "p": 5521,
      "a": []
    },
    {
      "n": "Xiangkhoang",
      "c": "Laos",
      "p": 5189,
      "a": []
    },
    {
      "n": "Attapu",
      "c": "Laos",
      "p": 4297,
      "a": []
    },
    {
      "n": "Louang Namtha",
      "c": "Laos",
      "p": 3225,
      "a": []
    }
  ],
  "Europe/Riga": [
    {
      "n": "Riga",
      "c": "Latvia",
      "p": 723802.5,
      "a": []
    },
    {
      "n": "Daugavpils",
      "c": "Latvia",
      "p": 109969.5,
      "a": []
    },
    {
      "n": "Liepaga",
      "c": "Latvia",
      "p": 83969.5,
      "a": []
    },
    {
      "n": "Jelgava",
      "c": "Latvia",
      "p": 64499,
      "a": []
    },
    {
      "n": "Ventspils",
      "c": "Latvia",
      "p": 42764,
      "a": []
    },
    {
      "n": "Rezekne",
      "c": "Latvia",
      "p": 38219,
      "a": []
    }
  ],
  "Asia/Beirut": [
    {
      "n": "Beirut",
      "c": "Lebanon",
      "p": 1779062.5,
      "a": []
    },
    {
      "n": "Trablous",
      "c": "Lebanon",
      "p": 361286,
      "a": []
    },
    {
      "n": "Saida",
      "c": "Lebanon",
      "p": 173894,
      "a": []
    },
    {
      "n": "Zahle",
      "c": "Lebanon",
      "p": 61192,
      "a": []
    },
    {
      "n": "Nabatiye et Tahta",
      "c": "Lebanon",
      "p": 60000,
      "a": []
    },
    {
      "n": "B'abda",
      "c": "Lebanon",
      "p": 9000,
      "a": []
    }
  ],
  "Africa/Maseru": [
    {
      "n": "Maseru",
      "c": "Lesotho",
      "p": 239839.5,
      "a": []
    },
    {
      "n": "Mafetang",
      "c": "Lesotho",
      "p": 54708.5,
      "a": []
    },
    {
      "n": "Hlotse",
      "c": "Lesotho",
      "p": 47675,
      "a": []
    },
    {
      "n": "Qacha's Nek",
      "c": "South Africa",
      "p": 25573,
      "a": []
    },
    {
      "n": "Mohales Hoek",
      "c": "Lesotho",
      "p": 24992,
      "a": []
    },
    {
      "n": "Moyeni",
      "c": "Lesotho",
      "p": 24130,
      "a": []
    },
    {
      "n": "Butha-Buthe",
      "c": "Lesotho",
      "p": 16330,
      "a": []
    },
    {
      "n": "Mokhotlong",
      "c": "Lesotho",
      "p": 8809,
      "a": []
    },
    {
      "n": "Teyateyaneng",
      "c": "Lesotho",
      "p": 5115,
      "a": []
    }
  ],
  "Africa/Monrovia": [
    {
      "n": "Monrovia",
      "c": "Liberia",
      "p": 913331,
      "a": []
    },
    {
      "n": "Buchanan",
      "c": "Liberia",
      "p": 37023,
      "a": []
    },
    {
      "n": "Kakata",
      "c": "Liberia",
      "p": 33945,
      "a": []
    },
    {
      "n": "Gbarnga",
      "c": "Liberia",
      "p": 31856.5,
      "a": []
    },
    {
      "n": "Voinjama",
      "c": "Liberia",
      "p": 26594,
      "a": []
    },
    {
      "n": "Harper",
      "c": "Liberia",
      "p": 25249,
      "a": []
    },
    {
      "n": "Zwedru",
      "c": "Liberia",
      "p": 19459.5,
      "a": []
    },
    {
      "n": "Sanniquellie",
      "c": "Liberia",
      "p": 11415,
      "a": []
    },
    {
      "n": "Greenville",
      "c": "Liberia",
      "p": 10374,
      "a": []
    },
    {
      "n": "Robertsport",
      "c": "Liberia",
      "p": 7951,
      "a": []
    },
    {
      "n": "Bensonville",
      "c": "Liberia",
      "p": 4089,
      "a": []
    },
    {
      "n": "Barclayville",
      "c": "Liberia",
      "p": 2733,
      "a": []
    },
    {
      "n": "Rivercess",
      "c": "Liberia",
      "p": 2578,
      "a": []
    }
  ],
  "Africa/Tripoli": [
    {
      "n": "Tripoli",
      "c": "Libya",
      "p": 1209199,
      "a": []
    },
    {
      "n": "Banghazi",
      "c": "Libya",
      "p": 881187,
      "a": []
    },
    {
      "n": "Misratah",
      "c": "Libya",
      "p": 301160,
      "a": []
    },
    {
      "n": "Az Zawiyah",
      "c": "Libya",
      "p": 193061.5,
      "a": []
    },
    {
      "n": "Al Khums",
      "c": "Libya",
      "p": 192502,
      "a": []
    },
    {
      "n": "Tubruq",
      "c": "Libya",
      "p": 192289.5,
      "a": []
    },
    {
      "n": "Ajdabiya",
      "c": "Libya",
      "p": 139095.5,
      "a": []
    },
    {
      "n": "Al Marj",
      "c": "Libya",
      "p": 127427.5,
      "a": []
    },
    {
      "n": "Zuwarah",
      "c": "Libya",
      "p": 123848,
      "a": []
    },
    {
      "n": "Gharyan",
      "c": "Libya",
      "p": 116014.5,
      "a": []
    },
    {
      "n": "Surt",
      "c": "Libya",
      "p": 110756.5,
      "a": []
    },
    {
      "n": "Darnah",
      "c": "Libya",
      "p": 103378,
      "a": []
    },
    {
      "n": "Sabha",
      "c": "Libya",
      "p": 100249,
      "a": []
    },
    {
      "n": "Nalut",
      "c": "Libya",
      "p": 66418.5,
      "a": []
    },
    {
      "n": "Bani Walid",
      "c": "Libya",
      "p": 55871,
      "a": []
    },
    {
      "n": "Marzuq",
      "c": "Libya",
      "p": 49401.5,
      "a": []
    },
    {
      "n": "Shahhat",
      "c": "Libya",
      "p": 44188,
      "a": []
    },
    {
      "n": "Birak",
      "c": "Libya",
      "p": 42432.5,
      "a": []
    },
    {
      "n": "Al Jawf",
      "c": "Libya",
      "p": 24132,
      "a": []
    },
    {
      "n": "Ghat",
      "c": "Libya",
      "p": 22006,
      "a": []
    },
    {
      "n": "Hun",
      "c": "Libya",
      "p": 17352,
      "a": []
    },
    {
      "n": "Mizdah",
      "c": "Libya",
      "p": 16379.5,
      "a": []
    },
    {
      "n": "Ghadamis",
      "c": "Libya",
      "p": 6623,
      "a": []
    },
    {
      "n": "Awjilah",
      "c": "Libya",
      "p": 6610,
      "a": []
    },
    {
      "n": "Qaminis",
      "c": "Libya",
      "p": 5348,
      "a": []
    },
    {
      "n": "Maradah",
      "c": "Libya",
      "p": 2364.5,
      "a": []
    },
    {
      "n": "Al Bayda",
      "c": "Libya",
      "p": 1794,
      "a": []
    },
    {
      "n": "Al Jaghbub",
      "c": "Libya",
      "p": 1744,
      "a": []
    },
    {
      "n": "Tajarhi",
      "c": "Libya",
      "p": 1498,
      "a": []
    },
    {
      "n": "Dirj",
      "c": "Libya",
      "p": 931,
      "a": []
    },
    {
      "n": "Tmassah",
      "c": "Libya",
      "p": 350,
      "a": []
    },
    {
      "n": "Umm al Abid",
      "c": "Libya",
      "p": 299,
      "a": []
    },
    {
      "n": "El Agheila",
      "c": "Libya",
      "p": 100,
      "a": []
    },
    {
      "n": "As Sidr",
      "c": "Libya",
      "p": 50,
      "a": []
    },
    {
      "n": "Zillah",
      "c": "Libya",
      "p": 10,
      "a": []
    }
  ],
  "Europe/Vaduz": [
    {
      "n": "Vaduz",
      "c": "Liechtenstein",
      "p": 20811.5,
      "a": []
    }
  ],
  "Europe/Vilnius": [
    {
      "n": "Vilnius",
      "c": "Lithuania",
      "p": 524697.5,
      "a": []
    },
    {
      "n": "Kaunas",
      "c": "Lithuania",
      "p": 363844.5,
      "a": []
    },
    {
      "n": "Klaipeda",
      "c": "Lithuania",
      "p": 191334,
      "a": []
    },
    {
      "n": "Siauliai",
      "c": "Lithuania",
      "p": 132057.5,
      "a": []
    },
    {
      "n": "Panevežys",
      "c": "Lithuania",
      "p": 122400,
      "a": []
    }
  ],
  "Europe/Luxembourg": [
    {
      "n": "Luxembourg",
      "c": "Luxembourg",
      "p": 91972,
      "a": []
    },
    {
      "n": "Diekirch",
      "c": "Luxembourg",
      "p": 6242,
      "a": []
    },
    {
      "n": "Grevenmacher",
      "c": "Luxembourg",
      "p": 3958,
      "a": []
    }
  ],
  "Asia/Macau": [
    {
      "n": "Macau",
      "c": "Macau S.A.R",
      "p": 568700,
      "a": []
    }
  ],
  "Europe/Skopje": [
    {
      "n": "Skopje",
      "c": "Macedonia",
      "p": 484488,
      "a": []
    },
    {
      "n": "Tetovo",
      "c": "Macedonia",
      "p": 96038,
      "a": []
    },
    {
      "n": "Bitola",
      "c": "Macedonia",
      "p": 75551,
      "a": []
    }
  ],
  "Indian/Antananarivo": [
    {
      "n": "Antananarivo",
      "c": "Madagascar",
      "p": 1544216.5,
      "a": []
    },
    {
      "n": "Antsirabe",
      "c": "Madagascar",
      "p": 307921,
      "a": []
    },
    {
      "n": "Toamasina",
      "c": "Madagascar",
      "p": 208299.5,
      "a": []
    },
    {
      "n": "Fianarantsoa",
      "c": "Madagascar",
      "p": 175705.5,
      "a": []
    },
    {
      "n": "Mahajanga",
      "c": "Madagascar",
      "p": 145158.5,
      "a": []
    },
    {
      "n": "Toliara",
      "c": "Madagascar",
      "p": 106278,
      "a": []
    },
    {
      "n": "Antsiranana",
      "c": "Madagascar",
      "p": 76312,
      "a": []
    },
    {
      "n": "Ambatondrazaka",
      "c": "Madagascar",
      "p": 41843,
      "a": []
    },
    {
      "n": "Antalaha",
      "c": "Madagascar",
      "p": 40668,
      "a": []
    },
    {
      "n": "Sambava",
      "c": "Madagascar",
      "p": 37493.5,
      "a": []
    },
    {
      "n": "Maroantsetra",
      "c": "Madagascar",
      "p": 30952.5,
      "a": []
    },
    {
      "n": "Ambanja",
      "c": "Madagascar",
      "p": 26231.5,
      "a": []
    },
    {
      "n": "Andoany",
      "c": "Madagascar",
      "p": 20535.5,
      "a": []
    },
    {
      "n": "Morondava",
      "c": "Madagascar",
      "p": 20018.5,
      "a": []
    },
    {
      "n": "Mananjary",
      "c": "Madagascar",
      "p": 19841,
      "a": []
    },
    {
      "n": "Tolanaro",
      "c": "Madagascar",
      "p": 16818,
      "a": []
    },
    {
      "n": "Morombe",
      "c": "Madagascar",
      "p": 16727,
      "a": []
    },
    {
      "n": "Marovoay",
      "c": "Madagascar",
      "p": 16513,
      "a": []
    },
    {
      "n": "Antsohihy",
      "c": "Madagascar",
      "p": 15258.5,
      "a": []
    },
    {
      "n": "Farafangana",
      "c": "Madagascar",
      "p": 14992.5,
      "a": []
    },
    {
      "n": "Ihosy",
      "c": "Madagascar",
      "p": 13902,
      "a": []
    },
    {
      "n": "Miandrivazo",
      "c": "Madagascar",
      "p": 11893.5,
      "a": []
    },
    {
      "n": "Mandritsara",
      "c": "Madagascar",
      "p": 9705,
      "a": []
    },
    {
      "n": "Maintirano",
      "c": "Madagascar",
      "p": 5925,
      "a": []
    },
    {
      "n": "Bekiy",
      "c": "Madagascar",
      "p": 4286,
      "a": []
    },
    {
      "n": "Manja",
      "c": "Madagascar",
      "p": 1536,
      "a": []
    },
    {
      "n": "Besalampy",
      "c": "Madagascar",
      "p": 1022,
      "a": []
    },
    {
      "n": "Androka",
      "c": "Madagascar",
      "p": 174,
      "a": []
    }
  ],
  "Africa/Blantyre": [
    {
      "n": "Lilongwe",
      "c": "Malawi",
      "p": 646750,
      "a": []
    },
    {
      "n": "Blantyre",
      "c": "Malawi",
      "p": 584877,
      "a": []
    },
    {
      "n": "Mzuzu",
      "c": "Malawi",
      "p": 110201,
      "a": []
    },
    {
      "n": "Zomba",
      "c": "Malawi",
      "p": 80932,
      "a": []
    },
    {
      "n": "Mangochi",
      "c": "Malawi",
      "p": 68973.5,
      "a": []
    },
    {
      "n": "Salima",
      "c": "Malawi",
      "p": 50616.5,
      "a": []
    },
    {
      "n": "Nkhotakota",
      "c": "Malawi",
      "p": 42359.5,
      "a": []
    },
    {
      "n": "Karonga",
      "c": "Malawi",
      "p": 33325.5,
      "a": []
    },
    {
      "n": "Chiromo",
      "c": "Malawi",
      "p": 25235,
      "a": []
    },
    {
      "n": "Nsanje",
      "c": "Malawi",
      "p": 21774,
      "a": []
    },
    {
      "n": "Mzimba",
      "c": "Malawi",
      "p": 19308,
      "a": []
    },
    {
      "n": "Mchinji",
      "c": "Malawi",
      "p": 18305,
      "a": []
    },
    {
      "n": "Nkhata Bay",
      "c": "Malawi",
      "p": 16914.5,
      "a": []
    },
    {
      "n": "Mulanje",
      "c": "Malawi",
      "p": 16483,
      "a": []
    },
    {
      "n": "Dedza",
      "c": "Malawi",
      "p": 15608,
      "a": []
    },
    {
      "n": "Mwanza",
      "c": "Malawi",
      "p": 11379,
      "a": []
    },
    {
      "n": "Chitipa",
      "c": "Malawi",
      "p": 11118,
      "a": []
    },
    {
      "n": "Ntcheu",
      "c": "Malawi",
      "p": 10445,
      "a": []
    },
    {
      "n": "Mbamba Bay",
      "c": "Tanzania",
      "p": 8997,
      "a": []
    },
    {
      "n": "Chiradzulu",
      "c": "Malawi",
      "p": 1580,
      "a": []
    },
    {
      "n": "Machinga",
      "c": "Malawi",
      "p": 1418,
      "a": []
    }
  ],
  "Asia/Kuala_Lumpur": [
    {
      "n": "George Town",
      "c": "Malaysia",
      "p": 1610101,
      "a": []
    },
    {
      "n": "Kuala Lumpur",
      "c": "Malaysia",
      "p": 1448000,
      "a": []
    },
    {
      "n": "Kelang",
      "c": "Malaysia",
      "p": 917933.5,
      "a": []
    },
    {
      "n": "Johor Bahru",
      "c": "Malaysia",
      "p": 838744.5,
      "a": []
    },
    {
      "n": "Ipoh",
      "c": "Malaysia",
      "p": 656227,
      "a": []
    },
    {
      "n": "Malacca",
      "c": "Malaysia",
      "p": 645916.5,
      "a": []
    },
    {
      "n": "Shah Alam",
      "c": "Malaysia",
      "p": 481654,
      "a": []
    },
    {
      "n": "Butterworth",
      "c": "Malaysia",
      "p": 464621.5,
      "a": []
    },
    {
      "n": "Kota Baharu",
      "c": "Malaysia",
      "p": 392449.5,
      "a": []
    },
    {
      "n": "Seremban",
      "c": "Malaysia",
      "p": 336824,
      "a": []
    },
    {
      "n": "Kuantan",
      "c": "Malaysia",
      "p": 320462,
      "a": []
    },
    {
      "n": "Kuala Terengganu",
      "c": "Malaysia",
      "p": 317637.5,
      "a": []
    },
    {
      "n": "Sungai Petani",
      "c": "Malaysia",
      "p": 293671,
      "a": []
    },
    {
      "n": "Alor Setar",
      "c": "Malaysia",
      "p": 276921.5,
      "a": []
    },
    {
      "n": "Taiping",
      "c": "Malaysia",
      "p": 227371,
      "a": []
    },
    {
      "n": "Batu Pahat",
      "c": "Malaysia",
      "p": 177927.5,
      "a": []
    },
    {
      "n": "Keluang",
      "c": "Malaysia",
      "p": 163264,
      "a": []
    },
    {
      "n": "Muar",
      "c": "Malaysia",
      "p": 159621.5,
      "a": []
    },
    {
      "n": "Teluk Intan",
      "c": "Malaysia",
      "p": 82506,
      "a": []
    },
    {
      "n": "Kangar",
      "c": "Malaysia",
      "p": 63869,
      "a": []
    },
    {
      "n": "Chukai",
      "c": "Malaysia",
      "p": 63535.5,
      "a": []
    },
    {
      "n": "Putrajaya",
      "c": "Malaysia",
      "p": 58982,
      "a": []
    },
    {
      "n": "Raub",
      "c": "Malaysia",
      "p": 36772.5,
      "a": []
    },
    {
      "n": "Kuala Lipis",
      "c": "Malaysia",
      "p": 15448,
      "a": []
    }
  ],
  "Asia/Kuching": [
    {
      "n": "Kuching",
      "c": "Malaysia",
      "p": 537685,
      "a": []
    },
    {
      "n": "Kota Kinabalu",
      "c": "Malaysia",
      "p": 492498.5,
      "a": []
    },
    {
      "n": "Sandakan",
      "c": "Malaysia",
      "p": 341788.5,
      "a": []
    },
    {
      "n": "Tawau",
      "c": "Malaysia",
      "p": 297996.5,
      "a": []
    },
    {
      "n": "Miri",
      "c": "Malaysia",
      "p": 219957.5,
      "a": []
    },
    {
      "n": "Sibu",
      "c": "Malaysia",
      "p": 201035.5,
      "a": []
    },
    {
      "n": "Bintulu",
      "c": "Malaysia",
      "p": 117643.5,
      "a": []
    },
    {
      "n": "Lahad Datu",
      "c": "Malaysia",
      "p": 82966,
      "a": []
    }
  ],
  "Indian/Maldives": [
    {
      "n": "Male",
      "c": "Maldives",
      "p": 108310,
      "a": []
    }
  ],
  "Africa/Bamako": [
    {
      "n": "Bamako",
      "c": "Mali",
      "p": 1395640.5,
      "a": []
    },
    {
      "n": "Sikasso",
      "c": "Mali",
      "p": 185269.5,
      "a": []
    },
    {
      "n": "Segou",
      "c": "Mali",
      "p": 107752,
      "a": []
    },
    {
      "n": "Koutiala",
      "c": "Mali",
      "p": 102140,
      "a": []
    },
    {
      "n": "Mopti",
      "c": "Mali",
      "p": 93269.5,
      "a": []
    },
    {
      "n": "Gao",
      "c": "Mali",
      "p": 87472.5,
      "a": []
    },
    {
      "n": "Kayes",
      "c": "Mali",
      "p": 77207,
      "a": []
    },
    {
      "n": "Timbuktu",
      "c": "Mali",
      "p": 68872,
      "a": []
    },
    {
      "n": "Kati",
      "c": "Mali",
      "p": 54908.5,
      "a": []
    },
    {
      "n": "Markala",
      "c": "Mali",
      "p": 46161.5,
      "a": []
    },
    {
      "n": "San",
      "c": "Mali",
      "p": 33098.5,
      "a": []
    },
    {
      "n": "Bougouni",
      "c": "Mali",
      "p": 30547,
      "a": []
    },
    {
      "n": "Bourem",
      "c": "Mali",
      "p": 28743,
      "a": []
    },
    {
      "n": "Djenne",
      "c": "Mali",
      "p": 27663,
      "a": []
    },
    {
      "n": "Bafoulabe",
      "c": "Mali",
      "p": 26823,
      "a": []
    },
    {
      "n": "Kita",
      "c": "Mali",
      "p": 26102,
      "a": []
    },
    {
      "n": "Nara",
      "c": "Mali",
      "p": 18459,
      "a": []
    },
    {
      "n": "Banamba",
      "c": "Mali",
      "p": 18312,
      "a": []
    },
    {
      "n": "Kangaba",
      "c": "Mali",
      "p": 17232,
      "a": []
    },
    {
      "n": "Nioro du Sahel",
      "c": "Mali",
      "p": 14421,
      "a": []
    },
    {
      "n": "Koulikoro",
      "c": "Mali",
      "p": 13408.5,
      "a": []
    },
    {
      "n": "Menaka",
      "c": "Mali",
      "p": 9110,
      "a": []
    },
    {
      "n": "Aguelhok",
      "c": "Mali",
      "p": 8540,
      "a": []
    },
    {
      "n": "Goundam",
      "c": "Mali",
      "p": 6217.5,
      "a": []
    },
    {
      "n": "Tessalit",
      "c": "Mali",
      "p": 5869.5,
      "a": []
    },
    {
      "n": "Sokolo",
      "c": "Mali",
      "p": 4251,
      "a": []
    },
    {
      "n": "Araouane",
      "c": "Mali",
      "p": 4026,
      "a": []
    },
    {
      "n": "Taoudenni",
      "c": "Mali",
      "p": 3019,
      "a": []
    },
    {
      "n": "Yelimane",
      "c": "Mali",
      "p": 988,
      "a": []
    },
    {
      "n": "Satadougou",
      "c": "Mali",
      "p": 706,
      "a": []
    }
  ],
  "Europe/Malta": [
    {
      "n": "Valletta",
      "c": "Malta",
      "p": 187608,
      "a": []
    }
  ],
  "Pacific/Majuro": [
    {
      "n": "Majuro",
      "c": "Marshall Islands",
      "p": 22950,
      "a": []
    }
  ],
  "Africa/Nouakchott": [
    {
      "n": "Nouakchott",
      "c": "Mauritania",
      "p": 701772,
      "a": []
    },
    {
      "n": "Nema",
      "c": "Mauritania",
      "p": 127500,
      "a": []
    },
    {
      "n": "Nouadhibou",
      "c": "Mauritania",
      "p": 86738,
      "a": []
    },
    {
      "n": "Kiffa",
      "c": "Mauritania",
      "p": 73930,
      "a": []
    },
    {
      "n": "Zouirat",
      "c": "Mauritania",
      "p": 56345,
      "a": []
    },
    {
      "n": "Rosso",
      "c": "Mauritania",
      "p": 47203,
      "a": []
    },
    {
      "n": "Atar",
      "c": "Mauritania",
      "p": 44265,
      "a": []
    },
    {
      "n": "Kaedi",
      "c": "Senegal",
      "p": 21656,
      "a": []
    },
    {
      "n": "Tidjikdja",
      "c": "Mauritania",
      "p": 19981,
      "a": []
    },
    {
      "n": "Boutilimit",
      "c": "Mauritania",
      "p": 14142,
      "a": []
    },
    {
      "n": "Bogue",
      "c": "Mauritania",
      "p": 10415,
      "a": []
    },
    {
      "n": "Aleg",
      "c": "Mauritania",
      "p": 8388,
      "a": []
    },
    {
      "n": "Fderik",
      "c": "Mauritania",
      "p": 5760,
      "a": []
    },
    {
      "n": "Ayoun el Atrous",
      "c": "Mauritania",
      "p": 1423,
      "a": []
    },
    {
      "n": "Selibaby",
      "c": "Mauritania",
      "p": 460,
      "a": []
    },
    {
      "n": "Akjoujt",
      "c": "Mauritania",
      "p": 370,
      "a": []
    },
    {
      "n": "Timbedra",
      "c": "Mauritania",
      "p": 245,
      "a": []
    },
    {
      "n": "Chegga",
      "c": "Mauritania",
      "p": 10,
      "a": []
    },
    {
      "n": "Magta Lajar",
      "c": "Mauritania",
      "p": 10,
      "a": []
    },
    {
      "n": "Bir Mogrein",
      "c": "Mauritania",
      "p": 10,
      "a": []
    }
  ],
  "Africa/Dakar": [
    {
      "n": "Dakar",
      "c": "Senegal",
      "p": 2540200,
      "a": []
    },
    {
      "n": "Thies",
      "c": "Senegal",
      "p": 293001,
      "a": []
    },
    {
      "n": "Kaolack",
      "c": "Senegal",
      "p": 277812,
      "a": []
    },
    {
      "n": "Saint-Louis",
      "c": "Mauritania",
      "p": 198396,
      "a": []
    },
    {
      "n": "Ziguinchor",
      "c": "Senegal",
      "p": 175747,
      "a": []
    },
    {
      "n": "Diourbel",
      "c": "Senegal",
      "p": 148024,
      "a": []
    },
    {
      "n": "Tambacounda",
      "c": "Senegal",
      "p": 89212,
      "a": []
    },
    {
      "n": "Louga",
      "c": "Senegal",
      "p": 85075,
      "a": []
    },
    {
      "n": "Kolda",
      "c": "Senegal",
      "p": 64038,
      "a": []
    },
    {
      "n": "Fatick",
      "c": "Senegal",
      "p": 24243,
      "a": []
    },
    {
      "n": "Kedougou",
      "c": "Senegal",
      "p": 18074,
      "a": []
    }
  ],
  "Indian/Mauritius": [
    {
      "n": "Port Louis",
      "c": "Mauritius",
      "p": 371953.5,
      "a": []
    },
    {
      "n": "Curepipe",
      "c": "Mauritius",
      "p": 192087.5,
      "a": []
    }
  ],
  "America/Tijuana": [
    {
      "n": "Tijuana",
      "c": "Mexico",
      "p": 1464728.5,
      "a": []
    },
    {
      "n": "Mexicali",
      "c": "Mexico",
      "p": 736138.5,
      "a": []
    },
    {
      "n": "Ensenada",
      "c": "Mexico",
      "p": 238751,
      "a": []
    },
    {
      "n": "San Felipe",
      "c": "Mexico",
      "p": 18068,
      "a": []
    },
    {
      "n": "Vicente Guerrero",
      "c": "Mexico",
      "p": 7294.5,
      "a": []
    },
    {
      "n": "San Quintin",
      "c": "Mexico",
      "p": 5433,
      "a": []
    },
    {
      "n": "Punta Prieta",
      "c": "Mexico",
      "p": 527,
      "a": []
    }
  ],
  "America/Mazatlan": [
    {
      "n": "Culiacan",
      "c": "Mexico",
      "p": 695734.5,
      "a": []
    },
    {
      "n": "Mazatlan",
      "c": "Mexico",
      "p": 361460.5,
      "a": []
    },
    {
      "n": "Tepic",
      "c": "Mexico",
      "p": 299686.5,
      "a": []
    },
    {
      "n": "Los Mochis",
      "c": "Mexico",
      "p": 231824,
      "a": []
    },
    {
      "n": "La Paz",
      "c": "Mexico",
      "p": 180626,
      "a": []
    },
    {
      "n": "Guasave",
      "c": "Mexico",
      "p": 82654.5,
      "a": []
    },
    {
      "n": "Guamuchil",
      "c": "Mexico",
      "p": 60985.5,
      "a": []
    },
    {
      "n": "Cabo San Lucas",
      "c": "Mexico",
      "p": 39492.5,
      "a": []
    },
    {
      "n": "Ciudad Constitucion",
      "c": "Mexico",
      "p": 37605.5,
      "a": []
    },
    {
      "n": "Escuinapa",
      "c": "Mexico",
      "p": 28248,
      "a": []
    },
    {
      "n": "Tuxpan",
      "c": "Mexico",
      "p": 26115,
      "a": []
    },
    {
      "n": "Santiago Ixcuintla",
      "c": "Mexico",
      "p": 17077.5,
      "a": []
    },
    {
      "n": "Eldorado",
      "c": "Mexico",
      "p": 15750.5,
      "a": []
    },
    {
      "n": "Compostela",
      "c": "Mexico",
      "p": 15192,
      "a": []
    },
    {
      "n": "Villa Union",
      "c": "Mexico",
      "p": 14563,
      "a": []
    },
    {
      "n": "Guerrero Negro",
      "c": "Mexico",
      "p": 13054,
      "a": []
    },
    {
      "n": "Tecuala",
      "c": "Mexico",
      "p": 12752,
      "a": []
    },
    {
      "n": "La Cruz",
      "c": "Mexico",
      "p": 11527.5,
      "a": []
    },
    {
      "n": "Santa Rosalia",
      "c": "Mexico",
      "p": 11110,
      "a": []
    },
    {
      "n": "Loreto",
      "c": "Mexico",
      "p": 10760.5,
      "a": []
    },
    {
      "n": "El Fuerte",
      "c": "Mexico",
      "p": 8326.5,
      "a": []
    },
    {
      "n": "Altata",
      "c": "Mexico",
      "p": 750,
      "a": []
    }
  ],
  "America/Monterrey": [
    {
      "n": "Monterrey",
      "c": "Mexico",
      "p": 2417437,
      "a": []
    },
    {
      "n": "Torreon",
      "c": "Mexico",
      "p": 834033,
      "a": []
    },
    {
      "n": "Saltillo",
      "c": "Mexico",
      "p": 679286.5,
      "a": []
    },
    {
      "n": "Tampico",
      "c": "Mexico",
      "p": 578351.5,
      "a": []
    },
    {
      "n": "Durango",
      "c": "Mexico",
      "p": 456368.5,
      "a": []
    },
    {
      "n": "Gomez Palacio",
      "c": "Mexico",
      "p": 313952.5,
      "a": []
    },
    {
      "n": "Ciudad Victoria",
      "c": "Mexico",
      "p": 272411.5,
      "a": []
    },
    {
      "n": "Monclova",
      "c": "Mexico",
      "p": 216004,
      "a": []
    },
    {
      "n": "Ciudad Madero",
      "c": "Mexico",
      "p": 165411.5,
      "a": []
    },
    {
      "n": "Ciudad Mante",
      "c": "Mexico",
      "p": 78299.5,
      "a": []
    },
    {
      "n": "San Pedro de las Colonias",
      "c": "Mexico",
      "p": 53688,
      "a": []
    },
    {
      "n": "Linares",
      "c": "Mexico",
      "p": 52349.5,
      "a": []
    },
    {
      "n": "Montemorelos",
      "c": "Mexico",
      "p": 40167,
      "a": []
    },
    {
      "n": "Nueva Rosita",
      "c": "Mexico",
      "p": 35746.5,
      "a": []
    },
    {
      "n": "Sabinas Hidalgo",
      "c": "Mexico",
      "p": 26122.5,
      "a": []
    },
    {
      "n": "San Fernando",
      "c": "Mexico",
      "p": 25596,
      "a": []
    },
    {
      "n": "Parras",
      "c": "Mexico",
      "p": 23714,
      "a": []
    },
    {
      "n": "Allende",
      "c": "Mexico",
      "p": 18268.5,
      "a": []
    },
    {
      "n": "Papasquiaro",
      "c": "Mexico",
      "p": 11635.5,
      "a": []
    },
    {
      "n": "Aldama",
      "c": "Mexico",
      "p": 11367,
      "a": []
    },
    {
      "n": "Canatlan",
      "c": "Mexico",
      "p": 7806.5,
      "a": []
    },
    {
      "n": "Cuencame",
      "c": "Mexico",
      "p": 5416,
      "a": []
    },
    {
      "n": "Tula",
      "c": "Mexico",
      "p": 4683,
      "a": []
    }
  ],
  "America/Chihuahua": [
    {
      "n": "Chihuahua",
      "c": "Mexico",
      "p": 750633.5,
      "a": []
    },
    {
      "n": "Delicias",
      "c": "Mexico",
      "p": 108876,
      "a": []
    },
    {
      "n": "Hidalgo del Parral",
      "c": "Mexico",
      "p": 102573,
      "a": []
    },
    {
      "n": "Cuauhtemoc",
      "c": "Mexico",
      "p": 84967.5,
      "a": []
    },
    {
      "n": "Nuevo Casas Grandes",
      "c": "Mexico",
      "p": 53091,
      "a": []
    },
    {
      "n": "Ciudad Camargo",
      "c": "Mexico",
      "p": 35904.5,
      "a": []
    },
    {
      "n": "Santa Barbara",
      "c": "Mexico",
      "p": 8413.5,
      "a": []
    },
    {
      "n": "Villa Ahumada",
      "c": "Mexico",
      "p": 8213.5,
      "a": []
    }
  ],
  "America/Ojinaga": [
    {
      "n": "Ciudad Juárez",
      "c": "Mexico",
      "p": 1343000,
      "a": []
    },
    {
      "n": "Ojinaga",
      "c": "Mexico",
      "p": 19804.5,
      "a": []
    },
    {
      "n": "Ascension",
      "c": "Mexico",
      "p": 10761,
      "a": []
    }
  ],
  "America/Hermosillo": [
    {
      "n": "Hermosillo",
      "c": "Mexico",
      "p": 554373,
      "a": []
    },
    {
      "n": "Mazatlán",
      "c": "Mexico",
      "p": 469217,
      "a": []
    },
    {
      "n": "Ciudad Obregon",
      "c": "Mexico",
      "p": 273082,
      "a": []
    },
    {
      "n": "Navajoa",
      "c": "Mexico",
      "p": 116093,
      "a": []
    },
    {
      "n": "Nogales",
      "c": "Mexico",
      "p": 99402,
      "a": []
    },
    {
      "n": "Guaymas",
      "c": "Mexico",
      "p": 84496.5,
      "a": []
    },
    {
      "n": "Agua Prieta",
      "c": "Mexico",
      "p": 77264.5,
      "a": []
    },
    {
      "n": "Caborca",
      "c": "Mexico",
      "p": 55126.5,
      "a": []
    },
    {
      "n": "Cananea",
      "c": "Mexico",
      "p": 28625.5,
      "a": []
    },
    {
      "n": "Huatabampo",
      "c": "Mexico",
      "p": 27744.5,
      "a": []
    },
    {
      "n": "Magdalena",
      "c": "Mexico",
      "p": 13402,
      "a": []
    },
    {
      "n": "Nacozari Viejo",
      "c": "Mexico",
      "p": 11872,
      "a": []
    },
    {
      "n": "Esperanza",
      "c": "Mexico",
      "p": 3836,
      "a": []
    }
  ],
  "America/Mexico_City": [
    {
      "n": "Mexico City",
      "c": "Mexico",
      "p": 14919501,
      "a": [
        "MEX"
      ]
    },
    {
      "n": "Guadalajara",
      "c": "Mexico",
      "p": 2919294.5,
      "a": []
    },
    {
      "n": "Puebla",
      "c": "Mexico",
      "p": 1793549.5,
      "a": []
    },
    {
      "n": "Leon",
      "c": "Mexico",
      "p": 1301313,
      "a": []
    },
    {
      "n": "Toluca",
      "c": "Mexico",
      "p": 1018440.5,
      "a": []
    },
    {
      "n": "Nezahualcoyotl",
      "c": "Mexico",
      "p": 929681.5,
      "a": []
    },
    {
      "n": "San Luis Potosi",
      "c": "Mexico",
      "p": 834852,
      "a": []
    },
    {
      "n": "Queretaro",
      "c": "Mexico",
      "p": 786392.5,
      "a": []
    },
    {
      "n": "Aguascalientes",
      "c": "Mexico",
      "p": 763589.5,
      "a": []
    },
    {
      "n": "Acapulco",
      "c": "Mexico",
      "p": 683860,
      "a": []
    },
    {
      "n": "Morelia",
      "c": "Mexico",
      "p": 618551.5,
      "a": []
    },
    {
      "n": "Cuernavaca",
      "c": "Mexico",
      "p": 591551.5,
      "a": []
    },
    {
      "n": "Veracruz",
      "c": "Mexico",
      "p": 573638,
      "a": []
    },
    {
      "n": "Tuxtla Gutierrez",
      "c": "Mexico",
      "p": 473719,
      "a": []
    },
    {
      "n": "Xalapa",
      "c": "Mexico",
      "p": 438667,
      "a": []
    },
    {
      "n": "Oaxaca",
      "c": "Mexico",
      "p": 396647,
      "a": []
    },
    {
      "n": "Villahermosa",
      "c": "Mexico",
      "p": 395482.5,
      "a": []
    },
    {
      "n": "Celaya",
      "c": "Mexico",
      "p": 344799,
      "a": []
    },
    {
      "n": "Irapuato",
      "c": "Mexico",
      "p": 339554,
      "a": []
    },
    {
      "n": "Pachuca",
      "c": "Mexico",
      "p": 310861,
      "a": []
    },
    {
      "n": "Tlaxcala",
      "c": "Mexico",
      "p": 296836.5,
      "a": []
    },
    {
      "n": "Coatzacoalcos",
      "c": "Mexico",
      "p": 259001,
      "a": []
    },
    {
      "n": "Uruapan",
      "c": "Mexico",
      "p": 250919.5,
      "a": []
    },
    {
      "n": "Tehuacan",
      "c": "Mexico",
      "p": 239370.5,
      "a": []
    },
    {
      "n": "Orizaba",
      "c": "Mexico",
      "p": 238340.5,
      "a": []
    },
    {
      "n": "Poza Rica de Hidalgo",
      "c": "Mexico",
      "p": 214503.5,
      "a": []
    },
    {
      "n": "Tapachula",
      "c": "Mexico",
      "p": 209741,
      "a": []
    },
    {
      "n": "Zumpango",
      "c": "Mexico",
      "p": 188994,
      "a": []
    },
    {
      "n": "Puerto Vallarta",
      "c": "Mexico",
      "p": 183969,
      "a": []
    },
    {
      "n": "Cordoba",
      "c": "Mexico",
      "p": 177483,
      "a": []
    },
    {
      "n": "Zacatecas",
      "c": "Mexico",
      "p": 176521.5,
      "a": []
    },
    {
      "n": "Minatitlan",
      "c": "Mexico",
      "p": 176398.5,
      "a": []
    },
    {
      "n": "Colima",
      "c": "Mexico",
      "p": 175261,
      "a": []
    },
    {
      "n": "Chilpancingo",
      "c": "Mexico",
      "p": 173818.5,
      "a": []
    },
    {
      "n": "Zamora",
      "c": "Mexico",
      "p": 169931.5,
      "a": []
    },
    {
      "n": "Salamanca",
      "c": "Mexico",
      "p": 168069,
      "a": []
    },
    {
      "n": "San Cristobal de Las Casas",
      "c": "Mexico",
      "p": 157828.5,
      "a": []
    },
    {
      "n": "San Juan del Rio",
      "c": "Mexico",
      "p": 132866,
      "a": []
    },
    {
      "n": "Teziutlan",
      "c": "Mexico",
      "p": 124307.5,
      "a": []
    },
    {
      "n": "Lazaro Cardenas",
      "c": "Mexico",
      "p": 122044,
      "a": []
    },
    {
      "n": "Ciudad Valles",
      "c": "Mexico",
      "p": 112234,
      "a": []
    },
    {
      "n": "Iguala",
      "c": "Mexico",
      "p": 110641.5,
      "a": []
    },
    {
      "n": "Fresnillo",
      "c": "Mexico",
      "p": 102629.5,
      "a": []
    },
    {
      "n": "Guanajuato",
      "c": "Mexico",
      "p": 95282,
      "a": []
    },
    {
      "n": "Apatzingan",
      "c": "Mexico",
      "p": 92616.5,
      "a": []
    },
    {
      "n": "Atlixco",
      "c": "Mexico",
      "p": 91866.5,
      "a": []
    },
    {
      "n": "Ciudad Guzman",
      "c": "Mexico",
      "p": 90480,
      "a": []
    },
    {
      "n": "Lagos de Moreno",
      "c": "Mexico",
      "p": 89402,
      "a": []
    },
    {
      "n": "Tecoman",
      "c": "Mexico",
      "p": 85450,
      "a": []
    },
    {
      "n": "Manzanillo",
      "c": "Mexico",
      "p": 85236.5,
      "a": []
    },
    {
      "n": "Salina Cruz",
      "c": "Mexico",
      "p": 77355.5,
      "a": []
    },
    {
      "n": "Jaltipan",
      "c": "Mexico",
      "p": 66998,
      "a": []
    },
    {
      "n": "Matehuala",
      "c": "Mexico",
      "p": 63624.5,
      "a": []
    },
    {
      "n": "Juchitan",
      "c": "Mexico",
      "p": 62254.5,
      "a": []
    },
    {
      "n": "Ciudad Hidalgo",
      "c": "Mexico",
      "p": 59573.5,
      "a": []
    },
    {
      "n": "Rio Verde",
      "c": "Mexico",
      "p": 59233.5,
      "a": []
    },
    {
      "n": "Tuxpam",
      "c": "Mexico",
      "p": 58690,
      "a": []
    },
    {
      "n": "Escuintla",
      "c": "Mexico",
      "p": 58313.5,
      "a": []
    },
    {
      "n": "Taxco",
      "c": "Mexico",
      "p": 53217,
      "a": []
    },
    {
      "n": "Tamazunchale",
      "c": "Mexico",
      "p": 47108.5,
      "a": []
    },
    {
      "n": "Autlan",
      "c": "Mexico",
      "p": 44912,
      "a": []
    },
    {
      "n": "Huajuapan de Leon",
      "c": "Mexico",
      "p": 41766.5,
      "a": []
    },
    {
      "n": "Tehuantepec",
      "c": "Mexico",
      "p": 40082.5,
      "a": []
    },
    {
      "n": "La Barca",
      "c": "Mexico",
      "p": 34897,
      "a": []
    },
    {
      "n": "Panuco",
      "c": "Mexico",
      "p": 33449.5,
      "a": []
    },
    {
      "n": "Petatlan",
      "c": "Mexico",
      "p": 26474,
      "a": []
    },
    {
      "n": "Tenosique",
      "c": "Mexico",
      "p": 24949.5,
      "a": []
    },
    {
      "n": "Ciudad Altamirano",
      "c": "Mexico",
      "p": 24533,
      "a": []
    },
    {
      "n": "Ometepec",
      "c": "Mexico",
      "p": 24036,
      "a": []
    },
    {
      "n": "Atoyac",
      "c": "Mexico",
      "p": 19798,
      "a": []
    },
    {
      "n": "Pijijiapan",
      "c": "Mexico",
      "p": 19388,
      "a": []
    },
    {
      "n": "Pochutla",
      "c": "Mexico",
      "p": 18779.5,
      "a": []
    },
    {
      "n": "Tlaxiaco",
      "c": "Mexico",
      "p": 17999.5,
      "a": []
    },
    {
      "n": "Acatlan",
      "c": "Mexico",
      "p": 17585.5,
      "a": []
    },
    {
      "n": "Miahuatlan",
      "c": "Mexico",
      "p": 16661.5,
      "a": []
    },
    {
      "n": "Puerto Escondido",
      "c": "Mexico",
      "p": 15402.5,
      "a": []
    },
    {
      "n": "Cardenas",
      "c": "Mexico",
      "p": 15331,
      "a": []
    },
    {
      "n": "Frontera",
      "c": "Mexico",
      "p": 15014,
      "a": []
    },
    {
      "n": "Tecpan",
      "c": "Mexico",
      "p": 14638,
      "a": []
    },
    {
      "n": "Paraiso",
      "c": "Mexico",
      "p": 14167.5,
      "a": []
    },
    {
      "n": "Santiago Tuxtla",
      "c": "Mexico",
      "p": 13598,
      "a": []
    },
    {
      "n": "Juan Aldama",
      "c": "Mexico",
      "p": 13117.5,
      "a": []
    },
    {
      "n": "Tamuin",
      "c": "Mexico",
      "p": 11076.5,
      "a": []
    },
    {
      "n": "Ayutla",
      "c": "Mexico",
      "p": 9897,
      "a": []
    },
    {
      "n": "Coalcoman",
      "c": "Mexico",
      "p": 9687.5,
      "a": []
    },
    {
      "n": "Villanueva",
      "c": "Mexico",
      "p": 9093.5,
      "a": []
    },
    {
      "n": "Valparaiso",
      "c": "Mexico",
      "p": 7956.5,
      "a": []
    },
    {
      "n": "Balancan",
      "c": "Mexico",
      "p": 7666.5,
      "a": []
    },
    {
      "n": "Mitla",
      "c": "Mexico",
      "p": 4313,
      "a": []
    },
    {
      "n": "Nautla",
      "c": "Mexico",
      "p": 2653.5,
      "a": []
    }
  ],
  "America/Matamoros": [
    {
      "n": "Reynosa",
      "c": "Mexico",
      "p": 458997,
      "a": []
    },
    {
      "n": "Matamoros",
      "c": "Mexico",
      "p": 451394.5,
      "a": []
    },
    {
      "n": "Nuevo Laredo",
      "c": "Mexico",
      "p": 255152.5,
      "a": []
    },
    {
      "n": "Piedras Negras",
      "c": "Mexico",
      "p": 137295,
      "a": []
    },
    {
      "n": "Sierra Mojada",
      "c": "Mexico",
      "p": 10,
      "a": []
    }
  ],
  "America/Merida": [
    {
      "n": "Merida",
      "c": "Mexico",
      "p": 841087.5,
      "a": []
    },
    {
      "n": "Campeche",
      "c": "Mexico",
      "p": 204048.5,
      "a": []
    },
    {
      "n": "Ciudad del Carmen",
      "c": "Mexico",
      "p": 148751.5,
      "a": []
    },
    {
      "n": "Valladolid",
      "c": "Mexico",
      "p": 44071,
      "a": []
    },
    {
      "n": "Tizimin",
      "c": "Mexico",
      "p": 41322.5,
      "a": []
    },
    {
      "n": "Progreso",
      "c": "Mexico",
      "p": 33892.5,
      "a": []
    },
    {
      "n": "Ticul",
      "c": "Mexico",
      "p": 30400.5,
      "a": []
    },
    {
      "n": "Champoton",
      "c": "Mexico",
      "p": 25722.5,
      "a": []
    },
    {
      "n": "Motul",
      "c": "Mexico",
      "p": 21181,
      "a": []
    },
    {
      "n": "Tekax",
      "c": "Mexico",
      "p": 20577,
      "a": []
    },
    {
      "n": "Izamal",
      "c": "Mexico",
      "p": 14570,
      "a": []
    },
    {
      "n": "Peto",
      "c": "Mexico",
      "p": 12924,
      "a": []
    },
    {
      "n": "Halacho",
      "c": "Mexico",
      "p": 8116,
      "a": []
    }
  ],
  "America/Cancun": [
    {
      "n": "Cancun",
      "c": "Mexico",
      "p": 489452.5,
      "a": []
    },
    {
      "n": "Chetumal",
      "c": "Mexico",
      "p": 144464.5,
      "a": []
    },
    {
      "n": "Cozumel",
      "c": "Mexico",
      "p": 67634,
      "a": []
    },
    {
      "n": "Felipe Carrillo Puerto",
      "c": "Mexico",
      "p": 23958,
      "a": []
    },
    {
      "n": "Isla Mujeres",
      "c": "Mexico",
      "p": 12491,
      "a": []
    }
  ],
  "Europe/Chisinau": [
    {
      "n": "Chisinau",
      "c": "Moldova",
      "p": 662064,
      "a": []
    },
    {
      "n": "Tiraspol",
      "c": "Moldova",
      "p": 137097,
      "a": []
    },
    {
      "n": "Balti",
      "c": "Moldova",
      "p": 135022.5,
      "a": []
    },
    {
      "n": "Cahul",
      "c": "Moldova",
      "p": 48949.5,
      "a": []
    },
    {
      "n": "Dubasari",
      "c": "Moldova",
      "p": 23254,
      "a": []
    }
  ],
  "Asia/Ulaanbaatar": [
    {
      "n": "Ulaanbaatar",
      "c": "Mongolia",
      "p": 827306,
      "a": []
    },
    {
      "n": "Erdenet",
      "c": "Mongolia",
      "p": 79647,
      "a": []
    },
    {
      "n": "Darhan",
      "c": "Mongolia",
      "p": 74738,
      "a": []
    },
    {
      "n": "Arvayheer",
      "c": "Mongolia",
      "p": 28053,
      "a": []
    },
    {
      "n": "Bayankhongor",
      "c": "Mongolia",
      "p": 26252,
      "a": []
    },
    {
      "n": "Moron",
      "c": "Mongolia",
      "p": 24608.5,
      "a": []
    },
    {
      "n": "Suchboatar",
      "c": "Mongolia",
      "p": 24235,
      "a": []
    },
    {
      "n": "Tsetserleg",
      "c": "Mongolia",
      "p": 18056,
      "a": []
    },
    {
      "n": "Dzuunmod",
      "c": "Mongolia",
      "p": 17738,
      "a": []
    },
    {
      "n": "Bulgan",
      "c": "Mongolia",
      "p": 17348,
      "a": []
    },
    {
      "n": "Dzuunharaa",
      "c": "Mongolia",
      "p": 16074,
      "a": []
    },
    {
      "n": "Dalandzadgad",
      "c": "Mongolia",
      "p": 13491,
      "a": []
    },
    {
      "n": "Ondorhaan",
      "c": "Mongolia",
      "p": 12433.5,
      "a": []
    },
    {
      "n": "Buyant-Uhaa",
      "c": "Mongolia",
      "p": 8776,
      "a": []
    },
    {
      "n": "Ulaan-Uul",
      "c": "Mongolia",
      "p": 3726,
      "a": []
    },
    {
      "n": "Mandalgovi",
      "c": "Mongolia",
      "p": 2984,
      "a": []
    }
  ],
  "Asia/Hovd": [
    {
      "n": "Altay",
      "c": "Mongolia",
      "p": 32488,
      "a": []
    },
    {
      "n": "Ulaangom",
      "c": "Mongolia",
      "p": 31940.5,
      "a": []
    },
    {
      "n": "Olgiy",
      "c": "Mongolia",
      "p": 31667,
      "a": []
    },
    {
      "n": "Dund-Us",
      "c": "Mongolia",
      "p": 26596.5,
      "a": []
    },
    {
      "n": "Uliastay",
      "c": "Mongolia",
      "p": 8056,
      "a": []
    },
    {
      "n": "Hodrogo",
      "c": "Mongolia",
      "p": 10,
      "a": []
    }
  ],
  "Asia/Choibalsan": [
    {
      "n": "Choybalsan",
      "c": "Mongolia",
      "p": 33376,
      "a": []
    },
    {
      "n": "Baruun Urt",
      "c": "Mongolia",
      "p": 15805,
      "a": []
    }
  ],
  "Europe/Podgorica": [
    {
      "n": "Podgorica",
      "c": "Montenegro",
      "p": 141161.5,
      "a": []
    }
  ],
  "Africa/Casablanca": [
    {
      "n": "Casablanca",
      "c": "Morocco",
      "p": 3162954.5,
      "a": []
    },
    {
      "n": "Rabat",
      "c": "Morocco",
      "p": 1680376.5,
      "a": []
    },
    {
      "n": "Fez",
      "c": "Morocco",
      "p": 983445.5,
      "a": []
    },
    {
      "n": "Marrakesh",
      "c": "Morocco",
      "p": 855648,
      "a": []
    },
    {
      "n": "Agadir",
      "c": "Morocco",
      "p": 752031.5,
      "a": []
    },
    {
      "n": "Tangier",
      "c": "Morocco",
      "p": 719208,
      "a": []
    },
    {
      "n": "Meknes",
      "c": "Morocco",
      "p": 621666.5,
      "a": []
    },
    {
      "n": "Kenitra",
      "c": "Morocco",
      "p": 459178,
      "a": []
    },
    {
      "n": "Oujda",
      "c": "Morocco",
      "p": 407322,
      "a": []
    },
    {
      "n": "Safi",
      "c": "Morocco",
      "p": 320819.5,
      "a": []
    },
    {
      "n": "Er Rachidia",
      "c": "Morocco",
      "p": 228489,
      "a": []
    },
    {
      "n": "Ksar El Kebir",
      "c": "Morocco",
      "p": 207676.5,
      "a": []
    },
    {
      "n": "Taza",
      "c": "Morocco",
      "p": 170761.5,
      "a": []
    },
    {
      "n": "El Jadida",
      "c": "Morocco",
      "p": 164009.5,
      "a": []
    },
    {
      "n": "Settat",
      "c": "Morocco",
      "p": 140415,
      "a": []
    },
    {
      "n": "Larache",
      "c": "Morocco",
      "p": 114688,
      "a": []
    },
    {
      "n": "Goulimine",
      "c": "Morocco",
      "p": 106748,
      "a": []
    },
    {
      "n": "Ouezzane",
      "c": "Morocco",
      "p": 64171,
      "a": []
    },
    {
      "n": "Tan Tan",
      "c": "Morocco",
      "p": 63396,
      "a": []
    },
    {
      "n": "Tiznit",
      "c": "Morocco",
      "p": 56398.5,
      "a": []
    }
  ],
  "Africa/El_Aaiun": [
    {
      "n": "Laayoune",
      "c": "Morocco",
      "p": 182224.5,
      "a": []
    },
    {
      "n": "Ad Dakhla",
      "c": "Morocco",
      "p": 82146,
      "a": []
    },
    {
      "n": "Smara",
      "c": "Morocco",
      "p": 48149,
      "a": []
    },
    {
      "n": "Bir Anzarane",
      "c": "Morocco",
      "p": 6597,
      "a": []
    },
    {
      "n": "Bir Lehlou",
      "c": "Western Sahara",
      "p": 350,
      "a": []
    },
    {
      "n": "Lemsid",
      "c": "Morocco",
      "p": 100,
      "a": []
    },
    {
      "n": "Dawra",
      "c": "Morocco",
      "p": 10,
      "a": []
    }
  ],
  "Africa/Maputo": [
    {
      "n": "Maputo",
      "c": "Mozambique",
      "p": 1318806.5,
      "a": []
    },
    {
      "n": "Beira",
      "c": "Mozambique",
      "p": 507196.5,
      "a": []
    },
    {
      "n": "Matola",
      "c": "Mozambique",
      "p": 503368,
      "a": []
    },
    {
      "n": "Nampula",
      "c": "Mozambique",
      "p": 386185.5,
      "a": []
    },
    {
      "n": "Chimoio",
      "c": "Mozambique",
      "p": 242538.5,
      "a": []
    },
    {
      "n": "Nacala",
      "c": "Mozambique",
      "p": 212212.5,
      "a": []
    },
    {
      "n": "Quelimane",
      "c": "Mozambique",
      "p": 179032.5,
      "a": []
    },
    {
      "n": "Xai-Xai",
      "c": "Mozambique",
      "p": 128085.5,
      "a": []
    },
    {
      "n": "Tete",
      "c": "Mozambique",
      "p": 122183,
      "a": []
    },
    {
      "n": "Maxixe",
      "c": "Mozambique",
      "p": 112881.5,
      "a": []
    },
    {
      "n": "Pemba",
      "c": "Mozambique",
      "p": 109690,
      "a": []
    },
    {
      "n": "Inhambane",
      "c": "Mozambique",
      "p": 94830,
      "a": []
    },
    {
      "n": "Lichinga",
      "c": "Mozambique",
      "p": 94333.5,
      "a": []
    },
    {
      "n": "Dondo",
      "c": "Mozambique",
      "p": 75217.5,
      "a": []
    },
    {
      "n": "Mocuba",
      "c": "Mozambique",
      "p": 68984,
      "a": []
    },
    {
      "n": "Cuamba",
      "c": "Mozambique",
      "p": 68204.5,
      "a": []
    },
    {
      "n": "Angoche",
      "c": "Mozambique",
      "p": 57835,
      "a": []
    },
    {
      "n": "Montepuez",
      "c": "Mozambique",
      "p": 49041,
      "a": []
    },
    {
      "n": "Mocambique",
      "c": "Mozambique",
      "p": 40700.5,
      "a": []
    },
    {
      "n": "Moatize",
      "c": "Mozambique",
      "p": 40536.5,
      "a": []
    },
    {
      "n": "Mocimboa",
      "c": "Mozambique",
      "p": 27909,
      "a": []
    },
    {
      "n": "Macia",
      "c": "Mozambique",
      "p": 13095,
      "a": []
    },
    {
      "n": "Marrupa",
      "c": "Mozambique",
      "p": 8762,
      "a": []
    },
    {
      "n": "Nicuadala",
      "c": "Mozambique",
      "p": 6945,
      "a": []
    },
    {
      "n": "Manica",
      "c": "Mozambique",
      "p": 3713.5,
      "a": []
    },
    {
      "n": "Ligonha",
      "c": "Mozambique",
      "p": 3310.5,
      "a": []
    },
    {
      "n": "Quissico",
      "c": "Mozambique",
      "p": 1210,
      "a": []
    },
    {
      "n": "Massangena",
      "c": "Mozambique",
      "p": 634.5,
      "a": []
    },
    {
      "n": "Panda",
      "c": "Mozambique",
      "p": 602,
      "a": []
    },
    {
      "n": "Chiramba",
      "c": "Mozambique",
      "p": 556,
      "a": []
    },
    {
      "n": "Espungabera",
      "c": "Mozambique",
      "p": 393,
      "a": []
    },
    {
      "n": "Mapai",
      "c": "Mozambique",
      "p": 201,
      "a": []
    },
    {
      "n": "Vilanculos",
      "c": "Mozambique",
      "p": 177,
      "a": []
    }
  ],
  "Africa/Lusaka": [
    {
      "n": "Lusaka",
      "c": "Zambia",
      "p": 1297720,
      "a": []
    },
    {
      "n": "Kitwe",
      "c": "Zambia",
      "p": 402907.5,
      "a": []
    },
    {
      "n": "Ndola",
      "c": "Zambia",
      "p": 395428.5,
      "a": []
    },
    {
      "n": "Kabwe",
      "c": "Zambia",
      "p": 188667,
      "a": []
    },
    {
      "n": "Chingola",
      "c": "Zambia",
      "p": 165289.5,
      "a": []
    },
    {
      "n": "Kasama",
      "c": "Zambia",
      "p": 156500,
      "a": []
    },
    {
      "n": "Livingstone",
      "c": "Zambia",
      "p": 137341.5,
      "a": []
    },
    {
      "n": "Mufulira",
      "c": "Zambia",
      "p": 137062,
      "a": []
    },
    {
      "n": "Luanshya",
      "c": "Zambia",
      "p": 132679,
      "a": []
    },
    {
      "n": "Chipata",
      "c": "Zambia",
      "p": 82455,
      "a": []
    },
    {
      "n": "Chililabombwe",
      "c": "Zambia",
      "p": 69698,
      "a": []
    },
    {
      "n": "Mazabuka",
      "c": "Zambia",
      "p": 57874.5,
      "a": []
    },
    {
      "n": "Solwezi",
      "c": "Zambia",
      "p": 51793.5,
      "a": []
    },
    {
      "n": "Mongu",
      "c": "Zambia",
      "p": 45098.5,
      "a": []
    },
    {
      "n": "Choma",
      "c": "Zambia",
      "p": 42324,
      "a": []
    },
    {
      "n": "Mansa",
      "c": "Zambia",
      "p": 31357,
      "a": []
    },
    {
      "n": "Kapiri Mposhi",
      "c": "Zambia",
      "p": 30078,
      "a": []
    },
    {
      "n": "Kafue",
      "c": "Zambia",
      "p": 25725.5,
      "a": []
    },
    {
      "n": "Kawambwa",
      "c": "Zambia",
      "p": 20355,
      "a": []
    },
    {
      "n": "Mbala",
      "c": "Zambia",
      "p": 18384,
      "a": []
    },
    {
      "n": "Mpika",
      "c": "Zambia",
      "p": 17242.5,
      "a": []
    },
    {
      "n": "Nchelenge",
      "c": "Zambia",
      "p": 15904,
      "a": []
    },
    {
      "n": "Mumbwa",
      "c": "Zambia",
      "p": 14408.5,
      "a": []
    },
    {
      "n": "Sesheke",
      "c": "Zambia",
      "p": 10177.5,
      "a": []
    },
    {
      "n": "Senanga",
      "c": "Zambia",
      "p": 10005,
      "a": []
    },
    {
      "n": "Lundazi",
      "c": "Zambia",
      "p": 9540.5,
      "a": []
    },
    {
      "n": "Mwinilunga",
      "c": "Zambia",
      "p": 8336.5,
      "a": []
    },
    {
      "n": "Kalabo",
      "c": "Zambia",
      "p": 7731,
      "a": []
    },
    {
      "n": "Chinsali",
      "c": "Zambia",
      "p": 7482.5,
      "a": []
    },
    {
      "n": "Kaoma",
      "c": "Zambia",
      "p": 7259,
      "a": []
    },
    {
      "n": "Kasempa",
      "c": "Zambia",
      "p": 5622,
      "a": []
    },
    {
      "n": "Zambezi",
      "c": "Zambia",
      "p": 4987.5,
      "a": []
    },
    {
      "n": "Lukulu",
      "c": "Zambia",
      "p": 3349,
      "a": []
    },
    {
      "n": "Luangwa",
      "c": "Mozambique",
      "p": 3065,
      "a": []
    },
    {
      "n": "Nyimba",
      "c": "Zambia",
      "p": 814,
      "a": []
    }
  ],
  "Asia/Rangoon": [
    {
      "n": "Rangoon",
      "c": "Myanmar",
      "p": 3694910,
      "a": []
    },
    {
      "n": "Mandalay",
      "c": "Myanmar",
      "p": 1167000,
      "a": []
    },
    {
      "n": "Naypyidaw",
      "c": "Myanmar",
      "p": 562412,
      "a": []
    },
    {
      "n": "Mawlamyine",
      "c": "Myanmar",
      "p": 400249,
      "a": []
    },
    {
      "n": "Bago",
      "c": "Myanmar",
      "p": 264347,
      "a": []
    },
    {
      "n": "Myeik",
      "c": "Myanmar",
      "p": 220009,
      "a": []
    },
    {
      "n": "Pathein",
      "c": "Myanmar",
      "p": 216014.5,
      "a": []
    },
    {
      "n": "Monywa",
      "c": "Myanmar",
      "p": 204116.5,
      "a": []
    },
    {
      "n": "Sittwe",
      "c": "Myanmar",
      "p": 178387.5,
      "a": []
    },
    {
      "n": "Taunggyi",
      "c": "Myanmar",
      "p": 160115,
      "a": []
    },
    {
      "n": "Hinthada",
      "c": "Myanmar",
      "p": 157837.5,
      "a": []
    },
    {
      "n": "Myingyan",
      "c": "Myanmar",
      "p": 152762.5,
      "a": []
    },
    {
      "n": "Dawei",
      "c": "Myanmar",
      "p": 141497.5,
      "a": []
    },
    {
      "n": "Pakokku",
      "c": "Myanmar",
      "p": 125355.5,
      "a": []
    },
    {
      "n": "Pyay",
      "c": "Myanmar",
      "p": 124833.5,
      "a": []
    },
    {
      "n": "Mudon",
      "c": "Myanmar",
      "p": 120711.5,
      "a": []
    },
    {
      "n": "Myitkyina",
      "c": "Myanmar",
      "p": 114997,
      "a": []
    },
    {
      "n": "Magway",
      "c": "Myanmar",
      "p": 111463.5,
      "a": []
    },
    {
      "n": "Letpadan",
      "c": "Myanmar",
      "p": 107753.5,
      "a": []
    },
    {
      "n": "Taungoo",
      "c": "Myanmar",
      "p": 105590.5,
      "a": []
    },
    {
      "n": "Yaynangyoung",
      "c": "Myanmar",
      "p": 104507.5,
      "a": []
    },
    {
      "n": "Chauk",
      "c": "Myanmar",
      "p": 85016.5,
      "a": []
    },
    {
      "n": "Shwebo",
      "c": "Myanmar",
      "p": 81758.5,
      "a": []
    },
    {
      "n": "Sagaing",
      "c": "Myanmar",
      "p": 78739,
      "a": []
    },
    {
      "n": "Phyarpon",
      "c": "Myanmar",
      "p": 63177,
      "a": []
    },
    {
      "n": "Ye",
      "c": "Myanmar",
      "p": 50798,
      "a": []
    },
    {
      "n": "Pa-an",
      "c": "Myanmar",
      "p": 50000,
      "a": []
    },
    {
      "n": "Namtu",
      "c": "Myanmar",
      "p": 48591,
      "a": []
    },
    {
      "n": "Allanmyo",
      "c": "Myanmar",
      "p": 48446.5,
      "a": []
    },
    {
      "n": "Wakema",
      "c": "Myanmar",
      "p": 45555,
      "a": []
    },
    {
      "n": "Pyu",
      "c": "Myanmar",
      "p": 37652,
      "a": []
    },
    {
      "n": "Yandoon",
      "c": "Myanmar",
      "p": 36172,
      "a": []
    },
    {
      "n": "Thongwa",
      "c": "Myanmar",
      "p": 35992.5,
      "a": []
    },
    {
      "n": "Hakha",
      "c": "Myanmar",
      "p": 20000,
      "a": []
    },
    {
      "n": "Loikaw",
      "c": "Myanmar",
      "p": 17293,
      "a": []
    },
    {
      "n": "Kyaukphyu",
      "c": "Myanmar",
      "p": 4261,
      "a": []
    },
    {
      "n": "Labutta",
      "c": "Myanmar",
      "p": 1667,
      "a": []
    }
  ],
  "Africa/Windhoek": [
    {
      "n": "Windhoek",
      "c": "Namibia",
      "p": 265464,
      "a": []
    },
    {
      "n": "Walvis Bay",
      "c": "Namibia",
      "p": 49504.5,
      "a": []
    },
    {
      "n": "Rundu",
      "c": "Namibia",
      "p": 43485,
      "a": []
    },
    {
      "n": "Swakopmund",
      "c": "Namibia",
      "p": 27269,
      "a": []
    },
    {
      "n": "Rehoboth",
      "c": "Namibia",
      "p": 23298,
      "a": []
    },
    {
      "n": "Otjiwarongo",
      "c": "Namibia",
      "p": 23019.5,
      "a": []
    },
    {
      "n": "Katima Mulilo",
      "c": "Namibia",
      "p": 21748.5,
      "a": []
    },
    {
      "n": "Okahandja",
      "c": "Namibia",
      "p": 19691,
      "a": []
    },
    {
      "n": "Grootfontein",
      "c": "Namibia",
      "p": 19149.5,
      "a": []
    },
    {
      "n": "Ongwediva",
      "c": "Namibia",
      "p": 17343,
      "a": []
    },
    {
      "n": "Keetmanshoop",
      "c": "Namibia",
      "p": 16823.5,
      "a": []
    },
    {
      "n": "Gobabis",
      "c": "Namibia",
      "p": 16321,
      "a": []
    },
    {
      "n": "Lüderitz",
      "c": "Namibia",
      "p": 14216,
      "a": []
    },
    {
      "n": "Tsumeb",
      "c": "Namibia",
      "p": 13574.5,
      "a": []
    },
    {
      "n": "Mariental",
      "c": "Namibia",
      "p": 12670,
      "a": []
    },
    {
      "n": "Omaruru",
      "c": "Namibia",
      "p": 11547,
      "a": []
    },
    {
      "n": "Bethanie",
      "c": "Namibia",
      "p": 8122,
      "a": []
    },
    {
      "n": "Oshikango",
      "c": "Namibia",
      "p": 7540.5,
      "a": []
    },
    {
      "n": "Oranjemund",
      "c": "Namibia",
      "p": 7223,
      "a": []
    },
    {
      "n": "Karibib",
      "c": "Namibia",
      "p": 6898,
      "a": []
    },
    {
      "n": "Outjo",
      "c": "Namibia",
      "p": 6363.5,
      "a": []
    },
    {
      "n": "Usakos",
      "c": "Namibia",
      "p": 5393.5,
      "a": []
    },
    {
      "n": "Karasburg",
      "c": "Namibia",
      "p": 5071.5,
      "a": []
    },
    {
      "n": "Opuwo",
      "c": "Namibia",
      "p": 4857,
      "a": []
    },
    {
      "n": "Otavi",
      "c": "Namibia",
      "p": 4562,
      "a": []
    },
    {
      "n": "Maltahöhe",
      "c": "Namibia",
      "p": 2329,
      "a": []
    }
  ],
  "Asia/Kathmandu": [
    {
      "n": "Kathmandu",
      "c": "Nepal",
      "p": 895000,
      "a": []
    },
    {
      "n": "Pokhara",
      "c": "Nepal",
      "p": 200000,
      "a": []
    },
    {
      "n": "Lalitpur",
      "c": "Nepal",
      "p": 191208.5,
      "a": []
    },
    {
      "n": "Biratnagar",
      "c": "Nepal",
      "p": 182324,
      "a": []
    },
    {
      "n": "Hetauda",
      "c": "Nepal",
      "p": 158554.5,
      "a": []
    },
    {
      "n": "Birganj",
      "c": "Nepal",
      "p": 133238,
      "a": []
    },
    {
      "n": "Dhangarhi",
      "c": "Nepal",
      "p": 92294,
      "a": []
    },
    {
      "n": "Nepalganj",
      "c": "Nepal",
      "p": 64400,
      "a": []
    },
    {
      "n": "Bhairawa",
      "c": "Nepal",
      "p": 63367,
      "a": []
    },
    {
      "n": "Rajbiraj",
      "c": "Nepal",
      "p": 33061,
      "a": []
    },
    {
      "n": "Baglung",
      "c": "Nepal",
      "p": 23296,
      "a": []
    },
    {
      "n": "Dandeldhura",
      "c": "Nepal",
      "p": 19014,
      "a": []
    },
    {
      "n": "Ilam",
      "c": "Nepal",
      "p": 17491,
      "a": []
    },
    {
      "n": "Salyan",
      "c": "Nepal",
      "p": 15000,
      "a": []
    },
    {
      "n": "Ramechhap",
      "c": "Nepal",
      "p": 15000,
      "a": []
    },
    {
      "n": "Bhimphedi",
      "c": "Nepal",
      "p": 15000,
      "a": []
    },
    {
      "n": "Jumla",
      "c": "Nepal",
      "p": 9073,
      "a": []
    }
  ],
  "Europe/Amsterdam": [
    {
      "n": "The Hague",
      "c": "Netherlands",
      "p": 953862.5,
      "a": []
    },
    {
      "n": "Amsterdam",
      "c": "Netherlands",
      "p": 886318,
      "a": [
        "AMS"
      ]
    },
    {
      "n": "Rotterdam",
      "c": "Netherlands",
      "p": 801599.5,
      "a": []
    },
    {
      "n": "Utrecht",
      "c": "Netherlands",
      "p": 478224,
      "a": []
    },
    {
      "n": "Eindhoven",
      "c": "Netherlands",
      "p": 303836.5,
      "a": []
    },
    {
      "n": "Haarlem",
      "c": "Netherlands",
      "p": 248773.5,
      "a": []
    },
    {
      "n": "Groningen",
      "c": "Netherlands",
      "p": 198941,
      "a": []
    },
    {
      "n": "Arnhem",
      "c": "Netherlands",
      "p": 141674,
      "a": []
    },
    {
      "n": "'s-Hertogenbosch",
      "c": "Netherlands",
      "p": 134520,
      "a": []
    },
    {
      "n": "Maastricht",
      "c": "Netherlands",
      "p": 122378,
      "a": []
    },
    {
      "n": "Zwolle",
      "c": "Netherlands",
      "p": 111805,
      "a": []
    },
    {
      "n": "Leeuwarden",
      "c": "Netherlands",
      "p": 108601,
      "a": []
    },
    {
      "n": "Assen",
      "c": "Netherlands",
      "p": 62237,
      "a": []
    },
    {
      "n": "Middelburg",
      "c": "Netherlands",
      "p": 46485,
      "a": []
    }
  ],
  "Pacific/Noumea": [
    {
      "n": "Noumea",
      "c": "New Caledonia",
      "p": 89742.5,
      "a": []
    }
  ],
  "Pacific/Auckland": [
    {
      "n": "Auckland",
      "c": "New Zealand",
      "p": 759510,
      "a": []
    },
    {
      "n": "Manukau",
      "c": "New Zealand",
      "p": 336141.5,
      "a": []
    },
    {
      "n": "Wellington",
      "c": "New Zealand",
      "p": 296300,
      "a": []
    },
    {
      "n": "Christchurch",
      "c": "New Zealand",
      "p": 295351.5,
      "a": []
    },
    {
      "n": "Takapuna",
      "c": "New Zealand",
      "p": 184815.5,
      "a": []
    },
    {
      "n": "Hamilton",
      "c": "New Zealand",
      "p": 112145,
      "a": []
    },
    {
      "n": "Dunedin",
      "c": "New Zealand",
      "p": 92438.5,
      "a": []
    },
    {
      "n": "Tauranga",
      "c": "New Zealand",
      "p": 84730,
      "a": []
    },
    {
      "n": "Waitakere",
      "c": "New Zealand",
      "p": 83400,
      "a": []
    },
    {
      "n": "Palmerston North",
      "c": "New Zealand",
      "p": 66551.5,
      "a": []
    },
    {
      "n": "Napier",
      "c": "New Zealand",
      "p": 56787,
      "a": []
    },
    {
      "n": "Whangarei",
      "c": "New Zealand",
      "p": 53299.5,
      "a": []
    },
    {
      "n": "Rotorua",
      "c": "New Zealand",
      "p": 51497.5,
      "a": []
    },
    {
      "n": "New Plymouth",
      "c": "New Zealand",
      "p": 46289.5,
      "a": []
    },
    {
      "n": "Hastings",
      "c": "New Zealand",
      "p": 39107,
      "a": []
    },
    {
      "n": "Invercargill",
      "c": "New Zealand",
      "p": 37135.5,
      "a": []
    },
    {
      "n": "Nelson",
      "c": "New Zealand",
      "p": 37133,
      "a": []
    },
    {
      "n": "Wanganui",
      "c": "New Zealand",
      "p": 35866.5,
      "a": []
    },
    {
      "n": "Upper Hutt",
      "c": "New Zealand",
      "p": 34591,
      "a": []
    },
    {
      "n": "Gisborne",
      "c": "New Zealand",
      "p": 30857.5,
      "a": []
    },
    {
      "n": "Timaru",
      "c": "New Zealand",
      "p": 23306,
      "a": []
    },
    {
      "n": "Blenheim",
      "c": "New Zealand",
      "p": 23056.5,
      "a": []
    },
    {
      "n": "Whakatane",
      "c": "New Zealand",
      "p": 20665,
      "a": []
    },
    {
      "n": "Levin",
      "c": "New Zealand",
      "p": 18764,
      "a": []
    },
    {
      "n": "Taupo",
      "c": "New Zealand",
      "p": 17480.5,
      "a": []
    },
    {
      "n": "Masterton",
      "c": "New Zealand",
      "p": 16720.5,
      "a": []
    },
    {
      "n": "Greymouth",
      "c": "New Zealand",
      "p": 9419,
      "a": []
    },
    {
      "n": "Ashburton",
      "c": "New Zealand",
      "p": 8895,
      "a": []
    },
    {
      "n": "Kaiapoi",
      "c": "New Zealand",
      "p": 7169,
      "a": []
    },
    {
      "n": "Oamaru",
      "c": "New Zealand",
      "p": 6628,
      "a": []
    },
    {
      "n": "Queenstown",
      "c": "New Zealand",
      "p": 5332,
      "a": []
    },
    {
      "n": "Hokitika",
      "c": "New Zealand",
      "p": 2139,
      "a": []
    },
    {
      "n": "Westport",
      "c": "New Zealand",
      "p": 1899,
      "a": []
    }
  ],
  "America/Managua": [
    {
      "n": "Managua",
      "c": "Nicaragua",
      "p": 920000,
      "a": []
    },
    {
      "n": "Leon",
      "c": "Nicaragua",
      "p": 154489.5,
      "a": []
    },
    {
      "n": "Chinandega",
      "c": "Nicaragua",
      "p": 132705,
      "a": []
    },
    {
      "n": "Masaya",
      "c": "Nicaragua",
      "p": 130113,
      "a": []
    },
    {
      "n": "Matagalpa",
      "c": "Nicaragua",
      "p": 106514.5,
      "a": []
    },
    {
      "n": "Esteli",
      "c": "Nicaragua",
      "p": 102130.5,
      "a": []
    },
    {
      "n": "Granada",
      "c": "Nicaragua",
      "p": 97314,
      "a": []
    },
    {
      "n": "Jinotega",
      "c": "Nicaragua",
      "p": 51073,
      "a": []
    },
    {
      "n": "Bluefields",
      "c": "Nicaragua",
      "p": 40033,
      "a": []
    },
    {
      "n": "Puerto Cabezas",
      "c": "Nicaragua",
      "p": 38318,
      "a": []
    },
    {
      "n": "Juigalpa",
      "c": "Nicaragua",
      "p": 35451,
      "a": []
    },
    {
      "n": "Ocotal",
      "c": "Nicaragua",
      "p": 33928,
      "a": []
    },
    {
      "n": "Rivas",
      "c": "Nicaragua",
      "p": 31117,
      "a": []
    },
    {
      "n": "Jinotepe",
      "c": "Nicaragua",
      "p": 29507,
      "a": []
    },
    {
      "n": "Boaco",
      "c": "Nicaragua",
      "p": 21572,
      "a": []
    },
    {
      "n": "Somoto",
      "c": "Nicaragua",
      "p": 20316,
      "a": []
    },
    {
      "n": "San Carlos",
      "c": "Nicaragua",
      "p": 13451,
      "a": []
    },
    {
      "n": "San Juan de Nicaragua",
      "c": "Nicaragua",
      "p": 863,
      "a": []
    }
  ],
  "Africa/Niamey": [
    {
      "n": "Niamey",
      "c": "Niger",
      "p": 828895.5,
      "a": []
    },
    {
      "n": "Zinder",
      "c": "Niger",
      "p": 210891,
      "a": []
    },
    {
      "n": "Maradi",
      "c": "Niger",
      "p": 198021,
      "a": []
    },
    {
      "n": "Agadez",
      "c": "Niger",
      "p": 103165.5,
      "a": []
    },
    {
      "n": "Tahoua",
      "c": "Niger",
      "p": 98190.5,
      "a": []
    },
    {
      "n": "Arlit",
      "c": "Niger",
      "p": 90000,
      "a": []
    },
    {
      "n": "Birni Nkonni",
      "c": "Niger",
      "p": 56677.5,
      "a": []
    },
    {
      "n": "Dosso",
      "c": "Niger",
      "p": 46481.5,
      "a": []
    },
    {
      "n": "Diffa",
      "c": "Niger",
      "p": 29468,
      "a": []
    },
    {
      "n": "Gaya",
      "c": "Niger",
      "p": 29394.5,
      "a": []
    },
    {
      "n": "Madaoua",
      "c": "Niger",
      "p": 19954,
      "a": []
    },
    {
      "n": "Nguigmi",
      "c": "Niger",
      "p": 15318,
      "a": []
    },
    {
      "n": "Ayorou",
      "c": "Niger",
      "p": 14001,
      "a": []
    },
    {
      "n": "Tillaberi",
      "c": "Niger",
      "p": 13812,
      "a": []
    },
    {
      "n": "Goure",
      "c": "Niger",
      "p": 13291.5,
      "a": []
    },
    {
      "n": "Djado",
      "c": "Niger",
      "p": 10,
      "a": []
    }
  ],
  "Africa/Lagos": [
    {
      "n": "Lagos",
      "c": "Nigeria",
      "p": 4733768,
      "a": []
    },
    {
      "n": "Kano",
      "c": "Nigeria",
      "p": 3140000,
      "a": []
    },
    {
      "n": "Ibadan",
      "c": "Nigeria",
      "p": 2221285,
      "a": []
    },
    {
      "n": "Kaduna",
      "c": "Nigeria",
      "p": 1191296.5,
      "a": []
    },
    {
      "n": "Port Harcourt",
      "c": "Nigeria",
      "p": 1020000,
      "a": []
    },
    {
      "n": "Benin City",
      "c": "Nigeria",
      "p": 929013,
      "a": []
    },
    {
      "n": "Ikare",
      "c": "Nigeria",
      "p": 899965.5,
      "a": []
    },
    {
      "n": "Aba",
      "c": "Nigeria",
      "p": 874385,
      "a": []
    },
    {
      "n": "Abuja",
      "c": "Nigeria",
      "p": 869067.5,
      "a": []
    },
    {
      "n": "Zaria",
      "c": "Nigeria",
      "p": 754836.5,
      "a": []
    },
    {
      "n": "Jos",
      "c": "Nigeria",
      "p": 737068.5,
      "a": []
    },
    {
      "n": "Maiduguri",
      "c": "Nigeria",
      "p": 704230,
      "a": []
    },
    {
      "n": "Ilorin",
      "c": "Nigeria",
      "p": 701742,
      "a": []
    },
    {
      "n": "Enugu",
      "c": "Nigeria",
      "p": 688862,
      "a": []
    },
    {
      "n": "Warri",
      "c": "Nigeria",
      "p": 683064.5,
      "a": []
    },
    {
      "n": "Sokoto",
      "c": "Nigeria",
      "p": 648019.5,
      "a": []
    },
    {
      "n": "Ogbomosho",
      "c": "Nigeria",
      "p": 595063.5,
      "a": []
    },
    {
      "n": "Uyo",
      "c": "Nigeria",
      "p": 495756,
      "a": []
    },
    {
      "n": "Ife",
      "c": "Nigeria",
      "p": 482365,
      "a": []
    },
    {
      "n": "Oyo",
      "c": "Nigeria",
      "p": 475016.5,
      "a": []
    },
    {
      "n": "Ado Ekiti",
      "c": "Nigeria",
      "p": 446749,
      "a": []
    },
    {
      "n": "Abeokuta",
      "c": "Nigeria",
      "p": 441231,
      "a": []
    },
    {
      "n": "Katsina",
      "c": "Nigeria",
      "p": 432149,
      "a": []
    },
    {
      "n": "Akure",
      "c": "Nigeria",
      "p": 420594,
      "a": []
    },
    {
      "n": "Oshogbo",
      "c": "Nigeria",
      "p": 408245,
      "a": []
    },
    {
      "n": "Awka",
      "c": "Nigeria",
      "p": 400828.5,
      "a": []
    },
    {
      "n": "Calabar",
      "c": "Nigeria",
      "p": 354656.5,
      "a": []
    },
    {
      "n": "Umuahia",
      "c": "Nigeria",
      "p": 264662,
      "a": []
    },
    {
      "n": "Gombe",
      "c": "Nigeria",
      "p": 260312,
      "a": []
    },
    {
      "n": "Ondo",
      "c": "Nigeria",
      "p": 256444,
      "a": []
    },
    {
      "n": "Damaturu",
      "c": "Nigeria",
      "p": 255895,
      "a": []
    },
    {
      "n": "Minna",
      "c": "Nigeria",
      "p": 249038,
      "a": []
    },
    {
      "n": "Makurdi",
      "c": "Nigeria",
      "p": 245367.5,
      "a": []
    },
    {
      "n": "Bauchi",
      "c": "Nigeria",
      "p": 244350.5,
      "a": []
    },
    {
      "n": "Sapele",
      "c": "Nigeria",
      "p": 235424,
      "a": []
    },
    {
      "n": "Owerri",
      "c": "Nigeria",
      "p": 215038,
      "a": []
    },
    {
      "n": "Mubi",
      "c": "Nigeria",
      "p": 214710,
      "a": []
    },
    {
      "n": "Iwo",
      "c": "Nigeria",
      "p": 208688.5,
      "a": []
    },
    {
      "n": "Ijebu Ode",
      "c": "Nigeria",
      "p": 204501,
      "a": []
    },
    {
      "n": "Owo",
      "c": "Nigeria",
      "p": 200912,
      "a": []
    },
    {
      "n": "Gusau",
      "c": "Nigeria",
      "p": 185925,
      "a": []
    },
    {
      "n": "Bida",
      "c": "Nigeria",
      "p": 172752.5,
      "a": []
    },
    {
      "n": "Funtua",
      "c": "Nigeria",
      "p": 158643,
      "a": []
    },
    {
      "n": "Nsukka",
      "c": "Nigeria",
      "p": 111017,
      "a": []
    },
    {
      "n": "Jalingo",
      "c": "Nigeria",
      "p": 103773,
      "a": []
    },
    {
      "n": "Birnin Kebbi",
      "c": "Nigeria",
      "p": 102340.5,
      "a": []
    },
    {
      "n": "Iseyin",
      "c": "Nigeria",
      "p": 98071,
      "a": []
    },
    {
      "n": "Yola",
      "c": "Nigeria",
      "p": 92253,
      "a": []
    },
    {
      "n": "Azare",
      "c": "Nigeria",
      "p": 87912.5,
      "a": []
    },
    {
      "n": "Bama",
      "c": "Nigeria",
      "p": 86410,
      "a": []
    },
    {
      "n": "Potiskum",
      "c": "Nigeria",
      "p": 82733.5,
      "a": []
    },
    {
      "n": "Nguru",
      "c": "Nigeria",
      "p": 82481,
      "a": []
    },
    {
      "n": "Lafia",
      "c": "Nigeria",
      "p": 79470.5,
      "a": []
    },
    {
      "n": "Keffi",
      "c": "Nigeria",
      "p": 77056.5,
      "a": []
    },
    {
      "n": "Gashua",
      "c": "Nigeria",
      "p": 74825.5,
      "a": []
    },
    {
      "n": "Wukari",
      "c": "Nigeria",
      "p": 74380.5,
      "a": []
    },
    {
      "n": "Onitsha",
      "c": "Nigeria",
      "p": 73374,
      "a": []
    },
    {
      "n": "Idah",
      "c": "Nigeria",
      "p": 71895,
      "a": []
    },
    {
      "n": "Oturkpo",
      "c": "Nigeria",
      "p": 68220,
      "a": []
    },
    {
      "n": "Biu",
      "c": "Nigeria",
      "p": 64619.5,
      "a": []
    },
    {
      "n": "Kontagora",
      "c": "Nigeria",
      "p": 62144,
      "a": []
    },
    {
      "n": "Lokoja",
      "c": "Nigeria",
      "p": 52650.5,
      "a": []
    },
    {
      "n": "Numan",
      "c": "Nigeria",
      "p": 45173,
      "a": []
    },
    {
      "n": "Opobo",
      "c": "Nigeria",
      "p": 34911,
      "a": []
    },
    {
      "n": "Koko",
      "c": "Nigeria",
      "p": 25792,
      "a": []
    },
    {
      "n": "Kumo",
      "c": "Nigeria",
      "p": 19249,
      "a": []
    },
    {
      "n": "Dutse",
      "c": "Nigeria",
      "p": 17129,
      "a": []
    },
    {
      "n": "Orlu",
      "c": "Nigeria",
      "p": 9351,
      "a": []
    }
  ],
  "Asia/Pyongyang": [
    {
      "n": "Pyongyang",
      "c": "North Korea",
      "p": 2899398.5,
      "a": []
    },
    {
      "n": "Nampo",
      "c": "North Korea",
      "p": 791000,
      "a": []
    },
    {
      "n": "Hamhung",
      "c": "North Korea",
      "p": 595670.5,
      "a": []
    },
    {
      "n": "Hungnam",
      "c": "North Korea",
      "p": 548702,
      "a": []
    },
    {
      "n": "Chongjin",
      "c": "North Korea",
      "p": 499807,
      "a": []
    },
    {
      "n": "Sunchon",
      "c": "North Korea",
      "p": 400629,
      "a": []
    },
    {
      "n": "Wonsan",
      "c": "North Korea",
      "p": 322425,
      "a": []
    },
    {
      "n": "Kaesong",
      "c": "North Korea",
      "p": 305333.5,
      "a": []
    },
    {
      "n": "Kanggye",
      "c": "North Korea",
      "p": 254522,
      "a": []
    },
    {
      "n": "Hyeson",
      "c": "North Korea",
      "p": 227461,
      "a": []
    },
    {
      "n": "Haeju",
      "c": "North Korea",
      "p": 223313.5,
      "a": []
    },
    {
      "n": "Kimchaek",
      "c": "North Korea",
      "p": 187270,
      "a": []
    },
    {
      "n": "Manpo",
      "c": "North Korea",
      "p": 186827,
      "a": []
    },
    {
      "n": "Sinuiju",
      "c": "North Korea",
      "p": 167234,
      "a": []
    },
    {
      "n": "Sariwon",
      "c": "North Korea",
      "p": 154942,
      "a": []
    },
    {
      "n": "Chongju",
      "c": "North Korea",
      "p": 85417,
      "a": []
    },
    {
      "n": "Kilchu",
      "c": "North Korea",
      "p": 82408.5,
      "a": []
    },
    {
      "n": "Munchon",
      "c": "North Korea",
      "p": 73619,
      "a": []
    },
    {
      "n": "Ongjin",
      "c": "North Korea",
      "p": 66721,
      "a": []
    },
    {
      "n": "Pyongsan",
      "c": "North Korea",
      "p": 66260,
      "a": []
    },
    {
      "n": "Musan",
      "c": "North Korea",
      "p": 50942.5,
      "a": []
    },
    {
      "n": "Changyon",
      "c": "North Korea",
      "p": 44176,
      "a": []
    },
    {
      "n": "Sonbong",
      "c": "North Korea",
      "p": 44097.5,
      "a": []
    },
    {
      "n": "Anbyon",
      "c": "North Korea",
      "p": 34993.5,
      "a": []
    },
    {
      "n": "Sin-Ni",
      "c": "North Korea",
      "p": 19463,
      "a": []
    },
    {
      "n": "Chosan",
      "c": "North Korea",
      "p": 7786,
      "a": []
    },
    {
      "n": "Kimhyonggwon",
      "c": "North Korea",
      "p": 3839,
      "a": []
    },
    {
      "n": "Taedong",
      "c": "North Korea",
      "p": 1884,
      "a": []
    }
  ],
  "Asia/Famagusta": [
    {
      "n": "Ammochostos",
      "c": "Northern Cyprus",
      "p": 33016.5,
      "a": []
    },
    {
      "n": "Kyrenia",
      "c": "Northern Cyprus",
      "p": 26701,
      "a": []
    }
  ],
  "Pacific/Saipan": [
    {
      "n": "Capitol Hill",
      "c": "Northern Mariana Islands",
      "p": 1764,
      "a": []
    }
  ],
  "Europe/Oslo": [
    {
      "n": "Oslo",
      "c": "Norway",
      "p": 707500,
      "a": []
    },
    {
      "n": "Bergen",
      "c": "Norway",
      "p": 200389.5,
      "a": []
    },
    {
      "n": "Trondheim",
      "c": "Norway",
      "p": 144336,
      "a": []
    },
    {
      "n": "Stavanger",
      "c": "Norway",
      "p": 136999,
      "a": []
    },
    {
      "n": "Bærum",
      "c": "Norway",
      "p": 113659,
      "a": []
    },
    {
      "n": "Drammen",
      "c": "Norway",
      "p": 85437.5,
      "a": []
    },
    {
      "n": "Skien",
      "c": "Norway",
      "p": 73330,
      "a": []
    },
    {
      "n": "Kristiansand",
      "c": "Norway",
      "p": 58292,
      "a": []
    },
    {
      "n": "Tromsø",
      "c": "Norway",
      "p": 48900.5,
      "a": []
    },
    {
      "n": "Sandnes",
      "c": "Norway",
      "p": 46911,
      "a": []
    },
    {
      "n": "Ålesund",
      "c": "Norway",
      "p": 45377,
      "a": []
    },
    {
      "n": "Tønsberg",
      "c": "Norway",
      "p": 38914,
      "a": []
    },
    {
      "n": "Haugesund",
      "c": "Norway",
      "p": 36219.5,
      "a": []
    },
    {
      "n": "Moss",
      "c": "Norway",
      "p": 35696.5,
      "a": []
    },
    {
      "n": "Bodø",
      "c": "Norway",
      "p": 31383.5,
      "a": []
    },
    {
      "n": "Arendal",
      "c": "Norway",
      "p": 30916,
      "a": []
    },
    {
      "n": "Hamar",
      "c": "Norway",
      "p": 29479,
      "a": []
    },
    {
      "n": "Gjøvik",
      "c": "Norway",
      "p": 20157.5,
      "a": []
    },
    {
      "n": "Lillehammer",
      "c": "Norway",
      "p": 19319,
      "a": []
    },
    {
      "n": "Narvik",
      "c": "Norway",
      "p": 19236.5,
      "a": []
    },
    {
      "n": "Harstad",
      "c": "Norway",
      "p": 19203,
      "a": []
    },
    {
      "n": "Mo i Rana",
      "c": "Norway",
      "p": 19131,
      "a": []
    },
    {
      "n": "Molde",
      "c": "Norway",
      "p": 16171.5,
      "a": []
    },
    {
      "n": "Alta",
      "c": "Norway",
      "p": 12077,
      "a": []
    },
    {
      "n": "Steinkjer",
      "c": "Norway",
      "p": 11193.5,
      "a": []
    },
    {
      "n": "Hammerfest",
      "c": "Norway",
      "p": 9967,
      "a": []
    },
    {
      "n": "Namsos",
      "c": "Norway",
      "p": 9035,
      "a": []
    },
    {
      "n": "Vossavangen",
      "c": "Norway",
      "p": 5571,
      "a": []
    },
    {
      "n": "Vadsø",
      "c": "Norway",
      "p": 5139,
      "a": []
    },
    {
      "n": "Svolvær",
      "c": "Norway",
      "p": 4197,
      "a": []
    },
    {
      "n": "Finnsnes",
      "c": "Norway",
      "p": 3611,
      "a": []
    },
    {
      "n": "Kirkenes",
      "c": "Norway",
      "p": 2728,
      "a": []
    },
    {
      "n": "Rørvik",
      "c": "Norway",
      "p": 2615,
      "a": []
    },
    {
      "n": "Leikanger",
      "c": "Norway",
      "p": 1965,
      "a": []
    }
  ],
  "Asia/Muscat": [
    {
      "n": "Muscat",
      "c": "Oman",
      "p": 660779,
      "a": []
    },
    {
      "n": "As Sib",
      "c": "Oman",
      "p": 237816,
      "a": []
    },
    {
      "n": "Salalah",
      "c": "Oman",
      "p": 183508.5,
      "a": []
    },
    {
      "n": "Suhar",
      "c": "Oman",
      "p": 129811.5,
      "a": []
    },
    {
      "n": "Ibri",
      "c": "Oman",
      "p": 101640,
      "a": []
    },
    {
      "n": "Nizwa",
      "c": "Oman",
      "p": 70429.5,
      "a": []
    },
    {
      "n": "Sur",
      "c": "Oman",
      "p": 68738,
      "a": []
    },
    {
      "n": "Alayat Samail",
      "c": "Oman",
      "p": 32862.5,
      "a": []
    },
    {
      "n": "Dawwah",
      "c": "Oman",
      "p": 1485.5,
      "a": []
    },
    {
      "n": "Mirbat",
      "c": "Oman",
      "p": 1120,
      "a": []
    }
  ],
  "Asia/Karachi": [
    {
      "n": "Karachi",
      "c": "Pakistan",
      "p": 11877109.5,
      "a": []
    },
    {
      "n": "Lahore",
      "c": "Pakistan",
      "p": 6443944,
      "a": []
    },
    {
      "n": "Faisalabad",
      "c": "Pakistan",
      "p": 2561797.5,
      "a": []
    },
    {
      "n": "Saidu",
      "c": "Pakistan",
      "p": 1860310,
      "a": []
    },
    {
      "n": "Rawalpindi",
      "c": "Pakistan",
      "p": 1800550.5,
      "a": []
    },
    {
      "n": "Multan",
      "c": "Pakistan",
      "p": 1479615,
      "a": []
    },
    {
      "n": "Gujranwala",
      "c": "Pakistan",
      "p": 1448735.5,
      "a": []
    },
    {
      "n": "Hyderabad",
      "c": "Pakistan",
      "p": 1422665,
      "a": []
    },
    {
      "n": "Peshawar",
      "c": "Pakistan",
      "p": 1260886.5,
      "a": []
    },
    {
      "n": "Abbottabad",
      "c": "Pakistan",
      "p": 1032323.5,
      "a": []
    },
    {
      "n": "Quetta",
      "c": "Pakistan",
      "p": 750837.5,
      "a": []
    },
    {
      "n": "Islamabad",
      "c": "Pakistan",
      "p": 690800,
      "a": []
    },
    {
      "n": "Bannu",
      "c": "Pakistan",
      "p": 586209.5,
      "a": []
    },
    {
      "n": "Bahawalpur",
      "c": "Pakistan",
      "p": 552607,
      "a": []
    },
    {
      "n": "Sargodha",
      "c": "Pakistan",
      "p": 542603,
      "a": []
    },
    {
      "n": "Sialkote",
      "c": "Pakistan",
      "p": 477396,
      "a": []
    },
    {
      "n": "Sukkur",
      "c": "Pakistan",
      "p": 417767,
      "a": []
    },
    {
      "n": "Larkana",
      "c": "Pakistan",
      "p": 364033,
      "a": []
    },
    {
      "n": "Sheikhu Pura",
      "c": "Pakistan",
      "p": 361303,
      "a": []
    },
    {
      "n": "Rahim Yar Khan",
      "c": "Pakistan",
      "p": 353203,
      "a": []
    },
    {
      "n": "Jhang",
      "c": "Pakistan",
      "p": 341210,
      "a": []
    },
    {
      "n": "Gujrat",
      "c": "Pakistan",
      "p": 301506,
      "a": []
    },
    {
      "n": "Mardan",
      "c": "Pakistan",
      "p": 300424,
      "a": []
    },
    {
      "n": "Kasur",
      "c": "Pakistan",
      "p": 290643,
      "a": []
    },
    {
      "n": "Mirput Khas",
      "c": "Pakistan",
      "p": 286046,
      "a": []
    },
    {
      "n": "Kohat",
      "c": "Pakistan",
      "p": 247227,
      "a": []
    },
    {
      "n": "Dera Ghazi Khan",
      "c": "Pakistan",
      "p": 236093,
      "a": []
    },
    {
      "n": "Sahiwal",
      "c": "Pakistan",
      "p": 235695,
      "a": []
    },
    {
      "n": "Nawabshah",
      "c": "Pakistan",
      "p": 229504,
      "a": []
    },
    {
      "n": "Okara",
      "c": "Pakistan",
      "p": 223648,
      "a": []
    },
    {
      "n": "Chiniot",
      "c": "Pakistan",
      "p": 201781,
      "a": []
    },
    {
      "n": "Sadiqabad",
      "c": "Pakistan",
      "p": 189876,
      "a": []
    },
    {
      "n": "Gilgit",
      "c": "Pakistan",
      "p": 124196.5,
      "a": []
    },
    {
      "n": "Turbat",
      "c": "Pakistan",
      "p": 111742.5,
      "a": []
    },
    {
      "n": "Chaman",
      "c": "Pakistan",
      "p": 88568,
      "a": []
    },
    {
      "n": "Zhob",
      "c": "Pakistan",
      "p": 69446.5,
      "a": []
    },
    {
      "n": "Dera Ismail Khan",
      "c": "Pakistan",
      "p": 66676.5,
      "a": []
    },
    {
      "n": "Mansehra",
      "c": "Pakistan",
      "p": 66486,
      "a": []
    },
    {
      "n": "Parachinar",
      "c": "Pakistan",
      "p": 55685,
      "a": []
    },
    {
      "n": "Gwadar",
      "c": "Pakistan",
      "p": 37632.5,
      "a": []
    },
    {
      "n": "Kundian",
      "c": "Pakistan",
      "p": 35406,
      "a": []
    }
  ],
  "Pacific/Palau": [
    {
      "n": "Koror",
      "c": "Palau",
      "p": 11200,
      "a": []
    },
    {
      "n": "Melekeok",
      "c": "Palau",
      "p": 7026,
      "a": []
    }
  ],
  "Asia/Hebron": [
    {
      "n": "Al Khalil",
      "c": "Palestine",
      "p": 220395.5,
      "a": []
    },
    {
      "n": "Nablus",
      "c": "Palestine",
      "p": 173153.5,
      "a": []
    },
    {
      "n": "Ramallah",
      "c": "Palestine",
      "p": 24599,
      "a": []
    }
  ],
  "Asia/Gaza": [
    {
      "n": "Gaza",
      "c": "Palestine",
      "p": 477460.5,
      "a": []
    }
  ],
  "America/Panama": [
    {
      "n": "Panama City",
      "c": "Panama",
      "p": 844584,
      "a": []
    },
    {
      "n": "Colon",
      "c": "Panama",
      "p": 170488,
      "a": []
    },
    {
      "n": "David",
      "c": "Panama",
      "p": 96448,
      "a": []
    },
    {
      "n": "Balboa",
      "c": "Panama",
      "p": 62882,
      "a": []
    },
    {
      "n": "Santiago",
      "c": "Panama",
      "p": 45655,
      "a": [
        "SCL"
      ]
    },
    {
      "n": "Chitre",
      "c": "Panama",
      "p": 44024,
      "a": []
    },
    {
      "n": "Puerto Armuelles",
      "c": "Panama",
      "p": 22971,
      "a": []
    },
    {
      "n": "Penonome",
      "c": "Panama",
      "p": 20580,
      "a": []
    },
    {
      "n": "Las Tablas",
      "c": "Panama",
      "p": 9964,
      "a": []
    },
    {
      "n": "Almirante",
      "c": "Panama",
      "p": 7442.5,
      "a": []
    },
    {
      "n": "Bocas del Toro",
      "c": "Panama",
      "p": 6484,
      "a": []
    },
    {
      "n": "La Palma",
      "c": "Panama",
      "p": 1845,
      "a": []
    },
    {
      "n": "Jaque",
      "c": "Panama",
      "p": 955,
      "a": []
    },
    {
      "n": "El Porvenir",
      "c": "Panama",
      "p": 10,
      "a": []
    }
  ],
  "Pacific/Port_Moresby": [
    {
      "n": "Port Moresby",
      "c": "Papua New Guinea",
      "p": 267434.5,
      "a": []
    },
    {
      "n": "Lae",
      "c": "Papua New Guinea",
      "p": 103653.5,
      "a": []
    },
    {
      "n": "Mt. Hagen",
      "c": "Papua New Guinea",
      "p": 46343.5,
      "a": []
    },
    {
      "n": "Madang",
      "c": "Papua New Guinea",
      "p": 44721,
      "a": []
    },
    {
      "n": "Goroka",
      "c": "Papua New Guinea",
      "p": 29101,
      "a": []
    },
    {
      "n": "Popondetta",
      "c": "Papua New Guinea",
      "p": 25192,
      "a": []
    },
    {
      "n": "Wewak",
      "c": "Papua New Guinea",
      "p": 21686.5,
      "a": []
    },
    {
      "n": "Mendi",
      "c": "Papua New Guinea",
      "p": 21685.5,
      "a": []
    },
    {
      "n": "Kimbe",
      "c": "Papua New Guinea",
      "p": 18847,
      "a": []
    },
    {
      "n": "Kavieng",
      "c": "Papua New Guinea",
      "p": 17109,
      "a": []
    },
    {
      "n": "Daru",
      "c": "Papua New Guinea",
      "p": 15214,
      "a": []
    },
    {
      "n": "Alotau",
      "c": "Papua New Guinea",
      "p": 11624,
      "a": []
    },
    {
      "n": "Vanimo",
      "c": "Papua New Guinea",
      "p": 11204,
      "a": []
    },
    {
      "n": "Kundiawa",
      "c": "Papua New Guinea",
      "p": 9383,
      "a": []
    },
    {
      "n": "Rabaul",
      "c": "Papua New Guinea",
      "p": 5894,
      "a": []
    },
    {
      "n": "Lorengau",
      "c": "Papua New Guinea",
      "p": 5806,
      "a": []
    },
    {
      "n": "Kerema",
      "c": "Papua New Guinea",
      "p": 5646,
      "a": []
    },
    {
      "n": "Wabag",
      "c": "Papua New Guinea",
      "p": 3958,
      "a": []
    },
    {
      "n": "Hoskins",
      "c": "Papua New Guinea",
      "p": 871,
      "a": []
    },
    {
      "n": "Abau",
      "c": "Papua New Guinea",
      "p": 230,
      "a": []
    }
  ],
  "Pacific/Bougainville": [
    {
      "n": "Arawa",
      "c": "Papua New Guinea",
      "p": 40266,
      "a": []
    },
    {
      "n": "Kieta",
      "c": "Papua New Guinea",
      "p": 5284.5,
      "a": []
    },
    {
      "n": "Sohano",
      "c": "Papua New Guinea",
      "p": 2338,
      "a": []
    }
  ],
  "Asia/Manila": [
    {
      "n": "Manila",
      "c": "Philippines",
      "p": 7088787.5,
      "a": []
    },
    {
      "n": "Quezon City",
      "c": "Philippines",
      "p": 2761720,
      "a": []
    },
    {
      "n": "Davao",
      "c": "Philippines",
      "p": 1307252,
      "a": []
    },
    {
      "n": "Cagayan de Oro",
      "c": "Philippines",
      "p": 861824.5,
      "a": []
    },
    {
      "n": "Cebu",
      "c": "Philippines",
      "p": 806817,
      "a": []
    },
    {
      "n": "General Santos",
      "c": "Philippines",
      "p": 744308,
      "a": []
    },
    {
      "n": "Bacolod",
      "c": "Philippines",
      "p": 730587,
      "a": []
    },
    {
      "n": "Zamboanga",
      "c": "Philippines",
      "p": 615311.5,
      "a": []
    },
    {
      "n": "Iligan",
      "c": "Philippines",
      "p": 464599,
      "a": []
    },
    {
      "n": "Naga",
      "c": "Philippines",
      "p": 458283,
      "a": []
    },
    {
      "n": "Pasay City",
      "c": "Philippines",
      "p": 403064,
      "a": []
    },
    {
      "n": "Iloilo",
      "c": "Philippines",
      "p": 387681,
      "a": []
    },
    {
      "n": "Baguio City",
      "c": "Philippines",
      "p": 360269,
      "a": []
    },
    {
      "n": "Batangas",
      "c": "Philippines",
      "p": 330939,
      "a": []
    },
    {
      "n": "Legazpi",
      "c": "Philippines",
      "p": 320081,
      "a": []
    },
    {
      "n": "Angeles",
      "c": "Philippines",
      "p": 314493,
      "a": []
    },
    {
      "n": "Olongapo",
      "c": "Philippines",
      "p": 265829,
      "a": []
    },
    {
      "n": "Tacloban",
      "c": "Philippines",
      "p": 234548,
      "a": []
    },
    {
      "n": "Cotabato",
      "c": "Philippines",
      "p": 229476,
      "a": []
    },
    {
      "n": "San Pablo",
      "c": "Philippines",
      "p": 224203.5,
      "a": []
    },
    {
      "n": "Cabanatuan",
      "c": "Philippines",
      "p": 220250,
      "a": []
    },
    {
      "n": "Cadiz",
      "c": "Philippines",
      "p": 206105,
      "a": []
    },
    {
      "n": "Butuan",
      "c": "Philippines",
      "p": 190557,
      "a": []
    },
    {
      "n": "Tarlac",
      "c": "Philippines",
      "p": 183930,
      "a": []
    },
    {
      "n": "Dagupan",
      "c": "Philippines",
      "p": 163676,
      "a": []
    },
    {
      "n": "Pagadian",
      "c": "Philippines",
      "p": 159590,
      "a": []
    },
    {
      "n": "Laoag",
      "c": "Philippines",
      "p": 154576.5,
      "a": []
    },
    {
      "n": "Puerto Princesa",
      "c": "Philippines",
      "p": 147882,
      "a": []
    },
    {
      "n": "Ormac",
      "c": "Philippines",
      "p": 129964.5,
      "a": []
    },
    {
      "n": "Tuguegarao",
      "c": "Philippines",
      "p": 115105,
      "a": []
    },
    {
      "n": "Ozamis",
      "c": "Philippines",
      "p": 95444,
      "a": []
    },
    {
      "n": "Roxas",
      "c": "Philippines",
      "p": 91880.5,
      "a": []
    },
    {
      "n": "Surigao",
      "c": "Philippines",
      "p": 64983,
      "a": []
    },
    {
      "n": "Calbayog",
      "c": "Philippines",
      "p": 55015,
      "a": []
    },
    {
      "n": "Vigan",
      "c": "Philippines",
      "p": 48545,
      "a": []
    },
    {
      "n": "Tagum",
      "c": "Philippines",
      "p": 6726,
      "a": []
    },
    {
      "n": "San Carlos",
      "c": "Philippines",
      "p": 6353,
      "a": []
    },
    {
      "n": "Gingoog",
      "c": "Philippines",
      "p": 218,
      "a": []
    }
  ],
  "Europe/Warsaw": [
    {
      "n": "Warsaw",
      "c": "Poland",
      "p": 1704569.5,
      "a": []
    },
    {
      "n": "Katowice",
      "c": "Poland",
      "p": 1527362,
      "a": []
    },
    {
      "n": "Lódz",
      "c": "Poland",
      "p": 758000,
      "a": []
    },
    {
      "n": "Kraków",
      "c": "Poland",
      "p": 755525,
      "a": []
    },
    {
      "n": "Wroclaw",
      "c": "Poland",
      "p": 622471,
      "a": []
    },
    {
      "n": "Gdansk",
      "c": "Poland",
      "p": 597915,
      "a": []
    },
    {
      "n": "Poznan",
      "c": "Poland",
      "p": 597174.5,
      "a": []
    },
    {
      "n": "Bytom",
      "c": "Poland",
      "p": 425716.5,
      "a": []
    },
    {
      "n": "Szczecin",
      "c": "Poland",
      "p": 390241.5,
      "a": []
    },
    {
      "n": "Bydgoszcz",
      "c": "Poland",
      "p": 366222,
      "a": []
    },
    {
      "n": "Lublin",
      "c": "Poland",
      "p": 358001,
      "a": []
    },
    {
      "n": "Gliwice",
      "c": "Poland",
      "p": 353252.5,
      "a": []
    },
    {
      "n": "Bialystok",
      "c": "Poland",
      "p": 288722.5,
      "a": []
    },
    {
      "n": "Gdynia",
      "c": "Poland",
      "p": 284197,
      "a": []
    },
    {
      "n": "Kielce",
      "c": "Poland",
      "p": 212165.5,
      "a": []
    },
    {
      "n": "Rzeszow",
      "c": "Poland",
      "p": 202034,
      "a": []
    },
    {
      "n": "Olsztyn",
      "c": "Poland",
      "p": 179236.5,
      "a": []
    },
    {
      "n": "Opole",
      "c": "Poland",
      "p": 129544,
      "a": []
    },
    {
      "n": "Elblag",
      "c": "Poland",
      "p": 124332,
      "a": []
    },
    {
      "n": "Zielona Gora",
      "c": "Poland",
      "p": 113865.5,
      "a": []
    },
    {
      "n": "Koszalin",
      "c": "Poland",
      "p": 107450,
      "a": []
    },
    {
      "n": "Grudziadz",
      "c": "Poland",
      "p": 100964.5,
      "a": []
    },
    {
      "n": "Inowroclaw",
      "c": "Poland",
      "p": 78302,
      "a": []
    },
    {
      "n": "Elk",
      "c": "Poland",
      "p": 51312.5,
      "a": []
    }
  ],
  "Europe/Lisbon": [
    {
      "n": "Lisbon",
      "c": "Portugal",
      "p": 1664901,
      "a": []
    },
    {
      "n": "Porto",
      "c": "Portugal",
      "p": 793316.5,
      "a": []
    },
    {
      "n": "Braga",
      "c": "Portugal",
      "p": 504326,
      "a": []
    },
    {
      "n": "Setubal",
      "c": "Portugal",
      "p": 117542,
      "a": []
    },
    {
      "n": "Coimbra",
      "c": "Portugal",
      "p": 97856.5,
      "a": []
    },
    {
      "n": "Evora",
      "c": "Portugal",
      "p": 55620,
      "a": []
    },
    {
      "n": "Aveiro",
      "c": "Portugal",
      "p": 54162,
      "a": []
    },
    {
      "n": "Portimao",
      "c": "Portugal",
      "p": 49856.5,
      "a": []
    },
    {
      "n": "Leiria",
      "c": "Portugal",
      "p": 45112,
      "a": []
    },
    {
      "n": "Braganca",
      "c": "Portugal",
      "p": 34375,
      "a": []
    },
    {
      "n": "Castelo Branco",
      "c": "Portugal",
      "p": 33479,
      "a": []
    },
    {
      "n": "Guarda",
      "c": "Portugal",
      "p": 32111,
      "a": []
    },
    {
      "n": "Faro",
      "c": "Portugal",
      "p": 31259,
      "a": []
    },
    {
      "n": "Santarem",
      "c": "Portugal",
      "p": 29385,
      "a": []
    },
    {
      "n": "Beja",
      "c": "Portugal",
      "p": 28756,
      "a": []
    },
    {
      "n": "Viseu",
      "c": "Portugal",
      "p": 26364,
      "a": []
    },
    {
      "n": "Covilha",
      "c": "Portugal",
      "p": 21219,
      "a": []
    },
    {
      "n": "Vila Real",
      "c": "Portugal",
      "p": 17001,
      "a": []
    },
    {
      "n": "Portalegre",
      "c": "Portugal",
      "p": 15581,
      "a": []
    },
    {
      "n": "Viana Do Castelo",
      "c": "Portugal",
      "p": 15555,
      "a": []
    }
  ],
  "Atlantic/Azores": [
    {
      "n": "Ponta Delgada",
      "c": "Portugal",
      "p": 40791,
      "a": []
    },
    {
      "n": "Angra do Heroismo",
      "c": "Portugal",
      "p": 11136.5,
      "a": []
    },
    {
      "n": "Horta",
      "c": "Portugal",
      "p": 6591.5,
      "a": []
    }
  ],
  "Atlantic/Madeira": [
    {
      "n": "Funchal",
      "c": "Portugal",
      "p": 152807,
      "a": []
    }
  ],
  "America/Puerto_Rico": [
    {
      "n": "San Juan",
      "c": "Puerto Rico",
      "p": 1437115.5,
      "a": []
    },
    {
      "n": "Mayaguez",
      "c": "Puerto Rico",
      "p": 184993,
      "a": []
    },
    {
      "n": "Ponce",
      "c": "Puerto Rico",
      "p": 156484,
      "a": []
    },
    {
      "n": "Arecibo",
      "c": "Puerto Rico",
      "p": 59312.5,
      "a": []
    }
  ],
  "Asia/Qatar": [
    {
      "n": "Doha",
      "c": "Qatar",
      "p": 1090655,
      "a": []
    }
  ],
  "Europe/Bucharest": [
    {
      "n": "Bucharest",
      "c": "Romania",
      "p": 1842097,
      "a": []
    },
    {
      "n": "Iasi",
      "c": "Romania",
      "p": 325914,
      "a": []
    },
    {
      "n": "Timisoara",
      "c": "Romania",
      "p": 309575,
      "a": []
    },
    {
      "n": "Galati",
      "c": "Romania",
      "p": 302621.5,
      "a": []
    },
    {
      "n": "Craiova",
      "c": "Romania",
      "p": 301143.5,
      "a": []
    },
    {
      "n": "Cluj-Napoca",
      "c": "Romania",
      "p": 299444.5,
      "a": []
    },
    {
      "n": "Brasov",
      "c": "Romania",
      "p": 293566,
      "a": []
    },
    {
      "n": "Constanta",
      "c": "Romania",
      "p": 285112.5,
      "a": []
    },
    {
      "n": "Ploiesti",
      "c": "Romania",
      "p": 230696.5,
      "a": []
    },
    {
      "n": "Braila",
      "c": "Romania",
      "p": 213569,
      "a": []
    },
    {
      "n": "Oradea",
      "c": "Romania",
      "p": 210222,
      "a": []
    },
    {
      "n": "Bacau",
      "c": "Romania",
      "p": 185532,
      "a": []
    },
    {
      "n": "Pitesti",
      "c": "Romania",
      "p": 169345,
      "a": []
    },
    {
      "n": "Arad",
      "c": "Romania",
      "p": 159338,
      "a": []
    },
    {
      "n": "Sibiu",
      "c": "Romania",
      "p": 153729.5,
      "a": []
    },
    {
      "n": "Tirgu Mures",
      "c": "Romania",
      "p": 148148,
      "a": []
    },
    {
      "n": "Baia Mare",
      "c": "Romania",
      "p": 134630,
      "a": []
    },
    {
      "n": "Buzau",
      "c": "Romania",
      "p": 130826,
      "a": []
    },
    {
      "n": "Botosani",
      "c": "Romania",
      "p": 113359,
      "a": []
    },
    {
      "n": "Satu Mare",
      "c": "Romania",
      "p": 112490,
      "a": []
    },
    {
      "n": "Rimnicu Vilcea",
      "c": "Romania",
      "p": 107558,
      "a": []
    },
    {
      "n": "Drobeta-Turnu Severin",
      "c": "Romania",
      "p": 104462,
      "a": []
    },
    {
      "n": "Piatra-Neamt",
      "c": "Romania",
      "p": 102688,
      "a": []
    },
    {
      "n": "Targu Jiu",
      "c": "Romania",
      "p": 97179,
      "a": []
    },
    {
      "n": "Suceava",
      "c": "Romania",
      "p": 96865.5,
      "a": []
    },
    {
      "n": "Focsani",
      "c": "Romania",
      "p": 92636.5,
      "a": []
    },
    {
      "n": "Tulcea",
      "c": "Romania",
      "p": 89381.5,
      "a": []
    },
    {
      "n": "Targoviste",
      "c": "Romania",
      "p": 88435,
      "a": []
    },
    {
      "n": "Resita",
      "c": "Romania",
      "p": 82276,
      "a": []
    },
    {
      "n": "Bistrita",
      "c": "Romania",
      "p": 81318,
      "a": []
    },
    {
      "n": "Slatina",
      "c": "Romania",
      "p": 78988,
      "a": []
    },
    {
      "n": "Calarasi",
      "c": "Romania",
      "p": 71195.5,
      "a": []
    },
    {
      "n": "Vaslui",
      "c": "Romania",
      "p": 69225,
      "a": []
    },
    {
      "n": "Giurgiu",
      "c": "Romania",
      "p": 69067,
      "a": []
    },
    {
      "n": "Deva",
      "c": "Romania",
      "p": 67802,
      "a": []
    },
    {
      "n": "Alba Lulia",
      "c": "Romania",
      "p": 66085,
      "a": []
    },
    {
      "n": "Zalau",
      "c": "Romania",
      "p": 63232,
      "a": []
    },
    {
      "n": "Sfintu-Gheorghe",
      "c": "Romania",
      "p": 60677,
      "a": []
    },
    {
      "n": "Slobozia",
      "c": "Romania",
      "p": 52693,
      "a": []
    },
    {
      "n": "Alexandria",
      "c": "Romania",
      "p": 49346,
      "a": []
    },
    {
      "n": "Miercurea Cuic",
      "c": "Romania",
      "p": 40004.5,
      "a": []
    }
  ],
  "Europe/Moscow": [
    {
      "n": "Moscow",
      "c": "Russia",
      "p": 10452000,
      "a": []
    },
    {
      "n": "St. Petersburg",
      "c": "Russia",
      "p": 4023106,
      "a": []
    },
    {
      "n": "Nizhny Novgorod",
      "c": "Russia",
      "p": 1246463,
      "a": []
    },
    {
      "n": "Rostov",
      "c": "Russia",
      "p": 1032567,
      "a": []
    },
    {
      "n": "Kazan",
      "c": "Russia",
      "p": 1013635,
      "a": []
    },
    {
      "n": "Krasnodar",
      "c": "Russia",
      "p": 601191.5,
      "a": []
    },
    {
      "n": "Yaroslavl",
      "c": "Russia",
      "p": 571154,
      "a": []
    },
    {
      "n": "Voronezh",
      "c": "Russia",
      "p": 569734.5,
      "a": []
    },
    {
      "n": "Makhachkala",
      "c": "Russia",
      "p": 526470,
      "a": []
    },
    {
      "n": "Ryazan",
      "c": "Russia",
      "p": 502373,
      "a": []
    },
    {
      "n": "Lipetsk",
      "c": "Russia",
      "p": 502144,
      "a": []
    },
    {
      "n": "Tula",
      "c": "Russia",
      "p": 479155.5,
      "a": []
    },
    {
      "n": "Naberezhnyye Chelny",
      "c": "Russia",
      "p": 461086,
      "a": []
    },
    {
      "n": "Cheboksary",
      "c": "Russia",
      "p": 444027.5,
      "a": []
    },
    {
      "n": "Bryansk",
      "c": "Russia",
      "p": 426510,
      "a": []
    },
    {
      "n": "Ivanovo",
      "c": "Russia",
      "p": 417527,
      "a": []
    },
    {
      "n": "Kursk",
      "c": "Russia",
      "p": 398742,
      "a": []
    },
    {
      "n": "Tver",
      "c": "Russia",
      "p": 382043,
      "a": []
    },
    {
      "n": "Stavropol",
      "c": "Russia",
      "p": 350795.5,
      "a": []
    },
    {
      "n": "Vladikavkaz",
      "c": "Russia",
      "p": 341000,
      "a": []
    },
    {
      "n": "Orel",
      "c": "Russia",
      "p": 329376,
      "a": []
    },
    {
      "n": "Belgorod",
      "c": "Russia",
      "p": 328004.5,
      "a": []
    },
    {
      "n": "Sochi",
      "c": "Russia",
      "p": 326639,
      "a": []
    },
    {
      "n": "Vladimir",
      "c": "Russia",
      "p": 314336,
      "a": []
    },
    {
      "n": "Kaluga",
      "c": "Russia",
      "p": 313733.5,
      "a": []
    },
    {
      "n": "Smolensk",
      "c": "Russia",
      "p": 311954.5,
      "a": []
    },
    {
      "n": "Saransk",
      "c": "Russia",
      "p": 303304.5,
      "a": []
    },
    {
      "n": "Yoshkar Ola",
      "c": "Russia",
      "p": 301753,
      "a": []
    },
    {
      "n": "Tambov",
      "c": "Russia",
      "p": 296207.5,
      "a": []
    },
    {
      "n": "Archangel",
      "c": "Russia",
      "p": 295186.5,
      "a": []
    },
    {
      "n": "Naltchik",
      "c": "Russia",
      "p": 290333,
      "a": []
    },
    {
      "n": "Murmansk",
      "c": "Russia",
      "p": 271758,
      "a": []
    },
    {
      "n": "Cherepovets",
      "c": "Russia",
      "p": 265606.5,
      "a": []
    },
    {
      "n": "Kostroma",
      "c": "Russia",
      "p": 256955.5,
      "a": []
    },
    {
      "n": "Taganrog",
      "c": "Russia",
      "p": 254960,
      "a": []
    },
    {
      "n": "Vologda",
      "c": "Russia",
      "p": 251692,
      "a": []
    },
    {
      "n": "Podolsk",
      "c": "Russia",
      "p": 250017.5,
      "a": []
    },
    {
      "n": "Petrozavodsk",
      "c": "Russia",
      "p": 248350.5,
      "a": []
    },
    {
      "n": "Dzerzhinsk",
      "c": "Russia",
      "p": 235457.5,
      "a": []
    },
    {
      "n": "Syktyvkar",
      "c": "Russia",
      "p": 230524.5,
      "a": []
    },
    {
      "n": "Novorossiysk",
      "c": "Russia",
      "p": 229927,
      "a": []
    },
    {
      "n": "Groznyy",
      "c": "Russia",
      "p": 221237.5,
      "a": []
    },
    {
      "n": "Velikiy Novgorod",
      "c": "Russia",
      "p": 218717,
      "a": []
    },
    {
      "n": "Nizhnekamsk",
      "c": "Russia",
      "p": 210363,
      "a": []
    },
    {
      "n": "Shakhty",
      "c": "Russia",
      "p": 206203.5,
      "a": []
    },
    {
      "n": "Rybinsk",
      "c": "Russia",
      "p": 203874.5,
      "a": []
    },
    {
      "n": "Starsy Oskol",
      "c": "Russia",
      "p": 200131,
      "a": []
    },
    {
      "n": "Armavir",
      "c": "Russia",
      "p": 191813.5,
      "a": []
    },
    {
      "n": "Pskov",
      "c": "Russia",
      "p": 189979.5,
      "a": []
    },
    {
      "n": "Severodvinsk",
      "c": "Russia",
      "p": 182077.5,
      "a": []
    },
    {
      "n": "Kolpino",
      "c": "Russia",
      "p": 180938.5,
      "a": []
    },
    {
      "n": "Noginsk",
      "c": "Russia",
      "p": 172855,
      "a": []
    },
    {
      "n": "Novocherkassk",
      "c": "Russia",
      "p": 159470.5,
      "a": []
    },
    {
      "n": "Kovrov",
      "c": "Russia",
      "p": 153060,
      "a": []
    },
    {
      "n": "Maykop",
      "c": "Russia",
      "p": 143377,
      "a": []
    },
    {
      "n": "Nevinnomyssk",
      "c": "Russia",
      "p": 134362.5,
      "a": []
    },
    {
      "n": "Kislovodsk",
      "c": "Russia",
      "p": 132337,
      "a": []
    },
    {
      "n": "Serpukhov",
      "c": "Russia",
      "p": 131871,
      "a": []
    },
    {
      "n": "Kolomna",
      "c": "Russia",
      "p": 130324.5,
      "a": []
    },
    {
      "n": "Orekhovo-Zuevo",
      "c": "Russia",
      "p": 130123.5,
      "a": []
    },
    {
      "n": "Murom",
      "c": "Russia",
      "p": 129109,
      "a": []
    },
    {
      "n": "Arzamas",
      "c": "Russia",
      "p": 126038,
      "a": []
    },
    {
      "n": "Volgodonsk",
      "c": "Russia",
      "p": 122434.5,
      "a": []
    },
    {
      "n": "Almetyevsk",
      "c": "Russia",
      "p": 117971,
      "a": []
    },
    {
      "n": "Yelets",
      "c": "Russia",
      "p": 115803.5,
      "a": []
    },
    {
      "n": "Sergiyev Posad",
      "c": "Russia",
      "p": 107047.5,
      "a": []
    },
    {
      "n": "Bataysk",
      "c": "Russia",
      "p": 106844.5,
      "a": []
    },
    {
      "n": "Cherkessk",
      "c": "Russia",
      "p": 101153,
      "a": []
    },
    {
      "n": "Elista",
      "c": "Russia",
      "p": 99728,
      "a": []
    },
    {
      "n": "Vyborg",
      "c": "Russia",
      "p": 97917,
      "a": []
    },
    {
      "n": "Derbent",
      "c": "Russia",
      "p": 97259,
      "a": []
    },
    {
      "n": "Ukhta",
      "c": "Russia",
      "p": 96396.5,
      "a": []
    },
    {
      "n": "Zheleznogorsk",
      "c": "Russia",
      "p": 94212,
      "a": []
    },
    {
      "n": "Michurinsk",
      "c": "Russia",
      "p": 93364,
      "a": []
    },
    {
      "n": "Nazran",
      "c": "Russia",
      "p": 93357,
      "a": []
    },
    {
      "n": "Velikiye Luki",
      "c": "Russia",
      "p": 93243,
      "a": []
    },
    {
      "n": "Kuznetsk",
      "c": "Russia",
      "p": 93027,
      "a": []
    },
    {
      "n": "Kineshma",
      "c": "Russia",
      "p": 91874,
      "a": []
    },
    {
      "n": "Gatchina",
      "c": "Russia",
      "p": 90123.5,
      "a": []
    },
    {
      "n": "Yegoryevsk",
      "c": "Russia",
      "p": 87497.5,
      "a": []
    },
    {
      "n": "Pyatigorsk",
      "c": "Russia",
      "p": 86245.5,
      "a": []
    },
    {
      "n": "Bugulma",
      "c": "Russia",
      "p": 85384,
      "a": []
    },
    {
      "n": "Novoshakhtinsk",
      "c": "Russia",
      "p": 82769.5,
      "a": []
    },
    {
      "n": "Tuapse",
      "c": "Russia",
      "p": 81689.5,
      "a": []
    },
    {
      "n": "Yeysk",
      "c": "Russia",
      "p": 76591.5,
      "a": []
    },
    {
      "n": "Buynaksk",
      "c": "Russia",
      "p": 75800,
      "a": []
    },
    {
      "n": "Novomoskovsk",
      "c": "Russia",
      "p": 74591.5,
      "a": []
    },
    {
      "n": "Shchekino",
      "c": "Russia",
      "p": 73394,
      "a": []
    },
    {
      "n": "Kandalaksha",
      "c": "Russia",
      "p": 72614.5,
      "a": []
    },
    {
      "n": "Klin",
      "c": "Russia",
      "p": 72221,
      "a": []
    },
    {
      "n": "Vorkuta",
      "c": "Russia",
      "p": 71261.5,
      "a": []
    },
    {
      "n": "Kropotkin",
      "c": "Russia",
      "p": 70518,
      "a": []
    },
    {
      "n": "Kamensk Shakhtinskiy",
      "c": "Russia",
      "p": 69037.5,
      "a": []
    },
    {
      "n": "Obninsk",
      "c": "Russia",
      "p": 66236,
      "a": []
    },
    {
      "n": "Borisoglebsk",
      "c": "Russia",
      "p": 64995,
      "a": []
    },
    {
      "n": "Apatity",
      "c": "Russia",
      "p": 64046.5,
      "a": []
    },
    {
      "n": "Rzhev",
      "c": "Russia",
      "p": 62830,
      "a": []
    },
    {
      "n": "Balakhna",
      "c": "Russia",
      "p": 62487,
      "a": []
    },
    {
      "n": "Tikhoretsk",
      "c": "Russia",
      "p": 62368.5,
      "a": []
    },
    {
      "n": "Kaspiysk",
      "c": "Russia",
      "p": 61451.5,
      "a": []
    }
  ],
  "Asia/Irkutsk": [
    {
      "n": "Irkutsk",
      "c": "Russia",
      "p": 572325,
      "a": []
    },
    {
      "n": "Ulan Ude",
      "c": "Russia",
      "p": 354127,
      "a": []
    },
    {
      "n": "Angarsk",
      "c": "Russia",
      "p": 231719,
      "a": []
    },
    {
      "n": "Bratsk",
      "c": "Russia",
      "p": 133905,
      "a": []
    },
    {
      "n": "Usolye Sibirskoye",
      "c": "Russia",
      "p": 85012,
      "a": []
    },
    {
      "n": "Ust-Ulimsk",
      "c": "Russia",
      "p": 68812,
      "a": []
    },
    {
      "n": "Cheremkhovo",
      "c": "Russia",
      "p": 51686.5,
      "a": []
    },
    {
      "n": "Tulun",
      "c": "Russia",
      "p": 48407,
      "a": []
    },
    {
      "n": "Zima",
      "c": "Russia",
      "p": 46781,
      "a": []
    },
    {
      "n": "Tayshet",
      "c": "Russia",
      "p": 44975,
      "a": []
    },
    {
      "n": "Nizhneudinsk",
      "c": "Russia",
      "p": 41024.5,
      "a": []
    },
    {
      "n": "Zheleznogorsk Ilimskiy",
      "c": "Russia",
      "p": 27291,
      "a": []
    },
    {
      "n": "Severobaykalsk",
      "c": "Russia",
      "p": 25800,
      "a": []
    },
    {
      "n": "Ust Kut",
      "c": "Russia",
      "p": 25388,
      "a": []
    },
    {
      "n": "Gusinoozyorsk",
      "c": "Russia",
      "p": 20498.5,
      "a": []
    },
    {
      "n": "Bodaybo",
      "c": "Russia",
      "p": 15933,
      "a": []
    },
    {
      "n": "Slyudyanka",
      "c": "Russia",
      "p": 14920.5,
      "a": []
    },
    {
      "n": "Ust' Ordynskiy",
      "c": "Russia",
      "p": 14538,
      "a": []
    },
    {
      "n": "Kyakhta",
      "c": "Russia",
      "p": 12368,
      "a": []
    },
    {
      "n": "Taksimo",
      "c": "Russia",
      "p": 10359,
      "a": []
    },
    {
      "n": "Biryusinsk",
      "c": "Russia",
      "p": 8199.5,
      "a": []
    },
    {
      "n": "Kirensk",
      "c": "Russia",
      "p": 6759,
      "a": []
    },
    {
      "n": "Bagdarin",
      "c": "Russia",
      "p": 4676,
      "a": []
    },
    {
      "n": "Novyy Uoyin",
      "c": "Russia",
      "p": 4184,
      "a": []
    },
    {
      "n": "Yerema",
      "c": "Russia",
      "p": 745,
      "a": []
    },
    {
      "n": "Vikhorevka",
      "c": "Russia",
      "p": 166,
      "a": []
    },
    {
      "n": "Ulkan",
      "c": "Russia",
      "p": 10,
      "a": []
    }
  ],
  "Asia/Anadyr": [
    {
      "n": "Anadyr",
      "c": "Russia",
      "p": 10332,
      "a": []
    },
    {
      "n": "Bilibino",
      "c": "Russia",
      "p": 5757,
      "a": []
    },
    {
      "n": "Pevek",
      "c": "Russia",
      "p": 4837,
      "a": []
    },
    {
      "n": "Ugolnye Kopi",
      "c": "Russia",
      "p": 3367,
      "a": []
    },
    {
      "n": "Egvekinot",
      "c": "Russia",
      "p": 2248,
      "a": []
    },
    {
      "n": "Beringovskiy",
      "c": "Russia",
      "p": 1861,
      "a": []
    },
    {
      "n": "Provideniya",
      "c": "Russia",
      "p": 1746.5,
      "a": []
    },
    {
      "n": "Omolon",
      "c": "Russia",
      "p": 1050,
      "a": []
    },
    {
      "n": "Uelen",
      "c": "Russia",
      "p": 776,
      "a": []
    },
    {
      "n": "Lavrentiya",
      "c": "Russia",
      "p": 660,
      "a": []
    },
    {
      "n": "Mys Shmidta",
      "c": "Russia",
      "p": 492,
      "a": []
    },
    {
      "n": "Enurmino",
      "c": "Russia",
      "p": 297,
      "a": []
    },
    {
      "n": "Mukhomornoye",
      "c": "Russia",
      "p": 55,
      "a": []
    },
    {
      "n": "Zvezdnyy",
      "c": "Russia",
      "p": 10,
      "a": []
    }
  ],
  "Asia/Srednekolymsk": [
    {
      "n": "Cherskiy",
      "c": "Russia",
      "p": 3707,
      "a": []
    },
    {
      "n": "Zyryanka",
      "c": "Russia",
      "p": 3627,
      "a": []
    },
    {
      "n": "Srednekolymsk",
      "c": "Russia",
      "p": 3459,
      "a": []
    },
    {
      "n": "Chokurdakh",
      "c": "Russia",
      "p": 2506,
      "a": []
    },
    {
      "n": "Severo Kurilsk",
      "c": "Russia",
      "p": 2422,
      "a": []
    },
    {
      "n": "Mikhalkino",
      "c": "Russia",
      "p": 570,
      "a": []
    },
    {
      "n": "Logashkino",
      "c": "Russia",
      "p": 0,
      "a": []
    },
    {
      "n": "Ambarchik",
      "c": "Russia",
      "p": 0,
      "a": []
    }
  ],
  "Europe/Kaliningrad": [
    {
      "n": "Kaliningrad",
      "c": "Russia",
      "p": 403226.5,
      "a": []
    },
    {
      "n": "Chernyakhovsk",
      "c": "Russia",
      "p": 42356.5,
      "a": []
    },
    {
      "n": "Sovetsk",
      "c": "Russia",
      "p": 40166.5,
      "a": []
    }
  ],
  "Europe/Volgograd": [
    {
      "n": "Volgograd",
      "c": "Russia",
      "p": 801827.5,
      "a": []
    },
    {
      "n": "Volzhskiy",
      "c": "Russia",
      "p": 306022.5,
      "a": []
    },
    {
      "n": "Kamyshin",
      "c": "Russia",
      "p": 82613,
      "a": []
    },
    {
      "n": "Mikhaylovka",
      "c": "Russia",
      "p": 57327.5,
      "a": []
    },
    {
      "n": "Frolovo",
      "c": "Russia",
      "p": 40096.5,
      "a": []
    },
    {
      "n": "Uryupinsk",
      "c": "Russia",
      "p": 37993.5,
      "a": []
    },
    {
      "n": "Pallasovka",
      "c": "Russia",
      "p": 9960.5,
      "a": []
    },
    {
      "n": "Nikolayevsk",
      "c": "Russia",
      "p": 9803.5,
      "a": []
    }
  ],
  "Asia/Yekaterinburg": [
    {
      "n": "Yekaterinburg",
      "c": "Russia",
      "p": 1270488,
      "a": []
    },
    {
      "n": "Chelyabinsk",
      "c": "Russia",
      "p": 1018802,
      "a": []
    },
    {
      "n": "Ufa",
      "c": "Russia",
      "p": 969378,
      "a": []
    },
    {
      "n": "Orenburg",
      "c": "Russia",
      "p": 530820.5,
      "a": []
    },
    {
      "n": "Tyumen",
      "c": "Russia",
      "p": 460952,
      "a": []
    },
    {
      "n": "Nizhny Tagil",
      "c": "Russia",
      "p": 374343.5,
      "a": []
    },
    {
      "n": "Surgut",
      "c": "Russia",
      "p": 353351.5,
      "a": []
    },
    {
      "n": "Kurgan",
      "c": "Russia",
      "p": 329399.5,
      "a": []
    },
    {
      "n": "Magnitogorsk",
      "c": "Russia",
      "p": 308724.5,
      "a": []
    },
    {
      "n": "Sterlitamak",
      "c": "Russia",
      "p": 220040,
      "a": []
    },
    {
      "n": "Kamensk Uralskiy",
      "c": "Russia",
      "p": 176598.5,
      "a": []
    },
    {
      "n": "Zlatoust",
      "c": "Russia",
      "p": 176285,
      "a": []
    },
    {
      "n": "Nakhodka",
      "c": "Russia",
      "p": 159551,
      "a": []
    },
    {
      "n": "Orsk",
      "c": "Russia",
      "p": 159353,
      "a": []
    },
    {
      "n": "Berezniki",
      "c": "Russia",
      "p": 153305,
      "a": []
    },
    {
      "n": "Miass",
      "c": "Russia",
      "p": 148834.5,
      "a": []
    },
    {
      "n": "Nizhenvartovsk",
      "c": "Russia",
      "p": 136385,
      "a": []
    },
    {
      "n": "Pervouralsk",
      "c": "Russia",
      "p": 127236,
      "a": []
    },
    {
      "n": "Neftekamsk",
      "c": "Russia",
      "p": 122170,
      "a": []
    },
    {
      "n": "Nefteyugansk",
      "c": "Russia",
      "p": 112632,
      "a": []
    },
    {
      "n": "Salavat",
      "c": "Russia",
      "p": 111648,
      "a": []
    },
    {
      "n": "Noyabrsk",
      "c": "Russia",
      "p": 110572,
      "a": []
    },
    {
      "n": "Solikamsk",
      "c": "Russia",
      "p": 97397,
      "a": []
    },
    {
      "n": "Serov",
      "c": "Russia",
      "p": 91831,
      "a": []
    },
    {
      "n": "Novotroitsk",
      "c": "Russia",
      "p": 90278.5,
      "a": []
    },
    {
      "n": "Tobolsk",
      "c": "Russia",
      "p": 87877.5,
      "a": []
    },
    {
      "n": "Oktyabrskiy",
      "c": "Russia",
      "p": 87793,
      "a": []
    },
    {
      "n": "Buzuluk",
      "c": "Russia",
      "p": 84762,
      "a": []
    },
    {
      "n": "Asbest",
      "c": "Russia",
      "p": 77915.5,
      "a": []
    },
    {
      "n": "Troitsk",
      "c": "Russia",
      "p": 69919,
      "a": []
    },
    {
      "n": "Shadrinsk",
      "c": "Russia",
      "p": 67303.5,
      "a": []
    },
    {
      "n": "Krasnoturinsk",
      "c": "Russia",
      "p": 64878,
      "a": []
    },
    {
      "n": "Tuymazy",
      "c": "Russia",
      "p": 61826,
      "a": []
    },
    {
      "n": "Chusovoy",
      "c": "Russia",
      "p": 61159,
      "a": []
    },
    {
      "n": "Ishim",
      "c": "Russia",
      "p": 60798,
      "a": []
    },
    {
      "n": "Kungur",
      "c": "Russia",
      "p": 59911.5,
      "a": []
    },
    {
      "n": "Kogalym",
      "c": "Russia",
      "p": 58192,
      "a": []
    },
    {
      "n": "Belebey",
      "c": "Russia",
      "p": 57674.5,
      "a": []
    },
    {
      "n": "Nizhnyaya Tura",
      "c": "Russia",
      "p": 56084,
      "a": []
    },
    {
      "n": "Sibay",
      "c": "Russia",
      "p": 54696,
      "a": []
    },
    {
      "n": "Buguruslan",
      "c": "Russia",
      "p": 51877,
      "a": []
    },
    {
      "n": "Krasnokamsk",
      "c": "Russia",
      "p": 50382,
      "a": []
    },
    {
      "n": "Kumertau",
      "c": "Russia",
      "p": 48667.5,
      "a": []
    },
    {
      "n": "Verkhnyaya Salda",
      "c": "Russia",
      "p": 48525,
      "a": []
    },
    {
      "n": "Yamburg",
      "c": "Russia",
      "p": 48488,
      "a": []
    },
    {
      "n": "Khanty Mansiysk",
      "c": "Russia",
      "p": 48114,
      "a": []
    },
    {
      "n": "Megion",
      "c": "Russia",
      "p": 47650.5,
      "a": []
    },
    {
      "n": "Novy Urengoy",
      "c": "Russia",
      "p": 47357.5,
      "a": []
    },
    {
      "n": "Kyshtym",
      "c": "Russia",
      "p": 46268,
      "a": []
    },
    {
      "n": "Nyagan",
      "c": "Russia",
      "p": 46238.5,
      "a": []
    },
    {
      "n": "Alapayevsk",
      "c": "Russia",
      "p": 43663.5,
      "a": []
    },
    {
      "n": "Polevskoy",
      "c": "Russia",
      "p": 42706,
      "a": []
    },
    {
      "n": "Krasnoufimsk",
      "c": "Russia",
      "p": 40208.5,
      "a": []
    },
    {
      "n": "Gay",
      "c": "Russia",
      "p": 39710,
      "a": []
    },
    {
      "n": "Artemovskiy",
      "c": "Russia",
      "p": 39194.5,
      "a": []
    },
    {
      "n": "Asha",
      "c": "Russia",
      "p": 35944.5,
      "a": []
    },
    {
      "n": "Yemanzhelinsk",
      "c": "Russia",
      "p": 35936,
      "a": []
    },
    {
      "n": "Severouralsk",
      "c": "Russia",
      "p": 34819,
      "a": []
    },
    {
      "n": "Birsk",
      "c": "Russia",
      "p": 33903,
      "a": []
    },
    {
      "n": "Verkhniy Ufaley",
      "c": "Russia",
      "p": 33562,
      "a": []
    },
    {
      "n": "Salekhard",
      "c": "Russia",
      "p": 32427,
      "a": []
    },
    {
      "n": "Tavda",
      "c": "Russia",
      "p": 32401,
      "a": []
    },
    {
      "n": "Kudymkar",
      "c": "Russia",
      "p": 32009.5,
      "a": []
    },
    {
      "n": "Yalutorovsk",
      "c": "Russia",
      "p": 31580,
      "a": []
    },
    {
      "n": "Karpinsk",
      "c": "Russia",
      "p": 30438.5,
      "a": []
    },
    {
      "n": "Mednogorsk",
      "c": "Russia",
      "p": 27274,
      "a": []
    },
    {
      "n": "Kartaly",
      "c": "Russia",
      "p": 27107,
      "a": []
    },
    {
      "n": "Nevyansk",
      "c": "Russia",
      "p": 27035,
      "a": []
    },
    {
      "n": "Nadym",
      "c": "Russia",
      "p": 26723,
      "a": []
    },
    {
      "n": "Sol-lletsk",
      "c": "Russia",
      "p": 25155,
      "a": []
    },
    {
      "n": "Bakal",
      "c": "Russia",
      "p": 24160.5,
      "a": []
    },
    {
      "n": "Kizel",
      "c": "Russia",
      "p": 21971,
      "a": []
    },
    {
      "n": "Krasnouralsk",
      "c": "Russia",
      "p": 20571,
      "a": []
    },
    {
      "n": "Uray",
      "c": "Russia",
      "p": 20361,
      "a": []
    },
    {
      "n": "Gubakha",
      "c": "Russia",
      "p": 18716.5,
      "a": []
    },
    {
      "n": "Plast",
      "c": "Russia",
      "p": 15480.5,
      "a": []
    },
    {
      "n": "Rayevskiy",
      "c": "Russia",
      "p": 13578.5,
      "a": []
    },
    {
      "n": "Ivdel",
      "c": "Russia",
      "p": 11466.5,
      "a": []
    },
    {
      "n": "Kurtamysh",
      "c": "Russia",
      "p": 10006,
      "a": []
    },
    {
      "n": "Igrim",
      "c": "Russia",
      "p": 9545,
      "a": []
    },
    {
      "n": "Golyshmanovo",
      "c": "Russia",
      "p": 8708.5,
      "a": []
    },
    {
      "n": "Tazovskiy",
      "c": "Russia",
      "p": 5981,
      "a": []
    },
    {
      "n": "Dombarovskiy",
      "c": "Russia",
      "p": 5564,
      "a": []
    },
    {
      "n": "Saranpaul",
      "c": "Russia",
      "p": 2985,
      "a": []
    },
    {
      "n": "Novy Port",
      "c": "Russia",
      "p": 1790,
      "a": []
    },
    {
      "n": "Peregrebnoye",
      "c": "Russia",
      "p": 10,
      "a": []
    },
    {
      "n": "Laryak",
      "c": "Russia",
      "p": 10,
      "a": []
    },
    {
      "n": "Gyda",
      "c": "Russia",
      "p": 10,
      "a": []
    },
    {
      "n": "Numto",
      "c": "Russia",
      "p": 10,
      "a": []
    }
  ],
  "Europe/Kirov": [
    {
      "n": "Kirov",
      "c": "Russia",
      "p": 457410,
      "a": []
    },
    {
      "n": "Kirovo-Chepetsk",
      "c": "Russia",
      "p": 71555.5,
      "a": []
    },
    {
      "n": "Slobodskoy",
      "c": "Russia",
      "p": 40661.5,
      "a": []
    },
    {
      "n": "Omutninsk",
      "c": "Russia",
      "p": 29082,
      "a": []
    },
    {
      "n": "Kotelnich",
      "c": "Russia",
      "p": 28015.5,
      "a": []
    },
    {
      "n": "Sovetsk",
      "c": "Russia",
      "p": 10020.5,
      "a": []
    },
    {
      "n": "Kirs",
      "c": "Russia",
      "p": 8319,
      "a": []
    }
  ],
  "Europe/Samara": [
    {
      "n": "Samara",
      "c": "Russia",
      "p": 996595,
      "a": []
    },
    {
      "n": "Tolyatti",
      "c": "Russia",
      "p": 648622,
      "a": []
    },
    {
      "n": "Izhevsk",
      "c": "Russia",
      "p": 611230,
      "a": []
    },
    {
      "n": "Syzran",
      "c": "Russia",
      "p": 171589,
      "a": []
    },
    {
      "n": "Novokuybishevsk",
      "c": "Russia",
      "p": 132067,
      "a": []
    },
    {
      "n": "Glazov",
      "c": "Russia",
      "p": 93352,
      "a": []
    },
    {
      "n": "Sarapul",
      "c": "Russia",
      "p": 92622.5,
      "a": []
    },
    {
      "n": "Votkinsk",
      "c": "Russia",
      "p": 91248,
      "a": []
    },
    {
      "n": "Chapayevsk",
      "c": "Russia",
      "p": 88655.5,
      "a": []
    },
    {
      "n": "Otradnyy",
      "c": "Russia",
      "p": 46400,
      "a": []
    },
    {
      "n": "Mozhga",
      "c": "Russia",
      "p": 43098,
      "a": []
    }
  ],
  "Asia/Novokuznetsk": [
    {
      "n": "Novokuznetsk",
      "c": "Russia",
      "p": 530325.5,
      "a": []
    },
    {
      "n": "Kemerovo",
      "c": "Russia",
      "p": 470684.5,
      "a": []
    },
    {
      "n": "Prokopyevsk",
      "c": "Russia",
      "p": 242547,
      "a": []
    },
    {
      "n": "Leninsk Kuznetsky",
      "c": "Russia",
      "p": 108047.5,
      "a": []
    },
    {
      "n": "Kiselevsk",
      "c": "Russia",
      "p": 87164,
      "a": []
    },
    {
      "n": "Anzhero Sudzhensk",
      "c": "Russia",
      "p": 83109,
      "a": []
    },
    {
      "n": "Yurga",
      "c": "Russia",
      "p": 72495.5,
      "a": []
    },
    {
      "n": "Mariinsk",
      "c": "Russia",
      "p": 41344.5,
      "a": []
    },
    {
      "n": "Guryevsk",
      "c": "Russia",
      "p": 31878.5,
      "a": []
    },
    {
      "n": "Topki",
      "c": "Russia",
      "p": 24672,
      "a": []
    },
    {
      "n": "Tashtagol",
      "c": "Russia",
      "p": 21902,
      "a": []
    },
    {
      "n": "Mundybash",
      "c": "Russia",
      "p": 5870,
      "a": []
    }
  ],
  "Asia/Krasnoyarsk": [
    {
      "n": "Krasnoyarsk",
      "c": "Russia",
      "p": 613605,
      "a": []
    },
    {
      "n": "Noginsk",
      "c": "Russia",
      "p": 229731,
      "a": []
    },
    {
      "n": "Abakan",
      "c": "Russia",
      "p": 161377,
      "a": []
    },
    {
      "n": "Norilsk",
      "c": "Russia",
      "p": 153336.5,
      "a": []
    },
    {
      "n": "Achinsk",
      "c": "Russia",
      "p": 112541.5,
      "a": []
    },
    {
      "n": "Kyzyl",
      "c": "Russia",
      "p": 106310.5,
      "a": []
    },
    {
      "n": "Kansk",
      "c": "Russia",
      "p": 94420.5,
      "a": []
    },
    {
      "n": "Lesosibirsk",
      "c": "Russia",
      "p": 65629,
      "a": []
    },
    {
      "n": "Sayanogorsk",
      "c": "Russia",
      "p": 52790.5,
      "a": []
    },
    {
      "n": "Chernogorsk",
      "c": "Russia",
      "p": 39815.5,
      "a": []
    },
    {
      "n": "Boyarka",
      "c": "Russia",
      "p": 35968,
      "a": []
    },
    {
      "n": "Zaozernyy",
      "c": "Russia",
      "p": 33865,
      "a": []
    },
    {
      "n": "Dudinka",
      "c": "Russia",
      "p": 22913,
      "a": []
    },
    {
      "n": "Bogotol",
      "c": "Russia",
      "p": 22559.5,
      "a": []
    },
    {
      "n": "Abaza",
      "c": "Russia",
      "p": 17638.5,
      "a": []
    },
    {
      "n": "Uzhur",
      "c": "Russia",
      "p": 17424.5,
      "a": []
    },
    {
      "n": "Kodinskiy",
      "c": "Russia",
      "p": 15670,
      "a": []
    },
    {
      "n": "Yeniseysk",
      "c": "Russia",
      "p": 15407.5,
      "a": []
    },
    {
      "n": "Uyar",
      "c": "Russia",
      "p": 12370,
      "a": []
    },
    {
      "n": "Igarka",
      "c": "Russia",
      "p": 6262,
      "a": []
    },
    {
      "n": "Tura",
      "c": "Russia",
      "p": 5444,
      "a": []
    },
    {
      "n": "Artemovsk",
      "c": "Russia",
      "p": 4948,
      "a": []
    },
    {
      "n": "Shira",
      "c": "Russia",
      "p": 4836,
      "a": []
    },
    {
      "n": "Turukhansk",
      "c": "Russia",
      "p": 4774,
      "a": []
    },
    {
      "n": "Teli",
      "c": "Russia",
      "p": 3732,
      "a": []
    },
    {
      "n": "Khatanga",
      "c": "Russia",
      "p": 3205,
      "a": []
    },
    {
      "n": "Dickson",
      "c": "Russia",
      "p": 1113,
      "a": []
    },
    {
      "n": "Chelyuskin",
      "c": "Russia",
      "p": 885,
      "a": []
    },
    {
      "n": "Vorontsovo",
      "c": "Russia",
      "p": 100,
      "a": []
    },
    {
      "n": "Yessey",
      "c": "Russia",
      "p": 10,
      "a": []
    },
    {
      "n": "Podkamennaya",
      "c": "Russia",
      "p": 10,
      "a": []
    },
    {
      "n": "Agapa",
      "c": "Russia",
      "p": 10,
      "a": []
    },
    {
      "n": "Komsa",
      "c": "Russia",
      "p": 10,
      "a": []
    },
    {
      "n": "Starorybnoye",
      "c": "Russia",
      "p": 10,
      "a": []
    },
    {
      "n": "Mikhaylova",
      "c": "Russia",
      "p": 10,
      "a": []
    },
    {
      "n": "Nordvik",
      "c": "Russia",
      "p": 0,
      "a": []
    }
  ],
  "Asia/Novosibirsk": [
    {
      "n": "Novosibirsk",
      "c": "Russia",
      "p": 1213100.5,
      "a": []
    },
    {
      "n": "Iskitim",
      "c": "Russia",
      "p": 60806.5,
      "a": []
    },
    {
      "n": "Ob",
      "c": "Russia",
      "p": 32093.5,
      "a": []
    },
    {
      "n": "Barabinsk",
      "c": "Russia",
      "p": 29888.5,
      "a": []
    },
    {
      "n": "Karasuk",
      "c": "Russia",
      "p": 26758.5,
      "a": []
    },
    {
      "n": "Tatarsk",
      "c": "Russia",
      "p": 24182,
      "a": []
    },
    {
      "n": "Toguchin",
      "c": "Russia",
      "p": 20087,
      "a": []
    },
    {
      "n": "Cherepanovo",
      "c": "Russia",
      "p": 15094.5,
      "a": []
    },
    {
      "n": "Kupina",
      "c": "Russia",
      "p": 9856.5,
      "a": []
    },
    {
      "n": "Kargat",
      "c": "Russia",
      "p": 5861,
      "a": []
    }
  ],
  "Asia/Chita": [
    {
      "n": "Chita",
      "c": "Russia",
      "p": 293153.5,
      "a": []
    },
    {
      "n": "Krasnokamensk",
      "c": "Russia",
      "p": 52308,
      "a": []
    },
    {
      "n": "Borzya",
      "c": "Russia",
      "p": 29653,
      "a": []
    },
    {
      "n": "Petrovsk Zabaykalskiy",
      "c": "Russia",
      "p": 20301,
      "a": []
    },
    {
      "n": "Nerchinsk",
      "c": "Russia",
      "p": 11979.5,
      "a": []
    },
    {
      "n": "Aginskoye",
      "c": "Russia",
      "p": 11491,
      "a": []
    },
    {
      "n": "Mogocha",
      "c": "Russia",
      "p": 10636.5,
      "a": []
    },
    {
      "n": "Shilka",
      "c": "Russia",
      "p": 10561,
      "a": []
    },
    {
      "n": "Khilok",
      "c": "Russia",
      "p": 6540.5,
      "a": []
    },
    {
      "n": "Olovyannaya",
      "c": "Russia",
      "p": 5281.5,
      "a": []
    },
    {
      "n": "Bukachacha",
      "c": "Russia",
      "p": 1934.5,
      "a": []
    },
    {
      "n": "Sherlovaya Gora",
      "c": "Russia",
      "p": 411,
      "a": []
    }
  ],
  "Asia/Vladivostok": [
    {
      "n": "Vladivostok",
      "c": "Russia",
      "p": 586617,
      "a": []
    },
    {
      "n": "Khabarovsk",
      "c": "Russia",
      "p": 562705.5,
      "a": []
    },
    {
      "n": "Komsomolsk na Amure",
      "c": "Russia",
      "p": 264374,
      "a": []
    },
    {
      "n": "Nakhodka",
      "c": "Russia",
      "p": 153235.5,
      "a": []
    },
    {
      "n": "Ussuriysk",
      "c": "Russia",
      "p": 140673.5,
      "a": []
    },
    {
      "n": "Birobidzhan",
      "c": "Russia",
      "p": 75022.5,
      "a": []
    },
    {
      "n": "Arsenyev",
      "c": "Russia",
      "p": 56721,
      "a": []
    },
    {
      "n": "Amursk",
      "c": "Russia",
      "p": 45901.5,
      "a": []
    },
    {
      "n": "Spassk Dalniy",
      "c": "Russia",
      "p": 44861,
      "a": []
    },
    {
      "n": "Partizansk",
      "c": "Russia",
      "p": 40734.5,
      "a": []
    },
    {
      "n": "Lesozavodsk",
      "c": "Russia",
      "p": 39241.5,
      "a": []
    },
    {
      "n": "Savetskaya Gavan",
      "c": "Russia",
      "p": 27882,
      "a": []
    },
    {
      "n": "Nikolayevsk na Amure",
      "c": "Russia",
      "p": 27113,
      "a": []
    },
    {
      "n": "Dalnerechensk",
      "c": "Russia",
      "p": 25917.5,
      "a": []
    },
    {
      "n": "Bikin",
      "c": "Russia",
      "p": 19264.5,
      "a": []
    },
    {
      "n": "Kavalerovo",
      "c": "Russia",
      "p": 17801,
      "a": []
    },
    {
      "n": "Vanino",
      "c": "Russia",
      "p": 15985.5,
      "a": []
    },
    {
      "n": "Vyazemskiy",
      "c": "Russia",
      "p": 14191,
      "a": []
    },
    {
      "n": "Obluchye",
      "c": "Russia",
      "p": 9689.5,
      "a": []
    },
    {
      "n": "Dalnegorsk",
      "c": "Russia",
      "p": 8123,
      "a": []
    },
    {
      "n": "Chegdomyn",
      "c": "Russia",
      "p": 7485.5,
      "a": []
    },
    {
      "n": "Okhotsk",
      "c": "Russia",
      "p": 5570,
      "a": []
    },
    {
      "n": "Batagay",
      "c": "Russia",
      "p": 4266,
      "a": []
    },
    {
      "n": "De Kastri",
      "c": "Russia",
      "p": 3615,
      "a": []
    },
    {
      "n": "Ust Kuyga",
      "c": "Russia",
      "p": 1517,
      "a": []
    },
    {
      "n": "Verkhoyansk",
      "c": "Russia",
      "p": 1388,
      "a": []
    },
    {
      "n": "Chumikan",
      "c": "Russia",
      "p": 1305,
      "a": []
    },
    {
      "n": "Ayan",
      "c": "Russia",
      "p": 1286,
      "a": []
    },
    {
      "n": "Nizhneyansk",
      "c": "Russia",
      "p": 395.5,
      "a": []
    },
    {
      "n": "Zemlya Bunge",
      "c": "Russia",
      "p": 10,
      "a": []
    },
    {
      "n": "Shalaurova",
      "c": "Russia",
      "p": 10,
      "a": []
    },
    {
      "n": "Tukchi",
      "c": "Russia",
      "p": 10,
      "a": []
    },
    {
      "n": "Khakhar",
      "c": "Russia",
      "p": 10,
      "a": []
    },
    {
      "n": "Kavache",
      "c": "Russia",
      "p": -99,
      "a": []
    }
  ],
  "Asia/Yakutsk": [
    {
      "n": "Yakutsk",
      "c": "Russia",
      "p": 220813,
      "a": []
    },
    {
      "n": "Blagoveshchensk",
      "c": "Russia",
      "p": 206711,
      "a": []
    },
    {
      "n": "Belogorsk",
      "c": "Russia",
      "p": 69057,
      "a": []
    },
    {
      "n": "Svobodnyy",
      "c": "Russia",
      "p": 62318.5,
      "a": []
    },
    {
      "n": "Neryungri",
      "c": "Russia",
      "p": 33364,
      "a": []
    },
    {
      "n": "Tynda",
      "c": "Russia",
      "p": 33187,
      "a": []
    },
    {
      "n": "Mirnyy",
      "c": "Russia",
      "p": 30535.5,
      "a": []
    },
    {
      "n": "Zeya",
      "c": "Russia",
      "p": 26999,
      "a": []
    },
    {
      "n": "Lensk",
      "c": "Russia",
      "p": 24641.5,
      "a": []
    },
    {
      "n": "Aldan",
      "c": "Russia",
      "p": 18571.5,
      "a": []
    },
    {
      "n": "Shimanovsk",
      "c": "Russia",
      "p": 16574.5,
      "a": []
    },
    {
      "n": "Udachnyy",
      "c": "Russia",
      "p": 15266,
      "a": []
    },
    {
      "n": "Olyokminsk",
      "c": "Russia",
      "p": 9743.5,
      "a": []
    },
    {
      "n": "Magdagachi",
      "c": "Russia",
      "p": 8070.5,
      "a": []
    },
    {
      "n": "Pokrovsk",
      "c": "Russia",
      "p": 8065.5,
      "a": []
    },
    {
      "n": "Skovorodino",
      "c": "Russia",
      "p": 6485.5,
      "a": []
    },
    {
      "n": "Verkhnevilyuysk",
      "c": "Russia",
      "p": 6341,
      "a": []
    },
    {
      "n": "Tiksi",
      "c": "Russia",
      "p": 5700,
      "a": []
    },
    {
      "n": "Vilyuysk",
      "c": "Russia",
      "p": 5543.5,
      "a": []
    },
    {
      "n": "Chernyshevskiy",
      "c": "Russia",
      "p": 5137,
      "a": []
    },
    {
      "n": "Suntar",
      "c": "Russia",
      "p": 4716,
      "a": []
    },
    {
      "n": "Sangar",
      "c": "Russia",
      "p": 4633,
      "a": []
    },
    {
      "n": "Vitim",
      "c": "Russia",
      "p": 3843,
      "a": []
    },
    {
      "n": "Zhigansk",
      "c": "Russia",
      "p": 3237,
      "a": []
    },
    {
      "n": "Saskylakh",
      "c": "Russia",
      "p": 1920,
      "a": []
    },
    {
      "n": "Govorovo",
      "c": "Russia",
      "p": 943,
      "a": []
    },
    {
      "n": "Put Lenina",
      "c": "Russia",
      "p": 298,
      "a": []
    },
    {
      "n": "Progress",
      "c": "Russia",
      "p": 146,
      "a": []
    },
    {
      "n": "Khorgo",
      "c": "Russia",
      "p": 10,
      "a": []
    },
    {
      "n": "Nyukzha",
      "c": "Russia",
      "p": 10,
      "a": []
    },
    {
      "n": "Tunguskhaya",
      "c": "Russia",
      "p": 10,
      "a": []
    },
    {
      "n": "Natara",
      "c": "Russia",
      "p": 10,
      "a": []
    },
    {
      "n": "Zhilinda",
      "c": "Russia",
      "p": 10,
      "a": []
    },
    {
      "n": "Trofimovsk",
      "c": "Russia",
      "p": 10,
      "a": []
    },
    {
      "n": "Terbyas",
      "c": "Russia",
      "p": 10,
      "a": []
    },
    {
      "n": "Menkere",
      "c": "Russia",
      "p": 10,
      "a": []
    },
    {
      "n": "Sagastyr",
      "c": "Russia",
      "p": 10,
      "a": []
    },
    {
      "n": "Ust Olensk",
      "c": "Russia",
      "p": 10,
      "a": []
    },
    {
      "n": "Olenek",
      "c": "Russia",
      "p": 10,
      "a": []
    }
  ],
  "Asia/Magadan": [
    {
      "n": "Magadan",
      "c": "Russia",
      "p": 91221.5,
      "a": []
    },
    {
      "n": "Palatka",
      "c": "Russia",
      "p": 12993,
      "a": []
    },
    {
      "n": "Susuman",
      "c": "Russia",
      "p": 7367,
      "a": []
    },
    {
      "n": "Omsukchan",
      "c": "Russia",
      "p": 4201,
      "a": []
    },
    {
      "n": "Evensk",
      "c": "Russia",
      "p": 2024,
      "a": []
    },
    {
      "n": "Omchak",
      "c": "Russia",
      "p": 10,
      "a": []
    },
    {
      "n": "Siglan",
      "c": "Russia",
      "p": 10,
      "a": []
    },
    {
      "n": "Karamken",
      "c": "Russia",
      "p": 10,
      "a": []
    },
    {
      "n": "Strelka",
      "c": "Russia",
      "p": 10,
      "a": []
    }
  ],
  "Asia/Sakhalin": [
    {
      "n": "Yuzhno Sakhalinsk",
      "c": "Russia",
      "p": 174685,
      "a": []
    },
    {
      "n": "Korsakov",
      "c": "Russia",
      "p": 33165.5,
      "a": []
    },
    {
      "n": "Kholmsk",
      "c": "Russia",
      "p": 32796,
      "a": []
    },
    {
      "n": "Okha",
      "c": "Russia",
      "p": 25461,
      "a": []
    },
    {
      "n": "Nevelsk",
      "c": "Russia",
      "p": 16754.5,
      "a": []
    },
    {
      "n": "Poronaysk",
      "c": "Russia",
      "p": 15555,
      "a": []
    },
    {
      "n": "Uglegorsk",
      "c": "Russia",
      "p": 12139.5,
      "a": []
    },
    {
      "n": "Dolinsk",
      "c": "Russia",
      "p": 11791.5,
      "a": []
    },
    {
      "n": "Nogliki",
      "c": "Russia",
      "p": 10098,
      "a": []
    },
    {
      "n": "Aleksandrovsk Sakhalinskiy",
      "c": "Russia",
      "p": 9263.5,
      "a": []
    },
    {
      "n": "Makarov",
      "c": "Russia",
      "p": 4571.5,
      "a": []
    },
    {
      "n": "Krasnogorsk",
      "c": "Russia",
      "p": 3304,
      "a": []
    }
  ],
  "Asia/Kamchatka": [
    {
      "n": "Petropavlovsk Kamchatskiy",
      "c": "Russia",
      "p": 182270.5,
      "a": []
    },
    {
      "n": "Oktyabrskiy",
      "c": "Russia",
      "p": 67386,
      "a": []
    },
    {
      "n": "Ust Kamchatsk",
      "c": "Russia",
      "p": 4939,
      "a": []
    },
    {
      "n": "Palana",
      "c": "Russia",
      "p": 3671,
      "a": []
    },
    {
      "n": "Klyuchi",
      "c": "Russia",
      "p": 1089,
      "a": []
    },
    {
      "n": "Korf",
      "c": "Russia",
      "p": 400,
      "a": []
    },
    {
      "n": "Pakhachi",
      "c": "Russia",
      "p": 10,
      "a": []
    },
    {
      "n": "Utkholok",
      "c": "Russia",
      "p": 10,
      "a": []
    },
    {
      "n": "Bol'sheretsk",
      "c": "Russia",
      "p": 10,
      "a": []
    },
    {
      "n": "Il'pyrskiy",
      "c": "Russia",
      "p": 10,
      "a": []
    },
    {
      "n": "Manily",
      "c": "Russia",
      "p": 10,
      "a": []
    }
  ],
  "Asia/Tomsk": [
    {
      "n": "Tomsk",
      "c": "Russia",
      "p": 471950,
      "a": []
    },
    {
      "n": "Strezhevoy",
      "c": "Russia",
      "p": 38997.5,
      "a": []
    },
    {
      "n": "Kolpashevo",
      "c": "Russia",
      "p": 27876,
      "a": []
    },
    {
      "n": "Asino",
      "c": "Russia",
      "p": 24732.5,
      "a": []
    },
    {
      "n": "Timiryazevskiy",
      "c": "Russia",
      "p": 6705.5,
      "a": []
    }
  ],
  "Europe/Saratov": [
    {
      "n": "Saratov",
      "c": "Russia",
      "p": 814586.5,
      "a": []
    },
    {
      "n": "Engels",
      "c": "Russia",
      "p": 183221,
      "a": []
    },
    {
      "n": "Balakovo",
      "c": "Russia",
      "p": 172821.5,
      "a": []
    },
    {
      "n": "Balashov",
      "c": "Russia",
      "p": 84107,
      "a": []
    },
    {
      "n": "Volsk",
      "c": "Russia",
      "p": 62027,
      "a": []
    },
    {
      "n": "Pugachev",
      "c": "Russia",
      "p": 26690,
      "a": []
    },
    {
      "n": "Atkarsk",
      "c": "Russia",
      "p": 23315.5,
      "a": []
    },
    {
      "n": "Krasnoarmeysk",
      "c": "Russia",
      "p": 20625.5,
      "a": []
    }
  ],
  "Europe/Ulyanovsk": [
    {
      "n": "Ulyanovsk",
      "c": "Russia",
      "p": 571553.5,
      "a": []
    },
    {
      "n": "Dimitrovgrad",
      "c": "Russia",
      "p": 121213.5,
      "a": []
    }
  ],
  "Asia/Omsk": [
    {
      "n": "Omsk",
      "c": "Russia",
      "p": 1089201.5,
      "a": []
    },
    {
      "n": "Tara",
      "c": "Russia",
      "p": 24130.5,
      "a": []
    },
    {
      "n": "Isikul",
      "c": "Russia",
      "p": 21136,
      "a": []
    },
    {
      "n": "Kalachinsk",
      "c": "Russia",
      "p": 20506.5,
      "a": []
    },
    {
      "n": "Nazyvayevsk",
      "c": "Russia",
      "p": 10938.5,
      "a": []
    },
    {
      "n": "Cherlak",
      "c": "Russia",
      "p": 7060.5,
      "a": []
    }
  ],
  "Asia/Barnaul": [
    {
      "n": "Barnaul",
      "c": "Russia",
      "p": 569711,
      "a": []
    },
    {
      "n": "Biysk",
      "c": "Russia",
      "p": 209796.5,
      "a": []
    },
    {
      "n": "Rubtsovsk",
      "c": "Russia",
      "p": 159133,
      "a": []
    },
    {
      "n": "Novoaltaysk",
      "c": "Russia",
      "p": 76218,
      "a": []
    },
    {
      "n": "Gorno Altaysk",
      "c": "Russia",
      "p": 57392.5,
      "a": []
    },
    {
      "n": "Kamenna Obi",
      "c": "Russia",
      "p": 40883,
      "a": []
    },
    {
      "n": "Slavgorod",
      "c": "Russia",
      "p": 27651,
      "a": []
    },
    {
      "n": "Aleysk",
      "c": "Russia",
      "p": 22477.5,
      "a": []
    },
    {
      "n": "Zmeinogorsk",
      "c": "Russia",
      "p": 10471.5,
      "a": []
    },
    {
      "n": "Gornyak",
      "c": "Russia",
      "p": 9567,
      "a": []
    },
    {
      "n": "Kulunda",
      "c": "Russia",
      "p": 8831.5,
      "a": []
    }
  ],
  "Asia/Khandyga": [
    {
      "n": "Khandyga",
      "c": "Russia",
      "p": 6796,
      "a": []
    },
    {
      "n": "Ust Maya",
      "c": "Russia",
      "p": 3062,
      "a": []
    },
    {
      "n": "Eldikan",
      "c": "Russia",
      "p": 1516,
      "a": []
    },
    {
      "n": "Chagda",
      "c": "Russia",
      "p": 10,
      "a": []
    }
  ],
  "Europe/Astrakhan": [
    {
      "n": "Astrakhan",
      "c": "Russia",
      "p": 493363.5,
      "a": []
    },
    {
      "n": "Akhtubinsk",
      "c": "Russia",
      "p": 38179,
      "a": []
    }
  ],
  "Asia/Ust-Nera": [
    {
      "n": "Ust Nera",
      "c": "Russia",
      "p": 9148,
      "a": []
    }
  ],
  "Africa/Kigali": [
    {
      "n": "Kigali",
      "c": "Rwanda",
      "p": 802630.5,
      "a": []
    },
    {
      "n": "Nyanza",
      "c": "Rwanda",
      "p": 225209,
      "a": []
    },
    {
      "n": "Gitarama",
      "c": "Rwanda",
      "p": 87613,
      "a": []
    },
    {
      "n": "Ruhengeri",
      "c": "Rwanda",
      "p": 86685,
      "a": []
    },
    {
      "n": "Gisenyi",
      "c": "Rwanda",
      "p": 83623,
      "a": []
    },
    {
      "n": "Butare",
      "c": "Rwanda",
      "p": 77000,
      "a": []
    },
    {
      "n": "Byumba",
      "c": "Rwanda",
      "p": 70593,
      "a": []
    },
    {
      "n": "Kibuye",
      "c": "Rwanda",
      "p": 48024,
      "a": []
    },
    {
      "n": "Kibungo",
      "c": "Rwanda",
      "p": 46240,
      "a": []
    },
    {
      "n": "Cyangugu",
      "c": "Rwanda",
      "p": 19900,
      "a": []
    },
    {
      "n": "Gikongoro",
      "c": "Rwanda",
      "p": 15000,
      "a": []
    }
  ],
  "America/St_Kitts": [
    {
      "n": "Basseterre",
      "c": "Saint Kitts and Nevis",
      "p": 18693.5,
      "a": []
    }
  ],
  "America/St_Lucia": [
    {
      "n": "Castries",
      "c": "Saint Lucia",
      "p": 24298.5,
      "a": []
    }
  ],
  "America/St_Vincent": [
    {
      "n": "Kingstown",
      "c": "Saint Vincent and the Grenadines",
      "p": 37001.5,
      "a": []
    }
  ],
  "Pacific/Apia": [
    {
      "n": "Apia",
      "c": "Samoa",
      "p": 49812,
      "a": []
    }
  ],
  "Europe/San_Marino": [
    {
      "n": "San Marino",
      "c": "San Marino",
      "p": 29289.5,
      "a": []
    }
  ],
  "Africa/Sao_Tome": [
    {
      "n": "Sao Tome",
      "c": "Sao Tome and Principe",
      "p": 72192.5,
      "a": []
    },
    {
      "n": "Santo Antonio",
      "c": "Sao Tome and Principe",
      "p": 1156,
      "a": []
    }
  ],
  "Asia/Riyadh": [
    {
      "n": "Riyadh",
      "c": "Saudi Arabia",
      "p": 4335480.5,
      "a": []
    },
    {
      "n": "Jeddah",
      "c": "Saudi Arabia",
      "p": 2939723,
      "a": []
    },
    {
      "n": "Ad Damman",
      "c": "Saudi Arabia",
      "p": 1411656,
      "a": []
    },
    {
      "n": "Makkah",
      "c": "Saudi Arabia",
      "p": 1354312,
      "a": []
    },
    {
      "n": "Medina",
      "c": "Saudi Arabia",
      "p": 1010000,
      "a": []
    },
    {
      "n": "Al Hillah",
      "c": "Saudi Arabia",
      "p": 594605,
      "a": []
    },
    {
      "n": "At Taif",
      "c": "Saudi Arabia",
      "p": 594065,
      "a": []
    },
    {
      "n": "Al Hufuf",
      "c": "Saudi Arabia",
      "p": 518694.5,
      "a": []
    },
    {
      "n": "Tabuk",
      "c": "Saudi Arabia",
      "p": 501703.5,
      "a": []
    },
    {
      "n": "Buraydah",
      "c": "Saudi Arabia",
      "p": 394958.5,
      "a": []
    },
    {
      "n": "Hail",
      "c": "Saudi Arabia",
      "p": 385257,
      "a": []
    },
    {
      "n": "Najran",
      "c": "Saudi Arabia",
      "p": 314091,
      "a": []
    },
    {
      "n": "Al Kharj",
      "c": "Saudi Arabia",
      "p": 298428,
      "a": []
    },
    {
      "n": "Al Mubarraz",
      "c": "Saudi Arabia",
      "p": 294682,
      "a": []
    },
    {
      "n": "Hafar al Batin",
      "c": "Saudi Arabia",
      "p": 249194,
      "a": []
    },
    {
      "n": "Al Jubayl",
      "c": "Saudi Arabia",
      "p": 235237,
      "a": []
    },
    {
      "n": "Yanbu al Bahr",
      "c": "Saudi Arabia",
      "p": 233875.5,
      "a": []
    },
    {
      "n": "Al-Qatif",
      "c": "Saudi Arabia",
      "p": 233575.5,
      "a": []
    },
    {
      "n": "Abha",
      "c": "Saudi Arabia",
      "p": 207802.5,
      "a": []
    },
    {
      "n": "Arar",
      "c": "Saudi Arabia",
      "p": 185278,
      "a": []
    },
    {
      "n": "Sakakah",
      "c": "Saudi Arabia",
      "p": 128332,
      "a": []
    },
    {
      "n": "Jizan",
      "c": "Saudi Arabia",
      "p": 100397,
      "a": []
    },
    {
      "n": "Qal at Bishah",
      "c": "Saudi Arabia",
      "p": 85059.5,
      "a": []
    },
    {
      "n": "Rafha",
      "c": "Saudi Arabia",
      "p": 64755,
      "a": []
    },
    {
      "n": "Az Zahran",
      "c": "Saudi Arabia",
      "p": 54373,
      "a": []
    },
    {
      "n": "Al Wajh",
      "c": "Saudi Arabia",
      "p": 34936.5,
      "a": []
    },
    {
      "n": "Dawmat al Jandal",
      "c": "Saudi Arabia",
      "p": 22583,
      "a": []
    },
    {
      "n": "As Sulayyil",
      "c": "Saudi Arabia",
      "p": 20858.5,
      "a": []
    },
    {
      "n": "Al Quwayiyah",
      "c": "Saudi Arabia",
      "p": 8712,
      "a": []
    },
    {
      "n": "An Nabk",
      "c": "Saudi Arabia",
      "p": 7500,
      "a": []
    },
    {
      "n": "Al Qunfudhah",
      "c": "Saudi Arabia",
      "p": 157,
      "a": []
    }
  ],
  "Indian/Mahe": [
    {
      "n": "Victoria",
      "c": "Seychelles",
      "p": 28228.5,
      "a": []
    }
  ],
  "Africa/Freetown": [
    {
      "n": "Freetown",
      "c": "Sierra Leone",
      "p": 420384,
      "a": []
    },
    {
      "n": "Bo",
      "c": "Sierra Leone",
      "p": 170690.5,
      "a": []
    },
    {
      "n": "Kenema",
      "c": "Sierra Leone",
      "p": 133918.5,
      "a": []
    },
    {
      "n": "Makeni",
      "c": "Sierra Leone",
      "p": 83116,
      "a": []
    },
    {
      "n": "Koidu",
      "c": "Sierra Leone",
      "p": 45307.5,
      "a": []
    }
  ],
  "Asia/Singapore": [
    {
      "n": "Singapore",
      "c": "Singapore",
      "p": 4236614.5,
      "a": [
        "SIN"
      ]
    }
  ],
  "Europe/Bratislava": [
    {
      "n": "Bratislava",
      "c": "Slovakia",
      "p": 398712,
      "a": []
    },
    {
      "n": "Kosice",
      "c": "Slovakia",
      "p": 210316.5,
      "a": []
    },
    {
      "n": "Zilina",
      "c": "Slovakia",
      "p": 86805,
      "a": []
    },
    {
      "n": "Presov",
      "c": "Slovakia",
      "p": 85368.5,
      "a": []
    },
    {
      "n": "Banska Bystrica",
      "c": "Slovakia",
      "p": 80784,
      "a": []
    },
    {
      "n": "Trnava",
      "c": "Slovakia",
      "p": 60919,
      "a": []
    },
    {
      "n": "Zvolen",
      "c": "Slovakia",
      "p": 38276.5,
      "a": []
    }
  ],
  "Europe/Ljubljana": [
    {
      "n": "Ljubljana",
      "c": "Slovenia",
      "p": 284961,
      "a": []
    },
    {
      "n": "Maribor",
      "c": "Slovenia",
      "p": 101642,
      "a": []
    }
  ],
  "Pacific/Guadalcanal": [
    {
      "n": "Honiara",
      "c": "Solomon Islands",
      "p": 66313,
      "a": []
    },
    {
      "n": "Gizo",
      "c": "Solomon Islands",
      "p": 6154,
      "a": []
    },
    {
      "n": "Lata",
      "c": "Solomon Islands",
      "p": 553,
      "a": []
    }
  ],
  "Africa/Mogadishu": [
    {
      "n": "Mogadishu",
      "c": "Somalia",
      "p": 987694,
      "a": []
    },
    {
      "n": "Hargeysa",
      "c": "Somaliland",
      "p": 362447,
      "a": []
    },
    {
      "n": "Kismaayo",
      "c": "Somalia",
      "p": 184901.5,
      "a": []
    },
    {
      "n": "Berbera",
      "c": "Somaliland",
      "p": 178407,
      "a": []
    },
    {
      "n": "Ceerigaabo",
      "c": "Somaliland",
      "p": 165000,
      "a": []
    },
    {
      "n": "Jamaame",
      "c": "Somalia",
      "p": 156923.5,
      "a": []
    },
    {
      "n": "Baydhabo",
      "c": "Somalia",
      "p": 128830,
      "a": []
    },
    {
      "n": "Burco",
      "c": "Somaliland",
      "p": 102931.5,
      "a": []
    },
    {
      "n": "Jawhar",
      "c": "Somalia",
      "p": 86654,
      "a": []
    },
    {
      "n": "Boorama",
      "c": "Somaliland",
      "p": 67664,
      "a": []
    },
    {
      "n": "Laascaanood",
      "c": "Somaliland",
      "p": 60100,
      "a": []
    },
    {
      "n": "Beledweyne",
      "c": "Somalia",
      "p": 59177.5,
      "a": []
    },
    {
      "n": "Gaalkacyo",
      "c": "Somalia",
      "p": 57350.5,
      "a": []
    },
    {
      "n": "Boosaaso",
      "c": "Somalia",
      "p": 46969,
      "a": []
    },
    {
      "n": "Luuq",
      "c": "Somalia",
      "p": 33820,
      "a": []
    },
    {
      "n": "Maydh",
      "c": "Somaliland",
      "p": 30000,
      "a": []
    },
    {
      "n": "Buurhakaba",
      "c": "Somalia",
      "p": 29529.5,
      "a": []
    },
    {
      "n": "Bandarbeyla",
      "c": "Somalia",
      "p": 13753,
      "a": []
    },
    {
      "n": "Garbahaarey",
      "c": "Somalia",
      "p": 12652,
      "a": []
    },
    {
      "n": "Eyl",
      "c": "Somalia",
      "p": 9636.5,
      "a": []
    },
    {
      "n": "Ferfer",
      "c": "Somalia",
      "p": 5205.5,
      "a": []
    },
    {
      "n": "Buur Gaabo",
      "c": "Somalia",
      "p": 3096,
      "a": []
    },
    {
      "n": "Garoowe",
      "c": "Somalia",
      "p": 2568,
      "a": []
    },
    {
      "n": "Marka",
      "c": "Somalia",
      "p": 1958,
      "a": []
    },
    {
      "n": "Hudur",
      "c": "Somalia",
      "p": 1639,
      "a": []
    },
    {
      "n": "Bu'aale",
      "c": "Somalia",
      "p": 1490,
      "a": []
    },
    {
      "n": "Qardho",
      "c": "Somalia",
      "p": 1341,
      "a": []
    },
    {
      "n": "Mereeg",
      "c": "Somalia",
      "p": 548,
      "a": []
    },
    {
      "n": "Caluula",
      "c": "Somalia",
      "p": 513,
      "a": []
    },
    {
      "n": "Dhuusa Mareeb",
      "c": "Somalia",
      "p": 447,
      "a": []
    },
    {
      "n": "Hurdiyo",
      "c": "Somalia",
      "p": 176,
      "a": []
    }
  ],
  "Africa/Johannesburg": [
    {
      "n": "Cape Town",
      "c": "South Africa",
      "p": 2823929,
      "a": [
        "CPT"
      ]
    },
    {
      "n": "Johannesburg",
      "c": "South Africa",
      "p": 2730734.5,
      "a": [
        "JNB"
      ]
    },
    {
      "n": "Durban",
      "c": "South Africa",
      "p": 2729000,
      "a": []
    },
    {
      "n": "Benoni",
      "c": "South Africa",
      "p": 1795672,
      "a": []
    },
    {
      "n": "Pretoria",
      "c": "South Africa",
      "p": 1338000,
      "a": []
    },
    {
      "n": "Port Elizabeth",
      "c": "South Africa",
      "p": 830527,
      "a": []
    },
    {
      "n": "Vereeniging",
      "c": "South Africa",
      "p": 774340.5,
      "a": []
    },
    {
      "n": "Pietermaritzburg",
      "c": "South Africa",
      "p": 620898,
      "a": []
    },
    {
      "n": "Bloemfontein",
      "c": "South Africa",
      "p": 459866.5,
      "a": []
    },
    {
      "n": "East London",
      "c": "South Africa",
      "p": 338627,
      "a": []
    },
    {
      "n": "Welkom",
      "c": "South Africa",
      "p": 279011.5,
      "a": []
    },
    {
      "n": "Uitenhage",
      "c": "South Africa",
      "p": 217839,
      "a": []
    },
    {
      "n": "Springs",
      "c": "South Africa",
      "p": 211238.5,
      "a": []
    },
    {
      "n": "Mbombela",
      "c": "South Africa",
      "p": 184839,
      "a": []
    },
    {
      "n": "Polokwane",
      "c": "South Africa",
      "p": 171897,
      "a": []
    },
    {
      "n": "Klerksdorp",
      "c": "South Africa",
      "p": 163362.5,
      "a": []
    },
    {
      "n": "Paarl",
      "c": "South Africa",
      "p": 159791.5,
      "a": []
    },
    {
      "n": "Thohoyandou",
      "c": "South Africa",
      "p": 156876.5,
      "a": []
    },
    {
      "n": "Kimberley",
      "c": "South Africa",
      "p": 153676.5,
      "a": []
    },
    {
      "n": "Bhisho",
      "c": "South Africa",
      "p": 149142,
      "a": []
    },
    {
      "n": "Rustenburg",
      "c": "South Africa",
      "p": 145020,
      "a": []
    },
    {
      "n": "George",
      "c": "South Africa",
      "p": 143915,
      "a": []
    },
    {
      "n": "Middelburg",
      "c": "South Africa",
      "p": 124248,
      "a": []
    },
    {
      "n": "Worcester",
      "c": "South Africa",
      "p": 109200,
      "a": []
    },
    {
      "n": "Vryheid",
      "c": "South Africa",
      "p": 108364.5,
      "a": []
    },
    {
      "n": "Umtata",
      "c": "South Africa",
      "p": 108217.5,
      "a": []
    },
    {
      "n": "Potchefstroom",
      "c": "South Africa",
      "p": 103741.5,
      "a": []
    },
    {
      "n": "Queenstown",
      "c": "South Africa",
      "p": 96274.5,
      "a": []
    },
    {
      "n": "Bethal",
      "c": "South Africa",
      "p": 96184.5,
      "a": []
    },
    {
      "n": "Mmabatho",
      "c": "South Africa",
      "p": 90591,
      "a": []
    },
    {
      "n": "Kroonstad",
      "c": "South Africa",
      "p": 88413.5,
      "a": []
    },
    {
      "n": "Brits",
      "c": "South Africa",
      "p": 81222,
      "a": []
    },
    {
      "n": "Grahamstown",
      "c": "South Africa",
      "p": 70315.5,
      "a": []
    },
    {
      "n": "Bethlehem",
      "c": "South Africa",
      "p": 66373,
      "a": []
    },
    {
      "n": "Oudtshoorn",
      "c": "South Africa",
      "p": 62353,
      "a": []
    },
    {
      "n": "Upington",
      "c": "South Africa",
      "p": 62086,
      "a": []
    },
    {
      "n": "Ladysmith",
      "c": "South Africa",
      "p": 47375,
      "a": []
    },
    {
      "n": "Standerton",
      "c": "South Africa",
      "p": 46057,
      "a": []
    },
    {
      "n": "Tzaneen",
      "c": "South Africa",
      "p": 42099.5,
      "a": []
    },
    {
      "n": "Saldanha",
      "c": "South Africa",
      "p": 37469,
      "a": []
    },
    {
      "n": "Port Shepstone",
      "c": "South Africa",
      "p": 37325.5,
      "a": []
    },
    {
      "n": "Knysna",
      "c": "South Africa",
      "p": 33887,
      "a": []
    },
    {
      "n": "Graaff Reinet",
      "c": "South Africa",
      "p": 32958.5,
      "a": []
    },
    {
      "n": "Cradock",
      "c": "South Africa",
      "p": 32898,
      "a": []
    },
    {
      "n": "Vryburg",
      "c": "South Africa",
      "p": 31589,
      "a": []
    },
    {
      "n": "Beaufort West",
      "c": "South Africa",
      "p": 28070.5,
      "a": []
    },
    {
      "n": "Aliwal North",
      "c": "South Africa",
      "p": 26423,
      "a": []
    },
    {
      "n": "Volksrust",
      "c": "South Africa",
      "p": 25394.5,
      "a": []
    },
    {
      "n": "De Aar",
      "c": "South Africa",
      "p": 18669.5,
      "a": []
    },
    {
      "n": "Lebowakgomo",
      "c": "South Africa",
      "p": 16852.5,
      "a": []
    },
    {
      "n": "Mossel Bay",
      "c": "South Africa",
      "p": 16743,
      "a": []
    },
    {
      "n": "Hermanus",
      "c": "South Africa",
      "p": 16274.5,
      "a": []
    },
    {
      "n": "Ulundi",
      "c": "South Africa",
      "p": 13167,
      "a": []
    },
    {
      "n": "Musina",
      "c": "South Africa",
      "p": 11848,
      "a": []
    },
    {
      "n": "Middelburg",
      "c": "South Africa",
      "p": 10964,
      "a": []
    },
    {
      "n": "Bloemhof",
      "c": "South Africa",
      "p": 10662.5,
      "a": []
    },
    {
      "n": "Komatipoort",
      "c": "South Africa",
      "p": 10333.5,
      "a": []
    },
    {
      "n": "Kuruman",
      "c": "South Africa",
      "p": 9549.5,
      "a": []
    },
    {
      "n": "Port Alfred",
      "c": "South Africa",
      "p": 9377,
      "a": []
    },
    {
      "n": "Swellendam",
      "c": "South Africa",
      "p": 8954,
      "a": []
    },
    {
      "n": "Bredasdorp",
      "c": "South Africa",
      "p": 8453,
      "a": []
    },
    {
      "n": "Prieska",
      "c": "South Africa",
      "p": 7640.5,
      "a": []
    },
    {
      "n": "Colesberg",
      "c": "South Africa",
      "p": 7491,
      "a": []
    },
    {
      "n": "Springbok",
      "c": "South Africa",
      "p": 6623.5,
      "a": []
    },
    {
      "n": "Brandfort",
      "c": "South Africa",
      "p": 6190,
      "a": []
    },
    {
      "n": "Port St. Johns",
      "c": "South Africa",
      "p": 5939,
      "a": []
    },
    {
      "n": "Carnarvon",
      "c": "South Africa",
      "p": 5785,
      "a": []
    },
    {
      "n": "Poffader",
      "c": "South Africa",
      "p": 4220,
      "a": []
    },
    {
      "n": "Vanhynsdorp",
      "c": "South Africa",
      "p": 3331,
      "a": []
    },
    {
      "n": "Alexander Bay",
      "c": "South Africa",
      "p": 1476,
      "a": []
    },
    {
      "n": "Ubomba",
      "c": "South Africa",
      "p": 564,
      "a": []
    }
  ],
  "Atlantic/South_Georgia": [
    {
      "n": "Grytviken",
      "c": "South Georgia and the Islands",
      "p": 99,
      "a": []
    }
  ],
  "Asia/Seoul": [
    {
      "n": "Seoul",
      "c": "South Korea",
      "p": 9796000,
      "a": [
        "SEL",
        "ICN"
      ]
    },
    {
      "n": "Busan",
      "c": "South Korea",
      "p": 3480000,
      "a": []
    },
    {
      "n": "Incheon",
      "c": "South Korea",
      "p": 2550000,
      "a": []
    },
    {
      "n": "Daegu",
      "c": "South Korea",
      "p": 2460000,
      "a": []
    },
    {
      "n": "Daejeon",
      "c": "South Korea",
      "p": 1458165,
      "a": []
    },
    {
      "n": "Gwangju",
      "c": "South Korea",
      "p": 1428469,
      "a": []
    },
    {
      "n": "Changwon",
      "c": "South Korea",
      "p": 1081499,
      "a": []
    },
    {
      "n": "Suwon",
      "c": "South Korea",
      "p": 1078000,
      "a": []
    },
    {
      "n": "Ulsan",
      "c": "South Korea",
      "p": 1011932.5,
      "a": []
    },
    {
      "n": "Songnam",
      "c": "South Korea",
      "p": 986967.5,
      "a": []
    },
    {
      "n": "Goyang",
      "c": "South Korea",
      "p": 903000,
      "a": []
    },
    {
      "n": "Puch'on",
      "c": "South Korea",
      "p": 866000,
      "a": []
    },
    {
      "n": "Cheongju",
      "c": "South Korea",
      "p": 719420.5,
      "a": []
    },
    {
      "n": "Ansan",
      "c": "South Korea",
      "p": 695110.5,
      "a": []
    },
    {
      "n": "Jeonju",
      "c": "South Korea",
      "p": 679948.5,
      "a": []
    },
    {
      "n": "Pohang",
      "c": "South Korea",
      "p": 435266,
      "a": []
    },
    {
      "n": "Jeju",
      "c": "South Korea",
      "p": 361258,
      "a": []
    },
    {
      "n": "Yeosu",
      "c": "South Korea",
      "p": 302142,
      "a": []
    },
    {
      "n": "Mokpo",
      "c": "South Korea",
      "p": 264210,
      "a": []
    },
    {
      "n": "Iksan",
      "c": "South Korea",
      "p": 261545,
      "a": []
    },
    {
      "n": "Gunsan",
      "c": "South Korea",
      "p": 243743,
      "a": []
    },
    {
      "n": "Wonju",
      "c": "South Korea",
      "p": 240898,
      "a": []
    },
    {
      "n": "Chuncheon",
      "c": "South Korea",
      "p": 218127.5,
      "a": []
    },
    {
      "n": "Gangneung",
      "c": "South Korea",
      "p": 173797,
      "a": []
    },
    {
      "n": "Gyeongju",
      "c": "South Korea",
      "p": 148852.5,
      "a": []
    },
    {
      "n": "Andong",
      "c": "South Korea",
      "p": 123920.5,
      "a": []
    },
    {
      "n": "Sokcho",
      "c": "South Korea",
      "p": 85430,
      "a": []
    },
    {
      "n": "Eumseong",
      "c": "South Korea",
      "p": 10077,
      "a": []
    }
  ],
  "Africa/Juba": [
    {
      "n": "Malakal",
      "c": "South Sudan",
      "p": 160765,
      "a": []
    },
    {
      "n": "Yei",
      "c": "South Sudan",
      "p": 112691,
      "a": []
    },
    {
      "n": "Juba",
      "c": "South Sudan",
      "p": 111975,
      "a": []
    },
    {
      "n": "Wau",
      "c": "South Sudan",
      "p": 99158,
      "a": []
    },
    {
      "n": "Gogrial",
      "c": "South Sudan",
      "p": 44318.5,
      "a": []
    },
    {
      "n": "Aweil",
      "c": "South Sudan",
      "p": 42725,
      "a": []
    },
    {
      "n": "Bor",
      "c": "South Sudan",
      "p": 26782,
      "a": []
    },
    {
      "n": "Yambio",
      "c": "South Sudan",
      "p": 24420.5,
      "a": []
    },
    {
      "n": "Rumbek",
      "c": "South Sudan",
      "p": 17772.5,
      "a": []
    },
    {
      "n": "Maridi",
      "c": "South Sudan",
      "p": 7757.5,
      "a": []
    },
    {
      "n": "Bentiu",
      "c": "South Sudan",
      "p": 7653,
      "a": []
    },
    {
      "n": "Melut",
      "c": "South Sudan",
      "p": 6407,
      "a": []
    },
    {
      "n": "Kapoeta",
      "c": "South Sudan",
      "p": 5021,
      "a": []
    },
    {
      "n": "Nasir",
      "c": "South Sudan",
      "p": 1741,
      "a": []
    },
    {
      "n": "Nimule",
      "c": "South Sudan",
      "p": 242,
      "a": []
    }
  ],
  "Europe/Madrid": [
    {
      "n": "Barcelona",
      "c": "Spain",
      "p": 3250797.5,
      "a": [
        "BCN"
      ]
    },
    {
      "n": "Madrid",
      "c": "Spain",
      "p": 2808718.5,
      "a": [
        "MAD"
      ]
    },
    {
      "n": "Seville",
      "c": "Spain",
      "p": 957533,
      "a": []
    },
    {
      "n": "Valencia",
      "c": "Spain",
      "p": 806652,
      "a": []
    },
    {
      "n": "Bilbao",
      "c": "Spain",
      "p": 614369.5,
      "a": []
    },
    {
      "n": "Zaragoza",
      "c": "Spain",
      "p": 548955.5,
      "a": []
    },
    {
      "n": "Malaga",
      "c": "Spain",
      "p": 539381.5,
      "a": []
    },
    {
      "n": "Murcia",
      "c": "Spain",
      "p": 368322.5,
      "a": []
    },
    {
      "n": "Vigo",
      "c": "Spain",
      "p": 335848.5,
      "a": []
    },
    {
      "n": "Palma",
      "c": "Spain",
      "p": 319951,
      "a": []
    },
    {
      "n": "Granada",
      "c": "Spain",
      "p": 313269,
      "a": []
    },
    {
      "n": "La Coruña",
      "c": "Spain",
      "p": 306614.5,
      "a": []
    },
    {
      "n": "Gijon",
      "c": "Spain",
      "p": 303712,
      "a": []
    },
    {
      "n": "Cordoba",
      "c": "Spain",
      "p": 300512,
      "a": []
    },
    {
      "n": "Valladolid",
      "c": "Spain",
      "p": 299373.5,
      "a": []
    },
    {
      "n": "Alicante",
      "c": "Spain",
      "p": 296345,
      "a": []
    },
    {
      "n": "San Sebastián",
      "c": "Spain",
      "p": 270498,
      "a": []
    },
    {
      "n": "Pamplona",
      "c": "Spain",
      "p": 233855.5,
      "a": []
    },
    {
      "n": "Oviedo",
      "c": "Spain",
      "p": 223524.5,
      "a": []
    },
    {
      "n": "Vitoria",
      "c": "Spain",
      "p": 199109.5,
      "a": []
    },
    {
      "n": "Santander",
      "c": "Spain",
      "p": 196025.5,
      "a": []
    },
    {
      "n": "Castello",
      "c": "Spain",
      "p": 176360,
      "a": []
    },
    {
      "n": "Cartagena",
      "c": "Spain",
      "p": 166276.5,
      "a": []
    },
    {
      "n": "Salamanca",
      "c": "Spain",
      "p": 160456.5,
      "a": []
    },
    {
      "n": "Cadiz",
      "c": "Spain",
      "p": 153932.5,
      "a": []
    },
    {
      "n": "Marbella",
      "c": "Spain",
      "p": 153069.5,
      "a": []
    },
    {
      "n": "Almeria",
      "c": "Spain",
      "p": 152032.5,
      "a": []
    },
    {
      "n": "Burgos",
      "c": "Spain",
      "p": 150251,
      "a": []
    },
    {
      "n": "Mataro",
      "c": "Spain",
      "p": 149826,
      "a": []
    },
    {
      "n": "Leon",
      "c": "Spain",
      "p": 135014,
      "a": []
    },
    {
      "n": "Albacete",
      "c": "Spain",
      "p": 127597,
      "a": []
    },
    {
      "n": "Logrono",
      "c": "Spain",
      "p": 123918.5,
      "a": []
    },
    {
      "n": "Huelva",
      "c": "Spain",
      "p": 119732,
      "a": []
    },
    {
      "n": "Badajoz",
      "c": "Spain",
      "p": 115638.5,
      "a": []
    },
    {
      "n": "Ourense",
      "c": "Spain",
      "p": 113095,
      "a": []
    },
    {
      "n": "Tarragona",
      "c": "Spain",
      "p": 107957.5,
      "a": []
    },
    {
      "n": "Algeciras",
      "c": "Spain",
      "p": 106687.5,
      "a": []
    },
    {
      "n": "Jaén",
      "c": "Spain",
      "p": 92909,
      "a": []
    },
    {
      "n": "Santiago de Compostela",
      "c": "Spain",
      "p": 87721,
      "a": []
    },
    {
      "n": "Lorca",
      "c": "Spain",
      "p": 56541.5,
      "a": []
    },
    {
      "n": "Toledo",
      "c": "Spain",
      "p": 53878.5,
      "a": []
    },
    {
      "n": "Merida",
      "c": "Spain",
      "p": 52423,
      "a": []
    },
    {
      "n": "Guadalajara",
      "c": "Spain",
      "p": 51906.5,
      "a": []
    },
    {
      "n": "Linares",
      "c": "Spain",
      "p": 49549.5,
      "a": []
    }
  ],
  "Atlantic/Canary": [
    {
      "n": "Las Palmas",
      "c": "Spain",
      "p": 364718,
      "a": []
    },
    {
      "n": "Santa Cruz de Tenerife",
      "c": "Spain",
      "p": 279125.5,
      "a": []
    },
    {
      "n": "Arrecife",
      "c": "Spain",
      "p": 47182.5,
      "a": []
    }
  ],
  "Africa/Ceuta": [
    {
      "n": "Melilla",
      "c": "Spain",
      "p": 107384,
      "a": []
    },
    {
      "n": "Ceuta",
      "c": "Spain",
      "p": 78674,
      "a": []
    }
  ],
  "Asia/Colombo": [
    {
      "n": "Colombo",
      "c": "Sri Lanka",
      "p": 217000,
      "a": []
    },
    {
      "n": "Moratuwa",
      "c": "Sri Lanka",
      "p": 188595,
      "a": []
    },
    {
      "n": "Jaffna",
      "c": "Sri Lanka",
      "p": 169069,
      "a": []
    },
    {
      "n": "Sri Jawewardenepura Kotte",
      "c": "Sri Lanka",
      "p": 115826,
      "a": []
    },
    {
      "n": "Kandy",
      "c": "Sri Lanka",
      "p": 111701,
      "a": []
    },
    {
      "n": "Trincomalee",
      "c": "Sri Lanka",
      "p": 108420,
      "a": []
    },
    {
      "n": "Batticaloa",
      "c": "Sri Lanka",
      "p": 107982,
      "a": []
    },
    {
      "n": "Galle",
      "c": "Sri Lanka",
      "p": 96298,
      "a": []
    },
    {
      "n": "Anuradhapura",
      "c": "Sri Lanka",
      "p": 89622.5,
      "a": []
    },
    {
      "n": "Matara",
      "c": "Sri Lanka",
      "p": 68244,
      "a": []
    },
    {
      "n": "Kilinochchi",
      "c": "Sri Lanka",
      "p": 64358.5,
      "a": []
    },
    {
      "n": "Ratnapura",
      "c": "Sri Lanka",
      "p": 47832,
      "a": []
    },
    {
      "n": "Puttalan",
      "c": "Sri Lanka",
      "p": 45661,
      "a": []
    },
    {
      "n": "Badulla",
      "c": "Sri Lanka",
      "p": 44908.5,
      "a": []
    }
  ],
  "Africa/Khartoum": [
    {
      "n": "Khartoum",
      "c": "Sudan",
      "p": 3364323.5,
      "a": []
    },
    {
      "n": "Omdurman",
      "c": "Sudan",
      "p": 2289428.5,
      "a": []
    },
    {
      "n": "Port Sudan",
      "c": "Sudan",
      "p": 489725,
      "a": []
    },
    {
      "n": "Niyala",
      "c": "Sudan",
      "p": 392373,
      "a": []
    },
    {
      "n": "Kassala",
      "c": "Sudan",
      "p": 370499,
      "a": []
    },
    {
      "n": "El Obeid",
      "c": "Sudan",
      "p": 331367.5,
      "a": []
    },
    {
      "n": "Medani",
      "c": "Sudan",
      "p": 308540.5,
      "a": []
    },
    {
      "n": "Kosti",
      "c": "Sudan",
      "p": 274463,
      "a": []
    },
    {
      "n": "El Fasher",
      "c": "Sudan",
      "p": 220906,
      "a": []
    },
    {
      "n": "Gedaref",
      "c": "Sudan",
      "p": 201282,
      "a": []
    },
    {
      "n": "Geneina",
      "c": "Sudan",
      "p": 161145.5,
      "a": []
    },
    {
      "n": "El Manaqil",
      "c": "Sudan",
      "p": 140062,
      "a": []
    },
    {
      "n": "Atbara",
      "c": "Sudan",
      "p": 138271,
      "a": []
    },
    {
      "n": "Kadugli",
      "c": "Sudan",
      "p": 132298.5,
      "a": []
    },
    {
      "n": "Shendi",
      "c": "Sudan",
      "p": 120089.5,
      "a": []
    },
    {
      "n": "Ad Damazin",
      "c": "Sudan",
      "p": 114030,
      "a": []
    },
    {
      "n": "Sennar",
      "c": "Sudan",
      "p": 103308,
      "a": []
    },
    {
      "n": "EdDamer",
      "c": "Sudan",
      "p": 94398.5,
      "a": []
    },
    {
      "n": "En Nuhud",
      "c": "Sudan",
      "p": 84623.5,
      "a": []
    },
    {
      "n": "Ed Dueim",
      "c": "Sudan",
      "p": 54825.5,
      "a": []
    },
    {
      "n": "Tokar",
      "c": "Sudan",
      "p": 47726,
      "a": []
    },
    {
      "n": "Umm Ruwaba",
      "c": "Sudan",
      "p": 35999.5,
      "a": []
    },
    {
      "n": "Berber",
      "c": "Sudan",
      "p": 35975.5,
      "a": []
    },
    {
      "n": "Dongola",
      "c": "Sudan",
      "p": 26404,
      "a": []
    },
    {
      "n": "Babanusa",
      "c": "Sudan",
      "p": 19700,
      "a": []
    },
    {
      "n": "Haiya",
      "c": "Sudan",
      "p": 17409,
      "a": []
    },
    {
      "n": "Muglad",
      "c": "Sudan",
      "p": 17344,
      "a": []
    },
    {
      "n": "Wadi Halfa",
      "c": "Sudan",
      "p": 17121,
      "a": []
    },
    {
      "n": "Merowe",
      "c": "Sudan",
      "p": 7405,
      "a": []
    },
    {
      "n": "Kerma",
      "c": "Sudan",
      "p": 3928,
      "a": []
    }
  ],
  "America/Paramaribo": [
    {
      "n": "Paramaribo",
      "c": "Suriname",
      "p": 238963,
      "a": []
    },
    {
      "n": "Cottica",
      "c": "Suriname",
      "p": 24605,
      "a": []
    },
    {
      "n": "Nieuw Nickerie",
      "c": "Suriname",
      "p": 14567.5,
      "a": []
    },
    {
      "n": "Moengo",
      "c": "Suriname",
      "p": 7420,
      "a": []
    },
    {
      "n": "Brokopondo",
      "c": "Suriname",
      "p": 6170,
      "a": []
    },
    {
      "n": "Nieuw Amsterdam",
      "c": "Suriname",
      "p": 4935,
      "a": []
    },
    {
      "n": "Brownsweg",
      "c": "Suriname",
      "p": 3639,
      "a": []
    },
    {
      "n": "Groningen",
      "c": "Suriname",
      "p": 3216,
      "a": []
    },
    {
      "n": "Onverwacht",
      "c": "Suriname",
      "p": 2105,
      "a": []
    },
    {
      "n": "Totness",
      "c": "Suriname",
      "p": 1468,
      "a": []
    }
  ],
  "Arctic/Longyearbyen": [
    {
      "n": "Longyearbyen",
      "c": "Svalbard and Jan Mayen Islands",
      "p": 1232,
      "a": []
    }
  ],
  "Africa/Mbabane": [
    {
      "n": "Manzini",
      "c": "Swaziland",
      "p": 110537,
      "a": []
    },
    {
      "n": "Mbabane",
      "c": "Swaziland",
      "p": 83178,
      "a": []
    },
    {
      "n": "Lobamba",
      "c": "Swaziland",
      "p": 7169.5,
      "a": []
    },
    {
      "n": "Siteki",
      "c": "Swaziland",
      "p": 6152,
      "a": []
    },
    {
      "n": "Piggs Peak",
      "c": "Swaziland",
      "p": 5750,
      "a": []
    },
    {
      "n": "Golela",
      "c": "Swaziland",
      "p": 3695,
      "a": []
    },
    {
      "n": "Hlatikulu",
      "c": "Swaziland",
      "p": 2748,
      "a": []
    }
  ],
  "Europe/Stockholm": [
    {
      "n": "Stockholm",
      "c": "Sweden",
      "p": 1258654.5,
      "a": []
    },
    {
      "n": "Göteborg",
      "c": "Sweden",
      "p": 520940.5,
      "a": []
    },
    {
      "n": "Malmö",
      "c": "Sweden",
      "p": 265448.5,
      "a": []
    },
    {
      "n": "Uppsala",
      "c": "Sweden",
      "p": 130425.5,
      "a": []
    },
    {
      "n": "Västerås",
      "c": "Sweden",
      "p": 100186.5,
      "a": []
    },
    {
      "n": "Örebro",
      "c": "Sweden",
      "p": 95932,
      "a": []
    },
    {
      "n": "Linköping",
      "c": "Sweden",
      "p": 94111.5,
      "a": []
    },
    {
      "n": "Helsingborg",
      "c": "Sweden",
      "p": 91164.5,
      "a": []
    },
    {
      "n": "Jönköping",
      "c": "Sweden",
      "p": 86491,
      "a": []
    },
    {
      "n": "Norrköping",
      "c": "Sweden",
      "p": 85771,
      "a": []
    },
    {
      "n": "Umeå",
      "c": "Sweden",
      "p": 76101,
      "a": []
    },
    {
      "n": "Gävle",
      "c": "Sweden",
      "p": 68235.5,
      "a": []
    },
    {
      "n": "Karlstad",
      "c": "Sweden",
      "p": 66703.5,
      "a": []
    },
    {
      "n": "Borås",
      "c": "Sweden",
      "p": 64115.5,
      "a": []
    },
    {
      "n": "Sundsvall",
      "c": "Sweden",
      "p": 60926,
      "a": []
    },
    {
      "n": "Halmstad",
      "c": "Sweden",
      "p": 55433,
      "a": []
    },
    {
      "n": "Växjö",
      "c": "Sweden",
      "p": 53067.5,
      "a": []
    },
    {
      "n": "Luleå",
      "c": "Sweden",
      "p": 47094.5,
      "a": []
    },
    {
      "n": "Östersund",
      "c": "Sweden",
      "p": 44559,
      "a": []
    },
    {
      "n": "Trollhättan",
      "c": "Sweden",
      "p": 44532.5,
      "a": []
    },
    {
      "n": "Borlänge",
      "c": "Sweden",
      "p": 38974.5,
      "a": []
    },
    {
      "n": "Falun",
      "c": "Sweden",
      "p": 36477,
      "a": []
    },
    {
      "n": "Karlskrona",
      "c": "Sweden",
      "p": 35212,
      "a": []
    },
    {
      "n": "Kalmar",
      "c": "Sweden",
      "p": 34884,
      "a": []
    },
    {
      "n": "Skellefteå",
      "c": "Sweden",
      "p": 31075,
      "a": []
    },
    {
      "n": "Nykoping",
      "c": "Sweden",
      "p": 27582,
      "a": []
    },
    {
      "n": "Kristianstad",
      "c": "Sweden",
      "p": 26763.5,
      "a": []
    },
    {
      "n": "Örnsköldsvik",
      "c": "Sweden",
      "p": 26406,
      "a": []
    },
    {
      "n": "Visby",
      "c": "Sweden",
      "p": 22281.5,
      "a": []
    },
    {
      "n": "Vannersborg",
      "c": "Sweden",
      "p": 21835,
      "a": []
    },
    {
      "n": "Harnosand",
      "c": "Sweden",
      "p": 17016,
      "a": []
    },
    {
      "n": "Mariestad",
      "c": "Sweden",
      "p": 14891,
      "a": []
    },
    {
      "n": "Kiruna",
      "c": "Sweden",
      "p": 13302,
      "a": []
    },
    {
      "n": "Bollnäs",
      "c": "Sweden",
      "p": 12771.5,
      "a": []
    }
  ],
  "Europe/Zurich": [
    {
      "n": "Zürich",
      "c": "Switzerland",
      "p": 724865,
      "a": []
    },
    {
      "n": "Geneva",
      "c": "Switzerland",
      "p": 716192.5,
      "a": [
        "GVA"
      ]
    },
    {
      "n": "Basel",
      "c": "Switzerland",
      "p": 500317.5,
      "a": []
    },
    {
      "n": "Bern",
      "c": "Switzerland",
      "p": 198480,
      "a": []
    },
    {
      "n": "Lausanne",
      "c": "Switzerland",
      "p": 191226.5,
      "a": []
    },
    {
      "n": "Luzern",
      "c": "Switzerland",
      "p": 163745.5,
      "a": []
    },
    {
      "n": "Saint Gallen",
      "c": "Switzerland",
      "p": 70572,
      "a": []
    },
    {
      "n": "Lugano",
      "c": "Switzerland",
      "p": 65876.5,
      "a": []
    },
    {
      "n": "Biel",
      "c": "Switzerland",
      "p": 63661,
      "a": []
    },
    {
      "n": "Chur",
      "c": "Switzerland",
      "p": 35361,
      "a": []
    },
    {
      "n": "Schaffhausen",
      "c": "Switzerland",
      "p": 33863,
      "a": []
    },
    {
      "n": "Fribourg",
      "c": "Switzerland",
      "p": 32827,
      "a": []
    },
    {
      "n": "Neuchatel",
      "c": "Switzerland",
      "p": 31270,
      "a": []
    },
    {
      "n": "Sion",
      "c": "Switzerland",
      "p": 28045,
      "a": []
    },
    {
      "n": "Zug",
      "c": "Switzerland",
      "p": 23435,
      "a": []
    },
    {
      "n": "Frauenfeld",
      "c": "Switzerland",
      "p": 21979,
      "a": []
    },
    {
      "n": "Bellinzona",
      "c": "Switzerland",
      "p": 16572,
      "a": []
    },
    {
      "n": "Aarau",
      "c": "Switzerland",
      "p": 15501,
      "a": []
    },
    {
      "n": "Herisau",
      "c": "Switzerland",
      "p": 15438,
      "a": []
    },
    {
      "n": "Solothurn",
      "c": "Switzerland",
      "p": 14853,
      "a": []
    },
    {
      "n": "Schwyz",
      "c": "Switzerland",
      "p": 14177,
      "a": []
    },
    {
      "n": "Liestal",
      "c": "Switzerland",
      "p": 12832,
      "a": []
    },
    {
      "n": "Delemont",
      "c": "Switzerland",
      "p": 11315,
      "a": []
    },
    {
      "n": "Sarnen",
      "c": "Switzerland",
      "p": 9410,
      "a": []
    },
    {
      "n": "Altdorf",
      "c": "Switzerland",
      "p": 8678,
      "a": []
    },
    {
      "n": "Stans",
      "c": "Switzerland",
      "p": 7475,
      "a": []
    },
    {
      "n": "Glarus",
      "c": "Switzerland",
      "p": 5681,
      "a": []
    },
    {
      "n": "Appenzell",
      "c": "Switzerland",
      "p": 5649,
      "a": []
    }
  ],
  "Asia/Damascus": [
    {
      "n": "Damascus",
      "c": "Syria",
      "p": 2466000,
      "a": []
    },
    {
      "n": "Aleppo",
      "c": "Syria",
      "p": 2170132,
      "a": []
    },
    {
      "n": "Hims",
      "c": "Syria",
      "p": 890202,
      "a": []
    },
    {
      "n": "Hamah",
      "c": "Syria",
      "p": 439796,
      "a": []
    },
    {
      "n": "Al Ladhiqiyah",
      "c": "Syria",
      "p": 439664,
      "a": []
    },
    {
      "n": "Douma",
      "c": "Syria",
      "p": 406912,
      "a": []
    },
    {
      "n": "Dayr az Zawr",
      "c": "Syria",
      "p": 275853,
      "a": []
    },
    {
      "n": "Ar Raqqah",
      "c": "Syria",
      "p": 175600.5,
      "a": []
    },
    {
      "n": "Tartus",
      "c": "Syria",
      "p": 139374.5,
      "a": []
    },
    {
      "n": "Dar'a",
      "c": "Syria",
      "p": 122225,
      "a": []
    },
    {
      "n": "Idlib",
      "c": "Syria",
      "p": 115785.5,
      "a": []
    },
    {
      "n": "Al Hasakah",
      "c": "Syria",
      "p": 104819.5,
      "a": []
    },
    {
      "n": "Al Qamishli",
      "c": "Syria",
      "p": 104107,
      "a": []
    },
    {
      "n": "Manbij",
      "c": "Syria",
      "p": 94528.5,
      "a": []
    },
    {
      "n": "Madinat ath Thawrah",
      "c": "Syria",
      "p": 85590,
      "a": []
    },
    {
      "n": "Abu Kamal",
      "c": "Syria",
      "p": 69190,
      "a": []
    },
    {
      "n": "As Suwayda",
      "c": "Syria",
      "p": 65650,
      "a": []
    },
    {
      "n": "Tadmur",
      "c": "Syria",
      "p": 53063,
      "a": []
    },
    {
      "n": "Ad Nabk",
      "c": "Syria",
      "p": 49775,
      "a": []
    },
    {
      "n": "Izaz",
      "c": "Syria",
      "p": 31534,
      "a": []
    },
    {
      "n": "Al Qunaytirah",
      "c": "Syria",
      "p": 2235.5,
      "a": []
    }
  ],
  "Asia/Taipei": [
    {
      "n": "Taipei",
      "c": "Taiwan",
      "p": 4759522.5,
      "a": []
    },
    {
      "n": "New Taipei",
      "c": "Taiwan",
      "p": 2821870,
      "a": []
    },
    {
      "n": "Kaohsiung",
      "c": "Taiwan",
      "p": 2144391.5,
      "a": []
    },
    {
      "n": "Taichung",
      "c": "Taiwan",
      "p": 1835024,
      "a": []
    },
    {
      "n": "Tainan",
      "c": "Taiwan",
      "p": 1319156,
      "a": []
    },
    {
      "n": "Zhongli",
      "c": "Taiwan",
      "p": 1001193,
      "a": []
    },
    {
      "n": "Hsinchu",
      "c": "Taiwan",
      "p": 582778.5,
      "a": []
    },
    {
      "n": "Changhua",
      "c": "Taiwan",
      "p": 493294,
      "a": []
    },
    {
      "n": "Taoyuan",
      "c": "Taiwan",
      "p": 451007,
      "a": []
    },
    {
      "n": "Keelung",
      "c": "Taiwan",
      "p": 443603.5,
      "a": []
    },
    {
      "n": "Chiayi",
      "c": "Taiwan",
      "p": 387106,
      "a": []
    },
    {
      "n": "Pingtung",
      "c": "Taiwan",
      "p": 359752.5,
      "a": []
    },
    {
      "n": "Hualien",
      "c": "Taiwan",
      "p": 229563,
      "a": []
    },
    {
      "n": "Pingzhen",
      "c": "Taiwan",
      "p": 201632,
      "a": []
    },
    {
      "n": "Zhubei",
      "c": "Taiwan",
      "p": 174003,
      "a": []
    },
    {
      "n": "Bade",
      "c": "Taiwan",
      "p": 172065,
      "a": []
    },
    {
      "n": "Yangmei",
      "c": "Taiwan",
      "p": 162511,
      "a": []
    },
    {
      "n": "Taitung",
      "c": "Taiwan",
      "p": 142292,
      "a": []
    },
    {
      "n": "Nantou",
      "c": "Taiwan",
      "p": 134349,
      "a": []
    },
    {
      "n": "Yilan",
      "c": "Taiwan",
      "p": 122915.5,
      "a": []
    },
    {
      "n": "Miaoli",
      "c": "Taiwan",
      "p": 120494,
      "a": []
    },
    {
      "n": "Douliou",
      "c": "Taiwan",
      "p": 105688,
      "a": []
    },
    {
      "n": "Magong",
      "c": "Taiwan",
      "p": 56435,
      "a": []
    },
    {
      "n": "Puzi",
      "c": "Taiwan",
      "p": 47042,
      "a": []
    },
    {
      "n": "Taibao",
      "c": "Taiwan",
      "p": 34665,
      "a": []
    }
  ],
  "Asia/Dushanbe": [
    {
      "n": "Dushanbe",
      "c": "Tajikistan",
      "p": 882822,
      "a": []
    },
    {
      "n": "Khujand",
      "c": "Tajikistan",
      "p": 291274.5,
      "a": []
    },
    {
      "n": "Qurghonteppa",
      "c": "Tajikistan",
      "p": 188287,
      "a": []
    },
    {
      "n": "Konibodom",
      "c": "Tajikistan",
      "p": 155117.5,
      "a": []
    },
    {
      "n": "Uroteppa",
      "c": "Tajikistan",
      "p": 104736,
      "a": []
    },
    {
      "n": "Kulob",
      "c": "Tajikistan",
      "p": 96975,
      "a": []
    },
    {
      "n": "Khorugh",
      "c": "Tajikistan",
      "p": 21017.5,
      "a": []
    },
    {
      "n": "Leninobod",
      "c": "Tajikistan",
      "p": 11468,
      "a": []
    },
    {
      "n": "Kuybyshevskiy",
      "c": "Tajikistan",
      "p": 8925,
      "a": []
    }
  ],
  "Africa/Dar_es_Salaam": [
    {
      "n": "Dar es Salaam",
      "c": "Tanzania",
      "p": 2814326,
      "a": []
    },
    {
      "n": "Mwanza",
      "c": "Tanzania",
      "p": 465372.5,
      "a": []
    },
    {
      "n": "Moshi",
      "c": "Tanzania",
      "p": 463873,
      "a": []
    },
    {
      "n": "Zanzibar",
      "c": "Tanzania",
      "p": 388439,
      "a": []
    },
    {
      "n": "Arusha",
      "c": "Tanzania",
      "p": 330605,
      "a": []
    },
    {
      "n": "Mbeya",
      "c": "Tanzania",
      "p": 261855.5,
      "a": []
    },
    {
      "n": "Morogoro",
      "c": "Tanzania",
      "p": 242718.5,
      "a": []
    },
    {
      "n": "Tanga",
      "c": "Tanzania",
      "p": 217155.5,
      "a": []
    },
    {
      "n": "Dodoma",
      "c": "Tanzania",
      "p": 199405,
      "a": []
    },
    {
      "n": "Kigoma",
      "c": "Tanzania",
      "p": 164268,
      "a": []
    },
    {
      "n": "Tabora",
      "c": "Tanzania",
      "p": 145893.5,
      "a": []
    },
    {
      "n": "Musoma",
      "c": "Tanzania",
      "p": 127137.5,
      "a": []
    },
    {
      "n": "Songea",
      "c": "Tanzania",
      "p": 120923,
      "a": []
    },
    {
      "n": "Iringa",
      "c": "Tanzania",
      "p": 103290,
      "a": []
    },
    {
      "n": "Shinyanga",
      "c": "Tanzania",
      "p": 93794,
      "a": []
    },
    {
      "n": "Mtwara",
      "c": "Tanzania",
      "p": 91674,
      "a": []
    },
    {
      "n": "Bukoba",
      "c": "Tanzania",
      "p": 85566,
      "a": []
    },
    {
      "n": "Tukuyu",
      "c": "Tanzania",
      "p": 77984,
      "a": []
    },
    {
      "n": "Sumbawanga",
      "c": "Tanzania",
      "p": 76546.5,
      "a": []
    },
    {
      "n": "Mpanda",
      "c": "Tanzania",
      "p": 73338,
      "a": []
    },
    {
      "n": "Kilosa",
      "c": "Tanzania",
      "p": 52558,
      "a": []
    },
    {
      "n": "Uvinza",
      "c": "Tanzania",
      "p": 52500,
      "a": []
    },
    {
      "n": "Singida",
      "c": "Tanzania",
      "p": 47749.5,
      "a": []
    },
    {
      "n": "Korogwe",
      "c": "Tanzania",
      "p": 47000,
      "a": []
    },
    {
      "n": "Njombe",
      "c": "Tanzania",
      "p": 42017.5,
      "a": []
    },
    {
      "n": "Bagamoyo",
      "c": "Tanzania",
      "p": 41609.5,
      "a": []
    },
    {
      "n": "Chake Chake",
      "c": "Tanzania",
      "p": 35822.5,
      "a": []
    },
    {
      "n": "Kahama",
      "c": "Tanzania",
      "p": 35279,
      "a": []
    },
    {
      "n": "Masasi",
      "c": "Tanzania",
      "p": 31549.5,
      "a": []
    },
    {
      "n": "Kasulu",
      "c": "Tanzania",
      "p": 31218.5,
      "a": []
    },
    {
      "n": "Lindi",
      "c": "Tanzania",
      "p": 27953.5,
      "a": []
    },
    {
      "n": "Ifakara",
      "c": "Tanzania",
      "p": 27929.5,
      "a": []
    },
    {
      "n": "Tunduma",
      "c": "Tanzania",
      "p": 27543,
      "a": []
    },
    {
      "n": "Wete",
      "c": "Tanzania",
      "p": 26450,
      "a": []
    },
    {
      "n": "Kibaha",
      "c": "Tanzania",
      "p": 23651,
      "a": []
    },
    {
      "n": "Biharamulo",
      "c": "Tanzania",
      "p": 21817.5,
      "a": []
    },
    {
      "n": "Babati",
      "c": "Tanzania",
      "p": 19117,
      "a": []
    },
    {
      "n": "Nzega",
      "c": "Tanzania",
      "p": 18325,
      "a": []
    },
    {
      "n": "Kakonko",
      "c": "Tanzania",
      "p": 16319,
      "a": []
    },
    {
      "n": "Nyahanga",
      "c": "Tanzania",
      "p": 16092,
      "a": []
    },
    {
      "n": "Kibiti",
      "c": "Tanzania",
      "p": 15553,
      "a": []
    },
    {
      "n": "Sikonge",
      "c": "Tanzania",
      "p": 14549.5,
      "a": []
    },
    {
      "n": "Karema",
      "c": "Tanzania",
      "p": 14507.5,
      "a": []
    },
    {
      "n": "Mikumi",
      "c": "Tanzania",
      "p": 12471,
      "a": []
    },
    {
      "n": "Itigi",
      "c": "Tanzania",
      "p": 11534,
      "a": []
    },
    {
      "n": "Ngorongoro",
      "c": "Tanzania",
      "p": 10836,
      "a": []
    },
    {
      "n": "Ngara",
      "c": "Tanzania",
      "p": 10744,
      "a": []
    },
    {
      "n": "Mbulu",
      "c": "Tanzania",
      "p": 10421,
      "a": []
    },
    {
      "n": "Mpwapwa",
      "c": "Tanzania",
      "p": 10093.5,
      "a": []
    },
    {
      "n": "Same",
      "c": "Tanzania",
      "p": 9768,
      "a": []
    },
    {
      "n": "Kilindoni",
      "c": "Tanzania",
      "p": 7994.5,
      "a": []
    },
    {
      "n": "Oldeani",
      "c": "Tanzania",
      "p": 7300.5,
      "a": []
    },
    {
      "n": "Mkokotoni",
      "c": "Tanzania",
      "p": 2572,
      "a": []
    },
    {
      "n": "Geita",
      "c": "Tanzania",
      "p": 1536,
      "a": []
    },
    {
      "n": "Kipili",
      "c": "Tanzania",
      "p": 1533,
      "a": []
    },
    {
      "n": "Tunduru",
      "c": "Tanzania",
      "p": 600,
      "a": []
    },
    {
      "n": "Manyoni",
      "c": "Tanzania",
      "p": 310,
      "a": []
    },
    {
      "n": "Kanyato",
      "c": "Tanzania",
      "p": 232,
      "a": []
    }
  ],
  "Asia/Bangkok": [
    {
      "n": "Bangkok",
      "c": "Thailand",
      "p": 5904238,
      "a": [
        "BKK"
      ]
    },
    {
      "n": "Samut Prakan",
      "c": "Thailand",
      "p": 388920,
      "a": []
    },
    {
      "n": "Chiang Mai",
      "c": "Thailand",
      "p": 299081.5,
      "a": []
    },
    {
      "n": "Nakhon Ratchasima",
      "c": "Thailand",
      "p": 271882.5,
      "a": []
    },
    {
      "n": "Nonthaburi",
      "c": "Thailand",
      "p": 258550,
      "a": []
    },
    {
      "n": "Hat Yai",
      "c": "Thailand",
      "p": 254825,
      "a": []
    },
    {
      "n": "Udon Thani",
      "c": "Thailand",
      "p": 239192,
      "a": []
    },
    {
      "n": "Chon Buri",
      "c": "Thailand",
      "p": 221340.5,
      "a": []
    },
    {
      "n": "Khon Kaen",
      "c": "Thailand",
      "p": 199317.5,
      "a": []
    },
    {
      "n": "Ubon Ratchathani",
      "c": "Thailand",
      "p": 198213,
      "a": []
    },
    {
      "n": "Lampang",
      "c": "Thailand",
      "p": 180110,
      "a": []
    },
    {
      "n": "Nakhon Si Thammarat",
      "c": "Thailand",
      "p": 176585.5,
      "a": []
    },
    {
      "n": "Pathum Thani",
      "c": "Thailand",
      "p": 154412,
      "a": []
    },
    {
      "n": "Surat Thani",
      "c": "Thailand",
      "p": 142414,
      "a": []
    },
    {
      "n": "Phitsanulok",
      "c": "Thailand",
      "p": 133722,
      "a": []
    },
    {
      "n": "Yala",
      "c": "Thailand",
      "p": 120849,
      "a": []
    },
    {
      "n": "Nakhon Pathom",
      "c": "Thailand",
      "p": 117927,
      "a": []
    },
    {
      "n": "Ayutthaya",
      "c": "Thailand",
      "p": 113788.5,
      "a": []
    },
    {
      "n": "Nakhon Sawan",
      "c": "Thailand",
      "p": 111915,
      "a": []
    },
    {
      "n": "Phuket",
      "c": "Thailand",
      "p": 108595.5,
      "a": []
    },
    {
      "n": "Trang",
      "c": "Thailand",
      "p": 103728.5,
      "a": []
    },
    {
      "n": "Ratchaburi",
      "c": "Thailand",
      "p": 99722,
      "a": []
    },
    {
      "n": "Chiang Rai",
      "c": "Thailand",
      "p": 97941.5,
      "a": []
    },
    {
      "n": "Pattani",
      "c": "Thailand",
      "p": 96815.5,
      "a": []
    },
    {
      "n": "Chanthaburi",
      "c": "Thailand",
      "p": 94950.5,
      "a": []
    },
    {
      "n": "Si Racha",
      "c": "Thailand",
      "p": 94204.5,
      "a": []
    },
    {
      "n": "Nong Khai",
      "c": "Thailand",
      "p": 84057,
      "a": []
    },
    {
      "n": "Saraburi",
      "c": "Thailand",
      "p": 70769,
      "a": []
    },
    {
      "n": "Chumphon",
      "c": "Thailand",
      "p": 70760.5,
      "a": []
    },
    {
      "n": "Phetchaburi",
      "c": "Thailand",
      "p": 68549,
      "a": []
    },
    {
      "n": "Sakhon Nakhon",
      "c": "Thailand",
      "p": 67755.5,
      "a": []
    },
    {
      "n": "Uttaradit",
      "c": "Thailand",
      "p": 67471.5,
      "a": []
    },
    {
      "n": "Kanchanaburi",
      "c": "Thailand",
      "p": 63699,
      "a": []
    },
    {
      "n": "Samut Sakhon",
      "c": "Thailand",
      "p": 63498,
      "a": []
    },
    {
      "n": "Kamphaeng Phet",
      "c": "Thailand",
      "p": 58787,
      "a": []
    },
    {
      "n": "Narathiwat",
      "c": "Thailand",
      "p": 57941.5,
      "a": []
    },
    {
      "n": "Prachin Buri",
      "c": "Thailand",
      "p": 56178.5,
      "a": []
    },
    {
      "n": "Chaiyaphum",
      "c": "Thailand",
      "p": 55191,
      "a": []
    },
    {
      "n": "Kalasin",
      "c": "Thailand",
      "p": 55102,
      "a": []
    },
    {
      "n": "Surin",
      "c": "Thailand",
      "p": 54604.5,
      "a": []
    },
    {
      "n": "Nan",
      "c": "Thailand",
      "p": 53576.5,
      "a": []
    },
    {
      "n": "Supham Buri",
      "c": "Thailand",
      "p": 53399,
      "a": []
    },
    {
      "n": "Maha Sarakham",
      "c": "Thailand",
      "p": 51584,
      "a": []
    },
    {
      "n": "Phetchabun",
      "c": "Thailand",
      "p": 50656,
      "a": []
    },
    {
      "n": "Chachoengsao",
      "c": "Thailand",
      "p": 49741,
      "a": []
    },
    {
      "n": "Songkhla",
      "c": "Thailand",
      "p": 48616,
      "a": []
    },
    {
      "n": "Buriram",
      "c": "Thailand",
      "p": 47292,
      "a": []
    },
    {
      "n": "Mae Sot",
      "c": "Thailand",
      "p": 45172,
      "a": []
    },
    {
      "n": "Nakhon Phanom",
      "c": "Thailand",
      "p": 44986,
      "a": []
    },
    {
      "n": "Phatthalung",
      "c": "Thailand",
      "p": 43522,
      "a": []
    },
    {
      "n": "Sisaket",
      "c": "Thailand",
      "p": 42856,
      "a": []
    },
    {
      "n": "Lop Buri",
      "c": "Thailand",
      "p": 42130.5,
      "a": []
    },
    {
      "n": "Roi Et",
      "c": "Thailand",
      "p": 39328,
      "a": []
    },
    {
      "n": "Rayong",
      "c": "Thailand",
      "p": 37035,
      "a": []
    },
    {
      "n": "Phichit",
      "c": "Thailand",
      "p": 35760,
      "a": []
    },
    {
      "n": "Samut Songkhram",
      "c": "Thailand",
      "p": 35065,
      "a": []
    },
    {
      "n": "Satun",
      "c": "Thailand",
      "p": 34544,
      "a": []
    },
    {
      "n": "Hua Hin",
      "c": "Thailand",
      "p": 33963,
      "a": []
    },
    {
      "n": "Prachuap Khiri Khan",
      "c": "Thailand",
      "p": 33521,
      "a": []
    },
    {
      "n": "Krabi",
      "c": "Thailand",
      "p": 31219,
      "a": []
    },
    {
      "n": "Loei",
      "c": "Thailand",
      "p": 29908,
      "a": []
    },
    {
      "n": "Tak",
      "c": "Thailand",
      "p": 28647.5,
      "a": []
    },
    {
      "n": "Phrae",
      "c": "Thailand",
      "p": 28254.5,
      "a": []
    },
    {
      "n": "Thung Song",
      "c": "Thailand",
      "p": 26037.5,
      "a": []
    },
    {
      "n": "Ranong",
      "c": "Thailand",
      "p": 24561,
      "a": []
    },
    {
      "n": "Yasothon",
      "c": "Thailand",
      "p": 21643,
      "a": []
    },
    {
      "n": "Trat",
      "c": "Thailand",
      "p": 21590,
      "a": []
    },
    {
      "n": "Aranyaprathet",
      "c": "Thailand",
      "p": 21354,
      "a": []
    },
    {
      "n": "Nakhon Nayok",
      "c": "Thailand",
      "p": 21309,
      "a": []
    },
    {
      "n": "Phayao",
      "c": "Thailand",
      "p": 20088,
      "a": []
    },
    {
      "n": "Sing Buri",
      "c": "Thailand",
      "p": 20046,
      "a": []
    },
    {
      "n": "Uthai Thani",
      "c": "Thailand",
      "p": 19233,
      "a": []
    },
    {
      "n": "Bua Yai",
      "c": "Thailand",
      "p": 17550.5,
      "a": []
    },
    {
      "n": "Chainat",
      "c": "Thailand",
      "p": 15469,
      "a": []
    },
    {
      "n": "Lamphun",
      "c": "Thailand",
      "p": 14030,
      "a": []
    },
    {
      "n": "Ang Thong",
      "c": "Thailand",
      "p": 13738,
      "a": []
    },
    {
      "n": "Sukhothai",
      "c": "Thailand",
      "p": 10276,
      "a": []
    },
    {
      "n": "Phangnga",
      "c": "Thailand",
      "p": 9676,
      "a": []
    },
    {
      "n": "Mae Hong Son",
      "c": "Thailand",
      "p": 9109,
      "a": []
    }
  ],
  "America/Nassau": [
    {
      "n": "Nassau",
      "c": "The Bahamas",
      "p": 194453,
      "a": []
    },
    {
      "n": "Freeport",
      "c": "The Bahamas",
      "p": 25383,
      "a": []
    }
  ],
  "Africa/Banjul": [
    {
      "n": "Brikama",
      "c": "The Gambia",
      "p": 136418,
      "a": []
    },
    {
      "n": "Banjul",
      "c": "The Gambia",
      "p": 38841.5,
      "a": []
    },
    {
      "n": "Mansa Konko",
      "c": "The Gambia",
      "p": 18672,
      "a": []
    },
    {
      "n": "Basse Santa Su",
      "c": "The Gambia",
      "p": 14380,
      "a": []
    },
    {
      "n": "Bansang",
      "c": "The Gambia",
      "p": 4646.5,
      "a": []
    },
    {
      "n": "Georgetown",
      "c": "The Gambia",
      "p": 3584,
      "a": []
    },
    {
      "n": "Kerewan",
      "c": "The Gambia",
      "p": 2751,
      "a": []
    }
  ],
  "Africa/Lome": [
    {
      "n": "Lome",
      "c": "Togo",
      "p": 1100850,
      "a": []
    },
    {
      "n": "Sokode",
      "c": "Togo",
      "p": 99725.5,
      "a": []
    },
    {
      "n": "Kpalime",
      "c": "Togo",
      "p": 98226.5,
      "a": []
    },
    {
      "n": "Atakpame",
      "c": "Togo",
      "p": 74757,
      "a": []
    },
    {
      "n": "Bassar",
      "c": "Togo",
      "p": 61845,
      "a": []
    },
    {
      "n": "Mango",
      "c": "Togo",
      "p": 40187,
      "a": []
    },
    {
      "n": "Sotouboua",
      "c": "Togo",
      "p": 21054,
      "a": []
    }
  ],
  "Pacific/Tongatapu": [
    {
      "n": "Nukualofa",
      "c": "Tonga",
      "p": 33139,
      "a": []
    },
    {
      "n": "Neiafu",
      "c": "Tonga",
      "p": 5855.5,
      "a": []
    }
  ],
  "America/Port_of_Spain": [
    {
      "n": "Port-of-Spain",
      "c": "Trinidad and Tobago",
      "p": 171982.5,
      "a": []
    },
    {
      "n": "San Fernando",
      "c": "Trinidad and Tobago",
      "p": 166039,
      "a": []
    }
  ],
  "Africa/Tunis": [
    {
      "n": "Tunis",
      "c": "Tunisia",
      "p": 1570476.5,
      "a": []
    },
    {
      "n": "Sfax",
      "c": "Tunisia",
      "p": 365164,
      "a": []
    },
    {
      "n": "Sousse",
      "c": "Tunisia",
      "p": 245563.5,
      "a": []
    },
    {
      "n": "Gabes",
      "c": "Tunisia",
      "p": 164796,
      "a": []
    },
    {
      "n": "Qairouan",
      "c": "Tunisia",
      "p": 132158,
      "a": []
    },
    {
      "n": "Bizerte",
      "c": "Tunisia",
      "p": 127555.5,
      "a": []
    },
    {
      "n": "Zarzis",
      "c": "Tunisia",
      "p": 119238.5,
      "a": []
    },
    {
      "n": "Nabeul",
      "c": "Tunisia",
      "p": 115149,
      "a": []
    },
    {
      "n": "Gafsa",
      "c": "Tunisia",
      "p": 104017.5,
      "a": []
    },
    {
      "n": "L'Ariana",
      "c": "Tunisia",
      "p": 97687,
      "a": []
    },
    {
      "n": "Qasserine",
      "c": "Tunisia",
      "p": 80072.5,
      "a": []
    },
    {
      "n": "Kasserine",
      "c": "Tunisia",
      "p": 76243,
      "a": []
    },
    {
      "n": "Tataouine",
      "c": "Tunisia",
      "p": 62577,
      "a": []
    },
    {
      "n": "Medenine",
      "c": "Tunisia",
      "p": 61705,
      "a": []
    },
    {
      "n": "Beja",
      "c": "Tunisia",
      "p": 58400,
      "a": []
    },
    {
      "n": "Monastir",
      "c": "Tunisia",
      "p": 56473,
      "a": []
    },
    {
      "n": "Jendouba",
      "c": "Tunisia",
      "p": 51408,
      "a": []
    },
    {
      "n": "Mahdia",
      "c": "Tunisia",
      "p": 45977,
      "a": []
    },
    {
      "n": "El Kef",
      "c": "Tunisia",
      "p": 42303.5,
      "a": []
    },
    {
      "n": "Sdid Bouzid",
      "c": "Tunisia",
      "p": 42098,
      "a": []
    },
    {
      "n": "Tozeur",
      "c": "Tunisia",
      "p": 37223.5,
      "a": []
    },
    {
      "n": "Siliana",
      "c": "Tunisia",
      "p": 26960,
      "a": []
    },
    {
      "n": "Kebili",
      "c": "Tunisia",
      "p": 19875,
      "a": []
    },
    {
      "n": "Zaghouan",
      "c": "Tunisia",
      "p": 16911,
      "a": []
    },
    {
      "n": "Ben Gardane",
      "c": "Tunisia",
      "p": 16603.5,
      "a": []
    },
    {
      "n": "Dehibat",
      "c": "Tunisia",
      "p": 3525,
      "a": []
    }
  ],
  "Europe/Istanbul": [
    {
      "n": "Istanbul",
      "c": "Turkey",
      "p": 10003305,
      "a": [
        "IST"
      ]
    },
    {
      "n": "Ankara",
      "c": "Turkey",
      "p": 3511689.5,
      "a": []
    },
    {
      "n": "Izmir",
      "c": "Turkey",
      "p": 2454909,
      "a": []
    },
    {
      "n": "Bursa",
      "c": "Turkey",
      "p": 1425544.5,
      "a": []
    },
    {
      "n": "Adana",
      "c": "Turkey",
      "p": 1245445,
      "a": []
    },
    {
      "n": "Gaziantep",
      "c": "Turkey",
      "p": 943262,
      "a": []
    },
    {
      "n": "Konya",
      "c": "Turkey",
      "p": 718680,
      "a": []
    },
    {
      "n": "Antalya",
      "c": "Turkey",
      "p": 703468.5,
      "a": []
    },
    {
      "n": "Diyarbakir",
      "c": "Turkey",
      "p": 640586.5,
      "a": []
    },
    {
      "n": "Icel",
      "c": "Turkey",
      "p": 577416,
      "a": []
    },
    {
      "n": "Samsun",
      "c": "Turkey",
      "p": 573722.5,
      "a": []
    },
    {
      "n": "Tarsus",
      "c": "Turkey",
      "p": 566297,
      "a": []
    },
    {
      "n": "Kayseri",
      "c": "Turkey",
      "p": 562215.5,
      "a": []
    },
    {
      "n": "Trabzon",
      "c": "Turkey",
      "p": 497556.5,
      "a": []
    },
    {
      "n": "Eskisehir",
      "c": "Turkey",
      "p": 490644.5,
      "a": []
    },
    {
      "n": "Malatya",
      "c": "Turkey",
      "p": 451689.5,
      "a": []
    },
    {
      "n": "Sanliurfa",
      "c": "Turkey",
      "p": 431407.5,
      "a": []
    },
    {
      "n": "Erzurum",
      "c": "Turkey",
      "p": 391804,
      "a": []
    },
    {
      "n": "Izmit",
      "c": "Turkey",
      "p": 383557.5,
      "a": []
    },
    {
      "n": "Kahramanmaras",
      "c": "Turkey",
      "p": 374745.5,
      "a": []
    },
    {
      "n": "Denizli",
      "c": "Turkey",
      "p": 342791,
      "a": []
    },
    {
      "n": "Van",
      "c": "Turkey",
      "p": 326262,
      "a": []
    },
    {
      "n": "Hatay",
      "c": "Turkey",
      "p": 305564,
      "a": []
    },
    {
      "n": "Sakarya",
      "c": "Turkey",
      "p": 286787,
      "a": []
    },
    {
      "n": "Batman",
      "c": "Turkey",
      "p": 276337.5,
      "a": []
    },
    {
      "n": "Elazig",
      "c": "Turkey",
      "p": 271492,
      "a": []
    },
    {
      "n": "Adapazari",
      "c": "Turkey",
      "p": 260109,
      "a": []
    },
    {
      "n": "Balikesir",
      "c": "Turkey",
      "p": 249833.5,
      "a": []
    },
    {
      "n": "Sivas",
      "c": "Turkey",
      "p": 245801.5,
      "a": []
    },
    {
      "n": "Manisa",
      "c": "Turkey",
      "p": 237700,
      "a": []
    },
    {
      "n": "Iskenderun",
      "c": "Turkey",
      "p": 228954,
      "a": []
    },
    {
      "n": "Kirikkale",
      "c": "Turkey",
      "p": 208554.5,
      "a": []
    },
    {
      "n": "Adiyaman",
      "c": "Turkey",
      "p": 195497,
      "a": []
    },
    {
      "n": "Rize",
      "c": "Turkey",
      "p": 187976.5,
      "a": []
    },
    {
      "n": "Aydin",
      "c": "Turkey",
      "p": 180939.5,
      "a": []
    },
    {
      "n": "Corum",
      "c": "Turkey",
      "p": 168544,
      "a": []
    },
    {
      "n": "Kutahya",
      "c": "Turkey",
      "p": 168459.5,
      "a": []
    },
    {
      "n": "Isparta",
      "c": "Turkey",
      "p": 161089,
      "a": []
    },
    {
      "n": "Antioch",
      "c": "Turkey",
      "p": 154803,
      "a": []
    },
    {
      "n": "Afyon",
      "c": "Turkey",
      "p": 151564,
      "a": []
    },
    {
      "n": "Usak",
      "c": "Turkey",
      "p": 147190.5,
      "a": []
    },
    {
      "n": "Ordu",
      "c": "Turkey",
      "p": 135952.5,
      "a": []
    },
    {
      "n": "Tokat",
      "c": "Turkey",
      "p": 129702,
      "a": []
    },
    {
      "n": "Zonguldak",
      "c": "Turkey",
      "p": 128573.5,
      "a": []
    },
    {
      "n": "Erzincan",
      "c": "Turkey",
      "p": 121717,
      "a": []
    },
    {
      "n": "Nusaybin",
      "c": "Turkey",
      "p": 120822.5,
      "a": []
    },
    {
      "n": "Edirne",
      "c": "Turkey",
      "p": 114424,
      "a": []
    },
    {
      "n": "Siirt",
      "c": "Turkey",
      "p": 114034,
      "a": []
    },
    {
      "n": "Karabuk",
      "c": "Turkey",
      "p": 113022.5,
      "a": []
    },
    {
      "n": "Tekirdag",
      "c": "Turkey",
      "p": 108266,
      "a": []
    },
    {
      "n": "Karaman",
      "c": "Turkey",
      "p": 103619.5,
      "a": []
    },
    {
      "n": "Giresun",
      "c": "Turkey",
      "p": 98864,
      "a": []
    },
    {
      "n": "Bolu",
      "c": "Turkey",
      "p": 96489,
      "a": []
    },
    {
      "n": "Bafra",
      "c": "Turkey",
      "p": 95198,
      "a": []
    },
    {
      "n": "Kirsehir",
      "c": "Turkey",
      "p": 94336,
      "a": []
    },
    {
      "n": "Samandagi",
      "c": "Turkey",
      "p": 93638,
      "a": []
    },
    {
      "n": "Nigde",
      "c": "Turkey",
      "p": 91039,
      "a": []
    },
    {
      "n": "Yozgat",
      "c": "Turkey",
      "p": 87881,
      "a": []
    },
    {
      "n": "Agri",
      "c": "Turkey",
      "p": 87854,
      "a": []
    },
    {
      "n": "Eregli",
      "c": "Turkey",
      "p": 86563,
      "a": []
    },
    {
      "n": "Bingol",
      "c": "Turkey",
      "p": 80568,
      "a": []
    },
    {
      "n": "Mus",
      "c": "Turkey",
      "p": 80541,
      "a": []
    },
    {
      "n": "Amasya",
      "c": "Turkey",
      "p": 77700.5,
      "a": []
    },
    {
      "n": "Nevsehir",
      "c": "Turkey",
      "p": 75527,
      "a": []
    },
    {
      "n": "Canakkale",
      "c": "Turkey",
      "p": 74667,
      "a": []
    },
    {
      "n": "Kilis",
      "c": "Turkey",
      "p": 73320,
      "a": []
    },
    {
      "n": "Soke",
      "c": "Turkey",
      "p": 72785.5,
      "a": []
    },
    {
      "n": "Polatli",
      "c": "Turkey",
      "p": 72631.5,
      "a": []
    },
    {
      "n": "Cankiri",
      "c": "Turkey",
      "p": 71379,
      "a": []
    },
    {
      "n": "Kastamonu",
      "c": "Turkey",
      "p": 70402,
      "a": []
    },
    {
      "n": "Tatvan",
      "c": "Turkey",
      "p": 68436.5,
      "a": []
    },
    {
      "n": "Luleburgaz",
      "c": "Turkey",
      "p": 67989.5,
      "a": []
    },
    {
      "n": "Burdur",
      "c": "Turkey",
      "p": 66158,
      "a": []
    },
    {
      "n": "Mardin",
      "c": "Turkey",
      "p": 64479.5,
      "a": []
    },
    {
      "n": "Kars",
      "c": "Turkey",
      "p": 62793,
      "a": []
    },
    {
      "n": "Kirklareli",
      "c": "Turkey",
      "p": 58223,
      "a": []
    },
    {
      "n": "Bitlis",
      "c": "Turkey",
      "p": 52960,
      "a": []
    },
    {
      "n": "Mugla",
      "c": "Turkey",
      "p": 44488.5,
      "a": []
    },
    {
      "n": "Hakkari",
      "c": "Turkey",
      "p": 42385,
      "a": []
    },
    {
      "n": "Bilecik",
      "c": "Turkey",
      "p": 40285,
      "a": []
    },
    {
      "n": "Sinop",
      "c": "Turkey",
      "p": 34834,
      "a": []
    },
    {
      "n": "Gumushane",
      "c": "Turkey",
      "p": 32250,
      "a": []
    },
    {
      "n": "Tunceli",
      "c": "Turkey",
      "p": 29062,
      "a": []
    },
    {
      "n": "Artvin",
      "c": "Turkey",
      "p": 27899.5,
      "a": []
    }
  ],
  "Asia/Ashgabat": [
    {
      "n": "Ashgabat",
      "c": "Turkmenistan",
      "p": 652841,
      "a": []
    },
    {
      "n": "Turkmenabat",
      "c": "Turkmenistan",
      "p": 231665.5,
      "a": []
    },
    {
      "n": "Dasoguz",
      "c": "Turkmenistan",
      "p": 183962,
      "a": []
    },
    {
      "n": "Mary",
      "c": "Turkmenistan",
      "p": 146694,
      "a": []
    },
    {
      "n": "Balkanabat",
      "c": "Turkmenistan",
      "p": 99324.5,
      "a": []
    },
    {
      "n": "Turkmenbasy",
      "c": "Turkmenistan",
      "p": 66722,
      "a": []
    },
    {
      "n": "Tejen",
      "c": "Turkmenistan",
      "p": 62649.5,
      "a": []
    },
    {
      "n": "Buzmeyin",
      "c": "Turkmenistan",
      "p": 40147,
      "a": []
    },
    {
      "n": "Atamyrat",
      "c": "Turkmenistan",
      "p": 32205,
      "a": []
    },
    {
      "n": "Koneurgench",
      "c": "Turkmenistan",
      "p": 30700,
      "a": []
    },
    {
      "n": "Gyzlarbat",
      "c": "Turkmenistan",
      "p": 30229,
      "a": []
    },
    {
      "n": "Kaka",
      "c": "Turkmenistan",
      "p": 28463,
      "a": []
    },
    {
      "n": "Celeken",
      "c": "Turkmenistan",
      "p": 1206,
      "a": []
    }
  ],
  "America/Grand_Turk": [
    {
      "n": "Grand Turk",
      "c": "Turks and Caicos Islands",
      "p": 4760.5,
      "a": []
    }
  ],
  "Pacific/Funafuti": [
    {
      "n": "Funafuti",
      "c": "Tuvalu",
      "p": 4749,
      "a": []
    }
  ],
  "Africa/Kampala": [
    {
      "n": "Kampala",
      "c": "Uganda",
      "p": 1386594.5,
      "a": []
    },
    {
      "n": "Mbale",
      "c": "Uganda",
      "p": 247084,
      "a": []
    },
    {
      "n": "Jinja",
      "c": "Uganda",
      "p": 195659.5,
      "a": []
    },
    {
      "n": "Arua",
      "c": "Uganda",
      "p": 154700,
      "a": []
    },
    {
      "n": "Gulu",
      "c": "Uganda",
      "p": 144430.5,
      "a": []
    },
    {
      "n": "Entebbe",
      "c": "Uganda",
      "p": 127414,
      "a": []
    },
    {
      "n": "Lira",
      "c": "Uganda",
      "p": 127384,
      "a": []
    },
    {
      "n": "Tororo",
      "c": "Uganda",
      "p": 96850,
      "a": []
    },
    {
      "n": "Mbarara",
      "c": "Uganda",
      "p": 83700,
      "a": []
    },
    {
      "n": "Kasese",
      "c": "Uganda",
      "p": 67269,
      "a": []
    },
    {
      "n": "Masaka",
      "c": "Uganda",
      "p": 65373,
      "a": []
    },
    {
      "n": "Bombo",
      "c": "Uganda",
      "p": 48000,
      "a": []
    },
    {
      "n": "Busia",
      "c": "Uganda",
      "p": 47100,
      "a": []
    },
    {
      "n": "Iganga",
      "c": "Uganda",
      "p": 45024,
      "a": []
    },
    {
      "n": "Kabale",
      "c": "Uganda",
      "p": 44600,
      "a": []
    },
    {
      "n": "Fort Portal",
      "c": "Uganda",
      "p": 42670,
      "a": []
    },
    {
      "n": "Mityana",
      "c": "Uganda",
      "p": 37420.5,
      "a": []
    },
    {
      "n": "Adjumani",
      "c": "Uganda",
      "p": 34700,
      "a": []
    },
    {
      "n": "Kitgum",
      "c": "Uganda",
      "p": 32785.5,
      "a": []
    },
    {
      "n": "Masindi",
      "c": "Uganda",
      "p": 31486,
      "a": []
    },
    {
      "n": "Pallisa",
      "c": "Uganda",
      "p": 30745,
      "a": []
    },
    {
      "n": "Nebbi",
      "c": "Uganda",
      "p": 30354,
      "a": []
    },
    {
      "n": "Moyo",
      "c": "Uganda",
      "p": 22434,
      "a": []
    },
    {
      "n": "Kayunga",
      "c": "Uganda",
      "p": 21704,
      "a": []
    },
    {
      "n": "Pakwach",
      "c": "Uganda",
      "p": 17541,
      "a": []
    },
    {
      "n": "Ntungamo",
      "c": "Uganda",
      "p": 16400,
      "a": []
    },
    {
      "n": "Kiboga",
      "c": "Uganda",
      "p": 14512,
      "a": []
    },
    {
      "n": "Sironko",
      "c": "Uganda",
      "p": 14100,
      "a": []
    },
    {
      "n": "Kumi",
      "c": "Uganda",
      "p": 13000,
      "a": []
    },
    {
      "n": "Kisoro",
      "c": "Uganda",
      "p": 12900,
      "a": []
    },
    {
      "n": "Kamuli",
      "c": "Uganda",
      "p": 12764,
      "a": []
    },
    {
      "n": "Mpigi",
      "c": "Uganda",
      "p": 11082,
      "a": []
    },
    {
      "n": "Mubende",
      "c": "Uganda",
      "p": 9556,
      "a": []
    },
    {
      "n": "Katakwi",
      "c": "Uganda",
      "p": 8400,
      "a": []
    },
    {
      "n": "Masindi-Port",
      "c": "Uganda",
      "p": 8073.5,
      "a": []
    },
    {
      "n": "Nakasongola",
      "c": "Uganda",
      "p": 6921,
      "a": []
    },
    {
      "n": "Kalangala",
      "c": "Uganda",
      "p": 5200,
      "a": []
    },
    {
      "n": "Kibale",
      "c": "Uganda",
      "p": 5200,
      "a": []
    },
    {
      "n": "Kaberamaido",
      "c": "Uganda",
      "p": 3400,
      "a": []
    },
    {
      "n": "Katwe",
      "c": "Uganda",
      "p": 1957,
      "a": []
    },
    {
      "n": "Kaabong",
      "c": "Uganda",
      "p": 1137,
      "a": []
    },
    {
      "n": "Soroti",
      "c": "Uganda",
      "p": 1038,
      "a": []
    },
    {
      "n": "Moroto",
      "c": "Uganda",
      "p": 371,
      "a": []
    }
  ],
  "Europe/Kyiv": [
    {
      "n": "Kyiv",
      "c": "Ukraine",
      "p": 2185754,
      "a": []
    },
    {
      "n": "Kharkiv",
      "c": "Ukraine",
      "p": 1338063.5,
      "a": []
    },
    {
      "n": "Dnipropetrovsk",
      "c": "Ukraine",
      "p": 949424.5,
      "a": []
    },
    {
      "n": "Donetsk",
      "c": "Ukraine",
      "p": 874137.5,
      "a": []
    },
    {
      "n": "Odessa",
      "c": "Ukraine",
      "p": 847500.5,
      "a": []
    },
    {
      "n": "Lvov",
      "c": "Ukraine",
      "p": 760841.5,
      "a": []
    },
    {
      "n": "Kryvyy Rih",
      "c": "Ukraine",
      "p": 571643.5,
      "a": []
    },
    {
      "n": "Mariupol",
      "c": "Ukraine",
      "p": 416435,
      "a": []
    },
    {
      "n": "Luhansk",
      "c": "Ukraine",
      "p": 408931,
      "a": []
    },
    {
      "n": "Mykolayiv",
      "c": "Ukraine",
      "p": 352917.5,
      "a": []
    },
    {
      "n": "Vinnytsya",
      "c": "Ukraine",
      "p": 349627,
      "a": []
    },
    {
      "n": "Horlivka",
      "c": "Ukraine",
      "p": 337717.5,
      "a": []
    },
    {
      "n": "Khmelnytskyy",
      "c": "Ukraine",
      "p": 322093,
      "a": []
    },
    {
      "n": "Makiyivka",
      "c": "Ukraine",
      "p": 318882.5,
      "a": []
    },
    {
      "n": "Poltava",
      "c": "Ukraine",
      "p": 302217.5,
      "a": []
    },
    {
      "n": "Chernihiv",
      "c": "Ukraine",
      "p": 293656.5,
      "a": []
    },
    {
      "n": "Sumy",
      "c": "Ukraine",
      "p": 289801,
      "a": []
    },
    {
      "n": "Cherkasy",
      "c": "Ukraine",
      "p": 285694.5,
      "a": []
    },
    {
      "n": "Zhytomyr",
      "c": "Ukraine",
      "p": 278581,
      "a": []
    },
    {
      "n": "Kherson",
      "c": "Ukraine",
      "p": 278578.5,
      "a": []
    },
    {
      "n": "Chernivtsi",
      "c": "Ukraine",
      "p": 267250.5,
      "a": []
    },
    {
      "n": "Rivne",
      "c": "Ukraine",
      "p": 253261,
      "a": []
    },
    {
      "n": "Kirovohrad",
      "c": "Ukraine",
      "p": 243573.5,
      "a": []
    },
    {
      "n": "Ternopil",
      "c": "Ukraine",
      "p": 240222,
      "a": []
    },
    {
      "n": "Ivano-Frankivsk",
      "c": "Ukraine",
      "p": 222719.5,
      "a": []
    },
    {
      "n": "Lutsk",
      "c": "Ukraine",
      "p": 211980,
      "a": []
    },
    {
      "n": "Kremenchuk",
      "c": "Ukraine",
      "p": 209496.5,
      "a": []
    },
    {
      "n": "Bila Tserkva",
      "c": "Ukraine",
      "p": 192418.5,
      "a": []
    },
    {
      "n": "Kramatorsk",
      "c": "Ukraine",
      "p": 178902.5,
      "a": []
    },
    {
      "n": "Nikopol",
      "c": "Ukraine",
      "p": 119110,
      "a": []
    },
    {
      "n": "Lysychansk",
      "c": "Ukraine",
      "p": 118010.5,
      "a": []
    },
    {
      "n": "Kamyanets-Podilskyy",
      "c": "Ukraine",
      "p": 107329,
      "a": []
    },
    {
      "n": "Drohobych",
      "c": "Ukraine",
      "p": 101837.5,
      "a": []
    },
    {
      "n": "Konotop",
      "c": "Ukraine",
      "p": 97672.5,
      "a": []
    },
    {
      "n": "Nizhyn",
      "c": "Ukraine",
      "p": 95893.5,
      "a": []
    },
    {
      "n": "Shostka",
      "c": "Ukraine",
      "p": 91128.5,
      "a": []
    },
    {
      "n": "Uman",
      "c": "Ukraine",
      "p": 87620,
      "a": []
    },
    {
      "n": "Izmayil",
      "c": "Ukraine",
      "p": 82839.5,
      "a": []
    },
    {
      "n": "Kupyansk",
      "c": "Ukraine",
      "p": 78870,
      "a": []
    },
    {
      "n": "Brovary",
      "c": "Ukraine",
      "p": 77355.5,
      "a": []
    },
    {
      "n": "Korosten",
      "c": "Ukraine",
      "p": 68992,
      "a": []
    },
    {
      "n": "Kovel",
      "c": "Ukraine",
      "p": 68850.5,
      "a": []
    },
    {
      "n": "Illichivsk",
      "c": "Ukraine",
      "p": 53906,
      "a": []
    },
    {
      "n": "Voznesensk",
      "c": "Ukraine",
      "p": 43122,
      "a": []
    },
    {
      "n": "Chernobyl",
      "c": "Ukraine",
      "p": 0,
      "a": []
    }
  ],
  "Europe/Uzhgorod": [
    {
      "n": "Uzhgorod",
      "c": "Ukraine",
      "p": 134355,
      "a": []
    }
  ],
  "Europe/Zaporozhye": [
    {
      "n": "Zaporizhzhya",
      "c": "Ukraine",
      "p": 600778.5,
      "a": []
    },
    {
      "n": "Melitopol",
      "c": "Ukraine",
      "p": 135850,
      "a": []
    },
    {
      "n": "Berdyansk",
      "c": "Ukraine",
      "p": 88409,
      "a": []
    }
  ],
  "Europe/Simferopol": [
    {
      "n": "Sevastapol",
      "c": "Ukraine",
      "p": 346832.5,
      "a": []
    },
    {
      "n": "Simferopol",
      "c": "Ukraine",
      "p": 305882.5,
      "a": []
    },
    {
      "n": "Kerch",
      "c": "Ukraine",
      "p": 133972,
      "a": []
    },
    {
      "n": "Yevpatoriya",
      "c": "Ukraine",
      "p": 90588,
      "a": []
    },
    {
      "n": "Yalta",
      "c": "Ukraine",
      "p": 76814.5,
      "a": []
    },
    {
      "n": "Dzhankoy",
      "c": "Ukraine",
      "p": 42805,
      "a": []
    }
  ],
  "Asia/Dubai": [
    {
      "n": "Dubai",
      "c": "United Arab Emirates",
      "p": 1258173.5,
      "a": [
        "DXB"
      ]
    },
    {
      "n": "Sharjah",
      "c": "United Arab Emirates",
      "p": 952015.5,
      "a": []
    },
    {
      "n": "Abu Dhabi",
      "c": "United Arab Emirates",
      "p": 581861,
      "a": []
    },
    {
      "n": "Al Ayn",
      "c": "United Arab Emirates",
      "p": 352500.5,
      "a": []
    },
    {
      "n": "Ras al Khaymah",
      "c": "United Arab Emirates",
      "p": 138399,
      "a": []
    },
    {
      "n": "Al Fujayrah",
      "c": "United Arab Emirates",
      "p": 78289,
      "a": []
    },
    {
      "n": "Jabal Ali",
      "c": "United Arab Emirates",
      "p": 55817,
      "a": []
    },
    {
      "n": "Umm al Qaywayn",
      "c": "United Arab Emirates",
      "p": 38531,
      "a": []
    }
  ],
  "Europe/London": [
    {
      "n": "London",
      "c": "United Kingdom",
      "p": 7994104.5,
      "a": [
        "LON"
      ]
    },
    {
      "n": "Birmingham",
      "c": "United Kingdom",
      "p": 1634666.5,
      "a": []
    },
    {
      "n": "Manchester",
      "c": "United Kingdom",
      "p": 1312757.5,
      "a": []
    },
    {
      "n": "Leeds",
      "c": "United Kingdom",
      "p": 992061.5,
      "a": []
    },
    {
      "n": "Sheffield",
      "c": "United Kingdom",
      "p": 922800,
      "a": []
    },
    {
      "n": "Glasgow",
      "c": "United Kingdom",
      "p": 885134,
      "a": []
    },
    {
      "n": "Liverpool",
      "c": "United Kingdom",
      "p": 639972.5,
      "a": []
    },
    {
      "n": "Cardiff",
      "c": "United Kingdom",
      "p": 603750,
      "a": []
    },
    {
      "n": "Nottingham",
      "c": "United Kingdom",
      "p": 565650,
      "a": []
    },
    {
      "n": "Newcastle",
      "c": "United Kingdom",
      "p": 537191,
      "a": []
    },
    {
      "n": "Bristol",
      "c": "United Kingdom",
      "p": 492120.5,
      "a": []
    },
    {
      "n": "Edinburgh",
      "c": "United Kingdom",
      "p": 470378.5,
      "a": []
    },
    {
      "n": "Leicester",
      "c": "United Kingdom",
      "p": 398611,
      "a": []
    },
    {
      "n": "Bradford",
      "c": "United Kingdom",
      "p": 397708.5,
      "a": []
    },
    {
      "n": "Southend-on-Sea",
      "c": "United Kingdom",
      "p": 395993,
      "a": []
    },
    {
      "n": "Southampton",
      "c": "United Kingdom",
      "p": 384417,
      "a": []
    },
    {
      "n": "Belfast",
      "c": "United Kingdom",
      "p": 362588,
      "a": []
    },
    {
      "n": "Coventry",
      "c": "United Kingdom",
      "p": 348292,
      "a": []
    },
    {
      "n": "Stoke",
      "c": "United Kingdom",
      "p": 325610,
      "a": []
    },
    {
      "n": "Portsmouth",
      "c": "United Kingdom",
      "p": 323676,
      "a": []
    },
    {
      "n": "Brighton",
      "c": "United Kingdom",
      "p": 321004.5,
      "a": []
    },
    {
      "n": "Sunderland",
      "c": "United Kingdom",
      "p": 315449.5,
      "a": []
    },
    {
      "n": "Kingston upon Hull",
      "c": "United Kingdom",
      "p": 297398.5,
      "a": []
    },
    {
      "n": "Bournemouth",
      "c": "United Kingdom",
      "p": 295272.5,
      "a": []
    },
    {
      "n": "Middlesbrough",
      "c": "United Kingdom",
      "p": 279374.5,
      "a": []
    },
    {
      "n": "Reading",
      "c": "United Kingdom",
      "p": 257752,
      "a": []
    },
    {
      "n": "Plymouth",
      "c": "United Kingdom",
      "p": 239436,
      "a": []
    },
    {
      "n": "Swansea",
      "c": "United Kingdom",
      "p": 232611,
      "a": []
    },
    {
      "n": "Luton",
      "c": "United Kingdom",
      "p": 214813.5,
      "a": []
    },
    {
      "n": "Blackpool",
      "c": "United Kingdom",
      "p": 207946.5,
      "a": []
    },
    {
      "n": "Aberdeen",
      "c": "United Kingdom",
      "p": 186577,
      "a": []
    },
    {
      "n": "Norwich",
      "c": "United Kingdom",
      "p": 184196,
      "a": []
    },
    {
      "n": "Oxford",
      "c": "United Kingdom",
      "p": 173681,
      "a": []
    },
    {
      "n": "York",
      "c": "United Kingdom",
      "p": 151574.5,
      "a": []
    },
    {
      "n": "Dundee",
      "c": "United Kingdom",
      "p": 151013.5,
      "a": []
    },
    {
      "n": "Peterborough",
      "c": "United Kingdom",
      "p": 140141,
      "a": []
    },
    {
      "n": "Ipswich",
      "c": "United Kingdom",
      "p": 139012,
      "a": []
    },
    {
      "n": "Cambridge",
      "c": "United Kingdom",
      "p": 128488,
      "a": []
    },
    {
      "n": "Exeter",
      "c": "United Kingdom",
      "p": 108242,
      "a": []
    },
    {
      "n": "Bath",
      "c": "United Kingdom",
      "p": 92679,
      "a": []
    },
    {
      "n": "Chester",
      "c": "United Kingdom",
      "p": 83285.5,
      "a": []
    },
    {
      "n": "Londonderry",
      "c": "United Kingdom",
      "p": 82635,
      "a": []
    },
    {
      "n": "Scarborough",
      "c": "United Kingdom",
      "p": 70571,
      "a": []
    },
    {
      "n": "Carlisle",
      "c": "United Kingdom",
      "p": 69270,
      "a": []
    },
    {
      "n": "Greenock",
      "c": "United Kingdom",
      "p": 59065,
      "a": []
    },
    {
      "n": "Ayr",
      "c": "United Kingdom",
      "p": 57277.5,
      "a": []
    },
    {
      "n": "Inverness",
      "c": "United Kingdom",
      "p": 42956.5,
      "a": []
    },
    {
      "n": "Perth",
      "c": "United Kingdom",
      "p": 39654,
      "a": []
    },
    {
      "n": "Dover",
      "c": "United Kingdom",
      "p": 32270,
      "a": []
    },
    {
      "n": "Dumfries",
      "c": "United Kingdom",
      "p": 31044,
      "a": []
    },
    {
      "n": "Omagh",
      "c": "United Kingdom",
      "p": 18691,
      "a": []
    },
    {
      "n": "Penzance",
      "c": "United Kingdom",
      "p": 18150.5,
      "a": []
    },
    {
      "n": "Lisburn",
      "c": "United Kingdom",
      "p": 12899,
      "a": []
    },
    {
      "n": "Fort William",
      "c": "United Kingdom",
      "p": 9652,
      "a": []
    },
    {
      "n": "Wick",
      "c": "United Kingdom",
      "p": 7147,
      "a": []
    },
    {
      "n": "Kirkwall",
      "c": "United Kingdom",
      "p": 5826.5,
      "a": []
    },
    {
      "n": "Lerwick",
      "c": "United Kingdom",
      "p": 5604,
      "a": []
    }
  ],
  "America/Chicago": [
    {
      "n": "Chicago",
      "c": "United States of America",
      "p": 5915976,
      "a": [
        "CHI"
      ]
    },
    {
      "n": "Houston",
      "c": "United States of America",
      "p": 4053287,
      "a": [
        "HOU"
      ]
    },
    {
      "n": "Dallas",
      "c": "United States of America",
      "p": 3004852,
      "a": [
        "DFW",
        "DAL"
      ]
    },
    {
      "n": "Minneapolis",
      "c": "United States of America",
      "p": 1491886.5,
      "a": []
    },
    {
      "n": "San Antonio",
      "c": "United States of America",
      "p": 1364905,
      "a": []
    },
    {
      "n": "St. Louis",
      "c": "United States of America",
      "p": 1259958,
      "a": []
    },
    {
      "n": "Ft. Worth",
      "c": "United States of America",
      "p": 1090830,
      "a": []
    },
    {
      "n": "Milwaukee",
      "c": "United States of America",
      "p": 983590,
      "a": []
    },
    {
      "n": "Kansas City",
      "c": "United States of America",
      "p": 955272.5,
      "a": []
    },
    {
      "n": "Austin",
      "c": "United States of America",
      "p": 919684,
      "a": [
        "AUS"
      ]
    },
    {
      "n": "Memphis",
      "c": "United States of America",
      "p": 753843.5,
      "a": []
    },
    {
      "n": "Nashville",
      "c": "United States of America",
      "p": 703926,
      "a": []
    },
    {
      "n": "Birmingham",
      "c": "United States of America",
      "p": 670142,
      "a": []
    },
    {
      "n": "Tulsa",
      "c": "United States of America",
      "p": 669434,
      "a": []
    },
    {
      "n": "Oklahoma City",
      "c": "United States of America",
      "p": 660475,
      "a": []
    },
    {
      "n": "Omaha",
      "c": "United States of America",
      "p": 643034,
      "a": []
    },
    {
      "n": "Arlington",
      "c": "United States of America",
      "p": 545107.5,
      "a": []
    },
    {
      "n": "New Orleans",
      "c": "United States of America",
      "p": 527428.5,
      "a": []
    },
    {
      "n": "St. Paul",
      "c": "United States of America",
      "p": 509961,
      "a": []
    },
    {
      "n": "Pasadena",
      "c": "United States of America",
      "p": 388767.5,
      "a": []
    },
    {
      "n": "Wichita",
      "c": "United States of America",
      "p": 378543.5,
      "a": []
    },
    {
      "n": "Joliet",
      "c": "United States of America",
      "p": 362946.5,
      "a": []
    },
    {
      "n": "Gary",
      "c": "United States of America",
      "p": 335737,
      "a": []
    },
    {
      "n": "Kansas City",
      "c": "United States of America",
      "p": 324221.5,
      "a": []
    },
    {
      "n": "Laredo",
      "c": "United States of America",
      "p": 322768.5,
      "a": []
    },
    {
      "n": "Baton Rouge",
      "c": "United States of America",
      "p": 322710.5,
      "a": []
    },
    {
      "n": "Des Moines",
      "c": "United States of America",
      "p": 286917.5,
      "a": []
    },
    {
      "n": "Madison",
      "c": "United States of America",
      "p": 276036,
      "a": []
    },
    {
      "n": "Aurora",
      "c": "United States of America",
      "p": 273949.5,
      "a": []
    },
    {
      "n": "Metairie",
      "c": "United States of America",
      "p": 270171,
      "a": []
    },
    {
      "n": "Corpus Christi",
      "c": "United States of America",
      "p": 249977.5,
      "a": []
    },
    {
      "n": "Columbia",
      "c": "United States of America",
      "p": 244754,
      "a": []
    },
    {
      "n": "Lincoln",
      "c": "United States of America",
      "p": 244146,
      "a": []
    },
    {
      "n": "Elgin",
      "c": "United States of America",
      "p": 244050,
      "a": []
    },
    {
      "n": "McAllen",
      "c": "United States of America",
      "p": 243291,
      "a": []
    },
    {
      "n": "Little Rock",
      "c": "United States of America",
      "p": 227555,
      "a": []
    },
    {
      "n": "Shreveport",
      "c": "United States of America",
      "p": 224099,
      "a": []
    },
    {
      "n": "Mobile",
      "c": "United States of America",
      "p": 221870,
      "a": []
    },
    {
      "n": "Jackson",
      "c": "United States of America",
      "p": 213799,
      "a": []
    },
    {
      "n": "St. Charles",
      "c": "United States of America",
      "p": 213139.5,
      "a": []
    },
    {
      "n": "Lubbock",
      "c": "United States of America",
      "p": 212343.5,
      "a": []
    },
    {
      "n": "Evanston",
      "c": "United States of America",
      "p": 212243,
      "a": []
    },
    {
      "n": "Rockford",
      "c": "United States of America",
      "p": 204371.5,
      "a": []
    },
    {
      "n": "Montgomery",
      "c": "United States of America",
      "p": 194491.5,
      "a": []
    },
    {
      "n": "Huntsville",
      "c": "United States of America",
      "p": 185474.5,
      "a": []
    },
    {
      "n": "Springfield",
      "c": "United States of America",
      "p": 180691,
      "a": []
    },
    {
      "n": "Amarillo",
      "c": "United States of America",
      "p": 178526,
      "a": []
    },
    {
      "n": "Davenport",
      "c": "United States of America",
      "p": 178282.5,
      "a": []
    },
    {
      "n": "Brownsville",
      "c": "United States of America",
      "p": 174707,
      "a": []
    },
    {
      "n": "Barlett",
      "c": "United States of America",
      "p": 164843.5,
      "a": []
    },
    {
      "n": "Waukesha",
      "c": "United States of America",
      "p": 159012,
      "a": []
    },
    {
      "n": "Lakeville",
      "c": "United States of America",
      "p": 156151,
      "a": []
    },
    {
      "n": "Green Bay",
      "c": "United States of America",
      "p": 149811.5,
      "a": []
    },
    {
      "n": "Cedar Rapids",
      "c": "United States of America",
      "p": 149338.5,
      "a": []
    },
    {
      "n": "Sioux Falls",
      "c": "United States of America",
      "p": 148030,
      "a": []
    },
    {
      "n": "Pensacola",
      "c": "United States of America",
      "p": 145319.5,
      "a": []
    },
    {
      "n": "Evansville",
      "c": "United States of America",
      "p": 144788,
      "a": []
    },
    {
      "n": "Waukegan",
      "c": "United States of America",
      "p": 144539,
      "a": []
    },
    {
      "n": "Waco",
      "c": "United States of America",
      "p": 143157,
      "a": []
    },
    {
      "n": "Peoria",
      "c": "United States of America",
      "p": 142622,
      "a": []
    },
    {
      "n": "Denton",
      "c": "United States of America",
      "p": 138952.5,
      "a": []
    },
    {
      "n": "Appleton",
      "c": "United States of America",
      "p": 136888.5,
      "a": []
    },
    {
      "n": "Lafayette",
      "c": "United States of America",
      "p": 135205.5,
      "a": []
    },
    {
      "n": "Independence",
      "c": "United States of America",
      "p": 130695,
      "a": []
    },
    {
      "n": "Fargo",
      "c": "United States of America",
      "p": 127472.5,
      "a": []
    },
    {
      "n": "Topeka",
      "c": "United States of America",
      "p": 126830.5,
      "a": []
    },
    {
      "n": "Springfield",
      "c": "United States of America",
      "p": 125345,
      "a": []
    },
    {
      "n": "Clarksville",
      "c": "United States of America",
      "p": 122115,
      "a": []
    },
    {
      "n": "Killeen",
      "c": "United States of America",
      "p": 120464,
      "a": []
    },
    {
      "n": "Edinburg",
      "c": "United States of America",
      "p": 114573.5,
      "a": []
    },
    {
      "n": "Norman",
      "c": "United States of America",
      "p": 113525,
      "a": []
    },
    {
      "n": "Fayetteville",
      "c": "United States of America",
      "p": 108267.5,
      "a": []
    },
    {
      "n": "Bryan",
      "c": "United States of America",
      "p": 108156.5,
      "a": []
    },
    {
      "n": "Abilene",
      "c": "United States of America",
      "p": 108008,
      "a": []
    },
    {
      "n": "Beaumont",
      "c": "United States of America",
      "p": 107455.5,
      "a": []
    },
    {
      "n": "Racine",
      "c": "United States of America",
      "p": 105458.5,
      "a": []
    },
    {
      "n": "Rochester",
      "c": "United States of America",
      "p": 102433,
      "a": []
    },
    {
      "n": "Rock Island",
      "c": "United States of America",
      "p": 102055.5,
      "a": []
    },
    {
      "n": "Tyler",
      "c": "United States of America",
      "p": 101561.5,
      "a": []
    },
    {
      "n": "Tuscaloosa",
      "c": "United States of America",
      "p": 100594.5,
      "a": []
    },
    {
      "n": "Murfreesboro",
      "c": "United States of America",
      "p": 100237,
      "a": []
    },
    {
      "n": "Bloomington",
      "c": "United States of America",
      "p": 99842.5,
      "a": []
    },
    {
      "n": "Odessa",
      "c": "United States of America",
      "p": 98655,
      "a": []
    },
    {
      "n": "Midland",
      "c": "United States of America",
      "p": 98141.5,
      "a": []
    },
    {
      "n": "Wichita Falls",
      "c": "United States of America",
      "p": 97429,
      "a": []
    },
    {
      "n": "Belleville",
      "c": "United States of America",
      "p": 92409.5,
      "a": []
    },
    {
      "n": "Urbana",
      "c": "United States of America",
      "p": 91792.5,
      "a": []
    },
    {
      "n": "Lawrence",
      "c": "United States of America",
      "p": 88020,
      "a": []
    },
    {
      "n": "Fort Smith",
      "c": "United States of America",
      "p": 87986.5,
      "a": []
    },
    {
      "n": "San Angelo",
      "c": "United States of America",
      "p": 87297.5,
      "a": []
    },
    {
      "n": "Sioux City",
      "c": "United States of America",
      "p": 87090,
      "a": []
    },
    {
      "n": "Harlingen",
      "c": "United States of America",
      "p": 86749,
      "a": []
    },
    {
      "n": "St. Cloud",
      "c": "United States of America",
      "p": 85974,
      "a": []
    },
    {
      "n": "Lawton",
      "c": "United States of America",
      "p": 85795.5,
      "a": []
    },
    {
      "n": "Waterloo",
      "c": "United States of America",
      "p": 82091.5,
      "a": []
    },
    {
      "n": "Duluth",
      "c": "United States of America",
      "p": 82026.5,
      "a": []
    },
    {
      "n": "Iowa City",
      "c": "United States of America",
      "p": 81343,
      "a": []
    },
    {
      "n": "Council Bluffs",
      "c": "United States of America",
      "p": 80284.5,
      "a": []
    },
    {
      "n": "Southaven",
      "c": "United States of America",
      "p": 79923,
      "a": []
    },
    {
      "n": "Lake Charles",
      "c": "United States of America",
      "p": 77065,
      "a": []
    }
  ],
  "America/Denver": [
    {
      "n": "Denver",
      "c": "United States of America",
      "p": 1930799.5,
      "a": [
        "DEN"
      ]
    },
    {
      "n": "Albuquerque",
      "c": "United States of America",
      "p": 725723,
      "a": []
    },
    {
      "n": "El Paso",
      "c": "United States of America",
      "p": 658331,
      "a": []
    },
    {
      "n": "Salt Lake City",
      "c": "United States of America",
      "p": 572013,
      "a": []
    },
    {
      "n": "Aurora",
      "c": "United States of America",
      "p": 431966.5,
      "a": []
    },
    {
      "n": "Colorado Springs",
      "c": "United States of America",
      "p": 427272,
      "a": []
    },
    {
      "n": "Provo",
      "c": "United States of America",
      "p": 231238,
      "a": []
    },
    {
      "n": "Ogden",
      "c": "United States of America",
      "p": 227774,
      "a": []
    },
    {
      "n": "Fort Collins",
      "c": "United States of America",
      "p": 178818.5,
      "a": []
    },
    {
      "n": "Pueblo",
      "c": "United States of America",
      "p": 108244,
      "a": []
    },
    {
      "n": "Boulder",
      "c": "United States of America",
      "p": 106897.5,
      "a": []
    },
    {
      "n": "Greeley",
      "c": "United States of America",
      "p": 106142.5,
      "a": []
    },
    {
      "n": "Billings",
      "c": "United States of America",
      "p": 102151.5,
      "a": []
    },
    {
      "n": "Las Cruces",
      "c": "United States of America",
      "p": 97675.5,
      "a": []
    },
    {
      "n": "Santa Fe",
      "c": "United States of America",
      "p": 80943,
      "a": []
    },
    {
      "n": "St. George",
      "c": "United States of America",
      "p": 79988,
      "a": []
    },
    {
      "n": "Grand Junction",
      "c": "United States of America",
      "p": 75076,
      "a": []
    },
    {
      "n": "Missoula",
      "c": "United States of America",
      "p": 68010,
      "a": []
    },
    {
      "n": "Rapid City",
      "c": "United States of America",
      "p": 67760,
      "a": []
    },
    {
      "n": "Cheyenne",
      "c": "United States of America",
      "p": 64185,
      "a": []
    },
    {
      "n": "Great Falls",
      "c": "United States of America",
      "p": 61316.5,
      "a": []
    },
    {
      "n": "Logan",
      "c": "United States of America",
      "p": 58664,
      "a": []
    },
    {
      "n": "Casper",
      "c": "United States of America",
      "p": 56149,
      "a": []
    },
    {
      "n": "Roswell",
      "c": "United States of America",
      "p": 45082.5,
      "a": []
    },
    {
      "n": "Farmington",
      "c": "United States of America",
      "p": 42917.5,
      "a": []
    },
    {
      "n": "Bozeman",
      "c": "United States of America",
      "p": 39049.5,
      "a": []
    },
    {
      "n": "Alamogordo",
      "c": "United States of America",
      "p": 33710.5,
      "a": []
    },
    {
      "n": "Clovis",
      "c": "United States of America",
      "p": 33477.5,
      "a": []
    },
    {
      "n": "Helena",
      "c": "United States of America",
      "p": 33032.5,
      "a": []
    },
    {
      "n": "Butte",
      "c": "United States of America",
      "p": 31478,
      "a": []
    },
    {
      "n": "Hobbs",
      "c": "United States of America",
      "p": 28375.5,
      "a": []
    },
    {
      "n": "Gillette",
      "c": "United States of America",
      "p": 26107,
      "a": []
    },
    {
      "n": "Laramie",
      "c": "United States of America",
      "p": 25587.5,
      "a": []
    },
    {
      "n": "Cedar City",
      "c": "United States of America",
      "p": 25371.5,
      "a": []
    },
    {
      "n": "Carlsbad",
      "c": "United States of America",
      "p": 25240,
      "a": []
    },
    {
      "n": "Kalispell",
      "c": "United States of America",
      "p": 25040,
      "a": []
    },
    {
      "n": "Gallup",
      "c": "United States of America",
      "p": 21627,
      "a": []
    },
    {
      "n": "Scottsbluff",
      "c": "United States of America",
      "p": 20172,
      "a": []
    },
    {
      "n": "Durango",
      "c": "United States of America",
      "p": 19127.5,
      "a": []
    },
    {
      "n": "Montrose",
      "c": "United States of America",
      "p": 18463.5,
      "a": []
    },
    {
      "n": "Dickinson",
      "c": "United States of America",
      "p": 15987.5,
      "a": []
    },
    {
      "n": "Deming",
      "c": "United States of America",
      "p": 15523,
      "a": []
    },
    {
      "n": "Las Vegas",
      "c": "United States of America",
      "p": 15521,
      "a": [
        "LAS"
      ]
    },
    {
      "n": "Los Alamos",
      "c": "United States of America",
      "p": 11997,
      "a": []
    },
    {
      "n": "Glenwood Springs",
      "c": "United States of America",
      "p": 11272,
      "a": []
    },
    {
      "n": "Vernal",
      "c": "United States of America",
      "p": 11175.5,
      "a": []
    },
    {
      "n": "Riverton",
      "c": "United States of America",
      "p": 10350,
      "a": []
    },
    {
      "n": "Havre",
      "c": "United States of America",
      "p": 10266.5,
      "a": []
    },
    {
      "n": "Green River",
      "c": "United States of America",
      "p": 10239.5,
      "a": []
    },
    {
      "n": "Winslow",
      "c": "United States of America",
      "p": 9931,
      "a": []
    },
    {
      "n": "Craig",
      "c": "United States of America",
      "p": 9315.5,
      "a": []
    },
    {
      "n": "Price",
      "c": "United States of America",
      "p": 9175,
      "a": []
    },
    {
      "n": "Cody",
      "c": "United States of America",
      "p": 8976.5,
      "a": []
    },
    {
      "n": "Trinidad",
      "c": "United States of America",
      "p": 8701.5,
      "a": []
    },
    {
      "n": "Lamar",
      "c": "United States of America",
      "p": 8567,
      "a": []
    },
    {
      "n": "Rawlins",
      "c": "United States of America",
      "p": 8458,
      "a": []
    },
    {
      "n": "Miles City",
      "c": "United States of America",
      "p": 8399.5,
      "a": []
    },
    {
      "n": "Alliance",
      "c": "United States of America",
      "p": 8269,
      "a": []
    },
    {
      "n": "Socorro",
      "c": "United States of America",
      "p": 8117,
      "a": []
    },
    {
      "n": "Richfield",
      "c": "United States of America",
      "p": 7308.5,
      "a": []
    },
    {
      "n": "Raton",
      "c": "United States of America",
      "p": 6820,
      "a": []
    },
    {
      "n": "Lander",
      "c": "United States of America",
      "p": 6742,
      "a": []
    },
    {
      "n": "Truth or Consequences",
      "c": "United States of America",
      "p": 6479,
      "a": []
    },
    {
      "n": "Gunnison",
      "c": "United States of America",
      "p": 6273,
      "a": []
    },
    {
      "n": "Sidney",
      "c": "United States of America",
      "p": 6221.5,
      "a": []
    },
    {
      "n": "Powell",
      "c": "United States of America",
      "p": 6054,
      "a": []
    },
    {
      "n": "Douglas",
      "c": "United States of America",
      "p": 5838,
      "a": []
    },
    {
      "n": "Chadron",
      "c": "United States of America",
      "p": 5686.5,
      "a": []
    },
    {
      "n": "Moab",
      "c": "United States of America",
      "p": 5309,
      "a": []
    },
    {
      "n": "Glendive",
      "c": "United States of America",
      "p": 5277.5,
      "a": []
    },
    {
      "n": "Tucumcari",
      "c": "United States of America",
      "p": 5259.5,
      "a": []
    },
    {
      "n": "Polson",
      "c": "United States of America",
      "p": 5079,
      "a": []
    },
    {
      "n": "Nephi",
      "c": "United States of America",
      "p": 4960,
      "a": []
    },
    {
      "n": "Goodland",
      "c": "United States of America",
      "p": 4258.5,
      "a": []
    },
    {
      "n": "Dillon",
      "c": "United States of America",
      "p": 4213.5,
      "a": []
    },
    {
      "n": "Hardin",
      "c": "United States of America",
      "p": 3975.5,
      "a": []
    },
    {
      "n": "Thermopolis",
      "c": "United States of America",
      "p": 3195,
      "a": []
    },
    {
      "n": "Glasgow",
      "c": "United States of America",
      "p": 3144,
      "a": []
    },
    {
      "n": "Kanab",
      "c": "United States of America",
      "p": 2861,
      "a": []
    },
    {
      "n": "Parowan",
      "c": "United States of America",
      "p": 2533,
      "a": []
    },
    {
      "n": "Lead",
      "c": "United States of America",
      "p": 2311,
      "a": []
    },
    {
      "n": "Monticello",
      "c": "United States of America",
      "p": 1811.5,
      "a": []
    }
  ],
  "America/Boise": [
    {
      "n": "Boise",
      "c": "United States of America",
      "p": 242029,
      "a": []
    },
    {
      "n": "Caldwell",
      "c": "United States of America",
      "p": 83403,
      "a": []
    },
    {
      "n": "Idaho Falls",
      "c": "United States of America",
      "p": 65787,
      "a": []
    },
    {
      "n": "Pocatello",
      "c": "United States of America",
      "p": 57327,
      "a": []
    },
    {
      "n": "Twin Falls",
      "c": "United States of America",
      "p": 42958.5,
      "a": []
    },
    {
      "n": "Burley",
      "c": "United States of America",
      "p": 11644.5,
      "a": []
    },
    {
      "n": "Ontario",
      "c": "United States of America",
      "p": 11578,
      "a": []
    },
    {
      "n": "Salmon",
      "c": "United States of America",
      "p": 3297,
      "a": []
    },
    {
      "n": "Montpelier",
      "c": "United States of America",
      "p": 2775.5,
      "a": []
    }
  ],
  "America/Los_Angeles": [
    {
      "n": "Los Angeles",
      "c": "United States of America",
      "p": 8097410,
      "a": [
        "LA",
        "LAX"
      ]
    },
    {
      "n": "Silicon Valley",
      "c": "US",
      "p": 3000000,
      "a": []
    },
    {
      "n": "San Francisco",
      "c": "United States of America",
      "p": 2091036,
      "a": [
        "SF",
        "SFO"
      ]
    },
    {
      "n": "San Diego",
      "c": "United States of America",
      "p": 1938570.5,
      "a": [
        "SD"
      ]
    },
    {
      "n": "Seattle",
      "c": "United States of America",
      "p": 1821684.5,
      "a": [
        "SEA"
      ]
    },
    {
      "n": "Irvine",
      "c": "United States of America",
      "p": 1611303.5,
      "a": []
    },
    {
      "n": "San Jose",
      "c": "United States of America",
      "p": 1281471.5,
      "a": [
        "SJC"
      ]
    },
    {
      "n": "Long Beach",
      "c": "United States of America",
      "p": 1249195.5,
      "a": []
    },
    {
      "n": "Portland",
      "c": "United States of America",
      "p": 1207756.5,
      "a": [
        "PDX"
      ]
    },
    {
      "n": "Las Vegas",
      "c": "United States of America",
      "p": 1150717,
      "a": [
        "LAS"
      ]
    },
    {
      "n": "Sacramento",
      "c": "United States of America",
      "p": 1035949,
      "a": []
    },
    {
      "n": "San Bernardino",
      "c": "United States of America",
      "p": 973690.5,
      "a": []
    },
    {
      "n": "Oakland",
      "c": "United States of America",
      "p": 953044,
      "a": []
    },
    {
      "n": "Fresno",
      "c": "United States of America",
      "p": 540768,
      "a": []
    },
    {
      "n": "Stockton",
      "c": "United States of America",
      "p": 488506.5,
      "a": []
    },
    {
      "n": "Tacoma",
      "c": "United States of America",
      "p": 460273,
      "a": []
    },
    {
      "n": "Oceanside",
      "c": "United States of America",
      "p": 396474.5,
      "a": []
    },
    {
      "n": "Bakersfield",
      "c": "United States of America",
      "p": 367259,
      "a": []
    },
    {
      "n": "San Mateo",
      "c": "United States of America",
      "p": 361806.5,
      "a": []
    },
    {
      "n": "Vancouver",
      "c": "United States of America",
      "p": 343796.5,
      "a": [
        "YVR"
      ]
    },
    {
      "n": "Berkeley",
      "c": "United States of America",
      "p": 298257,
      "a": []
    },
    {
      "n": "Riverside",
      "c": "United States of America",
      "p": 297554,
      "a": []
    },
    {
      "n": "Everett",
      "c": "United States of America",
      "p": 291948,
      "a": []
    },
    {
      "n": "Spokane",
      "c": "United States of America",
      "p": 272483.5,
      "a": []
    },
    {
      "n": "Modesto",
      "c": "United States of America",
      "p": 269697,
      "a": []
    },
    {
      "n": "Reno",
      "c": "United States of America",
      "p": 265363.5,
      "a": []
    },
    {
      "n": "Lancaster",
      "c": "United States of America",
      "p": 225799,
      "a": []
    },
    {
      "n": "Palm Springs",
      "c": "United States of America",
      "p": 216461,
      "a": []
    },
    {
      "n": "Hollywood",
      "c": "US",
      "p": 200000,
      "a": []
    },
    {
      "n": "Eugene",
      "c": "United States of America",
      "p": 195183,
      "a": []
    },
    {
      "n": "Santa Rosa",
      "c": "United States of America",
      "p": 193455,
      "a": []
    },
    {
      "n": "Salem",
      "c": "United States of America",
      "p": 187966,
      "a": []
    },
    {
      "n": "Salinas",
      "c": "United States of America",
      "p": 152737.5,
      "a": []
    },
    {
      "n": "Pasadena",
      "c": "United States of America",
      "p": 144618,
      "a": []
    },
    {
      "n": "Santa Barbara",
      "c": "United States of America",
      "p": 135021,
      "a": []
    },
    {
      "n": "Vallejo",
      "c": "United States of America",
      "p": 133367.5,
      "a": []
    },
    {
      "n": "Visalia",
      "c": "United States of America",
      "p": 114699.5,
      "a": []
    },
    {
      "n": "National City",
      "c": "United States of America",
      "p": 104291,
      "a": []
    },
    {
      "n": "Santa Cruz",
      "c": "United States of America",
      "p": 101530.5,
      "a": []
    },
    {
      "n": "Olympia",
      "c": "United States of America",
      "p": 100950,
      "a": []
    },
    {
      "n": "Santa Maria",
      "c": "United States of America",
      "p": 98092.5,
      "a": []
    },
    {
      "n": "Redding",
      "c": "United States of America",
      "p": 93871.5,
      "a": []
    },
    {
      "n": "Yakima",
      "c": "United States of America",
      "p": 93846,
      "a": []
    },
    {
      "n": "Medford",
      "c": "United States of America",
      "p": 89081.5,
      "a": []
    },
    {
      "n": "Bellingham",
      "c": "United States of America",
      "p": 86565.5,
      "a": []
    },
    {
      "n": "Merced",
      "c": "United States of America",
      "p": 84355,
      "a": []
    },
    {
      "n": "Yuba City",
      "c": "United States of America",
      "p": 84324.5,
      "a": []
    },
    {
      "n": "Victorville",
      "c": "United States of America",
      "p": 83496,
      "a": []
    },
    {
      "n": "Chico",
      "c": "United States of America",
      "p": 83226.5,
      "a": []
    },
    {
      "n": "Kennewick",
      "c": "United States of America",
      "p": 82331,
      "a": []
    },
    {
      "n": "Bremerton",
      "c": "United States of America",
      "p": 82039.5,
      "a": []
    },
    {
      "n": "Monterey",
      "c": "United States of America",
      "p": 77297.5,
      "a": []
    },
    {
      "n": "Bend",
      "c": "United States of America",
      "p": 70598.5,
      "a": []
    },
    {
      "n": "Springfield",
      "c": "United States of America",
      "p": 55531.5,
      "a": []
    },
    {
      "n": "Corvallis",
      "c": "United States of America",
      "p": 54865.5,
      "a": []
    },
    {
      "n": "San Luis Obispo",
      "c": "United States of America",
      "p": 54759,
      "a": []
    },
    {
      "n": "Carson City",
      "c": "United States of America",
      "p": 53767,
      "a": []
    },
    {
      "n": "Tulare",
      "c": "United States of America",
      "p": 53005.5,
      "a": []
    },
    {
      "n": "Longview",
      "c": "United States of America",
      "p": 51290,
      "a": []
    },
    {
      "n": "Albany",
      "c": "United States of America",
      "p": 48066.5,
      "a": []
    },
    {
      "n": "Wenatchee",
      "c": "United States of America",
      "p": 45892,
      "a": []
    },
    {
      "n": "Delano",
      "c": "United States of America",
      "p": 42396.5,
      "a": []
    },
    {
      "n": "El Centro",
      "c": "United States of America",
      "p": 41661.5,
      "a": []
    },
    {
      "n": "Lewiston",
      "c": "United States of America",
      "p": 40096.5,
      "a": []
    },
    {
      "n": "Richland",
      "c": "United States of America",
      "p": 39940.5,
      "a": []
    },
    {
      "n": "Walla Walla",
      "c": "United States of America",
      "p": 37864,
      "a": []
    },
    {
      "n": "Grants Pass",
      "c": "United States of America",
      "p": 36690,
      "a": []
    },
    {
      "n": "Coeur d'Alene",
      "c": "United States of America",
      "p": 34514,
      "a": []
    },
    {
      "n": "Eureka",
      "c": "United States of America",
      "p": 34012,
      "a": []
    },
    {
      "n": "Klamath Falls",
      "c": "United States of America",
      "p": 31090.5,
      "a": []
    },
    {
      "n": "Paso Robles",
      "c": "United States of America",
      "p": 26221,
      "a": []
    },
    {
      "n": "Roseburg",
      "c": "United States of America",
      "p": 25454.5,
      "a": []
    },
    {
      "n": "Aberdeen",
      "c": "United States of America",
      "p": 24400,
      "a": []
    },
    {
      "n": "Coos Bay",
      "c": "United States of America",
      "p": 23685,
      "a": []
    },
    {
      "n": "Ukiah",
      "c": "United States of America",
      "p": 21826.5,
      "a": []
    },
    {
      "n": "Barstow",
      "c": "United States of America",
      "p": 21119,
      "a": []
    },
    {
      "n": "Arcata",
      "c": "United States of America",
      "p": 19052,
      "a": []
    },
    {
      "n": "Elko",
      "c": "United States of America",
      "p": 17537,
      "a": []
    },
    {
      "n": "Centralia",
      "c": "United States of America",
      "p": 16993.5,
      "a": []
    },
    {
      "n": "Pendleton",
      "c": "United States of America",
      "p": 16669,
      "a": []
    },
    {
      "n": "Boulder City",
      "c": "United States of America",
      "p": 15072.5,
      "a": []
    },
    {
      "n": "La Grande",
      "c": "United States of America",
      "p": 13646,
      "a": []
    },
    {
      "n": "Astoria",
      "c": "United States of America",
      "p": 9773,
      "a": []
    },
    {
      "n": "Crescent City",
      "c": "United States of America",
      "p": 9439.5,
      "a": []
    },
    {
      "n": "Winnemucca",
      "c": "United States of America",
      "p": 7997.5,
      "a": []
    },
    {
      "n": "Tillamook",
      "c": "United States of America",
      "p": 6351.5,
      "a": []
    },
    {
      "n": "Needles",
      "c": "United States of America",
      "p": 6246.5,
      "a": []
    },
    {
      "n": "Bishop",
      "c": "United States of America",
      "p": 4249,
      "a": []
    },
    {
      "n": "Ely",
      "c": "United States of America",
      "p": 3911,
      "a": []
    },
    {
      "n": "Mt. Shasta",
      "c": "United States of America",
      "p": 3742.5,
      "a": []
    },
    {
      "n": "Tonopah",
      "c": "United States of America",
      "p": 1993,
      "a": []
    },
    {
      "n": "John Day",
      "c": "United States of America",
      "p": 1437.5,
      "a": []
    },
    {
      "n": "Wallace",
      "c": "United States of America",
      "p": 1028,
      "a": []
    },
    {
      "n": "Mendocino",
      "c": "United States of America",
      "p": 548,
      "a": []
    }
  ],
  "America/Phoenix": [
    {
      "n": "Phoenix",
      "c": "United States of America",
      "p": 2436022.5,
      "a": [
        "PHX"
      ]
    },
    {
      "n": "Mesa",
      "c": "United States of America",
      "p": 762217.5,
      "a": []
    },
    {
      "n": "Tucson",
      "c": "United States of America",
      "p": 670953.5,
      "a": []
    },
    {
      "n": "Glendale",
      "c": "United States of America",
      "p": 363360.5,
      "a": []
    },
    {
      "n": "Yuma",
      "c": "United States of America",
      "p": 88402.5,
      "a": []
    },
    {
      "n": "Flagstaff",
      "c": "United States of America",
      "p": 60779.5,
      "a": []
    },
    {
      "n": "Lake Havasu City",
      "c": "United States of America",
      "p": 55442.5,
      "a": []
    },
    {
      "n": "Prescott",
      "c": "United States of America",
      "p": 47587,
      "a": []
    },
    {
      "n": "Casa Grande",
      "c": "United States of America",
      "p": 38396.5,
      "a": []
    },
    {
      "n": "Bullhead City",
      "c": "United States of America",
      "p": 37989,
      "a": []
    },
    {
      "n": "Kingman",
      "c": "United States of America",
      "p": 33306.5,
      "a": []
    },
    {
      "n": "Douglas",
      "c": "United States of America",
      "p": 23438.5,
      "a": []
    },
    {
      "n": "Nogales",
      "c": "United States of America",
      "p": 20837,
      "a": []
    },
    {
      "n": "Scottsdale",
      "c": "United States of America",
      "p": 15401,
      "a": []
    },
    {
      "n": "Safford",
      "c": "United States of America",
      "p": 9746.5,
      "a": []
    },
    {
      "n": "Willcox",
      "c": "United States of America",
      "p": 4451.5,
      "a": []
    },
    {
      "n": "Gila Bend",
      "c": "United States of America",
      "p": 2012,
      "a": []
    },
    {
      "n": "Tombstone",
      "c": "United States of America",
      "p": 1396.5,
      "a": []
    },
    {
      "n": "Grand Canyon",
      "c": "United States of America",
      "p": 1068.5,
      "a": []
    }
  ],
  "America/New_York": [
    {
      "n": "New York",
      "c": "United States of America",
      "p": 13524139,
      "a": [
        "NYC",
        "NY"
      ]
    },
    {
      "n": "Philadelphia",
      "c": "United States of America",
      "p": 3504775,
      "a": [
        "PHL"
      ]
    },
    {
      "n": "Miami",
      "c": "United States of America",
      "p": 2983947,
      "a": [
        "MIA"
      ]
    },
    {
      "n": "Boston",
      "c": "United States of America",
      "p": 2528070.5,
      "a": [
        "BOS"
      ]
    },
    {
      "n": "Atlanta",
      "c": "United States of America",
      "p": 2464454,
      "a": [
        "ATL"
      ]
    },
    {
      "n": "Washington, D.C.",
      "c": "United States of America",
      "p": 2445216.5,
      "a": []
    },
    {
      "n": "Pittsburgh",
      "c": "United States of America",
      "p": 1535267.5,
      "a": []
    },
    {
      "n": "Baltimore",
      "c": "United States of America",
      "p": 1432946,
      "a": []
    },
    {
      "n": "Tampa",
      "c": "United States of America",
      "p": 1319232.5,
      "a": []
    },
    {
      "n": "Cleveland",
      "c": "United States of America",
      "p": 1169757,
      "a": []
    },
    {
      "n": "Fort Lauderdale",
      "c": "United States of America",
      "p": 1103781.5,
      "a": []
    },
    {
      "n": "Columbus",
      "c": "United States of America",
      "p": 1003418,
      "a": []
    },
    {
      "n": "Cincinnati",
      "c": "United States of America",
      "p": 971191,
      "a": []
    },
    {
      "n": "Charlotte",
      "c": "United States of America",
      "p": 943574.5,
      "a": []
    },
    {
      "n": "Jacksonville",
      "c": "United States of America",
      "p": 904953.5,
      "a": []
    },
    {
      "n": "Virginia Beach",
      "c": "United States of America",
      "p": 877475.5,
      "a": []
    },
    {
      "n": "Raleigh",
      "c": "United States of America",
      "p": 789991.5,
      "a": []
    },
    {
      "n": "Orlando",
      "c": "United States of America",
      "p": 778985,
      "a": []
    },
    {
      "n": "New Haven",
      "c": "United States of America",
      "p": 707883,
      "a": []
    },
    {
      "n": "West Palm Beach",
      "c": "United States of America",
      "p": 675521.5,
      "a": []
    },
    {
      "n": "Providence",
      "c": "United States of America",
      "p": 663726.5,
      "a": []
    },
    {
      "n": "Buffalo",
      "c": "United States of America",
      "p": 647778.5,
      "a": []
    },
    {
      "n": "Norfolk",
      "c": "United States of America",
      "p": 645336,
      "a": []
    },
    {
      "n": "Bridgeport",
      "c": "United States of America",
      "p": 578545,
      "a": []
    },
    {
      "n": "Richmond",
      "c": "United States of America",
      "p": 551443,
      "a": []
    },
    {
      "n": "St. Petersburg",
      "c": "United States of America",
      "p": 523314.5,
      "a": []
    },
    {
      "n": "Hartford",
      "c": "United States of America",
      "p": 518509.5,
      "a": []
    },
    {
      "n": "Albany",
      "c": "United States of America",
      "p": 484286,
      "a": []
    },
    {
      "n": "Rochester",
      "c": "United States of America",
      "p": 483177,
      "a": []
    },
    {
      "n": "Dayton",
      "c": "United States of America",
      "p": 466067,
      "a": []
    },
    {
      "n": "Akron",
      "c": "United States of America",
      "p": 451155,
      "a": []
    },
    {
      "n": "Stamford",
      "c": "United States of America",
      "p": 434781.5,
      "a": []
    },
    {
      "n": "Knoxville",
      "c": "United States of America",
      "p": 417137,
      "a": []
    },
    {
      "n": "Lowell",
      "c": "United States of America",
      "p": 415074,
      "a": []
    },
    {
      "n": "Syracuse",
      "c": "United States of America",
      "p": 403873.5,
      "a": []
    },
    {
      "n": "Toledo",
      "c": "United States of America",
      "p": 388449,
      "a": []
    },
    {
      "n": "Sarasota",
      "c": "United States of America",
      "p": 321223.5,
      "a": []
    },
    {
      "n": "Covington",
      "c": "United States of America",
      "p": 313064.5,
      "a": []
    },
    {
      "n": "Greensboro",
      "c": "United States of America",
      "p": 310328,
      "a": []
    },
    {
      "n": "Allentown",
      "c": "United States of America",
      "p": 300980.5,
      "a": []
    },
    {
      "n": "Harrisburg",
      "c": "United States of America",
      "p": 289210,
      "a": []
    },
    {
      "n": "Springfield",
      "c": "United States of America",
      "p": 287003.5,
      "a": []
    },
    {
      "n": "Newark",
      "c": "United States of America",
      "p": 280123,
      "a": []
    },
    {
      "n": "Columbia",
      "c": "United States of America",
      "p": 257185.5,
      "a": []
    },
    {
      "n": "Durham",
      "c": "United States of America",
      "p": 257114.5,
      "a": []
    },
    {
      "n": "Hampton",
      "c": "United States of America",
      "p": 256601.5,
      "a": []
    },
    {
      "n": "Charleston",
      "c": "United States of America",
      "p": 254295,
      "a": []
    },
    {
      "n": "Miami Beach",
      "c": "United States of America",
      "p": 248538,
      "a": []
    },
    {
      "n": "Lexington",
      "c": "United States of America",
      "p": 244972,
      "a": []
    },
    {
      "n": "Winston-Salem",
      "c": "United States of America",
      "p": 237491.5,
      "a": []
    },
    {
      "n": "Worcester",
      "c": "United States of America",
      "p": 232290.5,
      "a": []
    },
    {
      "n": "Trenton",
      "c": "United States of America",
      "p": 225713,
      "a": []
    },
    {
      "n": "Lancaster",
      "c": "United States of America",
      "p": 209489,
      "a": []
    },
    {
      "n": "Chattanooga",
      "c": "United States of America",
      "p": 206571.5,
      "a": []
    },
    {
      "n": "Greenville",
      "c": "United States of America",
      "p": 203256.5,
      "a": []
    },
    {
      "n": "Columbus",
      "c": "United States of America",
      "p": 202225,
      "a": []
    },
    {
      "n": "Youngstown",
      "c": "United States of America",
      "p": 194765,
      "a": []
    },
    {
      "n": "Sanford",
      "c": "United States of America",
      "p": 189374.5,
      "a": []
    },
    {
      "n": "Salem",
      "c": "United States of America",
      "p": 188982,
      "a": []
    },
    {
      "n": "Tallahassee",
      "c": "United States of America",
      "p": 187402.5,
      "a": []
    },
    {
      "n": "Coral Springs",
      "c": "United States of America",
      "p": 185548,
      "a": []
    },
    {
      "n": "Fayetteville",
      "c": "United States of America",
      "p": 184040.5,
      "a": []
    },
    {
      "n": "Waterbury",
      "c": "United States of America",
      "p": 174236,
      "a": []
    },
    {
      "n": "Melbourne",
      "c": "United States of America",
      "p": 170870,
      "a": [
        "MEL"
      ]
    },
    {
      "n": "Canton",
      "c": "United States of America",
      "p": 168410,
      "a": []
    },
    {
      "n": "Gainesville",
      "c": "United States of America",
      "p": 158390.5,
      "a": []
    },
    {
      "n": "Savannah",
      "c": "United States of America",
      "p": 155848.5,
      "a": []
    },
    {
      "n": "Manchester",
      "c": "United States of America",
      "p": 153221.5,
      "a": []
    },
    {
      "n": "Augusta",
      "c": "United States of America",
      "p": 152895.5,
      "a": []
    },
    {
      "n": "Paterson",
      "c": "United States of America",
      "p": 151205,
      "a": []
    },
    {
      "n": "Roanoke",
      "c": "United States of America",
      "p": 144669.5,
      "a": []
    },
    {
      "n": "Kissimmee",
      "c": "United States of America",
      "p": 144589.5,
      "a": []
    },
    {
      "n": "Naples",
      "c": "United States of America",
      "p": 141902,
      "a": []
    },
    {
      "n": "Daytona Beach",
      "c": "United States of America",
      "p": 140775.5,
      "a": []
    },
    {
      "n": "Erie",
      "c": "United States of America",
      "p": 138991.5,
      "a": []
    },
    {
      "n": "Fort Pierce",
      "c": "United States of America",
      "p": 132984,
      "a": []
    },
    {
      "n": "York",
      "c": "United States of America",
      "p": 128798.5,
      "a": []
    },
    {
      "n": "Alexandria",
      "c": "United States of America",
      "p": 127273,
      "a": []
    },
    {
      "n": "Wilmington",
      "c": "United States of America",
      "p": 126992,
      "a": []
    },
    {
      "n": "Ft. Myers",
      "c": "United States of America",
      "p": 120810.5,
      "a": []
    },
    {
      "n": "Niagara Falls",
      "c": "United States of America",
      "p": 117567,
      "a": []
    },
    {
      "n": "Cape Coral",
      "c": "United States of America",
      "p": 117387.5,
      "a": []
    },
    {
      "n": "Wilmington",
      "c": "United States of America",
      "p": 116205.5,
      "a": []
    },
    {
      "n": "New Bedford",
      "c": "United States of America",
      "p": 115082.5,
      "a": []
    },
    {
      "n": "Scranton",
      "c": "United States of America",
      "p": 114701,
      "a": []
    },
    {
      "n": "Asheville",
      "c": "United States of America",
      "p": 105775,
      "a": []
    },
    {
      "n": "Macon",
      "c": "United States of America",
      "p": 104932.5,
      "a": []
    },
    {
      "n": "Schenectady",
      "c": "United States of America",
      "p": 104767.5,
      "a": []
    },
    {
      "n": "Poughkeepsie",
      "c": "United States of America",
      "p": 100670.5,
      "a": []
    },
    {
      "n": "Wilkes Barre",
      "c": "United States of America",
      "p": 99824.5,
      "a": []
    },
    {
      "n": "Portland",
      "c": "United States of America",
      "p": 99504,
      "a": [
        "PDX"
      ]
    },
    {
      "n": "Coral Gables",
      "c": "United States of America",
      "p": 98700.5,
      "a": []
    },
    {
      "n": "Ocala",
      "c": "United States of America",
      "p": 95470,
      "a": []
    },
    {
      "n": "Binghamton",
      "c": "United States of America",
      "p": 92687.5,
      "a": []
    },
    {
      "n": "Spring Hill",
      "c": "United States of America",
      "p": 91887.5,
      "a": []
    },
    {
      "n": "Charleston",
      "c": "United States of America",
      "p": 87113,
      "a": []
    },
    {
      "n": "Lynchburg",
      "c": "United States of America",
      "p": 84581,
      "a": []
    },
    {
      "n": "Albany",
      "c": "United States of America",
      "p": 82280,
      "a": []
    },
    {
      "n": "Utica",
      "c": "United States of America",
      "p": 81870,
      "a": []
    },
    {
      "n": "Greenville",
      "c": "United States of America",
      "p": 81661,
      "a": []
    }
  ],
  "America/Indiana/Indianapolis": [
    {
      "n": "Indianapolis",
      "c": "United States of America",
      "p": 1104641.5,
      "a": []
    },
    {
      "n": "Fort Wayne",
      "c": "United States of America",
      "p": 264793,
      "a": []
    },
    {
      "n": "South Bend",
      "c": "United States of America",
      "p": 171791,
      "a": []
    },
    {
      "n": "Elkhart",
      "c": "United States of America",
      "p": 100295,
      "a": []
    },
    {
      "n": "Lafayette",
      "c": "United States of America",
      "p": 98104,
      "a": []
    },
    {
      "n": "Bloomington",
      "c": "United States of America",
      "p": 85781.5,
      "a": []
    },
    {
      "n": "Muncie",
      "c": "United States of America",
      "p": 75388,
      "a": []
    },
    {
      "n": "Terre Haute",
      "c": "United States of America",
      "p": 65149.5,
      "a": []
    },
    {
      "n": "Kokomo",
      "c": "United States of America",
      "p": 53674,
      "a": []
    },
    {
      "n": "Richmond",
      "c": "United States of America",
      "p": 41015.5,
      "a": []
    },
    {
      "n": "Marion",
      "c": "United States of America",
      "p": 34249,
      "a": []
    }
  ],
  "America/Kentucky/Louisville": [
    {
      "n": "Louisville",
      "c": "United States of America",
      "p": 595819.5,
      "a": []
    },
    {
      "n": "New Albany",
      "c": "United States of America",
      "p": 78381.5,
      "a": []
    }
  ],
  "America/Menominee": [
    {
      "n": "Iron Mountain",
      "c": "United States of America",
      "p": 12011,
      "a": []
    },
    {
      "n": "Ironwood",
      "c": "United States of America",
      "p": 6400,
      "a": []
    }
  ],
  "America/Anchorage": [
    {
      "n": "Anchorage",
      "c": "United States of America",
      "p": 252068,
      "a": []
    },
    {
      "n": "Fairbanks",
      "c": "United States of America",
      "p": 43608.5,
      "a": []
    },
    {
      "n": "Palmer",
      "c": "United States of America",
      "p": 9848,
      "a": []
    },
    {
      "n": "Wasilla",
      "c": "United States of America",
      "p": 8521,
      "a": []
    },
    {
      "n": "Kodiak",
      "c": "United States of America",
      "p": 7804.5,
      "a": []
    },
    {
      "n": "Kenai",
      "c": "United States of America",
      "p": 6580.5,
      "a": []
    },
    {
      "n": "Bethel",
      "c": "United States of America",
      "p": 5440.5,
      "a": []
    },
    {
      "n": "Homer",
      "c": "United States of America",
      "p": 5021.5,
      "a": []
    },
    {
      "n": "Barrow",
      "c": "United States of America",
      "p": 3412,
      "a": []
    },
    {
      "n": "Valdez",
      "c": "United States of America",
      "p": 3283,
      "a": []
    },
    {
      "n": "Seward",
      "c": "United States of America",
      "p": 2900,
      "a": []
    },
    {
      "n": "Prudhoe Bay",
      "c": "United States of America",
      "p": 2337,
      "a": []
    },
    {
      "n": "Dillingham",
      "c": "United States of America",
      "p": 1710,
      "a": []
    },
    {
      "n": "Cordova",
      "c": "United States of America",
      "p": 1622.5,
      "a": []
    },
    {
      "n": "Talkeetna",
      "c": "United States of America",
      "p": 1078,
      "a": []
    },
    {
      "n": "Denali Park",
      "c": "United States of America",
      "p": 1063,
      "a": []
    },
    {
      "n": "Fort Yukon",
      "c": "United States of America",
      "p": 833,
      "a": []
    },
    {
      "n": "Selawik",
      "c": "United States of America",
      "p": 832,
      "a": []
    },
    {
      "n": "Unalakleet",
      "c": "United States of America",
      "p": 741,
      "a": []
    },
    {
      "n": "Sand Point",
      "c": "United States of America",
      "p": 667,
      "a": []
    },
    {
      "n": "Big Delta",
      "c": "United States of America",
      "p": 591,
      "a": []
    },
    {
      "n": "Aniak",
      "c": "United States of America",
      "p": 501,
      "a": []
    },
    {
      "n": "Galena",
      "c": "United States of America",
      "p": 485,
      "a": []
    },
    {
      "n": "King Salmon",
      "c": "United States of America",
      "p": 292,
      "a": []
    },
    {
      "n": "Tanana",
      "c": "United States of America",
      "p": 291.5,
      "a": []
    },
    {
      "n": "Ambler",
      "c": "United States of America",
      "p": 258,
      "a": []
    },
    {
      "n": "Koyuk",
      "c": "United States of America",
      "p": 254,
      "a": []
    },
    {
      "n": "Quinhagak",
      "c": "United States of America",
      "p": 250,
      "a": []
    },
    {
      "n": "Togiak",
      "c": "United States of America",
      "p": 236,
      "a": []
    },
    {
      "n": "Goodnews Bay",
      "c": "United States of America",
      "p": 230,
      "a": []
    },
    {
      "n": "Cantwell",
      "c": "United States of America",
      "p": 222,
      "a": []
    },
    {
      "n": "Atqasuk",
      "c": "United States of America",
      "p": 201,
      "a": []
    },
    {
      "n": "Kaltag",
      "c": "United States of America",
      "p": 190,
      "a": []
    },
    {
      "n": "Whittier",
      "c": "United States of America",
      "p": 177,
      "a": []
    },
    {
      "n": "Wainwright",
      "c": "United States of America",
      "p": 174,
      "a": []
    },
    {
      "n": "Newhalen",
      "c": "United States of America",
      "p": 160,
      "a": []
    },
    {
      "n": "Kobuk",
      "c": "United States of America",
      "p": 151,
      "a": []
    },
    {
      "n": "McGrath",
      "c": "United States of America",
      "p": 138,
      "a": []
    },
    {
      "n": "Tanacross",
      "c": "United States of America",
      "p": 136,
      "a": []
    },
    {
      "n": "Gulkana",
      "c": "United States of America",
      "p": 119,
      "a": []
    },
    {
      "n": "Chignik",
      "c": "United States of America",
      "p": 118,
      "a": []
    },
    {
      "n": "Perryville",
      "c": "United States of America",
      "p": 113,
      "a": []
    },
    {
      "n": "Eagle",
      "c": "United States of America",
      "p": 104,
      "a": []
    },
    {
      "n": "Port Heiden",
      "c": "United States of America",
      "p": 102,
      "a": []
    },
    {
      "n": "Koyukuk",
      "c": "United States of America",
      "p": 101,
      "a": []
    },
    {
      "n": "Kaktovik",
      "c": "United States of America",
      "p": 101,
      "a": []
    },
    {
      "n": "Circle",
      "c": "United States of America",
      "p": 100,
      "a": []
    },
    {
      "n": "Allakaket",
      "c": "United States of America",
      "p": 97,
      "a": []
    },
    {
      "n": "Karluk",
      "c": "United States of America",
      "p": 96,
      "a": []
    },
    {
      "n": "Hughes",
      "c": "United States of America",
      "p": 78,
      "a": []
    },
    {
      "n": "Nyac",
      "c": "United States of America",
      "p": 75,
      "a": []
    },
    {
      "n": "Nenana",
      "c": "United States of America",
      "p": 75,
      "a": []
    },
    {
      "n": "Pilot Point",
      "c": "United States of America",
      "p": 68,
      "a": []
    },
    {
      "n": "Lake Minchumina",
      "c": "United States of America",
      "p": 32,
      "a": []
    },
    {
      "n": "Red Devil",
      "c": "United States of America",
      "p": 24,
      "a": []
    },
    {
      "n": "Wiseman",
      "c": "United States of America",
      "p": 14,
      "a": []
    },
    {
      "n": "Montana",
      "c": "United States of America",
      "p": 10,
      "a": []
    }
  ],
  "America/Sitka": [
    {
      "n": "Ketchikan",
      "c": "United States of America",
      "p": 8121,
      "a": []
    },
    {
      "n": "Sitka",
      "c": "United States of America",
      "p": 8110,
      "a": []
    },
    {
      "n": "Wrangell",
      "c": "United States of America",
      "p": 1658.5,
      "a": []
    },
    {
      "n": "Hydaburg",
      "c": "United States of America",
      "p": 382,
      "a": []
    }
  ],
  "America/Nome": [
    {
      "n": "Nome",
      "c": "United States of America",
      "p": 3021,
      "a": []
    },
    {
      "n": "Kotzebue",
      "c": "United States of America",
      "p": 2873.5,
      "a": []
    },
    {
      "n": "Unalaska",
      "c": "United States of America",
      "p": 1938.5,
      "a": []
    },
    {
      "n": "Kotlit",
      "c": "United States of America",
      "p": 1002,
      "a": []
    },
    {
      "n": "Mountain Village",
      "c": "United States of America",
      "p": 755,
      "a": []
    },
    {
      "n": "Gambell",
      "c": "United States of America",
      "p": 681,
      "a": []
    },
    {
      "n": "Hooper Bay",
      "c": "United States of America",
      "p": 623,
      "a": []
    },
    {
      "n": "Point Hope",
      "c": "United States of America",
      "p": 461,
      "a": []
    },
    {
      "n": "Kivalina",
      "c": "United States of America",
      "p": 374,
      "a": []
    },
    {
      "n": "Tununak",
      "c": "United States of America",
      "p": 352,
      "a": []
    },
    {
      "n": "Shishmaref",
      "c": "United States of America",
      "p": 254,
      "a": []
    },
    {
      "n": "Cold Bay",
      "c": "United States of America",
      "p": 154,
      "a": []
    },
    {
      "n": "Emmonak",
      "c": "United States of America",
      "p": 100,
      "a": []
    },
    {
      "n": "Mekoryuk",
      "c": "United States of America",
      "p": 99,
      "a": []
    },
    {
      "n": "Wales",
      "c": "United States of America",
      "p": 99,
      "a": []
    },
    {
      "n": "Teller",
      "c": "United States of America",
      "p": 83,
      "a": []
    },
    {
      "n": "False Pass",
      "c": "United States of America",
      "p": 35,
      "a": []
    },
    {
      "n": "Nikolski",
      "c": "United States of America",
      "p": 18,
      "a": []
    }
  ],
  "Pacific/Honolulu": [
    {
      "n": "Honolulu",
      "c": "United States of America",
      "p": 578828.5,
      "a": []
    },
    {
      "n": "Wahiawa",
      "c": "United States of America",
      "p": 95336,
      "a": []
    },
    {
      "n": "Hilo",
      "c": "United States of America",
      "p": 47720.5,
      "a": []
    },
    {
      "n": "Wailuku",
      "c": "United States of America",
      "p": 32769.5,
      "a": []
    },
    {
      "n": "Lihue",
      "c": "United States of America",
      "p": 10694.5,
      "a": []
    },
    {
      "n": "Kailua-Kona",
      "c": "United States of America",
      "p": 9870,
      "a": []
    }
  ],
  "America/Juneau": [
    {
      "n": "Juneau",
      "c": "United States of America",
      "p": 26172,
      "a": []
    },
    {
      "n": "Skagway",
      "c": "United States of America",
      "p": 955,
      "a": []
    },
    {
      "n": "Hoonah",
      "c": "United States of America",
      "p": 361,
      "a": []
    }
  ],
  "America/Adak": [
    {
      "n": "Atka",
      "c": "United States of America",
      "p": 61,
      "a": []
    }
  ],
  "America/Yakutat": [
    {
      "n": "Yakutat",
      "c": "United States of America",
      "p": 109,
      "a": []
    }
  ],
  "America/St_Thomas": [
    {
      "n": "Christiansted",
      "c": "United States Virgin Islands",
      "p": 32543,
      "a": []
    }
  ],
  "America/Montevideo": [
    {
      "n": "Montevideo",
      "c": "Uruguay",
      "p": 759162,
      "a": []
    },
    {
      "n": "Rivera",
      "c": "Uruguay",
      "p": 132232.5,
      "a": []
    },
    {
      "n": "Salto",
      "c": "Uruguay",
      "p": 102756.5,
      "a": []
    },
    {
      "n": "Punta del Este",
      "c": "Uruguay",
      "p": 84140,
      "a": []
    },
    {
      "n": "Paysandu",
      "c": "Uruguay",
      "p": 76132.5,
      "a": []
    },
    {
      "n": "Melo",
      "c": "Uruguay",
      "p": 53258.5,
      "a": []
    },
    {
      "n": "Tacuarembo",
      "c": "Uruguay",
      "p": 53065.5,
      "a": []
    },
    {
      "n": "Maldonado",
      "c": "Uruguay",
      "p": 51877.5,
      "a": []
    },
    {
      "n": "Mercedes",
      "c": "Uruguay",
      "p": 41951.5,
      "a": []
    },
    {
      "n": "Minas",
      "c": "Uruguay",
      "p": 39602.5,
      "a": []
    },
    {
      "n": "San Jose de Mayo",
      "c": "Uruguay",
      "p": 36462,
      "a": []
    },
    {
      "n": "Durazno",
      "c": "Uruguay",
      "p": 33981.5,
      "a": []
    },
    {
      "n": "Florida",
      "c": "Uruguay",
      "p": 32234,
      "a": []
    },
    {
      "n": "Artigas",
      "c": "Uruguay",
      "p": 32072.5,
      "a": []
    },
    {
      "n": "Treinta y Tres",
      "c": "Uruguay",
      "p": 26668.5,
      "a": []
    },
    {
      "n": "Rocha",
      "c": "Uruguay",
      "p": 26194.5,
      "a": []
    },
    {
      "n": "Fray Bentos",
      "c": "Uruguay",
      "p": 23279,
      "a": []
    },
    {
      "n": "Colonia del Sacramento",
      "c": "Uruguay",
      "p": 21714,
      "a": []
    },
    {
      "n": "Trinidad",
      "c": "Uruguay",
      "p": 21093,
      "a": []
    },
    {
      "n": "Canelones",
      "c": "Uruguay",
      "p": 19698,
      "a": []
    },
    {
      "n": "Bella Union",
      "c": "Uruguay",
      "p": 17947,
      "a": []
    },
    {
      "n": "Santa Lucia",
      "c": "Uruguay",
      "p": 15264.5,
      "a": []
    },
    {
      "n": "Carmelo",
      "c": "Uruguay",
      "p": 15113.5,
      "a": []
    },
    {
      "n": "Paso de los Toros",
      "c": "Uruguay",
      "p": 11450,
      "a": []
    },
    {
      "n": "Castillos",
      "c": "Uruguay",
      "p": 7686,
      "a": []
    },
    {
      "n": "Lascano",
      "c": "Uruguay",
      "p": 5215.5,
      "a": []
    },
    {
      "n": "Tranqueras",
      "c": "Uruguay",
      "p": 4775.5,
      "a": []
    },
    {
      "n": "Vergara",
      "c": "Uruguay",
      "p": 3749,
      "a": []
    },
    {
      "n": "La Paloma",
      "c": "Uruguay",
      "p": 2897,
      "a": []
    },
    {
      "n": "Aigua",
      "c": "Uruguay",
      "p": 2622,
      "a": []
    },
    {
      "n": "Jose Batlle y Ordonez",
      "c": "Uruguay",
      "p": 2438,
      "a": []
    },
    {
      "n": "Baltasar Brum",
      "c": "Uruguay",
      "p": 2432,
      "a": []
    }
  ],
  "Asia/Samarkand": [
    {
      "n": "Samarqand",
      "c": "Uzbekistan",
      "p": 652150,
      "a": []
    },
    {
      "n": "Qarshi",
      "c": "Uzbekistan",
      "p": 304629.5,
      "a": []
    },
    {
      "n": "Bukhara",
      "c": "Uzbekistan",
      "p": 283560,
      "a": []
    },
    {
      "n": "Shahrisabz",
      "c": "Uzbekistan",
      "p": 277798,
      "a": []
    },
    {
      "n": "Nukus",
      "c": "Uzbekistan",
      "p": 228211,
      "a": []
    },
    {
      "n": "Navoi",
      "c": "Uzbekistan",
      "p": 172276.5,
      "a": []
    },
    {
      "n": "Termiz",
      "c": "Uzbekistan",
      "p": 159036,
      "a": []
    },
    {
      "n": "Kattaqorgon",
      "c": "Uzbekistan",
      "p": 153247.5,
      "a": []
    },
    {
      "n": "Denow",
      "c": "Uzbekistan",
      "p": 143134,
      "a": []
    },
    {
      "n": "Urgentch",
      "c": "Uzbekistan",
      "p": 126476.5,
      "a": []
    },
    {
      "n": "Khiwa",
      "c": "Uzbekistan",
      "p": 102659,
      "a": []
    },
    {
      "n": "Kogon",
      "c": "Uzbekistan",
      "p": 85093,
      "a": []
    },
    {
      "n": "Urgut",
      "c": "Uzbekistan",
      "p": 73524,
      "a": []
    },
    {
      "n": "Qunghirot",
      "c": "Uzbekistan",
      "p": 57758,
      "a": []
    },
    {
      "n": "Zarafshon",
      "c": "Uzbekistan",
      "p": 55292.5,
      "a": []
    },
    {
      "n": "Khujayli",
      "c": "Uzbekistan",
      "p": 55200.5,
      "a": []
    },
    {
      "n": "Chimboy",
      "c": "Uzbekistan",
      "p": 34277.5,
      "a": []
    },
    {
      "n": "Muynoq",
      "c": "Uzbekistan",
      "p": 13000,
      "a": []
    }
  ],
  "Asia/Tashkent": [
    {
      "n": "Tashkent",
      "c": "Uzbekistan",
      "p": 2081014,
      "a": []
    },
    {
      "n": "Namangan",
      "c": "Uzbekistan",
      "p": 599600,
      "a": []
    },
    {
      "n": "Andijon",
      "c": "Uzbekistan",
      "p": 486950,
      "a": []
    },
    {
      "n": "Fargona",
      "c": "Uzbekistan",
      "p": 482000,
      "a": []
    },
    {
      "n": "Qoqon",
      "c": "Uzbekistan",
      "p": 271250,
      "a": []
    },
    {
      "n": "Jizzax",
      "c": "Uzbekistan",
      "p": 193997,
      "a": []
    },
    {
      "n": "Angren",
      "c": "Uzbekistan",
      "p": 164513.5,
      "a": []
    },
    {
      "n": "Chirchiq",
      "c": "Uzbekistan",
      "p": 155093.5,
      "a": []
    },
    {
      "n": "Olmaliq",
      "c": "Uzbekistan",
      "p": 119768,
      "a": []
    },
    {
      "n": "Iskandar",
      "c": "Uzbekistan",
      "p": 111634.5,
      "a": []
    },
    {
      "n": "Guliston",
      "c": "Uzbekistan",
      "p": 74446.5,
      "a": []
    }
  ],
  "Pacific/Efate": [
    {
      "n": "Port Vila",
      "c": "Vanuatu",
      "p": 39970.5,
      "a": []
    },
    {
      "n": "Luganville",
      "c": "Vanuatu",
      "p": 10634.5,
      "a": []
    }
  ],
  "America/Caracas": [
    {
      "n": "Caracas",
      "c": "Venezuela",
      "p": 2400339.5,
      "a": []
    },
    {
      "n": "Maracaibo",
      "c": "Venezuela",
      "p": 1764650,
      "a": []
    },
    {
      "n": "Valencia",
      "c": "Venezuela",
      "p": 1569526.5,
      "a": []
    },
    {
      "n": "Maracay",
      "c": "Venezuela",
      "p": 1007000,
      "a": []
    },
    {
      "n": "Barquisimeto",
      "c": "Venezuela",
      "p": 962745,
      "a": []
    },
    {
      "n": "Ciudad Guayana",
      "c": "Venezuela",
      "p": 634317.5,
      "a": []
    },
    {
      "n": "Puerto la Cruz",
      "c": "Venezuela",
      "p": 500464,
      "a": []
    },
    {
      "n": "Barcelona",
      "c": "Venezuela",
      "p": 361430,
      "a": [
        "BCN"
      ]
    },
    {
      "n": "Maturin",
      "c": "Venezuela",
      "p": 357707.5,
      "a": []
    },
    {
      "n": "San Cristobal",
      "c": "Venezuela",
      "p": 342690.5,
      "a": []
    },
    {
      "n": "Cabimas",
      "c": "Venezuela",
      "p": 320956,
      "a": []
    },
    {
      "n": "Ciudad Bolivar",
      "c": "Venezuela",
      "p": 317971.5,
      "a": []
    },
    {
      "n": "Los Teques",
      "c": "Venezuela",
      "p": 303470,
      "a": []
    },
    {
      "n": "Cumana",
      "c": "Venezuela",
      "p": 287693,
      "a": []
    },
    {
      "n": "Merida",
      "c": "Venezuela",
      "p": 275184,
      "a": []
    },
    {
      "n": "Barinas",
      "c": "Venezuela",
      "p": 261405.5,
      "a": []
    },
    {
      "n": "Acarigua",
      "c": "Venezuela",
      "p": 202312.5,
      "a": []
    },
    {
      "n": "Coro",
      "c": "Venezuela",
      "p": 184098,
      "a": []
    },
    {
      "n": "Maiquetia",
      "c": "Venezuela",
      "p": 184003,
      "a": []
    },
    {
      "n": "Punto Fijo",
      "c": "Venezuela",
      "p": 183260,
      "a": []
    },
    {
      "n": "El Tigre",
      "c": "Venezuela",
      "p": 174219.5,
      "a": []
    },
    {
      "n": "Puerto Cabello",
      "c": "Venezuela",
      "p": 174000,
      "a": []
    },
    {
      "n": "Valera",
      "c": "Venezuela",
      "p": 142461.5,
      "a": []
    },
    {
      "n": "Porlamar",
      "c": "Venezuela",
      "p": 142027,
      "a": []
    },
    {
      "n": "Guanare",
      "c": "Venezuela",
      "p": 131964,
      "a": []
    },
    {
      "n": "Ocumare del Tuy",
      "c": "Venezuela",
      "p": 130824,
      "a": []
    },
    {
      "n": "Carora",
      "c": "Venezuela",
      "p": 121749.5,
      "a": []
    },
    {
      "n": "Carupano",
      "c": "Venezuela",
      "p": 119187.5,
      "a": []
    },
    {
      "n": "Calabozo",
      "c": "Venezuela",
      "p": 110907,
      "a": []
    },
    {
      "n": "San Fernando de Apure",
      "c": "Venezuela",
      "p": 100740,
      "a": []
    },
    {
      "n": "Anaco",
      "c": "Venezuela",
      "p": 100118,
      "a": []
    },
    {
      "n": "San Juan De Los Morros",
      "c": "Venezuela",
      "p": 87739,
      "a": []
    },
    {
      "n": "Valle de la Pascua",
      "c": "Venezuela",
      "p": 86273.5,
      "a": []
    },
    {
      "n": "San Carlos",
      "c": "Venezuela",
      "p": 77192,
      "a": []
    },
    {
      "n": "San Carlos del Zulia",
      "c": "Venezuela",
      "p": 76935,
      "a": []
    },
    {
      "n": "San Felipe",
      "c": "Venezuela",
      "p": 76766,
      "a": []
    },
    {
      "n": "Upata",
      "c": "Venezuela",
      "p": 53474.5,
      "a": []
    },
    {
      "n": "Puerto Ayacucho",
      "c": "Venezuela",
      "p": 51622.5,
      "a": []
    },
    {
      "n": "Tucupita",
      "c": "Venezuela",
      "p": 49704,
      "a": []
    },
    {
      "n": "Machiques",
      "c": "Venezuela",
      "p": 44936.5,
      "a": []
    },
    {
      "n": "Trujillo",
      "c": "Venezuela",
      "p": 44231.5,
      "a": []
    },
    {
      "n": "Zaraza",
      "c": "Venezuela",
      "p": 35279.5,
      "a": []
    },
    {
      "n": "La Asuncion",
      "c": "Venezuela",
      "p": 35084,
      "a": []
    },
    {
      "n": "Altagracia de Orituco",
      "c": "Venezuela",
      "p": 34427,
      "a": []
    },
    {
      "n": "Guasdualito",
      "c": "Venezuela",
      "p": 28287.5,
      "a": []
    },
    {
      "n": "Santa Rita",
      "c": "Venezuela",
      "p": 21095,
      "a": []
    },
    {
      "n": "Chaguaramas",
      "c": "Venezuela",
      "p": 12500,
      "a": []
    },
    {
      "n": "El Dorado",
      "c": "Venezuela",
      "p": 2383,
      "a": []
    },
    {
      "n": "El Manteco",
      "c": "Venezuela",
      "p": 2215,
      "a": []
    },
    {
      "n": "La Esmeralda",
      "c": "Venezuela",
      "p": 149.5,
      "a": []
    }
  ],
  "Asia/Ho_Chi_Minh": [
    {
      "n": "Ho Chi Minh City",
      "c": "Vietnam",
      "p": 4390665.5,
      "a": []
    },
    {
      "n": "Hanoi",
      "c": "Vietnam",
      "p": 2904635,
      "a": []
    },
    {
      "n": "Haiphong",
      "c": "Vietnam",
      "p": 1285847.5,
      "a": []
    },
    {
      "n": "Da Nang",
      "c": "Vietnam",
      "p": 943534.5,
      "a": []
    },
    {
      "n": "Can Tho",
      "c": "Vietnam",
      "p": 690299,
      "a": []
    },
    {
      "n": "Bien Hoa",
      "c": "Vietnam",
      "p": 652646,
      "a": []
    },
    {
      "n": "Hue",
      "c": "Vietnam",
      "p": 645000,
      "a": []
    },
    {
      "n": "Qui Nhon",
      "c": "Vietnam",
      "p": 543095,
      "a": []
    },
    {
      "n": "Vinh",
      "c": "Vietnam",
      "p": 514426.5,
      "a": []
    },
    {
      "n": "Thai Nguyen",
      "c": "Vietnam",
      "p": 415000,
      "a": []
    },
    {
      "n": "Nha Trang",
      "c": "Vietnam",
      "p": 347498.5,
      "a": []
    },
    {
      "n": "Viet Tri",
      "c": "Vietnam",
      "p": 305144,
      "a": []
    },
    {
      "n": "Ca Mau",
      "c": "Vietnam",
      "p": 280765.5,
      "a": []
    },
    {
      "n": "Long Xuyen",
      "c": "Vietnam",
      "p": 254076.5,
      "a": []
    },
    {
      "n": "Rach Gia",
      "c": "Vietnam",
      "p": 252830,
      "a": []
    },
    {
      "n": "Phan Thiet",
      "c": "Vietnam",
      "p": 248749,
      "a": []
    },
    {
      "n": "Buon Me Thuot",
      "c": "Vietnam",
      "p": 248460,
      "a": []
    },
    {
      "n": "Thu Dau Mot",
      "c": "Vietnam",
      "p": 244277,
      "a": []
    },
    {
      "n": "Nam Dinh",
      "c": "Vietnam",
      "p": 243186,
      "a": []
    },
    {
      "n": "Soc Trang",
      "c": "Vietnam",
      "p": 236961,
      "a": []
    },
    {
      "n": "Vung Tau",
      "c": "Vietnam",
      "p": 229225,
      "a": []
    },
    {
      "n": "Thai Binh",
      "c": "Vietnam",
      "p": 210000,
      "a": []
    },
    {
      "n": "Thanh Hoa",
      "c": "Vietnam",
      "p": 197551,
      "a": []
    },
    {
      "n": "Da Lat",
      "c": "Vietnam",
      "p": 193698,
      "a": []
    },
    {
      "n": "Bac Lieu",
      "c": "Vietnam",
      "p": 187500,
      "a": []
    },
    {
      "n": "Quang Ngai",
      "c": "Vietnam",
      "p": 184625.5,
      "a": []
    },
    {
      "n": "Ha Tinh",
      "c": "Vietnam",
      "p": 165396,
      "a": []
    },
    {
      "n": "Hong Gai",
      "c": "Vietnam",
      "p": 160490.5,
      "a": []
    },
    {
      "n": "Cao Lanh",
      "c": "Vietnam",
      "p": 149837,
      "a": []
    },
    {
      "n": "Lang Son",
      "c": "Vietnam",
      "p": 148000,
      "a": []
    },
    {
      "n": "Phan Rang",
      "c": "Vietnam",
      "p": 135646.5,
      "a": []
    },
    {
      "n": "Tra Vinh",
      "c": "Vietnam",
      "p": 131360,
      "a": []
    },
    {
      "n": "Ninh Binh",
      "c": "Vietnam",
      "p": 130517,
      "a": []
    },
    {
      "n": "Play Ku",
      "c": "Vietnam",
      "p": 128562.5,
      "a": []
    },
    {
      "n": "Tay Ninh",
      "c": "Vietnam",
      "p": 126370,
      "a": []
    },
    {
      "n": "My Tho",
      "c": "Vietnam",
      "p": 123226.5,
      "a": []
    },
    {
      "n": "Son Tay",
      "c": "Vietnam",
      "p": 115091.5,
      "a": []
    },
    {
      "n": "Dong Hoi",
      "c": "Vietnam",
      "p": 110152.5,
      "a": []
    },
    {
      "n": "Vinh Long",
      "c": "Vietnam",
      "p": 103314,
      "a": []
    },
    {
      "n": "Hoa Binh",
      "c": "Vietnam",
      "p": 102381,
      "a": []
    },
    {
      "n": "Tan An",
      "c": "Vietnam",
      "p": 101149.5,
      "a": []
    },
    {
      "n": "Yen Bai",
      "c": "Vietnam",
      "p": 96540,
      "a": []
    },
    {
      "n": "Cam Ranh",
      "c": "Vietnam",
      "p": 85327,
      "a": []
    },
    {
      "n": "Kon Tum",
      "c": "Vietnam",
      "p": 76449,
      "a": []
    },
    {
      "n": "Cam Pha",
      "c": "Vietnam",
      "p": 75925.5,
      "a": []
    },
    {
      "n": "Quang Tri",
      "c": "Vietnam",
      "p": 72722,
      "a": []
    },
    {
      "n": "Chau Doc",
      "c": "Vietnam",
      "p": 70239,
      "a": []
    },
    {
      "n": "Tuy Hoa",
      "c": "Vietnam",
      "p": 69596,
      "a": []
    },
    {
      "n": "Truc Giang",
      "c": "Vietnam",
      "p": 59442,
      "a": []
    },
    {
      "n": "Hai Duong",
      "c": "Vietnam",
      "p": 58030,
      "a": []
    },
    {
      "n": "Bac Giang",
      "c": "Vietnam",
      "p": 53728,
      "a": []
    },
    {
      "n": "Lao Chi",
      "c": "Vietnam",
      "p": 51854,
      "a": []
    },
    {
      "n": "Cao Bang",
      "c": "Vietnam",
      "p": 41112,
      "a": []
    },
    {
      "n": "Hon Quan",
      "c": "Vietnam",
      "p": 40279,
      "a": []
    },
    {
      "n": "Tuyen Quang",
      "c": "Vietnam",
      "p": 36430,
      "a": []
    },
    {
      "n": "Ha Giang",
      "c": "Vietnam",
      "p": 35526,
      "a": []
    },
    {
      "n": "Bac Kan",
      "c": "Vietnam",
      "p": 29227,
      "a": []
    },
    {
      "n": "Son La",
      "c": "Vietnam",
      "p": 19054,
      "a": []
    },
    {
      "n": "Dong Ha",
      "c": "Vietnam",
      "p": 17662,
      "a": []
    },
    {
      "n": "Luan Chau",
      "c": "Vietnam",
      "p": 7335,
      "a": []
    }
  ],
  "Asia/Aden": [
    {
      "n": "Sanaa",
      "c": "Yemen",
      "p": 1921926.5,
      "a": []
    },
    {
      "n": "Aden",
      "c": "Yemen",
      "p": 775301,
      "a": []
    },
    {
      "n": "Taizz",
      "c": "Yemen",
      "p": 683111,
      "a": []
    },
    {
      "n": "Al Hudaydah",
      "c": "Yemen",
      "p": 627610.5,
      "a": []
    },
    {
      "n": "Ibb",
      "c": "Yemen",
      "p": 234837,
      "a": []
    },
    {
      "n": "Al Mukalla",
      "c": "Yemen",
      "p": 194080.5,
      "a": []
    },
    {
      "n": "Dhamar",
      "c": "Yemen",
      "p": 191259,
      "a": []
    },
    {
      "n": "Hajjah",
      "c": "Yemen",
      "p": 125918,
      "a": []
    },
    {
      "n": "Sadah",
      "c": "Yemen",
      "p": 105542,
      "a": []
    },
    {
      "n": "Zabid",
      "c": "Yemen",
      "p": 102547,
      "a": []
    },
    {
      "n": "Saywun",
      "c": "Yemen",
      "p": 68747,
      "a": []
    },
    {
      "n": "Ash Shihr",
      "c": "Yemen",
      "p": 54274,
      "a": []
    },
    {
      "n": "Rida",
      "c": "Yemen",
      "p": 45233,
      "a": []
    },
    {
      "n": "Lahij",
      "c": "Yemen",
      "p": 44831.5,
      "a": []
    },
    {
      "n": "Al Bayda",
      "c": "Yemen",
      "p": 37821,
      "a": []
    },
    {
      "n": "'Ataq",
      "c": "Yemen",
      "p": 37315,
      "a": []
    },
    {
      "n": "Al Ghaydah",
      "c": "Yemen",
      "p": 23702,
      "a": []
    },
    {
      "n": "Marib",
      "c": "Yemen",
      "p": 16794,
      "a": []
    },
    {
      "n": "Hadiboh",
      "c": "Yemen",
      "p": 9970.5,
      "a": []
    },
    {
      "n": "Sayhut",
      "c": "Yemen",
      "p": 189,
      "a": []
    }
  ],
  "Africa/Harare": [
    {
      "n": "Harare",
      "c": "Zimbabwe",
      "p": 1557406.5,
      "a": []
    },
    {
      "n": "Bulawayo",
      "c": "Zimbabwe",
      "p": 697096,
      "a": []
    },
    {
      "n": "Chitungwiza",
      "c": "Zimbabwe",
      "p": 331071,
      "a": []
    },
    {
      "n": "Mutare",
      "c": "Zimbabwe",
      "p": 216785,
      "a": []
    },
    {
      "n": "Gweru",
      "c": "Zimbabwe",
      "p": 164715.5,
      "a": []
    },
    {
      "n": "Kwekwe",
      "c": "Zimbabwe",
      "p": 80788,
      "a": []
    },
    {
      "n": "Masvingo",
      "c": "Zimbabwe",
      "p": 76300.5,
      "a": []
    },
    {
      "n": "Kadoma",
      "c": "Zimbabwe",
      "p": 56400,
      "a": []
    },
    {
      "n": "Chinhoyi",
      "c": "Zimbabwe",
      "p": 52812,
      "a": []
    },
    {
      "n": "Zvishavane",
      "c": "Zimbabwe",
      "p": 34557.5,
      "a": []
    },
    {
      "n": "Hwange",
      "c": "Zimbabwe",
      "p": 33599.5,
      "a": []
    },
    {
      "n": "Victoria Falls",
      "c": "Zimbabwe",
      "p": 23964.5,
      "a": []
    },
    {
      "n": "Kariba",
      "c": "Zimbabwe",
      "p": 23133.5,
      "a": []
    },
    {
      "n": "Chiredzi",
      "c": "Zimbabwe",
      "p": 17816.5,
      "a": []
    },
    {
      "n": "Beitbridge",
      "c": "Zimbabwe",
      "p": 13759.5,
      "a": []
    },
    {
      "n": "Karoi",
      "c": "Zimbabwe",
      "p": 13194,
      "a": []
    },
    {
      "n": "Mazowe",
      "c": "Zimbabwe",
      "p": 9966,
      "a": []
    },
    {
      "n": "Shamva",
      "c": "Zimbabwe",
      "p": 8521,
      "a": []
    },
    {
      "n": "Gwanda",
      "c": "Zimbabwe",
      "p": 8252.5,
      "a": []
    },
    {
      "n": "Plumtree",
      "c": "Zimbabwe",
      "p": 1959.5,
      "a": []
    }
  ]
};

    // ============================================================================
    // FUZZY SEARCH ALGORITHM
    // ============================================================================

    function levenshteinDistance(str1, str2) {
        const track = Array(str2.length + 1).fill(null).map(() =>
            Array(str1.length + 1).fill(null));
        for (let i = 0; i <= str1.length; i += 1) {
            track[0][i] = i;
        }
        for (let j = 0; j <= str2.length; j += 1) {
            track[j][0] = j;
        }
        for (let j = 1; j <= str2.length; j += 1) {
            for (let i = 1; i <= str1.length; i += 1) {
                const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
                track[j][i] = Math.min(
                    track[j][i - 1] + 1,
                    track[j - 1][i] + 1,
                    track[j - 1][i - 1] + indicator
                );
            }
        }
        return track[str2.length][str1.length];
    }

    function searchCities(query) {
        if (!query || query.length < 2) return [];

        const queryLower = query.toLowerCase().trim();
        const results = [];

        // Search through all cities and airports
        Object.entries(CITY_TIMEZONE_DATA).forEach(([timezone, cities]) => {
            cities.forEach(city => {
                const cityLower = city.n.toLowerCase();
                let score = 0;
                let matchType = '';

                // Exact match
                if (cityLower === queryLower) {
                    score = 1000;
                    matchType = 'exact';
                }
                // Starts with
                else if (cityLower.startsWith(queryLower)) {
                    score = 500;
                    matchType = 'starts';
                }
                // Contains
                else if (cityLower.includes(queryLower)) {
                    score = 250;
                    matchType = 'contains';
                }
                // Check IATA code for airports
                else if (city.t === 'airport' && city.iata && city.iata.toLowerCase() === queryLower) {
                    score = 900;
                    matchType = 'iata-exact';
                }
                else if (city.t === 'airport' && city.iata && city.iata.toLowerCase().startsWith(queryLower)) {
                    score = 300;
                    matchType = 'iata-starts';
                }
                // Fuzzy match (Levenshtein distance)
                else {
                    const distance = levenshteinDistance(queryLower, cityLower);
                    if (distance <= 2) {
                        score = 100 - (distance * 30);
                        matchType = 'fuzzy';
                    }
                }

                if (score > 0) {
                    // Add population bonus for cities
                    if (city.t === 'city') {
                        score += Math.log10(city.p || 1) * 10;
                    }

                    results.push({
                        city: city.n,
                        country: city.c,
                        timezone: timezone,
                        score: score,
                        matchType: matchType,
                        population: city.p,
                        type: city.t,
                        iata: city.iata
                    });
                }
            });
        });

        // Sort by score (descending)
        results.sort((a, b) => b.score - a.score);

        // Return top 8 results
        return results.slice(0, 8);
    }

    function getTimezoneOffset(timezone) {
        try {
            const now = new Date();
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: timezone,
                timeZoneName: 'shortOffset'
            });
            const parts = formatter.formatToParts(now);
            const offset = parts.find(part => part.type === 'timeZoneName');
            return offset ? offset.value : '';
        } catch (e) {
            return '';
        }
    }

    // ============================================================================
    // UI COMPONENTS
    // ============================================================================

    function createSearchInput(timezoneDropdown, isEndTimezone) {
        const container = document.createElement('div');
        container.style.cssText = `
            position: relative;
            margin-top: ${isEndTimezone ? '24px' : '8px'};
            margin-bottom: 8px;
        `;

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = isEndTimezone ? 'End time zone' : 'Start time zone';
        input.style.cssText = `
            width: 100%;
            padding: 8px 12px;
            border: 1px solid #dadce0;
            border-radius: 4px;
            font-family: 'Google Sans', Roboto, Arial, sans-serif;
            font-size: 14px;
            outline: none;
            box-sizing: border-box;
            transition: border-color 0.2s;
        `;

        const resultsDropdown = document.createElement('div');
        resultsDropdown.className = 'tz-helper-dropdown';
        resultsDropdown.style.cssText = `
            position: fixed;
            background: white;
            border: 1px solid #dadce0;
            border-radius: 4px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            max-height: 300px;
            overflow-y: auto;
            z-index: 999999;
            display: none;
        `;

        // Append to body immediately
        document.body.appendChild(resultsDropdown);
        console.log('Created and appended dropdown to body:', resultsDropdown);
        console.log('Dropdown in DOM:', document.body.contains(resultsDropdown));

        let currentResults = [];
        let selectedIndex = -1;

        // Function to position the dropdown relative to the input
        function positionDropdown() {
            const rect = input.getBoundingClientRect();
            resultsDropdown.style.top = `${rect.bottom + 4}px`;
            resultsDropdown.style.left = `${rect.left}px`;
            resultsDropdown.style.width = `${rect.width}px`;
            console.log('Dropdown positioned at:', { top: rect.bottom + 4, left: rect.left, width: rect.width });
        }

        function renderResults(results) {
            currentResults = results;
            selectedIndex = -1;

            if (results.length === 0) {
                resultsDropdown.style.display = 'none';
                console.log('No results, hiding dropdown');
                return;
            }

            // Clear previous results
            while (resultsDropdown.firstChild) {
                resultsDropdown.removeChild(resultsDropdown.firstChild);
            }

            results.forEach((result, index) => {
                const item = document.createElement('div');
                item.dataset.index = index;
                item.style.cssText = `
                    padding: 10px 12px;
                    cursor: pointer;
                    font-size: 14px;
                    border-bottom: 1px solid #f0f0f0;
                    transition: background-color 0.1s;
                `;

                // Create city/country line
                const cityLine = document.createElement('div');
                cityLine.style.cssText = 'font-weight: 500; color: #202124;';
                const prefix = result.type === 'airport' ? '✈️ ' : '';
                const iataCode = result.type === 'airport' && result.iata ? ` (${result.iata})` : '';
                cityLine.textContent = `${prefix}${result.city}${iataCode}, ${result.country}`;

                // Create timezone line
                const offset = getTimezoneOffset(result.timezone);
                const timezoneLine = document.createElement('div');
                timezoneLine.style.cssText = 'font-size: 12px; color: #5f6368; margin-top: 2px;';
                timezoneLine.textContent = `${result.timezone} ${offset}`;

                item.appendChild(cityLine);
                item.appendChild(timezoneLine);

                item.addEventListener('mouseenter', () => {
                    selectResult(index);
                });

                item.addEventListener('click', () => {
                    applyTimezone(result);
                });

                resultsDropdown.appendChild(item);
            });

            // Position and show the dropdown
            positionDropdown();
            resultsDropdown.style.display = 'block';

            // Auto-select first result
            if (results.length > 0) {
                selectResult(0);
            }

            console.log('Dropdown shown with', results.length, 'results');
            console.log('Dropdown element:', resultsDropdown);
            console.log('Dropdown parent:', resultsDropdown.parentElement);
            console.log('Dropdown display style:', resultsDropdown.style.display);
        }

        function selectResult(index) {
            selectedIndex = index;
            Array.from(resultsDropdown.children).forEach((item, i) => {
                if (i === index) {
                    item.style.backgroundColor = '#e8f0fe';
                    item.scrollIntoView({ block: 'nearest' });
                } else {
                    item.style.backgroundColor = 'transparent';
                }
            });
        }

        function applyTimezone(result) {
            // Find the timezone dropdown
            const dropdown = timezoneDropdown.querySelector('[role="combobox"]');
            if (!dropdown) {
                console.error('Timezone dropdown not found');
                return;
            }

            // Find the option with matching timezone
            const listbox = document.querySelector(`#${dropdown.getAttribute('aria-controls')}`);
            if (!listbox) {
                console.error('Listbox not found');
                return;
            }

            // Timezone alias mappings for common variations
            const timezoneAliases = {
                'Africa/Addis_Ababa': ['Africa/Nairobi', 'EAT', 'East Africa Time'],
                'America/New_York': ['Eastern Time', 'EST', 'EDT', 'America/Detroit', 'America/Kentucky/Louisville', 'America/Kentucky/Monticello', 'America/Indiana/Indianapolis', 'America/Indiana/Vincennes', 'America/Indiana/Winamac', 'America/Indiana/Marengo', 'America/Indiana/Petersburg', 'America/Indiana/Vevay'],
                'America/Chicago': ['Central Time', 'CST', 'CDT', 'America/Indiana/Knox', 'America/Indiana/Tell_City', 'America/Menominee', 'America/North_Dakota/Center', 'America/North_Dakota/New_Salem', 'America/North_Dakota/Beulah'],
                'America/Denver': ['Mountain Time', 'MST', 'MDT', 'America/Boise'],
                'America/Los_Angeles': ['Pacific Time', 'PST', 'PDT'],
                'America/Phoenix': ['Arizona Time', 'America/Creston'],
                'America/Anchorage': ['Alaska Time', 'AKST', 'AKDT'],
                'Pacific/Honolulu': ['Hawaii Time', 'HST', 'Hawaii Standard Time'],
                'Europe/London': ['GMT', 'BST', 'Greenwich', 'Europe/Belfast', 'Europe/Guernsey', 'Europe/Isle_of_Man', 'Europe/Jersey'],
                'Europe/Paris': ['CET', 'CEST', 'Europe/Brussels', 'Europe/Amsterdam', 'Europe/Luxembourg', 'Europe/Monaco'],
                'Europe/Berlin': ['Europe/Busingen', 'Europe/Zurich'],
                'Europe/Rome': ['Europe/Vatican', 'Europe/San_Marino'],
                'Europe/Madrid': ['Europe/Andorra'],
                'Asia/Tokyo': ['JST', 'Japan Standard Time'],
                'Asia/Shanghai': ['China Standard Time', 'CST', 'Asia/Chongqing', 'Asia/Harbin', 'Asia/Kashgar', 'Asia/Urumqi'],
                'Asia/Kolkata': ['IST', 'India Standard Time', 'Asia/Calcutta'],
                'Asia/Dubai': ['GST', 'Gulf Standard Time', 'Asia/Muscat'],
                'Australia/Sydney': ['AEST', 'AEDT', 'Australia/Melbourne', 'Australia/ACT', 'Australia/Canberra', 'Australia/NSW'],
                'Australia/Brisbane': ['AEST', 'Australia/Queensland', 'Australia/Lindeman']
            };

            // Find matching option (with or without "suggestion:" prefix)
            const options = listbox.querySelectorAll('[role="option"]');
            let matchingOption = null;

            // Strategy 1: Exact match
            for (const option of options) {
                const dataValue = option.getAttribute('data-value');
                if (dataValue === result.timezone || dataValue === `suggestion:${result.timezone}`) {
                    matchingOption = option;
                    break;
                }
            }

            // Strategy 2: Try timezone aliases
            if (!matchingOption) {
                for (const [canonicalTz, aliases] of Object.entries(timezoneAliases)) {
                    if (aliases.includes(result.timezone)) {
                        console.log('Found alias match:', result.timezone, '→', canonicalTz);
                        for (const option of options) {
                            const dataValue = option.getAttribute('data-value');
                            if (dataValue === canonicalTz || dataValue === `suggestion:${canonicalTz}`) {
                                matchingOption = option;
                                break;
                            }
                        }
                        if (matchingOption) break;
                    }
                }
            }

            // Strategy 3: Match by UTC offset as last resort
            if (!matchingOption) {
                try {
                    const targetOffset = new Date().toLocaleString('en-US', { timeZone: result.timezone, timeZoneName: 'shortOffset' }).split('GMT')[1];
                    console.log('Target timezone offset:', targetOffset);

                    for (const option of options) {
                        const dataValue = option.getAttribute('data-value').replace('suggestion:', '');
                        try {
                            const optionOffset = new Date().toLocaleString('en-US', { timeZone: dataValue, timeZoneName: 'shortOffset' }).split('GMT')[1];
                            if (optionOffset === targetOffset) {
                                console.log('Found offset match:', dataValue, 'with offset', optionOffset);
                                matchingOption = option;
                                break;
                            }
                        } catch (e) {
                            // Skip invalid timezones
                        }
                    }
                } catch (e) {
                    console.error('Error matching by offset:', e);
                }
            }

            if (matchingOption) {
                // Trigger click on the option
                matchingOption.click();

                // Clear input and hide dropdown immediately
                input.value = '';
                resultsDropdown.style.display = 'none';
                currentResults = [];
                selectedIndex = -1;

                // If this is the end timezone, check the "use different timezones" checkbox
                if (isEndTimezone) {
                    setTimeout(() => {
                        enableDifferentTimezonesCheckbox();
                    }, 100);
                }

                // Keep focus on input for Tab/Enter navigation
                input.focus();
            } else {
                console.error('Matching timezone option not found:', result.timezone);
                console.log('Available timezone options:', Array.from(options).map(o => o.getAttribute('data-value')));

                // Still clear the input even if we couldn't find a match
                input.value = '';
                resultsDropdown.style.display = 'none';
                currentResults = [];
                selectedIndex = -1;
            }
        }

        function enableDifferentTimezonesCheckbox() {
            // Find the checkbox by its aria-label (both German and English)
            // German: "Unterschiedliche Zeitzonen für Beginn und Ende verwenden"
            // English: "Use different time zones for start and end"
            const checkbox = document.querySelector(
                'input[type="checkbox"][aria-label*="nterschiedliche"], ' +
                'input[type="checkbox"][aria-label*="different"][aria-label*="time zone"]'
            );

            if (checkbox) {
                if (!checkbox.checked) {
                    console.log('Found different timezones checkbox, checking it:', checkbox);
                    checkbox.click();
                    console.log('Checkbox clicked, checked state:', checkbox.checked);
                } else {
                    console.log('Checkbox already checked');
                }
            } else {
                console.log('Different timezones checkbox not found');
                console.log('Available checkboxes:', document.querySelectorAll('input[type="checkbox"]'));
            }
        }

        // Event listeners
        input.addEventListener('focus', () => {
            input.style.borderColor = '#1a73e8';
            if (currentResults.length > 0) {
                positionDropdown();
                resultsDropdown.style.display = 'block';
            }
        });

        input.addEventListener('blur', () => {
            input.style.borderColor = '#dadce0';
            // Delay hiding to allow click events
            setTimeout(() => {
                resultsDropdown.style.display = 'none';
            }, 200);
        });

        input.addEventListener('input', (e) => {
            const query = e.target.value;
            const results = searchCities(query);
            console.log('Search query:', query, 'Results:', results.length);
            renderResults(results);
        });

        // Reposition dropdown on scroll/resize
        const repositionHandler = () => {
            if (resultsDropdown.style.display === 'block') {
                positionDropdown();
            }
        };

        window.addEventListener('scroll', repositionHandler, true);
        window.addEventListener('resize', repositionHandler);

        input.addEventListener('keydown', (e) => {
            // Handle Enter key
            if (e.key === 'Enter') {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                console.log('Enter pressed, currentResults:', currentResults.length);

                if (currentResults.length > 0) {
                    // Apply selected timezone
                    if (selectedIndex >= 0 && selectedIndex < currentResults.length) {
                        applyTimezone(currentResults[selectedIndex]);
                    } else {
                        applyTimezone(currentResults[0]);
                    }
                } else {
                    // No results - close the dialog by clicking OK button
                    clickOkButton();
                }
                return;
            }

            // Don't interfere with Tab - let it move focus naturally
            if (e.key === 'Tab') {
                return;
            }

            if (currentResults.length === 0) return;

            switch(e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    e.stopPropagation();
                    selectedIndex = Math.min(selectedIndex + 1, currentResults.length - 1);
                    selectResult(selectedIndex);
                    break;

                case 'ArrowUp':
                    e.preventDefault();
                    e.stopPropagation();
                    selectedIndex = Math.max(selectedIndex - 1, 0);
                    selectResult(selectedIndex);
                    break;

                case 'Escape':
                    e.preventDefault();
                    e.stopPropagation();
                    input.value = '';
                    resultsDropdown.style.display = 'none';
                    currentResults = [];
                    selectedIndex = -1;
                    break;
            }
        }, true); // Use capture phase to intercept early

        function clickOkButton() {
            // Find the OK button by its text content and attributes
            const okButton = document.querySelector(
                'button[data-mdc-dialog-action][data-mdc-dialog-button-default]'
            );

            if (okButton) {
                console.log('Clicking OK button to close dialog');
                okButton.click();
            } else {
                console.log('OK button not found');
            }
        }

        container.appendChild(input);
        // Note: resultsDropdown is appended to document.body on creation (see above)

        return container;
    }

    // ============================================================================
    // INITIALIZATION
    // ============================================================================

    function findTimezoneDropdowns() {
        // Look for timezone dropdowns by their label
        const dropdowns = document.querySelectorAll('[data-stable-unique-label-id]');
        const timezoneDropdowns = [];

        dropdowns.forEach(dropdown => {
            const labelId = dropdown.getAttribute('data-stable-unique-label-id');
            const labelText = document.getElementById(labelId)?.textContent || '';

            // Check if this is a timezone dropdown (German or English)
            if (labelText.includes('Zeitzone') || labelText.includes('Time zone')) {
                timezoneDropdowns.push(dropdown);
            }
        });

        // Alternative method: if no timezone dropdowns found, look for comboboxes with timezone options
        if (timezoneDropdowns.length === 0) {
            console.log('Original method found no timezone dropdowns, trying alternatives...');
            const comboboxes = document.querySelectorAll('[role="combobox"]');

            comboboxes.forEach(combobox => {
                const listboxId = combobox.getAttribute('aria-controls');
                if (listboxId) {
                    const listbox = document.getElementById(listboxId);
                    if (listbox) {
                        const options = listbox.querySelectorAll('[role="option"]');
                        // Check if options look like timezones (contain GMT, UTC, or paths with /)
                        const hasTimezoneOptions = Array.from(options).some(option => {
                            const dataValue = option.getAttribute('data-value') || '';
                            const text = option.textContent || '';
                            return dataValue.includes('/') || text.includes('GMT') || text.includes('UTC');
                        });

                        if (hasTimezoneOptions && options.length > 10) {
                            console.log('Found timezone dropdown (alternative method):', combobox);
                            // Find the parent container
                            const container = combobox.closest('[data-stable-unique-label-id]') || combobox.parentElement;
                            if (container && !timezoneDropdowns.includes(container)) {
                                timezoneDropdowns.push(container);
                            }
                        }
                    }
                }
            });
        }

        return timezoneDropdowns;
    }

    function injectSearchInputs() {
        const timezoneDropdowns = findTimezoneDropdowns();

        console.log(`Found ${timezoneDropdowns.length} timezone dropdown(s)`);

        timezoneDropdowns.forEach((dropdown, index) => {
            // Check if we already injected a search input (check in closest container)
            const container = dropdown.closest('[data-stable-unique-label-id]') || dropdown;
            if (container.querySelector('.tz-helper-search')) {
                console.log(`Search input already exists for dropdown ${index} - skipping`);
                return;
            }

            // Determine if this is the end timezone by index (second dropdown = end timezone)
            const isEndTimezone = index === 1;

            console.log('Timezone dropdown type:', isEndTimezone ? 'END' : 'START', 'Index:', index);

            const searchInput = createSearchInput(dropdown, isEndTimezone);
            searchInput.classList.add('tz-helper-search');

            // Try to insert after the dropdown as sibling, fallback to appendChild
            try {
                dropdown.parentElement.insertBefore(searchInput, dropdown.nextSibling);
            } catch (e) {
                console.log('Fallback insertion method');
                dropdown.appendChild(searchInput);
            }
        });
    }

    // Watch for DOM changes (for when event dialog opens)
    let observerTimeout;
    const observer = new MutationObserver(() => {
        // Debounce to prevent infinite loops
        clearTimeout(observerTimeout);
        observerTimeout = setTimeout(() => {
            // Check if timezone dropdowns appeared
            const timezoneDropdowns = findTimezoneDropdowns();
            if (timezoneDropdowns.length > 0 && !document.querySelector('.tz-helper-search')) {
                console.log('New timezone dropdowns detected, injecting search inputs...');
                injectSearchInputs();
            }
        }, 500);
    });

    // Start observing
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Initial injection
    setTimeout(() => {
        injectSearchInputs();
    }, 1000);

    console.log('Google Calendar Timezone Helper loaded!');
})();
