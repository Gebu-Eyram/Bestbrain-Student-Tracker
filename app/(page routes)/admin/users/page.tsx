"use client";
import { DataTable } from "@/app/dataTable/data-table";
import { SchoolColumns, UserColumns } from "@/app/dataTable/definitions";
import { db } from "@/utils/db";
import { Users } from "@/utils/schema";
import React, { useEffect, useState } from "react";

const UserListPage = () => {
  const [userList, setUserList] = useState<any[]>([]);
  const GetUsers = async () => {
    try {
      const result: any[] = await db.select().from(Users).orderBy(Users.id);
      setUserList(result);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    GetUsers();
  }, []);

  return (
    <div>
      <DataTable columns={UserColumns} data={userList} />
    </div>
  );
};

export default UserListPage;
