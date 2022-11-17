import React, { useState } from 'react'
import './Search.css';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';


const Search = ({ history }) => {

    let navigate = useNavigate();
    const [keyword, setKeyword] = useState('');

    const searchSubmitHandler = (e) => {
/* It prevents the default action of the form, which is to reload the page. */
      e.preventDefault();

      /* Checking if the keyword is empty or not. If it is empty, it will redirect
      to the products page. If it is not empty, it will redirect to the products
      page with the keyword. */
      if(keyword.trim()){
        navigate(`/products/${keyword}`);
      }/* If the keyword is empty, it will redirect to the products page. */
      else{
        navigate('/products');
      }
    };
    
  return (
    <>
        <MetaData title = 'Search A Product -- AMAR-BAZAR' />
        
        <form className='searchBox' onSubmit={searchSubmitHandler} >
            <input 
                type="text"
                placeholder="Search a product here..."
                onChange={(e) => setKeyword(e.target.value)}
            />

            <input type="submit" value="Search" />
        </form>
    </>
  )
}

export default Search