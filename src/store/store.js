import { configureStore } from "@reduxjs/toolkit";
import { authUserReducer } from "./authUser";
import { authAdminReducer } from "./authAdmin";
export default configureStore({
    reducer: {
        authUser: authUserReducer,
        authAdmin: authAdminReducer
    }
})