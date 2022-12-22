import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';

import { editSpot, deleteSpot, actionCreatorResetSingleSpot } from '../../store/spots';
import { getUserSpots, getOneSpot } from '../../store/spots';

import './EditSpotForm.css'


const EditSpotForm = () => {

  const dispatch = useDispatch();

  const { spotId } = useParams()




  let user = useSelector(state => {
    // console.log(state)

    return state.session.user
  })

  const singleSpot = useSelector(state => {
    // console.log(state)

    return state.spots.singleSpot

  })

  const allSpots = useSelector(state => {
    // console.log(state)

    return state.spots.allSpots

  })

  useEffect(() => {

    dispatch(getOneSpot(spotId))
    // dispatch(getU)

    // let { name, address, city, state, country, lat, lng, description, price } = singleSpot

    return ( () => dispatch(actionCreatorResetSingleSpot()) )

  }, [dispatch, spotId])





  // const userSpots = useSelector((state) => Object.values(state.allSpots));
  // console.log
  // if(!singleSpot) return


  // console.log('-------')

  // console.log({name})


  const history = useHistory();

  const [newName, setNewName] = useState(singleSpot?.name || '');
  const [newAddress, setNewAddress] = useState(singleSpot?.address || '');
  const [newCity, setNewCity] = useState(singleSpot?.city || '');
  const [newState, setNewState] = useState(singleSpot?.state || '');
  const [newCountry, setNewCountry] = useState(singleSpot?.country || '');
  const [newLat, setNewLat] = useState(singleSpot?.lat || '');
  const [newLng, setNewLng] = useState(singleSpot?.lng || '');
  const [newDescription, setNewDescription] = useState(singleSpot?.description || '');
  const [newPrice, setNewPrice] = useState(singleSpot?.price || '');
  const [newPreviewImage, setNewPreviewImage] = useState(singleSpot?.name || '');
  const [newImages, setNewImages] = useState(singleSpot?.name || '');

  const updateName = (e) => setNewName(e.target.value);
  const updateAddress = (e) => setNewAddress(e.target.value);
  const updateCity = (e) => setNewCity(e.target.value);
  const updateState = (e) => setNewState(e.target.value);
  const updateCountry = (e) => setNewCountry(e.target.value);
  const updateLat = (e) => setNewLat(e.target.value);
  const updateLng = (e) => setNewLng(e.target.value);
  const updateDescription = (e) => setNewDescription(e.target.value);
  const updatePrice = (e) => setNewPrice(e.target.value);
  const updatePreviewImage = (e) => setNewPreviewImage(e.target.value);
  const updateImages = (e) => setNewImages(e.target.value);

  const [errors, setErrors] = useState({});

  const [shouldShowErrors, setShouldShowErrors] = useState(false);

  // console.log(singleSpot?.name)
  // console.log({newName})


  useEffect(() => {
    if (singleSpot) {
      setNewName(singleSpot.name);
      setNewAddress(singleSpot.address);
      setNewCity(singleSpot.city);
      setNewState(singleSpot.state);
      setNewCountry(singleSpot.country);
      setNewLat(singleSpot.lat);
      setNewLng(singleSpot.lng);
      setNewDescription(singleSpot.description);
      setNewPrice(singleSpot.price);

    }
  }, [singleSpot]);


  // if(singleSpot.userId !== user.id){
  //   history.push('/user/current')
  // }



  const validateForm = () => {

    // setErrors({})

    const newErrors = {}

    if (!newName) {
      newErrors.name = 'Name is required'

    } else if ( newName.length < 1 || newName.length > 50){
        newErrors.newName = 'Name must be less than 50 characters'

    } else {
      newErrors.newName = null
      delete newErrors.newName
    }

    if(!newAddress){
      newErrors.newAddress = 'Street address is required'

    } else {
        newErrors.newAddress = null
        delete newErrors.newAddress
    }

    if(!newCity){
      newErrors.newCity = 'City is required'

    } else {
      newErrors.newCity = null
      delete newErrors.newCity
  }

    if(!newState){
      newErrors.newState = 'State is required'

    } else {
      newErrors.newState = null
      delete newErrors.newState
  }

    if(!newCountry){
      newErrors.newCountry = 'Country is required'

    } else {
      newErrors.newCountry = null
      delete newErrors.newCountry
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

    if(!newDescription){
      newErrors.newDescription = 'Description is required'

    } else {
      newErrors.newDescription = null
      delete newErrors.newDescription
  }

    if(!newPrice){
      newErrors.newPrice = 'Price is required'

    } else if (parseFloat(newPrice) < 1){
      newErrors.newPrice = 'Price must be greater than $1'

    } else {
      newErrors.newPrice = null
      delete newErrors.newPrice
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
      newName,
      newAddress,
      newCity,
      newState,
      newCountry,
      newLat,
      newLng,
      newDescription,
      newPrice
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
          name: newName,
          address: newAddress,
          city: newCity,
          state: newState,
          country: newCountry,
          lat: `${newLat}`,
          lng: `${newLng}`,
          description: newDescription,
          price: newPrice

          // name,
          // address,
          // city,
          // state,
          // country,
          // lat: `${lat}`,
          // lng: `${lng}`,
          // description,
          // price
        };

        // console.log({payload})

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

  // if(!singleSpot) return <p>test</p>

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
                value={newName}
                onChange={updateName}
                required
              />
              {/* {errors.name && <p>{errors.name}</p>} */}

              {/* <label className="address">Address:</label> */}
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Address"
                value={newAddress}
                onChange={updateAddress}
                required
              />
              {/* {errors.address && <p>{errors.address}</p>} */}

              {/* <label className="city">City:</label> */}
              <input
                type="text"
                id="city"
                name="city"
                placeholder="City"
                value={newCity}
                onChange={updateCity}
                required
              />
              {/* {errors.city && <p>{errors.city}</p>} */}

              {/* <label className="state">State:</label> */}
              <input
                type="text"
                id="state"
                name="state"
                placeholder="State"
                value={newState}
                onChange={updateState}
                required
              />
              {/* {errors.state && <p>{errors.state}</p>} */}

              {/* <label className="country">Country:</label> */}
              <input
                type="text"
                id="country"
                name="country"
                placeholder="Country"
                value={newCountry}
                onChange={updateCountry}
                required
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
                value={newDescription}
                onChange={updateDescription}
                required
              />
              {/* {errors.description && <p>{errors.description}</p>} */}

              {/* <label className="price">Price:</label> */}
              <input
                type="number"
                id="price"
                name="price"
                placeholder="Price"
                min='1'
                value={newPrice}
                onChange={updatePrice}
                required
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
