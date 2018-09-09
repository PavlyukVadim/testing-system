import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Checkbox,
  IconButton,
  Layout,
  NavDrawer,
  Panel,
  Sidebar,
  Navigation,
  List,
  ListItem,
} from 'react-toolbox/lib';
import UserAppRouter from './userAppRouter';

class UserApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerActive: false,
    };
    this.toggleDrawerActive = this.toggleDrawerActive.bind(this);
    this.goToPage = this.goToPage.bind(this);
  }

  toggleDrawerActive() {
    this.setState((prevState) => {
      return {
        drawerActive: !prevState.drawerActive,
      };
    });
  };

  goToPage(page) {
    this.props.history.push(`/user${page}`);
    this.toggleDrawerActive();
  };

  render() {
    const {
      history,
      match,
    } = this.props;

    return (
      <Layout>
        <NavDrawer
          active={this.state.drawerActive}
          onOverlayClick={this.toggleDrawerActive}
          permanentAt='xxxl'
        >
          <List selectable ripple>
            <ListItem
              caption='New test'
              onClick={() => this.goToPage('')}
              leftIcon='add_box'
            />
            <ListItem
              caption='Passed tests'
              onClick={() => this.goToPage('/passed')}
              leftIcon='undo'
            />
            <ListItem
              caption='Assessed tests'
              onClick={() => this.goToPage('/assessed')}
              leftIcon='assessment'
            />
          </List>
        </NavDrawer>
        <Panel>
          <AppBar
            leftIcon="menu"
            title="User cabinet"
            onLeftIconClick={this.toggleDrawerActive}
          >
            <Navigation type="horizontal">
              <Link className="identification-link" to="/signin">Log out</Link>
            </Navigation>
          </AppBar>
          <div className="container">
            <h1>Main Content</h1>
            <p>Main content goes here.</p>
            <UserAppRouter />
          </div>
        </Panel>
      </Layout>
    );
  }
}

export default UserApp;
