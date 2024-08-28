import { ElementType } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

export interface SocialItem {
  label: string;
  href: string;
  icon: ElementType;
}

const SOCIAL_ITEMS: Array<SocialItem> = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100092339263574&sk=followers",
    icon: FaFacebook,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/nabilconveys/",
    icon: FaInstagram,
  },
  {
    label: "X/Twitter",
    href: "https://twitter.com/nabilconveys",
    icon: FaTwitter,
  },
  {
    label: "youtube",
    href: "https://www.youtube.com/@NabilConveys",
    icon: FaYoutube,
  },
  {
    label: "Whatsapp",
    href: "https://www.whatsapp.com/channel/0029Vae69rT9cDDSzzAdo10K",
    icon: FaWhatsapp,
  },
  // {
  //   label: "Whatsapp",
  //   href: "https://whatsapp.com/channel/0029Va4PVWkLNSZwUOVJbA2X",
  //   icon: FaWhatsapp,
  // },
];

export default SOCIAL_ITEMS;
