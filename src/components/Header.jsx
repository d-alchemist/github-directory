import { Link, useLocation } from "react-router-dom";

export default function Header({title}) {
  const location = useLocation();
  
  return (
    <header className="pb-3 mb-4 d-flex justify-content-center w-100 align-items-center border-bottom">
      <Link to={'/'} style={{ textDecoration: "none" }}>
        <i className="bx bx-home mb-0" style={{fontSize: 24}}></i>
      </Link>
      <h1 className="h3 mx-auto text-primary">{title}</h1>
      <Link to={`${ location.pathname !== '/users' ? '/users' : '/repos' }`}>
        <i className="bx bx-transfer-alt bx-rotate-90" title="Switch" style={{fontSize: 24}}></i>
      </Link>
    </header>
  )
}