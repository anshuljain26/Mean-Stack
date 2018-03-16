import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchdetailComponent } from './searchdetail.component';

describe('SearchdetailComponent', () => {
  let component: SearchdetailComponent;
  let fixture: ComponentFixture<SearchdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
