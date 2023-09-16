import {
  Avatar,
  Breadcrumb,
  Button,
  Col,
  Divider,
  List,
  Row,
  Skeleton,
  Space,
} from "antd";
import styles from "./roomBooked.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/configStore";
import { useEffect, useState } from "react";
import { getListRoomBookedByUserIdAction } from "../../Redux/reducers/userManagementReducer";
import SigninRequest from "../../Components/SigninRequest/SigninRequest";
import {
  Room,
  getRoomAction,
} from "../../Redux/reducers/roomManagementReducer";
import { NavLink } from "react-router-dom";
import UploadAvatar from "../../Components/UploadAvatar/UploadAvatar";
import { CheckCircleOutlined, SafetyOutlined } from "@ant-design/icons";
import { convertNameToChar, formatDate, formatText } from "../../Global/Method";

type Props = {};

interface RoomBookedDetail {
  room: Room;
  id: number;
  maPhong: number;
  ngayDen: string;
  ngayDi: string;
  soLuongKhach: number;
  maNguoiDung: number;
}

const RoomBooked: React.FC<Props> = () => {
  const dispatch: AppDispatch = useDispatch();
  const [listRoombookedDetail, setListRoombookedDetail] = useState<
    RoomBookedDetail[]
  >([]);
  const [loadingCombinedData, setLoadingCombinedData] = useState<boolean>(true);
  let combinedData: RoomBookedDetail[] = [];

  const { user } = useSelector(
    (state: RootState) => state.userManagementReducer
  );

  const { rooms } = useSelector(
    (state: RootState) => state.roomManagementReducer
  );
  const getRoomBookedByUserIdApi = () => {
    const idUser = user?.id ? String(user.id) : "";
    const action = getListRoomBookedByUserIdAction(parseInt(idUser));
    dispatch(action);
  };

  const getRoom = () => {
    const action = getRoomAction();
    dispatch(action);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
  }, [rooms]);

  useEffect(() => {
    getRoomBookedByUserIdApi();
    getRoom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { listRoomBookedsByUserId, isLoadingListRoomBookedsByUserId } =
    useSelector((state: RootState) => state.userManagementReducer);

  const getCombinedData = () => {
    setLoadingCombinedData(true);

    if (listRoomBookedsByUserId && listRoomBookedsByUserId.length > 0) {
      console.log(
        "🚀 ~ file: RoomBooked.tsx:77 ~ combinedData=listRoomBookedsByUserId.map ~ rooms:",
        rooms
      );
      combinedData = listRoomBookedsByUserId.map((booking) => {
        const room = rooms?.find((r) => r.id === booking.maPhong);

        console.log(
          "🚀 ~ file: RoomBooked.tsx:77 ~ combinedData=listRoomBookedsByUserId.map ~ booking.maPhong:",
          booking.maPhong
        );

        // Handle the case where room is not found
        if (!room) {
          console.log(`Room with id ${booking.maPhong} not found.`);
          // Create a default Room object with missing properties
          const defaultRoom: Room = {
            id: -1,
            tenPhong: "Unknown Room",
            khach: 0,
            phongNgu: 0,
            giuong: 0,
            phongTam: 0,
            moTa: "",
            giaTien: 0,
            mayGiat: false,
            banLa: false,
            tivi: false,
            dieuHoa: false,
            wifi: false,
            bep: false,
            doXe: false,
            hoBoi: false,
            banUi: false,
            maViTri: 0,
            hinhAnh: "",
          };

          const roomDetails: RoomBookedDetail = {
            room: defaultRoom,
            ngayDen: booking.ngayDen.toString(),
            ngayDi: booking.ngayDi,
            soLuongKhach: booking.soLuongKhach,
            maNguoiDung: booking.maNguoiDung,
            maPhong: booking.maPhong,
            id: booking.id,
          };
          return roomDetails;
        }

        const roomDetails: RoomBookedDetail = {
          room: room,
          ngayDen: booking.ngayDen.toString(),
          ngayDi: booking.ngayDi,
          soLuongKhach: booking.soLuongKhach,
          maNguoiDung: booking.maNguoiDung,
          maPhong: booking.maPhong,
          id: booking.id,
        };

        return roomDetails;
      });
    }

    setListRoombookedDetail(combinedData);
    setLoadingCombinedData(false);
    console.log(combinedData);
  };

  useEffect(() => {
    // call API
    getCombinedData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rooms, listRoomBookedsByUserId]);

  if (isLoadingListRoomBookedsByUserId || loadingCombinedData) {
    return (
      <Row
        justify="center"
        style={{ marginBottom: "500px", marginTop: " 200px" }}
      >
        <Col
          xs={{ span: 22 }}
          sm={{ span: 22 }}
          md={{ span: 22 }}
          lg={{ span: 16 }}
          xl={{ span: 16 }}
          // className={containerClassName}
        >
          <Skeleton active />
        </Col>
      </Row>
    );
  }

  const renderBreadcrumb = () => {
    const breadcrumbItems = [{ title: "Tài khoản" }, { title: "Phòng đã đặt" }];

    return (
      <Col
        xs={{ span: 0 }}
        sm={{ span: 0 }}
        md={{ span: 24 }}
        lg={{ span: 24 }}
        xl={{ span: 24 }}
      >
        <Breadcrumb separator=">" items={breadcrumbItems} />
      </Col>
    );
  };

  const RoomBookedList = () => {
    if (listRoomBookedsByUserId === undefined) {
      return <>Loading</>;
    } else {
      return (
        <Row style={{ marginTop: "120px" }} justify="center">
          <Col
            xs={{ span: 22 }}
            sm={{ span: 22 }}
            md={{ span: 22 }}
            lg={{ span: 18 }}
            xl={{ span: 16 }}
            xxl={{ span: 16 }}
          >
            {renderBreadcrumb()}
            <Col span={24} className={styles.title}>
              <h1>Phòng đã đặt</h1>
            </Col>
            <Row justify="space-between">
              <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 24 }}
                lg={{ span: 24 }}
                xl={{ span: 24 }}
                xxl={{ span: 8 }}
              >
                <Row justify="center" className={styles.info}>
                  <Col span={24}>
                    {user?.avatar ? (
                      <>
                        <Row>
                          <Col span={24} className={styles.containerImgAvt}>
                            <img
                              src={user?.avatar}
                              alt="Logo"
                              className={styles.avtImg}
                            />
                          </Col>

                          <Col span={24}>
                            <UploadAvatar></UploadAvatar>
                          </Col>
                        </Row>
                      </>
                    ) : (
                      <>
                        <Row>
                          <Col span={24} className={styles.containerImgAvt}>
                            <Avatar className={styles.avatarChar}>
                              {user ? convertNameToChar(user.name) : ""}
                            </Avatar>
                          </Col>
                          <Col span={24}>
                            <UploadAvatar></UploadAvatar>
                          </Col>
                        </Row>
                      </>
                    )}
                  </Col>
                  <Col span={24}>
                    <p className={styles.iconSafetyOutlined}>
                      <SafetyOutlined />
                    </p>
                  </Col>
                  <Row style={{ display: "flex", justifyContent: "center" }}>
                    <Col
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 12 }}
                      lg={{ span: 12 }}
                      xl={{ span: 12 }}
                      xxl={{ span: 24 }}
                    >
                      <Row justify="center">
                        <Col span={24}>
                          <h3 className={styles.verify}>Xác minh danh tính</h3>
                          <p className={styles.verified}>
                            Xác thực danh tính của bạn với huy hiệu xác minh
                            danh tính{" "}
                          </p>
                        </Col>
                        <Col
                          xs={{ span: 24 }}
                          sm={{ span: 24 }}
                          md={{ span: 0 }}
                          lg={{ span: 0 }}
                          xl={{ span: 0 }}
                          xxl={{ span: 24 }}
                          style={{ textAlign: "center" }}
                        >
                          <Button className={styles.buttonFunction}>
                            Nhận huy hiệu
                          </Button>
                        </Col>
                      </Row>
                    </Col>

                    <Col
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 0 }}
                      lg={{ span: 0 }}
                      xl={{ span: 0 }}
                      xxl={{ span: 24 }}
                    >
                      <Divider style={{ margin: "40px 0px" }} />
                    </Col>

                    <Col
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 12 }}
                      lg={{ span: 12 }}
                      xl={{ span: 12 }}
                      xxl={{ span: 24 }}
                    >
                      <Row justify="center">
                        <Col span={24}>
                          <h3 className={styles.verify}>
                            {user?.name} đã xác nhận
                          </h3>
                        </Col>
                        <Col span={24} style={{ textAlign: "center" }}>
                          <p className={styles.verified}>
                            <CheckCircleOutlined /> địa chỉ email
                          </p>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Row>
              </Col>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 24 }}
                lg={{ span: 24 }}
                xl={{ span: 24 }}
                xxl={{ span: 15 }}
              >
                <List
                  itemLayout="horizontal"
                  size="large"
                  pagination={{
                    pageSize: 3,
                    position: "bottom",
                    align: "end",
                  }}
                  dataSource={listRoombookedDetail}
                  renderItem={(roomBooked) => (
                    <List.Item style={{ padding: "auto 0px" }}>
                      <NavLink to={`/rooms/${roomBooked.room.id}`}>
                        <Row justify="space-between">
                          <Col
                            xs={{ span: 24 }}
                            sm={{ span: 24 }}
                            md={{ span: 24 }}
                            lg={{ span: 24 }}
                            xl={{ span: 9 }}
                            xxl={{ span: 9 }}
                            className={styles.containerImgRoom}
                          >
                            <img
                              alt="room img"
                              src={roomBooked.room.hinhAnh}
                              className={styles.coverImage}
                            />
                          </Col>
                          <Col
                            xs={{ span: 24 }}
                            sm={{ span: 24 }}
                            md={{ span: 24 }}
                            lg={{ span: 24 }}
                            xl={{ span: 14 }}
                            xxl={{ span: 14 }}
                          >
                            <Row>
                              <Col span={24}>
                                <h2 className={styles.nameRoom}>
                                  {formatText(roomBooked.room.tenPhong)}
                                </h2>
                              </Col>
                              <Col
                                xs={{ span: 24 }}
                                sm={{ span: 12 }}
                                md={{ span: 12 }}
                                lg={{ span: 12 }}
                                xl={{ span: 12 }}
                                xxl={{ span: 12 }}
                              >
                                <Space>
                                  <p className={styles.utilities}>
                                    {roomBooked.room.phongNgu} Phòng ngủ
                                  </p>

                                  <p className={styles.utilities}>
                                    {roomBooked.room.giuong} Giường ngủ
                                  </p>
                                </Space>
                              </Col>
                              <Col
                                xs={{ span: 24 }}
                                sm={{ span: 12 }}
                                md={{ span: 12 }}
                                lg={{ span: 12 }}
                                xl={{ span: 12 }}
                                xxl={{ span: 12 }}
                              >
                                <Space>
                                  <p className={styles.utilities}>
                                    {roomBooked.room.phongTam} Phòng tắm
                                  </p>

                                  <p className={styles.utilities}>
                                    {roomBooked.soLuongKhach} Khách
                                  </p>
                                </Space>
                              </Col>
                              <Col span={24}>
                                <Row>
                                  <Col
                                    xs={{ span: 24 }}
                                    sm={{ span: 12 }}
                                    md={{ span: 12 }}
                                    lg={{ span: 12 }}
                                    xl={{ span: 12 }}
                                    xxl={{ span: 12 }}
                                  >
                                    <Row>
                                      <Col span={24}>
                                        <p className={styles.titleRoombooked}>
                                          Ngày nhận
                                        </p>
                                      </Col>
                                      <Col span={24}>
                                        <h2 className={styles.valueRoombooked}>
                                          {formatDate(roomBooked.ngayDen)}
                                        </h2>
                                      </Col>
                                    </Row>
                                  </Col>

                                  <Col
                                    xs={{ span: 24 }}
                                    sm={{ span: 12 }}
                                    md={{ span: 12 }}
                                    lg={{ span: 12 }}
                                    xl={{ span: 12 }}
                                    xxl={{ span: 12 }}
                                  >
                                    <Row>
                                      <Col span={24}>
                                        <p className={styles.titleRoombooked}>
                                          Ngày đi
                                        </p>
                                      </Col>
                                      <Col span={24}>
                                        <h2 className={styles.valueRoombooked}>
                                          {formatDate(roomBooked.ngayDi)}
                                        </h2>
                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </NavLink>
                    </List.Item>
                  )}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      );
    }
  };

  const RenderComponentRoomBooked = () => {
    console.log("user ", user);

    if (user?.email === "") {
      return <SigninRequest />;
    } else {
      console.log("   The list of room bookeds is available, so render it. ");

      return <>{RoomBookedList()}</>;
    }
  };

  return <>{RenderComponentRoomBooked()}</>;
};

export default RoomBooked;
