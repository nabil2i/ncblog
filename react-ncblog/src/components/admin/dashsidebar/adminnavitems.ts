import { ElementType } from "react";
import { BsFilePost } from "react-icons/bs";
import { FiAlignJustify, FiMessageSquare, FiSave, FiUsers } from "react-icons/fi";
import { HiAnnotation, HiOutlineAnnotation, HiOutlineDocument, HiOutlineDocumentText, HiOutlineUserGroup } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";

export interface AdminNavItem {
  type: string;
  label: string;
  description?: string;
  children?: Array<AdminNavItem>;
  href?: string;
  target?: string;
  icon?: ElementType;
  tab?: string;
}

const ADMIN_NAV_ITEMS: Array<AdminNavItem> =  [

  {
    type: "header",
    label: "Main",
  },
  // {
  //   type: "link",
  //   label: "Dashboard",
  //   href: "/admin/dashboard",
  //   // href: "/",
  //   icon: FiHome,
  // },
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
    label: "Dashboard",
    href: "/dashboard?tab=dash",
    icon: MdOutlineDashboard,
    tab: "dash"
  },
  {
    type: "link",
    label: "Posts",
    href: "/dashboard?tab=posts",
    icon: HiOutlineDocumentText,
    tab: "posts"
  },
  {
    type: "link",
    label: "Users",
    href: "/dashboard?tab=users",
    icon: HiOutlineUserGroup,
    tab: "users"
  },
  {
    type: "link",
    label: "Comments",
    href: "/dashboard?tab=comments",
    icon: HiOutlineAnnotation,
    // icon: FiMessageSquare,
    tab: "comments"
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
