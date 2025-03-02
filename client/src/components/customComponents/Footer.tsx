import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="bg-gray-900 text-white text-center p-3 mt-8  text-xs">
    <p>&copy; {new Date().getFullYear()} ShopSwift. All rights reserved.</p>
    <div className="flex justify-center gap-4 mt-1">
      <Link to="/privacy" className="hover:text-gray-400">Privacy Policy</Link>
      <Link to="/terms" className="hover:text-gray-400">Terms of Service</Link>
      <Link to="/seller_registration" className="hover:text-gray-400">Join as a seller</Link>
    </div>
  </footer>
  )
}

export default Footer