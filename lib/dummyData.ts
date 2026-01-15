export interface Student {
    id: number;
    name: string;
    class: string;
    nis: string;
    status: "Active" | "Graduated" | "Suspended";
}

export const STUDENTS_DATA: Student[] = [
    { id: 1, name: "Ali baba", class: "X-IPA-1", nis: "2023001", status: "Active" },
    { id: 2, name: "Maria Ozawa", class: "XI-IPS-2", nis: "2022055", status: "Active" },
    { id: 3, name: "John Doe", class: "XII-IPA-3", nis: "2021099", status: "Graduated" },
    { id: 4, name: "Jane Smith", class: "X-IPS-1", nis: "2023045", status: "Suspended" },
    { id: 5, name: "Michael Jordan", class: "Basketball Club", nis: "2023023", status: "Active" },
    { id: 6, name: "Siti Nurhaliza", class: "X-IPA-2", nis: "2023101", status: "Active" },
];

export const APP_PAGES = [
    { name: "Dashboard", path: "/" },
    { name: "Data Guru", path: "/teachers" },
    { name: "Data Siswa", path: "/students" },
    { name: "Users", path: "/users" },
    { name: "Analytics", path: "/analytics" },
    { name: "Maps", path: "/map" },
    { name: "News (Berita)", path: "/news" },
    { name: "Absensi", path: "/attendance" },
    { name: "Tugas & PR (Assignments)", path: "/assignments" },
    { name: "Media Gallery", path: "/media" },
    { name: "Profile", path: "/profile" },
    { name: "Settings", path: "/settings" },
    { name: "Image Compression", path: "/image-compression" },
    { name: "PWA Settings", path: "/pwa" },
    { name: "Realtime DB", path: "/realtime-db" },
    { name: "Storage", path: "/storage" },
    { name: "IndexedDB", path: "/indexeddb" },
    { name: "Sprite Layout", path: "/sprite" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
];
