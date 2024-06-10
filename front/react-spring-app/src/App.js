import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  // 상태만들기
  const [message, setMessage] = useState([]);
  const [message2, setMessage2] = useState("");
  const [message3, setMessage3] = useState("");

  useEffect(() => {
    // 요청 ->  서버로 요청 ()
    // react(브라우저) -> spring(서버)
    // http://localhost:3000 -> http://localhost:80
    // 서버의 번호가 자동으로 백 서버번호로 변경되게 설정해둬야함.
    //package.json 리액트가 실행될때 환경설정 같은 역할을 하는 것인데
    //package.json에서 서버 설정을 작성해주면된다.
    // package.json에 ,"proxy": "http://localhost:80" 이렇게 설정을 해둠! 그러면
    //localhost:80으로 서버가 설정된다.
    // 서버 돌릴때는 먼저 back먼저 (서버포트) 키고 이후에 font(리액트 포트) 키면된다.
    fetch("/test1")
      .then((res) => res.json())
      .then((data) => {
        setMessage(data);
      });
  }, []);

  const handleClick = () => {
    fetch("/test2", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "홍길동",
        age: 15,
      }),
    })
      .then((res) => res.text())
      .then((data) => setMessage2(data));
  };

  const axiosTest = () => {
    axios
      .post("/test2", {
        name: "김유저",
        age: 17,
      })
      // res안에 파싱된 데이터가 있기에 then은 한번만 써주면된다.
      .then((res) => {
        console.log(res);
        setMessage3(res.data);
      });
  };

  // axios
  // 브라우저 및 nodejs 환경에서
  // 비동기 요청을 쉽게 처리할 수 있게 해주는 Jacascript 라이브러리
  // * 터미널에서 npm/yarn 통해 설치
  // 터미널에 $npm install axios
  // $yarn add axios

  // 1. post 요청 시 데이터를 자동으로 JSON 데이터 형태로 처리해주므로,
  // fetch와 달리 JSON.stringify를 명시적으로 호출할 필요가 없음
  // 2. 응답을 JSON으로 자동파싱해주기 때문에 , fetch 처럼 두번째 then으로 응답을 파싱할 필요가 없음

  // 3. headers와 body를 명시적으로 설정하지 않아도 된다.
  // headers의 경우는 기본적으로 Content-Type: application/json으로 설정되어 있음

  // 단, header의 내용 변경시에는 명시적으로 작성해야 한다.
  // ex) headers : {'Authorization' : 'Bearer {token}'}
  return (
    //6.10 수업내용
    <ul>
      {message.map((el, idx) => (
        <li key={idx}>{el}</li>
      ))}

      <hr />
      <button onClick={handleClick}>fetch로 서버 통신</button>
      <br />
      <h1>{message2}</h1>

      <hr />
      <button onClick={axiosTest}>axios로 서버 통신</button>
      <br />
      <h1>{message3}</h1>
    </ul>
    //6.7일까지 했던 내용
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
