import { Component } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [CommonModule, MenuItemComponent, AvatarModule],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.scss',
})
export class MenuBarComponent {
  menuItems: MenuItem[] = [
    {
      label: 'Home',
      icon: PrimeIcons.HOME,
      routerLink: '/',
    },
    {
      label: 'Users',
      icon: PrimeIcons.USERS,
      routerLink: '/about',
    },
    {
      label: 'Settings',
      icon: PrimeIcons.COG,
      routerLink: '/settings',
    },
  ];
}
