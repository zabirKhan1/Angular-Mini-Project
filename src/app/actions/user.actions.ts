import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Y Users': emptyProps(),
    'Y Users Success': props<{ data: unknown }>(),
    'Y Users Failure': props<{ error: unknown }>(),
  }
});
