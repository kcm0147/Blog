import React from 'react'

import { Top } from '../components/top'
import { Header } from '../components/header'
import { ThemeSwitch } from '../components/theme-switch'
import { Footer } from '../components/footer'
import { rhythm } from '../utils/typography'

import './tagindex.scss'

export const Layout = ({ location, title, children }) => {
  const Path = `${__PATH_PREFIX__}/tag`
  return (
    <React.Fragment>
      <Top title={title} location={location} rootPath={Path} />
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(34),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <ThemeSwitch />
        <Header title={title} location={location} rootPath={Path} />
        {children}
        <Footer />
      </div>
    </React.Fragment>
  )
}
