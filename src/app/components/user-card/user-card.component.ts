import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { UserModel } from '../../models/UserModel';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CardModule, ButtonModule, BadgeModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input()
  user: UserModel = {};
  @Output()
  update = new EventEmitter<UserModel>();

  emitUpdate() {
    this.update.emit(this.user);
  }
}
