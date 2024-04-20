import { useState, useEffect, useRef } from "react";
import styles from "./Upload.module.css";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import Resizer from "react-image-file-resizer";

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
  const [scientificNameSuggestions, setScientificNameSuggestions] = useState(
    []
  );
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures the effect runs once after initial render

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await fetch(
          `https://birdblogun-d42wh7ajma-vp.a.run.app/suggestions/scientific/${formData.scientificName}`
        );
        if (response.ok) {
          const data = await response.json();
          setScientificNameSuggestions(data);
        } else {
          throw new Error("Failed to fetch suggestions");
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    if (formData.scientificName.trim() !== "") {
      fetchSuggestions();
    } else {
      setScientificNameSuggestions([]);
    }
  }, [formData.scientificName]);

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

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        600,
        600,
        "JPEG",
        80,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  const uploadPhoto = (photo) => {
    resizeFile(photo)
      .then((resizedPhoto) => {
        const name = "123" + Date.now();
        const storageRef = firebase.storage().ref("/images/" + name);
        const uploadTask = storageRef.putString(resizedPhoto, "data_url");

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
      })
      .catch((error) => {
        console.log("Error resizing photo:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setIsSuggestionsVisible(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setFormData((prevData) => ({
      ...prevData,
      scientificName: suggestion,
    }));
    setIsSuggestionsVisible(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Enviar datos del formulario al servidor
    fetch("https://birdblogun-d42wh7ajma-vp.a.run.app/foroupload/", {
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

        document.getElementById("photoPreview").src = "";
        setSelectedFile(null);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className={styles.father}>
      <form id="form" className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.containerizq}>
          <div>
            <label htmlFor="scientificName">Scientific name:</label>
            <br />
            <input
              type="text"
              id="scientificName"
              name="scientificName"
              value={formData.scientificName}
              onChange={handleInputChange}
            />
            {isSuggestionsVisible && (
              <ul>
                {scientificNameSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
            <br />
          </div>
          <div>
            <label htmlFor="commonName">Common name:</label>
            <br />
            <input
              type="text"
              id="commonName"
              name="commonName"
              value={formData.commonName}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="author">Author:</label>
            <br />
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="location">Location:</label>
            <br />
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="family">Family:</label>
            <br />
            <input
              type="text"
              id="family"
              name="family"
              value={formData.family}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="order">Order:</label>
            <br />
            <input
              type="text"
              id="order"
              name="order"
              value={formData.order}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <br />
            <textarea
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={styles.containerder}>
          <div className={styles.img}>
            <img
              id="photoPreview"
              src={
                selectedFile
                  ? URL.createObjectURL(selectedFile)
                  : "https://firebasestorage.googleapis.com/v0/b/aves-a1081.appspot.com/o/images%2Fimage1.png?alt=media&token=c70e4b58-56bc-4493-afa2-a04e3e109f1c"
              }
              alt="Photo Preview"
              style={{ maxWidth: "200px" }}
            />
          </div>
          <div className={styles.file}>
            <input
              ref={fileInputRef}
              id="photo"
              className="file"
              type="file"
              name="mainimage"
            />
          </div>
          <div className={styles.enviar}>
            <div className={styles.upload}>
              <progress value={uploadProgress} max="100">
                {uploadProgress}%
              </progress>
            </div>
            <div>
              <button id="submit" type="submit" name="button" disabled>
                Send
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Upload;
