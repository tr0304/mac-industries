/* Mac Industries - product list
   Every product shown on the Services page is stored here.
   To add a product, copy one block, change the details and add it to the end of the list.
   Prices are numbers (so they can be sorted); priceLabel is the text shown on the card.
   stock is the number of items available. These are sample numbers for this student project - change them as you like. */

var PRODUCTS = [
    {
        id: 'ps5',
        name: 'The PS5',
        category: 'Consoles',
        platform: 'PS5',
        price: 10000,
        priceLabel: 'R10000',
        stock: 8,
        image: 'ps5-console.jpg',
        alt: 'PlayStation 5 console',
        note: '(Enquire for better versions)',
        description: 'Welcome to the next generation of gaming. Powered by ultra-high-speed SSD load times, 3D audio, and immersive DualSense™ haptic feedback, the PlayStation 5 re-defines what it means to step into another world. Gear up and experience gaming engineered without boundaries.',
        portrait: false
    },
    {
        id: 'xbox-series-s',
        name: 'The Xbox S series',
        category: 'Consoles',
        platform: 'Xbox',
        price: 11000,
        priceLabel: 'R11000',
        stock: 5,
        image: 'xbox-console.jpg',
        alt: 'Xbox console',
        note: '(Enquire for better versions)',
        description: 'Meet the compact, all-digital Xbox Series S. With up to 4 teraflops of graphics power, smooth gaming at up to 1440p and fast load times thanks to Xbox Velocity Architecture, it brings next-generation gaming into a smaller, more affordable console.',
        portrait: false
    },
    {
        id: 'gta-6',
        name: 'Grand Theft Auto 6',
        category: 'Games',
        platform: 'PS5',
        price: 2000,
        priceLabel: 'R2000',
        stock: 20,
        image: 'gta-6-cover.png',
        alt: 'Grand Theft Auto 6 game cover',
        note: 'PS5 game',
        description: '',
        portrait: true
    },
    {
        id: 'minecraft',
        name: 'Minecraft',
        category: 'Games',
        platform: 'Xbox',
        price: 1000,
        priceLabel: 'R1000',
        stock: 15,
        image: 'minecraft-cover.png',
        alt: 'Minecraft game artwork',
        note: 'Xbox game',
        description: '',
        portrait: true
    },
    {
        id: 'ea-fc-26',
        name: 'EA Sports FC 26',
        category: 'Games',
        platform: 'PS5',
        price: 1600,
        priceLabel: 'R1600',
        stock: 12,
        image: 'ea-fc-26-cover.png',
        alt: 'EA Sports FC 26 game cover for PS5',
        note: 'PS5 game',
        description: '',
        portrait: true
    },
    {
        id: 'god-of-war',
        name: 'God of War Ragnarök',
        category: 'Games',
        platform: 'PS5',
        price: 900,
        priceLabel: 'R900',
        stock: 10,
        image: 'god-of-war-ragnarok-cover.png',
        alt: 'God of War Ragnarok game cover for PS5',
        note: 'PS5 game',
        description: '',
        portrait: true
    },
    {
        id: 'gran-turismo-7',
        name: 'Gran Turismo 7',
        category: 'Games',
        platform: 'PS5',
        price: 2000,
        priceLabel: 'R2000',
        stock: 2,
        image: 'gran-turismo-7-cover.png',
        alt: 'Gran Turismo 7 game cover for PS5',
        note: 'PS5 game',
        description: '',
        portrait: true
    },
    {
        id: 'controllers',
        name: 'Controllers',
        category: 'Accessories',
        platform: 'PlayStation and Xbox',
        price: 1100,
        priceLabel: 'From R1100',
        stock: 25,
        image: 'gaming-controllers-neon-desk.jpg',
        alt: 'Xbox and PlayStation controllers on a neon-lit gaming desk',
        note: 'For PlayStation and Xbox',
        description: '',
        portrait: false
    }
];
