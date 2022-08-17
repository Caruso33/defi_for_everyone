import { ChakraProvider, Portal, useDisclosure } from "@chakra-ui/react"
import React from "react"
import { Route } from "react-router-dom"
import theme from "theme/theme.js"
import MainPanel from "../components/Layout/MainPanel"
import Navbar from "../components/Navbar/Navbar.js"
import Sidebar from "../components/Sidebar"
import routes from "../routes.js"

export default function Dashboard(props) {
  const { ...rest } = props

  const [sidebarVariant, setSidebarVariant] = React.useState("transparent")
  const [fixed, setFixed] = React.useState(false)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const getActiveRoute = (routes) => {
    let activeRoute = "Default Brand Text"
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views)
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute
        }
      } else if (routes[i].category) {
        let categoryActiveRoute = getActiveRoute(routes[i].views)
        if (categoryActiveRoute !== activeRoute) {
          return categoryActiveRoute
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name
        }
      }
    }
    return activeRoute
  }
  // This changes navbar state(fixed or not)
  const getActiveNavbar = (routes) => {
    let activeNavbar = false
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbar(routes[i].views)
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          if (routes[i].secondaryNavbar) {
            return routes[i].secondaryNavbar
          }
        }
      }
    }
    return activeNavbar
  }
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views)
      }
      if (prop.category === "account") {
        return getRoutes(prop.views)
      }
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        )
      } else {
        return null
      }
    })
  }

  return (
    <ChakraProvider theme={theme} resetCss={false}>
      <Sidebar
        routes={routes}
        logoText={"Defi4Everyone"}
        display="none"
        sidebarVariant={sidebarVariant}
        {...rest}
      />

      <MainPanel
        w={{
          base: "100%",
          xl: "calc(100% - 275px)",
        }}
      >
        <Portal>
          <Navbar
            onOpen={onOpen}
            logoText={"Defi4Everyone"}
            brandText={getActiveRoute(routes)}
            secondary={getActiveNavbar(routes)}
            fixed={fixed}
            {...rest}
          />
        </Portal>
      </MainPanel>
    </ChakraProvider>
  )
}
