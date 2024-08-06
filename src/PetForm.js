import { useState, useRef } from "react";

const PetForm = ({pet, onSave, onCancel}) => {

    //if a pet gets passed in set these values
    const initialPet = pet || {
        name: "",
        kind: "",
        photo: null,
    };

    const [name, setName] = useState(initialPet.name);
    const [kind, setKind] = useState(initialPet.kind);
    const [photo, setPhoto] = useState(initialPet.photo);

    const [error, setErros] = useState(null);
    const [saving, setSaving] = useState(false);
    const photoInput = useRef();

    const submit = (event) => {
        //prevent refresh action
        event.preventDefault();
        setSaving(true);
        onSave({
          name,
          kind,
          photo,
        }).catch(
          error => {
            console.error(error);
            setErros(error);
            setSaving(false);
          }
        )
      }
    
      const updatePhoto = () => {
        const file = photoInput.current.files && photoInput.current.files[0];
      
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => setPhoto(reader.result);
          reader.readAsDataURL(file);
        }
      };

    return (
    <form className="pet-form" onSubmit={submit}>

        {photo && <img alt="the pet" src={photo} />}
        <label htmlFor="photo">Photo</label>
        <input type="file" id="photo" ref={photoInput} onChange={updatePhoto} />

        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {error && error.name && <div className="error">{error.name}</div>}

        <label htmlFor="kind">Kind</label>
        <select
          name="kind"
          id="kind"
          value={kind}
          onChange={(e) => setKind(e.target.value)}
        >
          <option value="">Choose a kind</option>
          <option value="cat">Cat</option>
          <option value="dog">Dog</option>
        </select>
        {error && error.kind && <div className="error">{error.kind}</div>}

        <button type="button" onClick={onCancel} disabled={saving}>
          Cancel
        </button>
        <button type="submit" disabled={saving}>Save</button>
      </form>
  )
}

export default PetForm;