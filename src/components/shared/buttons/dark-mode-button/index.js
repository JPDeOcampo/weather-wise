"use client"
import { useContext } from 'react'
import { FaMoon } from "react-icons/fa";
import { MdSunny } from "react-icons/md";
import { ShareContext } from "@/components/shared/context/share-state";

const DarkModeButton = () => {
    const { darkMode, setDarkMode } = useContext(ShareContext);

    return (
        <button className="[&_svg]:text-2xl" onClick={() => setDarkMode(!darkMode)}>{darkMode ? <span className="hover:text-neutral-purple80 text-neutral-purple"><FaMoon /></span> : <span className="hover:text-neutral-white80 text-yellow-300"><MdSunny /></span>}</button>
    )
}

export default DarkModeButton;