"use client"
import { useContext, useState } from "react";
import { ShareContext } from "@/components/shared/context/share-state";
import BoxContainer from "@/components/shared/container";
const Search = () => {
  const { setCity, loading, setLoading } = useContext(ShareContext);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchQuery = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setSearchQuery(value);
  }
  const handleKeydown = async (e) => {
    if (e.type === "keydown" && e.key === "Enter") {
      setLoading(true);
      setCity(searchQuery);
    }
  }
  return (
    <BoxContainer className='w-full'>
      <input type="text" disabled={loading} className="bg-transparent w-full h-full text-neutral-white outline-transparent border-0" placeholder="Search for cities..." value={searchQuery} onChange={(e) => handleSearchQuery(e)} onKeyDown={(e) => handleKeydown(e)} />
    </BoxContainer>
  )
}

export default Search;