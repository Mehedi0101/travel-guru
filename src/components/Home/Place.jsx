import Proptypes from 'prop-types';
import { BsArrowRight } from 'react-icons/bs';


const Place = ({ place }) => {
    const { id, title, description } = place;

    return (
        <div className='text-white'>
            <h1 className='text-7xl font-bebas'>{title}</h1>
            <p>{description.length > 200 ? description.slice(0, 200) : description}...</p>
            <button className='flex items-center gap-1 px-5 py-2 bg-primary rounded text-black active:scale-95 transition-transform mt-5'>Booking<BsArrowRight/></button>
        </div>
    );
};

Place.propTypes = {
    place: Proptypes.object.isRequired
}

export default Place;