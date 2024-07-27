import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsObjetComponent } from './details-objet.component';

describe('DetailsObjetComponent', () => {
  let component: DetailsObjetComponent;
  let fixture: ComponentFixture<DetailsObjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsObjetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsObjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
