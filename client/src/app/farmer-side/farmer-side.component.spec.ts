import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerSideComponent } from './farmer-side.component';

describe('FarmerSideComponent', () => {
  let component: FarmerSideComponent;
  let fixture: ComponentFixture<FarmerSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmerSideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
