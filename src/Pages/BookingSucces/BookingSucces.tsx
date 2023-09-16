import { Button, Result } from "antd";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

type Props = {};

const BookingSucces: React.FC<Props> = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, []);

  return (
    <div style={{ marginTop: "150px" }}>
      <Result
        status="success"
        title="Đặt phòng thành công!"
        subTitle="Mã đặt phòng: 2017182818828182881 Chúc bạn có một chuyến nghỉ dưỡng thật tuyệt vời"
        extra={[
          <NavLink
            className="nav-link"
            to="/roombooked"
            style={{ margin: 0, padding: 0, textAlign: "end" }}
          >
            <Button
              type="text"
              // className={styles.buttonFunction}
              style={{ margin: 0, padding: 0, textAlign: "end" }}
            >
              Xem phòng đã đặt
            </Button>
          </NavLink>,
        ]}
      />
    </div>
  );
};

export default BookingSucces;
