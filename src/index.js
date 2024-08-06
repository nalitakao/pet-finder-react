import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Pet } from "./Pets";
import Modal from "react-modal";
import NewPetModal from "./NewPetModal";
import { listPets, createPet, updatePet, deletePet } from "./api";
import EditPetModal from "./EditPetModal";

const App = () => {
  const [pets, setPets] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isNewPetOpen, setNewPetOpen] = useState(false);
  const [currentPet, setCurrentPet] = useState(null);

  useEffect(() => {
    setLoading(true);
    listPets().then(pets => setPets(pets))
    .finally(() => setLoading(false));
    
  }, []);

  const addPet = async (pet) => {
    return createPet(pet).then((newPet) => {
      setPets([...pets, newPet]);
      setNewPetOpen(false);
    });
  };

  const savePet = async (pet) => {
    return updatePet(pet).then(updatePet => {
      setPets(pets => pets.map((pet) => (pet.id === updatePet.id ? updatePet : pet))
    );
    setCurrentPet(null);
    });
  };

  const removePet = (byePet) => {
    const result = window.confirm(
      `Are you sure you want to adopt ${byePet.name}`
    );
    if (result) {
      //The deletePet function receives an object from the onRemove function and then setPets check if pet.id is not equal the object id to then change its state
      deletePet(byePet).then(() => {
        setPets(pets => pets.filter(pet => pet.id !== byePet.id))
      })
    }
  };

  return (
    <main>
      <h1>Adopt-a-Pet</h1>
      {/* if isLoading is true display loading label, otherwise map json response */}
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <ul>
            {pets.map((pet) => (
              <li key={pet.id}> 
                <Pet
                  pet={pet}
                  onEdit={() => {
                    console.log("pet", pet);
                    setCurrentPet(pet);
                  }}
                  onRemove={() => removePet(pet)}
                />
              </li>
            ))}
          </ul>
          <button onClick={() => setNewPetOpen(true)}>Add a Pet</button>
        </>
      )}

      {/*Button with form to add new pet only renders if var isNewPetOpen is true*/}
      {isNewPetOpen && (
        <NewPetModal onSave={addPet} onCancel={() => setNewPetOpen(false)} />
      )}

      {currentPet && (
        <EditPetModal pet={currentPet} onSave={savePet} onCancel={() => setNewPetOpen(false)} />
      )}

    </main>
  );
};

const container = document.getElementById("root");
Modal.setAppElement(container);
const root = createRoot(container);
root.render(<App />);