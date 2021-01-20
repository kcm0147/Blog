import { Link,graphql } from 'gatsby'
import _ from 'lodash'
import React, { useMemo } from 'react'
import kebabCase from "lodash/kebabCase"
import { Helmet } from "react-helmet"
import { Bio } from '../components/bio'
import { Category } from '../components/category'
import { Contents } from '../components/contents'
import { Head } from '../components/head'
import { HOME_TITLE } from '../constants'
import { useCategory } from '../hooks/useCategory'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { useRenderedCount } from '../hooks/useRenderedCount'
import { useScrollEvent } from '../hooks/useScrollEvent'
import { Layout } from '../layout'
import * as Dom from '../utils/dom'
import * as EventManager from '../utils/event-manager'

const BASE_LINE = 80
// 제일 처음 블로그에 접속했을때의 페이지 내용
function getDistance(currentPos) {
  return Dom.getDocumentHeight() - currentPos
}

const TagsPage = ({
    data: {
      allMarkdownRemark: { group },
      site: {
        siteMetadata: { title },
      },
    },
  }) => (
    <div>
      <Helmet title={title} />
      <div>
        <h1>Tags</h1>
        <ul>
          {group.map(tag => (
            <li key={tag.fieldValue}>
              <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        configs {
          countOfInitialPost
        }
      }
    }
    allMarkdownRemark(limit : 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
          }
      edges {
        node {
          excerpt(pruneLength: 200, truncate: true)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            category
            draft
            description
            tags
          }
        }
      }
    }
  }
`
