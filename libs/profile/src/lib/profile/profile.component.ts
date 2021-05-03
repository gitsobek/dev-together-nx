import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthFacade, User } from '@dev-together/auth';
import { ArticleQuery, BlogFacade } from '@dev-together/blog';
import { FormsFacade } from '@dev-together/forms';
import { Observable, Subject, combineLatest } from 'rxjs';
import {
  map,
  takeUntil,
  filter,
  tap,
  withLatestFrom,
  pairwise,
} from 'rxjs/operators';
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
        takeUntil(this.unsubscribe$)
      )
      .subscribe(({ isCurrentUser, profile }) => {
        this.isCurrentUser = isCurrentUser;

        if (isCurrentUser) {
          this.formGroup = new FormGroup({
            image: new FormControl(
              profile?.image === '/assets/no-user.png' ? '' : profile?.image
            ),
            bio: new FormControl(profile?.bio),
          });

          this.listenForChanges();
        }
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

  private listenForChanges(): void {
    this.update$
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
        takeUntil(this.unsubscribe$)
      )
      .subscribe(([_, form]) => {
        this.formsFacade.setData(form);
        this.profileFacade.updateProfile();
      });
  }
}
