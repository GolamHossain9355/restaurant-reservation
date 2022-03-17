import React, { useState } from "react";
import Menu from "./Menu";
import Routes from "./Routes";

import "./Layout.css";

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Layout() {
  const [hasClicked, setHasClicked] = useState(false);

  const clickHandler = () => {
    setHasClicked(!hasClicked);
  };

  const outsideClickHandler = () => {
    if (hasClicked) {
      setHasClicked(false);
    }
  };

  return (
    <div onClick={outsideClickHandler}>
      <Menu clickHandler={clickHandler} hasClicked={hasClicked} />
      <Routes />
    </div>
  );
}

export default Layout;
