import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseProfileComponent } from './browse-profile.component';

describe('BrowseProfileComponent', () => {
  let component: BrowseProfileComponent;
  let fixture: ComponentFixture<BrowseProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BrowseProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowseProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
