import React from 'react';

//Nav end

//dashboard const
// const Nvd3Chart = React.lazy(() => import('../Demo/Charts/Nvd3Chart/index'));
//dashboard const end

const MainPage = React.lazy(() => import('../App/views/MainPage/MainPage'))

// References
//organizational
const Contracts = React.lazy(() => import('../App/views/References/Organizational/Contracts/Contracts'));
const UpdateContract = React.lazy(() => import('../App/views/References/Organizational/Contracts/UpdateContract'));

const Contractors = React.lazy(() => import('../App/views/References/Organizational/Contractors/Contractors'));
const UpdateContractor = React.lazy(() => import('../App/views/References/Organizational/Contractors/UpdateContractor'));

const PermanentAsset = React.lazy(() => import('../App/views/References/Organizational/PermanentAsset/PermanentAsset'));
const UpdatePermanentAsset = React.lazy(() => import('../App/views/References/Organizational/PermanentAsset/UpdatePermanentAsset'));

const Children = React.lazy(() => import('../App/views/References/Organizational/Children/Children'));
const UpdateChildren = React.lazy(() => import('../App/views/References/Organizational/Children/UpdateChildren'));

const SubAcc = React.lazy(() => import('../App/views/References/Organizational/SubAcc/SubAcc'));
const UpdateSubAcc = React.lazy(() => import('../App/views/References/Organizational/SubAcc/UpdateSubAcc'));

const InventoryHolding = React.lazy(() => import('../App/views/References/Organizational/InventoryHolding/InventoryHolding'));
const UpdateInventoryHolding = React.lazy(() => import('../App/views/References/Organizational/InventoryHolding/UpdateInventoryHolding'));

const ResponsiblePerson = React.lazy(() => import('../App/views/References/Organizational/ResponsiblePerson/ResponsiblePerson'));
const UpdateResponsiblePerson = React.lazy(() => import('../App/views/References/Organizational/ResponsiblePerson/UpdateResponsiblePerson'));

const ConstantValue = React.lazy(() => import('../App/views/References/Organizational/ConstantValue/ConstantValue'));
const UpdateConstantValue = React.lazy(() => import('../App/views/References/Organizational/ConstantValue/UpdateConstantValue'));

const Department = React.lazy(() => import('../App/views/References/Organizational/Department/Department'));
const UpdateDepartment = React.lazy(() => import('../App/views/References/Organizational/Department/UpdateDepartment'));

const Employee = React.lazy(() => import('../App/views/References/Organizational/Employee/Employee'));
const UpdateEmployee = React.lazy(() => import('../App/views/References/Organizational/Employee/UpdateEmployee'));

const OrganizationsSettlementAccount = React.lazy(() => import('../App/views/References/Organizational/OrganizationsSettlementAccount/OrganizationsSettlementAccount'));
const UpdateOrganizationsSettlementAccount = React.lazy(() => import('../App/views/References/Organizational/OrganizationsSettlementAccount/UpdateOrganizationsSettlementAccount'));
//organizational end

// References end

const routes = [
  //dashboard
  { path: '/dashboard/default', exact: true, name: 'Default', component: MainPage, role: 'UserView' },

  // References
  //organizational path
  { path: '/contracts', exact: true, name: 'Contracts', component: Contracts, role: 'ContractView' },
  { path: '/contracts/add', exact: true, name: 'AddContract', component: UpdateContract, role: 'ContractView' },
  { path: '/contracts/edit/:id', exact: true, name: 'EditContract', component: UpdateContract, role: 'ContractView' },

  { path: '/Contractors', exact: true, name: 'Contractors', component: Contractors, role: 'ContractorView' },
  { path: '/Contractors/add', exact: true, name: 'AddContractor', component: UpdateContractor, role: 'ContractorInsert' },
  { path: '/Contractors/edit/:id', exact: true, name: 'EditContractor', component: UpdateContractor, role: 'ContractorEdit' },

  { path: '/PermanentAsset', exact: true, name: 'PermanentAsset', component: PermanentAsset, role: 'PermanentAssetView' },
  { path: '/PermanentAsset/add', exact: true, name: 'AddPermanentAsset', component: UpdatePermanentAsset, role: 'PermanentAssetInsert' },
  { path: '/PermanentAsset/edit/:id', exact: true, name: 'EditPermanentAsset', component: UpdatePermanentAsset, role: 'PermanentAssetEdit' },

  { path: '/Children', exact: true, name: 'Children', component: Children, role: 'ChildrenView' },
  { path: '/Children/add', exact: true, name: 'AddChildren', component: UpdateChildren, role: 'ChildrenInsert' },
  { path: '/Children/edit/:id', exact: true, name: 'EditChildren', component: UpdateChildren, role: 'ChildrenEdit' },

  { path: '/SubAcc', exact: true, name: 'SubAcc', component: SubAcc, role: 'SubAccView' },
  { path: '/SubAcc/add', exact: true, name: 'AddSubAcc', component: UpdateSubAcc, role: 'SubAccInsert' },
  { path: '/SubAcc/edit/:id', exact: true, name: 'EditSubAcc', component: UpdateSubAcc, role: 'SubAccEdit' },

  { path: '/InventoryHolding', exact: true, name: 'InventoryHolding', component: InventoryHolding, role: 'InventoryHoldingView' },
  { path: '/InventoryHolding/add', exact: true, name: 'AddInventoryHolding', component: UpdateInventoryHolding, role: 'InventoryHoldingInsert' },
  { path: '/InventoryHolding/edit/:id', exact: true, name: 'EditInventoryHolding', component: UpdateInventoryHolding, role: 'InventoryHoldingEdit' },

  { path: '/ResponsiblePerson', exact: true, name: 'ResponsiblePerson', component: ResponsiblePerson, role: 'ResponsiblePersonView' },
  { path: '/ResponsiblePerson/add', exact: true, name: 'AddResponsiblePerson', component: UpdateResponsiblePerson, role: 'InventoryHoldingInsert' },
  { path: '/ResponsiblePerson/edit/:id', exact: true, name: 'EditResponsiblePerson', component: UpdateResponsiblePerson, role: 'InventoryHoldingEdit' },

  { path: '/ConstantValue', exact: true, name: 'ConstantValue', component: ConstantValue, role: 'ConstantValueView' },
  { path: '/ConstantValue/add', exact: true, name: 'AddConstantValue', component: UpdateConstantValue, role: 'ConstantValueInsert' },
  { path: '/ConstantValue/edit/:id', exact: true, name: 'EditConstantValue', component: UpdateConstantValue, role: 'ConstantValueEdit' },

  { path: '/Department', exact: true, name: 'Department', component: Department, role: 'DepartmentView' },
  { path: '/Department/add', exact: true, name: 'AddDepartment', component: UpdateDepartment, role: 'DepartmentInsert' },
  { path: '/Department/edit/:id', exact: true, name: 'EditDepartment', component: UpdateDepartment, role: 'DepartmentEdit' },

  { path: '/Employee', exact: true, name: 'Employee', component: Employee, role: 'EmployeeView' },
  { path: '/Employee/add', exact: true, name: 'AddEmployee', component: UpdateEmployee, role: 'EmployeeInsert' },
  { path: '/Employee/edit/:id', exact: true, name: 'EditEmployee', component: UpdateEmployee, role: 'EmployeeEdit' },

  { path: '/OrganizationsSettlementAccount', exact: true, name: 'OrganizationsSettlementAccount', component: OrganizationsSettlementAccount, role: 'OrganizationsSettlementAccountView' },
  { path: '/OrganizationsSettlementAccount/add', exact: true, name: 'AddOrganizationsSettlementAccount', component: UpdateOrganizationsSettlementAccount, role: 'OrganizationsSettlementAccountView' },
  { path: '/OrganizationsSettlementAccount/edit/:id', exact: true, name: 'EditOrganizationsSettlementAccount', component: UpdateOrganizationsSettlementAccount, role: 'OrganizationsSettlementAccountView' },
  //organizational path end
  // References end
]


export default routes;

