import styles from "./ResultQuiz.module.scss";
import "antd/dist/antd.css";

import { Typography, Progress, Button, Row } from "antd";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { selectScore } from "../../redux/auth/selector";
import { selectAmount } from "../../redux/question/selector";

import { resetQuiz } from "../../redux/answer/reducer";

function ResultQuiz() {
  const { Text, Title } = Typography;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalTrue = useSelector(selectScore);
  const totalAmount = useSelector(selectAmount);
  const score = Math.round((totalTrue * 100) / totalAmount);

  const handleQuit = () => {
    dispatch(resetQuiz());
    navigate("/quizsetting");
  };

  const handleRetry = () => {
    dispatch(resetQuiz());
    navigate("/questions");
  };

  return (
    <div>
      <div className={styles.result}>
        <div className={styles.title}>
          <Text level={2}>Your result</Text>
          <Text strong style={{ fontSize: 24 }}>
            {totalTrue}/{totalAmount}
          </Text>
        </div>

        <Progress
          type="circle"
          strokeColor={{
            "0%": "#108ee9",
            "100%": "#87d068",
          }}
          percent={score}
        />

        <div className={styles.text}>
          {score > 99 && <Text italic>You are so cool. You got a perfect score!</Text>}
          {score <= 99 && score > 70 && <Text italic>Well done. That's a good score</Text>}
          {score <= 70 && <Text italic>Oh no. You need to try harder ...</Text>}
        </div>
      </div>
      <Row justify="space-evenly">
        <Button block size="large" shape="round" className={styles.nav} onClick={handleQuit}>
          Quit
        </Button>
        <Button block size="large" shape="round" className={styles.nav} onClick={handleRetry}>
          Retry
        </Button>
      </Row>
    </div>
  );
}

export default ResultQuiz;
