import React from 'react'
import { Link } from 'gatsby'
import { TARGET_CLASS } from '../../utils/visible'

import './index.scss'

export const ThumbnailItem = ({ node }) => (
  <Link className={`thumbnail ${TARGET_CLASS}`} to={node.fields.slug}>
    <div key={node.fields.slug}>
      <h3 className='thumbnailHead'>{node.frontmatter.title || node.fields.slug}</h3>
      <p dangerouslySetInnerHTML={{ __html: node.frontmatter.description }} /> 
      <p className='thumbnailDate' dangerouslySetInnerHTML={{ __html: node.frontmatter.date }} /> 
 </div>
  </Link>
)

// 여기가 blog의 미리보기 창을 조정할 수 있는 곳
