import { Avatar, Button, Col, Drawer, Row } from "antd";
import styles from "./managerOptions.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import SignIn from "../../Pages/Auth/SignIn/SignIn";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/configStore";
import { convertNameToChar } from "../../Global/Method";
import Profile from "../../Pages/Profile/Profile";
import SignUp from "../../Pages/Auth/SignUp/SignUp";
import { setShowDrawer } from "../../Redux/reducers/uiManagementReducer";

type Props = {};

const ManagerOptions: React.FC<Props> = () => {
  const { user } = useSelector(
    (state: RootState) => state.userManagementReducer
  );
  const dispatch: AppDispatch = useDispatch();

  const { isSignIn, modeDrawer, titleDrawer, isShowDrawer } = useSelector(
    (state: RootState) => state.uiManagementReducer
  );

  const handleCloseDrawer = () => {
    dispatch(setShowDrawer(false));
  };

  return (
    <>
      <Col
        xs={{ span: 4 }}
        sm={{ span: 4 }}
        md={{ span: 4 }}
        lg={{ span: 6 }}
        xl={{ span: 8 }}
        xxl={{ span: 8 }}
      >
        <Row justify="end" className={styles.managerDrawer} align="middle">
          <Button
            onClick={() => {
              dispatch(setShowDrawer(true));
              window.scrollTo(0, 0);
            }}
            className={styles.buttonManagerDrawer}
          >
            <FontAwesomeIcon icon={faBars} />

            {isSignIn ? (
              <Avatar className={styles.avatar}>
                {user ? convertNameToChar(user.name) : ""}
              </Avatar>
            ) : (
              <FontAwesomeIcon
                icon={faUserCircle}
                size="xl"
                className={styles.icon}
              />
            )}
          </Button>
          <Drawer
            title={titleDrawer}
            placement="bottom"
            closable={false}
            open={isShowDrawer}
            onClose={handleCloseDrawer}
            key="bottom"
            size="large"
            height={"70vh"}
          >
            {isSignIn ? (
              <Profile />
            ) : modeDrawer === "signIn" ? (
              <SignIn />
            ) : modeDrawer === "signUp" ? (
              <SignUp />
            ) : null}
          </Drawer>
        </Row>
      </Col>
    </>
  );
};
export default ManagerOptions;
