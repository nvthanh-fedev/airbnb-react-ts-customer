import { Radio, Row, Col } from "antd";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { signInAsyncAction } from "../../../Redux/reducers/userManagementReducer";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import styles from "./signIn.module.css";
import {
  setIsSignIn,
  setModeDrawer,
  setShowDrawer,
} from "../../../Redux/reducers/uiManagementReducer";
import { useCallback } from "react";

type Props = {};

export interface SignInForm {
  email: string;
  password: string;
}

const Authen: React.FC<Props> = () => {
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();

  const hideDrawer = () => {
    console.log("showDrawer");
    dispatch(setShowDrawer(false));
  };

  const handleSubmit = useCallback(
    (values: SignInForm, { resetForm }: FormikHelpers<SignInForm>) => {
      console.log("handleSubmit ", values);
      const actionApi = signInAsyncAction(values);
      dispatch(actionApi);
      resetForm();
      hideDrawer();
      dispatch(setIsSignIn(true));
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
  });

  const handleChangeModeDrawer = () => {
    dispatch(setModeDrawer("signUp"));
  };

  return (
    <div className={styles.container}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
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

          <Row style={{ marginTop: "15px" }}>
            <Col span={12}>
              <Radio checked className={styles.radioKeepAuthen}>
                Lưu mật khẩu
              </Radio>
            </Col>
            <Col span={12} className={styles.textForgotPass}>
              Quên mật khẩu?
            </Col>

            <Col span={24} className={styles.textByAuthen}>
              <p className={styles.displayBlockInline}>
                Bằng việc đăng nhập, bạn đồng ý với
              </p>
              <p className={styles.textPrivacy}> Chính sách bảo mật</p>
              <p className={styles.displayBlockInline}> và </p>
              <p className={styles.textPrivacy}> Điều khoản sử dụng.</p>
            </Col>

            <Col span={24} className={styles.textByAuthen}>
              <p className={styles.displayBlockInline}>
                Bạn chưa phải là thành viên?
              </p>
              <p className={styles.sign} onClick={handleChangeModeDrawer}>
                Hãy tham gia với chúng tôi.
              </p>
            </Col>
          </Row>

          <div className="form-group">
            <button type="submit" className={styles.buttonAuthen}>
              Đăng nhập
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Authen;
