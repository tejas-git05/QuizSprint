import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Instructions } from './instructions';

describe('Instructions', () => {
  let component: Instructions;
  let fixture: ComponentFixture<Instructions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Instructions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Instructions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
