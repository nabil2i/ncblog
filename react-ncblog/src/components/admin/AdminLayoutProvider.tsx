import { ReactNode, useReducer } from "react";
import AdminLayoutContext from "./adminLayoutContext";

// Reducer
interface setNavSize {
  type: "SET_NAVSIZE";
  navSize: "small" | "large";
}

interface setShowMobileSidebar {
  type: "SET_SHOW_MOBILE_SIDEBAR";
  showMobileSidebar: boolean;
}

interface changeNavSize {
  type: "CHANGE_NAVSIZE";
}

interface toggleMobileSidebar {
  type: "TOGGLE_MOBILE_SIDEBAR";
}

export type AdminLayoutAction =
  | setNavSize
  | setShowMobileSidebar
  | changeNavSize
  | toggleMobileSidebar;

export interface AdminLayoutState {
  navSize: string;
  showMobileSidebar: boolean;
}

const adminLayoutReducer = (
  state: AdminLayoutState,
  action: AdminLayoutAction
): AdminLayoutState => {
  switch (action.type) {
    case "SET_NAVSIZE": {
      return {
        ...state,
        navSize: action.navSize,
      };
    }
    case "CHANGE_NAVSIZE": {
      return {
        ...state,
        showMobileSidebar: false,
        navSize: state.navSize === "small" ? "large" : "small",
      };
    }
    case "SET_SHOW_MOBILE_SIDEBAR": {
      return {
        ...state,
        showMobileSidebar: action.showMobileSidebar,
      };
    }
    case "TOGGLE_MOBILE_SIDEBAR": {
      return {
        ...state,
        navSize: "large",
        showMobileSidebar: !state.showMobileSidebar,
      };
    }
    default:
      return state;
  }
};

// AdminLayoutProvider
interface Props {
  children: ReactNode;
}

const AdminLayoutProvider = ({ children }: Props) => {
  const initialState: AdminLayoutState = {
    navSize: "large",
    showMobileSidebar: false,
  };

  const [state, dispatch] = useReducer(adminLayoutReducer, initialState);

  return (
    <AdminLayoutContext.Provider value={{ state, dispatch }}>
      {children}
    </AdminLayoutContext.Provider>
  );
};

export default AdminLayoutProvider;
