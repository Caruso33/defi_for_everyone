import { Flex } from "@chakra-ui/react"
import SidebarResponsive from "components/Sidebar/SidebarResponsive"
import PropTypes from "prop-types"
import routes from "routes.js"

export default function HeaderLinks(props) {
  const { variant, children, fixed, secondary, onOpen, ...rest } = props

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
