import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlbumDeleteModalComponent } from './album-delete-modal.component';

describe('AlbumDeleteModalComponent', () => {
  let component: AlbumDeleteModalComponent;
  let fixture: ComponentFixture<AlbumDeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumDeleteModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
