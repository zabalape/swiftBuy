import { createSlice } from "@reduxjs/toolkit";

const detailSlice = createSlice({
    name: "detail",
    initialState:{
        detail:[],
    },
    reducers:{
        getDetail(state,action){
            state.detail= action.payload;
        },
        clearDetail(state) {
            state.detail = [];
        },
    },
})

export const { getDetail, clearDetail } = detailSlice.actions;

export default detailSlice.reducer;