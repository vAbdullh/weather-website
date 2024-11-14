import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { CgMenuLeft, CgClose } from "react-icons/cg";
import { HiOutlineDocumentText } from "react-icons/hi";
import { FaGithubAlt } from "react-icons/fa6";
import { MdHomeFilled } from "react-icons/md";
import { DataContext } from '../context/DataProvider';

export default function Header({ home }) {
    const { city } = useContext(DataContext);
    const [menu, setMenu] = useState(true);
    const [active, setActive] = useState(window.location.pathname);
    const [color, setColor] = useState(getComputedStyle(document.documentElement)
        .getPropertyValue('--main-color')
        .trim());

    const navigate = useNavigate();
    const handleLinkClick = (path) => {
        setActive(path);
        navigate(path);
    };
    useEffect(() => {
        setMenu(false);

    }, [active])

    const handleChange = (e) => {
        setColor(e)
        document.documentElement.style.setProperty('--main-color', e);
    };

    return (
        <header className='flex items-center h-fit'>
            <div className='relative size-8 '>
                <button className={`absolute text-black cursor-pointer transition-all transform ${menu ? 'rotate-0 opacity-100 z-20' : 'opacity-0 rotate-180'}`}>
                    <CgClose onClick={() => setMenu(false)} size={32} />
                </button>
                <button className={`absolute text-black cursor-pointer transition-all transform ${menu ? 'rotate-180 opacity-0' : 'opacity-100 rotate-0 z-20'}`}>
                    <CgMenuLeft onClick={() => setMenu(true)} size={32} />
                </button>
            </div>
            {home && <p className='flex-grow text-center font-bold capitalize text-xl pr-8'>{city}</p>}
            {menu &&
                <>
                    <span
                        onClick={() => setMenu(false)}
                        className="h-screen w-screen bg-white/15 absolute left-0 top-0 backdrop-blur-sm"></span>
                    <nav className={`bg-black flex flex-col gap-3 w-full absolute top-10 left-0 p-2 z-10 text-white text-lg lg:left-auto lg:max-w-96 `}>
                        <button
                            disabled={active === '/'}
                            onClick={() => handleLinkClick('/')}
                            className={`p-2 flex gap-2 items-center ${active === '/' ? 'text-primary font-bold' : 'text-white'}`}
                        >
                            <MdHomeFilled size={16} />
                            Home
                        </button>
                        <button
                            disabled={active === '/docs'}
                            onClick={() => handleLinkClick('/docs')}
                            className={`p-2 flex gap-2 items-center ${active === '/docs' ? 'text-primary font-bold' : 'text-white'}`}
                        >
                            <HiOutlineDocumentText size={16} />
                            Documentation
                        </button>
                    <a onClick={() => setMenu(false)} href='https://github.com/vAbdullh/weather-website' target='_blank' rel="noreferrer" className='p-2 flex gap-2 items-center'>
                            <FaGithubAlt size={16} />
                            Repository
                        </a>
                        <div className="p-2 flex gap-4 items-center justify-center">
                            <button
                                onClick={() => handleChange('#ffe142')}
                                disabled={color === '#ffe142'}
                                className={`size-8 bg-[#ffe142] p-2 rounded-sm ${color === '#ffe142' ? 'border-2 border-white' : ''}`}
                            ></button>
                            <button
                                onClick={() => handleChange('#3490dc')}
                                disabled={color === '#3490dc'}
                                className={`size-8 bg-[#3490dc] p-2 rounded-sm ${color === '#3490dc' ? 'border-2 border-white' : ''}`}
                            ></button>
                            <button
                                onClick={() => handleChange('#ff64d4')}
                                disabled={color === '#ff64d4'}
                                className={`size-8 bg-[#ff64d4] p-2 rounded-sm ${color === '#ff64d4' ? 'border-2 border-white' : ''}`}
                            ></button>
                        </div>
                    </nav>
                </>
            }

        </header >
    )
}
