"use client"
import { useContext, useState } from "react";
import { ShareContext } from "@/components/shared/context/share-state";

const Search = () => {
  const { setCity } = useContext(ShareContext);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchQuery = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setSearchQuery(value);
  }
  const handleKeydown = async (e) => {
   if(e.type === "keydown" && e.key === "Enter"){

    setCity(searchQuery);
   }

  }
  return (
    <div className='box-container'>
      <input type="text" className="bg-transparent w-full h-full text-neutral-white outline-transparent border-0" placeholder="Search for cities..." value={searchQuery} onChange={(e) => handleSearchQuery(e)} onKeyDown={(e) => handleKeydown(e)}/>
    </div>
  )
}

export default Search;