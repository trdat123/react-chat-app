import React, { useContext } from "react";
import Swal from "sweetalert2";
import { SocketContext } from "./service/socket";
import { Auth, signOut, User } from "firebase/auth";

interface Props {
  setRoomValue: React.Dispatch<React.SetStateAction<string>>;
  // id: string;
  noti: string[];
  setNoti: React.Dispatch<React.SetStateAction<string[]>>;
  setMsgList: React.Dispatch<
    React.SetStateAction<
      {
        id: string;
        text: string;
      }[]
    >
  >;
  auth: Auth;
  user: User | null | undefined;
}

const TopBar: React.FC<Props> = ({
  setRoomValue,
  noti,
  setNoti,
  setMsgList,
  auth,
  user,
}) => {
  const socket = useContext(SocketContext);

  async function joinRoom() {
    const { value: val } = await Swal.fire({
      title: "Enter a room to join in",
      input: "text",
      inputPlaceholder: "Aa",
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonColor: "#10B981",
    });
    if (val && val !== "") {
      socket.emit("join-room", val, (msg: string) => {
        setRoomValue(val);
        setNoti([...noti, msg]);
        setMsgList([]);
      });
    }
  }

  function SignOut() {
    function handleSignOut() {
      signOut(auth);
      socket.disconnect();
    }

    return (
      <button
        className="button bg-red-400 hover:bg-red-500 mx-1"
        onClick={handleSignOut}
      >
        Sign out
      </button>
    );
  }

  return (
    <div className="inline-flex flex-row w-9/12 justify-between my-3 h-auto">
      <h3 className="text-xl font-bold pt-1">
        {socket.id && user
          ? `Hello ${user.displayName}. Your id is: ${socket.id}`
          : `Server not response`}
      </h3>
      <div>
        <button
          className="button bg-green-500 hover:bg-green-600 mx-1"
          onClick={joinRoom}
        >
          Join room
        </button>
        <SignOut />
      </div>
    </div>
  );
};

export default TopBar;