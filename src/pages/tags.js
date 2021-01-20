import { Link,graphql } from 'gatsby'
import _ from 'lodash'
import React from 'react'
import kebabCase from "lodash/kebabCase"
import { Helmet } from "react-helmet"
import { Layout } from '../layout'
import { Top } from '../components/top'
import * as Dom from '../utils/dom'
import * as EventManager from '../utils/event-manager'

const BASE_LINE = 80

function getDistance(currentPos) {
  return Dom.getDocumentHeight() - currentPos
}

const rootPath = `/`

const TagsPage = ({location,
    data: {
      allMarkdownRemark: { group },
      site: {
        siteMetadata: { title },
      },
    }
  }) => {

    return (
    <div>
       <Top title={title} location={location} rootPath={rootPath} />
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
          }

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
