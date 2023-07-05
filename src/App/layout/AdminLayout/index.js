import React, { Component, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import windowSize from 'react-window-size';

import Navigation from './Navigation';
import NavBar from './NavBar';
import Breadcrumb from './Breadcrumb';
import Loader from "../Loader";
import NotFound from "../../views/NotFound/NotFound";
import mainRoutes from "../../../routes/main-routes";
import './app.scss';
import { collapseMenu } from '../../../store/navigation-slice';

class AdminLayout extends Component {

  componentDidMount() {
    if (this.props.windowWidth > 992 && this.props.windowWidth <= 1024 && this.props.layout !== 'horizontal') {
      this.props.onComponentWillMount();
    }

    // window.addEventListener("storage", () => {
    //   // When storage changes removes storage data
    //   localStorage.removeItem('token');
    //   localStorage.removeItem('userInfo');
    //   this.props.history.push("/auth");
    // }, { once: true });
  }

  // componentWillMount() {
  //   if (this.props.windowWidth > 992 && this.props.windowWidth <= 1024 && this.props.layout !== 'horizontal') {
  //     this.props.onComponentWillMount();
  //   }
  // }

  mobileOutClickHandler() {
    if (this.props.windowWidth < 992 && this.props.collapseMenu) {
      this.props.onComponentWillMount();
    }
  }

  render() {
    let routeItems = mainRoutes;

    const filteredRoutes = routeItems.filter(item => {
      return (JSON.parse(localStorage.getItem('userInfo')).Roles.includes(item.role) === true);
    });

    const menu = filteredRoutes.map((route, index) => {
      return (route.component) ? (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          name={route.name}
          render={props => (
            <route.component {...props} />
          )} />
      ) : (null);
    });

    // const menu = routes.map((route, index) => {
    //   return (route.component) ? (
    //     <Route
    //       key={index}
    //       path={route.path}
    //       exact={route.exact}
    //       name={route.name}
    //       render={props => (
    //         <route.component {...props} />
    //       )} />
    //   ) : (null);
    // });

    return (
      <>
        <Navigation />
        <NavBar />
        <div className="pcoded-main-container" onClick={() => this.mobileOutClickHandler}>
          <div className="pcoded-wrapper">
            <div className="pcoded-content">
              <div className="pcoded-inner-content">
                <Breadcrumb />
                <div className="main-body">
                  <div className="page-wrapper">
                    <Suspense fallback={<Loader />}>
                      <Switch>
                        {menu}
                        <Redirect exact from="/" to={this.props.defaultPath} />
                        <Route><NotFound /></Route>
                      </Switch>
                    </Suspense>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    defaultPath: state.navigation.defaultPath,
    // isFullScreen: state.isFullScreen,
    collapseMenu: state.navigation.collapseMenu,
    configBlock: state.navigation.configBlock,
    layout: state.navigation.layout
  }
};

const mapDispatchToProps = dispatch => {
  return {
    // onFullScreenExit: () => dispatch({ type: actionTypes.FULL_SCREEN_EXIT }),
    onComponentWillMount: () => dispatch(collapseMenu())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(windowSize(AdminLayout));