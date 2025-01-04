
"use client"
import { useState, useEffect } from 'react';
import { useGetUser } from '@/app/hooks/useGetUser';
import axios from 'axios';
import Dp from '@/app/components/ui/Dp';


const EditProfilePage = ({params}:{params:{username:string}}) => {

  const username = params.username;
  const {loading, user} = useGetUser(username)
  
  
  const [formData, setFormData] = useState({
    name:"",
    bio: "",
    profilePicture: null,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "", 
        bio: user.bio || "",
        profilePicture: null,
      });
    }
  }, [user]);

  

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e:any) => {
    setFormData({
      ...formData,
      profilePicture: e.target.files[0],
    });
    console.log(formData)
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    // You would typically upload the form data to your API here.
    try{
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("name", formData.name || "");
      formDataToSubmit.append("bio", formData.bio || "");
      if (formData.profilePicture) {
        formDataToSubmit.append("file", formData.profilePicture);
        
      }
      await axios.put("/api/user/edit",formDataToSubmit)
      

    }
    catch(e){
      console.log(e);
    }

   

   
  };

  if(loading){
    return(
      <div className='flex items-center justify-center min-h-screen bg-gray-100'>Loading...</div>
    )
  }

 
  console.log(user)

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
        {!formData.profilePicture?
        (<div>
          {user?.profilepic?
          <Dp url={user.profilepic} size="20"/>:
          <Dp url={"/images/demo.png"} size="20"/>
          
        }
        </div>):
        (
          <Dp url={URL.createObjectURL(formData.profilePicture)} size="20"/>
        )}
        
        <div className="mb-4">
          <input
            type="file"
            name="profilePicture"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>


        <div className="mb-4">
          <label className="block text-gray-700">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg"
            rows={4}
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfilePage;
