import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react'
import { NavLink, Route, useParams, useHistory } from 'react-router-dom';

import CurrentUserReviewsComponent from "../CurrentUserReviews";

import { getUserSpots } from '../../store/spots';
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

        dispatch(getCurrentUserReviews());
        dispatch(getUserSpots())

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

    let userSpots = getUserSpots();

    console.log({userSpots})

    // let userSpots = dispatch(getUserSpots())
    // userSpots = userSpots.Spots

    // console.log(Object.values(allSpots))


    // const [reviewsState, setReviewsState] = useState([])
    // const [ userSpotsState, setUserSpotsState ] = useState([])

    allSpots = Object.values(allSpots)

    if (allSpots && allSpots.length > 0){

        userSpots = Object.values(allSpots).filter(spot => spot.ownerId === user.id)

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

                    {reviewsValues && (
                        <CurrentUserReviewsComponent/>
                    )}

                    { (userSpots) && (
                        <div className='your-spots-section'>
                            <h2>Your spots</h2>
                            <div className='spots-list'>
                                {userSpots.map(spot => (
                                    <NavLink key={spot.id} to={`/spots/${spot.id}`} className='spot-container'>
                                        <div key={spot.id}>
                                            <img src={spot.previewImage} alt='Preview Image'></img>
                                            <h4>{spot.name}</h4>
                                            <p>{spot.city}, {spot.state}</p>
                                            <p>{`$${spot.price} night`}</p>
                                        </div>
                                    </NavLink>
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
