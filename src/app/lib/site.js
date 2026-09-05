export const contact = {
  phone: "+91 8779171635",
  phoneHref: "tel:+918779171635",
  phoneAlt: "+91 9819959047",
  email: "selfesteem.disabled@gmail.com",
  emailHref: "mailto:selfesteem.disabled@gmail.com",
  website: "https://enabling-disabled.org",
  landline: "022-27795994 / 27795995",
  address:
    "Gods' Abode, Plot No 23A, Near Abhyudaya Bank, Sector 17, Airoli, Navi Mumbai — 400708",
};

export const nav = [
  { name: "Shop", href: "/shop" },
  { name: "Ishwari", href: "/ishwari" },
  { name: "Our Story", href: "/about" },
  { name: "Our Work", href: "/our-work" },
  { name: "Events", href: "/events" },
  { name: "Awards", href: "/awards" },
  { name: "Impact", href: "/impact" },
];

export const collectionsMenu = [
  { name: "Warli Art", href: "/shop?category=warli-art" },
  { name: "Jute Bags", href: "/shop?category=jute" },
  { name: "Cotton Bags", href: "/shop?category=cotton" },
  { name: "File & Stationery", href: "/shop?category=file-notepad" },
  { name: "Ishwari — Divine Offerings", href: "/ishwari" },
];

export const impactStats = [
  { value: 200, suffix: "+", label: "people with disabilities in gainful employment" },
  { value: 700, suffix: "", label: "Friends of GODS members across Mumbai, Thane & Navi Mumbai" },
  { value: 50, suffix: "+", label: "customised corporate orders delivered in a year" },
  { value: 20, suffix: "+", label: "partner NGOs whose products we market" },
  { value: 12, suffix: "", label: "full-time employees — more than half differently-abled" },
  { value: 2011, suffix: "", label: "founded, under Section 25 of the Companies Act", plain: true },
];

export const workshops = [
  { name: "Warli & Stencil Painting", note: "Traditional tribal linework on wood and cloth." },
  { name: "Block Printing", note: "Hand-carved blocks stamped onto jute and cotton." },
  { name: "Tie & Dye", note: "Bandhani-style resist dyeing for scarves and bags." },
  { name: "Crochet", note: "Yarn work for trims, coasters and soft goods." },
  { name: "Fluid & Diya Painting", note: "Pouring art and festive lamp decoration." },
  { name: "Thread Insertion & Stitching", note: "Machine and hand finishing for every product." },
];

// Photo documentation of live workshops — used by the "Workshop & Skill
// Development Activities" gallery on the Our Work page.
export const workshopGallery = [
  {
    slot: "crochet",
    caption: "Crochet making workshop",
    images: ["/workshop/Crochet1.png", "/workshop/Crochet2.png"],
  },
  { slot: "thread", caption: "Thread Insertion", images: ["/workshop/threadinsertion.png"] },
  { slot: "fluid", caption: "Fluid Painting", images: ["/workshop/fluidpainting.png"] },
  { slot: "diya", caption: "Diya Painting", images: ["/workshop/diyapainting.png"] },
  { slot: "stencil", caption: "Stencil Painting", images: ["/workshop/stencilpainting.png"] },
  { slot: "block", caption: "Block Printing", images: ["/workshop/blockprinting.png"] },
  { slot: "tiedye", caption: "Tie & Dye", images: ["/workshop/tiedye.png"] },
];

export const projects = [
  {
    title: "Sanyukta",
    tagline: "Empower a woman, empower a family",
    body: "A livelihood project for mothers of differently-abled children and differently-abled youngsters. Five projects completed — 3,100 jute pouches for a Pune skincare brand, 465 sanitary-napkin pouches, hundreds of cloth bags for colleges and FOG members.",
  },
  {
    title: "GODS Champs",
    tagline: "We don't see disabilities; we see champions in the making",
    body: "Differently-abled beneficiaries are supported to sell products with their families and earn incentives — building confidence, independence and a place in the community through entrepreneurship.",
  },
  {
    title: "Friends of GODS (FOG)",
    tagline: "Beyond charity, a life with self esteem and dignity",
    body: "An annual membership of ₹3,000 that delivers a curated selection of products in instalments, while keeping differently-abled artisans gainfully occupied through the year.",
  },
];

export const partners = [
  "M&G Global Services",
  "Marsh & McLennan",
  "Siemens Healthineers",
  "Mahindra Logistics",
  "Tata Tele Business Services",
  "Maersk Global Service Centres",
  "Burns & McDonnell India",
  "Turner International India",
  "Hiranandani Hospital",
  "Lionbridge",
  "Aurionpro",
  "Vivekanand Business School",
  "ITM Skills University",
  "S.M. Shetty College",
];

// MBA Foundation / G.O.D.S — the founder associate NGO partner behind SEFD.
export const ngoPartner = {
  name: "MBA Foundation — G.O.D.S",
  role: "Founder Associate Partner",
  blurb:
    "There are about 20 NGOs from the disability sector and marginalised communities who send us their products for sale.",
  reach: [
    "700 Friends of GODS (FOG) members across Mumbai, Thane & Navi Mumbai",
    "About 50 customised corporate orders completed a year",
    "8 to 10 employee engagement programs a year",
    "200+ people with disabilities and the disadvantaged in gainful employment",
    "Collaborations with 3 prime educational institutes for marketing projects",
  ],
};

// Corporate & institutional programs, each documented with real photos —
// the "Our Impact" partner breakdown, shown on the /impact page.
export const corporatePrograms = [
  {
    title: "Employee Engagement Programs",
    blurb: "Hands-on craft sessions we run at partner offices, pairing employees with our artisans for a day.",
    images: ["/impact/employeeengagementactivities.png"],
    companies: [
      "M&G Global Services Private Limited",
      "Marsh & McLennan Global Services India Pvt. Ltd.",
      "Siemens Healthineers India",
      "Mahindra Logistics",
      "Tata Tele Business Services",
      "and many more",
    ],
  },
  {
    title: "Student Internship Programs",
    blurb: "College students spend time on the floor with our beneficiaries, learning what inclusive livelihoods look like in practice.",
    images: ["/impact/internshipprogramforstudents.png"],
    companies: [
      "Vivekanand Business School",
      "S.M. Shetty College",
      "ITM Skills University",
      "and other academic institutions",
    ],
  },
  {
    title: "Corporate Exhibitions",
    blurb: "Pop-up stalls at partner offices and campuses, where the full Blessings range meets the people who'll gift it.",
    images: ["/impact/corporateexhibitions.png"],
    companies: [
      "Hiranandani Hospital",
      "S.M. Shetty International School",
      "Maersk Global Service Centres India Private Limited",
      "Lionbridge",
      "Aurionpro",
      "and many more",
    ],
  },
  {
    title: "Corporate Orders",
    blurb: "Customised gifting and bulk festive orders, made to spec for corporate clients — from jute totes to hand-painted décor.",
    images: ["/impact/corporategifitingsolutons.png", "/impact/bulkorders.png"],
    companies: [
      "Burns & McDonnell India",
      "GHP Group",
      "IPRS",
      "Dmacq Software Pvt. Ltd.",
      "Turner International India",
      "LMN Financial Services",
      "and several other corporate clients",
    ],
  },
];

export const awards = [
  { title: "Social Impact Award 2024", by: "Rotary Club of Bombay Pier" },
  { title: "Exemplary Contribution to Society", by: "Rotary Club of Bombay Pier" },
  { title: "Women Achiever — 8 March", by: "Navi Mumbai Municipal Corporation" },
  { title: "Viksit Bharat Mahila Udyojika 2025", by: "AWSIDC" },
];

// Photo documentation for the dedicated Awards & Recognition page. The
// Rotary honour pairs a ceremony photo with the plaque itself — same award,
// two moments.
export const awardsGallery = [
  {
    title: "Rotary Social Impact Award 2024",
    by: "Rotary Club of Bombay Pier",
    when: "30 April 2024",
    note: "Presented to Meenal Mandlik, Founder, in recognition of exemplary contribution to society.",
    images: ["/awardsrecognition/image3.png", "/awardsrecognition/image4.png"],
    featured: true,
  },
  {
    title: "Viksit Bharat Mahila Udyojika Sammelan 2025",
    by: "AWSIDC",
    when: "28 Feb 2025",
    note: "Felicitated at the World Trade Centre, Mumbai for enterprise led by women.",
    images: ["/awardsrecognition/image2.png"],
  },
  {
    title: "Women Achiever — Women's Day",
    by: "Navi Mumbai Municipal Corporation",
    when: "8 March",
    note: "Honoured for outstanding work for persons with disabilities in Navi Mumbai.",
    images: ["/awardsrecognition/image5.png"],
  },
  {
    title: "National Seminar on Persons with Disabilities",
    by: "MBA Foundation & G.O.D.S",
    when: "3 December",
    note: "Recognised on International Day of Persons with Disabilities.",
    images: ["/awardsrecognition/image1.png"],
  },
  {
    title: "Community felicitation",
    by: "Women's self-help collective",
    when: "",
    note: "A certificate of appreciation from a local women's group for SEFD's outreach.",
    images: ["/awardsrecognition/image7.png"],
  },
];

export const testimonials = [
  {
    quote:
      "We don't see disabilities. We see champions in the making — and together we build a more inclusive tomorrow.",
    name: "GODS Champs",
    role: "Our beneficiaries",
  },
  {
    quote:
      "Every piece is handcrafted by our beneficiaries alongside trainers and volunteers. The proceeds go straight to their stipend, skills and development.",
    name: "Self Esteem Foundation for Disabled",
    role: "About our craft",
  },
  {
    quote:
      "We work with the MBA Foundation and over 20 other NGOs — marketing their products alongside our own.",
    name: "Friends of GODS",
    role: "Our network",
  },
];

// Ishwari — Divine Offerings (recycled from sarees offered to goddesses in temples)
export const ishwariItems = [
  { name: "Mango Leaf Toran", price: "₹200" },
  { name: "Gudhi Vastra", price: "₹400" },
  { name: "Toran", price: "₹350" },
  { name: "Naivedya Paan", price: "₹299" },
  { name: "Samai Stand Cover", price: "₹195" },
  { name: "Chaurang Cover", price: "₹450" },
  { name: "Cushion Cover", price: "₹200" },
  { name: "Book Cover", price: "₹150" },
  { name: "Knot Bag", price: "₹150" },
  { name: "Money Purse", price: "₹180 – ₹240" },
  { name: "Single Saree Cover", price: "₹250" },
  { name: "Quilted Bag", price: "₹350" },
  { name: "Table Mat", price: "₹150" },
  { name: "Table Runner + 4 Mats", price: "₹1,025" },
  { name: "Mini Gudhi", price: "₹200" },
];

// Supporting imagery for Ishwari — the brocade / recycled-saree pieces from
// the Blessings range that share the collection's material story.
export const ishwariImages = [
  "/products/cotton/page-09-01.png",
  "/products/cotton/page-09-02.png",
  "/products/cotton/page-09-05.png",
  "/products/cotton/page-09-03.png",
];

// Ishwari catalogue — the actual product photography, one per price-list
// item. Used for both the homepage teaser and the full /ishwari shop grid.
export const ishwariCatalogue = [
  { name: "Mango Leaf Toran", price: 200, img: "/products/catalogue/mangoleaf.png", featured: true },
  { name: "Gudhi Vastra", price: 400, img: "/products/catalogue/gudi.png", featured: true },
  { name: "Gudhi Vastra — Design 2", price: 400, img: "/products/catalogue/gudi1.png" },
  { name: "Toran", price: 350, img: "/products/catalogue/toran.png" },
  { name: "Naivedya Paan", price: 299, img: "/products/catalogue/naivedyapaan.png" },
  { name: "Samai Stand Cover", price: 195, img: "/products/catalogue/samaistand.png" },
  { name: "Mini Gudhi", price: 200, img: "/products/catalogue/minigudhi.png" },
  { name: "Chaurang Cover", price: 450, img: "/products/catalogue/chaurangcover.png", featured: true },
  { name: "Cushion Cover", price: 200, img: "/products/catalogue/cushioncover.png" },
  { name: "Book Cover", price: 150, img: "/products/catalogue/bookcover.png" },
  { name: "Knot Bag", price: 150, img: "/products/catalogue/knotbag.png" },
  { name: "Money Purse — Big", price: 240, img: "/products/catalogue/moneypurse.png", featured: true },
  { name: "Money Purse — Small", price: 180, img: "/products/catalogue/moneypurse1.png" },
  { name: "Cloth Bag", price: 150, img: "/products/catalogue/clothbag.png" },
  { name: "Shoulder Bag", price: 220, img: "/products/catalogue/shoulderbag.png", featured: true },
  { name: "Single Saree Cover", price: 250, img: "/products/catalogue/singlesareecover.png", featured: true },
  { name: "Quilted Bag", price: 350, img: "/products/catalogue/quiltedbag.png", featured: true },
  { name: "Table Matte", price: 150, img: "/products/catalogue/tablematte.png" },
  { name: "Table Runner + 4 Mattes", price: 1025, img: "/products/catalogue/tablerunnerwith4mattes.png", featured: true },
].map((p) => ({
  ...p,
  slug: p.name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, ""),
  priceLabel: `₹${p.price.toLocaleString("en-IN")}`,
}));

// Intro copy for the Ishwari product catalogue — matches the printed
// catalogue sheet (About SEFD + the Ishwari brand statement).
export const sefdAbout =
  "“SEFD” is a social enterprise and a non-profit organization registered under Section 25 of the Companies Act, 1956 (now classified under Section 8), established on 9th April 2011 with the purpose statement “Beyond Charity – A Life with Self Esteem and Dignity.” initiated by the MBA Foundation. SEFD is dedicated to promoting self-sustenance and dignity among differently-abled individuals by spreading awareness about their capabilities and creating opportunities for their gainful employment.";

export const ishwariAbout =
  "A special Brand by Self Esteem Foundation for Disabled, Exquisite gifting merchandise recycled and curated from Sarees offered to Goddesses in the temple during auspicious festive season. We are absolutely certain that you will be happy to possess these products as Blessings and Gift them to your family and friends.";

// The printed Blessings catalogue sheets (design-led, one per material family).
export const cataloguePages = [
  { src: "/catalogue/catalogue-page-02.jpg", label: "Warli Art" },
  { src: "/catalogue/catalogue-page-06.jpg", label: "Jute" },
  { src: "/catalogue/catalogue-page-08.jpg", label: "Cotton" },
  { src: "/catalogue/catalogue-page-10.jpg", label: "File & Stationery" },
];
