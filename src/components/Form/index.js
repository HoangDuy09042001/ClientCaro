import React from 'react';
import axios from 'axios';

const Form = () => {
  // a local state to store the currently selected file.
  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleSubmit = async(event) => {
    event.preventDefault()
    const formData = new FormData();
    console.log('formData', formData)
    formData.append("image", selectedFile);
    try {
        const response = await axios.post(`http://localhost:8080/api/user/picture`, {
          image: selectedFile,
          hello: 'hello',
        });
      console.log(`res: ${response}`)
    } catch(error) {
      console.log(error)
    }
  }

  const handleFileSelect = (event) => {
    console.log(event.target.files[0])
    setSelectedFile(event.target.files[0])
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileSelect}/>
      <input type="submit" />
    </form>
  )
};

export default Form;