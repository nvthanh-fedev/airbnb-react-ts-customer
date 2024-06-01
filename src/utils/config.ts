import axios from "axios";
// import { history } from "../index";
//cấu hình hệ thống
export const USER_LOGIN = "user";
export const TOKEN = "token";

const tokenCybersoft = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlSlMgNDAiLCJIZXRIYW5TdHJpbmciOiIyMC8wOS8yMDI0IiwiSGV0SGFuVGltZSI6IjE3MjY3OTA0MDAwMDAiLCJuYmYiOjE3MDg3MDc2MDAsImV4cCI6MTcyNjkzODAwMH0.qIEfzyRFQWZht--DjqY-I9Nz-epTZ6rAvcuTLx_-w00`;

export const http = axios.create({
  baseURL: "https://airbnbnew.cybersoft.edu.vn/",
  timeout: 30000,
});

//interceptor
http.interceptors.request.use(
  (config) => {
    config = { ...config };
    config.headers["TokenCybersoft"] = tokenCybersoft;

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export const { getStoreJson, setStoreJson, getStore, setStore, clearStorage } =
  {
    getStoreJson: (name: string): any => {
      if (localStorage.getItem(name)) {
        const strResult: string | null | any = localStorage.getItem(name);
        return JSON.parse(strResult);
      }
      return undefined;
    },

    setStoreJson: (name: string, data: any): void => {
      const strJSON = JSON.stringify(data);
      localStorage.setItem(name, strJSON);
    },
    getStore: (name: string): string | null => {
      return localStorage.getItem(name);
    },
    setStore: (name: string, data: string): void => {
      localStorage.setItem(name, data);
    },
    clearStorage: (name: string) => {
      localStorage.removeItem(name);
    },
  };

/* statusCode thông dụng : 
    200: Dữ liệu gửi đi và nhận về kết quả thành công (OK)
    201: Dữ liệu khởi tạo thành công (Created)
    400: Bad request (lỗi không tìm thấy item trên backend)
    404: Not found (không tìm thấy link backend)
    500: Error in server (Lỗi xảy ra tại server - có thể do dữ liệu frontend gửi lên xử lý bị lỗi backend không catch trường hợp này thì ra 500 hoặc là backend code bị lỗi) => Xác định lỗi => mở post man request thử với data đúng thì có được hay không nếu vẫn lỗi thì báo backend fix
    401: UnAuthorize (Lỗi khi không có quyền truy cập vào api này (phải token hợp lệ ...))
    403: Forbiden ( Lỗi chưa đủ quyền truy cập vào api )

*/
