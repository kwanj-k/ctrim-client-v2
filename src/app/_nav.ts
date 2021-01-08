import { INavData } from '@coreui/angular';


export const navItems: INavData[] = [
  {
    name: 'Ctrim',
    url: '',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'Inventory',
    icon: 'icon-layers',
    children: [
      { name: 'Stocks', url: '/stocks', icon: 'icon-file' }
    ]
  },
];
