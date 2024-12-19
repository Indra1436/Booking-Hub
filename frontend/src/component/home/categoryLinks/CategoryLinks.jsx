import React from 'react'
import {Link} from "react-router-dom";
import "./CategoryLinks.css"

const CategoryLinks = () => {
  return (
    <div className='list-container'>
        <div className="left-side">
            <ul>
                <Link to="#"><li>Movies</li></Link>
                <Link to="#"><li>Stream</li></Link>
                <Link to="#"><li>Events</li></Link>
                <Link to="#"><li>plays</li></Link>
                <Link to="#"><li>Sports</li></Link>
                <Link to="#"><li>Activities</li></Link>
            </ul>

        </div>
        <div className="right-side">
                <Link to="#"><li>ListYourShow</li></Link>
                <Link to="#"><li>Cooperates</li></Link>
                <Link to="#"><li>Offers</li></Link>
                <Link to="#"><li>Gift Cards</li></Link>
        </div>
    </div>
  )
}

export default CategoryLinks