import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'
import { NavLink, Route, useParams, useHistory } from 'react-router-dom';

import { createSpot } from '../../store/spots';
import './CreateSpotForm.css'

import React, { useState } from 'react';

const CreateSpotForm = ({isLoaded}) => {

  const dispatch = useDispatch();

  let user = useSelector(state => {
    // console.log(state)

    return state.session.user
})


  const history = useHistory();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);

  const updateName = (e) => setName(e.target.value);
  const updateAddress = (e) => setAddress(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateState = (e) => setState(e.target.value);
  const updateCountry = (e) => setCountry(e.target.value);
  const updateLat = (e) => setLat(e.target.value);
  const updateLng = (e) => setLng(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);

  const [errors, setErrors] = useState({});


  const validateForm = () => {

    setErrors({})

    if (!name) {
      setErrors({
        ...errors,
        name: 'Name is required',
      });
    } else if ( name.length < 1 || name.length > 50){
        setErrors({
          ...errors,
          name: 'Name must be less than 50 characters',
        });
    }

    if(!address){
      setErrors({
        ...errors,
        address: 'Street address is required',
      });
    }

    if(!city){
      setErrors({
        ...errors,
        city: 'City is required',
      });
    }

    if(!state){
      setErrors({
        ...errors,
        state: 'State is required',
      });
    }

    if(!country){
      setErrors({
        ...errors,
        country: 'Country is required',
      });
    }

    if(!lat){
      setErrors({
        ...errors,
        lat: 'Latitude is required',
      });
    } else if (parseFloat(lat < -90) || parseFloat(lat > 90)){
      console.log(lat)
      setErrors({
        ...errors,
        lat: 'Latitude is not valid',
      });
    }

    if(!lng){
      setErrors({
        ...errors,
        lng: 'Longitude is required',
      });
    } else if (parseFloat(lng < -180) || parseFloat(lng > 180)){
        setErrors({
          ...errors,
          lng: 'Longitude is not valid',
        });
    }

    if(!description){
      setErrors({
        ...errors,
        description: 'Description is required',
      });
    }

    if(!price){
      setErrors({
        ...errors,
        price: 'Description is required',
      });
    }

    console.log(errors)


  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate the form
    validateForm();

    // If there are no errors, submit the form to your API
    if (Object.keys(errors).length === 0) {
      // Submit the form to your API
        const payload = {
          name,
          address,
          city,
          state,
          country,
          lat,
          lng,
          description,
          price
        };

        let createdSpot = await dispatch(createSpot(payload))

        if (createdSpot) {
          history.push(`/spots/${createdSpot.id}`);
        }
    }
  };

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

    <div className='create-spot-page-component'>
      {/* <div>
        {!isLoaded && (
          <p>Please login or signup to list your home</p>
        )}
      </div> */}

      {isLoggedIn && (

        <div className='form-component'>

          <h2>Create a Spot</h2>

          {errors && (
            Object.values(errors).map(err => {
              <p>{err}</p>
            })
          )}

          <div className='form-container'>

            <form onSubmit={handleSubmit}>
              <label className="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={updateName}
              />
              {errors.name && <p>{errors.name}</p>}

              <label className="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={address}
                onChange={updateAddress}
              />
              {errors.address && <p>{errors.address}</p>}

              <label className="city">City:</label>
              <input
                type="text"
                id="city"
                name="city"
                value={city}
                onChange={updateCity}
              />
              {errors.city && <p>{errors.city}</p>}

              <label className="state">State:</label>
              <input
                type="text"
                id="state"
                name="state"
                value={state}
                onChange={updateState}
              />
              {errors.state && <p>{errors.state}</p>}

              <label className="country">Country:</label>
              <input
                type="text"
                id="country"
                name="country"
                value={country}
                onChange={updateCountry}
              />
              {errors.country && <p>{errors.country}</p>}

              <label className="lat">Latitude:</label>
              <input
                type="number"
                id="lat"
                name="lat"
                min="-90"
                max="90"
                value={lat}
                onChange={updateLat}
              />
              {errors.lat && <p>{errors.lat}</p>}

              <label className="lng">Longitude:</label>
              <input
                type="number"
                id="lng"
                name="lng"
                min="-180"
                max="180"
                value={lng}
                onChange={updateLng}
              />
              {errors.lng && <p>{errors.lng}</p>}

              <label className="description">Description:</label>
              <input
                type="text"
                id="description"
                name="description"
                value={description}
                onChange={updateDescription}
              />
              {errors.description && <p>{errors.description}</p>}

              <label className="price">Price:</label>
              <input
                type="number"
                id="price"
                name="price"
                value={price}
                onChange={updatePrice}
              />
              {errors.price && <p>{errors.price}</p>}

              <input type="submit" value="Submit"></input>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};


/*
const SpotDetailsComponent = () => {
    const dispatch = useDispatch();


    // const {spotId} = useParams()

    useEffect(() => {
        // console.log("dispatching getAllShots()")
        dispatch(createSpot(spot));
    }, [dispatch]);

    let spot = useSelector(state => {
        // console.log(state)

        // const spots = state.spots.allSpots.forEach(spot => )
        // const { spotId } =


        // return state.spots.allSpots.map(spotId => state.allSpots[spotId]);

        return state.spots.singleSpot
    })

    if(!spot) {
        return null
    }

    const previewImage = spot.SpotImages.find( ({ preview }) => preview === true );
    let secondaryImages;

    if(previewImage){
        secondaryImages = spot.SpotImages.filter( ({ id }) => id !== previewImage.id );

        if(Object.keys(secondaryImages).length > 1){
            secondaryImages = Object.values(secondaryImages)
        }

    }

    console.log('spot details ----', {spot})
    console.log('secondary images ----', secondaryImages, typeof secondaryImages)

    return (

        <div className='spot-details'>
            {spot && (
                <div className='spot-details-comp'>
                    <h4>{spot.name}</h4>
                    <div className='secondary-details'>
                        <div className='review-and-location'>
                            <div className='review-stats'>
                                <i className="fas fa-solid fa-star"></i>
                                <p>{spot.avgRating}</p>
                            </div>

                            <div className='location-details'>
                                <p>{spot.city}, {spot.state}</p>
                            </div>
                        </div>

                        <div className='images'>
                            {previewImage && (
                                <img src={previewImage.url} alt='preview-image'></img>

                            )}
                            {secondaryImages && typeof secondaryImages === 'array' && (
                                secondaryImages.map(image => {
                                    <img key={image.id} src={image.url} alt='secondary-image'></img>
                                })
                            )}

                        </div>

                        <div className='host-details'>
                            {spot.Owner.firstName && (
                                <p>{`Hosted by ${spot.Owner.firstName}`}</p>
                            )}
                        </div>

                    </div>
                </div>

            )}

        </div>

    );
}
*/

export default CreateSpotForm
