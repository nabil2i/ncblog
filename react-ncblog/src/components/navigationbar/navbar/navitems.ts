export interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
  target?: string;
}

const NAV_ITEMS: Array<NavItem> =  [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Blog',
    href: '/blog',
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@NabilConveys',
    target: '_blank',
  },
  {
    
    label: 'Quran',
    children: [
      {
        label: 'The Noble Quran',
        subLabel: 'Read and listen to the Quran',
        href: 'https://quran.com/',
        target: '_blank',
      },
      {
        label: 'Blessed Tilawat',
        subLabel: 'Listen to the Quran',
        href: 'https://www.youtube.com/@BlessedTilawat',
        target: '_blank',
      },
    ],
  },
  // {
  //   label: 'Dawah',
  //   children: [
  //     {
  //       label: 'Job Board',
  //       subLabel: 'Find your dream design job',
  //       href: '#',
  //     },
  //     {
  //       label: 'Freelance Projects',
  //       subLabel: 'An exclusive list for contract work',
  //       href: '#',
  //     },
  //   ],
  // },
  
];

export default NAV_ITEMS;
