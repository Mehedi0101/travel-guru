import Proptypes from 'prop-types';
import { BsArrowRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';


const Place = ({ place }) => {
    const { id, title, description } = place;

    const navigate = useNavigate();

    const handleBooking = () => {
        navigate(`/destination-details/${id}`)
    }

    return (
        <div className='text-white'>
            <h1 className='xl:text-7xl lg:text-6xl md:text-5xl text-4xl font-bebas'>{title}</h1>
            <p className='text-sm lg:text-base hidden lg:block max-[700px]:block'>{description.length > 200 ? description.slice(0, 200) : description}...</p>
            <p className='text-sm lg:hidden max-[700px]:hidden'>{description.length > 150 ? description.slice(0, 150) : description}...</p>
            <button onClick={handleBooking} className='flex items-center gap-1 px-5 py-2 bg-primary rounded text-black active:scale-95 transition-transform mt-5 max-[700px]:mx-auto font-medium'>Booking<BsArrowRight/></button>
        </div>
    );
};

Place.propTypes = {
    place: Proptypes.object.isRequired
}

export default Place;