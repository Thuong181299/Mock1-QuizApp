import "antd/dist/antd.css";
import styles from "./Logout.module.scss";
import { Avatar, Popover, Row, Typography, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import {
  selectAvatar,
  selectRefreshToken,
  selectUsernameAuth,
  selectEmail,
  selectRole,
} from "../../redux/auth/selector";

import { logout } from "../../redux/auth/action";

function Logout() {
  const { Text } = Typography;
  const dispatch = useDispatch();
  const avatar = useSelector(selectAvatar);
  const username = useSelector(selectUsernameAuth);
  const email = useSelector(selectEmail);
  const role = useSelector(selectRole);
  const refreshToken = useSelector(selectRefreshToken);

  const handleLogout = () => {
    dispatch(logout(refreshToken));
  };

  function title() {
    return (
      <div>
        <Avatar src={avatar} />
        <br />
        <Text>
          {username} ({role})
        </Text>
        <br />
        <Text type="secondary">{email}</Text>
      </div>
    );
  }

  function content() {
    return (
      <div>
        <Button onClick={handleLogout}>
          <LogoutOutlined />
          Log Out
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Row justify="end">
        <Popover placement="bottomRight" trigger="click" title={title} content={content}>
          <Avatar className={styles.avatar} src={avatar} />
        </Popover>
      </Row>
    </div>
  );
}

export default Logout;
