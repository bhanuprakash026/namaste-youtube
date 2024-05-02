import { createSlice } from "@reduxjs/toolkit";
import { LIVE_CHAT_COUNT } from "../utils/constantsAPI";

const liveChatSlice = createSlice({
  name: "liveChat",
  initialState: {
    messages: []
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.splice(LIVE_CHAT_COUNT, 1)
      state.messages.unshift(action.payload)
    }
  }
})
export const { addMessage } = liveChatSlice.actions;
export default liveChatSlice.reducer;