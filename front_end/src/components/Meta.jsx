import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({title = '', description = 'Find the best products', keywords = 'electronics'}) => {
  return (
    <Helmet>
      <title>e-Shop | {title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  )
}

export default Meta