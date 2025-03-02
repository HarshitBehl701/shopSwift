import { ReactNode } from "react"
import Navbar from "../components/customComponents/Navbar"
import Footer from "../components/customComponents/Footer"

function BaseLayout({children}:{children:ReactNode}) {
  return (
    <>
    <Navbar />
    <div className="main min-h-screen">
        {children}
    </div>
    <Footer />
    </>
  )
}

export default BaseLayout