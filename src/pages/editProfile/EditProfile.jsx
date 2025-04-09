import React, { useEffect, useState } from 'react'
import "./editProfile.css"
import axios from "axios";

import { useLocation, useNavigate } from 'react-router-dom'
import LoadingComponent from '../../components/loadingComponent/LoadingComponent';
import {} from  "react-router-dom"
const EditProfile = () => {
    const navigate=useNavigate();
    const location = useLocation();
    const { userId } = location.state;

    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [loading, setloading] = useState(false);

    const fetchUserData = async () => {

        try {
            let resData = await axios.get(import.meta.env.VITE_API_URL + `/getUser/${userId}`)
            if (resData.data.status == 200) {
                console.log(resData.data.userData);
                setName(resData.data.userData.name);
                setBio(resData.data.userData.bio);
            } else {
                navigate("/login")
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleUpdate = async () => {
       try{
        if (name !== "" || bio != "") {
            setloading(true);
            const isUpdated = await axios.post(import.meta.env.VITE_API_URL + `/updateUserInfo/${userId}`, {
                bio: bio,
                name: name
            })

            if (isUpdated) {
                setloading(false)
                setName("");
                setBio("");
                navigate(-1)
            }
            console.log(isUpdated)
        }
        
       }catch(err){
        console.warn(err)
       }finally{
        setloading(false);
       }

    }

    useEffect(() => {
        fetchUserData()

    }, [])

    return (
        <div className='  h-screen flex flex-col justify-center items-center text-black'>
            <section className='h-60 w-80 bg-slate-300 flex flex-col pl-2 pr-2 justify-evenly shadow-md shadow-black'>
                <input type="text" value={name} max={10} className='outline-none p-1 ' onChange={(e) => {
                    setName(e.target.value)
                }}></input>
                <textarea className=' resize-none h-2/4 outline-none p-1 mb-2' value={bio}
                    onChange={(e) => {
                        setBio(e.target.value)
                    }}
                ></textarea>
                <LoadingComponent value={loading} />
                <button className='w-24 h-8 rounded-md text-white bg-orange-500 self-end mt-2' onClick={() => handleUpdate()}>update</button>
            </section>
        </div>
    )
}

export default EditProfile