import "antd/dist/antd.css";
import styles from "./Register.module.scss";
import { Form, Input, Checkbox, Button, Typography, Row, Col, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { register } from "../../redux/auth/action";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 12,
    },
  },
};

const tailFormItemLaylout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 12,
      offset: 6,
    },
  },
};

export default function Register() {
  const { Text, Title } = Typography;
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = (values) => {
    console.log("Received values of form: ", values);
    dispatch(register(values, form));
  };

  const handleChange = () => {
    navigate("/");
  };

  return (
    <div>
      <Row span={12} offset={6} className={styles.container}>
        <Col>
          <Row justify="center">
            <Title level={2} style={{ margin: 20 }}>
              Create New Account{" "}
            </Title>
          </Row>

          <Form
            className={styles.form}
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={handleRegister}
            scrollToFirstError
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: "email",
                  message: "This input is not valid Email",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="username"
              label="Username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
                {
                  min: 5,
                  message: "Username must be minimum 5 characters.",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                {
                  min: 8,
                  message: "Username must be minimum 8 characters.",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two passwords that you entered do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error("Should accept agreement")),
                },
              ]}
            >
              <Checkbox>
                I have read the <span className={styles.change}>agreement</span>
              </Checkbox>
            </Form.Item>

            <Form.Item {...tailFormItemLaylout}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
              <br />
              <br />
              <Text className={styles.text} italic offset="4">
                Already have an account?
              </Text>
              <Text className={styles.change} underline italic onClick={handleChange}>
                {" "}
                Login
              </Text>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
