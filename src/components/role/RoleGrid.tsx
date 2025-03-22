"use client";

import { RoleInterface } from "./role.interface";
import { DataTableCommon } from "../common/data-table";
import { columnsRoles } from "./columns-roles";

interface Props {
  roles: RoleInterface[];
}

export const RoleGrid = ({ roles }: Props) => {
  return (
    <div className="container mx-auto ">
      <DataTableCommon columns={columnsRoles} data={roles} />
    </div>
  );
};
