import React, { useEffect, useState } from "react";
import { useList, useObject } from "react-firebase-hooks/database";
import {
  limitToLast,
  orderByChild,
  push,
  query,
  ref,
  serverTimestamp,
  set,
} from "firebase/database";

import { db } from "firebase_config";
import { useSelector } from "react-redux";
import { RootState } from "store";

// define props
type Props = {
  roomId: string;
};

export const EnteredRoom: React.FC<Props> = (props: Props) => {
  const user = useSelector((state: RootState) => state.user);
  const roomRef = ref(db, `/RoomApp/rooms/${props.roomId}`);
  const membersRef = ref(db, `/RoomApp/members/${props.roomId}`);
  const actionsRef = ref(db, `/RoomApp/actions/${props.roomId}`);
  const actionsLimitRef = query(
    actionsRef,
    orderByChild("datetime"),
    limitToLast(10)
  );
  const [userId, setUserId] = useState("");
  const [room] = useObject(roomRef);
  const [members] = useList(membersRef);
  const [actions] = useList(actionsLimitRef);

  useEffect(() => {
    if (user.user) setUserId(user.user?.id);
    else setUserId("");
  }, [user]);

  useEffect(() => {
    const userId = user.user ? user.user?.id : "";
    const memberSelfRef = ref(db, `/RoomApp/members/${props.roomId}/${userId}`);
    set(memberSelfRef, {
      screenName: user.user?.screenName,
    });
    return () => {
      set(memberSelfRef, null);
    };
  }, []);

  const actionHandler = (type: number) => {
    const pushRef = push(actionsRef);
    set(pushRef, {
      actionType: type,
      userId: userId,
      datetime: serverTimestamp(),
    });
  };

  return (
    <div>
      <h1>EnteredRoom</h1>
      <ul>
        <li>{userId}</li>
        <li>CurrentRoom: {JSON.stringify(room)}</li>
        <li>Members : {JSON.stringify(members)}</li>
        <li>Actions : {JSON.stringify(actions)}</li>
        <li>
          <button onClick={() => actionHandler(0)}>Action0</button>
          <button onClick={() => actionHandler(1)}>Action1</button>
          <button onClick={() => actionHandler(2)}>Action2</button>
        </li>
      </ul>
    </div>
  );
};

export default EnteredRoom;
