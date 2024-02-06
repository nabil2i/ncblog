import { ElementType } from "react";


export interface AdminItem {
  type: string;
  label: string;
  subLabel?: string;
  description?: string;
  children?: Array<AdminItem>;
  href?: string;
  target?: string;
  icon?: ElementType;
}

const ADMIN_ITEMS: Array<AdminItem> =  [
  {
    type: "link",
    label: "Dashboard",
    href: "/dashboard?tab=dash",
    // icon: FiAlignJustify,
  },
  {
    type: "link",
    label: "Users",
    href: "/dashboard?tab=users",
    // icon: FiHome,
  },
  {
    type: "link",
    label: "Posts",
    href: "/dashboard?tab=posts",
    // icon: FiAlignJustify,
    // children: [
    //   {
    //     type: "link",
    //     label: "Genres",
    //     href: "/admin/genres",
    //     // icon: FiHome,
    //   },
    //   {
    //     type: "link",
    //     label: "Categories",
    //     href: "/admin/categories",
    //     // icon: FiHome,
    //   },
    // ]
  },
  {
    type: "link",
    label: "Comments",
    href: "/dashboard?tab=comments",
    // icon: FiAlignJustify,
  },
  // {
  //   type: "link",
  //   label: "Genres",
  //   href: "/dashboard?tab=genres",
  //   // icon: FiHome,
  // },
  // {
  //   type: "link",
  //   label: "Categories",
  //   href: "/dashboard?tab=categories",
  //   // icon: FiHome,
  // },
  {
    type: "link",
    label: "Books",
    href: "/dashboard?tab=books",
    // icon: FiHome,
  },
  {
    type: "link",
    label: "Account",
    href: "/dashboard?tab=profile",
    // icon: FiAlignJustify,
  },
  // {
  //   type: "header",
  //   label: "Main",
  //   children: [
  //     {
  //       type: "link",
  //       label: "Dashboard",
  //       href: "/admin/dashboard",
  //       // href: "/",
  //       icon: FiHome,
  //     },
  //     {
  //       type: "link",
  //       label: "Go to main blog",
  //       href: "/",
  //       icon: FiSmartphone,
  //     },
  //   ]
  // },

  // {
  //   type: "header",
  //   label: "Resources",
  //   children: [
  //     {
  //       type: "link",
  //       label: "Posts",
  //       href: "/dashboard?tab=posts",
  //       icon: FiAlignJustify,
  //     },
  //     // {
  //     //   type: "link",
  //     //   label: "Books",
  //     //   href: "/admin/books",
  //     //   icon: FiBook,
  //     // },
  //     // {
  //     //   type: "link",
  //     //   label: "Genres",
  //     //   href: "/admin/genres",
  //     //   icon: FiHome,
  //     // },
  //     // {
  //     //   type: "link",
  //     //   label: "Categories",
  //     //   href: "/admin/categories",
  //     //   icon: FiHome,
  //     // },
  //     // {
  //     //   type: "link",
  //     //   label: "Authors",
  //     //   href: "/admin/authors",
  //     //   icon: FiUserPlus,
  //     // },
  //     // {
  //     //   type: "link",
  //     //   label: "Users",
  //     //   href: "/admin/users",
  //     //   icon: FiUser,
  //     // },
  //     // {
  //     //   type: "link",
  //     //   label: "Settings",
  //     //   href: "/admin/settings",
  //     //   icon: FiSettings,
  //     // },

  //   ]
  // },
  // {
  //   type: "header",
  //   label: "Account",
  // },
];

export default ADMIN_ITEMS;
