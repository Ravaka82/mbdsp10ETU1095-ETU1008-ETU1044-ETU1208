import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueEchangeComponent } from './historique-echange.component';

describe('HistoriqueEchangeComponent', () => {
  let component: HistoriqueEchangeComponent;
  let fixture: ComponentFixture<HistoriqueEchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriqueEchangeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoriqueEchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
