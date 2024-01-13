import { tittleFont } from '@/config/fonts'
import Link from 'next/link'
import React from 'react'
import {  IoCartOutline, IoSearchOutline } from 'react-icons/io5'

export const TopMenu = () => {
  return (
    <nav className='flex px-5 justify-between items-center w-full'>
        <div>
            <Link href="/">
                <span className={`${tittleFont.className} antialiased font-bold`}>Teslo</span>
                <span > | Shop</span>
            </Link>
        </div>
        <div className='hidden sm:block'>
            <Link href="/category/men" className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'>Hombres</Link>
            <Link href="/category/women" className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'>Mujeres</Link>
            <Link href="/category/kids" className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'>Niños</Link>
        </div>

        <div className='flex items-center'>
        <Link href="/search" className='mx-2' >
            <IoSearchOutline className='w-5 h-5'/>
        </Link>
        <Link href="/cart" >
            <div className='relative'>
                <span className='absolute text-xs px-1 rounded-full font-bold -top-2 bg-blue-700 text-white -right-2'>
                    3
                    </span>
                <IoCartOutline className='w-5 h-5'/>
            </div>
        </Link>

        <button className='m-2 p-2 rounded-md trnasition-all hover:bg-gray-100'>
            Menú
        </button>



        </div>
    </nav>
  )
}
