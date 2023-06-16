import React from "react";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Avatar,
} from "@chakra-ui/react";
import { FaAngleDown } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";

const MenuBar = () => {
  const {
    user,
    isAuthenticated,
    loginWithPopup,
    logout,
    getAccessTokenSilently,
  } = useAuth0();

  const getToken = async () => {
    const token = await getAccessTokenSilently();
    console.log(token);
  };
  return (
    <div className="">
      <Menu>
        {user && <Avatar className="mr-4" src={user.picture} />}
        <MenuButton as={Button} rightIcon={<FaAngleDown />}>
          Profile
        </MenuButton>
        <MenuList>
          {!isAuthenticated && (
            <MenuItem onClick={loginWithPopup}>
              <p className="text-black">Log In</p>
            </MenuItem>
          )}
          {isAuthenticated && (
            <MenuItem onClick={logout}>
              <p className="text-black">Log Out</p>
            </MenuItem>
          )}
          <MenuItem onClick={getToken}>Token</MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

export default MenuBar;
