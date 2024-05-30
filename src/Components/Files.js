'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import SelectFile from "./SelectFile";
import axios from 'axios';
import FormData from 'form-data';

export default function Files({ setLoader, setData, data }) {
  const [mostrar, setMostrar] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoader(true);
    try {
      // Crear nuevas instancias de FormData
      const formDataGestiones = new FormData();
      formDataGestiones.append("file", data.gestiones);

      const formDataPagos = new FormData();
      formDataPagos.append("file", data.pagos);

      // Realizar las peticiones POST concurrentemente
      const [gestiones, pagos] = await Promise.all([
        axios.post("http://localhost:8000/api/cargar-archivo-excel/", formDataGestiones, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }),
        axios.post("http://localhost:8000/api/cargar-pagos/", formDataPagos, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      ]);

      console.log({ gestiones, pagos });

      setLoader(false);
      setMostrar(true)
    } catch (e) {
      // setMostrar(true)
      console.log(e);
      setLoader(false);
    }
    console.log(data);
  }

  return (
    <>
      <form className="p-3 border-black/40 mt-20 border w-auto md:w-[60%] rounded-lg" onSubmit={handleSubmit}>
        <div className='flex flex-col md:flex-row justify-center text-center gap-28'>
          <div className='flex flex-col justify-center items-center'>
            <h2 className="texto_cont ">Cargar base de datos de gestiones</h2>
            <SelectFile
              setData={setData}
              name="gestiones"
            />
          </div>
          <div className='flex flex-col justify-center items-center'>
            <h2 className="texto_cont">Cargar base de datos de pagos</h2>
            <SelectFile
              setData={setData}
              name="pagos"
            />
          </div>
        </div>
          <div className='flex flex-col justify-center items-center mt-10'>
            {!mostrar && <button className='button px-4 py-1' type='submit'>Cargar</button>}
            {mostrar && <a href="http://localhost:8000/api/descargar-csv" target="_blank" rel="noopener noreferrer" download="cruce_registro.csv" className='button px-4 py-1'>Descargar CSV</a>}
          </div>
        
      </form>

    </>
  );
}
