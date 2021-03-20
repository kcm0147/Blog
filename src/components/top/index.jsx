import React from 'react'
import { Link } from 'gatsby'
import { GitHubIcon } from '../social-share/github-icon'
import Search from '../search/search.js'

import './index.scss'

export const Top = ({ title, location, rootPath }) => {
  const isRoot = location.pathname === rootPath
  const isTag = location.pathname === `/tags`
  return (
    <div className="top">
      {!isRoot && (
        <Link to={`/`} className="link">
          {title}
        </Link>
      )}

      <Search/>
      
      {!isTag && (
        <Link to={`/tags`} className="tag">
          Tag
        </Link>
      )}
        
    </div>
  )
}
