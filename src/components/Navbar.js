import React from "react";
import { Link, NavLink } from "react-router-dom";
import { auth } from "../auth/AuthService";

export const Navbar =(props)=> {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <img alt="" src="https://bulma.io/images/bulma-logo.png" />
          </Link>
          <Link
            onClick={() =>
              props.toggleActiveStatus(
                "activeStatus",
                "navbar",
                props.navActive
              )
            }
            to={window.location}
            role="button"
            className={`navbar-burger burger ${
              props.navActive ? "is-active" : ""
            }`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbar"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </Link>
        </div>
        <div
          id="navbar"
          className={`navbar-menu ${props.navActive ? "is-active" : ""}`}
        >
          <div className="navbar-start">
            <NavLink className="navbar-item" exact to="/">
              <i className="fas fa-home" />
              &nbsp; Home
            </NavLink>
            <NavLink className="navbar-item" to="/dashboard">
              <i className="fas fa-chart-line" />
              &nbsp; Dashboard
            </NavLink>
            <NavLink className="navbar-item" to="/chat">
              <i className="fas fa-comments" />
              &nbsp; Chat
            </NavLink>
            <NavLink className="navbar-item" to="/profile">
              <i className="fas fa-user-alt" />
              &nbsp;{" "}
              {props.auth
                ? `${localStorage.getItem("username")}`
                : "Guest"}
            </NavLink>
          </div>
          <div className="navbar-end">
            <div className="navbar-item field has-addons">
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Search product"
                />
              </div>
              <div
                className="control"
                onClick={() =>
                  alert(
                    "This action will later show all products matched by name"
                  )
                }
              >
                <button className="button is-info">
                  <i className="fas fa-search" />
                </button>
              </div>
            </div>
            <div className="navbar-item">
              <div className="buttons">
                {props.auth ? (
                  <button
                    className="button is-light"
                    onClick={() => {
                      auth.logout();
                      props.toggleAuthStatus(false);
                    }}
                  >
                    <i className="fas fa-sign-out-alt" />
                    &nbsp; Log Out
                  </button>
                ) : (
                  <React.Fragment>
                    <button
                      className="button is-primary"
                      onClick={() =>
                        props.toggleActiveStatus(
                          "activeStatus",
                          "signUp",
                          props.signUpActive
                        )
                      }
                    >
                      <i className="fas fa-sign-in-alt" />
                      &nbsp; Sign Up
                    </button>
                    <button
                      className="button is-light"
                      onClick={() =>
                        props.toggleActiveStatus(
                          "activeStatus",
                          "logIn",
                          props.logInActive
                        )
                      }
                    >
                      <i className="fas fa-user-circle" />
                      &nbsp; Log In
                    </button>
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
}
