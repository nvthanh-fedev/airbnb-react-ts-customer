import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Breadcrumb,
  Button,
  Col,
  Divider,
  Input,
  Row,
  Skeleton,
  message,
} from "antd";
import { useMediaQuery } from "react-responsive";
import { RootState } from "../../Redux/configStore";
import styles from "./profile.module.css";
import {
  User,
  getListRoomBookedByUserIdAction,
  updateUserAsyncAction,
} from "../../Redux/reducers/userManagementReducer";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { NavLink } from "react-router-dom";
import {
  setIsSignIn,
  setModeDetail,
  setModeProfile,
  setShowDrawer,
} from "../../Redux/reducers/uiManagementReducer";
import { USER_LOGIN, clearStorage } from "../../utils/config";
import { PROFILE_EDIT_MODES } from "../../Global/Variable";

const Profile: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    phone: false,
  });

  const { user, isLoading } = useSelector(
    (state: RootState) => state.userManagementReducer
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getListRoomBookedByUserIdApi = () => {
    if (user?.id !== undefined) {
      const action = getListRoomBookedByUserIdAction(user.id);
      dispatch(action);
    } else {
      console.error("User ID is not available!");
    }
  };

  useEffect(() => {
    // call API
    getListRoomBookedByUserIdApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = (editMode: string) => {
    setIsEditing(() => ({
      name: editMode === "name" ? true : false,
      email: editMode === "email" ? true : false,
      phone: editMode === "phone" ? true : false,
    }));
    setIsValid(true);
  };

  const handleCancel = () => {
    setIsEditing({
      name: false,
      email: false,
      phone: false,
    });
    setIsValid(true);
  };

  const renderEditButton = (field: string) => {
    return (
      <Button
        type="text"
        className={styles.buttonFunction}
        onClick={() => handleEdit(field)}
        style={{ margin: 0, padding: 0, textAlign: "end" }}
      >
        Chỉnh sửa
      </Button>
    );
  };

  const renderCancelButton = (field: string) => {
    return (
      <Button
        type="text"
        className={styles.buttonFunction}
        onClick={() => handleCancel()}
        style={{ margin: 0, padding: 0, textAlign: "end" }}
      >
        Huỷ
      </Button>
    );
  };

  const renderViewRoomBookedButton = () => {
    return (
      <NavLink
        className="nav-link"
        to="/roombooked"
        style={{ margin: 0, padding: 0, textAlign: "end" }}
      >
        <Button
          type="text"
          className={styles.buttonFunction}
          style={{ margin: 0, padding: 0, textAlign: "end" }}
          onClick={() => dispatch(setShowDrawer(false))}
        >
          Xem phòng đã đặt
        </Button>
      </NavLink>
    );
  };

  const handleSignOut = () => {
    dispatch(setIsSignIn(false));
    dispatch(setModeProfile(false));
    dispatch(setShowDrawer(false));
    dispatch(setModeDetail(false));
    clearStorage(USER_LOGIN);
    message.success("Đăng xuất thành công!");
  };

  const renderSignoutButton = () => {
    return (
      <NavLink
        className="nav-link"
        to=""
        style={{ margin: 0, padding: 0, textAlign: "end" }}
      >
        <Button
          onClick={handleSignOut}
          type="text"
          className={styles.buttonFunction}
          style={{
            margin: 0,
            padding: 0,
            textAlign: "end",
            marginBottom: "50px",
          }}
        >
          Đăng xuất
        </Button>
      </NavLink>
    );
  };

  const renderInputField = (
    field: string,
    placeholder: string,
    inputName: string
  ) => {
    let defaultValue;

    if (field === "name") {
      defaultValue = user?.name;
    } else if (field === "email") {
      defaultValue = user?.email;
    } else if (field === "phone") {
      defaultValue = user?.phone;
    }

    const validateInput = (value: string) => {
      if (field === "name") {
        // Kiểm tra rỗng và kiểm tra tên chỉ chứa chữ
        const regex = /^[a-zA-ZÀ-ỹ ]+$/;
        return value.trim().length > 0 && regex.test(value);
      } else if (field === "email") {
        // Kiểm tra rỗng và kiểm tra email hợp lệ
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return value.trim().length > 0 && regex.test(value);
      } else if (field === "phone") {
        // Kiểm tra rỗng và kiểm tra là số
        const regex = /^[0-9]+$/;
        return value.trim().length > 0 && regex.test(value);
      }

      return false;
    };

    return (
      <Col span={24} className={styles.input}>
        <Row>
          <Col span={24} className={styles.inputName}>
            {inputName}
          </Col>
          <Col span={24}>
            <Input
              onChange={(e) => {
                const inputValue = e.target.value;
                const isValid = validateInput(inputValue);
                // Nếu giá trị nhập vào hợp lệ thì setIsValid(true), ngược lại setIsValid(false)
                setIsValid(isValid);
                setInputValue(inputValue);
              }}
              defaultValue={defaultValue}
              placeholder={placeholder}
              bordered={false}
              style={{
                textAlign: "left",
                paddingLeft: "0px",
              }}
            />
          </Col>
        </Row>
      </Col>
    );
  };

  const renderErrorMessage = (errorMessage: string) => {
    return (
      <Col span={24} className={styles.error}>
        {errorMessage}
      </Col>
    );
  };

  const renderSaveButton = (modeSave: string) => {
    let userUpdate: User | undefined;

    if (modeSave === "name" && user) {
      userUpdate = {
        id: user.id,
        name: inputValue,
        email: user.email ?? "",
        phone: user.phone ?? "",
        birthday: user.birthday ?? "",
        gender: user.gender ?? false,
        role: user.role ?? "",
        avatar: user.avatar ?? "",
      };
    }

    if (modeSave === "email" && user) {
      userUpdate = {
        id: user.id,
        name: user.name ?? "",
        email: inputValue,
        phone: user.phone ?? "",
        birthday: user.birthday ?? "",
        gender: user.gender ?? false,
        role: user.role ?? "",
        avatar: user.avatar ?? "",
      };
    }

    if (modeSave === "phone" && user) {
      userUpdate = {
        id: user.id,
        name: user.name ?? "",
        email: user.email ?? "",
        phone: inputValue,
        birthday: user.birthday ?? "",
        gender: user.gender ?? false,
        role: user.role ?? "",
        avatar: user.avatar ?? "",
      };
    }

    const handleSave = async () => {
      console.log("handleSave");

      if (userUpdate) {
        const actionApi = await updateUserAsyncAction(
          userUpdate,
          user?.id ?? 0
        );
        dispatch(actionApi);
        message.success("Cập nhật thành công!");
        handleCancel();
      }
    };

    return (
      <Button className={styles.buttonSave} onClick={handleSave}>
        Lưu
      </Button>
    );
  };

  const { listRoomBookedsByUserId, isLoadingListRoomBookedsByUserId } =
    useSelector((state: RootState) => state.userManagementReducer);

  const countRoombookeds = () => {
    return listRoomBookedsByUserId ? listRoomBookedsByUserId.length : 0;
  };

  const renderCountRoomBooked = () => {
    const cout = countRoombookeds();

    if (cout === 0) {
      return "Bạn chưa đặt bất kỳ phòng nào";
    } else {
      return `${cout} phòng`;
    }
  };

  const renderPersonalInfo = () => {
    return (
      <Col
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={{ span: 24 }}
        lg={{ span: 24 }}
        xl={{ span: 14 }}
        style={{ marginTop: "40px" }}
      >
        <Row>
          <Col span={24}>
            <Row>
              <Col span={20} className={styles.titleInput}>
                Tên pháp lý
              </Col>
              <Col span={4}>
                {!isEditing.name
                  ? renderEditButton(PROFILE_EDIT_MODES.NAME)
                  : renderCancelButton(PROFILE_EDIT_MODES.NAME)}
              </Col>

              <Col span={24}>
                <Row justify="start">
                  <Col span={17} className={styles.describe}>
                    {!isEditing.name ? (
                      <p>{user?.name}</p>
                    ) : (
                      <p>
                        Đây là tên trên giấy tờ thông hành của bạn, có thể là
                        giấy phép hoặc hộ chiếu.
                      </p>
                    )}
                  </Col>
                </Row>
              </Col>

              {!isEditing.name ? (
                <></>
              ) : (
                <>
                  {renderInputField("name", "Họ và tên", "Họ và tên")}
                  {isValid ? (
                    <></>
                  ) : (
                    <> {renderErrorMessage("Bắt buộc phải điền họ và tên")}</>
                  )}
                  <Col span={3}>{renderSaveButton("name")}</Col>
                </>
              )}

              <Col span={24}>
                <Divider
                  style={{ lineHeight: "10px", background: "#dddddd" }}
                />
              </Col>
            </Row>
          </Col>

          <Col span={24}>
            <Row>
              <Col span={20} className={styles.titleInput}>
                Địa chỉ email
              </Col>
              <Col span={4}>
                {!isEditing.email
                  ? renderEditButton(PROFILE_EDIT_MODES.EMAIL)
                  : renderCancelButton(PROFILE_EDIT_MODES.EMAIL)}
              </Col>

              <Col span={24}>
                <Row justify="start">
                  <Col span={17} className={styles.describe}>
                    {!isEditing.email ? (
                      <p>{user?.email}</p>
                    ) : (
                      <p>Sử dụng địa chỉ mà bạn luôn có quyền truy cập.</p>
                    )}
                  </Col>
                </Row>
              </Col>

              {!isEditing.email ? (
                <></>
              ) : (
                <>
                  {renderInputField("email", "Địa chỉ email", "Email")}
                  {isValid ? (
                    <></>
                  ) : (
                    <> {renderErrorMessage("Địa chỉ email không hợp lệ")}</>
                  )}
                  <Col span={3}>{renderSaveButton("email")}</Col>
                </>
              )}

              <Col span={24}>
                <Divider
                  style={{ lineHeight: "10px", background: "#dddddd" }}
                />
              </Col>
            </Row>
          </Col>

          <Col span={24}>
            <Row>
              <Col span={20} className={styles.titleInput}>
                Số điện thoại
              </Col>
              <Col span={4}>
                {!isEditing.phone
                  ? renderEditButton(PROFILE_EDIT_MODES.PHONE)
                  : renderCancelButton(PROFILE_EDIT_MODES.PHONE)}
              </Col>

              <Col span={24}>
                <Row justify="start">
                  <Col span={17} className={styles.describe}>
                    {!isEditing.phone ? (
                      <p>{user?.phone}</p>
                    ) : (
                      <p>
                        Thêm số điện thoại để khách đã xác nhận và Airbnb có thể
                        liên hệ với bạn. Bạn có thể thêm các số điện thoại khác
                        và chọn mục đích sử dụng tương ứng.
                      </p>
                    )}
                  </Col>

                  <Col span={24}>
                    <Divider
                      style={{ lineHeight: "10px", background: "#dddddd" }}
                    />
                  </Col>
                </Row>
              </Col>

              {!isEditing.phone ? (
                <></>
              ) : (
                <>
                  {renderInputField("phone", "Số điện thoại", "Số điện thoại")}
                  {isValid ? (
                    <></>
                  ) : (
                    <> {renderErrorMessage("Số điện thoại không hợp lệ")}</>
                  )}
                  <Col span={3}>{renderSaveButton("phone")}</Col>
                </>
              )}
            </Row>
          </Col>

          <Col span={24} style={{ marginBottom: "50px" }}>
            <Row>
              <Col span={14} className={styles.titleInput}>
                Phòng đã đặt
              </Col>
              <Col span={10}>{renderViewRoomBookedButton()}</Col>
              <Col span={24}>
                <Row justify="start">
                  <Col span={17} className={styles.describe}>
                    <p>{renderCountRoomBooked()}</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>

          <Col span={24}>
            <Row>
              <Col span={14} className={styles.titleInput}></Col>
              <Col span={10}>{renderSignoutButton()}</Col>
            </Row>
          </Col>
        </Row>
      </Col>
    );
  };

  const renderQaItem = (imageSrc: string, question: string, answer: string) => {
    return (
      <Col span={24} className={styles.itemQuestionAndAnswer}>
        <Row justify="space-between">
          <Col
            xs={{ span: 4 }}
            sm={{ span: 4 }}
            md={{ span: 4 }}
            lg={{ span: 4 }}
            xl={{ span: 24 }}
          >
            <img src={imageSrc} alt="imgQaA" className={styles.imgQaA} />
          </Col>

          <Col
            xs={{ span: 19 }}
            sm={{ span: 19 }}
            md={{ span: 19 }}
            lg={{ span: 19 }}
            xl={{ span: 24 }}
          >
            <Row>
              <Col span={24} className={styles.question}>
                <p>{question}</p>
              </Col>
              <Col span={24} className={styles.answer}>
                <p>{answer}</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    );
  };

  const renderQaSection = () => {
    return (
      <Col
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={{ span: 24 }}
        lg={{ span: 24 }}
        xl={{ span: 8 }}
        className={styles.questionAndAnswer}
      >
        {renderQaItem(
          ".../../../assets/image/profile/1.png",
          "Tại sao thông tin của tôi không được hiển thị ở đây?",
          "Chúng tôi đang ẩn một số thông tin tài khoản để bảo vệ danh tính của bạn."
        )}

        <Col span={24}>
          <Divider style={{ lineHeight: "10px", background: "#dddddd" }} />
        </Col>

        {renderQaItem(
          ".../../../assets/image/profile/2.png",
          "Bạn có thể chỉnh sửa những thông tin nào?",
          "Bạn có thể chỉnh sửa thông tin liên hệ và thông tin cá nhân. Nếu sử dụng thông tin này để xác minh danh tính, bạn sẽ cần phải xác minh lần nữa vào lần đặt tiếp theo, hoặc để tiếp tục đón tiếp khách."
        )}

        <Col span={24}>
          <Divider style={{ lineHeight: "10px", background: "#dddddd" }} />
        </Col>
        {renderQaItem(
          ".../../../assets/image/profile/3.png",
          "Thông tin nào được chia sẻ với người khác?",
          "Airbnb chỉ tiết lộ thông tin liên lạc cho Chủ nhà/Người tổ chức và khách sau khi đặt phòng/đặt chỗ được xác nhận."
        )}
      </Col>
    );
  };

  const renderBreadcrumb = () => {
    const breadcrumbItems = [
      { title: "Tài khoản" },
      { title: "Thông tin cá nhân" },
    ];

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

  const containerClassNames = {
    largeScreen: styles.container2,
    smallScreen: styles.container1,
  };
  const isLargeScreen = useMediaQuery({ query: "(min-width: 1200px)" });
  const containerClassName = isLargeScreen
    ? containerClassNames.largeScreen
    : containerClassNames.smallScreen;

  if (isLoading || isLoadingListRoomBookedsByUserId) {
    return (
      <Row justify="center">
        <Col
          xs={{ span: 22 }}
          sm={{ span: 22 }}
          md={{ span: 20 }}
          lg={{ span: 16 }}
          xl={{ span: 16 }}
          className={containerClassName}
        >
          <Skeleton active />
        </Col>
      </Row>
    );
  }

  return (
    <Row justify="center">
      <Col
        xs={{ span: 23 }}
        sm={{ span: 23 }}
        md={{ span: 23 }}
        lg={{ span: 16 }}
        xl={{ span: 16 }}
        className={containerClassName}
      >
        <Row>
          {renderBreadcrumb()}

          <Col span={24} className={styles.title}>
            <h1>Thông tin cá nhân</h1>
          </Col>

          <Col span={24}>
            <Row justify="space-between">
              {renderPersonalInfo()}

              {renderQaSection()}
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Profile;
