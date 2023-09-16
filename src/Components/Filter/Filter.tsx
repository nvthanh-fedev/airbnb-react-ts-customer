import { Col, Row, Switch } from "antd";
import styles from "./filter.module.css";
import { CheckOutlined } from "@ant-design/icons";
import { useState } from "react";

type Props = {};

const Filter: React.FC<Props> = () => {
  const [switchChecked, setSwitchChecked] = useState(false);

  const handleSwitchChange = (checked: boolean) => {
    setSwitchChecked(checked);
  };

  return (
    <Col span={24}>
      <Row justify="center" className={styles.container} align="middle">
        <Col
          xxl={{ span: 12 }}
          xl={{ span: 12 }}
          md={{ span: 16 }}
          sm={{ span: 23 }}
          xs={{ span: 0 }}
          className={styles.content}
        >
          <Row>
            <Col span={7} className={styles.borderDivider}>
              <p>Hiển thị tổng giá</p>
            </Col>

            <Col span={17}>
              <Row justify="space-between" gutter={[8, 8]}>
                <Col span={18}>Bao gồm mọi khoản phí, trước thuế</Col>
                <Col span={5}>
                  <Switch
                    checkedChildren={<CheckOutlined />}
                    checked={switchChecked}
                    onChange={handleSwitchChange}
                    style={{
                      backgroundColor: switchChecked ? "black" : "",
                    }}
                    className={styles.switch}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default Filter;
