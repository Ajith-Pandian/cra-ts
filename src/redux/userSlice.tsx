import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { IEditUser, IUser } from "../utils/models";

interface IUsersState {
  users: IUser[];
}
export const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
  } as IUsersState,
  reducers: {
    addUsers: (state, action: PayloadAction<IUser[]>) => {
      const users = action.payload;

      state.users = users;
    },
    updateUser: (state, action: PayloadAction<IEditUser>) => {
      const editedUser = action.payload;

      const userToUpdate = state.users.find(({ id }) => id === editedUser.id);

      Object.keys(editedUser)?.forEach((fieldToUpdate) => {
        if (userToUpdate) {
          userToUpdate[fieldToUpdate] = editedUser[fieldToUpdate];
        }
      });
    },
    updateUserLike: (
      state,
      action: PayloadAction<{ userId: string; isLiked: boolean }>
    ) => {
      const { userId, isLiked } = action.payload;

      const userToUpdate = state.users.find(({ id }) => id === userId);

      if (userToUpdate) {
        userToUpdate.liked = isLiked;
      }
    },
    removeUser: (state, action: PayloadAction<{ userId: string }>) => {
      const { userId } = action.payload;

      const userIndex = state?.users?.findIndex(({ id }) => id === userId);

      state.users.splice(userIndex, 1);
    },
  },
});

export const { addUsers, updateUser, updateUserLike, removeUser } =
  userSlice.actions;

export default userSlice.reducer;
