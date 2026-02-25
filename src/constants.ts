export interface Facility {
  icon: string;
  title: string;
  text: string;
}

export interface Distance {
  icon: string;
  place: string;
  dist: string;
}

export interface UnitSample {
  blok: string;
  luas: number;
  harga: number;
  badge: "Premium" | "Populer" | "Luas" | "Terjangkau";
}

export interface BadgeStyle {
  bg: string;
  color: string;
  border: string;
}

export const NAV_LINKS: string[] = ["Home", "Fasilitas", "Unit", "Lokasi", "Kontak"];

export const FACILITIES: Facility[] = [
  { icon: "🔒", title: "Sistem Keamanan 24 Jam", text: "Kawasan dijaga penuh oleh petugas keamanan profesional selama 24 jam setiap hari." },
  { icon: "🚆", title: "Akses Cepat ke Transportasi", text: "Hanya 10 menit ke Stasiun LRT Jatimulya dan Pintu Tol Bekasi Timur." },
  { icon: "🌳", title: "Lingkungan Asri & Nyaman", text: "Kawasan hijau yang tertata rapi, sejuk, dan ramah untuk seluruh keluarga." },
  { icon: "🕌", title: "Masjid JMR", text: "Fasilitas ibadah lengkap di dalam kawasan perumahan untuk kenyamanan warga." },
];

export const DISTANCES: Distance[] = [
  { icon: "🛣️", place: "Pintu Tol Bekasi Timur", dist: "2.6 km" },
  { icon: "🚉", place: "LRT Jati Mulya", dist: "2.8 km" },
  { icon: "🏥", place: "RS Ananda Tambun Selatan", dist: "1 km" },
  { icon: "🛍️", place: "Bekasi Trade Center Mall 2", dist: "2.8 km" },
  { icon: "🏥", place: "Mitra Keluarga Bekasi", dist: "3.2 km" },
  { icon: "🚂", place: "Stasiun Kereta Bekasi Timur", dist: "4.8 km" },
];

export const UNIT_SAMPLES: UnitSample[] = [
  { blok: "A1 No. 1", luas: 188, harga: 4000000, badge: "Premium" },
  { blok: "A1 No. 3", luas: 200, harga: 4000000, badge: "Premium" },
  { blok: "A1 No. 10", luas: 160, harga: 3500000, badge: "Populer" },
  { blok: "C1 No. 1", luas: 220, harga: 3500000, badge: "Populer" },
  { blok: "D1 No. 1", luas: 292, harga: 3500000, badge: "Luas" },
  { blok: "D4 No. 18a", luas: 147, harga: 2500000, badge: "Terjangkau" },
  { blok: "F No. 3", luas: 97, harga: 2500000, badge: "Terjangkau" },
  { blok: "E No. 1", luas: 300, harga: 3500000, badge: "Luas" },
];

export const BADGE_COLORS: Record<UnitSample["badge"], BadgeStyle> = {
  "Premium":     { bg: "#FFF0E0", color: "#C47D4A", border: "#EDD9C5" },
  "Populer":     { bg: "#E0F0FF", color: "#2563EB", border: "#BFDBFE" },
  "Luas":        { bg: "#E0F5E8", color: "#16A34A", border: "#BBF7D0" },
  "Terjangkau":  { bg: "#F3F4F6", color: "#6B7280", border: "#E5E7EB" },
};
