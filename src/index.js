import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Pet } from "./Pets";
import Modal from "react-modal";
import NewPetModal from "./NewPetModal";
import { listPets, createPet } from "./api";

const App = () => {
  const [pets, setPets] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isNewPetOpen, setNewPetOpen] = useState(false);

  // useEffect(() => {
  //   fetch("http://localhost:3001/pets")
  //     .then((res) => res.json())
  //     .then((pets) => setPets(pets));
  // }, []);

  useEffect(() => {
    // async function getData() {
    //   setLoading(true);
    //   If there were an error, loading would never be set to false, so we have to use a try/catch to make that happen in this situation
    //   It's only set to false on an ideal path
    //   try {
    //     const res = await fetch("http://localhost:3001/pets");
    //     const pets = await res.json();
    //     setPets(pets);
    //     setLoading(false);
    //   } catch (e) {
    //     setLoading(false);
    //   }
    // }
    // getData();

    setLoading(true);
    listPets().then(pets => setPets(pets))
    .finally(() => setLoading(false));
    
  }, []);

  // const addPet = async ({name, kind, photo}) => {
  //   setPets(
  //     [
  //       ...pets,
  //       {
  //         id: Math.random(),
  //         name,
  //         kind,
  //         photo
  //       }
  //     ]
  //   )
  //   setNewPetOpen(false);
  // };

  const addPet = async (pet) => {
    return createPet(pet).then((newPet) => {
      setPets([...pets, newPet]);
      setNewPetOpen(false);
    });
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
                <Pet pet={pet} />
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

    </main>
  );
};

const container = document.getElementById("root");
Modal.setAppElement(container);
const root = createRoot(container);
root.render(<App />);