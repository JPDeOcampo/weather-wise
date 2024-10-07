"use client"
import { useContext } from 'react'
import { ShareContext } from '../context/share-state'

const BoxContainer = ({ children, className }) => {
    const { darkMode } = useContext(ShareContext);

    return (
        <div className={`${darkMode ? 'box-container' : 'box-container-blur'} ${className}`}>
            {children}
        </div>
    )
}

export default BoxContainer;