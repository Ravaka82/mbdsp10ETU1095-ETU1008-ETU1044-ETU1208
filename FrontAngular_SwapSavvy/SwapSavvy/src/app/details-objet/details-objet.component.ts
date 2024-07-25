import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ObjetService } from '../services/objet.service';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-details-objet',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './details-objet.component.html',
  styleUrl: './details-objet.component.css'
})
export class DetailsObjetComponent implements OnInit{
  detailsObjet!: any | undefined;

  constructor(private ObjetService: ObjetService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.ObjetService.getObjetById(id)
      .subscribe(objet => {
        this.detailsObjet = objet;
      });

  }
}
