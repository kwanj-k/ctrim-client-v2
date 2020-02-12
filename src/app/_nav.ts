import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Ctrim',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'Actions',
    icon: 'icon-settings',
    children: [
      { name: 'Stocks', url: '/stocks', icon: 'icon-layers' }
    ]
  },
];
