"use client"
import { useContext, useState } from "react";
import { ShareContext } from "@/components/shared/context/share-state";
import BoxContainer from "@/components/shared/container";
import { IoMdCloseCircle } from "react-icons/io";
const Search = () => {
  const { setCity, city, loading, setLoading, searchQuery, setSearchQuery, handleRefresh, isNoResult, isError } = useContext(ShareContext);

  const [isClearVisible, setIsClearVisible] = useState(false);

  const handleSearchQuery = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setSearchQuery(value);
  }

  const handleKeydown = async (e) => {
    if (e.type === "keydown" && e.key === "Enter") {
      setLoading(true);
      setIsClearVisible(true);
      setCity(searchQuery);
    } else if (e.type === "keydown" && e.key === "Backspace" && isClearVisible) {
      if (city.length > 0 && searchQuery.length === 1) {
        handleClear();
      }
    }
  }

  const handleClear = () => {
    setIsClearVisible(false);
    handleRefresh();
  }
  
  return (
    <BoxContainer className='w-full flex gap-2'>
      <input type="text" disabled={city.length === 0 & loading}className="bg-transparent w-full h-full text-neutral-white outline-transparent border-0" placeholder="Search for cities..." value={searchQuery} onChange={(e) => handleSearchQuery(e)} onKeyDown={(e) => handleKeydown(e)} />
      {(isClearVisible || searchQuery.length > 10) &&
        <button className="z-10 text-lg text-neutral-purple hover:text-neutral-purple80" onClick={handleClear}><IoMdCloseCircle /></button>
      }
    </BoxContainer>
  )
}

export default Search;