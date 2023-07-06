import { combineReducers } from "redux";

// References
import departmentReducer from "../App/views/References/Organizational/Department/_redux/getListSlice";
import employeeReducer from "../App/views/References/Organizational/Employee/_redux/getListSlice";
// References end

export const rootReducer = combineReducers({
  // References
  //organizational
  departmentList: departmentReducer,
  employeeList: employeeReducer,
  //organizational end

  // References end
});