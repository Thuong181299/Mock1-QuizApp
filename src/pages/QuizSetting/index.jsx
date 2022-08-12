import styles from "./QuizSetting.module.scss";
import "antd/dist/antd.css";

import { Typography, InputNumber, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { changeAmount } from "../../redux/question/reducer";

import { selectMaxQuestions } from "../../redux/question/selector";

function QuizSetting() {
  const { Text, Title, Paragraph } = Typography;

  const dispatch = useDispatch();
  const maxQuestions = useSelector(selectMaxQuestions);
  const navigate = useNavigate();

  const handleQuiz = () => {
    navigate("/questions");
  };

  const handleAmount = (value) => {
    dispatch(changeAmount(value));
  };

  return (
    <div className={styles.container}>
      <Title>Puzzle Number Option</Title>
      <Text>Amount of Questions</Text>
      <br />
      <Paragraph italic className={styles.paragraph}>
        More than {maxQuestions} questions
      </Paragraph>
      <InputNumber
        autoFocus
        min={1}
        max={maxQuestions}
        onChange={(value) => {
          return handleAmount(value);
        }}
      />
      <Button onClick={handleQuiz}>Get Start</Button>
    </div>
  );
}

export default QuizSetting;
