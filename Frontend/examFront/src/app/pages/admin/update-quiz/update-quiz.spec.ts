import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateQuiz } from './update-quiz';

describe('UpdateQuiz', () => {
  let component: UpdateQuiz;
  let fixture: ComponentFixture<UpdateQuiz>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateQuiz]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateQuiz);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
