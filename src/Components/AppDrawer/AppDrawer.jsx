import React from "react"
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Timeline from '@material-ui/icons/Timeline'
import TimeModePicker from './TimeModePicker'
import { withStyles } from '@material-ui/core'

const styles = ({ palette }) => ({
  drawerPaper: {
    position: 'absolute',
    bottom: '0',
    top: 'unset',
    width: '229px',
    backgroundColor: palette.secondary.main,
    opacity: '.97'
  },

  drawer: { zIndex: '1' },

  timeline: {
    position: 'relative',
    marginTop: '50px'
  },

  list: { paddingTop: '48px' }

})

class AppDrawer extends React.PureComponent {
  state = {
    modeList: false
  }

  expandTimeList = () => 
    this.setState({ modeList: !this.state.modeList })
  

  render() {
    const { 
      toggleAppMenu, appDrawer,
      switchMode, classes, mode
    } = this.props

    const { modeList } = this.state
    return (
      <Drawer
        classes={{paper: classes.drawerPaper}}
        className={classes.drawer}
        open={appDrawer}
        onClose={toggleAppMenu}
        ModalProps={{ BackdropProps: { invisible: true } }}
      >
        <List className={classes.list} component="nav">

          <ListItem             
            button
            onClick={this.expandTimeList} 
            className={classes.timeline} 
          >
          
            <ListItemIcon>
              <Timeline />
            </ListItemIcon>

            <ListItemText inset primary="TimeLine" />        
           
          </ListItem>
          
          <TimeModePicker 
            modeList={modeList} 
            switchMode={switchMode}        
            mode={mode}
          />
              
        </List>
      </Drawer>
    )
  }
}

export default withStyles(styles)(AppDrawer)