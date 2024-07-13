import { useEffect, useState } from "react";
import apis from "../../api/mahasiswa";
import Layout from "../Layout";
import { useNavigate } from "react-router-dom";
import UpdateMahasiswa from "./UpdateMahasiwa";

const GetMahasiswa = () => {
    const navigate = useNavigate()
    const [mahasiswa, setMahasiwa] = useState([])
    const [error, setError] = useState(null)
    const [nim, setNim] = useState('')
    const [search, setSearch] = useState('')
    const [_nim, set_Nim] = useState('')
    const [mhs, setMhs] = useState({})
    const [isDelete, setIsDelete] = useState(false)

    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = (data) => {
        console.log(data)
        setMhs({...mhs, ...data})
        console.log(mhs)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    useEffect(() => {
        const fetchData = async () =>{
            try{
                let response = await apis.getMahasiswa();
            if (search) {
                response = await apis.getMahasiswaByNim(search);
            }
            setMahasiwa(response.data);
            } catch (error){
                setError(error.message)
            }
        }
        fetchData();
    }, [search, isModalOpen, isDelete])

    const handleSearch = () => {
        setSearch(nim)
    }

    if (error){
        return <div>Error : {error}</div>
    }

    const handleDelete = async (nim) => {
        try{
            await apis.deleteMahasiswa(nim)
            setIsDelete(!isDelete)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Layout>
        <div className="flex felx-row justify-between">
            <h1 className="text-2xl font-bold mt-2">Daftar Mahasiswa</h1>
            <div>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                    Search
                </label>

                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round"
                        strokeLinejoin="round" strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                    </div>
                    <input type="search" value={nim} className="block w-full p-4 pl-10
                    text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50
                    focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700
                    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                    dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="cari NIM" onChange={(e) => {setNim(e.target.value)}}/>

                    <button className="text-white absolute right-2.5 bottom-2.5 bg-blue-700
                    hover:bg-blue-800 focus:ring-4 focus:outline-none
                    focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2
                    dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
                    onClick={handleSearch}>Search</button>
                </div>
            </div>
        </div>

        <table className="min-w-full divide-gray-200 mt4">
            <thead className="bg-gray-800">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        NIM
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        NAMA
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        ANGKATAN
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        PRODI
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        ACTION
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {mahasiswa.map((mhs) =>(
                    <tr key={mhs.nim} className="bg-white dark:bg-gray-600 hover:bg-gray-50
                    dark:hover:bg-gray-500 dark:text-white">
                        <td className="px-6 py-4 font-sm whitespace-nowrap">{mhs.nim}</td>
                        <td className="px-6 py-4 font-sm whitespace-nowrap">{mhs.nama}</td>
                        <td className="px-6 py-4 font-sm whitespace-nowrap">{mhs.angkatan}</td>
                        <td className="px-6 py-4 font-sm whitespace-nowrap">{mhs.prodi}</td>
                        <td className="px-6 py-4 font-sm whitespace-nowrap">
                            <div className="flex flex-row justify-start">
                                <button
                                className="text-white underline cursor-pointer hover:text-blue-800"
                                onClick={() => {openModal(mhs)}}>Edit</button>

                                <button
                                className="text-white text-md bg-red-700 py-1 px-2 cursor-pointer hover:bg-red-900 ml-4"
                                onClick={()=>{handleDelete(mhs.nim)}}>Hapus</button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
            <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
             onClick={() => navigate("/create")}> <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
             ke halaman CREATE
             </span>
            </button>
        </table>
        <UpdateMahasiswa isOpen={isModalOpen} onClose={closeModal} mhs={mhs}/>
        </Layout>
    )
}
export default GetMahasiswa;