import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class Sidebar {
  isCollapsed = false;

  menuItems = [
    { icon: '🏠', label: 'Dashboard', route: '/products' },
    { icon: '📦', label: 'Products', route: '/products' },
    { icon: '➕', label: 'Add Product', route: '/products/create' },
  ];

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
