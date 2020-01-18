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
      { name: 'Add store', url: '/features', icon: 'icon-plus' }, 
      { name: 'Take stock', url: '/group-data', icon: 'icon-plus' }
  ]
  }
];
