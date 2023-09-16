import { Col, Drawer, Row } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../Redux/configStore";
import SignIn from "../../Pages/Auth/SignIn/SignIn";
import { randomNameImg } from "../../Global/Method";
import Profile from "../../Pages/Profile/Profile";
import SignUp from "../../Pages/Auth/SignUp/SignUp";
type Props = {};

const SigninRequest: React.FC<Props> = () => {
  const { isSignIn, modeDrawer, titleDrawer } = useSelector(
    (state: RootState) => state.uiManagementReducer
  );
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Row
      justify="center"
      style={{
        marginTop: "70px",
      }}
    >
      <Col span={24}>
        <img
          onClick={showDrawer}
          style={{ width: "100%", marginBottom: "200px" }}
          src={randomNameImg()}
          alt="exx"
        />
      </Col>

      <Drawer
        title={titleDrawer}
        placement="bottom"
        closable={false}
        onClose={onClose}
        open={open}
        key="bottom"
        height={"450px"}
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
  );
};

export default SigninRequest;
