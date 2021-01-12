import React from 'react'
import './index.scss'

export const PostContainer = ({ html }) => (
  <div class='post-container' dangerouslySetInnerHTML={{ __html: html }} />
)
