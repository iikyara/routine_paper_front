import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ref, push, set } from "firebase/database";

import { db } from "firebase_config";

const roomsRef = ref(db, "/RoomApp/rooms");
const newRoomRef = push(roomsRef);
// const membersRef = ref(db, "/RoomApp/members");
// const newMemberRef = undefined;
// const actionsRef = ref(db, "/RoomApp/actions");
// const newActionRef = undefined;

export type UserState = {
  id: string;
  mouse?: {
    x: number;
    y: number;
  };
};

export type UserAction = {
  id: string;
  userId: string;
  actionId: number;
  arg: any;
  done: boolean;
};

export type RoomState = {
  id: string | undefined;
  members: { [id: string]: UserState };
  actions: { [id: string]: UserAction };
};

const initialState = {
  id: undefined,
  members: {},
  actions: {},
};

const roomSlice = createSlice({
  name: "room",
  initialState: { ...initialState } as RoomState,
  reducers: {
    // room
    createRoom: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    exitRoom: (state) => {
      state.id = initialState.id;
      state.members = initialState.members;
      state.actions = initialState.actions;
    },

    //members
    addMember: (state, action: PayloadAction<UserState>) => {
      state.members[action.payload.id] = action.payload;
    },
    updateMember: (state, action: PayloadAction<UserState>) => {
      state.members[action.payload.id].mouse = action.payload.mouse;
    },
    removeMember: (state, action: PayloadAction<string>) => {
      delete state.members[action.payload];
    },

    //actions
    addAction: (state, action: PayloadAction<UserAction>) => {
      state.actions[action.payload.id] = action.payload;
    },
    updateAction: (state, action: PayloadAction<UserAction>) => {
      state.actions[action.payload.id] = action.payload;
    },
    removeAction: (state, action: PayloadAction<string>) => {
      delete state.actions[action.payload];
    },
  },
});

export const {
  createRoom,
  exitRoom,
  addMember,
  updateMember,
  removeMember,
  addAction,
  updateAction,
  removeAction,
} = roomSlice.actions;

export const createRoomAsync = () => {
  return async () => {
    set(newRoomRef, {
      id: "abc",
    }).then((res) => {
      console.log(res);
    });
  };
};

// export const addActionAsync = () => {
//   return async (dispatch: any) => {

//   };
// };

// export const fetchAllAsync = () => {
//   return async (dispatch: any) => {

//   };
// };

// export const fetchAllMembersAsync = () => {
//   return async (dispatch: any) => {

//   };
// };

// export const fetchAllActionsAsync = () => {
//   return async (dispatch: any) => {

//   };
// };

export default roomSlice.reducer;
