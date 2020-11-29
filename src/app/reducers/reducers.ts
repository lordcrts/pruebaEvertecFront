import { ActionReducerMap, createSelector, createFeatureSelector, ActionReducer, MetaReducer } from '@ngrx/store';


import * as fromRouter from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';


import * as fromAuth from '../login/reducers/auth.reducer'
import { environment } from 'src/environments/environment';
import { RouterStateUrl } from '../@core/shared/utils';

export interface State {
    auth: fromAuth.State,
    router: fromRouter.RouterReducerState<RouterStateUrl>;
}


export const reducer: ActionReducerMap<State | any> = {
    auth: fromAuth.AuthReducer,
    router: fromRouter.routerReducer
}


export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
    return function (state: State, action: any): State {
        console.log('state', state);

        console.log('action', action);
        return reducer(state, action);
    }
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [logger, storeFreeze] : [];

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');

export const getAuth = createSelector(
    getAuthState,
    fromAuth.getAuthState
)

export const getAuthError = createSelector(
    getAuthState,
    fromAuth.getAuthError
)