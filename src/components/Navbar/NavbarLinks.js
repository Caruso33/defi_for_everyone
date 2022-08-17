import { BellIcon } from "@chakra-ui/icons"
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"

import avatar1 from "assets/img/avatars/avatar1.png"
import avatar2 from "assets/img/avatars/avatar2.png"
import avatar3 from "assets/img/avatars/avatar3.png"
// Custom Icons
import { ProfileIcon, SettingsIcon } from "components/Icons/Icons"
// Custom Components
import { ItemContent } from "components/Menu/ItemContent"
import SidebarResponsive from "components/Sidebar/SidebarResponsive"
import PropTypes from "prop-types"
import React from "react"
import { NavLink } from "react-router-dom"
import routes from "routes.js"

export default function HeaderLinks(props) {
  const { variant, children, fixed, secondary, onOpen, ...rest } = props

  // Chakra Color Mode
  let mainText = useColorModeValue("gray.700", "gray.200")
  let navbarIcon = useColorModeValue("gray.500", "gray.200")

  if (secondary) {
    navbarIcon = "white"
  }
  const settingsRef = React.useRef()
  return (
    <Flex
      pe={{ sm: "0px", md: "16px" }}
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection="row"
    >
      <SidebarResponsive
        logoText={props.logoText}
        secondary={props.secondary}
        routes={routes}
        // logo={logo}
        {...rest}
      />
      Sign In
    </Flex>
  )
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
}
