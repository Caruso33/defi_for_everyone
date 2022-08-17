import Home from "./views/Home/Home"

import { HomeIcon } from "./components/Icons/Icons"

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Home",
    icon: <HomeIcon color="inherit" />,
    component: Home,
    layout: "/home",
  },
]
export default dashRoutes
