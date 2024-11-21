# Task for T___ Security.

영어로 설명 하겠습니다!

This is a task assignment I am doing for an interview process.

## 📺 Live demo [![Netlify Status](https://api.netlify.com/api/v1/badges/2646ce69-7883-404b-b9c1-62074a6b5322/deploy-status)](https://app.netlify.com/sites/task-by-aiaru/deploys)

[Working demo](https://task-by-aiaru.netlify.app).

## 🤖 Technologies used

**Framework:** React.js + Next.js
**UI:** Radix Themes

**Additional:**
React Hook Form for task creation form.
Zustand for state management.

## 🎁 Bonus 

Added `Create Task` button and functionality to create tasks by some users.
**Note** newly created task is stored in local storage only for test purposes.

### 🌐 Notes on fetching

When user logins, it POST to `/api/auth/login`.
If login is successful, it saves `users` and `tasks` to local storage and state using `Zustand`. 

In real API, it would be fetching `users` and `tasks` separately as well as using other libraries like React-Query.

But for this test case, I think Zustand is enough. 


### Test Case

You can try using `regular@gmail.com` to check Regular User permissions. You can also see tasks list for this user.
```
{
        "userName": "Regular User",
        "userPhone": "+82 010-3798-1059",
        "userEmail": "regular@gmail.com",
        "userRole": "RegularUser",
        "createdAt": "2024-08-26T13:55:35.833919",
        "lastLoggedInAt": "2024-08-26T13:55:35.833922"
}
```


#### ❔ Please let me know if you have any questions!
I hope to go to the next round of the interview~
