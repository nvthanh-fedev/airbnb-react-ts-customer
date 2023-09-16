import React, { useEffect, useState } from "react";
import { Col, Row, Button, Space, Select } from "antd";
import styles from "./searchDetail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/configStore";

import "dayjs/locale/vi";
import { MinusOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import DatePicker from "../DatePicker/DatePicker";
import {
  LocationManagementState,
  getLocationAction,
} from "../../Redux/reducers/locationManagementReducer";
import { convertDateFormat } from "../../Global/Method";
import {
  setIsHome,
  setModeDetail,
  setModeProfile,
  setShowSearchDetail,
} from "../../Redux/reducers/uiManagementReducer";
import { getRoomByLocationIdAction } from "../../Redux/reducers/roomManagementReducer";
// import RangeDatePicker from "../RangePicker/RangePicker";

type Props = {};

const SearchDetail: React.FC<Props> = () => {
  const [inforCalendarStart, setInforCalendarStart] = useState("Ngày nhận");
  const [inforCalendarEnd, setInforCalendarEnd] = useState("Ngày trả");
  const [address, setAddress] = useState("Tìm kiếm địa điểm");
  const [activeItem, setActiveItem] = useState<number | null>(1);
  const [guest, setGuest] = useState(1);
  const [locationId, setLocationId] = useState(1);
  const { startDay, endDay } = useSelector(
    (state: RootState) => state.uiManagementReducer
  );
  useEffect(() => {
    if (
      startDay !== "null" &&
      startDay !== "" &&
      endDay !== "null" &&
      endDay !== ""
    ) {
      setInforCalendarStart(`${convertDateFormat(startDay)}`);
      setInforCalendarEnd(`${convertDateFormat(endDay)}`);
    } else if (startDay !== "null" && endDay === "null") {
      setInforCalendarStart(`${convertDateFormat(startDay)}`);
      setInforCalendarEnd("Thêm ngày");
    } else if (startDay !== "null" && endDay !== "null") {
      setInforCalendarEnd("Thêm ngày");
      setInforCalendarEnd("Thêm ngày");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDay, endDay]);
  const handleItemClick = (index: number) => {
    setActiveItem(index);
  };
  const { locations }: LocationManagementState = useSelector(
    (state: RootState) => state.locationManagementReducer
  );

  const handleChange = (value: string) => {
    setLocationId(parseInt(value));
    // Find the selected location based on the value
    const selectedLocation = locations?.find(
      (item) => item.id === parseInt(value)
    );

    // Check if a valid location is found
    if (selectedLocation) {
      const { tenViTri, tinhThanh, quocGia } = selectedLocation;
      setAddress(`${tenViTri} - ${tinhThanh} - ${quocGia}`);
    }
  };

  const dispatch: AppDispatch = useDispatch();

  const getLocations = () => {
    const action = getLocationAction();
    dispatch(action);
  };

  useEffect(() => {
    getLocations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const options = locations?.map((item) => ({
    value: `${item.id}`,
    label: `${item.tenViTri} - ${item.tinhThanh} - ${item.quocGia}`,
  }));

  const handlePlus = () => {
    setGuest(guest + 1);
  };

  const handleMinus = () => {
    if (guest > 1) {
      setGuest(guest - 1);
    }
  };

  const { isSearchDetail } = useSelector(
    ({ uiManagementReducer }: RootState) => uiManagementReducer
  );

  return (
    <Col
      span={24}
      className={
        isSearchDetail ? styles.searchDetailShow : styles.searchDetailHide
      }
    >
      <Row justify="center">
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 24 }}
          xl={{ span: 12 }}
        >
          <Row justify="center" className={styles.rowInputSearch}>
            <Col
              xs={{ span: 12 }}
              sm={{ span: 12 }}
              md={{ span: 12 }}
              lg={{ span: 12 }}
              xl={{ span: 8 }}
              xxl={{ span: 8 }}
              className={styles.itemInputSearch}
            >
              <div
                className={`${styles.buttonItemSearch} ${
                  activeItem === 0 ? styles.active : ""
                }`}
                onClick={() => handleItemClick(0)}
              >
                <div className={styles.titleSearch}>Địa điểm</div>
                <div>
                  <p className={styles.inputSearch}>{address}</p>
                </div>
              </div>
            </Col>

            <Col
              xs={{ span: 0 }}
              sm={{ span: 0 }}
              md={{ span: 0 }}
              lg={{ span: 0 }}
              xl={{ span: 4 }}
              xxl={{ span: 4 }}
              className={styles.itemInputSearch}
            >
              <div
                className={`${styles.buttonItemSearch} ${
                  activeItem === 1 ? styles.active : ""
                }`}
                onClick={() => handleItemClick(1)}
              >
                <div className={styles.titleSearch}>Nhận phòng</div>
                <div>
                  <p className={styles.inputSearch}> {inforCalendarStart}</p>
                </div>
              </div>
            </Col>

            <Col
              xs={{ span: 0 }}
              sm={{ span: 0 }}
              md={{ span: 0 }}
              lg={{ span: 0 }}
              xl={{ span: 4 }}
              xxl={{ span: 4 }}
              className={styles.itemInputSearch}
            >
              <div
                className={`${styles.buttonItemSearch} ${
                  activeItem === 2 ? styles.active : ""
                }`}
                onClick={() => handleItemClick(2)}
              >
                <div className={styles.titleSearch}>Trả phòng</div>
                <div>
                  <p className={styles.inputSearch}> {inforCalendarEnd}</p>
                </div>
              </div>
            </Col>

            <Col
              xs={{ span: 12 }}
              sm={{ span: 12 }}
              md={{ span: 12 }}
              lg={{ span: 12 }}
              xl={{ span: 8 }}
              xxl={{ span: 8 }}
              className={styles.itemInputSearch}
            >
              <Row
                className={`${styles.buttonItemSearch} ${
                  activeItem === 3 ? styles.active : ""
                }`}
                onClick={() => handleItemClick(3)}
                justify="space-between"
              >
                <Col flex="auto">
                  <div className={styles.titleSearch}>Khách</div>
                  <div>
                    <p className={styles.inputSearch}>{guest}</p>
                  </div>
                </Col>
                <Col flex="80px" style={{ marginRight: "10px" }}>
                  <Button
                    className={styles.buttonSearch}
                    icon={<SearchOutlined />}
                    onClick={() => {
                      dispatch(setShowSearchDetail(false));
                      dispatch(setIsHome());
                      dispatch(setModeDetail(false));
                      dispatch(setModeProfile(false));
                      dispatch(getRoomByLocationIdAction(locationId));
                      setInforCalendarEnd("Thêm ngày");
                      setInforCalendarEnd("Thêm ngày");
                      setGuest(1);
                    }}
                  >
                    Tìm kiếm
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={24}></Col>
        <Col
          xs={{ span: 0 }}
          sm={{ span: 0 }}
          md={{ span: 0 }}
          lg={{ span: 0 }}
          xl={{ span: 12 }}
          style={{
            marginTop: "10px",
            marginBottom: "20px",
          }}
        >
          {(() => {
            switch (activeItem) {
              case 0:
                return (
                  <Row justify="start" style={{ height: "auto" }}>
                    <Col
                      span="auto"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "10px",
                        borderRadius: "25px",
                        background: "white",
                        border: "1px solid #eeeeee",
                        overflow: "hidden",
                      }}
                    >
                      <Row
                        style={{
                          width: "300px",
                          padding: "10px",
                          // height: "30px",
                        }}
                      >
                        <Col span={24}>
                          <h5
                            style={{
                              padding: "0px",
                              margin: "0px",
                              fontWeight: "600",
                              textAlign: "start",
                            }}
                          >
                            Tìm địa điểm
                          </h5>
                        </Col>

                        <Select
                          style={{ width: "100%", textAlign: "start" }}
                          // loading
                          options={options}
                          onChange={handleChange}
                          bordered={false}
                        />
                      </Row>
                    </Col>
                  </Row>
                );
              case 1:
                return (
                  <Row justify="center" style={{ height: "auto" }}>
                    <Col
                      xs={{ span: 0 }}
                      sm={{ span: 0 }}
                      md={{ span: 0 }}
                      lg={{ span: 0 }}
                      xl={{ span: 0 }}
                      xxl={{ span: "auto" }}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "20px 20px 120px 20px",
                        borderRadius: "25px",
                        background: "white",
                        border: "1px solid #eeeeee",
                        overflow: "hidden",
                      }}
                    >
                      <DatePicker />
                    </Col>
                  </Row>
                );
              case 2:
                return (
                  <Row justify="center" style={{ height: "auto" }}>
                    <Col
                      xs={{ span: 0 }}
                      sm={{ span: 0 }}
                      md={{ span: 0 }}
                      lg={{ span: 0 }}
                      xl={{ span: 0 }}
                      xxl={{ span: "auto" }}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "20px 20px 120px 20px",
                        borderRadius: "25px",
                        background: "white",
                        border: "1px solid #eeeeee",
                        overflow: "hidden",
                      }}
                    >
                      <DatePicker />
                    </Col>
                  </Row>
                );
              case 3:
                return (
                  <Row justify="end" style={{ height: "auto" }}>
                    <Col
                      span="auto"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "10px",
                        borderRadius: "25px",
                        background: "white",
                        border: "1px solid #eeeeee",
                        overflow: "hidden",
                      }}
                    >
                      <Row
                        style={{
                          width: "300px",
                          padding: "10px",
                          // height: "30px",
                        }}
                      >
                        <Col span={12}>
                          <Row>
                            <Col span={24}>
                              <h5
                                style={{
                                  padding: "0px",
                                  margin: "0px",
                                  fontWeight: "600",
                                }}
                              >
                                Số khách
                              </h5>
                            </Col>

                            <Col span={24}>
                              <p
                                className={styles.price}
                                style={{ marginBottom: "0px" }}
                              >
                                {guest}
                              </p>
                            </Col>
                          </Row>
                        </Col>

                        <Col
                          span={12}
                          style={{
                            display: "flex",
                            justifyContent: "end",
                          }}
                        >
                          <Space>
                            <Button
                              shape="circle"
                              icon={<MinusOutlined />}
                              onClick={handleMinus}
                            />
                            <Button
                              shape="circle"
                              icon={<PlusOutlined />}
                              onClick={handlePlus}
                            />
                          </Space>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                );
              default:
                return null;
            }
          })()}
        </Col>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 24 }}
          xl={{ span: 0 }}
          style={{
            marginTop: "10px",
            marginBottom: "20px",
          }}
        >
          {(() => {
            switch (activeItem) {
              case 0:
                return (
                  <Row justify="start" style={{ height: "auto" }}>
                    <Col
                      span="auto"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "10px",
                        borderRadius: "25px",
                        background: "white",
                        border: "1px solid #eeeeee",
                        overflow: "hidden",
                      }}
                    >
                      <Row
                        style={{
                          width: "300px",
                          padding: "10px",
                          // height: "30px",
                        }}
                      >
                        <Col span={24}>
                          <h5
                            style={{
                              padding: "0px",
                              margin: "0px",
                              fontWeight: "600",
                              textAlign: "start",
                            }}
                          >
                            Tìm địa điểm
                          </h5>
                        </Col>

                        <Select
                          style={{ width: "100%", textAlign: "start" }}
                          // loading
                          options={options}
                          onChange={handleChange}
                          bordered={false}
                        />
                      </Row>
                    </Col>
                  </Row>
                );
              case 1:
                return <></>;
              case 2:
                return <></>;
              case 3:
                return (
                  <Row justify="end" style={{ height: "auto" }}>
                    <Col
                      span="auto"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "10px",
                        borderRadius: "25px",
                        background: "white",
                        border: "1px solid #eeeeee",
                        overflow: "hidden",
                      }}
                    >
                      <Row
                        style={{
                          width: "300px",
                          padding: "10px",
                          // height: "30px",
                        }}
                      >
                        <Col span={12}>
                          <Row>
                            <Col span={24}>
                              <h5
                                style={{
                                  padding: "0px",
                                  margin: "0px",
                                  fontWeight: "600",
                                }}
                              >
                                Số khách
                              </h5>
                            </Col>

                            <Col span={24}>
                              <p
                                className={styles.price}
                                style={{ marginBottom: "0px" }}
                              >
                                {guest}
                              </p>
                            </Col>
                          </Row>
                        </Col>

                        <Col
                          span={12}
                          style={{
                            display: "flex",
                            justifyContent: "end",
                          }}
                        >
                          <Space>
                            <Button
                              shape="circle"
                              icon={<MinusOutlined />}
                              onClick={handleMinus}
                            />
                            <Button
                              shape="circle"
                              icon={<PlusOutlined />}
                              onClick={handlePlus}
                            />
                          </Space>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                );
              default:
                return null;
            }
          })()}
        </Col>
      </Row>
    </Col>
  );
};

export default SearchDetail;
