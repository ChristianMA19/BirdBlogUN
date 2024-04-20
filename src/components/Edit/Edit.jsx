import styles from "./Edit.module.css";
import { useEffect, useState } from "react";

const Edit = ({ onClose, name, _id }) => {
  const [formData, setFormData] = useState({
    scientificName: "",
  });

  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
  const [isp2visible, setp2visible] = useState(false);
  const [scientificNameSuggestions, setScientificNameSuggestions] = useState(
    []
  );

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

  const handleSend = async () => {
    if (formData.scientificName.trim() !== "") {
       try {
         const response = await fetch(
           `https://birdblogun-d42wh7ajma-vp.a.run.app/foroupload/name/${_id}`,
           {
             method: "PATCH",
             headers: {
               "Content-Type": "application/json",
             },
             body: JSON.stringify({
               scientificName: formData.scientificName,
             }),
           }
         );
        if (response.ok) {
          setp2visible(true);
        } else {
          throw new Error("Failed to update bird");
        }
      } catch (error) {
        console.error("Error updating bird:", error);
      }
    } else {
      alert("Por favor ingrese un nombre");
    }
  };

  const p1 = () => {
    return (
      <>
        <button className={styles.close_button} onClick={onClose}></button>
        <div className={styles.window}>
          Nombre original : {name}
          <br />
          <div className={styles.edit_input}>
            Nombre a cambiar :
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
          </div>
          <button className={styles.send_button} onClick={handleSend}>
            Enviar
          </button>
          <div className={styles.care}>Pedimos por favor no editar el nombre a menos que esté 100% seguro de que se ha cometido un error</div>
        </div>
      </>
    );
  };

  const p2 = () => {
    return (
      <>
        <div className={styles.window}>
          Se ha cambiado el nombre de "{name}" a "{formData.scientificName}" con
          éxito
          <br />
          <button className={styles.send_button} onClick={close}>
            Aceptar
          </button>
        </div>
      </>
    );
  };

  const close = () => {
    setp2visible(false);
    onClose();
    window.location.reload();
  };

  return (
    <div className={styles.container_overlay}>
      <div className={styles.container_content}>{isp2visible ? p2() : p1()}</div>
    </div>
  );
};

export default Edit;
