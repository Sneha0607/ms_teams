<h1 align="center">MICROSOFT TEAMS CLONE</h1>

<p><img src="https://c.s-microsoft.com/favicon.ico?v2" height=20px> Built during Microsoft Engage Mentorship Program 2021</p>

## Introduction:
It is a clone of the web version of Microsoft Teams, built using NodeJS in backend and ReactJS in frontend. 

## Website hosted at:
https://clone-microsoft-teams.herokuapp.com

## Table of Contents
- [Description](#description)
- [Technology Stack](#technology-stack)
- [Installation](#installation)

### Description
Through this app users can create teams, start or schedule meetings. All the meetings will get listed in the team, and anyone can directly join from there. During the meeting, users can toggle between their audio and video, can view in full screen and picture-in-picture mode. All the participants of the meeting can view the participants list, chat with everyone and can even draw their thoughts on the collaborative whiteboard. The chats can be initiated before the meeting and can continue even after the meeting. The chats can be exported as a PDF. The meeting URL and Code can also be copied.
Apart from this, this app also has features to view user activity, participate in community chat, manage your tasks, view your calendar to look up for scheduled meetings and a voice assistant which guides you through the app!

### Technology Stack:
  1) NodeJs
  2) ReactJs
  3) Firebase

#### Installation
```
git clone https://github.com/Sneha0607/ms_teams.git
cd ms_teams
#Open two terminals

#1st Terminal
cd client
npm install
npm start

#2nd Terminal
cd server
npm install
npm start
```
To get the database working, the firebase configuration needs to be added in client/src/firebase.js file after cloning the repository.
