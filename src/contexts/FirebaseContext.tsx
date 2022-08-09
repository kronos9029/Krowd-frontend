/* eslint-disable import/no-duplicates */
import { createContext, ReactNode, useEffect, useReducer, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
// @types
import { ActionMap, AuthState, AuthUser, FirebaseContextType } from '../@types/authentication';
//
import { firebaseConfig } from '../config';

// ----------------------------------------------------------------------

const ADMIN_EMAILS = ['datdam2407@gmail.com'];

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.firestore();
}

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  errorLoginMessage: null
};

enum Types {
  Initial = 'INITIALISE'
}
enum FirebaseErrorType {
  USER_NOT_FOUND = 'auth/user-not-found',
  IS_NOT_VERIFIED_EMAIL = 'auth/is_not_verified_email'
}
type FirebaseAuthPayload = {
  [Types.Initial]: {
    isAuthenticated: boolean;
    user: AuthUser;
    errorLoginMessage: string | null;
  };
};

type FirebaseActions = ActionMap<FirebaseAuthPayload>[keyof ActionMap<FirebaseAuthPayload>];

const reducer = (state: AuthState, action: FirebaseActions) => {
  if (action.type === 'INITIALISE') {
    const { isAuthenticated, user, errorLoginMessage } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
      errorLoginMessage
    };
  }

  return state;
};

const AuthContext = createContext<FirebaseContextType | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<firebase.firestore.DocumentData | undefined>();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(
    () =>
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const docRef = firebase.firestore().collection('business').doc(user.uid);
          docRef
            .get()
            .then((doc) => {
              if (doc.exists) {
                setProfile(doc.data());
              }
            })
            .catch((error) => {
              console.error(error);
            });
          dispatch({
            type: Types.Initial,
            payload: { isAuthenticated: true, user, errorLoginMessage: null }
          });
        } else {
          dispatch({
            type: Types.Initial,
            payload: { isAuthenticated: false, user: null, errorLoginMessage: null }
          });
        }
      }),
    [dispatch]
  );
  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case FirebaseErrorType.USER_NOT_FOUND:
        return 'Tài khoản không tồn tại';
      case FirebaseErrorType.IS_NOT_VERIFIED_EMAIL:
        return 'Email chưa được xác nhận, vui lòng xác nhận qua email đã đăng ký';
      default:
        return null;
    }
  };
  const login = (email: string, password: string) =>
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCreditial) => {
        console.log(userCreditial.user?.emailVerified);
        if (userCreditial.user!.emailVerified === false) {
          const errorMessage = getErrorMessage(FirebaseErrorType.IS_NOT_VERIFIED_EMAIL);
          dispatch({
            type: Types.Initial,
            payload: { isAuthenticated: false, user: null, errorLoginMessage: errorMessage }
          });
          return null;
        }
        return userCreditial;
      })
      .catch((e) => {
        const errorMessage = getErrorMessage(e.code);
        dispatch({
          type: Types.Initial,
          payload: { isAuthenticated: false, user: null, errorLoginMessage: errorMessage }
        });
        return null;
      });
  const loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  };

  const loginWithFaceBook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  };

  const loginWithTwitter = () => {
    const provider = new firebase.auth.TwitterAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  };
  const loginWithPhone = () => {
    const provider = new firebase.auth.PhoneAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  };

  const register = (email: string, password: string) =>
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((value) => value.user?.sendEmailVerification())
      .then(() => logout());

  const logout = async () => {
    await firebase.auth().signOut();
  };

  const resetPassword = async (email: string) => {
    await firebase.auth().sendPasswordResetEmail(email);
  };

  const auth = state.user ? { ...state.user } : null;
  const { errorLoginMessage } = state;
  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'firebase',
        user: auth
          ? {
              id: auth.uid,
              email: auth.email,
              photoURL: auth.photoURL || profile?.photoURL,
              displayName: auth.displayName || profile?.displayName,
              role: ADMIN_EMAILS.includes(auth.email),
              phoneNumber: auth.phoneNumber || profile?.phoneNumber || '',
              country: profile?.country || '',
              address: profile?.address || ''
            }
          : null,
        login,
        register,
        loginWithGoogle,
        loginWithPhone,
        loginWithFaceBook,
        loginWithTwitter,
        logout,
        resetPassword,
        updateProfile: () => {},
        errorLoginMessage: errorLoginMessage
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
