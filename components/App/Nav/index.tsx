import { signin, signout, useSession } from 'next-auth/client'
import Link from 'next/link'
import Image from 'next/image'

/* 
import { useContext } from 'react'
import { AppContext } from 'context'
 */
const menu = [
  {
    to: "/settings",
    label: "Parametros",
  }
]
const Nav = () => {
  const { NEXTAUTH_URL } = process.env,
    [session, loading] = useSession();

  /* { menu } = useContext(AppContext); */

  return !session && loading ? 'Loading' : (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark justify-content-between">
      <div className="container-fluid">
        <Image
          width="150"
          height="150"
          data-testid="navbarImgLogo"
          className="logo"
          src="/images/prisma-logo-white.svg"
          alt="Prisma MP"
        />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            {menu.map(({ to, label }: any, k: any) => (
              <li className="nav-item" key={k}>
                <Link href={to}>
                  <a className="nav-link" aria-current="page">{label}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/*
        <li className="nav-item">
          {session ? (
            <Link href={`/api/auth/signout`}>
              <a
                className="nav-link"
                aria-current="page"
                onClick={(e) => {
                  e.preventDefault()
                  signout()
                }}
              >
                Cerrar Sesion
        </a>
            </Link>
          ) : (
              <Link href={`/api/auth/signin`}>
                <a
                  className="nav-link"
                  aria-current="page"
                  onClick={(e) => {
                    e.preventDefault()
                    signin()
                  }}
                >
                  Ingresar
      </a>
              </Link>
            )}
        </li>
        */}
      </div>
    </nav>
  )
}

export default Nav