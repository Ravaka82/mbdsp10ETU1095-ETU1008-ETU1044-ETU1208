import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheAvanceObjetComponent } from './recherche-avance-objet.component';

describe('RechercheAvanceObjetComponent', () => {
  let component: RechercheAvanceObjetComponent;
  let fixture: ComponentFixture<RechercheAvanceObjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RechercheAvanceObjetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RechercheAvanceObjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
