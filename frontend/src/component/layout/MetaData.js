import React from 'react';
import Helmet from 'react-helmet';


const MetaData = ({ title }) => {
  return (
    /* A component that allows us to add meta data to our page. */
    <Helmet>
        <title>{title}</title>
    </Helmet>
  )
}

export default MetaData