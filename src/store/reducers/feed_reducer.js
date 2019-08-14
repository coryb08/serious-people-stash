import { FETCH_BLURBS } from "../types.js";

let defaultState = {
  user: "",
  blurb: "",
  name: "",
  userImage: "",
  created_at: "",
  updated_at: ""
};
export default function(state = [], action) {
  switch (action.type) {
    case FETCH_BLURBS:
      return action.payload;
    default:
      return state;
  }
}

// const defaultState = [
//   {
//     gender: "male",
//     name: {
//       title: "mr",
//       first: "marion",
//       last: "dunn"
//     },
//     timePosted: "5 mins ago",
//     blurb: "me: yeah *whispers* i don’t have any money",
//     location: {
//       city: "New York City",
//       state: "New York",
//       postcode: "10012",
//       coordinates: {
//         latitude: "40.7128",
//         longitude: "74.0060"
//       },
//       timezone: {
//         offset: "-5:00",
//         description: "Kaliningrad, South Africa"
//       }
//     },
//     email: "marion.dunn@example.com",
//     login: {
//       uid: "bvewQNQDhXgbmzLF8OOVTJ20AuE3",
//       username: "organicelephant880",
//       password: "absolut",
//       salt: "f7DRWf3e",
//       md5: "51bf52a4be65c6366c0514557e15e3cf",
//       sha1: "82aa0a4b5019744698018407f4700d949b49837b",
//       sha256: "20bdb77097b14af3f0d7328a012226b36d17b0d4977359f6ff6e86edaa467946"
//     },
//     dob: {
//       date: "1949-05-09T03:45:39Z",
//       age: 69
//     },
//     registered: {
//       date: "2009-12-04T22:54:06Z",
//       age: 9
//     },
//     phone: "01980 24884",
//     cell: "0744-190-211",
//     id: {
//       name: "NINO",
//       value: "HT 31 80 19 H"
//     },
//     picture: {
//       large: "https://randomuser.me/api/portraits/men/48.jpg",
//       medium: "https://randomuser.me/api/portraits/med/men/48.jpg",
//       thumbnail: "https://randomuser.me/api/portraits/thumb/men/48.jpg"
//     },
//     nat: "GB"
//   },
//   {
//     gender: "male",
//     name: {
//       title: "mr",
//       first: "benjamin",
//       last: "poulsen"
//     },
//     timePosted: "1 min ago",
//     blurb: `Me: What do you want for Christmas? \n \nHim: You not telling me I did something wrong for a whole day. \n \nMe: no. Think of something else.`,
//     location: {
//       city: "New York City",
//       state: "New York",
//       postcode: "10005",
//       coordinates: {
//         latitude: "40.7128",
//         longitude: "74.0060"
//       },
//       timezone: {
//         offset: "-5:00",
//         description: "Almaty, Dhaka, Colombo"
//       }
//     },
//     email: "benjamin.poulsen@example.com",
//     login: {
//       uid: "AKekM501A4Z2vRnRKNkdsuz8wV23",
//       username: "lazyelephant748",
//       password: "claude",
//       salt: "1FIgfAxZ",
//       md5: "786101f139293152cbeb75bcb03871e0",
//       sha1: "77281b1692538f296b1a631dce80af5317400e4f",
//       sha256: "33948ab1865e331a73c0fd51f3429651f4c9a31ea4cb9155fab37a861cdfad26"
//     },
//     dob: {
//       date: "1966-05-04T12:58:10Z",
//       age: 52
//     },
//     registered: {
//       date: "2011-03-28T22:33:10Z",
//       age: 7
//     },
//     phone: "61475364",
//     cell: "37359797",
//     id: {
//       name: "CPR",
//       value: "673619-3681"
//     },
//     picture: {
//       large: "https://randomuser.me/api/portraits/men/25.jpg",
//       medium: "https://randomuser.me/api/portraits/med/men/25.jpg",
//       thumbnail: "https://randomuser.me/api/portraits/thumb/men/25.jpg"
//     },
//     nat: "DK"
//   },
//   {
//     gender: "female",
//     name: {
//       title: "mrs",
//       first: "alicia",
//       last: "selmer"
//     },
//     timePosted: "20 mins ago",
//     blurb: `"How was your trip, boy?" I ask my dog, petting his glowing fur. "There's been a development," he says gravely, removing his space helmet`,
//     location: {
//       city: "New York City",
//       state: "New York",
//       postcode: "10004",
//       coordinates: {
//         latitude: "40.7128",
//         longitude: "74.0060"
//       },
//       timezone: {
//         offset: "-5:00",
//         description: "Mid-Atlantic"
//       }
//     },
//     email: "alicia.selmer@example.com",
//     login: {
//       uid: "ASzmpq1VwpeETgPv5c8Kf68nAY53",
//       username: "greenzebra951",
//       password: "seagull",
//       salt: "D8FF2AoG",
//       md5: "1ad4aa14609aa69c69d18aa27eb1b8e3",
//       sha1: "b11e7420794193d9d41ae9a9ad639b4692c26605",
//       sha256: "01ae6ad5a9454d374d5886d4af4f8467cf7f9c878ce88007fbcce55cb036b2a9"
//     },
//     dob: {
//       date: "1954-11-24T20:38:15Z",
//       age: 64
//     },
//     registered: {
//       date: "2009-11-26T20:02:16Z",
//       age: 9
//     },
//     phone: "88739367",
//     cell: "42671286",
//     id: {
//       name: "FN",
//       value: "24115402133"
//     },
//     picture: {
//       large: "https://randomuser.me/api/portraits/women/54.jpg",
//       medium: "https://randomuser.me/api/portraits/med/women/54.jpg",
//       thumbnail: "https://randomuser.me/api/portraits/thumb/women/54.jpg"
//     },
//     nat: "NO"
//   },
//   {
//     gender: "male",
//     name: {
//       title: "mr",
//       first: "lucas",
//       last: "beck"
//     },
//     timePosted: "8 mins ago",
//     blurb: `You can tell a lot by a guy's teeth. \n \nFor instance, if they're three feet long, that's no man; that's a hippo.`,
//     location: {
//       city: "New York City",
//       state: "New York",
//       postcode: "100065",
//       coordinates: {
//         latitude: "40.7128",
//         longitude: "74.0060"
//       },
//       timezone: {
//         offset: "-5:00",
//         description: "Azores, Cape Verde Islands"
//       }
//     },
//     email: "lucas.beck@example.com",
//     login: {
//       uid: "WgW6yf9F62fM3BEi31TiJteucyv2",
//       username: "goldensnake409",
//       password: "brandy",
//       salt: "dpeIvi4k",
//       md5: "c1056c813ce6bdb63bc8a9ff60fe927b",
//       sha1: "3e4543c6c498c26d9801f7193463479c904e7e90",
//       sha256: "5770c44366e20c28b30be9c2a2ccbe475d4b519a01da8e032cc80e1a7ecd240b"
//     },
//     dob: {
//       date: "1976-09-04T09:46:45Z",
//       age: 42
//     },
//     registered: {
//       date: "2009-01-07T08:35:43Z",
//       age: 9
//     },
//     phone: "01755 082384",
//     cell: "0731-047-222",
//     id: {
//       name: "NINO",
//       value: "HH 00 51 30 F"
//     },
//     picture: {
//       large: "https://randomuser.me/api/portraits/men/84.jpg",
//       medium: "https://randomuser.me/api/portraits/med/men/84.jpg",
//       thumbnail: "https://randomuser.me/api/portraits/thumb/men/84.jpg"
//     },
//     nat: "GB"
//   },
//   {
//     gender: "female",
//     name: {
//       title: "mrs",
//       first: "karlisa",
//       last: "lopes"
//     },
//     timePosted: "5 mins ago",
//     blurb: `Make porridge seem more glamorous by describing it as "Oat Cuisine".`,
//     location: {
//       city: "New York City",
//       state: "New York",
//       postcode: "10002",
//       coordinates: {
//         latitude: "40.7128",
//         longitude: "74.0060"
//       },
//       timezone: {
//         offset: "-5:00",
//         description: "Alaska"
//       }
//     },
//     email: "karlisa.lopes@example.com",
//     login: {
//       uid: "hnH3Bn2HJRYJo6mqsM8DEH82QjP2",
//       username: "angryzebra380",
//       password: "tarheel",
//       salt: "M4sfELbM",
//       md5: "aa3fe3ffa7289b4e1bc830a0db66cdb4",
//       sha1: "173612c989c9246bde7c4ca058b788c8436ff56b",
//       sha256: "8b13dbd431b87ae38c05c580349cbd73fb3388d6f9062c66f2f97c22c567d363"
//     },
//     dob: {
//       date: "1980-08-25T15:59:18Z",
//       age: 38
//     },
//     registered: {
//       date: "2005-10-11T05:33:03Z",
//       age: 13
//     },
//     phone: "(04) 5789-4296",
//     cell: "(40) 8228-3202",
//     id: {
//       name: "",
//       value: null
//     },
//     picture: {
//       large: "https://randomuser.me/api/portraits/women/90.jpg",
//       medium: "https://randomuser.me/api/portraits/med/women/90.jpg",
//       thumbnail: "https://randomuser.me/api/portraits/thumb/women/90.jpg"
//     },
//     nat: "BR"
//   },
//   {
//     gender: "female",
//     name: {
//       title: "mrs",
//       first: "lene",
//       last: "juul"
//     },
//     timePosted: "5 mins ago",
//     blurb: `Whenever you introduce someone, put air quotes around their name. \n \nI want you to meet my friend "Ami"`,
//     location: {
//       city: "New York City",
//       state: "New York",
//       postcode: "10003",
//       coordinates: {
//         latitude: "40.7128",
//         longitude: "74.0060"
//       },
//       timezone: {
//         offset: "-5:00",
//         description: "Brussels, Copenhagen, Madrid, Paris"
//       }
//     },
//     email: "lene.juul@example.com",
//     login: {
//       uid: "lWMeXwodafZuCIFpxZIqTXQJ7fv1",
//       username: "ticklishpanda791",
//       password: "quant4307s",
//       salt: "OrJl8slX",
//       md5: "566edc6903aa5f5beedb611265a520ef",
//       sha1: "7d47a1c5a5a9c8dfe76068121d5766e75b35e591",
//       sha256: "b5b6b348758438fe67997c9328f7e7b99f9e8de0ca2998ebda9b9d5b30211fa3"
//     },
//     dob: {
//       date: "1958-05-14T10:29:46Z",
//       age: 60
//     },
//     registered: {
//       date: "2003-05-28T14:01:48Z",
//       age: 15
//     },
//     phone: "72440820",
//     cell: "41225081",
//     id: {
//       name: "FN",
//       value: "14055841153"
//     },
//     picture: {
//       large: "https://randomuser.me/api/portraits/women/29.jpg",
//       medium: "https://randomuser.me/api/portraits/med/women/29.jpg",
//       thumbnail: "https://randomuser.me/api/portraits/thumb/women/29.jpg"
//     },
//     nat: "NO"
//   },
//   {
//     gender: "female",
//     name: {
//       title: "mrs",
//       first: "beth",
//       last: "walker"
//     },
//     timePosted: "8 mins ago",
//     blurb: `[uses 225 gallons of water to clean out peanut butter jar for recycling]`,
//     location: {
//       city: "New York City",
//       state: "New York",
//       postcode: "10019",
//       coordinates: {
//         latitude: "40.7128",
//         longitude: "74.0060"
//       },
//       timezone: {
//         offset: "-5:00",
//         description: "Kaliningrad, South Africa"
//       }
//     },
//     email: "beth.walker@example.com",
//     login: {
//       uid: "tu4j25HPjpdCkGA7fwGc1D9nHCk1",
//       username: "blackbird195",
//       password: "herring",
//       salt: "v4JseCYR",
//       md5: "02deba5b253d1be11e8092a048dc4547",
//       sha1: "3e62f6985af38b53ce6e41f2bb7a93482b6156fd",
//       sha256: "bda1921553df6514180a64e13a39571a7b90bf02c22a6748d7e29fe2adf98d80"
//     },
//     dob: {
//       date: "1958-01-28T02:50:15Z",
//       age: 60
//     },
//     registered: {
//       date: "2015-06-13T22:35:26Z",
//       age: 3
//     },
//     phone: "04-9691-9011",
//     cell: "0402-469-108",
//     id: {
//       name: "TFN",
//       value: "932081118"
//     },
//     picture: {
//       large: "https://randomuser.me/api/portraits/women/87.jpg",
//       medium: "https://randomuser.me/api/portraits/med/women/87.jpg",
//       thumbnail: "https://randomuser.me/api/portraits/thumb/women/87.jpg"
//     },
//     nat: "AU"
//   }
// ].reverse();
