import React, { useContext } from 'react'
import Header from '../components/Header'
import { searchCity } from '../service/api';
import { useState } from 'react';
import { DataContext } from '../context/DataProvider';
import { formatDateByTimezone } from '../service/functions';
import { IoIosSearch } from "react-icons/io";
import { FaLocationArrow } from "react-icons/fa";
import { PiWindLight } from "react-icons/pi";
import { FaCloudRain } from "react-icons/fa6";

// chatGPT
const icons = require.context('../assets/icons', false, /\.png$/);

export default function Home() {
  // chatGPT
  const getIcon = (iconNumber) => {
    try {
      // Return the correct icon by dynamically importing it
      return icons(`./${iconNumber}.png`);
    } catch (error) {
      // Handle error in case the icon doesn't exist
      console.error(`Icon not found: ${iconNumber}`);
      return null;
    }
  };
  const { data, setCity, loading, setPlace_id } = useContext(DataContext);
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [result, setResult] = useState([])
  const [error, setError] = useState('')
  const [typingTimeout, setTypingTimeout] = useState(null)

  const search = async (city) => {
    try {
      const data = await searchCity(city);
      if (data?.length === 0) {
        setError(404);
        setResult([]);
      } else {
        setResult(data);
        setError('');
      }
    } catch (error) {
      setError(error.status);
    }
  };
  const handleOnChange = (e) => {
    setInput(e.target.value);
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const newTimeout = setTimeout(() => {
      if (e.target.value.length > 0) {
        search(e.target.value);
      } else {
        setResult([]);
      }
    }, 1500);

    setTypingTimeout(newTimeout);
  };
  const handleChangeCity = (c, p) => {
    if (c && p) {
      setInput(c);
      setCity(c);
      setPlace_id(p);
    }
    setIsFocused(false);
  }

  if (loading) {
    return (<div className='w-screen h-screen grid place-items-center'>
      <span className="size-9 animate-spin border-2 border-white border-l-transparent rounded-full"></span>
    </div>)
  }
  return (
    <div className='md:container mx-auto min-h-screen w-screen overflow-hidden p-2 flex flex-col'>
      <Header home />
      <main className='flex flex-col gap-8 lg:gap-10 p-2 items-center my-5 h-full justify-center flex-grow'>
        <div className="w-full relative max-w-[740px] border-b-2 border-black p-2 flex gap-3 items-center">
          <IoIosSearch size={24} />
          <input type="text"
            value={input}
            onChange={(e) => handleOnChange(e)}
            onFocus={() => setIsFocused(true)}
            // onBlur={handleChangeCity}
            placeholder='city name ...'
            className="w-full flex-grow bg-transparent outline-none placeholder:text-black/80 placeholder:font-thin font-bold"
          />
          {isFocused && (
            <ul className="absolute text-white bg-black left-0 top-full w-full max-h-64 overflow-scroll ">
              {error === 404 ? (
                <li className='p-5 word-spacing'>
                  no results available</li>
              ) : (
                result.length > 0 ? (
                  result.map((item) => (
                    <li key={item.place_id} onClick={() => handleChangeCity(item.name, item.place_id)}>
                      <button className='p-2 flex gap-2 items-start justify-start text-left text-white size-full hover:underline hover:bg-slate-200/10'>
                        <FaLocationArrow className='size-3 ' />
                        <div>
                          <p className='font-bold'>{item.name}</p>
                          <p>{item.adm_area1}</p>
                        </div>
                      </button>
                    </li>
                  ))
                ) : (
                  <li className='p-5 word-spacing'>
                    no results available
                  </li>
                )
              )}
            </ul>
          )}

        </div>
        <p className='capitalize bg-black text-primary px-10 py-2 rounded-full text-center w-fit'>
          {formatDateByTimezone(data?.timezone) || 'date'}
        </p>
        <h2 className="capitalize font-bold">{data?.current?.summary || 'status'}</h2>
        <p className='text-8xl md:text-9xl'>{data?.current?.temperature || '00'}&deg;C</p>
        <div className="w-full bg-black flex max-w-96 gap-2 justify-center rounded-lg  p-3 text-black">
          <div className="bg-primary rounded-mg flex flex-col items-center justify-center flex-1 py-5 rounded-l-md ">
            <PiWindLight className='size-9' />
            {`${data?.current?.wind.speed || '00'} metres `}</div>
          <div className="bg-primary rounded-mg flex flex-col items-center justify-center flex-1 py-5 rounded-r-md">
            <FaCloudRain className='size-9' />
            {`${data?.current?.precipitation.total || '00'} %`}
          </div>
        </div>
        <div className="flex gap-3 w-full overflow-x-scroll py-3">
          {data?.hourly?.data?.map((hour, index) => (
            <div key={index} className="flex flex-col items-center justify-evenly border border-black p-2 rounded-md min-w-36 h-52">
              <img src={getIcon(hour.icon)} alt={`Weather icon ${hour.icon}`} />
              <p className="text-4xl">{hour.temperature}&deg;C</p>
              <p>{new Date(hour.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
          ))}
        </div>

      </main>
    </div>
  )
}
