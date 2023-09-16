import React, { useEffect, useState, useMemo } from "react";
import { Col, Row, Space, Skeleton, Button, message } from "antd";
import styles from "./home.module.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../Redux/configStore";
import {
  Room,
  getRoomAction,
} from "../../Redux/reducers/roomManagementReducer";

import SliderUtilities from "../../Components/SliderUitilies/SliderUtilities";
import {
  HeartFilled,
  HeartTwoTone,
  UnorderedListOutlined,
} from "@ant-design/icons";
import Filter from "../../Components/Filter/Filter";
import { NavLink } from "react-router-dom";
import {
  filterRooms,
  filterUtilityItemsByProperty,
  generateRandomRate,
} from "../../Global/Method";
import { DataTypeRoom, utilityItems } from "../../Global/Variable";
import { setShowSearchDetail } from "../../Redux/reducers/uiManagementReducer";

const Home = () => {
  const { rooms, isLoading } = useSelector(
    (state: RootState) => state.roomManagementReducer
  );
  const { isSearchDetail } = useSelector(
    ({ uiManagementReducer }: RootState) => uiManagementReducer
  );

  const { selectedUtility } = useSelector(
    (state: RootState) => state.uiManagementReducer
  );

  const [visibleRooms, setVisibleRooms] = useState<DataTypeRoom[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);

  const data: DataTypeRoom[] = useMemo(() => {
    if (rooms && Array.isArray(rooms)) {
      return rooms.map((item: Room) => ({
        id: item.id,
        tenPhong: item.tenPhong,
        khach: item.khach,
        phongNgu: item.phongNgu,
        giuong: item.giuong,
        phongTam: item.phongTam,
        moTa: item.moTa,
        giaTien: item.giaTien,
        mayGiat: item.mayGiat,
        banLa: item.banLa,
        tivi: item.tivi,
        dieuHoa: item.dieuHoa,
        wifi: item.wifi,
        bep: item.bep,
        doXe: item.doXe,
        hoBoi: item.hoBoi,
        banUi: item.banUi,
        maViTri: item.maViTri,
        hinhAnh: item.hinhAnh,
        rate: generateRandomRate(),
      }));
    }
    return [];
  }, [rooms]);

  const dataFilter: DataTypeRoom[] = useMemo(() => {
    if (filteredRooms && Array.isArray(filteredRooms)) {
      return filteredRooms.map((item: Room) => ({
        id: item.id,
        tenPhong: item.tenPhong,
        khach: item.khach,
        phongNgu: item.phongNgu,
        giuong: item.giuong,
        phongTam: item.phongTam,
        moTa: item.moTa,
        giaTien: item.giaTien,
        mayGiat: item.mayGiat,
        banLa: item.banLa,
        tivi: item.tivi,
        dieuHoa: item.dieuHoa,
        wifi: item.wifi,
        bep: item.bep,
        doXe: item.doXe,
        hoBoi: item.hoBoi,
        banUi: item.banUi,
        maViTri: item.maViTri,
        hinhAnh: item.hinhAnh,
        rate: generateRandomRate(),
      }));
    }
    return [];
  }, [filteredRooms]);

  const dispatch: AppDispatch = useDispatch();

  const getRoomApi = () => {
    const action = getRoomAction();
    dispatch(action);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getRoomApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (rooms) {
      const filteredRooms = filterRooms(rooms, selectedUtility);
      setFilteredRooms(filteredRooms);

      if (Object.keys(selectedUtility).length !== 0) {
        const utilityNames = filterUtilityItemsByProperty(
          utilityItems,
          selectedUtility
        );
        const successMessage = `Đã tìm thấy ${dataFilter.length} phòng có ${
          utilityNames.length > 0 ? utilityNames[0] : ""
        }`;
        message.success(successMessage);
        setVisibleRooms(dataFilter);
      } else {
        setVisibleRooms(data);
      }
      window.scrollTo(0, 0); // Cuộn lên đầu trang
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rooms, selectedUtility]);

  const [isLiked, setIsLiked] = useState(false);

  const handleHeartClick = () => {
    setIsLiked(!isLiked);
  };

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  if (isLoading) {
    return (
      <Row
        justify="center"
        style={{ marginTop: "210px", marginBottom: "500px" }}
      >
        <Col span={22}>
          <Row gutter={[20, 20]}>
            {[...Array(12)].map((_, index) => (
              <Col
                key={index}
                xs={{ span: 24 }}
                sm={{ span: 12 }}
                md={{ span: 8 }}
                lg={{ span: 6 }}
                xl={{ span: 4 }}
                xxl={{ span: 4 }}
                className={styles.containerSkeleton}
              >
                <Row>
                  <Col span={24}>
                    <Skeleton.Image
                      active={isLoading}
                      style={{
                        borderRadius: "10px",
                        marginBottom: "10px",
                      }}
                    />
                  </Col>
                  <Col span={24}>
                    <Skeleton active />
                  </Col>
                </Row>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    );
  }

  return (
    <Row justify="center" className={styles.container}>
      {isSearchDetail && (
        <div
          className={styles.overlay}
          onClick={() => {
            dispatch(setShowSearchDetail(false));
            console.log("hello");
          }}
        />
      )}
      <Col span={24} className={styles.componentSliderUtilities}>
        <Row justify="center">
          <Col
            xs={{ span: 23 }}
            sm={{ span: 23 }}
            md={{ span: 23 }}
            lg={{ span: 22 }}
            xl={{ span: 22 }}
            xxl={{ span: 22 }}
            style={{ position: "sticky", top: "50px" }}
          >
            <Row justify="space-between" align="top">
              <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 24 }}
                lg={{ span: 22 }}
                xl={{ span: 22 }}
                xxl={{ span: 22 }}
                className={styles.subHeader}
              >
                <SliderUtilities />
              </Col>

              <Col
                xs={{ span: 0 }}
                sm={{ span: 0 }}
                md={{ span: 0 }}
                lg={{ span: 2 }}
                xl={{ span: 2 }}
                xxl={{ span: 2 }}
                className={styles.buttonFilter}
              >
                <Row justify="end">
                  <Col flex="60px">
                    <Button icon={<UnorderedListOutlined />} onClick={toggle}>
                      Bộ lọc
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Filter />
      <Col span={22}>
        <Row gutter={[20, 20]}>
          {visibleRooms.map((item) => (
            <Col
              key={item.id}
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              md={{ span: 8 }}
              lg={{ span: 6 }}
              xl={{ span: 4 }}
              xxl={{ span: 4 }}
            >
              <NavLink
                to={`/rooms/${item.id}`}
                style={{ textDecoration: "none" }}
              >
                <Row>
                  <Col span={24} className={styles.zoomContainer}>
                    <img
                      alt="room img"
                      src={item.hinhAnh}
                      className={styles.coverImage}
                    />
                    <div
                      className={`${styles.heartIcon} ${
                        isLiked ? styles.heartIconLiked : ""
                      }`}
                      onClick={handleHeartClick}
                    >
                      {isLiked ? (
                        <HeartFilled />
                      ) : (
                        <HeartTwoTone twoToneColor="#D80865" />
                      )}
                    </div>
                  </Col>

                  <Col span={24} className={styles.mainInfo}>
                    <Row justify="space-between">
                      <Col span={19} className={styles.nameRoom}>
                        <h5>{item.tenPhong}</h5>
                      </Col>
                      <Col span={4} className={styles.rate}>
                        <p>{item.rate}</p>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={24}>
                    <p className={styles.information}>{item.moTa}</p>
                  </Col>
                  <Col span={24}>
                    <Space>
                      <p className={styles.information}>
                        Số phòng tắm: {item.phongTam}
                      </p>
                      <p className={styles.information}>
                        Số giường: {item.giuong}
                      </p>
                    </Space>
                  </Col>
                  <Col span={24}>
                    <Space>
                      <p className={styles.price}>${item.giaTien}</p>
                      <p className={styles.priceUnit}>/ đêm</p>
                    </Space>
                  </Col>
                </Row>
              </NavLink>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default Home;
