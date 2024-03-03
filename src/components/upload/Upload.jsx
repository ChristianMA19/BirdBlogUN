import { useState, useEffect, useRef } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const Upload = () => {
  const [formData, setFormData] = useState({
    scientificName: "",
    commonName: "",
    author: "",
    location: "",
    family: "",
    order: "",
    description: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Use useRef for file input
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Add event listener inside useEffect
    const photoInput = fileInputRef.current;
    if (photoInput) {
      photoInput.addEventListener("change", handleFileChange);

      // Cleanup: Remove the event listener when the component is unmounted
      return () => {
        photoInput.removeEventListener("change", handleFileChange);
      };
    }
  }, []); // Empty dependency array ensures the effect runs once after initial render

  const handleFileChange = () => {
    const photoInput = fileInputRef.current;
    const photo = photoInput.files[0];

    if (photo && photo.size <= 20 * 1024 * 1024) {
      // File is less than or equal to 20 MB
      setSelectedFile(photo);
      document.getElementById("submit").setAttribute("disabled", "true");
      previewPhoto(photo);
      uploadPhoto(photo);
    } else {
      // File is too large, handle accordingly (display a message or alert)
      console.log("File size exceeds the limit (20 MB).");
      // Optionally, reset the file input to allow the user to choose a different file
      photoInput.value = "";
    }
  };

  const previewPhoto = (photo) => {
    const objectUrl = URL.createObjectURL(photo);
    document.getElementById("photoPreview").src = objectUrl;
  };

  const uploadPhoto = (photo) => {
    const name = "123" + Date.now();
    const storageRef = firebase.storage().ref("/images/" + name);
    const uploadTask = storageRef.put(photo);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);

        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING:
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);

          // Update form data with the download URL
          setFormData((prevData) => ({
            ...prevData,
            urlPhoto: downloadURL,
          }));
        });
        // Enable the submit button
        document.getElementById("submit").removeAttribute("disabled");
      }
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Enviar datos del formulario al servidor
    fetch("http://localhost:8080/foroupload/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        // Clear form fields
        setFormData({
          scientificName: "",
          commonName: "",
          author: "",
          location: "",
          family: "",
          order: "",
          description: "",
        });
        // Disable the submit button again
        document.getElementById("submit").setAttribute("disabled", "true");
        // Reset form and file input after submission
        e.currentTarget.reset();
        document.getElementById("photoPreview").src = "";
        setSelectedFile(null);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <form id="form" onSubmit={handleSubmit}>
        <progress value={uploadProgress} max="100">
          {uploadProgress}%
        </progress>
        <br />
        <br />
        <label htmlFor="scientificName">Nombre cientifico:</label>
        <br />
        <input
          type="text"
          id="scientificName"
          name="scientificName"
          value={formData.scientificName}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <label htmlFor="commonName">Nombre comun:</label>
        <br />
        <input
          type="text"
          id="commonName"
          name="commonName"
          value={formData.commonName}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <label htmlFor="author">Autor:</label>
        <br />
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <label htmlFor="location">Ubicacion:</label>
        <br />
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <label htmlFor="family">Familia:</label>
        <br />
        <input
          type="text"
          id="family"
          name="family"
          value={formData.family}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <label htmlFor="order">Orden:</label>
        <br />
        <input
          type="text"
          id="order"
          name="order"
          value={formData.order}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <label htmlFor="description">Descripcion:</label>
        <br />
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <img
          id="photoPreview"
          src={selectedFile ? URL.createObjectURL(selectedFile) : ""}
          alt="Photo Preview"
          style={{ maxWidth: "200px" }}
        />
        <br />
        <br />
        <input
          ref={fileInputRef}
          id="photo"
          className="file"
          type="file"
          name="mainimage"
        />
        <br />
        <br />
        <button id="submit" type="submit" name="button" disabled>
          Subir
        </button>
      </form>
    </div>
  );
};

export default Upload;
