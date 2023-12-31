# Main Features

- Authentication
  - Firebase auth
- Pomodoro
  - The pomodoro timer for the tasks
- Tasks
  - The list of tasks
- Analytics
  - Analytics of the tasks and pomodoro stats
- Notifications
  - Notification after pomodoro completion with a quote
- StarCanvas
  - Star canvas in the login page

# Structure

- src
  - `modules` : This folder contains all the major feature of the app.
  - `contexts` : This folder contains the context providers used in app.
    - `AuthContext`
    - `DataContext`
    - [`NotificationContext`](./src/contexts/NotificationContext.jsx)
    - `ThemeContext`
  - `theme` : The folder containing firebase and theme configs
  - `components` : The folder that maintains all the modular components of the app.

# Tech Stack

- React (Frontend)
  - Charts.js (Analytics)
  - Date-fns (date utils)
  - MUI (component lib)
  - Threejs (3d canvas)
- Firebase (Backend)

# Some Screenshots

![Login](https://res.cloudinary.com/diby0hxng/image/upload/v1687363648/Screenshot_2023-06-21_at_9.36.54_PM_fgg991.png)

![Pomodoro](https://res.cloudinary.com/diby0hxng/image/upload/v1687363480/Screenshot_2023-06-21_at_9.31.43_PM_y5bvnn.png)

![Tasks](https://res.cloudinary.com/diby0hxng/image/upload/v1687363480/Screenshot_2023-06-21_at_9.32.10_PM_glabix.png)

![Analytics](https://res.cloudinary.com/diby0hxng/image/upload/v1687363480/Screenshot_2023-06-21_at_9.32.32_PM_v4apti.png)

## Dark Mode

![DarkMode](https://res.cloudinary.com/diby0hxng/image/upload/v1687370481/Screenshot_2023-06-21_at_11.30.48_PM_oxs2ky.png)

![login](https://res.cloudinary.com/diby0hxng/image/upload/v1687370552/Screenshot_2023-06-21_at_11.32.01_PM_jenept.png)
