import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  doctors: [],
  activeDoctor: {},
};

export const doctorsOfAssistantSlice = createSlice({
  name: 'doctorsOfAssistantSlice',
  initialState,
  reducers: {
    doctorListForAssistant: (state, action) => {
      state.doctors = action.payload;
    },
    activeDoctorForAssistant: (state, action) => {
      console.log(state, action, 'state, actionstate, action');
      state.activeDoctor = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  doctorListForAssistant,
  activeDoctorForAssistant,
} = doctorsOfAssistantSlice.actions;
export default doctorsOfAssistantSlice.reducer;
