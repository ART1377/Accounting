import React from "react";
import { MdDragHandle, MdMoreVert } from "react-icons/md";

type Props = {
    title:string;
};

const TableTitle = ({title}: Props) => {
  return (
    <th className="border-s-4 border-main-gray min-w-[150px] max-w-[200px]">
      <div className="flex justify-between items-center gap-4 p-1">
        <p className="text-sm">{title}</p>
        <div className="flex gap-1">
          <MdDragHandle className="text-main-gray" />
          <MdMoreVert className="text-main-gray" />
        </div>
      </div>
    </th>
  );
};

export default TableTitle;
