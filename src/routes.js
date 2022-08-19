import { HelpIcon, HomeIcon } from "./components/Icons/Icons"
import Assessment from "./views/Home/Assessment"
import Home from "./views/Home/Home"

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Home",
    icon: <HomeIcon color="inherit" />,
    component: Home,
    layout: "/home",
  },
  {
    path: "/assessment",
    name: "Assessment",
    icon: <HelpIcon color="inherit" />,
    component: Assessment,
    layout: "/home",
  },
]
export default dashRoutes
