import React from "react";
import Link from "next/link";
import { Webname } from "@/app/config/admin.config";
import Poligon from "@/common/Poligon";

const Sidebar = () => {
  return (
    <div className="card overflow-y-auto min-h-full">
      <Link href={"/"}>
        <div className="flex p-4 gap-3 items-center">
          <Poligon fill={"#000"} text={Webname.slice(0, 1)} />
          <h1 className="font-bold text-2xl">{Webname}</h1>
        </div>
      </Link>
      <hr />
      <div className="mt-4 p-4">
        Routes
      </div>
    </div>
  );
};

export default Sidebar;