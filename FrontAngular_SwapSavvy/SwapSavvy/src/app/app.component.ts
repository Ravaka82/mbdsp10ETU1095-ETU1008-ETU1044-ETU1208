import { Component,OnInit } from '@angular/core';
import { RouterOutlet,NavigationEnd } from '@angular/router';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule,Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminToolbarComponent } from './admin-toolbar/admin-toolbar.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet,ToolbarComponent,SidebarComponent,RouterModule,AdminToolbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'SwapSavvy';

  isAdminRoute: boolean = false;
  isHomeRoute: boolean=false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isAdminRoute = this.router.url.includes('/LoginAdmin');
        this.isHomeRoute = this.router.url.includes('/AccueilAdmin');
      }
    });
  }
}
