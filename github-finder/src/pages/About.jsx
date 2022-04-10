import React from 'react'
import Layout from '../components/Layout'

function About() {
  return (
    <Layout>
      {process.env.REACT_APP_GITHUB_TOKEN}
    </Layout>
  )
}

export default About