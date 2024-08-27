import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjetListComponent } from './objet-list.component';

describe('ObjectListComponent', () => {
  let component: ObjetListComponent;
  let fixture: ComponentFixture<ObjetListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjetListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
