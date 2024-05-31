"use client"

import Files from "@/Components/Files";
import "./globals.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from "next/image";
import Loader from "@/Components/Loader/Loader";
import { useState } from "react";


export default function Home() {
  const [loader, setLoader] = useState(false)
  const [data, setData] = useState({})
  return (
   <>
    <nav className="w-full  h-[80px] flex justify-between items-center bg-cyan-500/60">
      <h1 className="letras_nav text-white ml-4 hidden md:block">Secretaria de movilidad</h1>
      <img src={"/logo.png"} width={"80"} height={"60"} alt="" />
    </nav>
    <section className="flex justify-center">
     <Files 
     setLoader={setLoader}
     setData={setData}
     data={data}
     />
    </section>

    {loader && <Loader />}
    </>
  );
}
