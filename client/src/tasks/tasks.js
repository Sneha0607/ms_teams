import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Input, FormHelperText, Typography, List } from '@material-ui/core';
import Todo from './todo';
import {db} from '../firebase';
import firebase from 'firebase';
import { useAuth } from '../contexts/AuthContext';
import useStyles from './styles';

const Tasks = () => {

    const [todos, setTodos] = useState([])
    const [input, setInput] = useState("")
    const classes = useStyles();
    const { currentUser } = useAuth();
    
    //TO FETCH TODOS FROM DATABASE WHILE THE APP IS LOADING
    useEffect(() => {
    db.collection("users").doc(currentUser.uid).collection("tasks").orderBy("timestamp", "desc")
    .onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({ 
          id: doc.id, 
          todo: doc.data().todo
        })))
    })}, [currentUser.uid])
  
    // ADD TODO FUNCTION
    const addTodo = (Event) => {
      // preventing default nature of form of refresh
      Event.preventDefault();
      
      db.collection("users").doc(currentUser.uid).collection("tasks").add({
        todo: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })

      //PUSHING IN USER ACTIVITY
      db.collection("users").doc(currentUser.uid).collection("activity")
      .add({
          activity: `You added a task: ${input}!`,
          doneAt: new Date()
      })
  
      // to remove the entered words from input after clicking button
      setInput("");
    }
  
    return (
      <div className={classes.tasks}>
        <Typography variant='h1' className = {classes.tasksHeader}>
          MANAGE YOUR TASKS
        </Typography>
        
        {/* FORM TO SUBMIT TODO */}

        <form className={classes.form}>
          <FormControl>
            <InputLabel>
              <span role="img" aria-label="emoji">✅</span> Write a Task
            </InputLabel>
            <Input 
              value={input} 
              onChange={Event => setInput(Event.target.value)} 
            />
            <FormHelperText>We'll make you productive 
              <span role="img" aria-label="emoji">🕒</span> 
            </FormHelperText>
          </FormControl>
          <Button  
            disabled={!input} 
            type="submit" 
            variant="contained" 
            color="primary" 
            onClick={addTodo}
          >
            Add
          </Button>
        </form>
        
        {/* DISPLAYING TASKS FROM DATABASE */}
        <List className={classes.tasksList}>
          {todos.map(todo => (
           <Todo todo={todo} />
          ))}
        </List>

      </div>
    )
}

export default Tasks;