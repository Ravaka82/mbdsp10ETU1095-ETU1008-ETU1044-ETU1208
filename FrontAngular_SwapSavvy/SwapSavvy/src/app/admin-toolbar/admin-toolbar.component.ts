import { Component,OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-toolbar',
  standalone: true,
  imports: [MatToolbarModule,RouterModule],
  templateUrl: './admin-toolbar.component.html',
  styleUrl: './admin-toolbar.component.css'
})
export class AdminToolbarComponent implements OnInit{
  localStorageData: any = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const data = localStorage.getItem('userEmail');
    this.localStorageData =data;
  }

  logout(): void {
    localStorage.removeItem('userEmail');
    this.router.navigate(['/signin']);
  }
}
