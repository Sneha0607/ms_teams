<h1 align="center">MICROSOFT TEAMS CLONE</h1>

<p><img src="https://c.s-microsoft.com/favicon.ico?v2" height=20px> Built during Microsoft Engage Mentorship Program 2021</p>

## Introduction
It is a clone of the web version of Microsoft Teams, built using NodeJS in backend and ReactJS in frontend. 

## Deployed Website
https://clone-microsoft-teams.herokuapp.com

## Demo Video
<a href='https://www.youtube.com/watch?v=uf3k8dtzaF0'>Demo Video</a>

## Presentation Link
<a href='https://drive.google.com/file/d/1K4peb0KkbG_7DbBTH5xa9kLCnjuKTSmG/view?usp=sharing'>Presentation</a>

## Table of Contents
- [Description](#description)
- [Technology Used](#technology-used)
- [Features](#features)
- [Installation](#installation)
- [Demo Images](#demo-images)

### Description
Through this app users can create teams, start or schedule meetings. All the meetings will get listed in the team, and anyone can directly join from there. During the meeting, users can toggle between their audio and video, can view in full screen and picture-in-picture mode. All the participants of the meeting can view the participants list, chat with everyone and can even draw their thoughts on the collaborative whiteboard. The chats can be initiated before the meeting and can continue even after the meeting. The chats can be exported as a PDF. The meeting URL and Code can also be copied.
<br/>
Apart from this, this app also has features to view user activity, participate in community chat, manage your tasks, view your calendar to look up for scheduled meetings and a voice assistant which guides you through the app!

### Technology Used
  1) NodeJs
  2) ReactJs
  3) Firebase
  4) socket.io
  5) simple-peer library (node.js style API for WebRTC)

### Features
  1. Mandatory functionality achieved: two participants should be able connect with each other to have a video conversation.
  2. Adapted to the new functionality: chat feature.
  3. Added extra features: 
    1. User authentication
    2. More than two people can connect in a video meeting
    3. Meetings can be started now or can be scheduled at any time and date
    4. Participants list can be viewed
    5. Toggle audio and video
    6. Video can be viewed in full screen and picture-in-picture mode
    7. Users can chat before, during and even after the meeting has ended
    8. Any number of teams can be created, in which anyone can create meetings
    9. Joining to a meeting doesn't really requires a link or a code
    10. User activities can be viewed
    11. Community Chats 
    12. Calendar for scheduled meetings
    13. Task Manager
  4) Added bonus features:
    1. All the meeting chats can be exported as a PDF for future reference
    2. An interactive whiteboard, where all participants of the meeting can collaborate
    3. Voice Assistant which helps as a guide for the app

### Installation
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

### Demo Images
![home](https://github.com/Sneha0607/ms_teams/blob/master/images/home.png)
<br/>
![signup](https://github.com/Sneha0607/ms_teams/blob/master/images/signup.png)
<br/>
![teams](https://github.com/Sneha0607/ms_teams/blob/master/images/teams.png)
<br/>
![team_posts](https://github.com/Sneha0607/ms_teams/blob/master/images/team_posts.png)
<br/>
![chats](https://github.com/Sneha0607/ms_teams/blob/master/images/chats.png)
<br/>
![participants](https://github.com/Sneha0607/ms_teams/blob/master/images/participants.png)
<br/>
![share](https://github.com/Sneha0607/ms_teams/blob/master/images/share.png)
<br/>
![whiteboard](https://github.com/Sneha0607/ms_teams/blob/master/images/whiteboard.png)
<br/>
![activity](https://github.com/Sneha0607/ms_teams/blob/master/images/activity.png)
<br/>
![community_chat](https://github.com/Sneha0607/ms_teams/blob/master/images/community.png)
<br/>
![tasks](https://github.com/Sneha0607/ms_teams/blob/master/images/tasks.png)
<br/>
![calendar](https://github.com/Sneha0607/ms_teams/blob/master/images/calendar.png)
<br/>
![help](https://github.com/Sneha0607/ms_teams/blob/master/images/help.png)
<br/>
