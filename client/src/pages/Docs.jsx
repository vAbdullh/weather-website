import React from 'react'
import Header from '../components/Header'
import { CiLink } from "react-icons/ci";
import { FaReact, FaDribbble } from "react-icons/fa";
import { IoLogoFirebase } from "react-icons/io5";
import { SiExpress } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";
import { FiExternalLink } from "react-icons/fi";
import { MdCloudQueue } from "react-icons/md";

export default function Docs() {
  return (
    <div className='container mx-auto min-h-screen w-screen overflow-hidden p-2'>
      <Header />
      <main className='flex flex-col gap-5 p-2 items-center my-5 h-full w-full flex-grow max-w-[1000px] mx-auto'>
        <h1 className="text-3xl font-bold mb-5">Weather App Documentation</h1>
        <p>Welcome to <a href="https://github.com/vAbdullh" className='border-b font-mono text-lg border-black'>@vabdullh<CiLink className='inline size-5' /></a> Weather! Just enter a city to check its weather, from sunny skies to stormy days. Your forecast is ready!</p>
        <ul className='w-full list-inside list-disc space-y-4 font-semibold text-sm lg:text-xl'>
          <h2 className='font-black'>Powering the Project:</h2>
          <li>Frontend:</li>
          <ol className='ps-5 mt-2 space-y-1 list-inside capitalize font-normal'>
            <li className='flex gap-2 items-center '><FaReact size={32} color='#58c4dc' className='bg-black p-2 rounded-md' /> React</li>
            <li className='flex gap-2 items-center '><RiTailwindCssFill size={32} color='#38bdf8' className='bg-black p-2 rounded-md' /> tailwind</li>
            <li className='flex gap-2 items-center '><IoLogoFirebase size={32} color='#ffaa1a' className='bg-black p-2 rounded-md' /> firebase</li>
          </ol>
          <li>Backend:</li>
          <ol className='ps-5 mt-2 space-y-1 list-inside capitalize font-normal'>
            <li className='flex gap-2 items-center '><SiExpress size={32} color='#88d131' className='bg-black p-2 rounded-md' /> express</li>
            <li className='flex gap-2 items-center '><IoLogoFirebase size={32} color='#ffaa1a' className='bg-black p-2 rounded-md' /> firebase</li>
          </ol>
          <li>Tools:</li>
          <ol className='ps-5 mt-2 space-y-1 list-inside capitalize font-normal'>
            <li className='flex gap-2 items-center '><MdCloudQueue size={32} color='#f76b1c' className='bg-black p-2 rounded-md' />
              <a href="https://www.meteosource.com/" className='flex items-center gap-1 border-b border-black'>meteosource <FiExternalLink size={16} /></a>
            </li>
            <li className='flex gap-2 items-center '><FaDribbble size={32} color='#fda9e5' className='bg-black p-2 rounded-md' /> design :  <a href="https://dribbble.com/shots/20675054-Mobile-Weather-app" className='flex items-center gap-1 border-b border-black'>Desire Creative Agency <FiExternalLink size={16} /></a></li>
          </ol>

        </ul>
      </main>
    </div>
  );
}
