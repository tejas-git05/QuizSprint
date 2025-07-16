import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadQuiz } from './load-quiz';

describe('LoadQuiz', () => {
  let component: LoadQuiz;
  let fixture: ComponentFixture<LoadQuiz>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadQuiz]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadQuiz);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
