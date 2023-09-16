import moment from "moment";
import { CommentsRoom } from "../Redux/reducers/commentManagementReducer";
import { UtilityItem } from "./Variable";

export const daysBetweenDates = (
  date1_str: string,
  date2_str: string
): number => {
  const date1 = moment(date1_str, "DD-MM-YYYY");
  const date2 = moment(date2_str, "DD-MM-YYYY");

  const daysDiff = date2.diff(date1, "days");
  return daysDiff;
};

export const totalFee = (inputNumber: number): number => {
  const oneNinth = inputNumber / 12;
  const roundedResult = Math.round(oneNinth);
  return roundedResult;
};

export const totalPrice = (night: number, pricePerNight: number): number => {
  return night * pricePerNight;
};

export const totalPriceAndFee = (price: number, fee: number) => {
  return price + fee;
};

export const convertNameToChar = (name: string) => {
  return name.charAt(0).toUpperCase();
};

export const randomNameImg = () => {
  const randomNumber = Math.floor(Math.random() * 7) + 1;
  return `../../assets/image/signinRequest/${randomNumber}.png`;
};

export const generateRandomRate = () => {
  const min = 4.2;
  const max = 4.9;
  const randomRate = Math.random() * (max - min) + min;
  return Number(randomRate.toFixed(1));
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  let day = String(date.getDate()).padStart(2, "0");
  let month = String(date.getMonth() + 1).padStart(2, "0");
  let year = date.getFullYear();

  if (isNaN(parseInt(day)) || isNaN(parseInt(month)) || isNaN(year)) {
    day = String(Math.floor(Math.random() * 28) + 1).padStart(2, "0");
    month = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
    year = Math.floor(Math.random() * 200) + 1900;
  }

  return `${day} tháng ${month} năm ${year}`;
};

export const formatDateType2 = (dateString: string): string => {
  const date = new Date(dateString);
  let day = String(date.getDate()).padStart(2, "0");
  let month = String(date.getMonth() + 1).padStart(2, "0");
  let year = date.getFullYear();

  if (isNaN(parseInt(day)) || isNaN(parseInt(month)) || isNaN(year)) {
    day = String(Math.floor(Math.random() * 28) + 1).padStart(2, "0");
    month = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
    year = Math.floor(Math.random() * 200) + 1900;
  }

  return `${day}/${month}/${year}`;
};

export const formatText = (input: string): string => {
  const words = input.toLowerCase().split(" ");

  const formattedWords = words.map((word) => {
    const firstChar = word.charAt(0).toUpperCase();
    const restOfWord = word.slice(1);
    return firstChar + restOfWord;
  });

  return formattedWords.join(" ");
};

interface Room {
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
}

export const convertDateFormat = (inputDate: string): string => {
  const [day, month, year] = inputDate.split("-");

  const monthNames = [
    "thg 1",
    "thg 2",
    "thg 3",
    "thg 4",
    "thg 5",
    "thg 6",
    "thg 7",
    "thg 8",
    "thg 9",
    "thg 10",
    "thg 11",
    "thg 12",
  ];

  const monthName = monthNames[parseInt(month) - 1];

  return `${day} ${monthName} ${year}`;
};

export const capitalizeFirstLetter = (text: string): string => {
  if (typeof text !== "string" || text.length === 0) {
    return "";
  }

  const firstLetter = text.charAt(0).toUpperCase();
  const restOfText = text.slice(1);

  return `${firstLetter}${restOfText}`;
};

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const countComment = (commentsRoom: CommentsRoom[] | undefined) => {
  return commentsRoom ? commentsRoom.length : 0;
};

export const convertDateFormatStandard = (inputDate: string): string => {
  const parts = inputDate.split("-");
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);

  const monthString = month < 10 ? `0${month}` : `${month}`;
  const dayString = day < 10 ? `0${day}` : `${day}`;

  return `${year}-${monthString}-${dayString}`;
};

const listRoom: Room[] = [
  {
    id: 1,
    tenPhong: "NewApt D1 - Cozy studio - NU apt - 500m Bui Vien!",
    khach: 3,
    phongNgu: 1,
    giuong: 1,
    phongTam: 1,
    moTa: "Tự nhận phòng\r\nTự nhận phòng bằng khóa thông minh.\r\nDinh Long là Chủ nhà siêu cấp\r\nChủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết mang lại quãng thời gian ở tuyệt vời cho khách.",
    giaTien: 28,
    mayGiat: true,
    banLa: true,
    tivi: true,
    dieuHoa: false,
    wifi: true,
    bep: false,
    doXe: true,
    hoBoi: true,
    banUi: true,
    maViTri: 1,
    hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/phong1.jpg",
  },
  {
    id: 2,
    tenPhong: "STUDIO MỚI NETFLIX MIỄN PHÍ/ĐỖ XE MIỄN PHÍ",
    khach: 2,
    phongNgu: 1,
    giuong: 1,
    phongTam: 1,
    moTa: "Không gian riêng để làm việc\r\nMột khu vực chung có Wi-fi, phù hợp để làm việc.\r\nTự nhận phòng\r\nTự nhận phòng bằng khóa thông minh.\r\nKim Nam là Chủ nhà siêu cấp\r\nChủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết mang lại quãng thời gian ở tuyệt vời cho khách.",
    giaTien: 21,
    mayGiat: true,
    banLa: true,
    tivi: true,
    dieuHoa: true,
    wifi: true,
    bep: true,
    doXe: false,
    hoBoi: false,
    banUi: false,
    maViTri: 1,
    hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/phong2.png",
  },
];

export const filterRooms = (rooms: Room[], filters: Partial<Room>): Room[] => {
  return rooms.filter((room) => {
    return Object.keys(filters).every((filterKey) => {
      const key = filterKey as keyof Room;
      if (!(key in room) || room[key] !== filters[key]) {
        return false;
      }
      return true;
    });
  });
};

const filteredRooms = filterRooms(listRoom, {
  doXe: true,
});

console.log(filteredRooms);

export const filterUtilityItemsByProperty = (
  utilityItems: UtilityItem[],
  filterObject: { [key: string]: boolean }
): string[] => {
  const result: string[] = [];

  for (const item of utilityItems) {
    const propertyName = item.utilityProperty;

    if (filterObject[propertyName]) {
      result.push(item.name);
    }
  }
  return result;
};
