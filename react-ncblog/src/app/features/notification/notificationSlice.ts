import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface NotificationState {
  message: string;
  type: "success" | "error" | "info";
  
}

interface NotificationPayload {
  message: string;
  type: "success" | "error" | "info";
  
}
const initialState: NotificationState = {
  message: "",
  type: "info",
};


const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (state: NotificationState, action: PayloadAction<NotificationPayload>) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    clearNotification(state) {
      state.message = '';
      state.type = 'info';
    },
  },

});

export const { showNotification, clearNotification } = notificationSlice.actions;

export const selectNotification = (state: RootState) => state.notification;

export default notificationSlice.reducer;