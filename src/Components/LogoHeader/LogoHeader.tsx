import { Col, Row } from "antd";
import styles from "./logoHeader.module.css";
import { NavLink } from "react-router-dom";
import {
  selectedUtility,
  setModeDetail,
  setModeProfile,
} from "../../Redux/reducers/uiManagementReducer";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { getRoomAction } from "../../Redux/reducers/roomManagementReducer";
type Props = {};

const logoUrl = "../../../assets/image/logo/logoairbnb.png";

const logoMini = "../../../assets/image/logo/logomini.png";

const LogoHeader: React.FC<Props> = () => {
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();

  const handleClick = () => {
    dispatch(setModeProfile(false));
    dispatch(setModeDetail(false));
    dispatch(selectedUtility({}));
    const action = getRoomAction();
    dispatch(action);
  };

  return (
    <>
      <Col
        xs={{ span: 0 }}
        sm={{ span: 0 }}
        md={{ span: 0 }}
        lg={{ span: 6 }}
        xl={{ span: 8 }}
        xxl={{ span: 8 }}
      >
        <Row justify="start" align="middle" style={{ height: "100%" }}>
          <Col span={24}>
            <NavLink to={``} onClick={handleClick}>
              <img
                src={logoUrl}
                alt="avatar"
                className={styles.imgLogoHeader}
              />
            </NavLink>
          </Col>
        </Row>
      </Col>
      <Col
        xs={{ span: 3 }}
        sm={{ span: 3 }}
        md={{ span: 3 }}
        lg={{ span: 0 }}
        xl={{ span: 0 }}
        xxl={{ span: 0 }}
      >
        <Row justify="start" align="middle" style={{ height: "100%" }}>
          <Col span={24}>
            <NavLink to={``} onClick={handleClick}>
              <img
                src={logoMini}
                alt="avatar"
                className={styles.imgLogoHeaderMini}
              />
            </NavLink>
          </Col>
        </Row>
      </Col>
    </>
  );
};
export default LogoHeader;
