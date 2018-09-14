import React from 'react'
import { withStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'

const styles = (theme) => ({
  drawerWrap: {
    maxHeight: '1000px',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: 'min-content'
  },
  
  taskFormField: {
    padding: '20px',
    width: '100%'
  },
})

class TaskDrawer extends React.Component {
 
  getCurrentDate = () => {
    const date = new Date()
    const editDate = x => x < 10 ? '0' + x : x

    const year = date.getFullYear()
    const month = editDate(1 + date.getMonth())
    const day = editDate(date.getDate())
    const hours = editDate(date.getHours())
    const minutes = editDate(date.getMinutes())

    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isOnlySpaces', value => /\S/.test(value))
  }

  drawerClose = () => {
    this.props.taskHeader === '' || !(/\S/.test(this.props.taskHeader)) 
      ? this.props.deleteTask()
      : this.props.setTaskInformation()
  }

  render() {
    const { classes, taskDrawer, setTaskInformation, deleteTask, setTaskFields, refTimePicker, taskHeader, taskDescription, currentTaskDate } = this.props
    return (
      <Drawer onClose={this.drawerClose} open={taskDrawer} anchor="right"> 
        <div className={classes.drawerWrap}>
          <ValidatorForm onSubmit={setTaskInformation}>
            <Typography 
              align="center" 
              component="h3"
            >
              task header
            </Typography>
            <TextValidator 
              margin="dense" 
              onChange={setTaskFields("taskHeader")} 
              name="taskHeader" 
              value={taskHeader} 
              multiline 
              validators={['required', 'isOnlySpaces', 'minStringLength:1', 'maxStringLength:16']}
              errorMessages={['this field is required', 'must cosist not only from spaces', 'must contain at least 1 characters', 'password must contain no more then 50 characters']}
              className={classes.taskFormField} 
            />
                
            <Typography 
              align="center" 
              component="h3"
            >
              task description
            </Typography>
            <TextField  
              margin="dense" 
              rowsMax="15" 
              multiline 
              inputProps={{maxLength: "150"}}
              onChange={setTaskFields("taskDescription")}
              value={taskDescription}
              className={classes.taskFormField} 
            />

            <Typography 
              align="center" 
              component="h3"
            >
              task time
            </Typography>
            <TextField 
              type="datetime-local" 
              value={
                currentTaskDate === '' 
                  ? this.getCurrentDate() 
                  : currentTaskDate
              }
              InputLabelProps={{
                shrink: true,
              }}
              onChange={setTaskFields("currentTaskDate")}
              inputRef={refTimePicker}
              className={classes.taskFormField} 
            />

            <Button type="submit">OK</Button>
            <Button onClick={deleteTask}>Delete</Button>
          </ValidatorForm>
        </div>
      </Drawer>
    )
  }

} 

export default withStyles(styles)(TaskDrawer)