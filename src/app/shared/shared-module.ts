import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Sidebar } from './sidebar/sidebar';
import { Footer } from './footer/footer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    Navbar,
    Sidebar,
    Footer
  ],
  exports: [
    Navbar,
    Sidebar,
    Footer
  ]
})
export class SharedModule { }
