import React, { useState, useEffect, useRef, useContext } from "react";
import { SocketContext } from "./service/socket";
import MessageText from "./MessageText";
import { AiOutlineSend } from "react-icons/ai";

// components
import TopBar from "./TopBar";

function ChatForm({ auth, user }) {
  const socket = useContext(SocketContext);
  const [formValue, setFormValue] = useState("");
  const [msgList, setMsgList] = useState([]);
  const dummy = useRef();
  const [roomValue, setRoomValue] = useState("");
  const [noti, setNoti] = React.useState([]);

  useEffect(() => {
    // socket.on("connect", () => {
    //   setId(socket.id);
    //   console.log(socket.id);
    // });

    socket.on("received-message", (messageObj) => {
      setMsgList([...msgList, messageObj]);
    });

    dummy.current.scrollIntoView({
      behavior: "smooth",
    });

    return () => socket.disconnect();
  }, [socket, msgList]);

  function handleSubmit(e) {
    e.preventDefault();
    if (formValue && !formValue.includes(" ")) {
      socket.emit("emit-message", socket.id, formValue, roomValue);
      setMsgList([...msgList, { id: socket.id, text: formValue }]);
      setFormValue("");
    }
  }

  return (
    <>
      <TopBar
        setRoomValue={setRoomValue}
        noti={noti}
        setNoti={setNoti}
        setMsgList={setMsgList}
        auth={auth}
        user={user}
      />
      <MessageText
        msgList={msgList}
        noti={noti}
        setNoti={setNoti}
        dummy={dummy}
      />
      <form
        className="flex justify-center w-full m-3"
        onSubmit={handleSubmit}
        onKeyPress={(e) => {
          if (e.key === "Enter") handleSubmit(e);
        }}
      >
        <textarea
          className="border w-4/6 h-full ring-1 focus:outline-none focus:ring-green-500 transition duration-300 ease-in-out rounded-md p-2"
          placeholder="Aa"
          style={{ resize: "none" }}
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") e.preventDefault();
          }}
        />
        <button type="submit" className="m-3">
          <AiOutlineSend
            size="30"
            className="text-gray-600 hover:text-green-500 transition duration-300 ease-in-out cursor-pointer"
          />
        </button>
      </form>
    </>
  );
}

export default ChatForm;
