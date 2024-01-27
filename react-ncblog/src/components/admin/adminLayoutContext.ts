import React, { Dispatch } from "react";
import { AdminLayoutAction, AdminLayoutState } from "./AdminLayoutProvider";

interface AdminLayoutContextType {
  state: AdminLayoutState;
  dispatch: Dispatch<AdminLayoutAction>
}

const initialState: AdminLayoutState = {
  navSize: "large",
  showMobileSidebar: false
};

const initialContext: AdminLayoutContextType = {
  state: initialState,
  dispatch: () => null
}

const AdminLayoutContext = React.createContext<AdminLayoutContextType>(initialContext);

export default AdminLayoutContext;
