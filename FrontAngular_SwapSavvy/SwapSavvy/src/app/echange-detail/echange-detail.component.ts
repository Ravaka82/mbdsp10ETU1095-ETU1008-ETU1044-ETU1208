import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EchangeService } from '../services/echange.service';
import { Echange } from '../echange/echange.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-echange-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './echange-detail.component.html',
  styleUrl: './echange-detail.component.css'
})
export class EchangeDetailComponent implements OnInit {
  echange: Echange | undefined;

  constructor(
    private route: ActivatedRoute,
    private echangeService: EchangeService
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.echangeService.getEchangeById(id).subscribe(data => {
      this.echange = data;
    });
  }

  accepterEchange(): void {
    if (this.echange) {
      this.echange.statut = 'Accepté';
      this.echangeService.updateEchange(this.echange.id, this.echange).subscribe(() => {
        alert('Échange accepté');
      });
    }
  }

  refuserEchange(): void {
    if (this.echange) {
      this.echange.statut = 'Refusé';
      this.echangeService.updateEchange(this.echange.id, this.echange).subscribe(() => {
        alert('Échange refusé');
      });
    }
  }
}
