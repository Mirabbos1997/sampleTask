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
              id: "Contractors",
              title: "Contractors",
              type: "item",
              url: "/Contractors",
              role: 'ContractorView'
            },
            {
              id: "contracts",
              title: "contracts",
              type: "item",
              url: "/contracts",
              role: 'ContractView'
            },
            {
              id: "PermanentAsset",
              title: "PermanentAsset",
              type: "item",
              url: "/PermanentAsset",
              role: 'PermanentAssetView'
            },
            {
              id: "SubAcc",
              title: "SubAcc",
              type: "item",
              url: "/SubAcc",
              role: 'SubAccView'
            },
            {
              id: "InventoryHolding",
              title: "InventoryHolding",
              type: "item",
              url: "/InventoryHolding",
              role: 'SubAccView'
            },
            {
              id: "ResponsiblePerson",
              title: "ResponsiblePerson",
              type: "item",
              url: "/ResponsiblePerson",
              role: 'ResponsiblePersonView'
            },
            {
              id: "ConstantValue",
              title: "ConstantValue",
              type: "item",
              url: "/ConstantValue",
              role: 'ConstantValueView'
            },
            {
              id: "Children",
              title: "Children",
              type: "item",
              url: "/Children",
              role: 'ChildrenView'
            },
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
            {
              id: "OrganizationsSettlementAccount",
              title: "OrganizationsSettlementAccount",
              type: "item",
              url: "/OrganizationsSettlementAccount",
              role: 'OrganizationsSettlementAccountView'
            },
          ],
        },
      ],
    },
    //Reference end 
  ],
};

export default menuItems;
