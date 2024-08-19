import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchangeEditComponent } from './echange-edit.component';

describe('EchangeEditComponent', () => {
  let component: EchangeEditComponent;
  let fixture: ComponentFixture<EchangeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EchangeEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EchangeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
