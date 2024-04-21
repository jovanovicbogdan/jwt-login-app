import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { UserModel } from '../../models/UserModel';

@Component({
  selector: 'app-manage-user',
  standalone: true,
  imports: [CommonModule, InputTextModule, ButtonModule],
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.scss',
})
export class ManageUserComponent {
  @Input()
  operation: 'create' | 'update' = 'create';
  @Input()
  user: UserModel = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
  };
  @Output()
  sidebarClosed = new EventEmitter<void>();

  closeSidebar() {
    this.sidebarClosed.emit();
  }
}
