import React, {useState, useEffect } from 'react'
import axios from '../utils/axiosInstance';

const OrgCard = ({ image_url, name }) => {
    const [reviews, setReviews] = useState([]);
    const [avgRating, setAvgRating] = useState(0);

    useEffect(() => {
        async function fetchReviews() {
            const reviews = await axios.get(`/reviews/${name}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                },
            })
            setReviews(reviews.data.reviews);
            setAvgRating(parseFloat(reviews.data.averageRating.toFixed(2)));
        }
        fetchReviews();
    },[])

    return (
        <a href={name} target='_blank'>
            <div className='w-60 h-72 overflow-hidden p-8 border rounded-md hover:shadow-xl flex flex-col justify-evenly items-center hover:bg-gray-50 transition-all relative'>
                <div className='w-40 h-40 relative'>
                    <img src={image_url} alt={name} className='w-full h-full object-contain object-center' />
                </div>
                <h3 className='text-gray-600 text-lg font-galano text-center'>{name}</h3>
                <div className='m-1'>
                 <div className='flex items-center justify-center'>
                    <span className='text-yellow-400 text-2xl font-bold'>{avgRating}</span>
                    <img src='/star-svgrepo-com.svg' className=' h-4' />
                 </div>
                 {reviews.length == 1 ? <span className='text-gray-400 text-sm ml-1'>{reviews.length} review</span>
                 : <span className='text-gray-400 text-sm ml-1'>{reviews.length} reviews</span>} 
                </div>
            </div>
        </a>
    )
}

export default OrgCard