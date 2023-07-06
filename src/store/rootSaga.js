import { all, call } from "redux-saga/effects";
// References
//organizational
import { DepartmentSagas } from "../App/views/References/Organizational/Department/_redux/DepartmentSaga";
import { EmployeeSagas } from "../App/views/References/Organizational/Employee/_redux/EmployeeSaga";
//organizational end
// References end

export default function* rootSaga() {
  yield all([
    // References
    call(DepartmentSagas),
    call(EmployeeSagas),
    // References end
  ]);
}