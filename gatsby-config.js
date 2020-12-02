/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `Health News EZDOC`,
    siteUrl: "https://blogs.ezdoc.pk",
    image: "https://ezdoc.pk/logo.png",
    description: "Health News",
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `articles`,
        path: `${__dirname}/content/articles`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `news`,
        path: `${__dirname}/content/news`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`, `.mdx`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        sitemapSize: 5000,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-image`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-material-ui`,
  ],
}
