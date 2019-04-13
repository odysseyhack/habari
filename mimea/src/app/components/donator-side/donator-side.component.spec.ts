import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonatorSideComponent } from './donator-side.component';

describe('DonatorSideComponent', () => {
  let component: DonatorSideComponent;
  let fixture: ComponentFixture<DonatorSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonatorSideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonatorSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
