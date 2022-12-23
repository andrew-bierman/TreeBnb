import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

import CurrentUserReviewsComponent from "../CurrentUserReviews";

import * as sessionActions from "../../store/session";
import { getUserSpots, getAllSpots, deleteSpot, actionCreatorResetSingleSpot } from '../../store/spots';
import { getCurrentUserReviews } from '../../store/reviews';

import './Profile.css';

const Profile = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const firstRenderRef = useRef(true);
    const [isProfileVisible, setIsProfileVisible] = useState(false);

    const user = useSelector(state => state.session.user);
    const reviews = useSelector(state => Object.keys(state.reviews.user).map(e => state.reviews.user[e]) || []);
    const userSpots = useSelector(state =>  Object.values(state.spots.allSpots).filter(spot => spot.ownerId === user.id) || []);

    const handleEditSpotRoute = (spotId) =>{
        // console.log('clicked')
        history.push(`/spots/${spotId}/edit`);
    }

    const confirmSpotDelete = async (spotId) => {
        if (window.confirm("Please confirm you would like to delete a spot, this action cannot be undone.") == true) {
            let deleteSpotResponse = await dispatch(deleteSpot(spotId))
            // console.log(deleteSpotResponse)
            history.push('/')
        }
    }

    useEffect(() => {
        dispatch(sessionActions.restoreUser())
        dispatch(getAllSpots());
        dispatch(getCurrentUserReviews());
        dispatch(getUserSpots());

        return () => dispatch(actionCreatorResetSingleSpot());
    }, [dispatch]);

    useEffect(() => {
        if (!user) history.push('/')
    }, []);

    if (!user) {
        return (
            <div className="is-flex is-justify-content-center w-100 mt-5">
                <h5 className="title is-5">Please login or signup to continue</h5>
            </div>
        )
    }

    return (
        <div className='p-3 pt-5'>
            <div className='columns is-justify-content-center m-0 mb-5 mt-5'>
            <div className="card profile-card column is-half-tablet if-full-mobile">
                <header className="card-header cursor" onClick={() => setIsProfileVisible(prev => !prev)}>
                    <p className="card-header-title">
                        Personal Profile Data {user.username}
                    </p>
                    <button className="card-header-icon" aria-label="more options">
                    <span className="icon">
                        <i className={`fas ${isProfileVisible ? 'fa-angle-up' : 'fa-angle-down'}`} aria-hidden="true"></i>
                    </span>
                    </button>
                </header>
                {isProfileVisible && (
                    <div className="card-content p-3">
                        <div className="content">
                            <div className="control has-icons-left has-icons-right mb-3">
                                <input className="input" type="email" placeholder="Email" value={`Username: ${user.username}`} readOnly />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-user"></i>
                                </span>
                                <span className="icon is-small is-right">
                                    <i className="fas fa-check"></i>
                                </span>
                            </div>
                            <div className="control has-icons-left has-icons-right mb-3">
                                <input className="input" type="email" placeholder="Email" value={`First and Last Name: ${user.firstName} ${user.lastName}`} readOnly />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-user"></i>
                                </span>
                                <span className="icon is-small is-right">
                                    <i className="fas fa-check"></i>
                                </span>
                            </div>
                            <div className="control has-icons-left has-icons-right mb-3">
                                <input className="input" type="email" placeholder="Email" value={`Email: ${user.email}`} readOnly />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-envelope"></i>
                                </span>
                                <span className="icon is-small is-right">
                                    <i className="fas fa-check"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

                {/* <div className='user-details column is-centered is-two-fifths-tablet'>
                    <div 
                        className='cursor is-flex is-justify-content-space-between'
                        onClick={() => setIsProfileVisible(prev => !prev)}
                    >
                        Profile Information
                        <i className={`fas fa-solid ${isProfileVisible ? 'fa-arrow-up' : 'fa-arrow-down'}`} />
                    </div>
                    {isProfileVisible && (
                    <div>
                        <h5 className="subtitle is-5 m-0 mr-2">{user.username}</h5>
                        <h5 className="subtitle is-5 m-0 mr-2">{user.firstName} {user.lastName}</h5>
                        <h5 className="subtitle is-5 m-0">{user.email}</h5>
                    </div>
                    )}
                </div> */}
            </div>
            <div className='mt-3'>
                {reviews && (reviews.length > 0) && (
                    <CurrentUserReviewsComponent reviews={reviews} />
                )}

                {userSpots && (
                    <div className='is-flex is-flex-direction-column is-align-items-center is-flex-direction-center'>
                        <h3 className="title is-3 mt-5">Your spots</h3>
                        <div className='columns is-flex-wrap-wrap is-3 pt-5 pl-3 pr-3 w-100'>
                            {userSpots.map(spot => (
                                <NavLink key={spot.id} to={`/spots/${spot.id}`} className='column is-full-mobile is-half-tablet is-one-quarter-desktop'>
                                    <div className='spot-details-container box p-0'>
                                        <div className='image is-3by2'>
                                            <img src={spot.previewImage} alt='Preview Image'/>
                                        </div>
                                        <div className='p-2 pt-3'>
                                            <div className='is-flex is-justify-content-space-between is-align-items-center mb-3'>
                                                <h6 className="title is-6 m-0">{spot.city}, {spot.state}</h6>
                                                {spot.avgRating && (
                                                    <div className='is-flex is-align-items-center font-14'>
                                                        <i className="fas fa-star mr-1"></i>
                                                        <h5>{Number(spot.avgRating).toFixed(2)}</h5>
                                                    </div>
                                                )}
                                            </div>
                                            {spot.price && <h6 className="subtitle is-6 font-14"><span className='weight-600'>${Number(spot.price).toFixed(0)}</span> night</h6>}
                                            <div className="buttons is-justify-content-flex-end mt-5">
                                                <button className="button is-light" onClick={() => handleEditSpotRoute(spot.id)}>Edit Spot</button>
                                                <button className="button is-danger" onClick={() => confirmSpotDelete(spot.id)}>Delete Spot</button>
                                            </div>
                                        </div>
                                    </div>
                                </NavLink>
                            ))}
                        </div>
                        {/* <div className='columns is-flex-wrap-wrap is-align-items-stretch w-100 m-0'>
                            {userSpots.map(spot => (
                                <div className='column is-flex-direction-column is-flex is-justify-content-center is-full-mobile is-half-tablet'>
                                    <div className='spot-container-link'>
                                        <NavLink key={spot.id} to={`/spots/${spot.id}`} className='spot-container'>
                                            <div key={spot.id}>
                                                <img src={spot.previewImage} alt='Preview Image'></img>
                                                <h5 className="subtitle is-5 mb-2 is-spaced">{spot.name}</h5>
                                                <h6 className="title is-6 mb-2 is-spaced">{spot.city}, {spot.state}</h6>
                                                <h6 className="subtitle is-6 m-0 is-spaced">{`$${spot.price} night`}</h6>
                                            </div>
                                        </NavLink>
                                    </div>

                                    <div className="buttons is-justify-content-flex-end mt-5">
                                        <button className="button is-light" onClick={() => handleEditSpotRoute(spot.id)}>Edit Spot</button>
                                        <button className="button is-danger" onClick={() => confirmSpotDelete(spot.id)}>Delete Spot</button>
                                    </div>
                                </div>
                            ))}
                        </div> */}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile
