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
interface setOnCloseMain {
  type: "SET_ON_CLOSE_MAIN";
  onCloseMain: () => void;
}
interface setOnToggle {
  type: "SET_ON_TOGGLE";
  onToggle: () => void;
}
interface setIsOpen {
  type: "SET_IS_OPEN";
  isOpen: boolean;
}

interface toggleMobileSidebar {
  type: "TOGGLE_MOBILE_SIDEBAR";
}

export type AdminLayoutAction =
  | setNavSize
  | setShowMobileSidebar
  | changeNavSize
  | setOnCloseMain
  | setIsOpen
  | setOnToggle
  | toggleMobileSidebar;

export interface AdminLayoutState {
  navSize: string;
  showMobileSidebar: boolean;
  onCloseMain: () => void;
  onToggle: () => void;
  isOpen: boolean;
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
    case "SET_ON_CLOSE_MAIN": {
      return {
        ...state,
        onCloseMain: action.onCloseMain
      };
    }
    case "SET_IS_OPEN": {
      return {
        ...state,
        isOpen: action.isOpen
      };
    }
    case "SET_ON_TOGGLE": {
      return {
        ...state,
        onToggle: action.onToggle
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
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onCloseMain: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onToggle: () => {},
    isOpen: true
  };

  const [state, dispatch] = useReducer(adminLayoutReducer, initialState);

  return (
    <AdminLayoutContext.Provider value={{ state, dispatch }}>
      {children}
    </AdminLayoutContext.Provider>
  );
};

export default AdminLayoutProvider;
