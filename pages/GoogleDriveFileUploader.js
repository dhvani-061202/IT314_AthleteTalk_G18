import React, { useState } from "react";
import server from "../server";

function GoogleDriveFileUploader() {
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);
  console.log(process.env.SERVER);

  const handleSubmit = async (e) => {
    console.log("pressed submit");
    e.preventDefault();
    let formData = new FormData();
    formData.append("file", file.data);
    const response = await fetch(`${server}/api/upload-file`, {
      method: "POST",
      body: formData,
    });

    const responseWithBody = await response.json();
    console.log("got response");
    if (response) setUrl(responseWithBody.publicUrl);
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
      <input type="file" name="file" onChange={handleFileChange}></input>
      <button type="submit">Submit</button>
    </form>
  );
}

export default GoogleDriveFileUploader;
