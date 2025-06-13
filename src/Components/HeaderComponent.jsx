import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Input, Modal } from "semantic-ui-react";
import Badge from "@mui/material/Badge";

const HeaderComponent = ({
  setSearchValue,
  setIsDarkMode,
  isDarkMode,
  setRenderingCartComponent,
  cartPopup,
  brandList,
  setBrandList,
}) => {
  const [darkMode, setDarkMode] = useState(false);
  // Modal state for creating a new brand
  const [createModal, setCreateModal] = useState(false);
  // Form data state for creating a new brand
  const [formData, setFormData] = useState({
    brandName: "",
    quantity: "",
    price: "",
    image: "",
    imageName: "",
    description: "",
    id: "",
  });
  // Error state for form validation
  const [error, setError] = useState({});

  // Effect to set dark mode based on the state
  useEffect(() => {
    setIsDarkMode(darkMode);
  }, [darkMode, setIsDarkMode]);

  //change handler for form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "quantity" || name === "price") {
      if (/^\d{0,4}$/.test(value))
        setFormData((prev) => ({ ...prev, [name]: value }));
    } else if (name === "description" && value.length <= 350) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setError((prev) => ({ ...prev, [name]: "" }));
  };
  // Function to validate the form inputs
  // It checks if all required fields are filled and if the image URL is valid
  const validateForm = () => {
    let errors = {};
    const urlRegex = /^(http[s]?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/i;

    if (!formData.brandName.trim())
      errors.brandName = "Brand Name is required.";
    if (!formData.quantity.trim()) errors.quantity = "Quantity is required.";
    if (!formData.price.trim()) errors.price = "Price is required.";
    if (!formData.image.trim() || !urlRegex.test(formData.image))
      errors.image = "Invalid image URL.";
    if (!formData.imageName.trim())
      errors.imageName = "Image Name is required.";
    if (!formData.description.trim())
      errors.description = "Description is required.";

    setError(errors);
    return Object.keys(errors).length === 0;
  };
  //handleSubmit function to add a new brand item
  const handleSubmit = () => {
    if (validateForm()) {
      const newItem = {
        id: brandList.length+1,
        brandName: formData.brandName,
        quantity: formData.quantity+"ml",
        price: formData.price,
        image: formData.image,
        imgName: formData.imageName,
        description: formData.description,
      };
      setBrandList([...brandList, newItem]);
      setCreateModal(false);
      setFormData({
        brandName: "",
        quantity: "",
        price: "",
        image: "",
        imageName: "",
        description: "",
        id: "",
      });
    }
  };

  // Function to cancel the modal and reset the form
  const cancelBtn = () => {
    setCreateModal(false);
    setError({});
    setFormData({
      brandName: "",
      quantity: "",
      price: "",
      image: "",
      id: "",
      imageName: "",
      description: "",
    });
  };

  return (
    <div
      className="headerComponentContainer"
      style={{
        backgroundColor: isDarkMode ? "#222831" : "#fff",
        paddingRight: "2rem",
      }}
    >
        <div>
            <img src = "" alt ="logo" />
         </div>
      <div>
        <Input
          icon="search"
          transparent
          placeholder="Search..."
          onChange={(e) => setSearchValue(e.target.value)}
          style={{
            backgroundColor: isDarkMode ? "#222831" : "#fff",
            color: isDarkMode ? "#fff" : "#000",
          }}
        />
        <Button
          icon={darkMode ? "moon" : "sun"}
          circular
          onClick={() => setDarkMode(!darkMode)}
        />

        <Button
          content="Add Items"
          icon="plus"
          onClick={() => setCreateModal(true)}
        />

    
        <Badge
          badgeContent={cartPopup?.reduce((t, i) => t + i.count, 0)}
          color="primary"
        >
          <Button
            content="View Cart"
            onClick={() => setRenderingCartComponent(true)}
            icon="cart"
          />
        </Badge>
      </div>
      {createModal && (
        <Modal open={createModal} onClose={cancelBtn}>
          <Modal.Header
            style={{
              backgroundColor: isDarkMode ? "#222831" : "#fff",
              color: isDarkMode ? "#fff" : "#000",
            }}
          >
            ADD BRAND
          </Modal.Header>
          <Modal.Content
            style={{
              backgroundColor: isDarkMode ? "#222831" : "#fff",
              color: isDarkMode ? "#fff" : "#000",
            }}
          >
            <Form>
              <FormGroup widths="equal">
                <Form.Input
                  label="Brand Name"
                  name="brandName"
                  value={formData.brandName}
                  onChange={handleChange}
                  required
                  error={error.brandName ?  { content: error.brandName} : false}
                />

                <Form.Input
                  label="Quantity in (ml)"
                  name="quantity"
                  required
                  value={formData.quantity}
                  onChange={handleChange}
                  error={error.quantity ? { content: error.quantity }:false}
                />

                <Form.Input
                  label="Price"
                  name="price"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  error={error.price ? { content: error.price } :false}
                />
              </FormGroup>
              <FormGroup widths="equal">
                <Form.Input
                  label="Image URL"
                  name="image"
                  required
                  value={formData.image}
                  onChange={handleChange}
                  error={error.image ? { content: error.image } : false}
                />

                <Form.Input
                  label="Image Name"
                  required
                  name="imageName"
                  value={formData.imageName}
                  onChange={handleChange}
                  error={error.imageName ? { content: error.imageName } : false}
                />
              </FormGroup>
              <Form.TextArea
                label="Description"
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                error={error.description ? { content: error.description } : false}
              />
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button content="Cancel" onClick={cancelBtn} />
            <Button content="Add" positive onClick={handleSubmit} />
          </Modal.Actions>
        </Modal>
      )}
    </div>
  );
};

export default HeaderComponent;
