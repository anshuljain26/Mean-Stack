import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordlistComponent } from './recordlist.component';

describe('RecordlistComponent', () => {
  let component: RecordlistComponent;
  let fixture: ComponentFixture<RecordlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
