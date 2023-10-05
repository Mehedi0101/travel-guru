import Proptypes from 'prop-types';
import star from '../../assets/star_1_.png';

const Hotel = ({hotel}) => {

    const { hotel_image, hotel_title, room_features, rating, rating_count, price } = hotel;

    return (
        <div className='flex gap-6 text-black h-40 w-full'>
            <div className='max-w-[50%]'>
                <img className='w-80 h-40 object-cover rounded' src={hotel_image} alt="" />
            </div>
            <div className='flex flex-col justify-evenly'>
                <h3 className='text-lg md:text-xl font-semibold'>{hotel_title}</h3>
                {
                    room_features.map((feature,idx) => <p key={idx} className='text-[#6A6A6A] text-sm md:text-base'>{feature}</p>)
                }
                <div className='flex items-center gap-10'>
                    <div className='flex items-center gap-1'>
                        <img className='w-4' src={star} alt="" />
                        <p className='text-sm font-medium'>{rating} ({rating_count})</p>
                    </div>
                    <p className='text-[#6A6A6A]'><span className='text-black font-medium text-lg'>${price}/</span>night</p>
                </div>
            </div>
        </div>
    );
};

Hotel.propTypes = {
    hotel: Proptypes.object.isRequired
}

export default Hotel;