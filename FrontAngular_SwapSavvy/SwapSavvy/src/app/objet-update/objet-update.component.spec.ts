import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjetUpdateComponent } from './objet-update.component';

describe('ObjetUpdateComponent', () => {
  let component: ObjetUpdateComponent;
  let fixture: ComponentFixture<ObjetUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjetUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ObjetUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
