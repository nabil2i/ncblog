import { ElementType } from "react";
import { FiBook, FiHome, FiSettings, FiSmartphone, FiAlignJustify, FiUser, FiUserPlus } from "react-icons/fi";


export interface AdminNavItem {
  type: string;
  label: string;
  description?: string;
  children?: Array<AdminNavItem>;
  href?: string;
  target?: string;
  icon?: ElementType;
}

const ADMIN_NAV_ITEMS: Array<AdminNavItem> =  [

  {
    type: "header",
    label: "Main",
  },
  {
    type: "link",
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: FiHome,
  },
  // {
  //   type: "link",
  //   label: "Go to main blog",
  //   href: "/",
  //   icon: FiSmartphone,
  // },

  {
    type: "header",
    label: "Resources",
  },
  {
    type: "link",
    label: "Posts",
    href: "/admin/posts",
    icon: FiAlignJustify,
  },
  // {
  //   type: "link",
  //   label: "Books",
  //   href: "/admin/books",
  //   icon: FiBook,
  // },
  // {
  //   type: "link",
  //   label: "Genres",
  //   href: "/admin/genres",
  //   icon: FiHome,
  // },
  // {
  //   type: "link",
  //   label: "Categories",
  //   href: "/admin/categories",
  //   icon: FiHome,
  // },
  // {
  //   type: "link",
  //   label: "Authors",
  //   href: "/admin/authors",
  //   icon: FiUserPlus,
  // },
  // {
  //   type: "link",
  //   label: "Users",
  //   href: "/admin/users",
  //   icon: FiUser,
  // },
  // {
  //   type: "link",
  //   label: "Settings",
  //   href: "/admin/settings",
  //   icon: FiSettings,
  // },

  {
    type: "header",
    label: "Account",
  },
  

];

export default ADMIN_NAV_ITEMS;
