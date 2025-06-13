import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  Dimmer,
  Loader,
  Modal,
} from "semantic-ui-react";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const DataComponent = ({
  searchValue,
  isDarkMode,
  setCartPopup,
  cartPopup,
  brandList,
}) => {
  const [loading, setLoading] = useState(true);
  const [selectedState, setSelectedState] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const searchTerm = searchValue?.toLowerCase() || "";

  // Filter items based on searchValue
  const filteredBrands = brandList.filter(
    (item) =>
      item.brandName?.toLowerCase()?.includes(searchTerm) ||
      item.description?.toLowerCase()?.includes(searchTerm)
  );

  useEffect(() => {
    setLoading(false);
  }, []);

  console.log(filteredBrands);

  //store the selected item in the indexed db 
  function saveToIndexedDB(item) {
  const request = indexedDB.open("CartDB", 1);

  request.onupgradeneeded = function (event) {
    const db = event.target.result;
    db.createObjectStore("cartItems", { keyPath: "id" });
  };
  request.onerror = function(event) {
  console.error("Failed to open database:", event.target.error);
  toast.error("Failed to open database contact Hemanth");
};

  request.onsuccess = function (event) {
    const db = event.target.result;
    const tx = db.transaction("cartItems", "readwrite");
    const store = tx.objectStore("cartItems");
    store.put(item);   // adds or updates
  };
}

  return (
    <div className="componentsData">
      {loading ? (
        <Dimmer active={loading}>
          <Loader>Loading...</Loader>
        </Dimmer>
      ) : (
        <>
          {filteredBrands.length > 0 ? (
            filteredBrands.map((itemDetails, index) => (
              <Card
                style={{
                  backgroundColor: isDarkMode ? "#222831" : "#fff",
                  height: "250px",
                  padding: "none",
                  paddingBottom: "2rem",

                }}
                key={itemDetails.id + index}
                onClick={() => {
                  setSelectedState(itemDetails);
                  setIsModalOpen(true);
                }}
              >
                <img src={itemDetails.image} alt={itemDetails.imgName}/>
                <CardContent
                  style={{ backgroundColor: isDarkMode ? "#222831" : "#fff" }}
                >
                  <CardHeader
                    style={{
                      backgroundColor: isDarkMode ? "#222831" : "#fff",
                      color: isDarkMode ? "#fff" : "#000",
                    }}
                  >
                    {itemDetails.brandName}
                  </CardHeader>
                  <CardDescription
                    style={{
                      backgroundColor: isDarkMode ? "#222831" : "#fff",
                      color: isDarkMode ? "#fff" : "#000",
                    }}
                  >
                    
                    {itemDetails.quantity}
                  </CardDescription>
                </CardContent>

                <CardContent style={{ 
                    backgroundColor: isDarkMode ? "#222831" : "#fff",
                      color: isDarkMode ? "#fff" : "#000",
                      fontSize:"1rem",
                    }} extra>
                    <b>&#8377;{itemDetails.price}</b>
                </CardContent>
              </Card>
            ))
          ) : (
            <p
              style={{
                backgroundColor: isDarkMode ? "#222831" : "#fff",
                color: isDarkMode ? "#fff" : "#000",
                display: "flex",
                justifyContent: "center",
                fontSize: "20px",
              }}
            >
              No items found matching : "{searchValue}"
            </p>
          )}
          <ToastContainer
            position="top-center"
            limit={1}
            theme="colored"
            autoClose={1000}
          />
        </>
      )}

      {isModalOpen && selectedState && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          open={isModalOpen}
          style={{
            backgroundColor: isDarkMode ? "#222831" : "#fff",
            color: isDarkMode ? "#fff" : "#000",
          }}
        >
          <Modal.Header
            style={{
              backgroundColor: isDarkMode ? "#222831" : "#fff",
              color: isDarkMode ? "#fff" : "#000",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {selectedState.brandName}
            <div>
              <Button
                color={isDarkMode ? "white" : "black"}
                icon="plus cart"
                content="Add to Cart"
                labelPosition="left"
                onClick={() => {
                  // Check  the item is already in the cart
                  const existingItem = cartPopup.find(
                    (item) => item.id === selectedState.id
                  );

                  if (existingItem) {
                    if (existingItem.count >= 12) {
                      toast.error(
                        "You can only add up to 12 of the same item to the cart"
                      );
                      setIsModalOpen(false);
                      return;
                    }

                    const updatedCart = cartPopup.map((item) =>
                      item.id === selectedState.id
                        ? { ...item, count: item.count + 1 }
                        : item
                    );
                    setCartPopup(updatedCart);
                  } else {
                    setCartPopup([
                      ...cartPopup,
                      { id: selectedState.id, count: 1 },
                    ]);
                  }
                  // Save to IndexedDB
                  saveToIndexedDB({ ...selectedState, count: 1 });
                  // Show success toast
                  toast.success("Successfully added to cart");
                  setIsModalOpen(false);
                }}
              />
            </div>
          </Modal.Header>

          <Modal.Content
            style={{
              backgroundColor: isDarkMode ? "#222831" : "#fff",
              color: isDarkMode ? "#fff" : "#000",
            }}
          >
            <img src={selectedState.image} alt={selectedState.name} />

            <Modal.Description
              style={{
                backgroundColor: isDarkMode ? "#222831" : "#fff",
                color: isDarkMode ? "#fff" : "#000",
              }}
            >
              <h2
                style={{
                  backgroundColor: isDarkMode ? "#222831" : "#fff",
                  color: isDarkMode ? "#fff" : "#000",
                }}
              >
                Price: &#8377;{selectedState.price}
              </h2>

              <p
                style={{
                  backgroundColor: isDarkMode ? "#222831" : "#fff",
                  color: isDarkMode ? "#fff" : "#000",
                }}
              >
                {selectedState.description}
              </p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions
            style={{
              backgroundColor: isDarkMode ? "#222831" : "#fff",
              color: isDarkMode ? "#fff" : "#000",
            }}
          >
            <Button
              color={isDarkMode ? "white" : "black"}
              onClick={() => setIsModalOpen(false)}
              content="Close"
            />
          </Modal.Actions>
        </Modal>
      )}
    </div>
  );
};

export default DataComponent;
