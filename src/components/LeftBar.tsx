import React from "react";
import { RoomDataObj } from "../type";
import { auth } from "../service/firebase";
import { signOut } from "firebase/auth";
import { useRoomDataStore } from "../store";
import { Tooltip } from "@chakra-ui/react";
import createRoom from "../functions/createRoom";
import joinRoom from "../functions/joinRoom";
import RoomList from "./RoomList";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import { MdGroup, MdGroupAdd, MdLogout } from "react-icons/md";
import { BsListUl } from "react-icons/bs";

const SideBar: React.FC = () => {
  const user = auth.currentUser;
  const roomData = useRoomDataStore((state) => state.roomData);

  function SignOut(): JSX.Element {
    function handleSignOut() {
      signOut(auth);
    }

    return (
      <Tooltip label="Sign out">
        <button
          className="button ml-auto bg-red-400 hover:bg-red-500"
          onClick={handleSignOut}
        >
          <MdLogout className="w-6 h-6" />
        </button>
      </Tooltip>
    );
  }

  const listOfRoom =
    roomData && roomData.length > 0
      ? roomData.map((room: RoomDataObj) => (
          <RoomList room={room} key={room.id} />
        ))
      : null;

  return (
    <div className="flex flex-col justify-between bg-white h-screen w-4/12 max-w-xs border-r-2 min-w-max">
      <div className="flex flex-row items-center justify-between border-b-2 px-2 h-16">
        <div className="flex flex-row items-center">
          <BsListUl className="w-5 h-5 mr-1" />
          <p className="text-xl font-bold">Room List</p>
        </div>
        <div className="flex flex-row">
          <Tooltip label="Create a room">
            <div
              onClick={createRoom}
              className="flex w-9 h-9 rounded-full group-hover:rounded-xl transition-all duration-200 bg-gray-200 mr-2 justify-center items-center hover:bg-gray-300 cursor-pointer"
            >
              <MdGroup className="w-5 h-5" />
            </div>
          </Tooltip>
          <Tooltip label="Join a room">
            <div
              onClick={joinRoom}
              className="flex w-9 h-9 rounded-full group-hover:rounded-xl transition-all duration-200 bg-gray-200 mr-2 justify-center items-center hover:bg-gray-300 cursor-pointer"
            >
              <MdGroupAdd className="w-5 h-5" />
            </div>
          </Tooltip>
        </div>
      </div>
      <SimpleBar className="overflow-y-auto h-5/6">{listOfRoom}</SimpleBar>
      <div className="flex flex-row items-center bg-gray-200 mt-auto p-2">
        <img
          src={user?.photoURL?.toString()}
          className="w-12 h-12 rounded-full mr-1"
          alt=""
        />
        <div className="flex flex-col w-48">
          <p className="font-bold text-sm truncate">{user?.displayName}</p>
          <p className="text-sm truncate">{user?.email}</p>
        </div>
        <SignOut />
      </div>
    </div>
  );
};

export default SideBar;
