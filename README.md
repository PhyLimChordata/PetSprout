# HabiPets

## Overview

HabiPets is a mobile application which aims to provide a gamification of CBT(Cognitive Behavioural Therapy) and DBT (Dialectical Behavioural Therapy).\

HabiPets is a portmanteau of the words Habits and Pets\
and as the name suggests, the app focuses on building sustainable and healthy habits. Similar to that of a tamagotchi, each user will have a pet that will evolve and lose life points depending on the consistency of daily habits. Users will also have the ability to evolve and customize their companion gamifying the process.\

Other features of interest are tutorials, methods and/or worksheets commonly used in DBT and CBT while having the pet react positively or negatively depending on the user's activity.\

This project has achieved the recognition and guidance of the University of Toronto’s Psychology Professor: Steve Joordens.

## How To Run It Yourself:

Upon cloning,
There are dependencies that are required to be installed.
Follow the steps carefully to ensure the code runs correctly on your respective devices.

### 1. Ensure that node is installed

To check,
Open up your command prompt
cd to the HabitStudyApp folder and type in

    node -v

If a version shows, then node is installed on your system. Otherwise, you would need to install it:

https://nodejs.org/en/

After installation, type the line below in the terminal of Visual studio code

    node -v

If it's not being recognized then add the nodeJS folder path to the environment variable: PATH

**Steps following from here assume lines are typed into the terminal**

### 2. From the src directory, run the following command:

    npm install

### 3. Test that everything related to backend is working by typing the following in 'src/backend':

    nodemon server

If successful, the server would open and the database can be accessed.

In terminal, you should see:

    Server is running on port: 5000
    MongoDB database connection established successfully"

### 4. Test that everything related to frontend is working by typing the following in 'src':

    npm start

If configured correctly, the code would redirect you to expo's developer tools where you have the option to run emulators, run on the web browser or on your personal device.

### 5. If you intend on testing on a web browser...

    "Run in web browser"

Clicking on the button with the label above will redirect you to a localhost where you should be able to see react components.

### 6. If you intend on using your personal device...

    "Download the mobile app: Expo Go"

Once installed, scan the QR code and the program should be displayed onto your personal device.

### 7. If you intend on using an Android emulator...

    "Install Android Studio -> Launch a Virtual Device -> Enter "a" in terminal (after entering npm start) OR Click "Run on Android Device/Emulator"

Click on Configure in the bottom left of the Android Studio screen.\
Click on SDK Manager.\
Make sure recent Androids are selected. As of making this they are: Android 9.0 (Pie) and Android 8.x (Oreo)\
Make sure the SDK emulator, Android SDK Platform - Tools and Android SDK Tools is installed under SDK Tools.\
If not, select them and click Apply.\
Click on Configure again and click on AVD Manager.\
You should be prompted with options for virtual devices.\
Launch an emulator by clicking the green play button.\
Enter "a" in terminal (after entering npm start) OR Click "Run on Android Device/Emulator

### 8. If you intend on using an IOS emulator...

    "Install XCode -> Launch a Virtual Device -> Run on IOS Simulator"

Know that you can only run it on a MacOS and not Windows.\
Go to preferences in the top left corner.\
Make sure to select XCode in Commnad Line Tools\
Open Developer Tools -> Simulator will launch an IOS Device and you can change the device version by selecting Hardware (all of this is in the top bar)\
Click "Run on IOS simulator"

## Collaborators:

Manola Yvonet\
Andy PhyLim\
Calvin Cheng\
Cheryl Chen\
YuanYuan Li\
Katrina Best\
Rachelle Willemsma
