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

## Documentation / User Guide
<a href=''>Documentation</a>

## Table of Contents
- [Problem Statement](#problem-statement)
- [Description](#description)
- [Technology Used](#technology-used)
- [Features](#features)
- [Future Goals](#future-goals)
- [Target Users](#target-users)
- [What I learnt?](#what-i-learnt)
- [Local Installation](#local-installation)
- [Demo Images](#demo-images)

### Problem Statement
The solution should be a fully functional prototype with at least one mandatory functionality - a minimum of two participants should be able connect with each other using your product to have a video conversation.
Adapt feature: Include a chat feature in your application where meeting participants can share info without disrupting the flow of the meeting. Through this chat feature, your participants should be able to: View & Send messages, continue the conversation after the meeting and start the conversation before the meeting.

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
<ol>
  <li> Mandatory functionality achieved: two participants should be able connect with each other to have a video conversation </li>
  <li> Adapted to the new functionality: chat feature </li>
  <li> Added extra features: </li>
    <ol type='i'>
      <li> User authentication </li>
      <li> More than two people can connect in a video meeting </li>
      <li> Meetings can be started now or can be scheduled at any time and date </li>
      <li> Participants list can be viewed </li>
      <li> Toggle audio and video </li>
      <li> Video can be viewed in full screen and picture-in-picture mode </li>
      <li> Users can chat before, during and even after the meeting has ended </li>
      <li> Any number of teams can be created, in which anyone can create meetings </li>
      <li> Joining to a meeting doesn't really requires a link or a code </li>
      <li> User activities can be viewed </li>
      <li> Community Chats </li>
      <li> Calendar for scheduled meetings </li>
      <li> Task Manager </li>
    </ol>
  <li> Added bonus features: </li>
    <ol type='i'>
      <li> All the meeting chats can be exported as a PDF for future reference </li>
      <li> An interactive whiteboard, where all participants of the meeting can collaborate </li>
      <li> Voice Assistant which helps as a guide for the app </li>
    </ol>
</ol>

### Future Goals
  1. Increase scalability
  2. Private chat rooms
  3. Breakout rooms
  4. Private teams, which are currently public for all users in my app

### Target Users
  1. Educational Institutes
  2. Office/Professional Meetings
  3. Friends/Family

### What I Learnt?
  - The theme of the mentorship program was Agile Methodology. I learnt how we need to plan our projects much before implementing/building it. We need to built, in a manner    that it is able to adapt to any new feature proposed by the client. 
  - I also read and learnt a lot about webRTC, peer-to-peer connection and how actually do we establish a video call with one or more participants.

### Local Installation
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
