import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteFriendComponent } from './modal-delete-friend.component';

describe('ModalDeleteFriendComponent', () => {
  let component: ModalDeleteFriendComponent;
  let fixture: ComponentFixture<ModalDeleteFriendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDeleteFriendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeleteFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
