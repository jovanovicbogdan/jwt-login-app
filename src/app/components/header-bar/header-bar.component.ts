import { Component } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-header-bar',
  standalone: true,
  imports: [ButtonModule, AvatarModule, MenuModule],
  templateUrl: './header-bar.component.html',
  styleUrl: './header-bar.component.scss',
})
export class HeaderBarComponent {
  items: MenuItem[] = [
    {
      label: 'Profile',
      icon: PrimeIcons.USER,
      routerLink: '/profile',
    },
    {
      label: 'Settings',
      icon: PrimeIcons.COG,
      routerLink: '/settings',
    },
    {
      separator: true,
    },
    {
      label: 'Logout',
      icon: PrimeIcons.SIGN_OUT,
      command: () => {
        console.log('Logout');
      },
    },
  ];
}
