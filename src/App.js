import "./App.css";
import { useRef, useState, useEffect } from "react";

function App() {
  const inpRef = useRef(null);
  const [formState, setFormState] = useState({
    name: "",
    gender: "",
    maritalStatus: "",
    image: null,
  });

  const [imgSrc, setImgSrc] = useState(null);
  const imageRef = useState(null);

  useEffect(() => {
    const file = imageRef.current.files[0];
    let src = null;
    if (file) {
      src = URL.createObjectURL(file);
    }
    setImgSrc(src);
    return () => {
      URL.revokeObjectURL(src);
    };
  }, [formState.image]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleFormUpdate = (e) => {
    let { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormState({ ...formState, [name]: val });
  };

  const handleImageChange = (e) => {
    try {
      const file = e.target.files[0];
      setFormState({ ...formState, image: file });
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <div className="App">
      <br />
      <label>Input </label>
      <input type="text" ref={inpRef}></input>
      <button onClick={() => inpRef.current.focus()}>Focus</button>
      <br />
      <br />
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <div>
          <label for="name">Name</label>
          <input
            type="text"
            name="name"
            onClick={handleFormUpdate}
            value={formState.name}
          ></input>
        </div>
        <div>
          <label>Gender</label>
          <select
            value={formState.gender}
            onChange={handleFormUpdate}
            name="gender"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label>Marital Status</label>
          <input
            checked={formState.maritalStatus}
            onChange={handleFormUpdate}
            name="maritalStatus"
            type="checkbox"
          ></input>
        </div>
        <div>
          <label>Profile Picture</label>
          <input
            type="file"
            onChange={handleImageChange}
            ref={imageRef}
          ></input>
        </div>
        <div>{imgSrc && <img width="400px" src={imgSrc} alt="profile" />}</div>
      </form>
    </div>
  );
}

export default App;
