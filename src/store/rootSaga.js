import { all, call } from "redux-saga/effects";
// References
//organizational
import { ContractsSagas } from "../App/views/References/Organizational/Contracts/_redux/ContractsSaga";
import { ContractorsSagas } from "../App/views/References/Organizational/Contractors/_redux/ContractorsSaga";
import { PremanetAssetSagas } from "../App/views/References/Organizational/PermanentAsset/_redux/PermanentAssetSaga";
import { SubAccSagas } from "../App/views/References/Organizational/SubAcc/_redux/SubAccSaga";
import { InventoryHoldingSagas } from "../App/views/References/Organizational/InventoryHolding/_redux/InventoryHoldingSaga";
import { ResponsiblePersonSagas } from "../App/views/References/Organizational/ResponsiblePerson/_redux/ResponsiblePersonSaga";
import { ConstantValueSagas } from "../App/views/References/Organizational/ConstantValue/_redux/ConstantValueSaga";
import { ChildrenSagas } from "../App/views/References/Organizational/Children/_redux/getListSaga";
import { DepartmentSagas } from "../App/views/References/Organizational/Department/_redux/DepartmentSaga";
import { EmployeeSagas } from "../App/views/References/Organizational/Employee/_redux/EmployeeSaga";
import { OrgSettleAccSagas } from "../App/views/References/Organizational/OrganizationsSettlementAccount/_redux/OrgSettleAccSaga";
//organizational end
// References end

export default function* rootSaga() {
  yield all([
    // References
    call(ContractsSagas),
    call(ContractorsSagas),
    call(PremanetAssetSagas),
    call(SubAccSagas),
    call(InventoryHoldingSagas),
    call(ResponsiblePersonSagas),
    call(ConstantValueSagas),
    call(ConstantValueSagas),
    call(ChildrenSagas),
    call(DepartmentSagas),
    call(EmployeeSagas),
    call(OrgSettleAccSagas),

    // References end
  ]);
}