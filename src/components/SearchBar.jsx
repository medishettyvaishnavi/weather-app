import React from 'react'
import { useForm } from 'react-hook-form'
import { IoSearch } from 'react-icons/io5'

function SearchBar({onSearch}) {

    let {register,handleSubmit}=useForm()

    const onFormSubmit=(cityObj)=>{
        onSearch(cityObj.city)
    }
   
  return (
    <div className='container'>
        <form className="w-50 mx-auto my-5" onSubmit={handleSubmit(onFormSubmit)}>
        <div className='input-group'> <input type="text" {...register("city")}className="form-control mb-3" placeholder='search by city name'/>
        <button tyep='submit' className="btn btn-success mb-3"><IoSearch size={22}/> </button>
        </div>
    </form>
    </div>
  )
}

export default SearchBar