import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSelectCharacterComponent } from './modal-select-character.component';

describe('ModalSelectCharacterComponent', () => {
  let component: ModalSelectCharacterComponent;
  let fixture: ComponentFixture<ModalSelectCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalSelectCharacterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalSelectCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
