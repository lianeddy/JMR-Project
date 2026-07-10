export interface Facility {
  icon: string;
  title: string;
  text: string;
}

export interface FacilityHighlight {
  icon: string;
  label: string;
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
  { icon: "shield", title: "One Gate System 24 Jam", text: "Satu akses masuk-keluar kawasan dengan pos jaga dan petugas keamanan berpatroli sepanjang hari." },
  { icon: "train", title: "10 Menit ke Tol & LRT", text: "Pintu Tol Bekasi Timur dan Stasiun LRT Jatimulya dapat ditempuh singkat dari gerbang perumahan." },
  { icon: "leaf", title: "Ruang Terbuka Hijau", text: "Taman kawasan dan jalur pejalan kaki yang teduh, dirancang untuk aktivitas keluarga sehari-hari." },
  { icon: "mosque", title: "Masjid JMR", text: "Fasilitas ibadah lengkap di dalam kawasan perumahan untuk kenyamanan warga." },
];

export const FACILITY_HIGHLIGHTS: FacilityHighlight[] = [
  { icon: "certificate", label: "Sertifikat SHM per Unit" },
  { icon: "lightning", label: "Listrik Token 1300–2200 VA" },
  { icon: "drop", label: "Air Bersih PDAM & Sumur Bor" },
  { icon: "key", label: "Serah Terima Kunci Tepat Waktu" },
];

export const DISTANCES: Distance[] = [
  { icon: "road", place: "Pintu Tol Bekasi Timur", dist: "2.6 km" },
  { icon: "train", place: "LRT Jati Mulya", dist: "2.8 km" },
  { icon: "hospital", place: "RS Ananda Tambun Selatan", dist: "1 km" },
  { icon: "shop", place: "Bekasi Trade Center Mall 2", dist: "2.8 km" },
  { icon: "hospital", place: "Mitra Keluarga Bekasi", dist: "3.2 km" },
  { icon: "train", place: "Stasiun Kereta Bekasi Timur", dist: "4.8 km" },
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
  "Premium":     { bg: "#E7ECFB", color: "#2454D6", border: "#D3DCF6" },
  "Populer":     { bg: "#E4EEF9", color: "#2563EB", border: "#CBD8EA" },
  "Luas":        { bg: "#E7F1E3", color: "#16A34A", border: "#CFE4C8" },
  "Terjangkau":  { bg: "#EEEEF0", color: "#5B6169", border: "#E3E6E2" },
};
