import React, { Dispatch } from "react";
import { AdminLayoutAction, AdminLayoutState } from "./AdminLayoutProvider";

interface AdminLayoutContextType {
  state: AdminLayoutState;
  dispatch: Dispatch<AdminLayoutAction>
}

const initialState: AdminLayoutState = {
  navSize: "large",
  showMobileSidebar: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onCloseMain: () => {},
  isOpen: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onToggle: () => {}
};

const initialContext: AdminLayoutContextType = {
  state: initialState,
  dispatch: () => null
}

const AdminLayoutContext = React.createContext<AdminLayoutContextType>(initialContext);

export default AdminLayoutContext;
