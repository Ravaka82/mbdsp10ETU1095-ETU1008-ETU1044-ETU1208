import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceuilAdminComponent } from './acceuil-admin.component';

describe('AcceuilAdminComponent', () => {
  let component: AcceuilAdminComponent;
  let fixture: ComponentFixture<AcceuilAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcceuilAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcceuilAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
