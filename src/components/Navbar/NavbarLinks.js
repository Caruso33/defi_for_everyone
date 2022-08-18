import { Flex, Icon, Tooltip } from "@chakra-ui/react"
import SidebarResponsive from "components/Sidebar/SidebarResponsive"
import PropTypes from "prop-types"
import { FaWallet } from "react-icons/fa"
import { useMoralis } from "react-moralis"
import routes from "routes.js"

export default function HeaderLinks(props) {
  const { variant, children, fixed, secondary, onOpen, ...rest } = props

  const { enableWeb3, isWeb3Enabled, deactivateWeb3, account } = useMoralis()

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

      <Tooltip placement="left" label={account} shouldWrapChildren>
        <Icon
          onClick={isWeb3Enabled ? deactivateWeb3 : enableWeb3}
          cursor="pointer"
          me="16px"
          ms={{ base: "16px", xl: "0px" }}
          color={isWeb3Enabled ? "teal.300" : "gray.500"}
          w="18px"
          h="18px"
          as={FaWallet}
        />
      </Tooltip>
    </Flex>
  )
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
}
