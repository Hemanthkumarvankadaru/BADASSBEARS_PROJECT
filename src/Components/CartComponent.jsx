import { Button } from "semantic-ui-react";

const CartComponent = ({ isDarkMode,setRenderingCartComponent }) => {

    return (
        <div
            className="cart_page"
            style={{
                backgroundColor: isDarkMode ? "#222831" : "#fff",
                color: isDarkMode ? "#fff" : "#000",
                marginTop: "2rem",
            }}
        >
            <div style={{width: "100%", textAlign: "center", marginBottom: "1rem",display: "flex", justifyContent: "flex-end"}}>
                <Button
                    content="Back to Products"
                    icon="arrow left"
                    onClick={()=> setRenderingCartComponent(false)}
                    color={isDarkMode ? "white" : "black"}          
                />
            </div>
            <div className="cart-component">

                <h2>Cart</h2>
                <p>Items in your cart will be displayed here.</p>
            </div>
        </div>
    );
};

export default CartComponent;
