import { combineReducers } from "redux";

// References
import contractsListReducer from "../App/views/References/Organizational/Contracts/_redux/getListSlice";
import contractsReducer from "../App/views/References/Organizational/Contracts/_redux/contractsSlice";
import contractorsReducer from "../App/views/References/Organizational/Contractors/_redux/getListSlice";
import premanetAssetReducer from "../App/views/References/Organizational/PermanentAsset/_redux/getListSlice";
import subAccReducer from "../App/views/References/Organizational/SubAcc/_redux/getListSlice";
import InventoryHoldingReducer from "../App/views/References/Organizational/InventoryHolding/_redux/getListSlice";
import ResponsiblePersonReducer from "../App/views/References/Organizational/ResponsiblePerson/_redux/getListSlice";
import ConstantValueReducer from "../App/views/References/Organizational/ConstantValue/_redux/getListSlice";
import childrenReducer from "../App/views/References/Organizational/Children/_redux/getListSlice";
import departmentReducer from "../App/views/References/Organizational/Department/_redux/getListSlice";
import employeeReducer from "../App/views/References/Organizational/Employee/_redux/getListSlice";
import orgSettleAccReducer from "../App/views/References/Organizational/OrganizationsSettlementAccount/_redux/getListSlice";
// References end

export const rootReducer = combineReducers({
  // References
  //organizational
  contractsList: contractsListReducer,
  contracts: contractsReducer,
  contractorsList: contractorsReducer,
  premanetAssetsList: premanetAssetReducer,
  subAccList: subAccReducer,
  InventoryHoldingList: InventoryHoldingReducer,

  ResponsiblePersonList: ResponsiblePersonReducer,
  ConstantValueList: ConstantValueReducer,
  childrenList: childrenReducer,
  departmentList: departmentReducer,
  employeeList: employeeReducer,
  orgSettleAccList: orgSettleAccReducer,
  //organizational end

  // References end
});