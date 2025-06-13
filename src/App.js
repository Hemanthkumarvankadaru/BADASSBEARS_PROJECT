
import './App.css';
import React, { useState } from 'react';
import HeaderComponent from './Components/HeaderComponent';
import DataComponent from './Components/DataComponent';
import CartComponent from './Components/CartComponent';
import { aBrand as initialBrandData } from "./Helper";

// import BantiFooter from './Components/BantiFooter';

function App() {
  // State to hold the search value
  const [searchValue, setSearchValue] = useState();
  const [brandList, setBrandList] = useState(initialBrandData);
  //rendering the cart component when the cart icon is clicked
  const [renderingCartComponent, setRenderingCartComponent] = useState(false);
  const [cartPopup, setCartPopup] = useState([]);

  //changing the Modes are colour 
  const [isDarkMode, setIsDarkMode] = useState(false);
  return (
   <>
    <HeaderComponent
      setSearchValue={setSearchValue}
      setIsDarkMode={setIsDarkMode}
      isDarkMode={isDarkMode}
      cartPopup={cartPopup}  
      setRenderingCartComponent={setRenderingCartComponent}
      brandList={brandList}
      setBrandList={setBrandList}
    />
    <div className="ComponentRender" style={{backgroundColor: isDarkMode ? "#222831" :"#fff" }}>
      {
        renderingCartComponent === false ? 
         <DataComponent 
            searchValue={searchValue} 
            isDarkMode={isDarkMode}  
            setCartPopup={setCartPopup}
            cartPopup={cartPopup}   
            brandList={brandList}      
        />  :
        <CartComponent
          setRenderingCartComponent={setRenderingCartComponent}
          renderingCartComponent={renderingCartComponent}
          isDarkMode={isDarkMode}
        />  
     }
      </div>

    {/* <BantiFooter/> */}
   </>
  );
}

export default App;
