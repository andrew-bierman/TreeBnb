import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react'
import { NavLink, Route, useParams, useHistory } from 'react-router-dom';

import CurrentUserReviewsComponent from "../CurrentUserReviews";

import * as sessionActions from "../../store/session";
import { getUserSpots, getAllSpots, deleteSpot, actionCreatorResetSingleSpot } from '../../store/spots';
import { getCurrentUserReviews, deleteReview } from '../../store/reviews';
import './Profile.css'

const Profile = () => {
    const dispatch = useDispatch();

    const history = useHistory()

    const firstRenderRef = useRef(true)

    // useEffect(() => {
    //     console.log(reviewsValues);
    // }, [reviewsValues])

    useEffect(() => {
        dispatch(sessionActions.restoreUser())
        dispatch(getAllSpots());
        dispatch(getCurrentUserReviews());
        dispatch(getUserSpots())


        return ( () => dispatch(actionCreatorResetSingleSpot()) )

    }, [dispatch]);


    let user = useSelector(state => {
        // console.log(state)

        return state.session.user
    })

    let reviews = useSelector(state => {
        // console.log(state)

        return state.reviews.user
    })

    let allSpots = useSelector(state => {
        // console.log(state)

        return state.spots.allSpots
    })

    let userSpots
    // let userSpots = getUserSpots();

    // console.log({userSpots})

    // let userSpots = dispatch(getUserSpots())
    // userSpots = userSpots.Spots

    // console.log(Object.values(allSpots))


    // const [reviewsState, setReviewsState] = useState([])
    // const [ userSpotsState, setUserSpotsState ] = useState([])

    if(allSpots){
        allSpots = Object.values(allSpots)
    }

    if (allSpots && allSpots.length > 0){

        console.log({allSpots})

        userSpots = Object.values(allSpots).filter(spot => spot.ownerId === user.id)

    }

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


    let isLoggedIn
    let isSpotOwner

    if(!user){

        isLoggedIn = false

        return (
            <div className='login-message'>
              <p>Please login or signup to continue</p>
            </div>
          )

    } else {

        isLoggedIn = true

        // if(user.id === spot.ownerId){
        //     isSpotOwner = true
        // } else {
        //     isSpotOwner = false
        // }

    };

    let reviewsValues;

    if(reviews){
        reviewsValues = Object.keys(reviews).map(e => reviews[e])
    };

    console.log({userSpots})

    // if(!reviews) {
    //     return null
    // }


    return (

        <div className='profile-comp'>

            {isLoggedIn && (
                <div className='profile-comp-modals'>
                    <div className='user-details'>
                        <h3>{user.username}</h3>
                        <h3>{user.firstName} {user.lastName}</h3>
                        <h3>{user.email}</h3>
                    </div>

                    {reviewsValues && (reviewsValues.length > 0) && (
                        <CurrentUserReviewsComponent/>
                    )}

                    { (userSpots) && (
                        <div className='your-spots-section'>
                            <h2>Your spots</h2>
                            <div className='spots-list'>
                                {userSpots.map(spot => (
                                    <div className='spot-container'>
                                        <div className='spot-container-link'>
                                            <NavLink key={spot.id} to={`/spots/${spot.id}`} className='spot-container'>
                                                <div key={spot.id}>
                                                    <img src={spot.previewImage} alt='Preview Image'></img>
                                                    <h4>{spot.name}</h4>
                                                    <p>{spot.city}, {spot.state}</p>
                                                    <p>{`$${spot.price} night`}</p>
                                                </div>
                                            </NavLink>
                                        </div>

                                        <div className='spot-buttons'>
                                            <button onClick={() => handleEditSpotRoute(spot.id)}>Edit Spot</button>

                                            <button onClick={() => confirmSpotDelete(spot.id)}>Delete Spot</button>
                                        </div>

                                    </div>
                                ))}

                            </div>
                        </div>
                    ) }

                </div>

            )}



        </div>

    );
}

export default Profile
