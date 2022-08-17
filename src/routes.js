import Home from "./views/Home"

import { HomeIcon } from "./components/Icons/Icons"

var dashRoutes = [
  {
    path: "/",
    name: "Home",
    icon: <HomeIcon color="inherit" />,
    component: Home,
    layout: "/",
  },
]
export default dashRoutes
