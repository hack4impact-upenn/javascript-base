import React from "react";
import MaterialTable from "material-table";

export default function MaterialTableDemo() {
  const [state, setState] = React.useState({
    columns: [
      { title: "First Name", field: "first_name" },
      { title: "Last Name", field: "last_name" },
      { title: "Email", field: "email" },
      {
        title: "User Type",
        field: "userType",
        lookup: { 0: "Admin", 1: "Member" }
      }
    ],
    data: [
      {
        first_name: "John",
        last_name: "Smith",
        email: "jsmith@gmail.com",
        userType: 1
      },
      {
        first_name: "Sam",
        last_name: "Smith",
        email: "jsmith@gmail.com",
        userType: 0
      },
      {
        first_name: "Bob",
        last_name: "Smith",
        email: "jsmith@gmail.com",
        userType: 1
      },
      {
        first_name: "Ben",
        last_name: "Franklin",
        email: "jsmith@gmail.com",
        userType: 0
      },
      {
        first_name: "Amy",
        last_name: "Gutmann",
        email: "jsmith@gmail.com",
        userType: 0
      },
      {
        first_name: "Rajiv",
        last_name: "Gandhi",
        email: "jsmith@gmail.com",
        userType: 1
      }
    ]
  });

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <MaterialTable
        title="Registered Users"
        columns={state.columns}
        style={{ padding: 20, margin: 20 }}
        data={state.data}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...state.data];
                data[data.indexOf(oldData)] = newData;
                setState({ ...state, data });
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...state.data];
                data.splice(data.indexOf(oldData), 1);
                setState({ ...state, data });
              }, 600);
            })
        }}
      />
    </div>
  );
}
