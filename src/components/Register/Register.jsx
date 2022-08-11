import "antd/dist/antd.css";
import styles from "./Register.module.scss";
import { Form, Input, Checkbox, Button, Typography, Row, Col } from "antd";

export default function Register() {
  const { Text, Title } = Typography;
  return (
    <div>
      <Row>
        <Col>
          <Row>
            <Title>Create New Account </Title>
          </Row>
          <Form>
            <Form.Item label="Email">
              <Input />
            </Form.Item>
            <Form.Item label="Username">
              <Input />
            </Form.Item>
            <Form.Item label="Password">
              <Input.Password />
            </Form.Item>
            <Form.Item label="Confirm Password">
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button>Register</Button>
              <br />
              <br />
              <Text>Already have an account?</Text>
              <Text> Login</Text>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
