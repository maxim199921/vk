import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToFriendModalComponent } from './add-to-friend-modal.component';

describe('AddToFriendModalComponent', () => {
  let component: AddToFriendModalComponent;
  let fixture: ComponentFixture<AddToFriendModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToFriendModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToFriendModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
