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
    error: "Invalid credentials",
  },
  user_list: "User List",
  users: {
    user_name: "User Name",
    user_phone: "User Phone",
    user_email: "User Email",
    user_roles: "사용자 권한",
    user_role: "User Role",
    created_at: "Created At",
    last_logged_in: "Last logged in",
  },
  task_list: "Task List",
  tasks: {
    task_name: "Task Name",
    task_type: "Task Type",
    created_at: "Created At",
    due_date: "Due Date",
    reporter: "Reporter",
    description: "Description",
    assignee: "담당자 (Assignee)",
    status: "상태 (Status)",
  },
  search: "Search",
  selected: "Selected",
};

export const getNestedString = (path) => {
  return path.split(".").reduce((obj, key) => obj?.[key], strings);
};
