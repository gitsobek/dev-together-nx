import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { AuthFacade } from '@dev-together/auth';
import { BlogFacade } from '@dev-together/blog';
import { UiComponentsModule } from '@dev-together/ui-components';
import { ProfileFacade } from '../+state/profile.facade';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { ProfileComponent } from './profile.component';
import { ChangeDetectionStrategy, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsFacade } from '@dev-together/forms';
import { BlogListComponent } from 'libs/blog/src/lib/blog-list/blog-list.component';
import { BehaviorSubject, Subject } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

class MockProfileFacade {
  profile$ = new BehaviorSubject({
    id: '2',
    username: 'Not Jan Kowalski',
    bio: 'this is not my bio',
    image: 'https://myimage.com',
    following: false,
    joinedAt: '2021-04-10T17:46:58.853Z',
  });

  setFollow(id: string) {
    const profile = this.profile$.getValue();
    this.profile$.next({ ...profile, following: !profile.following });
  }

  updateProfile() {
    const profile = this.profile$.getValue();
    this.profile$.next({ ...profile, image: 'https://mycoolimage.com' });
  }

  initializeProfile() {}
}

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  let profileFacade: ProfileFacade;
  let authFacade: AuthFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiComponentsModule, ReactiveFormsModule],
      declarations: [ProfileComponent, BlogListComponent],
      providers: [
        {
          provide: ProfileFacade,
          useClass: MockProfileFacade,
        },
        {
          provide: BlogFacade,
          useValue: {},
        },
        {
          provide: AuthFacade,
          useValue: {
            logout: jest.fn(),
          },
        },
        {
          provide: FormsFacade,
          useValue: {
            data$: cold('a', { a: {} }),
            setData: jest.fn()
          },
        },
      ],
    })
      .overrideComponent(ProfileComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    profileFacade = TestBed.inject(ProfileFacade);
    authFacade = TestBed.inject(AuthFacade);

    spyOn(profileFacade, 'setFollow').and.callThrough();
    spyOn(authFacade, 'logout').and.callThrough();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;

    spyOn(component, 'logout');
  });

  it('should call follow user method on follow icon click and change text', () => {
    authFacade.user$ = cold('a', {
      a: {
        id: '1',
        username: 'Jan Kowalski',
        bio: 'this is my bio',
        image: 'https://myimage.com',
        following: false,
        joinedAt: '2021-04-10T17:46:58.853Z',
        token: 'aaa',
        email: 'aaa@aaa.pl',
      },
    });
    fixture.detectChanges();

    getTestScheduler().flush();
    fixture.detectChanges();

    const profile: DebugElement = fixture.debugElement;
    const actionButton: DebugElement = profile.query(By.css('.action-btn'));
    const icon: HTMLElement = actionButton.query(By.css('i')).nativeElement;
    const text: HTMLSpanElement = actionButton.query(By.css('span'))
      .nativeElement;

    expect(text.innerHTML).toBe('Follow');

    icon.click();
    fixture.detectChanges();

    expect(profileFacade.setFollow).toHaveBeenCalledWith('2');
    expect(text.innerHTML).toBe('Unfollow');
  });

  it('image section should turn into edit mode on double click and change on input', () => {
    authFacade.user$ = cold('a', {
      a: {
        id: '2',
        username: 'Not Jan Kowalski',
        bio: 'this is not my bio',
        image: 'https://myimage.com',
        following: false,
        joinedAt: '2021-04-10T17:46:58.853Z',
        token: 'aaa',
        email: 'aaa@aaa.pl',
      },
    });

    fixture.detectChanges();

    getTestScheduler().flush();
    fixture.detectChanges();

    const profile: DebugElement = fixture.debugElement;
    let editableImage: DebugElement = profile.query(
      By.css('dev-together-editable')
    );

    const image: HTMLImageElement = editableImage.query(By.css('img'))
      .nativeElement;
    expect(image.src).toBe('https://myimage.com/');

    editableImage.nativeElement.dispatchEvent(new MouseEvent('dblclick'));
    fixture.detectChanges();

    editableImage = profile.query(By.css('dev-together-editable'));

    const input: HTMLInputElement = editableImage.query(By.css('input'))
      .nativeElement;
    input.value = 'https://mycoolimage.com';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    /* Non-related element used to switch back to view mode */
    const headerTxt: HTMLElement = profile.query(By.css('header > .info'))
      .nativeElement;
    headerTxt.click();

    getTestScheduler().flush();
    fixture.detectChanges();

    component.profile$.subscribe(p => {
      expect(p.image).toBe('https://mycoolimage.com/')
      expect(component.updateField).toHaveBeenCalled();
    });
  });

  it('should logout', () => {
    authFacade.user$ = cold('a', {
      a: {
        id: '2',
        username: 'Not Jan Kowalski',
        bio: 'this is not my bio',
        image: 'https://myimage.com',
        following: false,
        joinedAt: '2021-04-10T17:46:58.853Z',
        token: 'aaa',
        email: 'aaa@aaa.pl',
      },
    });

    fixture.detectChanges();

    getTestScheduler().flush();
    fixture.detectChanges();

    const profile: DebugElement = fixture.debugElement;
    const logout: DebugElement = profile.query(
      By.css('.settings .user-action:last-of-type')
    );

    const logoutBtn: HTMLElement = logout.nativeElement;
    logoutBtn.click();
    
    fixture.detectChanges();
    expect(component.logout).toHaveBeenCalled();
  });
});
