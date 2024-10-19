import { DataTable } from "@/app/dataTable/data-table";
import { SchoolColumns, UserColumns } from "@/app/dataTable/definitions";
import React from "react";

const UserListPage = () => {
  return (
    <div>
      <DataTable
        columns={UserColumns}
        data={[
          {
            id: "1",
            name: "John Doe",
            email: "henry@gmail.com",
            picture: "/logo.png",
            role: "admin",
            createdAt: "2021-09-01",
          },
        ]}
      />
    </div>
  );
};

export default UserListPage;
