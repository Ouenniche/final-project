import { useState, useEffect } from "react";
import DasshboardNav from "../components/DashboardNav";
import ConnectNav from "../components/ConnectNav";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { sellerHotels, deleteHotel } from "../actions/hotel";
import { toast } from "react-toastify";
import SmallCard from '../components/cards/SmallCard';

const DashboardSeller = () => {
    const { auth } = useSelector((state) => ({ ...state }));
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        loadSellerHotels()
    }, [])

    const loadSellerHotels = async () => {
        let {data} = await sellerHotels(auth.token);
        setHotels(data);
    }

    const handleHotelDelete = async(hotelId) => {
        if(!window.confirm('Are You sure ?')) return;
        deleteHotel(auth.token, hotelId).then((res) => {
            toast.success('Hotel Deleted');
            loadSellerHotels();
        });
    };

    const connected = () => (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-10">
                    <h2>Your Hotels</h2>
                </div>
                <div className="col-md-2">
                    <Link to="/hotels/new" className="btn btn-primary">
                        + Add New
                    </Link>
                </div>
            </div>

            <div className="row">
                {hotels.map(h => 
                    <SmallCard 
                        key={h._id} 
                        h={h} 
                        showViewMoreButton={false} 
                        owner={true} 
                        handleHotelDelete={handleHotelDelete}
                    /> 
                )}
            </div>
        </div>
    )



    return (
        <>
            <div className="container-fluid bg-secondary p-5">
                <ConnectNav />
            </div>

            <div className="container-fluid p-4">
                <DasshboardNav /> 
            </div>

            {
                connected()
            }
            {/*<pr>{JSON.stringify(auth, null, 4)}</pr>*/}

        </>
    )
};

export default DashboardSeller;