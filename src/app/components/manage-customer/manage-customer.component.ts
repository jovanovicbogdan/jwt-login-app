import { Component, EventEmitter, Output } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-manage-customer',
  standalone: true,
  imports: [InputTextModule, ButtonModule],
  templateUrl: './manage-customer.component.html',
  styleUrl: './manage-customer.component.scss',
})
export class ManageCustomerComponent {
  @Output()
  sidebarClosed = new EventEmitter<void>();

  closeSidebar() {
    this.sidebarClosed.emit();
  }
}
