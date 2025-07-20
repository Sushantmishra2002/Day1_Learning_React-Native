


![Untitled design](https://github.com/user-attachments/assets/e08012d7-651a-43f8-8da7-3e5022282258)



# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.





# 📘 Beautiful To-Do List App – React Native

Welcome to the **Beautiful To-Do List App**, a stunning, beginner-friendly task manager built entirely with **React Native** and **Expo**. This app features beautiful card layouts, intuitive interactions, and a clean modern user experience with animated avatars, modal inputs, task categorization, filtering, and more.

This project is ideal for students, beginners, and developers who want to understand and practice **React Native fundamentals**, UI/UX design, **state management**, and component-based architecture.

---

## 📱 Project Overview

This mobile application allows users to:

- Add daily tasks with descriptions
- Assign tasks to mock team members
- Mark tasks as complete/incomplete
- Filter tasks by type or status
- Search tasks in real time
- Use dynamic avatars
- Set task priority and recurring status
- Experience beautiful and clean design aesthetics

> It mimics a real-world collaborative to-do manager but works entirely offline using React Native state.

---

## 🎯 Key Features

| Feature                        | Description |
|-------------------------------|-------------|
| 📝 Task Creation              | Add tasks with a title, optional description, category, priority, and avatars. |
| 🎨 Beautiful UI               | Aesthetic cards, soft shadows, vibrant colors, and modern design. |
| 🧑‍🤝‍🧑 Avatars               | Each task can be assigned to one or more users via mock avatars. |
| 🗃️ Categories                | Tasks can be categorized (Meeting, Review, Marketing, etc.). |
| 🎚️ Priority Levels           | Choose from High, Medium, Low, or None. |
| 🔁 Recurring Tasks            | Toggle recurring flag per task. |
| 🔎 Real-time Search           | Filter tasks by title dynamically. |
| 🧹 Undone Filter              | Toggle to show only unfinished tasks. |
| 📆 Current Date View          | See today’s date and tasks at a glance. |
| ➕ Floating Action Button     | Easily accessible 'Add New Task' modal. |
| 🎛 Modal Input                | Custom bottom modal for smooth task input UX. |

---

## 🧱 Technologies Used

- **React Native**
- **Expo CLI**
- **JavaScript (ES6+)**
- **React Native FlatList**
- **React Native Vector Icons (Ionicons)**
- **Styled Components via `StyleSheet.create()`**
- **React Hooks (useState)**

---

## 📂 Folder Structure



---

## 🧠 State Management (useState)

We use **`useState`** to manage everything:

| State Variable       | Purpose |
|----------------------|---------|
| `todos`              | Stores the array of tasks. |
| `input`              | Stores the task title input. |
| `inputDesc`          | Stores the task description input. |
| `search`             | Text entered in the search bar. |
| `activeFilter`       | Determines the current filter tab (Undone, Meetings, etc.). |
| `showInput`          | Controls visibility of the add-task modal. |
| `selectedCategory`   | Stores currently selected category for new task. |
| `selectedPriority`   | Stores selected priority. |
| `selectedAvatars`    | Stores index values of selected avatars. |
| `recurring`          | Boolean to mark if the task is recurring. |

---

## 🧩 UI Components & Layout

### 1. **Header Section**
- Displays "Today" and the current date.
- Icon: calendar-outline (Ionicons)

### 2. **Search Bar**
- Styled input with blue icon.
- Filters tasks in real-time using `.filter()` and `.includes()`.

### 3. **Filter Tabs**
- ["Undone", "Meetings", "Consummation"]
- Dynamically highlights selected filter.
- `activeFilter` determines which tab is active.

### 4. **FlatList**
- Renders all `filteredTodos`.
- Each item is a card with:
  - Title
  - Optional description
  - Assigned avatars
  - Time (optional)
  - Completed status (visual opacity)

### 5. **Floating Action Button (FAB)**
- Positioned bottom center.
- Opens modal to add new task.

### 6. **Modal Bottom Sheet**
- Beautiful modal with rounded corners.
- Fields:
  - Task title (`input`)
  - Description (`inputDesc`)
  - Category chips (with color-coded backgrounds)
  - Priority radio buttons
  - Invite avatar list (mock selection)
  - Recurring toggle
  - Save & close buttons

---

## 🔧 Main Functions

### `addTodo()`

Adds a new task to the `todos` array.

```js
const addTodo = () => {
  if (input.trim().length === 0) return;
  setTodos([
    ...todos,
    {
      id: Date.now().toString(),
      text: input,
      desc: inputDesc,
      time: '',
      completed: false,
      avatars: selectedAvatars,
      category: selectedCategory,
      priority: selectedPriority,
      recurring,
    },
  ]);
  setInput('');
  setInputDesc('');
  ...
};
