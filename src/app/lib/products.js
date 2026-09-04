/**
 * Product catalogue for the Blessings store.
 * Images live in /public/products/<category>/…  (curated — placeholder scans
 * from the source catalogue have been dropped).
 */

export const categories = [
  { slug: "warli-art", name: "Warli Art", blurb: "Hand-painted tribal art on wood — desk, table and décor pieces." },
  { slug: "jute", name: "Jute", blurb: "Sturdy, natural, reusable bags — block-printed and hand-stencilled." },
  { slug: "cotton", name: "Cotton", blurb: "Slings, totes and potlis stitched from handloom and brocade fabric." },
  { slug: "file-notepad", name: "File & Stationery", blurb: "Cloth and jute folders, binders and notepads for work and gifting." },
];

const raw = [
  // ───────────────────────── WARLI ART ─────────────────────────
  ["warli-art", "Warli Tea Coaster Set", 520, "page-02-01.jpeg", "A set of hand-painted Warli coasters — white figures dancing across dark wood."],
  ["warli-art", "Green Warli Coaster Set", 520, "page-02-02.png", "Coasters finished in forest green with fine white Warli linework and a matching tray."],
  ["warli-art", "Warli Coaster & Holder", 750, "page-02-03.jpeg", "Six coasters with an arched wooden holder, each panel individually painted."],
  ["warli-art", "Warli Hot Plate", 480, "page-02-04.jpeg", "A weighted trivet with a folding handle to carry hot pots straight to the table."],
  ["warli-art", "Warli Mobile Stand", 270, "page-02-05.jpeg", "A slim angled stand that props your phone for calls and video, painted in green."],
  ["warli-art", "Mobile & Pen Stand", 450, "page-02-06.jpeg", "A two-in-one desk piece — phone dock on one side, pen cup on the other."],
  ["warli-art", "Warli Keepsake Box", 400, "page-03-01.jpeg", "A lidded box with a bevelled top, hand-painted on every face."],
  ["warli-art", "Warli Watch Box", 280, "page-03-02.jpeg", "A compact brown box sized for a watch or a few small treasures."],
  ["warli-art", "Small Warli Box", 270, "page-03-03.jpeg", "A little green box for rings, coins and desk odds and ends."],
  ["warli-art", "Warli Jewellery Tray", 750, "page-03-04.jpeg", "An open tray with a raised lip to corral jewellery and cufflinks."],
  ["warli-art", "Warli Dry Fruit Box", 400, "page-03-05.png", "A partitioned box for serving dry fruit, sweets or a festive assortment."],
  ["warli-art", "Warli Serving Tray", 400, "page-03-06.jpeg", "A generous green tray for chai and snacks, edged in white Warli figures."],
  ["warli-art", "Warli Key Holder", 250, "page-04-01.png", "A wall-mounted key rack shaped like a village hut, with four hooks."],
  ["warli-art", "Warli Tissue Box", 500, "page-04-02.jpeg", "A terracotta-toned cover that turns a tissue carton into a décor piece."],
  ["warli-art", "Warli Hut Key Holder", 350, "page-04-03.png", "Hut-shaped key holders in green and black, sold as a coordinated pair."],
  ["warli-art", "Warli Key Chain", 50, "page-04-04.png", "A pocket-sized wooden key chain with a single painted Warli figure."],
  ["warli-art", "Warli Round Coaster Set", 520, "page-04-05.png", "Circular coasters with a mandala of Warli dancers around the rim."],
  ["warli-art", "Bullock Cart Coaster Set", 750, "page-04-06.png", "Coasters and holder carved and painted as a traditional bullock cart."],
  ["warli-art", "Warli Pen Stand", 180, "page-05-01.jpeg", "A square desk cup for pens and scissors, black with white figures."],
  ["warli-art", "Green Warli Pen Stand", 220, "page-05-02.jpeg", "The same desk cup in forest green with a denser Warli scene."],
  ["warli-art", "Warli Napkin Holder", 200, "page-05-03.jpeg", "A domed holder that keeps napkins upright and tidy on the table."],
  ["warli-art", "Green Napkin Holder", 200, "page-05-04.jpeg", "Napkin holder in green with a hand-painted harvest scene."],
  ["warli-art", "Triangle Napkin Holder", 200, "page-05-05.jpeg", "A wedge-shaped holder, dark wood with a fine white border."],
  ["warli-art", "Tall Warli Pen Stand", 180, "page-05-06.jpeg", "A taller cup for brushes and long pens, painted top to bottom."],

  // ───────────────────────── JUTE ─────────────────────────
  ["jute", "Block Print Jute Bag", 300, "page-06-05.png", "A natural jute tote hand block-printed with a single bold motif."],
  ["jute", "Ganesha Jute Bag", 120, "page-06-03.jpeg", "A black jute bag with a stencilled Ganesha and a bright woven trim."],
  ["jute", "Ganesha Jute Bag — Large", 500, "page-06-04.jpeg", "A roomy natural jute bag with a zip top and a maroon Ganesha stencil."],
  ["jute", "Warli Dancers Jute Bag", 350, "page-07-01.png", "A jute tote with a black cotton panel of white Warli dancers."],
  ["jute", "Warli Tree Jute Bag", 500, "page-07-02.png", "A large jute shopper with a hand-painted tree of life."],
  ["jute", "Festive Jute Gift Bags", 270, "page-07-05.jpeg", "Small ring-handled jute bags for return gifts and party favours."],
  ["jute", "Jute Spectacle Pouch", 90, "page-07-07.jpeg", "A soft-lined jute sleeve that protects glasses and sunglasses."],

  // ───────────────────────── COTTON ─────────────────────────
  ["cotton", "Printed Cotton Sling", 150, "page-08-01.jpeg", "A lightweight cross-body sling in a floral kalamkari print."],
  ["cotton", "Black Sling Bag", 270, "page-08-02.jpeg", "A practical black sling with three zip pockets and an adjustable strap."],
  ["cotton", "Paisley Shoulder Bag", 300, "page-08-03.png", "A soft-structured shoulder bag in indigo paisley cotton."],
  ["cotton", "Floral Tote Bag", 500, "page-08-04.png", "A roomy everyday tote in navy floral print with a flat base."],
  ["cotton", "Monochrome Sling Bag", 400, "page-08-05.png", "A compact sling in a black-and-white print with a boxy silhouette."],
  ["cotton", "Paisley Handbag", 500, "page-08-06.png", "A rounded handbag in bold black paisley with a zip closure."],
  ["cotton", "Silk Potli Bag", 100, "page-09-01.png", "A drawstring potli in festive brocade — perfect for weddings."],
  ["cotton", "Brocade Potli", 120, "page-09-02.png", "A firm triangular potli in gold-shot brocade with a bead handle."],
  ["cotton", "Brocade Handbag", 400, "page-09-03.png", "A top-handle handbag pieced from recycled brocade saree fabric."],
  ["cotton", "Travel Pouch Set", 220, "page-09-04.png", "A nesting set of zip pouches for cosmetics, chargers and documents."],
  ["cotton", "Brocade Jhola Bag", 400, "page-09-05.png", "A relaxed jhola sling in green and magenta handloom cotton."],
  ["cotton", "Brocade Clutch", 120, "page-09-06.png", "A flat zip clutch in silk brocade that slips into a larger bag."],

  // ───────────────────────── FILE & STATIONERY ─────────────────────────
  ["file-notepad", "Warli Cloth Folder", 275, "page-10-01.png", "An A4 document folder covered in white-on-black printed cotton."],
  ["file-notepad", "Jute Notepad", 150, "page-10-02.jpeg", "A refillable notepad bound in natural jute with a card slot."],
  ["file-notepad", "Warli Tree Folder", 300, "page-10-03.jpeg", "A jute folder with a hand-painted tree of life and an inside pocket."],
  ["file-notepad", "Printed Cloth Folder", 275, "page-10-04.png", "A slim folder in monochrome block-print cotton for loose papers."],
  ["file-notepad", "Jute Document Holder", 350, "page-10-05.jpeg", "A tall jute holder that keeps A4 sheets flat and upright on a desk."],
  ["file-notepad", "Warli File Folder", 350, "page-10-06.jpeg", "A padded file with a Warli-tree front panel and elastic closure."],
  ["file-notepad", "Jute Ring Binder", 400, "page-10-07.png", "A two-ring binder cased in jute with a painted cotton spine label."],
];

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const products = raw.map(([categorySlug, name, price, file, description], i) => {
  const category = categories.find((c) => c.slug === categorySlug);
  return {
    id: i + 1,
    slug: slugify(name),
    name,
    price,
    priceLabel: `₹${price.toLocaleString("en-IN")}`,
    category: category.name,
    categorySlug,
    image: `/products/${categorySlug}/${file}`,
    description,
  };
});

export function getProduct(slug) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(slug) {
  if (!slug || slug === "all") return products;
  return products.filter((p) => p.categorySlug === slug);
}

export function getRelatedProducts(product, count = 4) {
  return products
    .filter((p) => p.categorySlug === product.categorySlug && p.slug !== product.slug)
    .slice(0, count);
}

export const priceRange = {
  min: Math.min(...products.map((p) => p.price)),
  max: Math.max(...products.map((p) => p.price)),
};
