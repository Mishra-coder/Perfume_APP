import { Image } from 'react-native';

const perfumeImg1 = require('../assets/perfumes/p1.jpg');
const perfumeImg2 = require('../assets/perfumes/p2.jpg');
const perfumeImg3 = require('../assets/perfumes/p3.jpg');
const perfumeImg4 = require('../assets/perfumes/p4.jpg');
const perfumeImg5 = require('../assets/perfumes/p5.jpg');
const perfumeImg6 = require('../assets/perfumes/p6.jpg');
const perfumeImg7 = require('../assets/perfumes/p7.jpg');
const perfumeImg8 = require('../assets/perfumes/p8.jpg');
const perfumeImg9 = require('../assets/perfumes/p9.jpg');
const perfumeImg10 = require('../assets/perfumes/p10.jpg');
const perfumeImg11 = require('../assets/perfumes/p11.jpg');
const perfumeImg12 = require('../assets/perfumes/p12.jpg');

export const products = [
  {
    id: 1,
    name: "Midnight Oud Royale",
    price: 12999,
    image: perfumeImg1,
    description: "A deep, mysterious blend of precious agarwood and rare resins. This fragrance is the epitome of luxury, designed for those who command respect and leave a lasting impression.",
    category: "Oriental",
    type: "Parfum",
    notes: {
      top: ["Saffron", "Pink Pepper"],
      middle: ["Oud Wood", "Bulgarian Rose"],
      base: ["Sandalwood", "Amber", "Leather"]
    },
    occasions: ["party", "date", "festival"],
    timeOfDay: ["night"],
    seasons: ["winter", "all"],
    strength: 5,
    profile: "strong"
  },
  {
    id: 2,
    name: "Velvet Rose Elixir",
    price: 8499,
    image: perfumeImg2,
    description: "An opulent floral masterpiece combining damask rose with rich textures of clove and decadent praline. A sophisticated scent that wraps you in a blanket of elegance.",
    category: "Floral",
    type: "EDP",
    notes: {
      top: ["Cloves", "Lemon"],
      middle: ["Damask Rose", "Peony"],
      base: ["Praline", "Agarwood"]
    },
    occasions: ["date", "party", "festival"],
    timeOfDay: ["night"],
    seasons: ["all"],
    strength: 4,
    profile: "sweet"
  },
  {
    id: 3,
    name: "Aqua Allegoria Luxe",
    price: 6499,
    image: perfumeImg3,
    description: "A revitalizing burst of citrus and aquatic notes. Inspired by Mediterranean mornings, this fresh fragrance is clean, light, and undeniably premium.",
    category: "Fresh",
    type: "EDT",
    notes: {
      top: ["Bergamot", "Grapefruit"],
      middle: ["Sea Salt", "Lavender"],
      base: ["White Musk", "Cedar"]
    },
    occasions: ["college", "gym", "office"],
    timeOfDay: ["day"],
    seasons: ["summer", "all"],
    strength: 2,
    profile: "fresh"
  },
  {
    id: 4,
    name: "Emperor Aventus Noir",
    price: 15999,
    image: perfumeImg4,
    description: "The ultimate power scent. Featuring a bold combination of fruity top notes and a rich, smoky base. Truly the king of modern fragrances for the elite.",
    category: "Woody",
    type: "EDP",
    notes: {
      top: ["Pineapple", "Black Currant"],
      middle: ["Birch", "Patchouli"],
      base: ["Musk", "Oakmoss", "Vanilla"]
    },
    occasions: ["office", "date", "festival"],
    timeOfDay: ["day", "night"],
    seasons: ["winter", "all"],
    strength: 4,
    profile: "mild"
  },
  {
    id: 5,
    name: "Chanel N°5 Precious",
    price: 10999,
    image: perfumeImg5,
    description: "The legendary olfactory icon. A complex bouquet of aldehydes and florals that has defined elegance for generations. A timeless classic for the sophisticated woman.",
    category: "Aromatic",
    type: "EDT",
    notes: {
      top: ["Aldehydes", "Neroli"],
      middle: ["Jasmine", "May Rose"],
      base: ["Sandalwood", "Vanilla"]
    },
    occasions: ["office", "college"],
    timeOfDay: ["day"],
    seasons: ["all"],
    strength: 2,
    profile: "mild"
  },
  {
    id: 6,
    name: "Rouge Crystal 540",
    price: 18999,
    image: perfumeImg6,
    description: "An intoxicating blend of jasmine, saffron, and cedarwood. This radiant fragrance settles on the skin like an amber, floral, and woody breeze.",
    category: "Oriental",
    type: "Parfum",
    notes: {
      top: ["Jasmine", "Saffron"],
      middle: ["Amberwood", "Ambergris"],
      base: ["Fir Resin", "Cedar"]
    },
    occasions: ["party", "date", "festival"],
    timeOfDay: ["night"],
    seasons: ["winter", "all"],
    strength: 5,
    profile: "strong"
  },
  {
    id: 7,
    name: "Sage & Sea Mist",
    price: 7999,
    image: perfumeImg7,
    description: "Escape the everyday along the windswept shore. Waves breaking white, the air fresh with sea salt and spray. Alive with the mineral scent of rugged cliffs.",
    category: "Fresh",
    type: "EDT",
    notes: {
      top: ["Ambrette Seeds"],
      middle: ["Sea Salt", "Grapefruit"],
      base: ["Sage", "Red Algae"]
    },
    occasions: ["gym", "college", "office"],
    timeOfDay: ["day"],
    seasons: ["summer", "all"],
    strength: 2,
    profile: "fresh"
  },
  {
    id: 8,
    name: "Midnight Opulence Noir",
    price: 9499,
    image: perfumeImg8,
    description: "An addictive gourmand floral. The signature black coffee accord is paired with sensual vanilla and white flowers for a modern, young, and vibrant scent.",
    category: "Floral",
    type: "Parfum",
    notes: {
      top: ["Black Coffee", "Pear"],
      middle: ["Orange Blossom", "Jasmine"],
      base: ["Vanilla", "Patchouli", "Cedar"]
    },
    occasions: ["party", "date", "festival"],
    timeOfDay: ["night"],
    seasons: ["winter", "all"],
    strength: 5,
    profile: "sweet"
  },
  {
    id: 9,
    name: "Code Profumo Intense",
    price: 11499,
    image: perfumeImg9,
    description: "A magnetic, warm fragrance for men. Tonka bean, cardamom, and woody notes create an irresistible aura of masculine strength and charisma.",
    category: "Woody",
    type: "EDT",
    notes: {
      top: ["Green Mandarin", "Green Apple"],
      middle: ["Orange Blossom", "Nutmeg"],
      base: ["Tonka Bean", "Leather", "Amber"]
    },
    occasions: ["college", "office", "gym"],
    timeOfDay: ["day"],
    seasons: ["all"],
    strength: 3,
    profile: "mild"
  },
  {
    id: 10,
    name: "Gucci Flora Gardenia",
    price: 7499,
    image: perfumeImg10,
    description: "A joyful floral signature. Built around the Gardenia flower, admired since the dawn of time for its splendour and used in magical elixirs.",
    category: "Floral",
    type: "EDT",
    notes: {
      top: ["Pear Blossom", "Red Berries"],
      middle: ["White Gardenia", "Frangipani"],
      base: ["Patchouli", "Brown Sugar"]
    },
    occasions: ["college", "office", "date"],
    timeOfDay: ["day"],
    seasons: ["summer", "all"],
    strength: 2,
    profile: "sweet"
  },
  {
    id: 11,
    name: "Tobaco-Vanille Luxe",
    price: 14499,
    image: perfumeImg11,
    description: "A modern take on an old-world apothecary scent. Creamy tonka bean, vanilla, cocoa, dry fruit accords and sweet wood sap for a modern, opulent impression.",
    category: "Oriental",
    type: "EDP",
    notes: {
      top: ["Tobacco Leaf", "Spicy Notes"],
      middle: ["Vanilla", "Cacao", "Tonka Bean"],
      base: ["Dried Fruits", "Woody Notes"]
    },
    occasions: ["party", "festival", "date"],
    timeOfDay: ["night"],
    seasons: ["winter", "all"],
    strength: 4,
    profile: "strong"
  },
  {
    id: 12,
    name: "Bleu Absolute Luxe",
    price: 8999,
    image: perfumeImg12,
    description: "An ode to masculine freedom. A woody, aromatic fragrance with a captivating trail. A timeless, powerful scent housed in an enigmatic blue bottle.",
    category: "Aromatic",
    type: "EDT",
    notes: {
      top: ["Lemon", "Mint", "Pink Pepper"],
      middle: ["Ginger", "Nutmeg", "Jasmine"],
      base: ["Cedar", "Sandalwood", "Patchouli"]
    },
    occasions: ["office", "college"],
    timeOfDay: ["day"],
    seasons: ["all"],
    strength: 3,
    profile: "mild"
  }
];
