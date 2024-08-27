import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRechercheSimpleComponent } from './list-recherche-simple.component';

describe('ListRechercheSimpleComponent', () => {
  let component: ListRechercheSimpleComponent;
  let fixture: ComponentFixture<ListRechercheSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListRechercheSimpleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListRechercheSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
