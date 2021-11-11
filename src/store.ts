import { DocumentData } from "firebase/firestore";
import create from "zustand";
import { RoomData } from "./type";
import { MessageObj } from "./type";

// formValue
export const useFormValueStore = create((set: any) => ({
  formValue: "",
  setFormValue: (value: string) => set({ formValue: value }),
}));

// roomData
interface roomDataState {
  roomData: RoomData[] | (DocumentData & { id: string })[];
  setRoomData: (dataArr: {}[]) => void;
  addRoomData: (roomObj: {}) => void;
}

export const useRoomDataStore = create<roomDataState>(
  (set, get): roomDataState => ({
    roomData: [],
    setRoomData: (dataArr) => set({ roomData: dataArr }),
    addRoomData: (roomObj) =>
      set(
        (state) =>
          state.roomData
            ? { roomData: [...get().roomData, roomObj] }
            : { roomData: [roomObj] } // if new users have some joined room, then add new created room to arr, else new created room will take the first place
      ),
  })
);

// msgList
interface msgListState {
  msgList: MessageObj[];
  setMsgList: (msgArr: MessageObj[]) => void;
  addMsgToList: (msgObj: MessageObj) => void;
}

export const useMsgListStore = create<msgListState>(
  (set, get): msgListState => ({
    msgList: [],
    setMsgList: (msgArr) => set({ msgList: msgArr }),
    addMsgToList: (msgObj) =>
      set(
        (state) =>
          state.msgList
            ? { msgList: [...get().msgList, msgObj] }
            : { msgList: [msgObj] } // if room have messages, then add new message to list, else new message will take the first place
      ),
  })
);

// notiList
interface notiState {
  notiList: string[];
  setNoti: (singleNoti: string) => void;
}

export const useNotiStore = create<notiState>(
  (set, get): notiState => ({
    notiList: [],
    setNoti: (singleNoti) =>
      set((state) =>
        state.notiList
          ? { notiList: [...get().notiList, singleNoti] }
          : { notiList: [singleNoti] }
      ),
  })
);

// currentRoom
type currentRoom = { roomId: string; roomName: string };

interface currentRoomState {
  currentRoom: currentRoom | null;
  setCurrentRoom: (roomObj: currentRoom) => void;
}

export const useCurrentRoomStore = create<currentRoomState>(
  (set): currentRoomState => ({
    currentRoom: null,
    setCurrentRoom: (roomObj) => set({ currentRoom: roomObj }),
  })
);