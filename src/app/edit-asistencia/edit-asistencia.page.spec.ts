import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditAsistenciaPage } from './edit-asistencia.page';

describe('EditAsistenciaPage', () => {
  let component: EditAsistenciaPage;
  let fixture: ComponentFixture<EditAsistenciaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditAsistenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
