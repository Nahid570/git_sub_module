import { combineReducers } from "redux";
import authSlice from "./authSlice";
import orgSlice from "./orgSlice";
import specialtySlice from "./specialtySlice";
// import patientSettingSlice from "./patientSettingSlice";
// import prescriptionSettingSlice from "./prescriptionSettingSlice";
// import prescriptionItemSlice from "./prescriptionItemSlice";
import doctorsOfAssistantSlice from "./doctorsOfAssistantSlice";
import prescriptionSlice from "./prescriptionSlice";

export default combineReducers({
  authReducer: authSlice,
  orgReducer: orgSlice,
  // patientSettingReducer: patientSettingSlice,
  // prescriptionSettingReducer: prescriptionSettingSlice,
  // prescriptionItemReducer: prescriptionItemSlice,
  doctorsOfAssistantReducer: doctorsOfAssistantSlice,
  specialtyReducer: specialtySlice,
  prescriptionReducer: prescriptionSlice
});
