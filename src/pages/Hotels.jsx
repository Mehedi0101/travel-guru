import { useLoaderData, useParams } from "react-router-dom";
import Hotel from "../components/Hotels/Hotel";

const Hotels = () => {
    document.title = 'Available Hotels';
    const travelData = useLoaderData();
    const { id:travelId } = useParams();
    const { title, hotels } = travelData.find(place => place.id === Number(travelId));

    return (
        <div className="pt-28 pb-10 mx-4 md:mx-8 lg:mx-14 xl:mx-20">
            <h2 className="text-xl md:text-2xl font-bold text-black mb-6">Stay in {title}</h2>
            <div className="grid gap-6">
                {
                    hotels.map(hotel => <Hotel key={hotel.hotel_id} hotel={hotel}></Hotel>)
                }
            </div>
        </div>
    );
};

export default Hotels;