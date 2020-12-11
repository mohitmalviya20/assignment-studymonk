import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    name:null,
    profilePhoto:null,
    title:null,
    upvotes:null,
    views:null,
    date:null,
    status:null,
    tags:[],
    link:null,
    open:false,

  },
  reducers: {
    SetInfo:(state,action)=>{
      state.name=action.payload.name;
      state.profilePhoto=action.payload.profilePhoto;
      state.title=action.payload.title;
      state.upvotes=action.payload.upvotes;
      state.views=action.payload.views;
      state.date=action.payload.date;
      state.status=action.payload.status;
      state.tags=action.payload.tags;
      state.link=action.payload.link;

    },
    setOpen:(state,action)=>{
      state.open=action.payload.open
    }
    
  },
});

export const { SetInfo,setOpen} =appSlice.actions;

export const Information= (state)=>state.app;
export default appSlice.reducer;
