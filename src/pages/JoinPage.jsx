import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as St from "../styles/styles";
import { validateUserId, validatePassword } from "../util/validation";
import JoinInput from "../components/Input/JoinInput";

export default function JoinPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      alert("비밀번호와 비밀번호 확인이 서로 다릅니다.");
      return;
    }
    try {
      const response = await axios.post("http://3.38.191.164/register", {
        id,
        password,
      });
      console.log("새로운 회원가입이 발생하였습니다 ->", response);
      if (response.status === 201) {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      alert("서버에 문제가 생겼습니다. 다시 시도해주세요.");
    }
  };

  return (
    <St.Container>
      <St.Header>
        <img src="img/lycos.webp" alt="img" style={{ width: "250px" }} />
        <St.Title></St.Title>
      </St.Header>

      <St.Col margin="10px 0 20px">
        아이디
        <JoinInput
          value={id}
          handleChange={setId}
          handleKeyUp={validateUserId}
          errorMessage={
            "아이디는 8~12자리 이상이며 특수문자와 한글은 포함되지 않습니다."
          }
        />
      </St.Col>

      <St.Col margin="10px 0 20px">
        비밀번호
        <JoinInput
          value={password}
          handleChange={setPassword}
          handleKeyUp={validatePassword}
          errorMessage={
            "비밀번호는 6자리 이상이며, 영어 대문자 1개, 특수문자 1개가 포함되어야합니다."
          }
        />
      </St.Col>

      <St.Col margin="10px 0 40px">
        <div>비밀번호 재확인</div>
        <St.Input onChange={(e) => setPasswordConfirm(e.target.value)} />
        {password === passwordConfirm || (
          <St.ErrorMessage>비밀번호가 동일하지 않습니다</St.ErrorMessage>
        )}
      </St.Col>

      <div>
        <St.Button buttontheme="secondary" onClick={onSubmitHandler}>
          회원가입
        </St.Button>
      </div>
    </St.Container>
  );
}
