import React, { useEffect, useMemo, useCallback, useState } from "react";
import { Checkbox, Row, Col, Select } from "antd";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import { Formik, Field, ErrorMessage, Form, FormikHelpers } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import {
  Room,
  RoomManagementState,
} from "../../Redux/reducers/roomManagementReducer";
import {
  LocationManagementState,
  getLocationAction,
} from "../../Redux/reducers/locationManagementReducer";
import { RootState } from "../../Redux/configStore";
import styles from "./formRoomFilter.module.css";
import { filterRooms } from "../../Global/Method";

type Props = {};

const defaultCheckedList = [""];

const FormRoomFilter: React.FC<Props> = () => {
  const [checkedList, setCheckedList] =
    useState<CheckboxValueType[]>(defaultCheckedList);

  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();

  const { room }: RoomManagementState = useSelector(
    (state: RootState) => state.roomManagementReducer
  );

  const { locations }: LocationManagementState = useSelector(
    (state: RootState) => state.locationManagementReducer
  );

  const options = locations?.map((item) => ({
    value: `${item.id}`,
    label: `${item.tenViTri} - ${item.tinhThanh} - ${item.quocGia}`,
  }));

  const initialValues: Room = useMemo(
    () =>
      room || {
        id: 0,
        tenPhong: "",
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
      },
    [room]
  );

  // const utilitiesValues: string[] = [];

  const getLocations = () => {
    const action = getLocationAction();
    dispatch(action);
  };

  useEffect(() => {
    getLocations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { rooms } = useSelector(
    (state: RootState) => state.roomManagementReducer
  );

  const handleSubmit = useCallback(
    (values: Room, { resetForm }: FormikHelpers<Room>) => {
      console.log("handleSubmit ", values);

      if (rooms !== undefined) {
        const filtedRooms = filterRooms(rooms, values);
        console.log(filtedRooms);
      }

      resetForm();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch]
  );

  return (
    <div className={styles.container}>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <p className={styles.titleForm}>Bộ lọc</p>

            <div className={styles.inputLabel}>
              <h4>Tên phòng</h4>
            </div>
            <Field
              type="text"
              name="tenPhong"
              placeholder="Tên phòng"
              className={styles.inputForm}
            />
            <ErrorMessage
              name="tenPhong"
              component="p"
              className={styles.errorsText}
            />

            <div className={styles.inputLabel}>
              <h4>Địa điểm</h4>
            </div>
            <Select
              value={room?.maViTri?.toString()}
              style={{ width: "100%" }}
              // loading
              options={options}
              onChange={(value) => {
                console.log("value change ", value);
                setFieldValue("maViTri", parseInt(value));
              }}
            />

            {/* <Row gutter={[8, 8]}>
              <Col span={12}>
                <div className={styles.inputLabel}>
                  <h4>Số khách</h4>
                </div>
                <Field
                  type="text"
                  name="khach"
                  placeholder="Tên phòng"
                  className={styles.inputForm}
                />
                <ErrorMessage
                  name="khach"
                  component="p"
                  className={styles.errorsText}
                />
              </Col>

              <Col span={12}>
                <div className={styles.inputLabel}>
                  <h4>Giá phòng</h4>
                </div>
                <Field
                  type="text"
                  name="giaTien"
                  placeholder="Đơn vị: $/Đêm"
                  className={styles.inputForm}
                />
                <ErrorMessage
                  name="giaTien"
                  component="p"
                  className={styles.errorsText}
                />
              </Col>

              <Col span={8}>
                <div className={styles.inputLabel}>
                  <h4>Phòng ngủ</h4>
                </div>
                <Field
                  type="text"
                  name="phongNgu"
                  placeholder="Phòng ngủ"
                  className={styles.inputForm}
                />
                <ErrorMessage
                  name="phongNgu"
                  component="p"
                  className={styles.errorsText}
                />
              </Col>
              <Col span={8}>
                <div className={styles.inputLabel}>
                  <h4>Giường</h4>
                </div>
                <Field
                  type="text"
                  name="giuong"
                  placeholder="Giường"
                  className={styles.inputForm}
                />
                <ErrorMessage
                  name="giuong"
                  component="p"
                  className={styles.errorsText}
                />
              </Col>
              <Col span={8}>
                <div className={styles.inputLabel}>
                  <h4>Phòng tắm</h4>
                </div>
                <Field
                  type="text"
                  name="phongTam"
                  placeholder="Phòng tắm"
                  className={styles.inputForm}
                />
                <ErrorMessage
                  name="phongTam"
                  component="p"
                  className={styles.errorsText}
                />
              </Col>
            </Row> */}

            <div className={styles.inputLabel}>
              <h4>Tiện ích</h4>
            </div>
            <div className={styles.groupCheckBox}>
              <Checkbox.Group
                style={{ width: "100%" }}
                onChange={(list: CheckboxValueType[]) => {
                  setCheckedList(list);
                  console.log("list check ", list);

                  const utilities = list;

                  // Duyệt qua từng tiện ích
                  utilities.forEach((utility) => {
                    const utilityString = utility as string;

                    // Kiểm tra xem tiện ích có trong danh sách được chọn không
                    const isSelected = list.includes(utility);

                    // Cập nhật giá trị tiện ích bằng true hoặc false
                    setFieldValue(utilityString, isSelected);
                  });
                }}
                value={checkedList}
              >
                <Row>
                  <Col span={6}>
                    <Checkbox value="mayGiat">Máy giặt</Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox value="banLa">Bàn là</Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox value="tivi">Tivi</Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox value="dieuHoa">Điều hoà</Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox value="wifi">Wifi</Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox value="bep">Bếp</Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox value="doXe">Đỗ xe</Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox value="hoBoi">Hồ bơi</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </div>

            <>
              <button type="submit" className={styles.buttonSubmitFilter}>
                Tìm phòng
              </button>
            </>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormRoomFilter;
