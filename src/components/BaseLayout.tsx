import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Iklan from "./Iklan";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const BaseLayout = async ({
  children,
  renderIklan = true,
}: {
  children: ReactNode;
  renderIklan?: boolean;
}) => {
    const {isAuthenticated} = getKindeServerSession()
    if(!(await isAuthenticated())){
       return redirect('/')
    }

  return (
    <div className="flex max-w-2xl lg:max-w-7xl mx-auto relative">
      <Sidebar />
      <div className="w-full lg:w-3/5 flex flex-col border-r">{children}</div>
      {renderIklan && <Iklan/>}
    </div>
  );
};

export default BaseLayout;
