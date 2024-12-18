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
    product_name: "물품명",
    type_product_name: "물품 명을 입력하세요",
    product_count: "물품 갯수",
    type_task_name: "Task 이름을 입력하세요",
    type_product_count: "물품 갯수를 입력하세요",
    recipient_name: "수신자 명",
    type_recipient_name: "김홍도",
    recipient_number: "수신자 전화번호",
    type_recipient_number: "010-2222-3333",
    recipient_address: "수신자 주소",
    type_recipient_address: "아스타나 123",
    type_due_date: "yyyy-mm-dd",
    create_task: "Task 생성",
    success_title: "생성 완료!",
    success_message:
      "새로 생성된 TASK은 로컬 저장소에만 저장됩니다! \n Please note that the newly created task is stored ONLY in local storage.",
  },
  errors: {
    phone: "올바른 휴대폰 번호를 입력해주세요",
    address: "주소는 글자와 숫자를 모두 포함해야 합니다",
    address2: "올바른 주소를 입력해주세요",
    due_date: "마감일을 입력해 주세요",
    due_date_format: "yyyy-mm-dd 형태의 날짜 포맷이어야 합니다.",
    digit: "숫자 형태여야 합니다",
    assignee: "담당자를 선택해주세요",
    task_name: "Task 이름은 필수입니다",
  },
  search: "Search",
  search_dots: "Search...",
  create: "Create",
  selected: "Selected",
  restricted: "Restricted",
  restricted_text: "Sorry, you cannot access this page",
  no_tasks: "No tasks",
  no_users: "No users",
  no_result_text: "There are no results to display",
  something_is_wrong: "Something is wrong",
  logout: "Logout",
};

export const getNestedString = (path) => {
  return path.split(".").reduce((obj, key) => obj?.[key], strings);
};
