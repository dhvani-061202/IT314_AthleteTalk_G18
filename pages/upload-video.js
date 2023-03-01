import React, { useState } from 'react';
import server from '../server';

function GoogleDriveFileUploader() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    console.log('pressed submit');
    e.preventDefault();

    let formData = new FormData();
    formData.append('file', file.data);
    formData.append('title', title);
    formData.append('description', description);

    const response = await fetch(`/api/videos/upload`, {
      method: 'POST',
      body: formData,
    });

    const responseWithBody = await response.json();
    console.log('got response', responseWithBody);
    // if (response) setUrl(responseWithBody.publicUrl);
  };

  const handleFileChange = (e) => {
    const file = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setFile(file);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="Title">Title</label>
      <input
        type="text"
        name="Title"
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <br></br>
      <label htmlFor="Description">Description</label>
      <textarea
        name="Description"
        rows={5}
        cols={40}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <br></br>
      <input type="file" name="file" onChange={handleFileChange}></input>
      <br></br>
      <button type="submit">Submit</button>
    </form>
  );
}

export default GoogleDriveFileUploader;
