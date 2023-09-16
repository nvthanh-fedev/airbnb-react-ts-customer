import { Radio, Row, Col, DatePicker } from "antd";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import {
  User,
  signUpAsyncAction,
} from "../../../Redux/reducers/userManagementReducer";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import styles from "./signUp.module.css";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useCallback } from "react";
import {
  setModeDrawer,
  setShowDrawer,
} from "../../../Redux/reducers/uiManagementReducer";

dayjs.extend(customParseFormat);

const dateFormat = "DD/MM/YYYY";
type Props = {};

export interface SignUpForm {
  id: number;
  name: string;
  birthday: string;
  phone: string;
  email: string;
  gender: boolean;
  role: string;
}

const SignUp: React.FC<Props> = () => {
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const hideDrawer = () => {
    console.log("showDrawer");
    dispatch(setShowDrawer(false));
  };
  const handleSubmit = useCallback(
    (values: User, { resetForm }: FormikHelpers<User>) => {
      console.log("handleSubmit ", values);
      const actionApi = signUpAsyncAction(values);
      dispatch(actionApi);
      resetForm();
      hideDrawer();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch]
  );

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required("Email không thể bỏ trống!")
      .email("Email không hợp lệ!"),
    password: yup
      .string()
      .required("Mật khẩu không thể bỏ trống!")
      .min(4, "Mật khẩu phải từ 4 đến 32 ký tự.")
      .max(32, "Mật khẩu phải từ 4 đến 32 ký tự."),
    name: yup.string().required("Tên không thể bỏ trống!"),
    gender: yup.boolean().required("Giới tính không thể bỏ trống!"),
    birthday: yup.string().required("Ngày sinh không thể bỏ trống!"),
    phone: yup
      .string()
      .required("Số điện thoại không thể bỏ trống!")
      .matches(/\d$/, "Số điện thoại chỉ được chứa ký tự số!"),
  });
  const defaultUserValues: User = {
    id: 0,
    name: "",
    birthday: "",
    phone: "",
    avatar: "",
    email: "",
    gender: true,
    role: "USER",
  };

  const handleChangeModeDrawer = () => {
    dispatch(setModeDrawer("signIn"));
  };

  return (
    <div className={styles.container}>
      <Formik
        initialValues={defaultUserValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="container">
            <Row justify="center">
              <Col>
                <img
                  src=".../../../assets/image/logo/logoairbnb.png"
                  alt="Logo"
                  className={styles.logo}
                />
              </Col>
            </Row>

            <h4
              style={{
                textAlign: "center",
                fontWeight: "bolder",
                marginBottom: "40px",
              }}
            >
              Cho đến khi tất cả chúng ta thuộc về
            </h4>

            <Field
              type="text"
              name="email"
              placeholder="Email"
              className={styles.inputAuthen}
            />
            <ErrorMessage
              name="email"
              component="p"
              className={styles.errorsText}
            />

            <Field
              type="password"
              name="password"
              placeholder="Mật khẩu"
              className={styles.inputAuthen}
            />
            <ErrorMessage
              name="password"
              component="p"
              className={styles.errorsText}
            />

            <Field
              type="text"
              name="name"
              placeholder="Tên người dùng"
              className={styles.inputAuthen}
            />
            <ErrorMessage
              name="name"
              component="p"
              className={styles.errorsText}
            />

            <DatePicker
              placeholder="Chọn ngày sinh"
              className={styles.inputAuthen}
              format={dateFormat}
              onChange={(date) => {
                if (date) {
                  console.log("birthday", dayjs(date).format(dateFormat));
                  setFieldValue("birthday", dayjs(date).format(dateFormat));
                }
              }}
            />

            <Radio.Group
              className={styles.groupRadio}
              value={values.gender ? "true" : "false"}
              onChange={(e) =>
                setFieldValue("gender", e.target.value === "true")
              }
              buttonStyle="outline"
            >
              <Radio.Button
                className={
                  values.gender
                    ? `${styles.buttonRadioLeft} ${styles.checked}`
                    : styles.buttonRadioLeft
                }
                value="true"
              >
                Nam
              </Radio.Button>
              <Radio.Button
                className={
                  !values.gender
                    ? `${styles.buttonRadioRight} ${styles.checked}`
                    : styles.buttonRadioRight
                }
                value="false"
              >
                Nữ
              </Radio.Button>
            </Radio.Group>

            <Field
              type="text"
              name="phone"
              placeholder="Số điện thoại"
              className={styles.inputAuthen}
            />
            <ErrorMessage
              name="phone"
              component="p"
              className={styles.errorsText}
            />

            <Row style={{ marginTop: "15px" }}>
              <Col span={24} className={styles.textByAuthen}>
                <p className={styles.displayBlockInline}>
                  Bằng việc đăng ký, bạn đồng ý với
                </p>
                <p className={styles.textPrivacy}> Chính sách bảo mật</p>
                <p className={styles.displayBlockInline}> và </p>
                <p className={styles.textPrivacy}> Điều khoản sử dụng</p>
              </Col>

              <Col span={24} className={styles.textByAuthen}>
                <p className={styles.displayBlockInline}>
                  Bạn đã là thành viên?
                </p>
                <p className={styles.sign} onClick={handleChangeModeDrawer}>
                  Hãy đăng nhập.
                </p>
              </Col>
            </Row>

            <div className="form-group">
              <button type="submit" className={styles.buttonAuthen}>
                Đăng ký
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
