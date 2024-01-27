import { useContext } from "react";
import AdminLayoutContext from "./adminLayoutContext";

const useAdminLayout = () => {
  const context = useContext(AdminLayoutContext);
  if (!context) {
    throw new Error('useAdminLayout must be used within an AdminLayoutProvider');
  }

  // console.log('useAdminLayout is called');

  return context;
}

export default useAdminLayout;
