const menuItems = {
  items: [
    //Dashboard
    {
      id: "navigation",
      title: "Navigation",
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "dashboard",
          title: "Dashboard",
          type: "item",
          url: "/dashboard/default",
          icon: "feather icon-home",
          role: 'UserView'
        },
      ],
    },
    //Dashboard end



    //References
    {
      id: "references",
      title: "references",
      type: "group",
      icon: "icon-ui",
      children: [
        {
          id: "referenceOrganizations",
          title: "Reference Organizations",
          type: "collapse",
          icon: "feather icon-list",
          children: [
            {
              id: "Department",
              title: "Department",
              type: "item",
              url: "/Department",
              role: 'DepartmentView'
            },
            {
              id: "Employee",
              title: "Employee",
              type: "item",
              url: "/Employee",
              role: 'UserView'
            },
          ],
        },
      ],
    },
    //Reference end 
  ],
};

export default menuItems;
