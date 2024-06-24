import React, { useState, useRef } from "react";
import "rrweb-player/dist/style.css";
import rrwebPlayer from "rrweb-player";

function App() {
  const rePlayerRef = useRef();
  const [errors, setErrors] = useState([]);
  const handleFetchEvents = async () => {
    const response = await fetch("/events");
    const data = await response.json();
    handleSetEvents(data);
  };

  const handleFetchEventsErrors = async () => {
    const response = await fetch("/errors");
    const data = await response.json();
    setErrors(data);
  };

  const handleSetEvents = (events) => {
    rePlayerRef.current = new rrwebPlayer({
      target: document.body, // customizable root element
      props: {
        events: events,
        liveMode: true,
      },
    });
  };

  const handleDestroy = () => {
    if (rePlayerRef.current) {
      const replayer = rePlayerRef.current.getReplayer();
      replayer.destroy();
      // 目前没有找到销毁 replayer 的方法，所以只能通过移除 DOM 来销毁
      const rrplayer = document.querySelectorAll(".rr-player");
      rrplayer.forEach((item) => {
        item.remove();
      });
    }
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  console.log(" rePlayerRef.current ->", rePlayerRef.current);
  const handleFetch = () => {
    handleFetchEvents();
    handleFetchEventsErrors();
  };
  return (
    <div>
      <h1>User Behavior and Error Stack</h1>
      <div>
        <button onClick={handleFetch}>读取用户行为和错误信息（如有）</button>
        <button onClick={handleDestroy}>清除播放器和错误信息</button>
      </div>
      {errors.length > 0 && <code>{JSON.stringify(errors, null, 2)}</code>}
    </div>
  );
}

export default App;
