import type { BannerFormData } from "@/types/banner";

/**
 * Engine untuk mengubah form input banner menjadi prompt AI yang optimized
 * untuk menghasilkan desain banner/spanduk berkualitas tinggi.
 */

const CATEGORY_PROMPTS: Record<string, { subject: string; keywords: string; props?: string }> = {
  kuliner: {
    subject: "food and beverage banner",
    keywords: "appetizing, delicious, fresh ingredients, mouth-watering presentation, gourmet",
    props: "plates, utensils, steam effects, food styling",
  },
  fashion: {
    subject: "fashion and clothing banner",
    keywords: "stylish, trendy, elegant outfit, modern wardrobe, boutique style",
    props: "hangers, mannequins, fabric textures, accessories",
  },
  jasa: {
    subject: "professional service banner",
    keywords: "reliable, expert, professional team, quality service, trusted",
    props: "tools, uniforms, work in progress, before-after concept",
  },
  elektronik: {
    subject: "electronics and gadgets banner",
    keywords: "high-tech, innovative, cutting-edge, modern technology, smart devices",
    props: "devices, circuit patterns, glowing screens, tech elements",
  },
  kecantikan: {
    subject: "beauty and skincare banner",
    keywords: "glowing, radiant, premium beauty, self-care, luxurious skincare",
    props: "serum bottles, flowers, mirror, soft fabrics",
  },
  kesehatan: {
    subject: "health and medical banner",
    keywords: "healthy, caring, professional medical, wellness, trustworthy healthcare",
    props: "medical cross, stethoscope, healthy lifestyle imagery",
  },
  pendidikan: {
    subject: "education and course banner",
    keywords: "knowledge, growth, learning, achievement, bright future",
    props: "books, graduation cap, lightbulb, chalkboard elements",
  },
  otomotif: {
    subject: "automotive banner",
    keywords: "powerful, sleek design, high performance, precision engineering, speed",
    props: "car silhouettes, tire tracks, metallic finishes",
  },
  properti: {
    subject: "real estate and property banner",
    keywords: "dream home, luxury living, prime location, investment, modern architecture",
    props: "house icons, key, building silhouettes, landscape",
  },
  event: {
    subject: "event and celebration banner",
    keywords: "exciting, festive, grand celebration, memorable, spectacular",
    props: "confetti, stage lights, tickets, decorative elements",
  },
  umkm: {
    subject: "local business and retail banner",
    keywords: "community-friendly, authentic, local favorite, affordable quality, welcoming",
    props: "shop front, local elements, hand-crafted touches",
  },
  lainnya: {
    subject: "business banner",
    keywords: "professional, quality, trusted brand, excellent service",
    props: "abstract business elements, modern icons",
  },
};

const STYLE_CONFIGS: Record<string, { desc: string; artistic: string; font: string; layout: string }> = {
  "modern-minimalist": {
    desc: "clean minimalist design with generous whitespace",
    artistic: "minimalist, Scandinavian design, negative space, subtle shadows",
    font: "thin sans-serif fonts, modern typography, ample letter-spacing",
    layout: "asymmetric layout, grid-based, lots of breathing room",
  },
  "elegant-premium": {
    desc: "luxurious premium design with gold and refined details",
    artistic: "luxury aesthetic, gold foil accents, marble textures, soft gradients",
    font: "elegant serif fonts, calligraphy, gold lettering",
    layout: "centered composition, ornate borders, balanced symmetry",
  },
  "playful-fun": {
    desc: "colorful playful design with rounded elements",
    artistic: "pop art influences, bright saturated colors, bouncing shapes, stickers",
    font: "rounded display fonts, bold playful type, curved text",
    layout: "diagonal compositions, overlapping elements, dynamic angles",
  },
  "bold-aggressive": {
    desc: "high-contrast bold design with maximum visual impact",
    artistic: "street art influence, high contrast, dramatic shadows, urban aesthetic",
    font: "heavy display fonts, condensed type, maximum size hierarchy",
    layout: "asymmetrical power layout, tilted elements, collision design",
  },
  "rustic-vintage": {
    desc: "vintage retro design with textures and aged effects",
    artistic: "distressed textures, retro color palette, hand-crafted feel, aged paper",
    font: "vintage serif, weathered type, retro script fonts",
    layout: "classic poster layout, bordered frames, vintage ornaments",
  },
  "professional-corporate": {
    desc: "corporate professional design with structured grid",
    artistic: "corporate blue aesthetic, clean lines, geometric precision, subtle patterns",
    font: "professional sans-serif, clear hierarchy, readable sizes",
    layout: "structured grid layout, information blocks, clear sections",
  },
  "tropical-fresh": {
    desc: "fresh tropical design with nature elements",
    artistic: "tropical leaves, watercolor effects, organic shapes, fresh palette",
    font: "handwritten script, natural feel, organic typography",
    layout: "flowing organic layout, nature-inspired composition, airy feel",
  },
  "futuristic-tech": {
    desc: "futuristic tech design with neon and digital effects",
    artistic: "neon glow, holographic effects, cyber aesthetic, digital grids",
    font: "futuristic display, tech monospace, glowing text effects",
    layout: "tech-grid overlay, angled panels, digital interface feel",
  },
};

const ELEMENT_CONFIGS: Record<string, { desc: string; integration: string }> = {
  "product-photo": {
    desc: "prominent product photography",
    integration: "hero product image as focal point, professional product lighting",
  },
  illustration: {
    desc: "custom vector illustrations",
    integration: "flat vector illustrations complementing the message",
  },
  ornament: {
    desc: "decorative ornamental borders and frames",
    integration: "elegant corner ornaments and decorative dividers",
  },
  "gradient-bg": {
    desc: "smooth gradient background",
    integration: "flowing gradient from primary to secondary color",
  },
  pattern: {
    desc: "subtle repeating patterns or textures",
    integration: "light pattern overlay adding depth and texture",
  },
  geometric: {
    desc: "abstract geometric shapes",
    integration: "circles, triangles, and lines as design accents",
  },
  "photo-background": {
    desc: "photographic background with overlay",
    integration: "high-quality background photo with color overlay",
  },
  mascot: {
    desc: "friendly mascot character",
    integration: "cute approachable mascot character as brand ambassador",
  },
};

const MOOD_CONFIGS: Record<string, { desc: string; lighting: string; atmosphere: string }> = {
  cheerful: {
    desc: "cheerful and warm atmosphere",
    lighting: "bright warm lighting, sunny feel",
    atmosphere: "happy, inviting, friendly",
  },
  calm: {
    desc: "calm and peaceful mood",
    lighting: "soft diffused lighting, gentle shadows",
    atmosphere: "serene, relaxing, peaceful",
  },
  energetic: {
    desc: "energetic and dynamic feel",
    lighting: "vibrant lighting, high energy colors",
    atmosphere: "exciting, lively, action-packed",
  },
  luxury: {
    desc: "luxurious and exclusive ambiance",
    lighting: "dramatic spotlighting, rich shadows",
    atmosphere: "premium, exclusive, high-end",
  },
  simple: {
    desc: "simple and clean aesthetic",
    lighting: "even neutral lighting, no harsh shadows",
    atmosphere: "uncluttered, straightforward, honest",
  },
  romantic: {
    desc: "romantic and soft mood",
    lighting: "soft warm glow, dreamy bokeh",
    atmosphere: "tender, dreamy, intimate",
  },
  cool: {
    desc: "cool and edgy vibe",
    lighting: "cool-toned lighting, neon accents",
    atmosphere: "trendy, bold, street-smart",
  },
  trustworthy: {
    desc: "trustworthy and reliable impression",
    lighting: "clear honest lighting, no gimmicks",
    atmosphere: "dependable, solid, genuine",
  },
};

const AUDIENCE_CONFIGS: Record<string, string> = {
  general: "appealing to all demographics",
  kids: "designed for children, playful and fun",
  teenagers: "trendy and youthful appeal",
  "young-adults": "modern and Instagram-worthy",
  adults: "mature and refined taste",
  seniors: "clear readable design with familiar elements",
  professional: "executive-level sophistication",
  female: "feminine aesthetic with soft touches",
  male: "masculine bold design",
};

function getAspectRatio(bannerSize: string): { ratio: string; desc: string } {
  switch (bannerSize) {
    case "2x1": return { ratio: "2:1", desc: "wide horizontal banner" };
    case "3x1": return { ratio: "3:1", desc: "extra wide banner" };
    case "3x2": return { ratio: "3:2", desc: "standard wide banner" };
    case "4x1": return { ratio: "4:1", desc: "panoramic banner" };
    case "4x2": return { ratio: "2:1", desc: "large wide banner" };
    case "6x3": return { ratio: "2:1", desc: "billboard size" };
    case "1x2": return { ratio: "9:16", desc: "vertical portrait banner" };
    case "custom": return { ratio: "2:1", desc: "custom size banner" };
    default: return { ratio: "2:1", desc: "horizontal banner" };
  }
}

function hexToColorName(hex: string): string {
  const colorMap: Record<string, string> = {
    "#FF0000": "red", "#00FF00": "green", "#0000FF": "blue",
    "#FFFF00": "yellow", "#FF00FF": "magenta", "#00FFFF": "cyan",
    "#000000": "black", "#FFFFFF": "white", "#808080": "gray",
    "#FFA500": "orange", "#800080": "purple", "#FFC0CB": "pink",
    "#A52A2A": "brown", "#FFD700": "gold", "#C0C0C0": "silver",
    "#FF6B6B": "coral red", "#4ECDC4": "turquoise", "#45B7D1": "sky blue",
    "#96CEB4": "sage green", "#FFEAA7": "cream yellow", "#DDA0DD": "plum",
    "#98D8C8": "mint", "#F7DC6F": "soft yellow", "#BB8FCE": "lavender",
    "#85C1E9": "light blue", "#F8C471": "peach", "#82E0AA": "light green",
  };
  return colorMap[hex.toUpperCase()] || hex;
}

export function generateOptimizedPrompt(data: BannerFormData): string {
  const category = CATEGORY_PROMPTS[data.category] || CATEGORY_PROMPTS["lainnya"];
  const style = STYLE_CONFIGS[data.designStyle] || STYLE_CONFIGS["modern-minimalist"];
  const mood = MOOD_CONFIGS[data.mood] || MOOD_CONFIGS["cheerful"];
  const audience = AUDIENCE_CONFIGS[data.targetAudience] || AUDIENCE_CONFIGS["general"];
  const aspect = getAspectRatio(data.bannerSize);
  
  const primaryColor = hexToColorName(data.primaryColor);
  const secondaryColor = hexToColorName(data.secondaryColor);

  // Build element descriptions
  const activeElements = data.visualElements
    .map(el => ELEMENT_CONFIGS[el])
    .filter(Boolean);
  
  const elementDescs = activeElements.map(e => e.desc).join(", ");
  const elementIntegrations = activeElements.map(e => e.integration).join(". ");

  // Build the comprehensive prompt
  const parts: string[] = [];

  // 1. Core subject and format
  parts.push(`Professional advertising ${category.subject} design, ${aspect.desc} format (${aspect.ratio} aspect ratio), print-ready high resolution banner`);

  // 2. Brand content
  parts.push(` featuring brand name "${data.brandName}"${data.tagline ? ` with tagline "${data.tagline}"` : ""}`);

  // 3. Category-specific details
  parts.push(`. ${category.keywords}. ${category.props ? `Include ${category.props}. ` : ""}`);

  // 4. Style description
  parts.push(`${style.desc}. ${style.artistic}. Typography: ${style.font}. Layout: ${style.layout}. `);

  // 5. Color scheme
  parts.push(`Color scheme: ${primaryColor} as primary color and ${secondaryColor} as secondary/accent color. `);

  // 6. Visual elements
  if (elementDescs) {
    parts.push(`Visual elements: ${elementDescs}. ${elementIntegrations}. `);
  }

  // 7. Mood and atmosphere
  parts.push(`Mood: ${mood.desc}, ${mood.lighting}. Atmosphere: ${mood.atmosphere}. `);

  // 8. Target audience
  parts.push(`Target audience: ${audience}. `);

  // 9. Technical specifications
  parts.push(`Technical: print-ready 300dpi, CMYK optimized, sharp text, professional graphic design quality, no blurry elements, proper text hierarchy with headline prominent`);

  // 10. Additional notes if provided
  if (data.additionalNotes.trim()) {
    parts.push(`. Additional requirements: ${data.additionalNotes}`);
  }

  // 11. Contact info inclusion
  if (data.includeContact && data.contactInfo.trim()) {
    const formattedContact = data.contactInfo.split("\n").map(line => line.trim()).filter(Boolean).join(", ");
    parts.push(`. Include contact information area showing these details: ${formattedContact}`);
  }

  return parts.join("").replace(/\.\./g, ".").replace(/\s+/g, " ").trim();
}

export function generatePromptForDisplay(data: BannerFormData): string {
  return generateOptimizedPrompt(data);
}

export function getImageRatio(bannerSize: string): string {
  const aspect = getAspectRatio(bannerSize);
  // Convert to supported ratios
  switch (aspect.ratio) {
    case "3:1":
    case "4:1":
      return "21:9";
    case "2:1":
      return "16:9";
    case "3:2":
      return "3:2";
    case "9:16":
      return "9:16";
    default:
      return "16:9";
  }
}
