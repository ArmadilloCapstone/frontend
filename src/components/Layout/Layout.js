import Header from "./Header/Header"
import Footer from "./Footer/Footer"
import Sidebar from "./Sidebar/Sidebar"

const Layout = ( {children} ) => {
    return (
        <div>
            <Header />
            <Sidebar />
            {children}
            <Footer />
        </div>
    )
}

export default Layout