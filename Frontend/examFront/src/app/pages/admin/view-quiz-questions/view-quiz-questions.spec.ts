import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuizQuestions } from './view-quiz-questions';

describe('ViewQuizQuestions', () => {
  let component: ViewQuizQuestions;
  let fixture: ComponentFixture<ViewQuizQuestions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewQuizQuestions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewQuizQuestions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
