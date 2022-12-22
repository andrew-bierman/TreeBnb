import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { createSpot } from '../../store/spots';

import './CreateSpotForm.css'

const isValidURL = (string) => {
  const res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return (res !== null)
};

const initialValues = {
  name: "",
  address: "",
  city: "",
  state: "",
  country: "",
  lat: 0,
  lng: 0,
  description: "",
  price: "",
  previewImage: "",
  images: ""
}

const initialTouchedValues = {
  name: false,
  address: false,
  city: false,
  state: false,
  country: false,
  lat: false,
  lng: false,
  description: false,
  price: false,
  previewImage: false,
  images: false
};

const CreateSpotForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  const [formValues, setFormValues] = useState(initialValues);
  const [touched, setTouched] = useState(initialTouchedValues);
  const [errors, setErrors] = useState(initialValues);

  const validateForm = () => {
    setErrors({
      name: !formValues.name ? "Name is required" : (formValues.name.length < 1 || formValues.name.length > 50) ? 'Name must be less than 50 characters' : '',
      address: !formValues.address ? 'Street address is required' : "",
      city: !formValues.city ? 'City is required' : "",
      state: !formValues.state ? 'State is required' : "",
      country: !formValues.country ? 'Country is required' : "",
      // lat: !formValues.lat ? 'Latitude is required' : (parseFloat(lat) < -90) || (parseFloat(lat) > 90) ? 'Latitude is not valid' : '',
      // lng: !formValues.lng ? 'Longitude is required' : (parseFloat(lng) < -180) || (parseFloat(lng) > 180) ? 'Longitude is not valid' : '',
      description: !formValues.description ? 'Description is required' : "",
      price: !formValues.price ? 'Price is required' : (parseFloat(formValues.price) < 1) ? 'Price must be greater than $1' : "",
      previewImage: !formValues.previewImage ? 'Preview Image is required' : (formValues.previewImage === '' || formValues.previewImage === {}) ? 'Preview Image is not valid' : "",
      // images: ""
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (Object.values(errors).some(err => err)) return;

    // Submit the form to your API
    const payload = {
      ...formValues,
      lat: `${formValues.lat}`,
      lng: `${formValues.lng}`,
      ...((formValues.previewImage !== '') && {previewImage: formValues.previewImage})
    };

    let createdSpot = await dispatch(createSpot(payload));

    if (createdSpot) {
      history.push(`/spots/${createdSpot.id}`);
    }
  };

  const handleChange = async (event) => {
    const { name, value } = event.target;
    await setFormValues((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((prevState) => {
      return {
        ...prevState,
        [name]: true,
      };
    });
  }

  // reset all errors to inital in the first render
  useEffect(() => {
    setErrors(initialValues);
    setTouched(initialTouchedValues);
  }, []);

  useEffect(() => validateForm(), [formValues]);

  if (!user) {
    return (
      <div className='login-message'>
        <p>Please login or signup to list your home</p>
      </div>
    )
  }

  return (
    <div className='p-2 pt-5 is-flex is-flex-direction-column is-align-items-center'>
      <h3 className="title is-3">Create a Spot</h3>
      <div className='columns is-centered w-100'>
        <form onSubmit={handleSubmit} className='is-flex is-flex-direction-column is-align-items-center column is-half'>
          {/* Name */}
          <div className="field mb-5 w-100">
            <div className="control has-icons-left has-icons-right">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                className={`input ${errors.name && touched.name ? 'is-danger' : ''}`}
                value={formValues.name}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
              {errors.name && touched.name && 
                <>
                  <span className="icon is-small is-right">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                  <h6 className="help is-danger">{errors.name}</h6>
                </>
              }
            </div>
          </div>
          {/* Address */}
          <div className="field mb-5 w-100">
            <div className="control has-icons-left has-icons-right">
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Address"
                className={`input ${errors.address && touched.address ? 'is-danger' : ''}`}
                value={formValues.address}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
              {errors.address && touched.address && 
                <>
                  <span className="icon is-small is-right">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                  <h6 className="help is-danger">{errors.address}</h6>
                </>
              }
            </div>
          </div>
          {/* City */}
          <div className="field mb-5 w-100">
            <div className="control has-icons-left has-icons-right">
              <input
                type="text"
                id="city"
                name="city"
                placeholder="City"
                className={`input ${errors.city && touched.city ? 'is-danger' : ''}`}
                value={formValues.city}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <span className="icon is-small is-left">
                <i className="fas fa-city"></i>
              </span>
              {errors.city && touched.city && 
                <>
                  <span className="icon is-small is-right">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                  <h6 className="help is-danger">{errors.city}</h6>
                </>
              }
            </div>
          </div>
          {/* State */}
          <div className="field mb-5 w-100">
            <div className="control has-icons-left has-icons-right">
              <input
                type="text"
                id="state"
                name="state"
                placeholder="State"
                value={formValues.state}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`input ${errors.state && touched.state ? 'is-danger' : ''}`}
                required
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
              {errors.state && touched.state && 
                <>
                  <span className="icon is-small is-right">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                  <h6 className="help is-danger">{errors.state}</h6>
                </>
              }
            </div>
          </div>
          {/* Country */}
          <div className="field mb-5 w-100">
            <div className="control has-icons-left has-icons-right">
              <input
                type="text"
                id="country"
                name="country"
                placeholder="Country"
                className={`input ${errors.country && touched.country ? 'is-danger' : ''}`}
                value={formValues.country}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <span className="icon is-small is-left">
                <i className="fas fa-globe"></i>
              </span>
              {errors.country && touched.country && 
                <>
                  <span className="icon is-small is-right">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                  <h6 className="help is-danger">{errors.country}</h6>
                </>
              }
            </div>
          </div>
          {/* Latitude */}
          {/* <div className="field mb-5 w-100">
            <div className="control has-icons-left has-icons-right">
              <input
                type="number"
                id="lat"
                name="lat"
                min="-90"
                max="90"
                value={formValues.lat}
                className={`input ${errors.lat && touched.lat ? 'is-danger' : ''}`}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
              {errors.lat && touched.lat && 
                <>
                  <span className="icon is-small is-right">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                  <h6 className="help is-danger">{errors.lat}</h6>
                </>
              }
            </div>
          </div> */}

          {/* Longitude */}
          {/* <div className="field mb-5 w-100">
            <div className="control has-icons-left has-icons-right">
              <input
                type="number"
                id="lng"
                name="lng"
                min="-180"
                max="180"
                value={formValues.lng}
                className={`input ${errors.lng && touched.lng ? 'is-danger' : ''}`}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
              {errors.lng && touched.lng && 
                <>
                  <span className="icon is-small is-right">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                  <h6 className="help is-danger">{errors.lng}</h6>
                </>
              }
            </div>
          </div> */}

          {/* Description  */}
          <div className="field mb-5 w-100">
            <div className="control has-icons-left has-icons-right">
              <input
                type="text"
                id="description"
                name="description"
                placeholder="Description"
                value={formValues.description}
                className={`input ${errors.description && touched.description ? 'is-danger' : ''}`}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-comment"></i>
              </span>
              {errors.description && touched.description && 
                <>
                  <span className="icon is-small is-right">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                  <h6 className="help is-danger">{errors.description}</h6>
                </>
              }
            </div>
          </div>

          {/* Price */}
          <div className="field mb-5 w-100">
            <div className="control has-icons-left has-icons-right">
              <input
                type="number"
                id="price"
                name="price"
                placeholder="Price"
                min='1'
                value={formValues.price}
                className={`input ${errors.price && touched.price ? 'is-danger' : ''}`}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <span className="icon is-small is-left">
                <i className="fas fa-dollar-sign"></i>
              </span>
              {errors.price && touched.price && 
                <>
                  <span className="icon is-small is-right">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                  <h6 className="help is-danger">{errors.price}</h6>
                </>
              }
            </div>
          </div>

          {/* Preview Image */}
          <div className="field mb-5 w-100">
            <div className="control has-icons-left has-icons-right">
              <input
                type="url"
                id="previewImage"
                name="previewImage"
                placeholder="Preview Image"
                value={formValues.previewImage}
                className={`input ${errors.previewImage && touched.previewImage ? 'is-danger' : ''}`}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <span className="icon is-small is-left">
                <i className="fas fa-image"></i>
              </span>
              {errors.previewImage && touched.previewImage && 
                <>
                  <span className="icon is-small is-right">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                  <h6 className="help is-danger">{errors.previewImage}</h6>
                </>
              }
            </div>
          </div>
          <div className='preview-image-preview-img'>
            {formValues.previewImage && isValidURL(formValues.previewImage) && (
              <img src={formValues.previewImage} />
            )}
          </div>
          {/* <div className="file is-primary">
            <label className="file-label">
              <input className="file-input" type="file" name="resume" />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">
                  Primary file…
                </span>
              </span>
            </label>
          </div> */}

          {/* Additional Images
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
            <button type="submit" className="button is-primary mt-5 w-100">Submit</button>
        </form>
      </div>
    </div>
  );
};


export default CreateSpotForm
