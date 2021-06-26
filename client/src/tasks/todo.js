import React, { useState } from "react";
import { List, ListItem, ListItemText, ListItemAvatar, Button, Modal } from "@material-ui/core";
import { db } from '../firebase';
import useStyles from './styles';
import { useAuth } from '../contexts/AuthContext';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';

const Todo = (props) => {

    const { currentUser } = useAuth();
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState();

    const updateTodo = () => {
      // update the todo with the new input
      db.collection("users").doc(currentUser.uid).collection("tasks").doc(props.todo.id).set(
        {
          todo: input,
        },
        { merge: true }
      );
      setOpen(false);
    };

  return (
    <>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div className={classes.paper}>
          <h3>Update the Task</h3>
          <input
            placeholder={props.todo.todo}
            value={input}
            onChange={(Event) => setInput(Event.target.value)}
          />
          <Button
            variant="contained"
            color="default"
            onClick={updateTodo}
            className={classes.buttonUpload}
          >
            Upload
          </Button>
        </div>
      </Modal>
      <List className={classes.todoList}>
        <ListItem>
          <ListItemAvatar></ListItemAvatar>
          <ListItemText primary={props.todo.todo} secondary="Uploaded Task 🤞"  />
        </ListItem>
        <Button
          variant="contained"
          onClick={(Event) =>
            db.collection("users").doc(currentUser.uid).collection("tasks").doc(props.todo.id).delete()
          }
          className={classes.buttonDone}
          startIcon={<DoneIcon />}
        >
          Done
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={(e) => setOpen(true)}
          className={classes.buttonEdit}
          endIcon={<EditIcon>send</EditIcon>}
        >
          Edit
        </Button>
      </List>
    </>
  );
}

export default Todo;
