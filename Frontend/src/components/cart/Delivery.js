import React,{useState} from 'react';
// imports list of countries 
import {countries} from 'countries-list';
import {useNavigate} from 'react-router-dom';
// import two hooks for connecting with redux
import {useSelector, useDispatch} from 'react-redux';
import { saveDeliveryInfo } from '../../actions/cartAction';
import CheckoutSteps from './CheckoutSteps';


const Delivery = () => {

    const countriesList = Object.values(countries);
    const {deliveryInfo} = useSelector((state) => state.cart);
    const [address, setAddress]= useState(deliveryInfo.address);
    const [city,setCity] = useState(deliveryInfo.city);
    const [postalCode, setPostalCode] = useState(deliveryInfo.phoneNo);
    const [phoneNo,setPhoneNo] = useState(deliveryInfo.phoneNo);
    const [country, setCountry] = useState(deliveryInfo.country);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // define function for handling the form submission
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveDeliveryInfo({address,city,phoneNo,postalCode,country}));
        navigate("/confirm"); 
    }

  return (
    <>
    <CheckoutSteps delivery/> 
    <div className='row wrapper '>
        <div className='col-10 col-lg-5 cartt'>
            <form onSubmit={submitHandler}>
                    <h1 className='mb-4'> Delivery address:</h1>
                    {/* input field for address */}
                    <div className='form-group'>
                        <label htmlFor='address_field'> Address </label> 
                        <input
                        type='text' 
                        id='address_field'
                        className='form-control'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)} required />


                    </div>
                    {/* input field for city */}
                    <div className='form-group'>
                        <label htmlFor='city_field'> City </label> 
                        <input
                        type='text' 
                        id='city_field'
                        className='form-control'
                        value={city}
                        onChange={(e) => setCity(e.target.value)} required />


                    </div>
                    {/* input for phone no  */}
                    <div className='form-group'>
                        <label htmlFor='phone_field'> Phone No </label> 
                        <input
                        type='phone' 
                        id='phone_field'
                        className='form-control'
                        value={phoneNo}
                        onChange={(e) => setPhoneNo(e.target.value)} required />


                    </div>
                    {/* postal code  */}
                    <div className='form-group'>
                        <label htmlFor='postal_code_field'> Postal Code </label> 
                        <input
                        type='numbers' 
                        id='postal_code_field'
                        className='form-control'
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)} required />


                    </div>
                    {/* countries */}
                    <div className='form-group'>
                        <label htmlFor='country_field'> Address </label> 
                        <select
                        type='text' 
                        id='country_field'
                        className='form-control'
                        value={countries}
                        onChange={(e) => setCountry(e.target.value)} required> {countriesList.map((country) => (
                            <option key={country.name} value={country.name}>{country.name} </option>
                        ))} 
                        </select>


                    </div>
                    <button id='shipping_btn' type='submit' className='btn btn-block py-3' onClick={submitHandler}> Submit</button>
                </form>
            </div> 

    </div>
    </>
  )
}

export default Delivery;
// npm i countries-list --force