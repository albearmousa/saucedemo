export type User = {
  username: string;
  password: string;
};

export const users = {
  standard: { username: "standard_user", password: "secret_sauce" },
  invalid: { username: "standard_user", password: "secret_sauces" },
  lockedOutUser: { username: "locked_out_user", password: "secret_sauce" },
  emptyUsernameAndPassword: { username: "", password: "" },
  emptyPassword: { username: "standard_user", password: "" },
  emptyUsername: { username: "", password: "secret_sauce" },
} as const;
