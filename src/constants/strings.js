export const strings = {
  appName: "My Application",
  loading: "Loading...",
  error: "Something went wrong",
  cancel: "Cancel",
  auth: {
    login: "로그인",
    login_action: "Log-In",
    email: "이메일",
    type_email: "이메일 주소를 입력해 주세요.",
    password: "비밀번호",
    type_password: "비밀번호를 입력해 주세요.",
  },
};

export const getNestedString = (path) => {
  return path.split(".").reduce((obj, key) => obj?.[key], strings);
};
