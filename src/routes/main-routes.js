import React from 'react';

//Nav end

//dashboard const
// const Nvd3Chart = React.lazy(() => import('../Demo/Charts/Nvd3Chart/index'));
//dashboard const end

const MainPage = React.lazy(() => import('../App/views/MainPage/MainPage'))

// References
//organizational
const Department = React.lazy(() => import('../App/views/References/Organizational/Department/Department'));
const UpdateDepartment = React.lazy(() => import('../App/views/References/Organizational/Department/UpdateDepartment'));

const Employee = React.lazy(() => import('../App/views/References/Organizational/Employee/Employee'));
const UpdateEmployee = React.lazy(() => import('../App/views/References/Organizational/Employee/UpdateEmployee'));

//organizational end

// References end

const routes = [
  //dashboard
  { path: '/dashboard/default', exact: true, name: 'Default', component: MainPage, role: 'UserView' },

  // References
  //organizational path
  { path: '/Department', exact: true, name: 'Department', component: Department, role: 'DepartmentView' },
  { path: '/Department/add', exact: true, name: 'AddDepartment', component: UpdateDepartment, role: 'DepartmentInsert' },
  { path: '/Department/edit/:id', exact: true, name: 'EditDepartment', component: UpdateDepartment, role: 'DepartmentEdit' },

  { path: '/Employee', exact: true, name: 'Employee', component: Employee, role: 'EmployeeView' },
  { path: '/Employee/add', exact: true, name: 'AddEmployee', component: UpdateEmployee, role: 'EmployeeInsert' },
  { path: '/Employee/edit/:id', exact: true, name: 'EditEmployee', component: UpdateEmployee, role: 'EmployeeEdit' },
  //organizational path end
  // References end
]


export default routes;

