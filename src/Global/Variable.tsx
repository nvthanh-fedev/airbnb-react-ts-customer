export const iconBanLa =
  "https://cdn-icons-png.flaticon.com/512/5896/5896208.png";
export const iconBep = "https://cdn-icons-png.flaticon.com/512/963/963883.png";
export const iconDauXe =
  "https://cdn-icons-png.flaticon.com/512/2503/2503511.png";
export const iconDieuHoa =
  "https://cdn-icons-png.flaticon.com/512/4130/4130496.png";
export const iconHoBoi =
  "https://cdn-icons-png.flaticon.com/512/1925/1925949.png";
export const iconMayGiat =
  "https://cdn-icons-png.flaticon.com/512/3868/3868185.png";
export const iconTivi =
  "https://cdn-icons-png.flaticon.com/512/6316/6316218.png";
export const iconWifi =
  "https://cdn-icons-png.flaticon.com/512/3287/3287922.png";

export interface UtilityItem {
  icon: string;
  name: string;
  utilityProperty: string;
}

export const utilityItems: UtilityItem[] = [
  { icon: iconBanLa, name: "Bàn là", utilityProperty: "banLa" },
  { icon: iconBep, name: "Bếp", utilityProperty: "bep" },
  { icon: iconDauXe, name: "Đậu xe", utilityProperty: "doXe" },
  { icon: iconDieuHoa, name: "Điều hoà", utilityProperty: "dieuHoa" },
  { icon: iconHoBoi, name: "Hồ bơi", utilityProperty: "hoBoi" },
  { icon: iconMayGiat, name: "Máy giặt", utilityProperty: "mayGiat" },
  { icon: iconTivi, name: "Tivi", utilityProperty: "tivi" },
  { icon: iconWifi, name: "Wifi", utilityProperty: "wifi" },
];

export interface DataTypeRoom {
  id: number;
  tenPhong: string;
  khach: number;
  phongNgu: number;
  giuong: number;
  phongTam: number;
  moTa: string;
  giaTien: number;
  mayGiat: boolean;
  banLa: boolean;
  tivi: boolean;
  dieuHoa: boolean;
  wifi: boolean;
  bep: boolean;
  doXe: boolean;
  hoBoi: boolean;
  banUi: boolean;
  maViTri: number;
  hinhAnh: string;
  rate: number;
}

export const PROFILE_EDIT_MODES = {
  NAME: "name",
  EMAIL: "email",
  PHONE: "phone",
};
