import { configureStore } from "@reduxjs/toolkit";

import UserDirectorySlice from "./Slices/UserDirectorySlice";
import { composeWithDevTools } from "@redux-devtools/extension";

const combinedReducer = {
  userDirectorySlice: UserDirectorySlice,
};

export default configureStore(
  {
    reducer: combinedReducer,
  },
  composeWithDevTools()
);
