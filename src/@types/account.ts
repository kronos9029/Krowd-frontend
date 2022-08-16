// ----------------------------------------------------------------------

export type User = {
  id: string;
  displayName: string;
  email: string;
  password: string;
  photoURL: File | any;
  phoneNumber: string | null;
  address: string | null;
  about: string | null;
};
