import { useLoaderData, useNavigate, useParams } from "react-router-dom";

const DestinationDetails = () => {
    const travelData = useLoaderData();
    const { id: travelId } = useParams();
    const { id, title, description, image } = travelData.find(place => place.id === Number(travelId));
    const navigate = useNavigate();

    const bgImg = {
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.5)), url("${image}")`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    }

    const handleStartBooking = e => {
        e.preventDefault();
        navigate(`/hotels/${id}`);
    }

    return (
        <div style={bgImg} className="min-h-screen">
            <div className="flex flex-col lg:flex-row gap-10 justify-between items-center mx-4 md:mx-8 lg:mx-14 xl:mx-20 min-h-screen pt-28 pb-10">
                <div className="text-white">
                    <h1 className='xl:text-7xl lg:text-6xl md:text-5xl text-4xl font-bebas'>{title}</h1>
                    <p className="text-sm lg:text-base">{description}</p>
                </div>
                <form className="bg-white p-5 rounded" onSubmit={handleStartBooking}>
                    <label className="text-[#818181] font-medium mb-2" htmlFor="origin">Origin</label>
                    <br />
                    <input className="font-bold text-black px-5 py-2 mb-5 cursor-text w-full" type="text" value="Dhaka" id="origin" disabled/>
                    <br />
                    <label className="text-[#818181] font-medium mb-2" htmlFor="destination">Destination</label>
                    <br />
                    <input className="font-bold text-black px-5 py-2 mb-5 placeholder:cursor-text w-full" type="text" value={title} id="destination" disabled/>
                    <div className="flex flex-col sm:flex-row mb-5">
                        <div>
                            <label className="text-[#818181] font-medium mb-2" htmlFor="from">From</label>
                            <br />
                            <input className="font-bold text-black px-5 py-2 outline-none max-w-full w-[190px]" type="date" name="from" id="from" required />
                        </div>
                        <div>
                            <label className="text-[#818181] font-medium mb-2" htmlFor="to">To</label>
                            <br />
                            <input className="font-bold text-black px-5 py-2 outline-none max-w-full w-[190px]" type="date" name="to" id="to" required />
                        </div>
                    </div>
                    <button className='px-5 py-2 bg-primary rounded text-black active:scale-95 transition-transform w-full font-medium'>Start Booking</button>
                </form>
            </div>
        </div>
    );
};

export default DestinationDetails;