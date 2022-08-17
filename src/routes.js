// import
import Dashboard from "views/Dashboard/Dashboard"

import { HomeIcon } from "components/Icons/Icons"

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/admin",
  },
]
export default dashRoutes
