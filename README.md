<img src="./readme/title.svg"/>

<br><br>

<!-- project philosophy -->
<img src="./readme/title2.svg"/>

>Guardian Grove provides convenient access to professional guidance and support for parents.
>
>Our mission is to bridge the gap between professional advice and parental needs, empowering users in their journey of nurturing and growth through communication and personalized support.

## User Stories

### parent

- As a parent, I want to book appointments with psychologists through the app, so I can seek professional guidance conveniently.
- As a parent, I want to recieve techers reports, so I can track my child behaviour in the school.
- As a parent, I want to chat with AI, so I can get immediate advice on samll details.

### Teacher

- As a teacher, i want to send reports to the prent's student, so that i can ensure the student is raised well
- As a teacher, i want to edit my profile, so that i can represent my self properly for parents
- As a teacher, i want to cht with the prent, so that i can discuss anything about their child  

### Psychologist

- As a psychologist, I want to manage my schedule and make available times visible, so I can optimize my time and offer convenient slots to users.
- As a psychologist, I want to receive feedback from users, so I can improve services and understand their needs better.
- As a psychologist, I want to engage in follow-up chat discussions with parentss, so I can provide continuous assistance beyond scheduled appointments.

### Admin

- As an admin, I want to oversee psychologists qualifications and user reviews, so I can uphold standards of service.
- As an admin, I want to receive reports and feedback from users, so I can address issues promptly and improve the user experience.
- As an admin, I want to be able to delete users, so I can ensure the platform's integrity.

<br><br>
<!-- Tech stack -->
<img src="./readme/title3.svg"/>

###  Guardian Grove is built using the following technologies:

- This project uses [Node.js](https://nodejs.org/en) for its backend runtime environment. Node.js allows us to build scalable and efficient server-side applications using JavaScript.
- [Express](https://expressjs.com/) is used as the web application framework for building the RESTful API. Express simplifies routing and handling HTTP requests and responses.
- For database interactions, the project uses [Prisma](https://www.prisma.io/), an ORM that makes database access easy with type safety and auto-generated queries.
- The entire backend is written in [TypeScript](https://www.typescriptlang.org/), which adds static types to JavaScript, enhancing code quality and maintainability.
- For real-time communication and live chatting, [Socket.IO](https://socket.io/) is implemented, providing bi-directional communication between clients and servers.
- Notifications are handled using [Firebase](https://firebase.google.com/), a platform that provides various tools including cloud messaging for sending push notifications.
- The administration panel is powered by [Electron](https://www.electronjs.org/), enabling the development of cross-platform desktop applications using web technologies. Electron offers a seamless integration of web technologies, allowing for the creation of robust and efficient desktop applications.
- The web application is built using [Vite](https://vitejs.dev/), a next-generation frontend tooling that provides fast build times and a smooth development experience.
- React is used for building the user interface. [React](https://react.dev/) is a powerful library for creating dynamic and responsive web applications.
- The mobile application is developed using [Expo](https://expo.dev/), a framework and platform for universal React applications. Expo simplifies the development and deployment process for mobile apps.
- For handling push notifications on mobile devices, the project uses [Expo Notifications](https://docs.expo.dev/push-notifications/sending-notifications/), which supports sending and receiving push notifications on both iOS and Android platforms.

<br><br>
<!-- UI UX -->
<img src="./readme/title4.svg"/>


> We designed Coffee Express using wireframes and mockups, iterating on the design until we reached the ideal layout for easy navigation and a seamless user experience.

- Project Figma design [figma](https://www.figma.com/design/mbv8f9kFVYx5MgeCNJLrZY/Guardian-Grove?node-id=166%3A6085&t=PCbNeLkApEJQZ1aK-1)


### Mockups
| Sign Up Screen | Home Screen | Psycologist Profile Screen |
| ---| ---| ---|
| ![Sign Up](./readme/figma/Signup.png) | ![Landing](./readme/figma/Landing.png) | ![fsdaf](./readme/figma/Psycologist%20Profile.png) |

<br><br>

<!-- Database Design -->
<img src="./readme/title5.svg"/>

###  Architecting Data Excellence: Innovative Database Design Strategies:

![Diagram](./readme/diagram/Guardian%20Grove.png)


<br><br>


<!-- Implementation -->
<img src="./readme/title6.svg"/>


### Parent Screens (Mobile)
| Login screen  | Register screen | Profile screen | Book-Meeting screen |
| ---| ---| ---| ---|
| ![Login](./readme/mobileGIFs/login.gif) | ![Signup](./readme/mobileGIFs/signup.gif) | ![Profile](./readme/mobileGIFs/profile-children.gif) | ![Meetings](./readme/mobileGIFs/book-meeting.gif) |
| Instructions screen  | Reports Screen | Chat Screen | AI Screen |
| ![Instructions](./readme/mobileGIFs/instructions.gif) | ![Reports](./readme/mobileGIFs/teacher-reports.gif) | ![fsdaf](./readme/mobileGIFs/chat.gif) | ![AI](./readme/mobileGIFs/AI-chat.gif) |

### Common screens (Web)

| Login screen  | Register screen |
| ---| ---|
 ![Login](./readme/webGIFs/login-web.gif) | ![Registewr](./readme/webGIFs/signup-web.gif) | ![Instruction](./readme/webGIFs/Instruction.gif) |

### Psychologist screens (Web)
| Instructions screen  | Chat Screen |
| ---| ---|
 ![Instructions](./readme/webGIFs/Instruction.gif) | ![Chat](./readme/webGIFs/chat-web.gif) 
| Schedules screen  | Profile Screen |
 ![Landing](./readme/webGIFs/schedules-web.gif) | ![Landing](./readme/webGIFs/profile-web-p.gif) 

<br><br>

### Teacher screens (Web)
| Students screen  | Profile Screen |
| ---| ---|
 ![Students](./readme/webGIFs/students.gif) | ![Profile](./readme/webGIFs/profile-web-t.gif) 


<br><br>

### Admin screens (Web)
| Overview screen  | Feedback Screen |
| ---| ---|
 ![Instructions](./readme/desktopImages/overview-des.png) | ![Chat](./readme/desktopImages/feedback-des.png) 

| parents screen  | Psychologists Screen | Teachers Screen |
| ---| ---| ---|
 ![Landing](./readme/desktopImages/parents-des.png) | ![Landing](./readme/desktopImages/psychologist-des.png) | ![Landing](./readme/desktopImages/teachers-des.png)

<br><br>


<!-- Prompt Engineering -->
<img src="./readme/title7.svg"/>

###  Mastering AI Interaction: Unveiling the Power of Prompt Engineering:
This prompt directs an AI to act as a psychologist in a friendly and professional manner, addressing a parent's request based on provided data. The AI should give concise, relevant responses and gently redirect any unrelated queries back to psychological topics, using specific information about the parent and their children to personalize the interaction.

![AI prompt](./readme/AI/AI-prompt.png)

<br><br>

<!-- AWS Deployment -->
<img src="./readme/title8.svg"/>

### By following these steps, we deployed the backend with AWS Integration:


Step 1: Update AWS Packages

```sh 
sudo apt update
```

Step 2: Install Required Stacks

```sh 
sudo apt install mysql-server nodejs npm
```

Step 3: Create The Database

```sh 
sudo mysql -u root -p
CREATE DATABASE guardian_grove_db;
```

Step 4: Clone the Repository

```sh 
git clone https://github.com/AliAbdelAall/Guardian-Grove.git
```

Step 5: Install The Packages

```sh 
cd Guardian-Grove/backend/
npm install
```

Step 6: Create Node Environment Configuration

```sh 
cp .env.example .env
```

Step 7: Migrate To Generate Tables In The Database

```sh
npx prisma migrate
```

step 8: start the server with the start script

```sh
npm start 
```
![Postman API test](./readme/aws/postman-test.png)
<br><br>

<!-- Unit Testing -->
<img src="./readme/title9.svg"/>

###  Precision in Development: Harnessing the Power of Unit Testing:

![unit testing](./readme/testing/Desktop%20Screenshot%202024.05.19%20-%2023.56.50.78.png)

<br><br>


<!-- How to run -->
<img src="./readme/title10.svg"/>

> To set up Guardian Grove locally, follow these steps:

step1: install Required Packages
  ```sh
npm install nodejs
  ```

step2: Clone The Repo
  ```sh
git clone https://github.com/AliAbdelAall/Guardian-Grove.git
  ```

Step 3: Install Packages and Set Up Environment Variables
  ```sh
cd backend
cp .env.example .env
npm install
  ```
step 4: Create MySQL Database

step 5: Connect To Database

fill the data in te .env file, example:
  ```sh
DATABASE_URL="mysql://<root>:<yourpassword>@localhost:3306/<database_name>"
PORT= 3000
  ```
step 6: Migrations
  ```sh
npx prisma migrate dev
  ```
step 6: Generate 
   ```sh
npx prisma generate
  ```
step 7: Create a New Project on [Firebase Console](https://console.firebase.google.com/) and get a service account key

step 8: Create a new file 'serviceAccountKey.json' at the root of backend folder and paste your service account key
```sh
touch serviceAccountKey.json
```


step 9: Install Packages and Set Up Environment Variables for each domain

Web

  ```sh
cd web
cp .env.example .env
npm install
  ```

Desktop

  ```sh
cd desktop
cp .env.example .env
npm install
  ```

Mobile

  ```sh
cd mobile
cp .env.example .env
npm install
  ```

step 10: Start The Project

backend
  ```sh
  npm start
  ```
Web / Desktop
  ```sh
  npm run dev
  ```
Mobile
  ```sh
  npx expo start
  ```
Now, you should be able to run Guardian Grove locally and explore its features.