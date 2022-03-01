import React, { useState } from "react";
import { useList } from "react-firebase-hooks/database";
import {
  ref,
  push,
  set,
  get,
  query,
  orderByChild,
  equalTo,
  remove,
} from "firebase/database";

import { db } from "firebase_config";
import { EnteredRoom } from "./components/EnteredRoom";
//import { useSelector } from "react-redux";
//import { RootState } from "store";
//import { useNavigate } from "react-router-dom";

// define props
type Props = {};

export const Room: React.FC<Props> = () => {
  //const user = useSelector((state: RootState) => state.user);
  //const navigate = useNavigate();
  const roomsRef = ref(db, "/RoomApp/rooms");
  const [rooms] = useList(roomsRef);
  const [roomId, setRoomId] = useState("");
  const [roomName, setRoomName] = useState("");
  const [isEntered, setIsEntered] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const searchRoom = async (name: string) => {
    const matchRoomQuery = query(
      roomsRef,
      orderByChild("roomName"),
      equalTo(name)
    );
    const ss = await get(matchRoomQuery);
    if (ss.exists()) {
      const data = ss.val();
      return Object.keys(data)[0];
    }
  };

  const createRoom = (name: string) => {
    const pushRef = push(roomsRef);
    set(pushRef, {
      roomName: name,
    }).then(() => {
      if (pushRef.key) {
        setRoomId(pushRef.key);
        setIsEntered(true);
      }
    });
  };

  const enterRoom = async (name: string) => {
    const roomId = await searchRoom(name);
    if (roomId) {
      setRoomId(roomId);
      setIsEntered(true);
      setErrorMsg("");
    } else {
      setErrorMsg("ルームが見つかりませんでした．");
    }
  };

  const exitRoom = () => {
    setIsEntered(false);
  };

  const deleteRoom = async (name: string) => {
    const roomId = await searchRoom(name);
    const removeRoomRef = ref(db, `/RoomApp/rooms/${roomId}/`);
    remove(removeRoomRef);
  };

  //ログイン必須
  // if(!user.isLogin){
  //   navigate("/Login");
  // }

  if (!isEntered) {
    return (
      <div>
        <h1>Room</h1>
        <ul>
          <li>Rooms: {JSON.stringify(rooms)}</li>
          <li>
            <label>Room: </label>
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
            <button onClick={() => createRoom(roomName)}>Create</button>
            <button onClick={() => enterRoom(roomName)}>Enter</button>
            <button onClick={() => deleteRoom(roomName)}>Delete</button>
            <p>{errorMsg}</p>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div>
      <h1>Room</h1>
      <EnteredRoom roomId={roomId} />
      <button onClick={() => exitRoom()}>Exit</button>
    </div>
  );
};

export default Room;
