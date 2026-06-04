export interface BannerFormData {
  brandName: string;
  category: string;
  tagline: string;
  contactInfo: string;
  contactWhatsapp: string;
  contactAddress: string;
  contactSocial: string;
  bannerSize: string;
  customWidth: string;
  customHeight: string;
  primaryColor: string;
  secondaryColor: string;
  designStyle: string;
  visualElements: string[];
  targetAudience: string;
  mood: string;
  additionalNotes: string;
  includeContact: boolean;
}

export interface GeneratedBanner {
  id: string;
  formData: BannerFormData;
  prompt: string;
  imageUrl: string;
  timestamp: number;
}

export const BANNER_CATEGORIES = [
  { value: "kuliner", label: "Kuliner / Makanan & Minuman" },
  { value: "fashion", label: "Fashion / Pakaian & Aksesoris" },
  { value: "jasa", label: "Jasa / Service" },
  { value: "elektronik", label: "Elektronik & Gadget" },
  { value: "kecantikan", label: "Kecantikan & Perawatan" },
  { value: "kesehatan", label: "Kesehatan & Medis" },
  { value: "pendidikan", label: "Pendidikan & Kursus" },
  { value: "otomotif", label: "Otomotif" },
  { value: "properti", label: "Properti & Real Estate" },
  { value: "event", label: "Event & Acara" },
  { value: "umkm", label: "UMKM / Retail" },
  { value: "lainnya", label: "Lainnya" },
] as const;

export const BANNER_SIZES = [
  { value: "2x1", label: "2 x 1 meter (Landscape)" },
  { value: "3x1", label: "3 x 1 meter (Landscape)" },
  { value: "3x2", label: "3 x 2 meter (Landscape)" },
  { value: "4x1", label: "4 x 1 meter (Landscape)" },
  { value: "4x2", label: "4 x 2 meter (Landscape)" },
  { value: "6x3", label: "6 x 3 meter (Billboard)" },
  { value: "1x2", label: "1 x 2 meter (Portrait)" },
  { value: "custom", label: "Custom Size" },
] as const;

export const DESIGN_STYLES = [
  { value: "modern-minimalist", label: "Modern Minimalis", desc: "Bersih, simpel, banyak white space" },
  { value: "elegant-premium", label: "Elegan Premium", desc: "Mewah dengan efek gold/silver, serif font" },
  { value: "playful-fun", label: "Playful & Ceria", desc: "Warna-warni, ilustrasi, font rounded" },
  { value: "bold-aggressive", label: "Bold & Agresif", desc: "Kontras tinggi, font besar, impact kuat" },
  { value: "rustic-vintage", label: "Rustic & Vintage", desc: "Tekstur kayu, retro, klasik" },
  { value: "professional-corporate", label: "Professional Corporate", desc: "Rapi, struktur grid, netral" },
  { value: "tropical-fresh", label: "Tropical & Fresh", desc: "Nuansa alam, hijau, biru, segar" },
  { value: "futuristic-tech", label: "Futuristic Tech", desc: "Neon, gradient, efek digital" },
] as const;

export const VISUAL_ELEMENTS = [
  { value: "product-photo", label: "Foto Produk", desc: "Tampilkan foto produk/jasa utama" },
  { value: "illustration", label: "Ilustrasi / Vector", desc: "Gambar ilustrasi custom" },
  { value: "ornament", label: "Ornamen Dekoratif", desc: "Border, frame, elemen hias" },
  { value: "gradient-bg", label: "Background Gradient", desc: "Gradasi warna smooth" },
  { value: "pattern", label: "Pattern / Tekstur", desc: "Motif berulang atau tekstur" },
  { value: "geometric", label: "Bentuk Geometris", desc: "Lingkaran, kotak, garis abstrak" },
  { value: "photo-background", label: "Foto Background", desc: "Background berbasis foto" },
  { value: "mascot", label: "Maskot Karakter", desc: "Karakter maskot bisnis" },
] as const;

export const TARGET_AUDIENCES = [
  { value: "general", label: "Umum / Semua Kalangan" },
  { value: "kids", label: "Anak-anak (5-12 tahun)" },
  { value: "teenagers", label: "Remaja (13-19 tahun)" },
  { value: "young-adults", label: "Dewasa Muda (20-35 tahun)" },
  { value: "adults", label: "Dewasa (35-50 tahun)" },
  { value: "seniors", label: "Lansia (50+ tahun)" },
  { value: "professional", label: "Profesional / Executive" },
  { value: "female", label: "Wanita / Ibu-ibu" },
  { value: "male", label: "Pria" },
] as const;

export const MOOD_OPTIONS = [
  { value: "cheerful", label: "Ceria & Hangat", color: "#FFD93D" },
  { value: "calm", label: "Tenang & Damai", color: "#6BCB77" },
  { value: "energetic", label: "Enerjik & Dinamis", color: "#FF6B35" },
  { value: "luxury", label: "Mewah & Eksklusif", color: "#C9B037" },
  { value: "simple", label: "Sederhana & Bersih", color: "#F5F5F5" },
  { value: "romantic", label: "Romantis & Lembut", color: "#FF8FAB" },
  { value: "cool", label: "Cool & Edgy", color: "#4D96FF" },
  { value: "trustworthy", label: "Terpercaya & Aman", color: "#2C786C" },
] as const;
