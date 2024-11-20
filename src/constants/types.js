export const ROLES = {
  ADMIN: "Admin",
  REGULAR: "RegularUser",
  PRIME: "PrimeUser",
  VIEWER: "Viewer",
};

const DATE_PATTERN = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
const DIGIT_PATTERN = /^[0-9]+$/;
const PHONE_PATTERN = /^01([0|1|6|7|8|9])-?([0-9]{4})-?([0-9]{4})$/;
const ADDRESS_PATTERN = /^[가-힣a-zA-Z0-9\s,.-]+$/;
const LETTERS_PATTERN = /[가-힣a-zA-Z]/;

export {
  DATE_PATTERN,
  DIGIT_PATTERN,
  PHONE_PATTERN,
  ADDRESS_PATTERN,
  LETTERS_PATTERN,
};
