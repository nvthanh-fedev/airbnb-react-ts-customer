import { Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/configStore";
import styles from "./header.module.css";
import { setShowSearchDetail } from "../../Redux/reducers/uiManagementReducer";
import LogoHeader from "../LogoHeader/LogoHeader";
import SearchOptions from "../SearchOptions/SearchOptions";
import ManagerOptions from "../ManagerOptions/ManagerOptions";
import SearchDetail from "../SearchDetail/SearchDetail";
import { useEffect } from "react";

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isSearchDetail, isModeProfile, isModeDetail } = useSelector(
    ({ uiManagementReducer }: RootState) => uiManagementReducer
  );

  const handleShowSearchDetails = () => {
    if (isSearchDetail) {
      dispatch(setShowSearchDetail(false));
    } else {
      dispatch(setShowSearchDetail(true));
    }
    console.log("isSearchDetail ", isSearchDetail);
  };

  const handleScroll = () => {
    const scrollY = window.scrollY; // Current scroll position in Y-axis
    const threshold = 1; // Adjust this threshold as needed

    if (scrollY > threshold) {
      dispatch(setShowSearchDetail(false));
    }
  };

  // Add a scroll event listener to the window on component mount
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Clean up the scroll event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <Row>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 24 }}
          xl={{ span: 24 }}
          xxl={{ span: 24 }}
          className={styles.mainHeader}
        >
          <Row justify="center">
            <Col
              xs={{ span: 22 }}
              sm={{ span: 22 }}
              md={{ span: 22 }}
              lg={{ span: isModeProfile || isModeDetail ? 16 : 22 }}
              xl={{ span: isModeProfile || isModeDetail ? 16 : 22 }}
              xxl={{ span: isModeProfile || isModeDetail ? 16 : 22 }}
              className={
                isModeProfile || isModeDetail ? styles.hiddenHeader : ""
              }
            >
              <Row justify="space-between" align="middle">
                <LogoHeader />

                {isModeProfile || isModeDetail ? (
                  <></>
                ) : (
                  <Col flex="auto">
                    <button
                      className={styles.buttonSearchOptions}
                      onClick={handleShowSearchDetails}
                    >
                      <SearchOptions />
                    </button>
                  </Col>
                )}

                <ManagerOptions />

                {isModeProfile || isModeDetail ? <></> : <SearchDetail />}
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
