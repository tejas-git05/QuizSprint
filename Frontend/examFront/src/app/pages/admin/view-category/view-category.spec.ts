import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCategory } from './view-category';

describe('ViewCategory', () => {
  let component: ViewCategory;
  let fixture: ComponentFixture<ViewCategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCategory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCategory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
