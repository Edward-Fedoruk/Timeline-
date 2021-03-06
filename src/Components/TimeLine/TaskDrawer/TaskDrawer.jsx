import React from 'react'
import { withStyles } from '@material-ui/core'
import { ValidatorForm } from 'react-material-ui-form-validator'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import DatePicker from './DatePicker'
import TextFields from './TextFields'
import TaskSettings from './TaskSettings'
import TaskPriority from './TaskPriority'
import { Scrollbars } from 'react-custom-scrollbars'

const styles = ({ palette }) => ({
  drawerWrap: {
    width: '90%',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    margin: '0 auto' 
  },

  drawer: {
    width: '310px',
    paddingTop: '10px',
    backgroundColor: palette.secondary.main,
    opacity: '.97',
  },

  buttonsWrap: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '70px'
  },
})

class TaskDrawer extends React.Component {
  state = {
    invalidDate: false
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isOnlySpaces', value => /\S/.test(value))
  }

  componentDidUpdate() {
    console.log("draw")
  }

  shouldComponentUpdate(nextProps) {
    return JSON.stringify(nextProps.taskInfo) !== JSON.stringify(this.props.taskInfo)
           || nextProps.taskDrawer !== this.props.taskDrawer
  }

  render() {
    const { 
      classes, taskDrawer, submitTask, 
      taskInfo,setTaskTextFields, 
      deleteTask, taskCreation,
      cancelCreation, setTaskSettings
    } = this.props

    return (
      <Drawer
       open={taskDrawer} 
       anchor="right"
       classes={{paper: classes.drawer}}
      > 
      <Scrollbars>
        <div className={classes.drawerWrap}>
          <ValidatorForm onSubmit={submitTask}>    
            <TextFields 
              desc={taskInfo.desc}
              header={taskInfo.header}
              setTaskTextFields={setTaskTextFields}
            />                 

            <DatePicker
              date={taskInfo.date}
              setTaskDate={setTaskSettings("date")}
            />          
            
            <TaskSettings
              remind={taskInfo.remind}
              repeat={taskInfo.repeat}
              setTaskSettings={setTaskSettings}
            />

            <TaskPriority
              priority={taskInfo.priority}
              setTaskSettings={setTaskSettings}
            />
                          
            <div className={classes.buttonsWrap}>
              <Button 
                type="submit"
                variant="contained" 
                color="primary" 
                type="submit"
                disabled={taskInfo.header === ""}
                size="medium"
              >
                OK
              </Button>
              {taskCreation 
                ? <Button 
                    onClick={cancelCreation}
                    color="inherit"
                    variant="contained"
                    size="medium"
                  >
                    Cancel
                  </Button>
                : <Button 
                    onClick={deleteTask}
                    color="inherit"
                    variant="contained"
                    size="medium"
                  >
                    Delete
                  </Button>}
            </div>
          </ValidatorForm>
        </div>
        </Scrollbars>
      </Drawer>
    )
  }
} 

export default withStyles(styles)(TaskDrawer)