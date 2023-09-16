import { useEffect, useState } from "react";
import styles from "./detail.module.css";
import { useParams } from "react-router-dom";
import { getRoomByIdAction } from "../../Redux/reducers/roomManagementReducer";
import { AppDispatch, RootState } from "../../Redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import {
  Col,
  Row,
  Space,
  Divider,
  Avatar,
  Progress,
  Button,
  Skeleton,
  Rate,
  message,
  Popover,
} from "antd";
import {
  Comment,
  CommentsRoom,
  addCommentAction,
  getCommentAction,
  getCommentByRoomIdAction,
} from "../../Redux/reducers/commentManagementReducer";
import { getLocationByIdAction } from "../../Redux/reducers/locationManagementReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpFromBracket,
  faCircle,
  faHeart,
  faMedal,
} from "@fortawesome/free-solid-svg-icons";
import {
  setEndDay,
  setModeDetail,
  setModeProfile,
  setStartDay,
  setTitleBooking,
} from "../../Redux/reducers/uiManagementReducer";
import React from "react";
import {
  FlagFilled,
  MinusOutlined,
  PlusOutlined,
  StarFilled,
} from "@ant-design/icons";
import DatePicker from "../../Components/DatePicker/DatePicker";
import { useMediaQuery } from "react-responsive";
import {
  capitalizeFirstLetter,
  convertDateFormat,
  convertDateFormatStandard,
  convertNameToChar,
  countComment,
  formatDate,
  formatText,
  totalFee,
  totalPrice,
  totalPriceAndFee,
} from "../../Global/Method";
import TextArea from "antd/es/input/TextArea";
import { utilityItems } from "../../Global/Variable";
import {
  RoomBooked,
  addRoomBookedAction,
} from "../../Redux/reducers/roomBookedManagementReducer";
type Props = {};

const Detail: React.FC<Props> = () => {
  const [isValid, setIsValid] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [warning, setWarning] = useState("");
  const [inforCalendarStart, setInforCalendarStart] = useState("Ngày nhận");
  const [inforCalendarEnd, setInforCalendarEnd] = useState("Ngày trả");
  const [inforCalendar, setInforCalendar] = useState("Thêm ngày trả");
  const [isCommenting, setIsCommneting] = useState(false);

  const [valueRate, setValueRate] = useState(0);
  const [guest, setGuest] = useState(1);
  const param = useParams();
  const dispatch: AppDispatch = useDispatch();
  const [clicked, setClicked] = useState(false);

  const { room, isLoading } = useSelector(
    (state: RootState) => state.roomManagementReducer
  );
  const { user } = useSelector(
    (state: RootState) => state.userManagementReducer
  );

  const { commentsRoom, isLoadingComment } = useSelector(
    (state: RootState) => state.commentManagementReducer
  );
  const { location, isLoadingLocation } = useSelector(
    (state: RootState) => state.locationManagementReducer
  );
  const getRoomByIdApi = () => {
    const id: string = param.id ? param.id : "";
    const action = getRoomByIdAction(parseInt(id));
    dispatch(action);
  };
  const getCommentByRoomIdApi = () => {
    const id: string = param.id ? param.id : "";
    const action = getCommentByRoomIdAction(parseInt(id));
    dispatch(action);
  };
  const getLocationByIdApi = () => {
    if (room) {
      const idLocation = room?.maViTri;
      const action = getLocationByIdAction(idLocation);
      dispatch(action);
    }
  };

  useEffect(() => {
    getLocationByIdApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room]);

  useEffect(() => {
    getRoomByIdApi();
    getCommentByRoomIdApi();
    getLocationByIdApi();
    dispatch(setModeDetail(true));
    dispatch(setModeProfile(false));
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param.id]);

  const renderUtilityItems = () => {
    const renderedItems: React.JSX.Element[] = [];

    for (let i = 0; i < 1; i++) {
      utilityItems.forEach((item, index) => {
        const key = i * utilityItems.length + index;
        const utilityProperty = item.utilityProperty;

        const isUtilityAvailable =
          room &&
          (room as any)[utilityProperty] &&
          (room as any)[utilityProperty] === true;

        const className = isUtilityAvailable ? styles.name : styles.nameThrough;

        renderedItems.push(
          <Col
            xs={{ span: 12 }}
            sm={{ span: 6 }}
            md={{ span: 6 }}
            lg={{ span: 6 }}
            xl={{ span: 12 }}
            xxl={{ span: 12 }}
            key={key}
            className={styles.colUtilityItems}
          >
            <div>
              <img
                src={item.icon}
                className={styles.customIcon}
                alt="Custom Icon"
              />
            </div>
            <div>
              <p className={className}>{item.name}</p>
            </div>
          </Col>
        );
      });
    }

    return renderedItems;
  };

  const renderComment = (comment: CommentsRoom) => (
    <Col span={12}>
      <Row>
        <Col flex="60px">
          {comment.avatar !== "" ? (
            <img
              src={comment.avatar}
              className={styles.imgUser}
              alt="img user"
            />
          ) : (
            <Avatar className={styles.imgUserNoneImg}>
              {comment ? convertNameToChar(comment.tenNguoiBinhLuan) : ""}
            </Avatar>
          )}
        </Col>

        <Col span={20}>
          <Row>
            <Col span={24}>
              <p className={styles.nameUser}>{comment.tenNguoiBinhLuan}</p>
            </Col>

            <Col span={24}>
              <p className={styles.dateReview}>
                {formatDate(comment.ngayBinhLuan)}
              </p>
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <p className={styles.review}>{comment.noiDung}</p>
        </Col>
      </Row>
    </Col>
  );

  const renderedComments = commentsRoom?.map((comment, index) => (
    <React.Fragment key={index}>{renderComment(comment)}</React.Fragment>
  ));

  const containerClassNames = {
    largeScreen: styles.container2,
    smallScreen: styles.container1,
  };
  const isLargeScreen = useMediaQuery({ query: "(min-width: 1200px)" });
  const containerClassName = isLargeScreen
    ? containerClassNames.largeScreen
    : containerClassNames.smallScreen;

  const { titleBooking, startDay, endDay, isSignIn, daysBetweenDates } =
    useSelector((state: RootState) => state.uiManagementReducer);

  useEffect(() => {
    getRoomByIdApi();
    getCommentByRoomIdApi();
    getLocationByIdApi();
    dispatch(setModeDetail(true));
    dispatch(setModeProfile(false));
    window.scrollTo(0, 0);
    setInputValue("");
    setValueRate(0);
    setInforCalendarStart("Thêm ngày");
    setInforCalendarEnd("Thêm ngày");
    setInforCalendar("Thêm ngày trả");
    setGuest(1);
    dispatch(setEndDay(""));
    dispatch(setStartDay(""));
    dispatch(getCommentByRoomIdApi);
    if (
      startDay === "null" ||
      endDay === "null" ||
      startDay === "" ||
      endDay === ""
    ) {
      dispatch(setTitleBooking(`Chọn ngày nhận phòng`));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      startDay !== "null" &&
      startDay !== "" &&
      endDay !== "null" &&
      endDay !== ""
    ) {
      setInforCalendarStart(`${convertDateFormat(startDay)}`);
      setInforCalendarEnd(`${convertDateFormat(endDay)}`);

      setInforCalendar(
        `${convertDateFormat(startDay)} - ${convertDateFormat(endDay)}`
      );
    } else if (startDay !== "null" && endDay === "null") {
      setInforCalendarStart(`${convertDateFormat(startDay)}`);
      setInforCalendarEnd("Thêm ngày");
      setInforCalendar(`${convertDateFormat(startDay)} - Ngày trả`);
    } else if (startDay !== "null" && endDay !== "null") {
      setInforCalendarEnd("Thêm ngày");
      setInforCalendarEnd("Thêm ngày");
      setInforCalendar(`Ngày nhận - Ngày trả`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDay, endDay]);

  const renderCommentButton = () => {
    return (
      <Button
        type="text"
        className={styles.buttonFunction}
        onClick={() => setIsCommneting(true)}
      >
        Chia sẻ trải nghiệm
      </Button>
    );
  };

  const renderCancelCommentButton = () => {
    return (
      <Button
        type="text"
        className={styles.buttonFunction}
        onClick={() => setIsCommneting(false)}
      >
        Huỷ
      </Button>
    );
  };

  const desc = ["Tệ", "Không tốt", "Bình thường", "Tốt", "Tuyệt vời"];

  const renderErrorMessage = (errorMessage: string) => {
    return (
      <Col span={24} className={styles.error}>
        {errorMessage}
      </Col>
    );
  };

  if (isLoading || isLoadingComment || isLoadingLocation) {
    return (
      <Row justify="center" style={{ marginBottom: "500px" }}>
        <Col
          xs={{ span: 22 }}
          sm={{ span: 22 }}
          md={{ span: 22 }}
          lg={{ span: 16 }}
          xl={{ span: 16 }}
          className={containerClassName}
        >
          <Skeleton active />
        </Col>
      </Row>
    );
  }

  const validateInput = (value: string) => {
    return value.trim().length > 0;
  };

  const handleSaveComment = () => {
    const isValidInput = validateInput(inputValue);

    if (!isValidInput) {
      setIsValid(false);
      return;
    }

    const currentDate = new Date().toISOString().slice(0, 10); // Get current date in the format "YYYY-MM-DD"

    const newComment: Comment = {
      maPhong: room?.id ?? 0,
      maNguoiBinhLuan: user?.id ?? 0,
      ngayBinhLuan: currentDate,
      noiDung: inputValue,
      saoBinhLuan: valueRate ?? 5,
      id: 0,
    };

    dispatch(getCommentAction());
    const action = addCommentAction(newComment);
    dispatch(action);
    dispatch(getCommentByRoomIdAction(room?.id ?? 0));
    setInputValue("");
    setValueRate(0);
    setIsCommneting(false);
  };

  const handlePlus = () => {
    setGuest(guest + 1);
  };

  const handleMinus = () => {
    if (guest > 1) {
      setGuest(guest - 1);
    }
  };

  const handleClickChange = (open: boolean) => {
    if (
      convertDateFormatStandard(startDay) !== "NaN-NaN-NaN" ||
      convertDateFormatStandard(endDay) !== "NaN-NaN-NaN"
    ) {
    } else {
      setClicked(open);
    }
  };

  const handleBooking = () => {
    const ngayDen = convertDateFormatStandard(startDay);
    const ngayDi = convertDateFormatStandard(endDay);
    if (ngayDen !== "NaN-NaN-NaN" || ngayDi !== "NaN-NaN-NaN") {
      const newRoomBooking: RoomBooked = {
        maPhong: room?.id ?? 0,
        ngayDen: ngayDen,
        ngayDi: ngayDi,
        soLuongKhach: guest,
        maNguoiDung: user?.id ?? 0,
        id: 0,
      };
      setWarning("");
      const action = addRoomBookedAction(newRoomBooking);
      dispatch(action);
      setInputValue("");
      setValueRate(0);
      setInforCalendarStart("Thêm ngày");
      setInforCalendarEnd("Thêm ngày");
      setInforCalendar("Thêm ngày trả");
      setGuest(1);
      dispatch(setEndDay(""));
      dispatch(setStartDay(""));
    } else {
      message.warning("Vui lòng chọn đủ ngày nhận và trả phòng!");
    }
  };

  return (
    <Row className={styles.container} justify={"center"}>
      <Col
        xs={{ span: 22 }}
        sm={{ span: 22 }}
        md={{ span: 22 }}
        lg={{ span: 16 }}
        xl={{ span: 16 }}
        className={containerClassName}
      >
        <Row>
          <Col span={24}>
            <Row>
              <Col span={24}>
                <h2 className={styles.nameRoom}>
                  {formatText(room?.tenPhong ?? "")}
                </h2>
              </Col>

              <Col span={24} style={{ marginBottom: "10px" }}>
                <Row justify="space-between">
                  <Col
                    xs={{ span: 0 }}
                    sm={{ span: 0 }}
                    md={{ span: 24 }}
                    lg={{ span: 24 }}
                    xl={{ span: 16 }}
                  >
                    <Space>
                      <p className={styles.underLine}>
                        {countComment(commentsRoom)} bài đánh giá
                      </p>
                      <p>.</p>
                      <p>
                        <FontAwesomeIcon icon={faMedal} />
                      </p>

                      <p className={styles.superHost}> Chủ nhà siêu cấp</p>
                      <p>.</p>
                      <p className={styles.underLine}>{location?.tenViTri}, </p>

                      <p className={styles.underLine}>
                        {location?.tinhThanh},{" "}
                      </p>

                      <p className={styles.underLine}>{location?.quocGia}</p>
                    </Space>
                  </Col>
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 0 }}
                    lg={{ span: 0 }}
                    xl={{ span: 0 }}
                  >
                    <Space>
                      <p className={styles.underLine}>
                        {countComment(commentsRoom)} bài đánh giá
                      </p>
                      <p>.</p>
                      <p className={styles.underLine}>{location?.tenViTri}, </p>

                      <p className={styles.underLine}>
                        {location?.tinhThanh},{" "}
                      </p>

                      <p className={styles.underLine}>{location?.quocGia}</p>
                    </Space>
                  </Col>
                  <Col
                    xs={{ span: 0 }}
                    sm={{ span: 0 }}
                    md={{ span: 0 }}
                    lg={{ span: 0 }}
                    xl={{ span: 8 }}
                  >
                    <Row justify="end">
                      <Col flex="120px">
                        <p
                          className={styles.underLine}
                          style={{ textAlign: "end" }}
                        >
                          <FontAwesomeIcon icon={faArrowUpFromBracket} /> Chia
                          sẻ
                        </p>
                      </Col>

                      <Col flex="65px">
                        <p
                          className={styles.underLine}
                          style={{ textAlign: "end" }}
                        >
                          <FontAwesomeIcon icon={faHeart} /> Lưu
                        </p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>

              <Col span={24} className={styles.containerImageRoom}>
                <img
                  src={room?.hinhAnh}
                  className={styles.imageRoom}
                  alt="room img"
                />
              </Col>
            </Row>
          </Col>

          <Col span={24} style={{ marginTop: "50px", position: "relative" }}>
            <Row>
              <Col span={24}>
                <Row justify="space-between">
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 24 }}
                    lg={{ span: 24 }}
                    xl={{ span: 13 }}
                    xxl={{ span: 15 }}
                  >
                    <Row>
                      <Col span={24}>
                        <h3 className={styles.title}>
                          Toàn bộ biệt thự - Số lượng phòng
                        </h3>
                      </Col>

                      <Col
                        xs={{ span: 0 }}
                        sm={{ span: 24 }}
                        md={{ span: 24 }}
                        lg={{ span: 24 }}
                        xl={{ span: 24 }}
                        xxl={{ span: 24 }}
                      >
                        <Space>
                          <p className={styles.quantity}>{room?.khach} Khách</p>
                          <p className={styles.dot}>
                            <FontAwesomeIcon icon={faCircle} />
                          </p>
                          <p className={styles.quantity}>
                            {room?.phongNgu} Phòng ngủ
                          </p>
                          <p className={styles.dot}>
                            <FontAwesomeIcon icon={faCircle} />
                          </p>

                          <p className={styles.quantity}>
                            {room?.giuong} Giường ngủ
                          </p>
                          <p className={styles.dot}>
                            <FontAwesomeIcon icon={faCircle} />
                          </p>

                          <p className={styles.quantity}>
                            {room?.phongTam} Phòng tắm
                          </p>
                        </Space>
                      </Col>
                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 0 }}
                        md={{ span: 0 }}
                        lg={{ span: 0 }}
                        xl={{ span: 0 }}
                        xxl={{ span: 0 }}
                      >
                        <Space>
                          <p className={styles.quantity}>
                            {room?.giuong} Giường ngủ
                          </p>

                          <p className={styles.quantity}>
                            {room?.phongTam} Phòng tắm
                          </p>
                        </Space>
                      </Col>

                      <Divider className={styles.dividerGray} />
                      <Col span={24}>
                        <h3 className={styles.title}> Mô tả </h3>
                      </Col>
                      <Col span={24}>
                        <p className={styles.describeRoom}>{room?.moTa}</p>
                      </Col>
                      <Divider className={styles.dividerGray} />

                      <Col span={24}>
                        <h3 className={styles.title}>
                          Nơi này có những gì cho bạn
                        </h3>
                      </Col>

                      <Col span={24}>
                        <Row>{renderUtilityItems()}</Row>
                      </Col>

                      <Divider className={styles.dividerGray} />

                      <Col span={24}>
                        <h3 className={styles.titleBookingCalendar}>
                          {capitalizeFirstLetter(titleBooking)}
                        </h3>
                      </Col>

                      <Col span={24}>
                        <p className={styles.subTitleReview}>{inforCalendar}</p>
                      </Col>

                      <Col span={24} style={{ overflow: "hidden" }}>
                        <DatePicker />
                      </Col>

                      <Divider className={styles.dividerGray} />
                    </Row>
                  </Col>

                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 24 }}
                    lg={{ span: 24 }}
                    xl={{ span: 9 }}
                    xxl={{ span: 8 }}
                    style={{ position: "relative" }}
                  >
                    <Row style={{ position: "sticky", top: 100 }}>
                      <Col span={24} className={styles.booking}>
                        <Row>
                          <Col span={24}>
                            <Row justify="space-between">
                              <Col span={12}>
                                <h3
                                  className={styles.bookingPrice}
                                  style={{ display: "inline-block" }}
                                >
                                  $ {room?.giaTien}
                                </h3>
                                <p
                                  className={styles.bookingNight}
                                  style={{
                                    display: "inline-block",
                                  }}
                                >
                                  / đêm
                                </p>
                              </Col>
                              <Col span={12}>
                                <p className={styles.bookingRate}>
                                  <StarFilled /> {countComment(commentsRoom)}{" "}
                                  đánh giá
                                </p>
                              </Col>
                            </Row>
                          </Col>

                          <Col span={24}>
                            <Row
                              style={{
                                borderRadius: "10px",
                              }}
                            >
                              <Col span={12}>
                                <Row className={styles.rowNhanPhong}>
                                  <Col span={24}>
                                    <h5>Nhận phòng</h5>
                                  </Col>
                                  <Col span={24}>
                                    <p
                                      className={styles.price}
                                      style={{ marginBottom: "0px" }}
                                    >
                                      {inforCalendarStart}
                                    </p>
                                  </Col>
                                </Row>
                              </Col>
                              <Col span={12}>
                                <Row className={styles.rowTraPhong}>
                                  <Col span={24}>
                                    <h5>Trả phòng</h5>
                                  </Col>
                                  <Col span={24}>
                                    <p
                                      className={styles.price}
                                      style={{ marginBottom: "0px" }}
                                    >
                                      {inforCalendarEnd}
                                    </p>
                                  </Col>
                                </Row>
                              </Col>

                              <Col span={24}>
                                <Row
                                  style={{
                                    padding: "10px",
                                    border: "1px solid #CFCFCF",
                                    borderBottomLeftRadius: "10px",
                                    borderBottomRightRadius: "10px",
                                  }}
                                >
                                  <Col span={12}>
                                    <Row>
                                      <Col span={24}>
                                        <h5
                                          style={{
                                            padding: "0px",
                                            margin: "0px",
                                            fontWeight: "500",
                                          }}
                                        >
                                          Khách
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
                          </Col>

                          {!isSignIn ? (
                            <>
                              <Col span={24}>
                                <p
                                  style={{
                                    fontSize: "13px",
                                    lineHeight: "18px",
                                    color: "#D90766",
                                    fontWeight: "400",
                                    marginBottom: "5px",
                                    marginTop: "15px",
                                    textAlign: "center",
                                  }}
                                >
                                  Vui lòng đăng nhập trước khi đặt phòng
                                </p>
                              </Col>
                            </>
                          ) : (
                            <>
                              <Col span={24}>
                                <Popover
                                  placement="bottom"
                                  content={
                                    <p
                                      style={{
                                        fontSize: "13px",
                                        lineHeight: "18px",
                                        color: "#D90766",
                                        fontWeight: "400",
                                        marginBottom: "5px",
                                        marginTop: "15px",
                                        textAlign: "center",
                                      }}
                                    >
                                      Vui lòng chọn đủ ngày nhận và trả phòng!
                                    </p>
                                  }
                                  trigger="click"
                                  open={clicked}
                                  onOpenChange={handleClickChange}
                                >
                                  <Button
                                    onClick={() => {
                                      handleBooking();
                                    }}
                                    className={styles.bookingButton}
                                  >
                                    Đặt phòng
                                  </Button>
                                </Popover>
                              </Col>

                              <Col span={24}>
                                <p
                                  style={{
                                    fontSize: "13px",
                                    lineHeight: "18px",
                                    color: "#D90766",
                                    fontWeight: "400",
                                    marginBottom: "5px",
                                    marginTop: "15px",
                                    textAlign: "center",
                                  }}
                                >
                                  {warning}
                                </p>
                              </Col>
                            </>
                          )}

                          <Col span={24}>
                            <p
                              style={{
                                fontSize: "13px",
                                lineHeight: "18px",
                                color: "#717171",
                                fontWeight: "300",
                                marginBottom: "25px",
                                marginTop: "5px",
                                textAlign: "center",
                              }}
                            >
                              Bạn vẫn chưa bị trừ tiền
                            </p>
                          </Col>

                          <Col span={12}>
                            <p
                              className={styles.price}
                              style={{
                                textDecoration: "underline",
                              }}
                            >
                              ${room?.giaTien} x {daysBetweenDates} đêm
                            </p>
                          </Col>
                          <Col span={12}>
                            <p
                              className={styles.price}
                              style={{
                                textAlign: "end",
                              }}
                            >
                              ${" "}
                              {totalPrice(daysBetweenDates, room?.giaTien || 0)}
                            </p>
                          </Col>
                          <Col span={12}>
                            <p
                              className={styles.price}
                              style={{
                                textDecoration: "underline",
                              }}
                            >
                              Phí vệ sinh
                            </p>
                          </Col>
                          <Col span={12}>
                            <p
                              className={styles.price}
                              style={{
                                textAlign: "end",
                              }}
                            >
                              ${" "}
                              {totalFee(
                                totalPrice(daysBetweenDates, room?.giaTien || 0)
                              )}
                            </p>
                          </Col>
                          <Col span={24}>
                            <Divider style={{ height: "2px" }} />
                          </Col>
                          <Col span={12}>Tổng trước thuế</Col>
                          <Col span={12}>
                            <p
                              style={{
                                textAlign: "end",
                              }}
                            >
                              ${" "}
                              {totalPriceAndFee(
                                totalPrice(
                                  daysBetweenDates,
                                  room?.giaTien || 0
                                ),
                                totalFee(
                                  totalPrice(
                                    daysBetweenDates,
                                    room?.giaTien || 0
                                  )
                                )
                              )}
                              {}
                            </p>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={24}>
                        <p
                          style={{
                            textAlign: "center",
                            textDecoration: "underline",
                            color: "#717171",
                            marginBottom: "50px",
                          }}
                        >
                          <FlagFilled /> Báo cáo nhà/phòng cho thuê này
                        </p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>

              <Col span={24}>
                <p className={styles.titleReview}>
                  <StarFilled /> {countComment(commentsRoom)} đánh giá
                </p>
              </Col>
              <Col span={24}>
                <p className={styles.subTitleReview}>
                  Xếp hạng trung bình sẽ được hiển thị sau khi có 3 đánh giá
                </p>
              </Col>

              <Col span={24}>
                <p
                  className={styles.titleReview}
                  style={{ marginBottom: "15px" }}
                >
                  Mức độ hài lòng về
                </p>
              </Col>

              <Col span={24} style={{ marginBottom: "35px" }}>
                <Row gutter={[48, 16]} className={styles.subReview}>
                  {[
                    { title: "Vị trí", percent: 98 },
                    { title: "Giá cả", percent: 96 },
                    { title: "An ninh", percent: 92 },
                    { title: "Tiếp đón", percent: 97 },
                    { title: "Sạch sẽ", percent: 88 },
                    { title: "Tiện nghi", percent: 84 },
                  ].map((item, index) => (
                    <React.Fragment key={index}>
                      <Col
                        xs={{ span: 8 }}
                        sm={{ span: 8 }}
                        md={{ span: 8 }}
                        lg={{ span: 4 }}
                        xl={{ span: 3 }}
                      >
                        <h4>{item.title}</h4>
                      </Col>
                      <Col
                        xs={{ span: 16 }}
                        sm={{ span: 16 }}
                        md={{ span: 16 }}
                        lg={{ span: 8 }}
                        xl={{ span: 9 }}
                      >
                        <Progress
                          showInfo={false}
                          size="small"
                          status="active"
                          percent={item.percent}
                          strokeColor={{ "0": "#E61E4E", "5": "#D80566" }}
                        />
                      </Col>
                    </React.Fragment>
                  ))}
                </Row>
              </Col>

              {countComment(commentsRoom) > 0 ? (
                <>
                  <Col span={24}>
                    <p
                      className={styles.titleReview}
                      style={{ marginBottom: "15px" }}
                    >
                      Bình luận
                    </p>
                  </Col>
                  <Col span={24}>
                    <Row>{renderedComments}</Row>
                  </Col>
                </>
              ) : (
                <></>
              )}

              {!isSignIn ? (
                <>
                  <Col span={24}>
                    <p
                      className={styles.subTitleReview}
                      style={{ marginBottom: "15px" }}
                    >
                      Hãy đăng nhập để sử dụng chức năng bình luận
                    </p>
                  </Col>
                </>
              ) : (
                <>
                  <Col span={24}>
                    <Row>
                      <Col span={14} className={styles.titleReview}>
                        Viết bài đánh giá của bạn
                      </Col>
                      <Col span={10}>
                        {!isCommenting
                          ? renderCommentButton()
                          : renderCancelCommentButton()}
                      </Col>

                      {!isCommenting ? (
                        <></>
                      ) : (
                        <>
                          <Col span={24} className={styles.input}>
                            <Row>
                              <Col span={24}>
                                <Col span={24} className={styles.inputName}>
                                  Đánh giá
                                </Col>
                                <TextArea
                                  rows={4}
                                  onChange={(e) => {
                                    const inputValue = e.target.value;
                                    const isValid = validateInput(inputValue);
                                    // Nếu giá trị nhập vào hợp lệ thì setIsValid(true), ngược lại setIsValid(false)
                                    setIsValid(isValid);
                                    setInputValue(inputValue);
                                  }}
                                  placeholder="Mô tả cụ thể trải nghiệm của bạn về địa điểm này"
                                  bordered={false}
                                  style={{
                                    textAlign: "left",
                                    paddingLeft: "0px",
                                  }}
                                  autoSize={{ minRows: 3, maxRows: 15 }}
                                />
                              </Col>

                              <Col span={12}>
                                <span>
                                  <Rate
                                    tooltips={desc}
                                    onChange={setValueRate}
                                    value={valueRate}
                                    style={{ color: "#D80565" }}
                                  />
                                  {valueRate ? (
                                    <span className="ant-rate-text">
                                      {desc[valueRate - 1]}
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </span>
                              </Col>
                            </Row>
                          </Col>
                          {isValid ? (
                            <></>
                          ) : (
                            <>
                              {renderErrorMessage(
                                "Bài đánh giá không được để trống"
                              )}
                            </>
                          )}
                          <Col span={3}>
                            <Button
                              className={styles.buttonSave}
                              onClick={handleSaveComment}
                            >
                              Lưu
                            </Button>
                          </Col>
                        </>
                      )}
                    </Row>
                  </Col>
                </>
              )}

              <Divider className={styles.dividerGray} />
            </Row>
          </Col>

          <Col span={24}>
            <Row>
              <Col span={24}>
                <h2 className={styles.nameRoom}>Nơi bạn sẽ đến</h2>
              </Col>

              <Col span={24} style={{ marginBottom: "10px" }}>
                <Row justify="space-between">
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 24 }}
                    lg={{ span: 16 }}
                    xl={{ span: 16 }}
                  >
                    <Space>
                      <p className={styles.superHost}>{location?.tenViTri}, </p>
                      <p className={styles.superHost}>{location?.tinhThanh},</p>
                      <p className={styles.superHost}>{location?.quocGia}</p>
                    </Space>
                  </Col>
                </Row>
              </Col>

              <Col span={24} className={styles.containerImageMap}>
                <img
                  src="../../../assets/image/map/map.png"
                  className={styles.imageMap}
                  alt="room img"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Detail;
