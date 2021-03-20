import React, { useState } from "react";
import { Link, graphql, StaticQuery } from "gatsby";


import './SearchStyle.scss'

const Search = (props) => {
  const emptyQuery = "";

  const [state, setState] = useState({
    filteredData: [],
    query: emptyQuery,
  });

  const handleInputChange = (event) => {
    const query = event.target.value;
    const { data } = props;
    const posts = data.allMarkdownRemark.edges || [];

    const filteredData = posts.filter((post) => {
      const { description, title, tags } = post.node.frontmatter;
      return (
        (description &&
          description.toLowerCase().includes(query.toLowerCase())) ||
        (title && title.toLowerCase().includes(query.toLowerCase())) ||
        (tags && tags.join("").toLowerCase().includes(query))
      );
    });

    setState({
      query,
      filteredData,
    });
  };

  const renderSearchResults = () => {
    const { query, filteredData } = state;
    const hasSearchResults = filteredData && query !== emptyQuery;
    const posts = hasSearchResults ? filteredData : [];
    return (
      posts &&
      posts.map(({ node }) => {
        const { excerpt } = node;

        const { slug } = node.fields;
        const { title, date, description } = node.frontmatter;
        return (
          <Link to={slug}>
          <div key={slug} className="search-article">
            <article key={slug}>
              <header>
                <h2 className="search-title">
                {title}
                </h2>
              </header>
              <section>
                <p
                  className="search-description"
                  dangerouslySetInnerHTML={{
                    __html: description || excerpt,
                  }}
                />
                <p className="search-date">
                  <em>{date}</em>
                </p>
              </section>
            </article>
          </div>
          </Link>
        );
      })
    );
  };

  return (
    <div className="search">
      <input type="checkbox" id="trigger" class="search__checkbox" />
  <label class="search__label-init" for="trigger"></label>
  <label class="search__label-active" for="trigger"></label>
  <div class="search__border"></div>
          <input
            type="text"
            class="search__input"
            placeholder="Search"
            aria-label="Search"
            onChange={handleInputChange}
          />
          
      {state.query && (
        <div className="search_result">
          {renderSearchResults()}
        </div>
      )}
  <div class="search__close"></div>
    </div>
  );
};

export default (props) => (
  <StaticQuery
    query={graphql`
      query {
        allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {
          edges {
            node {
              excerpt(pruneLength: 200)
              id
              frontmatter {
                title
                description
                date(formatString: "MMMM DD, YYYY")
                tags
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `}
    render={(data) => <Search data={data} {...props} />}
  />
);