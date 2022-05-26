import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebmasterComponent } from './webmaster.component';

describe('WebmasterComponent', () => {
  let component: WebmasterComponent;
  let fixture: ComponentFixture<WebmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebmasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
