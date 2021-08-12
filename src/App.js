import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { checkUserSession } from "./redux/User/user.actions";

// components
import AdminToolBar from "./components/AdminToolBar";

// hoc
import WithAuth from "./hoc/withAuth";
import WithAdminAuth from "./hoc/withAdminAuth";

// layouts
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";
import AdminLayout from "./layouts/AdminLayout";

// pages
import Homepage from "./pages/Homepage";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Recovery from "./pages/Recovery";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import "./default.scss";

const App = (props) => {
  // authListener = null;
  // const { setCurrentUser } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    // const { setCurrentUser } = this.props;
    // const authListener = auth.onAuthStateChanged(async (userAuth) => {
    //   if (userAuth) {
    //     const userRef = await handleUserProfile(userAuth);
    //     userRef.onSnapshot((snapshot) => {
    //       dispatch(
    //         setCurrentUser({
    //           id: snapshot.id,
    //           ...snapshot.data(),
    //         })
    //       ); // when signin/ signout redux update information
    //     });
    //   }

    //   dispatch(setCurrentUser(userAuth));
    // });

    // return () => {
    //   authListener();
    // };
    dispatch(checkUserSession());
  }, []);

  // componentDidMount() {
  //   const { setCurrentUser } = this.props;

  //   this.authListener = auth.onAuthStateChanged(async (userAuth) => {
  //     if (userAuth) {
  //       const userRef = await handleUserProfile(userAuth);
  //       userRef.onSnapshot((snapshot) => {
  //         setCurrentUser({
  //           id: snapshot.id,
  //           ...snapshot.data(),
  //         }); // when signin/ signout redux update information
  //       });
  //     }

  //     setCurrentUser(userAuth);
  //   });
  // }

  // componentWillUnmount() {
  //   this.authListener();
  // }

  return (
    <div className="App">
      <div className="main">
        <AdminToolBar />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <HomepageLayout>
                <Homepage />
              </HomepageLayout>
            )}
          />
          <Route
            path="/registration"
            render={() => (
              // currentUser ? (
              //   <Redirect to="/" />
              // ) :
              <MainLayout>
                <Registration />
              </MainLayout>
            )}
          />
          <Route
            path="/login"
            render={() => (
              // currentUser ? (
              //   <Redirect to="/" />
              // ) :
              <MainLayout>
                <Login />
              </MainLayout>
            )}
          />
          <Route
            path="/recovery"
            render={() => (
              <MainLayout>
                <Recovery />
              </MainLayout>
            )}
          />
          <Route
            path="/dashboard"
            render={() => (
              <WithAuth>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </WithAuth>
            )}
          />
          <Route
            path="/admin"
            render={() => (
              <WithAdminAuth>
                <AdminLayout>
                  <Admin />
                </AdminLayout>
              </WithAdminAuth>
            )}
          />
        </Switch>
      </div>
    </div>
  );
};

export default App;
