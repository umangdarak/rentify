"use client";
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function Home() {
  const router=useRouter();
  useEffect(()=>{
    const d=localStorage.getItem('userData');
   const data= JSON.parse(d!);
    if(data.userType==='seller'){
      router.push('/home/seller');
    }else if(data.userType==='buyer'){
    router.push('/home/buyer');}else{
      router.push('/auth/login');
    }
  },[])
  return (
    <div>Home</div>
  )
}
