import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as FormsActions from './forms.actions';
import { map } from 'rxjs/operators';

@Injectable()
export class FormsEffects {
    setData$ = createEffect(() =>
        this.action$.pipe(
            ofType(FormsActions.setData, FormsActions.updateData),
            map(_ => FormsActions.initializeErrors())
        )
    );

    constructor(private action$: Actions) {}
}