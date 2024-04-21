import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { UserModel } from '../../models/UserModel';

@Component({
  selector: 'app-customer-card',
  standalone: true,
  imports: [CardModule, ButtonModule, BadgeModule],
  templateUrl: './customer-card.component.html',
  styleUrl: './customer-card.component.scss',
})
export class CustomerCardComponent {
  @Input()
  user: UserModel = {};
}
