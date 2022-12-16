import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'
import { NavLink, Route, useParams, useHistory } from 'react-router-dom';

import { editSpot, deleteSpot } from '../../store/spots';
import './EditSpotForm.css'

import React, { useState } from 'react';

const EditSpotForm = ({isLoaded}) => {

  const dispatch = useDispatch();

  let user = useSelector(state => {
    // console.log(state)

    return state.session.user
  })

  let singleSpot = useSelector(state => {
    // console.log(state)

    return state.spots.singleSpot

  })

  // const { name as initialName, } = singleSpot



  const { spotId } = useParams()
  // console.log(spotId)


  const history = useHistory();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [images, setImages] = useState('');

  const updateName = (e) => setName(e.target.value);
  const updateAddress = (e) => setAddress(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateState = (e) => setState(e.target.value);
  const updateCountry = (e) => setCountry(e.target.value);
  const updateLat = (e) => setLat(e.target.value);
  const updateLng = (e) => setLng(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);
  const updatePreviewImage = (e) => setPreviewImage(e.target.value);
  const updateImages = (e) => setImages(e.target.value);

  const [errors, setErrors] = useState({});

  const [shouldShowErrors, setShouldShowErrors] = useState(false);


  const validateForm = () => {

    // setErrors({})

    const newErrors = {}

    if (!name) {
      newErrors.name = 'Name is required'

    } else if ( name.length < 1 || name.length > 50){
        newErrors.name = 'Name must be less than 50 characters'

    } else {
      newErrors.name = null
      delete newErrors.name
    }

    if(!address){
      newErrors.address = 'Street address is required'

    } else {
        newErrors.address = null
        delete newErrors.address
    }

    if(!city){
      newErrors.city = 'City is required'

    } else {
      newErrors.city = null
      delete newErrors.city
  }

    if(!state){
      newErrors.state = 'State is required'

    } else {
      newErrors.state = null
      delete newErrors.state
  }

    if(!country){
      newErrors.country = 'Country is required'

    } else {
      newErrors.country = null
      delete newErrors.country
  }

  //   if(!lat){
  //     newErrors.lat = 'Latitude is required'

  //   } else if ((parseFloat(lat) < -90) || (parseFloat(lat) > 90)){
  //     newErrors.lat = 'Latitude is not valid'

  //   } else {
  //     newErrors.lat = null
  //     delete newErrors.lat
  // }

  //   if(!lng){
  //     newErrors.lng = 'Longitude is required'

  //   } else if ((parseFloat(lng) < -180) || (parseFloat(lng) > 180)) {
  //       newErrors.lng = 'Longitude is not valid'

  //   } else {
  //     newErrors.lng = null
  //     delete newErrors.lng
  // }

    if(!description){
      newErrors.description = 'Description is required'

    } else {
      newErrors.description = null
      delete newErrors.description
  }

    if(!price){
      newErrors.price = 'Price is required'

    } else if (parseFloat(price) < 1){
      newErrors.price = 'Price must be greater than $1'

    } else {
      newErrors.price = null
      delete newErrors.price
  }

    setErrors({
      // ...errors,
      ...newErrors
    })

    if(errors.length > 0) console.log(errors)


  };

  useEffect(() => {
    validateForm()
  }, [
      name,
      address,
      city,
      state,
      country,
      lat,
      lng,
      description,
      price
  ])


  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate the form
    setShouldShowErrors(true);
    validateForm();

    // console.log('submit')

    // console.log(Object.keys(errors).length, Object.keys(errors))


    // If there are no errors, submit the form to your API
    if (Object.keys(errors).length === 0) {
      // Submit the form to your API
        const payload = {
          spotId,
          name,
          address,
          city,
          state,
          country,
          lat: `${lat}`,
          lng: `${lng}`,
          description,
          price
        };

        console.log({payload})

        let editedSpot = await dispatch(editSpot(payload))

        // console.log('edited spot ----', {editedSpot})

        if (editedSpot) {
          // console.log('new redirect param',editedSpot.id)
          history.push(`/spots/${editedSpot.id}`);
        }
    }
  };

  const isValidURL = (string) => {
    const res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
  };

  const confirmDelete = async () => {
    if (window.confirm("Please confirm you would like to delete a spot, this action cannot be undone.") == true) {
      let deleteSpotResponse = await dispatch(deleteSpot(spotId))
      // console.log(deleteSpotResponse)
      history.push('/')
    }
  }



  let isLoggedIn

  if(!user){
    return (
      <div className='login-message'>
        <p>Please login or signup to list your home</p>
      </div>
    )
  } else {
      isLoggedIn = true
  }



  return (

    <div className='edit-spot-page-component'>
      {/* <div>
        {!isLoaded && (
          <p>Please login or signup to list your home</p>
        )}
      </div> */}

        {isLoggedIn && (

        <div className='form-component'>

          <h2>Edit a Spot</h2>

          {/* Display error messages for all fields */}
          {Object.keys(errors).map(fieldName => {
            const errorMessage = errors[fieldName];
            if (shouldShowErrors && errorMessage) {
              return (
                  <p key={errorMessage} className="error">
                    <i className="fas fa-solid fa-exclamation-circle"></i>
                    &nbsp;&nbsp;
                    {errorMessage}
                  </p>
                )
            }
          })}

          <div className='form-container'>

            <form onSubmit={handleSubmit}>
              {/* <label className="name">Name:</label> */}
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                value={name}
                onChange={updateName}
              />
              {/* {errors.name && <p>{errors.name}</p>} */}

              {/* <label className="address">Address:</label> */}
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Address"
                value={address}
                onChange={updateAddress}
              />
              {/* {errors.address && <p>{errors.address}</p>} */}

              {/* <label className="city">City:</label> */}
              <input
                type="text"
                id="city"
                name="city"
                placeholder="City"
                value={city}
                onChange={updateCity}
              />
              {/* {errors.city && <p>{errors.city}</p>} */}

              {/* <label className="state">State:</label> */}
              <input
                type="text"
                id="state"
                name="state"
                placeholder="State"
                value={state}
                onChange={updateState}
              />
              {/* {errors.state && <p>{errors.state}</p>} */}

              {/* <label className="country">Country:</label> */}
              <input
                type="text"
                id="country"
                name="country"
                placeholder="Country"
                value={country}
                onChange={updateCountry}
              />
              {/* {errors.country && <p>{errors.country}</p>} */}

              {/* <label className="lat">Latitude:</label>
              <input
                type="number"
                id="lat"
                name="lat"
                min="-90"
                max="90"
                value={lat}
                onChange={updateLat}
              />
              {errors.lat && <p>{errors.lat}</p>} */}

              {/* <label className="lng">Longitude:</label>
              <input
                type="number"
                id="lng"
                name="lng"
                min="-180"
                max="180"
                value={lng}
                onChange={updateLng}
              />
              {errors.lng && <p>{errors.lng}</p>} */}

              {/* <label className="description">Description:</label> */}
              <input
                type="text"
                id="description"
                name="description"
                placeholder="Description"
                value={description}
                onChange={updateDescription}
              />
              {/* {errors.description && <p>{errors.description}</p>} */}

              {/* <label className="price">Price:</label> */}
              <input
                type="number"
                id="price"
                name="price"
                placeholder="Price"
                min='1'
                value={price}
                onChange={updatePrice}
              />
              {/* {errors.price && <p>{errors.price}</p>} */}

              {/* <label className="preview-image">Preview Image:</label> */}
              {/* <input
                type="url"
                id="previewImage"
                name="preview-image"
                placeholder="Preview Image"
                value={previewImage}
                onChange={updatePreviewImage}
              /> */}
              {/* {errors.previewImage && <p>{errors.previewImage}</p>} */}
              {/* <div className='preview-image-preview-img'>
                { (previewImage !== '') && ( isValidURL(previewImage) ) && (
                  <img src={previewImage}></img>
                ) }
              </div> */}

              {/* <label className="additional-images">Additional Images:</label>
              <input
                type="url"
                id="additional-images"
                name="additional-images"
                value={previewImage}
                onChange={updatePreviewImage}
              />
              <div className='preview-image-preview-img'>
                { (previewImage !== '') && ( isValidURL(previewImage) ) && (
                  <img src={previewImage}></img>
                ) }
              </div> */}

              <br></br>

              <input type="submit" value="Submit"></input>

            </form>

          </div>

          <br></br>



        </div>
      )}

    </div>
  );
};

export default EditSpotForm
