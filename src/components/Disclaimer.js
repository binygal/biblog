/** @jsx jsx */

import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { jsx } from "@emotion/core"
import { Fragment } from "react"

const disclaimerStyle = {
  backgroundColor: "#F9E79F",
  border: "solid 1px #B7950B",
  padding: 5,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
}

const disclaimerMessageStyle = {
  display: "block",
  borderWidth: "2px 0",
  borderStyle: "solid",
  borderColor: "black",
  padding: "1.5em 0 0.5em",
  margin: "1.5em 0",
  position: "relative",
  "&:before": {
    content: "foo",
    position: "absolute",
    top: "0em",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "#fff",
    width: "3rem",
    height: "2rem",
    font: "6em/1.08em 'PT Sans', sans-serif",
    color: "black",
    textAlign: "center",
  },
  "&:after": {
    content: '"\\2013 \\2003" attr(cite)',
    display: "block",
    textAlign: "right",
    fontSize: "0.675em",
    color: "#e74c3c",
  },
}

const Disclaimer = () => {
  const data = useStaticQuery(graphql`
    query {
      construction: file(absolutePath: { regex: "/construction.png/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
  return (
    <Fragment>
      <div css={disclaimerStyle}>
        <Image
          fixed={data.construction.childImageSharp.fixed}
          alt="construction_sign"
          style={{ margin: 10, padding: 20 }}
        />
        <div>
          <blockquote
            css={disclaimerMessageStyle}
            cite=" A smart man that I've just invented."
          >
            Before you make the jar nicer, make some cookies.
          </blockquote>
          <span>
            I'm trying to make some content before making the blog nicer. Sorry.
          </span>
        </div>
      </div>
    </Fragment>
  )
}

export default Disclaimer
