import   {profilePicUpload} from "../api/user"


export  const isEmptyObject = (obj) =>   {
    return  Object.values(obj).some((value) =>   {
        return value === null ||  value === undefined ||    value ===  ''
    })
}

export const  getLocalStorageVariables = (action)  => {
    if(action   ===  'all'){
        return [localStorage.getItem('token'),localStorage.getItem('userType')];
    }
    return  localStorage.getItem(action);
}

export  const setLocalStorageVariables  = (keysValuesObj)  =>{
    for(let key in keysValuesObj){
        localStorage.setItem(key,keysValuesObj[key]);
    }
}

export const handlePicUploadFn = async (e) => {
    const [token,currentUser] =  getLocalStorageVariables('all');
    e.preventDefault();
    const file = e.target.files[0];
    const type = file.type.split("/")[1].toLowerCase();
    const allowedExtension = ["jpeg", "jpg", "png"];
    if (allowedExtension.indexOf(type) == -1)
      return {status: false, message: "Please  Upload  A Valid  Image  only : jpg , jpeg, png"}
    else if (file.size > 2097152) return {status:  false,message: "File  Size Must be under 2 MB"}
    else {
      try {
        const response = await profilePicUpload(
          token,
          file,
          currentUser
        );

        if(!response.status)
            return  {status: false,message: 'Some  Unexpected  Error  Occured'};

        return  {status: true,message: "Uploaded Profile Photo  Successfully"};

      } catch (error) {
        return {status: false,message: error.message}
      }
    }
  };