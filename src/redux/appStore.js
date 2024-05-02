import { configureStore } from "@reduxjs/toolkit";
import navSlice from "./navSlice";
import searchSlice from "./searchSlice";
import liveChatSlice from "./liveChatSlice";

const appStore = configureStore({
  reducer: {
    nav: navSlice,
    search: searchSlice,
    liveChat: liveChatSlice
  }
})


export default appStore