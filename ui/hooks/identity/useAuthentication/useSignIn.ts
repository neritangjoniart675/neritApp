import { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import log from 'loglevel';
import { selectIsSignedIn } from '../../../selectors/identity/authentication';
import { performSignIn } from '../../../store/actions';

export function useSignIn() {
  const dispatch = useDispatch();
  const isSignedIn = useSelector(selectIsSignedIn);
  const signIn = useCallback(async (shouldSignInOverride) => {
    if ((shouldSignInOverride ?? !isSignedIn)) {
      try {
        await dispatch(performSignIn());
      } catch (e) {
        log.error(e instanceof Error ? e.message : JSON.stringify(e));
      }
    }
  }, [dispatch, isSignedIn]);
  return { signIn };
}
