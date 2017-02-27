const places =  [
  {
    id: 1, 
    position: {lat: 22.6301162, lng: 120.31294260000004},
    category: 'Food',
    subCategory: 'Restaurant',
    tags: ['vietnamese', 'restaurant', 'affordable'],
    title: 'TianHu Vietnamese Restaurant', 
    imagesArray: [
      'http://61.63.55.131/33536/inner_33536_o_18.jpg',
      'http://61.63.55.131/33536/product_10875471_o_1.jpg',
      'http://61.63.55.131/33536/inner_33536_o_10.jpg',
      'http://61.63.55.131/33536/face_o.jpg'
    ],
    summary: 'The best moderately priced Vietnamese food in town!', 
    phone: '07 223 2036',
    address: 'No. 43-45, Minzu 2nd Rd, Xinxing District, Kaohsiung City, 800',
    website: 'http://kw.shop2000.com.tw/',
    hours: 'Tues-Sun: 11:30-14:30 and 17:00-20:30; Closed Mondays',
    description: `With a menu of 150 items, all meticulously detailed with pictures and English names, 
                  this restaurant is great for non-Chinese speakers. This is the second location for this
                  local chain (the other is in the XingZhong/WenHung Night Market near SanDuo). The restaurant is
                  open for lunch and dinner, Tuesday-Sunday. \n
                  Recommended dishes: Explosion Pork, Crispy Rice Crust with Pork, Banh Mi, and Chicken Skewers.`,

  },
  {
    id: 2, 
    position: {lat: 22.624695, lng: 120.307813},
    category: 'Nature',
    subCategory: 'Camping',
    title: "Brendan's House", 
    imagesArray: [],
    summary: '', 
    phone: '',
  },
  {
    id: 3, 
    position: {lat: 22.62994914039921, lng: 120.31899869441986},
    category: 'Recreation',
    subCategory: 'Swimming Pool',
    tags: [],
    title: 'Nanhe Spa', 
    imagesArray: [
      'http://s8.heyxus.com/local/custom/shops/8k49/660/photos/11041735501.jpg',
      'http://www.nhspa.com.tw/------1_------1.jpg',
      'http://week.ltn.com.tw/picture/travel/2015/07/19/2664_fq01.jpg?635733343351112921',
      'http://static.easy.sina.com.tw/img/store/1206958104243-400x300.jpg'
    ],
    summary: 'Your very own hotsprings resort in the middle of downtown Kaohsiung', 
    phone: '07 223 7875',
    address: 'No. 45, Zhongzheng 2nd Rd, Lingya District, Kaohsiung City, 802',
    hours: 'Everyday: 05:30-23:00',
    website: 'http://www.nhspa.com.tw/',

  },
  {
    id: 4, 
    position: {lat: 22.646440050553554, lng: 120.30407756567001},
    category: 'Recreation', 
    subCategory: 'Boardgames',
    title: "Tobey's Games Cafe", 
    imagesArray: [
      'https://scontent-tpe1-1.xx.fbcdn.net/v/t31.0-8/14890359_653690454813700_6304868730885236168_o.jpg?oh=2f963eeb77f9fb50607999aaedafca4f&oe=590994B2',
      'http://3.bp.blogspot.com/-0tsdKuXnpvk/U835j5O1s0I/AAAAAAAACy0/p37qPgJNZyQ/s1600/20140626_191617.jpg',
      'http://i.imgur.com/zghdn9F.jpg',
    ],
    summary: "A great place to play games and chew bubblegum. As long as you're not all out of bubblegum.", 
    phone: '07 322 3929',
    address: "No. 1, Boren St, Sanmin District, Kaohsiung City, 807",
    hours: 'Sun, Tues-Thurs: 11:30-22:30; Fri-Sat: 11:30-23:30; Closed Mondays', 
    description: `One of Kaohsiung's best places to play boardgames. Tobey's has arguably the largest and most diverse 
                  selection of games in town. The cost is 40NT per person per hour to play in the store. Games are also available
                  to borrow at a cost of 10% of the retail price of the game per day. Borrowing requires you to put down 
                  the full retail cost of the game as deposit as well. \n
                  Tobey's offers one of the largest games venues in town as well, with plenty of space upstairs to play, you'd be
                  hard-pressed to not find a table if you just dropped in with friends (doesn't hurt to call ahead for big groups
                  though). `
  },
  { 
    id: 5, 
    position: {lat: 22.623625, lng: 120.305115},
    category: 'Food',
    subCategory: 'Restaurant',
    tags: [],
    title: 'LiuJiang Lunch Box 劉江便當', 
    imagesArray: [
    ],
    summary: '', 
    phone: '',
    address: '',
    website: '',
    hours: '',
    description: ``,

  },
  { 
    id: 6, 
    position: {lat: 22.6165778, lng: 120.30325859999994},
    category: 'Recreation',
    subCategory: 'Bowling Alley',
    tags: [],
    title: 'Shoushan Bowling Alley 壽山保齡球館', 
    imagesArray: [
    ],
    summary: '', 
    phone: '',
    address: '',
    website: '',
    hours: '',
    description: `A great place to bowl.`,

  },
  { 
    id: 7, 
    position: {lat: 22.631849, lng: 120.260849},
    category: 'Nature',
    subCategory: 'Beach',
    tags: [],
    title: 'Secret Beach (shhhhhh...)', 
    imagesArray: [
    ],
    summary: '', 
    phone: '',
    address: '',
    website: '',
    hours: '',
    description: `A great place to swim.`,

  },
  { 
    id: 8, 
    position: {lat: 22.628363, lng: 120.305657},
    category: 'Food',
    subCategory: 'Bakery',
    tags: [],
    title: "L'atelier de pain", 
    imagesArray: [
    ],
    summary: '', 
    phone: '',
    address: '',
    website: '',
    hours: '',
    description: `Some of the most authentic baguettes in town.`,

  },
  { 
    id: 9, 
    position: {lat: 22.622724, lng: 120.316984},
    category: 'Food',
    subCategory: 'Restaurant',
    tags: [],
    title: 'Lahore Restaurant', 
    imagesArray: [
    ],
    summary: '', 
    phone: '',
    address: '',
    website: '',
    hours: '',
    description: `Cheap Pakistani/Indian food with freshly made chapatis.`,

  },
  { 
    id: 10, 
    position: {lat: 22.623456, lng: 120.318382},
    category: 'Food',
    subCategory: 'Bakery',
    tags: [],
    title: "S'more Sugar II", 
    imagesArray: [
    ],
    summary: '', 
    phone: '',
    address: '',
    website: '',
    hours: '',
    description: `The best patisserie in town!`,

  },
  { 
    id: 11, 
    position: {lat: 22.664121, lng: 120.309573},
    category: 'Food',
    subCategory: 'Bakery',
    tags: [],
    title: "S'more Sugar", 
    imagesArray: [
    ],
    summary: '', 
    phone: '',
    address: 'No. 167, Xinhai Rd, Zuoying District, Kaohsiung City, Taiwan 813',
    website: '',
    hours: '',
    description: `The best patisserie in town!`,

  },
  { 
    id: 12, 
    position: {lat: 22.63149, lng: 120.318671},
    category: 'Recreation',
    subCategory: 'Boardgames',
    tags: [],
    title: 'Punch Boardgames 龐奇桌遊餐廳', 
    imagesArray: [
    ],
    summary: '', 
    phone: '07 223 3338',
    address: 'No. 31, Taishun St, Lingya District, Kaohsiung City, Taiwan 802',
    website: 'http://punchboardgame.pixnet.net/blog',
    hours: '',
    description: ``,

  },
  { 
    id: 13, 
    position: {lat: 22.648769 , lng: 120.322938},
    category: 'Recreation',
    subCategory: 'Boardgames',
    tags: [],
    title: 'Join Board Game Studio 桌癮桌遊休閒空間', 
    imagesArray: [
    ],
    summary: '', 
    phone: '07 380 8020',
    address: 'No. 1, Jiande Rd, Sanmin District, Kaohsiung City, Taiwan 807',
    website: '',
    hours: '',
    description: ``,

  },

  { 
    id: 14, 
    position: {lat: 22.666182 , lng: 120.284264},
    category: 'Food',
    subCategory: 'Restaurant',
    tags: [],
    title: 'Katsicafé 卡茲咖啡', 
    imagesArray: [
    ],
    summary: '', 
    phone: '',
    address: 'No. 1823, Jiuru 4th Rd, Gushan District, Kaohsiung City, Taiwan 804',
    website: 'https://www.facebook.com/katsicafe/',
    hours: '',
    description: ``,

  },

  { 
    id: 15, 
    position: {lat: 22.647086 , lng: 120.297495},
    category: 'Food',
    subCategory: 'Restaurant',
    tags: [],
    title: ' Hungry Ghost 餓鬼餐館', 
    imagesArray: [
    ],
    summary: '', 
    phone: '0982 261 367',
    address: 'No.233, Hankou St., Sanmin Dist., Kaohsiung City 807',
    website: 'https://www.facebook.com/hungryghost.taiwan/',
    hours: '',
    description: ``,

  },

  { 
    id: 16, 
    position: {lat:  22.627463  , lng: 120.296143},
    category: 'Food',
    subCategory: 'Restaurant',
    tags: [],
    title: 'Enhui Thai Food 恩慧泰式小館', 
    imagesArray: [
    ],
    summary: '', 
    phone: '0973 373 215',
    address: 'No. 8, Datong 2nd Rd, Qianjin District, Kaohsiung City, Taiwan 801',
    website: '',
    hours: '',
    description: ``,

  },

  { 
    id: 17, 
    position: {lat: 22.628024 , lng: 120.307803},
    category: 'Food',
    subCategory: 'Restaurant',
    tags: [],
    title: 'Chunlun Guaboa 春蘭割包', 
    imagesArray: [
    ],
    summary: '', 
    phone: '07 201 7806',
    address: 'No. 5, Fuxing 1st Rd, Xinxing District, Kaohsiung City, Taiwan 800',
    website: '',
    hours: '',
    description: ``,

  },

  { 
    id: 18, 
    position: {lat: 22.637513 , lng: 120.276765},
    category: 'Nature',
    subCategory: 'Hiking',
    tags: [],
    title: 'Monkey Mountain/Shoushan - Zoo Entrance', 
    imagesArray: [
    ],
    summary: '', 
    phone: '',
    address: 'No. 352, Wanshou Rd, Gushan District, Kaohsiung City, Taiwan 804',
    website: '',
    hours: '',
    description: ``,

  },
  { 
    id: 19, 
    position: {lat: 22.651522 , lng: 120.273144},
    category: 'Nature',
    subCategory: 'Hiking',
    tags: [],
    title: 'Monkey Mountain/Shoushan - Parking Lot Entrance', 
    imagesArray: [
    ],
    summary: '', 
    phone: '',
    address: 'No. 98, Qingquan St, Gushan District, Kaohsiung City, Taiwan 804',
    website: '',
    hours: '',
    description: ``,

  },
  { 
    id: 20, 
    position: {lat: 22.655455  , lng: 120.273176},
    category: 'Nature',
    subCategory: 'Hiking',
    tags: [],
    title: 'Monkey Mountain/Shoushan - Mountain Climbing Entrance', 
    imagesArray: [
    ],
    summary: '', 
    phone: '',
    address: '高雄市鼓山區鼓山三路25巷61弄8號',
    website: '',
    hours: '',
    description: ``,

  },
  { 
    id: 21, 
    position: {lat: 22.643422 , lng: 120.309616},
    category: 'Recreation',
    subCategory: 'Boardgames',
    tags: [],
    title: 'Fun4桌遊餐廳 (Gaoyi Branch)', 
    imagesArray: [
    ],
    summary: '', 
    phone: '',
    address: 'No. 145, Rehe 1st St, Sanmin District, Kaohsiung City, Taiwan 807',
    website: '',
    hours: '',
    description: ``,

  },
  { 
    id: 22, 
    position: {lat: 22.644353 , lng: 120.315802},
    category: 'Food',
    subCategory: 'Food Market',
    tags: [],
    title: 'Wholesale Produce Market 高雄市果菜批發市場', 
    imagesArray: [
    ],
    summary: '', 
    phone: '',
    address: 'No. 40, Lane 100, Minzu 1st Rd, Sanmin District, Kaohsiung City, Taiwan 807',
    website: '',
    hours: '',
    description: ``,

  },
  { 
    id: 23, 
    position: {lat: 22.657195 , lng: 120.304644},
    category: 'Food',
    subCategory: 'Restaurant',
    tags: [],
    title: 'Arkansas Diner', 
    imagesArray: [
    ],
    summary: '', 
    phone: '07 550 9177',
    address: '',
    website: 'http://www.arkansasdiner.com/',
    hours: '',
    description: ``,

  },
  { 
    id: 24, 
    position: {lat: 22.657195 , lng: 120.315802},
    category: '',
    subCategory: '',
    tags: [],
    title: '', 
    imagesArray: [
    ],
    summary: '', 
    phone: '',
    address: '',
    website: '',
    hours: '',
    description: ``,

  },

]

export default places;
