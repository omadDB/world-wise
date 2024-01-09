import styles from "./Sidebar.module.css"
import Logo from "./Logo"
import AppNav from "./AppNav"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"
// import { useCities } from "../contexts/CitiesContext"

function Sidebar() {
  // const { sidebarIsOpen, setSidebarIsOpen } = useCities()

  return (
    <div
      className={styles.sidebar}
      // className={
      //   sidebarIsOpen
      //     ? `${styles.sidebar} ${styles["sidebar-open"]}`
      //     : `${styles.sidebar}`
      // }
    >
      <Logo />
      <AppNav />

      <Outlet />

      <Footer />
    </div>
  )
}

export default Sidebar
