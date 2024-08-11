import { Component, OnInit } from '@angular/core';
import { EchangeService } from '../services/echange.service';
import { Echange } from '../echange/echange.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-echange-list',
  standalone: true,
  imports: [RouterModule, CommonModule, BrowserModule],
  templateUrl: './echange-list.component.html',
  styleUrl: './echange-list.component.css'
})
export class EchangeListComponent implements OnInit {
  echanges: Echange[] = [];

  constructor(private echangeService: EchangeService) { }

  ngOnInit(): void {
    this.echangeService.getAllEchanges().subscribe(data => {
      this.echanges = data;
    });
  }
}
