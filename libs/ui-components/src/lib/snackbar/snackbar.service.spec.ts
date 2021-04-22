import { SnackbarService } from './snackbar.service';
import {
  TestBed,
  ComponentFixture,
  tick,
  fakeAsync,
} from '@angular/core/testing';

describe('SnackbarService', () => {
  let service: SnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [SnackbarService] });

    service = TestBed.inject(SnackbarService);
  });

  it('#service should return nothing', () => {
    service.subscribe((notifs) => expect(notifs).toBeFalsy());
  });

  it('#open should emit truthy value and service should emit a single notification', () => {
    const mockArg = {
      content: 'Hi',
    };

    service.show(mockArg).subscribe((value) => expect(value).toEqual(true));

    service.subscribe((notifs) => {
      expect(notifs).toBeGreaterThanOrEqual(1);
    });
  });
});
