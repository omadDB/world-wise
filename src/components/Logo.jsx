import { Link } from "react-router-dom"
import styles from "./Logo.module.css"
// import { IoIosClose } from "react-icons/io"
// import { useCities } from "../contexts/CitiesContext"

function Logo() {
  // const { setSidebarIsOpen } = useCities()
  return (
    <>
      <Link to="/">
        <img src="/logo.png" alt="WorldWise logo" className={styles.logo} />
      </Link>
      {/* <button
        className={styles.closeBtn}
        onClick={() => setSidebarIsOpen(false)}
      >
        <IoIosClose />
      </button> */}
    </>
  )
}

export default Logo
