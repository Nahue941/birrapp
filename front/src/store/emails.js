import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sendEmailToUser = createAsyncThunk("SEND_EMAIL_TO_USER", (emailData) => {
    const { email, subject, text } = emailData
    
    return axios({
        method: "post",
        url: "http://localhost:8000/send-email",
        data: { email, subject, text },
    }).then(email => email);
}
);
const emailReducer = createReducer([], {
  [sendEmailToUser.fulfilled]: (state, action) => action.payload,
});

export default emailReducer;