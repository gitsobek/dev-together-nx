import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthFacade, User } from '@dev-together/auth';
import { ArticleQuery, BlogFacade } from '@dev-together/blog';
import { FormsFacade } from '@dev-together/forms';
import { tapOnce } from '@dev-together/shared';
import { Observable, Subject, combineLatest, EMPTY, of } from 'rxjs';
import { map, takeUntil, filter, tap, withLatestFrom, switchMap } from 'rxjs/operators';
import { ProfileFacade } from '../+state/profile.facade';
import { Profile } from '../+state/profile.models';

@Component({
  selector: 'dev-together-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  profile$: Observable<Profile>;
  currentUser$: Observable<User>;
  query$: Observable<ArticleQuery>;
  isBlogLoading$: Observable<boolean>;
  totalPages$: Observable<number>;

  formGroup: FormGroup;
  isCurrentUser: boolean = false;
  update$: Subject<void> = new Subject();
  unsubscribe$: Subject<void> = new Subject();

  constructor(
    private profileFacade: ProfileFacade,
    private blogFacade: BlogFacade,
    private formsFacade: FormsFacade,
    private authFacade: AuthFacade
  ) {}

  ngOnInit() {
    this.profile$ = this.profileFacade.profile$;
    this.currentUser$ = this.authFacade.user$;

    this.query$ = this.blogFacade.query$;
    this.isBlogLoading$ = this.blogFacade.isLoading$;
    this.totalPages$ = this.blogFacade.totalPages$;

    combineLatest([this.profile$, this.currentUser$])
      .pipe(
        filter(([_, u]) => !!u),
        map(([p, u]) => ({
          isCurrentUser: p.username === u.username,
          profile: p,
        })),
        switchMap(({ isCurrentUser, profile }) => {
          this.isCurrentUser = isCurrentUser;

          if (isCurrentUser) {
            this.formGroup = new FormGroup({
              image: new FormControl(
                profile?.image === '/assets/no-user.png' ? '' : profile?.image
              ),
              bio: new FormControl(profile?.bio),
            });

            return this.listenForChanges();
          }

          return of([null, null])
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(([data, form]) => {
        form && this.formsFacade.setData(form);
        data && this.profileFacade.updateProfile();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();

    this.profileFacade.initializeProfile();
  }

  follow(id: string): void {
    this.profileFacade.setFollow(id);
  }

  onPageSelect(pageNo: number): void {
    this.blogFacade.setPage(pageNo);
  }

  logout(): void {
    this.authFacade.logout();
  }

  updateField(): void {
    this.update$.next();
  }

  private listenForChanges(): Observable<any[]> {
    return this.update$
      .pipe(
        withLatestFrom(this.formsFacade.data$, this.formGroup.valueChanges),
        map(([_, data, form]) => [data, form]),
        filter(([data, form]) => {
          const dArr = Object.values(data);
          const fArr = Object.values(form);

          return !(
            dArr.length === fArr.length &&
            dArr.every((val, idx) => val === fArr[idx])
          );
        }),
      );
  }
}
