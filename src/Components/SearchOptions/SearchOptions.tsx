import { Button, Col, Row, Space } from "antd";
import styles from "./searchOptions.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/configStore";

type Props = {};

const SearchOptions: React.FC<Props> = () => {
  const { isSearchDetail } = useSelector(
    ({ uiManagementReducer }: RootState) => uiManagementReducer
  );

  return (
    <>
      {isSearchDetail ? (
        <Col span={24} className={styles.searchTitle}>
          <Row justify="center">
            <Col
              xs={{ span: 0 }}
              sm={{ span: 0 }}
              md={{ span: 0 }}
              lg={{ span: 24 }}
              xl={{ span: 24 }}
              xxl={{ span: 24 }}
            >
              <Space style={{ justifyContent: "center" }}>
                <p style={{ padding: "0px 10px" }}>Chổ ở</p>
                <p style={{ padding: "0px 10px" }}>Trải nghiệm</p>
                <p style={{ padding: "0px 10px" }}>Trải nghiệm trực tuyến</p>
              </Space>
            </Col>
            <Col
              xs={{ span: 0 }}
              sm={{ span: 24 }}
              md={{ span: 24 }}
              lg={{ span: 0 }}
              xl={{ span: 0 }}
              xxl={{ span: 0 }}
            >
              <Space style={{ justifyContent: "center" }}>
                <p style={{ padding: "0px 10px" }}>Trải nghiệm</p>
                <p style={{ padding: "0px 10px" }}>Trải nghiệm trực tuyến</p>
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
              <Space style={{ justifyContent: "center" }}>
                <p style={{ padding: "0px 10px" }}>Trải nghiệm trực tuyến</p>
              </Space>
            </Col>
          </Row>
        </Col>
      ) : (
        <>
          <Col
            xs={{ span: 0 }}
            sm={{ span: 24 }}
            md={{ span: 24 }}
            lg={{ span: 24 }}
            xl={{ span: 24 }}
            xxl={{ span: 24 }}
            className={styles.search}
          >
            <Row justify="center">
              <Col span={8}>
                <h6>Địa điểm bất kỳ</h6>
              </Col>
              <Col span={8} className={styles.borderDivider}>
                <h6>Tuần bất kỳ</h6>
              </Col>
              <Col span={8}>
                <Row>
                  <Col span={16}>
                    <p style={{ padding: "0px 10px" }}>Thêm khách</p>
                  </Col>
                  <Col span={8}>
                    <Button shape="circle">
                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 0 }}
            md={{ span: 0 }}
            lg={{ span: 0 }}
            xl={{ span: 0 }}
            xxl={{ span: 0 }}
            className={styles.search}
          >
            <Row>
              <Col span={20}>
                <h5>Tìm kiếm bất kỳ địa điểm nào</h5>
              </Col>
              <Col span={4}>
                <Button shape="circle">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </Button>
              </Col>
            </Row>
          </Col>
        </>
      )}
    </>
  );
};

export default SearchOptions;
