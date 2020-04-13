/** @jsx jsx */

import { jsx } from "@emotion/core"
import { Link, useStaticQuery, graphql } from "gatsby"

import { rhythm, scale } from "../utils/typography"

const footerLinksStyle = {
  display: "flex",
  justifyContent: "center",
}

const Layout = ({ location, title, children }) => {
  const data = useStaticQuery(
    graphql`
      query LinkedPages {
        allSitePage(
          filter: { componentPath: { regex: "/.*/pages/(?!404)(?!index).*/" } }
        ) {
          totalCount
          edges {
            node {
              path
            }
          }
        }
      }
    `
  )
  const sitePages = data.allSitePage.edges.map(edge => edge.node.path)
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          ...scale(1.5),
          marginBottom: rhythm(1.5),
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    )
  } else {
    header = (
      <h3
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h3>
    )
  }
  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <header>{header}</header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
        <div css={footerLinksStyle}>
          {sitePages
            .filter(page => page !== location.pathname)
            .map(page => (
              <Link to={page}>{page.replace(/^\/+|\/+$/g, "")}</Link>
            ))}
        </div>
      </footer>
    </div>
  )
}

export default Layout
