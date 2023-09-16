import React from "react";
import { Col, Row } from "antd";
import styles from "./footer.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/configStore";
type Props = {};
const Footer: React.FC<Props> = () => {
  interface ColFooterProps {
    title: string;
    items: string[];
  }

  const ColFooter = ({ title, items }: ColFooterProps): JSX.Element => {
    return (
      <Col
        style={{ marginBottom: "20px" }}
        xs={24}
        sm={12}
        md={12}
        lg={12}
        xl={6}
        xxl={6}
      >
        <Row>
          <Col span={24} className={styles.mainTitleFooter}>
            {title}
          </Col>
          {items.map((item, index) => (
            <Col key={index} span={24} className={styles.subTitleFooter}>
              {item}
            </Col>
          ))}
        </Row>
      </Col>
    );
  };

  const { isModeProfile, isModeDetail } = useSelector(
    ({ uiManagementReducer }: RootState) => uiManagementReducer
  );

  const commonSpan = isModeProfile || isModeDetail ? 16 : 22;

  return (
    <div className={styles.footerWrapper}>
      <Row className={styles.footer}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <Row justify="center">
            <Col
              xs={22}
              sm={22}
              md={23}
              lg={commonSpan}
              xl={commonSpan}
              xxl={commonSpan}
              className={
                isModeProfile || isModeDetail ? styles.hiddenHeader : ""
              }
            >
              <Col span={24}>
                <Row className={styles.container}>
                  <ColFooter
                    title="Hỗ trợ"
                    items={[
                      "Trung tâm trợ giúp",
                      "Yêu cầu trợ giúp về vấn đề an toàn",
                      "AirCover",
                      "Hỗ trợ người khuyết tật",
                      "Các tùy chọn hủy",
                      "Biện pháp ứng phó với đại dịch COVID-19 của chúng tôi",
                      "Báo cáo lo ngại của hàng xóm",
                    ]}
                  />
                  <ColFooter
                    title="Cộng đồng"
                    items={[
                      "Airbnb.org: nhà ở cứu trợ",
                      "Chống phân biệt đối xử",
                    ]}
                  />
                  <ColFooter
                    title="Đón tiếp khách"
                    items={[
                      "Cho thuê nhà trên Airbnb",
                      "AirCover cho Chủ nhà",
                      "Xem tài nguyên đón tiếp khách",
                      "Truy cập diễn đàn cộng đồng",
                      "Đón tiếp khách có trách nhiệm",
                    ]}
                  />
                  <ColFooter
                    title="Airbnb"
                    items={[
                      "Trang tin tức",
                      "Tìm hiểu các tính năng mới",
                      "Thư ngỏ từ các nhà sáng lập",
                      "Cơ hội nghề nghiệp",
                      "Nhà đầu tư",
                    ]}
                  />
                </Row>
              </Col>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
