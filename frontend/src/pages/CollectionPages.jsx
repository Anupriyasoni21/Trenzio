import React, { useEffect, useState, useRef } from 'react';
import {FaFilter} from "react-icons/fa";
import FilterSideBar from '../components/Products/FilterSideBar';
import SortOption from '../components/Products/SortOption';
import ProductGrid from '../components/Products/ProductGrid';
import { useParams, useSearchParams } from 'react-router-dom';
import{useDispatch, useSelector} from "react-redux";
import {fetchProductsByFilters} from "../redux/productSlice"


const CollectionPages = () => {
    const {collection}=useParams();
    const[searchParmas]=useSearchParams();
    const dispatch=useDispatch();
    const {products,loading,error}=useSelector((state)=>state.products);
    const queryParams=Object.fromEntries([...searchParmas]);
  
    const sidebarRef=useRef(null);
    const [isSidebarOpen,setIsSidebarOpen]=useState(false);
  
     useEffect(()=>{
        dispatch(fetchProductsByFilters({collection,...queryParams}));

     },[dispatch,collection,searchParmas]);
     
    const toggleSidebar=()=>{
        setIsSidebarOpen(!isSidebarOpen);
    }
const handleClickOutside=(e)=>{
    if(sidebarRef.current && !sidebarRef.current.contains(e.target));
    setIsSidebarOpen(false);
}

    useEffect(()=>{
         //ADD event listener for click
         document.addEventListener("mousedown",handleClickOutside);
         return()=>{
           document.removeEventListener("mousedown",handleClickOutside);
         }
         
    },[]);

   


  return (
    <div className='flex flex-col lg:flex-row'>
        {/* Mobile filter btn */}
        <button
        onClick={toggleSidebar} className='lg:hidden border p-2 flex justify-center items-center'>
            <FaFilter className='mr-2 '/>
        </button>
      
      {/* Filter side bar */}
      <div 
      className={`${isSidebarOpen? "translate-x-0" :"-translate-x-full"} fixed inset-y-0 z-50
      left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
      ref={sidebarRef}>
        <FilterSideBar/>
      </div>
      <div className="flrx-grow p-4">
        <h2 className='text-2xl uppercase mb-4'>All Collections</h2>

        {/* sort option */}
        <SortOption/>

        {/* Product grid */}
        <ProductGrid products={products} loading={loading} error={error}/>
      </div>
    </div>
  )
}

export default CollectionPages
