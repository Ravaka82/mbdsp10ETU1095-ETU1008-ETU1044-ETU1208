import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchangeListProposeComponent } from './echange-list-propose.component';

describe('EchangeListProposeComponent', () => {
  let component: EchangeListProposeComponent;
  let fixture: ComponentFixture<EchangeListProposeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EchangeListProposeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EchangeListProposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
