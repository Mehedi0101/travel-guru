import { AiOutlineRight } from 'react-icons/ai';
import { AiOutlineLeft } from 'react-icons/ai';
import { useLoaderData } from "react-router-dom";
import Place from "../components/Home/Place";
import { useState } from 'react';

const Home = () => {
    document.title = "Travel Guru"

    const travelData = useLoaderData();

    const [currentPlace, setCurrentPlace] = useState(0);

    const previousPlace = () => {
        if (currentPlace === 0) {
            setCurrentPlace(travelData.length - 1);
        }
        else {
            setCurrentPlace(currentPlace - 1);
        }
    }

    const nextPlace = () => {
        if (currentPlace === travelData.length - 1) {
            setCurrentPlace(0);
        }
        else {
            setCurrentPlace(currentPlace + 1);
        }
    }

    const bgImg = {
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.5)), url("${travelData[currentPlace].image}")`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    }

    return (
        <div style={bgImg} className="h-screen">
            {
                <>
                    <div className='h-full flex items-center overflow-hidden'>
                        <div className='ml-4 md:ml-8 lg:ml-14 xl:ml-20 max-[700px]:mr-4 max-[700px]:text-center'>
                            <Place place={travelData[currentPlace]}></Place>
                        </div>
                        <div className='flex gap-4 relative left-20 max-[700px]:hidden'>
                            <div className='w-[150px] h-[225px] lg:w-[200px] lg:h-[300px] border-[3px] border-primary flex items-center rounded-2xl relative'>
                                <img className='object-cover h-full rounded-xl' src={travelData[currentPlace].image} alt="" />
                                <h3 className='absolute font-bebas text-white text-xl lg:text-2xl bottom-5 text-center w-full'>{travelData[currentPlace].title}</h3>
                            </div>
                            <div className='w-[150px] h-[225px] lg:w-[200px] lg:h-[300px] flex items-center relative'>
                                <img className='object-cover h-full rounded-xl' src={currentPlace === (travelData.length - 1) && travelData[0].image || travelData[currentPlace + 1].image} alt="" />
                                <h3 className='absolute font-bebas text-white text-xl lg:text-2xl bottom-5 text-center w-full'>{currentPlace === (travelData.length - 1) && travelData[0].title || travelData[currentPlace + 1].title}</h3>
                            </div>
                            <div className='w-[150px] h-[225px] lg:w-[200px] lg:h-[300px] flex items-center relative'>
                                <img className='object-cover h-full rounded-xl' src={currentPlace === (travelData.length - 1) && travelData[1].image || currentPlace === (travelData.length - 2) && travelData[0].image || travelData[currentPlace + 2].image} alt="" />
                                <h3 className='absolute font-bebas text-white text-xl lg:text-2xl bottom-5 text-center w-full'>{currentPlace === (travelData.length - 1) && travelData[1].title || currentPlace === (travelData.length - 2) && travelData[0].title || travelData[currentPlace + 2].title}</h3>
                            </div>
                        </div>
                    </div>
                    <div className='absolute top-[80%] flex justify-center gap-2 w-full max-w-screen-2xl px-4 md:px-8 lg:px-14 xl:px-20'>
                        <AiOutlineLeft onClick={previousPlace} className='text-2xl md:text-4xl bg-white rounded-full p-1 md:p-2 cursor-pointer' />
                        <AiOutlineRight onClick={nextPlace} className='text-2xl md:text-4xl bg-white rounded-full p-1 md:p-2 cursor-pointer' />
                    </div>
                </>
            }
        </div>
    );
};

export default Home;