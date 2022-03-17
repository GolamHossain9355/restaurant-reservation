import React, { useState } from "react";
import { Motion, spring } from "react-motion";
import { Link } from "react-router-dom";
import { useMediaQuery } from "./useMediaQuery";
import "./Layout.css";

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu({ hasClicked, clickHandler }) {
  const minWidth = useMediaQuery("(min-width: 650px)");

  const styles = {
    container: (width, style) => ({
      transform: `translateX(${width ? style.y : style.x}px)`,
      opacity: width ? style.opacity : style.opacityY,
      display: "flex",
    }),
  };

  return (
    <>
      <Motion
        defaultStyle={{
          x: -700,
          opacity: 0,
          y: -100,
          opacityY: 0,
        }}
        style={{
          x: spring(hasClicked ? 0 : -700),
          opacity: spring(0.9),
          y: spring(0),
          opacityY: spring(hasClicked ? 0.9 : 0),
        }}
      >
        {(style) => (
          <div
            className="animatedNavbar"
            style={{
              transform: `translateY(${style.y}px)`,
              opacity: style.opacity,
            }}
          >
            <nav className="navbar">
              <a className="toggle-button" href="#" onClick={clickHandler}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
              </a>
              <div className="title">
                <Link className="logo" to="/">
                  <i className="icon fa-solid fa-house-chimney fa-sm"></i>
                  Reservations
                </Link>
              </div>
              <div
                className="navbar-links"
                style={styles.container(minWidth, style)}
              >
                <ul onClick={clickHandler}>
                  <li>
                    <Link className="link" to="/dashboard">
                      <i className="icon fa-solid fa-chalkboard-user fa-xs"></i>
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link className="link" to="/search">
                      <i className="icon fa-solid fa-magnifying-glass fa-xs"></i>
                      Search
                    </Link>
                  </li>
                  <li>
                    <Link className="link" to="/reservations/new">
                      <i className="icon fa-solid fa-plus fa-sm"></i>
                      Reservation
                    </Link>
                  </li>
                  <li>
                    <Link className="link" to="/tables/new">
                      <i className="icon fa-regular fa-square-plus fa-sm"></i>
                      Table
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        )}
      </Motion>
    </>
  );
}

export default Menu;
