import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeleteParticipationComponent } from './add-delete-participation-component.component';

describe('AddDeleteParticipationComponentComponent', () => {
  let component: AddDeleteParticipationComponent;
  let fixture: ComponentFixture<AddDeleteParticipationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDeleteParticipationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeleteParticipationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
