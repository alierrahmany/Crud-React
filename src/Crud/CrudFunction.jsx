import React, { useState } from 'react';

import './Crud.css';

function CrudFunction() {
    const [nom, setNom] = useState("");
    const [id, setid] = useState(0); 
    const [genre, setGenre] = useState(""); 
    const [ville, setVille] = useState("Casablanca"); 
    const [personnes, setPersonnes] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    // Ajouter une personne
    const ajouterPersonne = () => {
        setid(id+1);
        if (nom.trim() !== "" && genre && ville) {
            const nouvellePersonne = { id: id,nom:nom, genre:genre, ville:ville };
            setPersonnes([...personnes, nouvellePersonne]);
            resetForm();
        }
    };




    // Modifier une personne
    const modifierPersonne = (id) => {
        const personne = personnes.find(p => p.id === id);
        if (personne) {
            setNom(personne.nom);
            setGenre(personne.genre);
            setVille(personne.ville);
            setIsEditing(true);
            setEditId(id);
        }
    };


    // Valider la modification
    const validerModification = () => {
        const personneAModifier = personnes.find(p => p.id === editId);
        if (personneAModifier) {
            personneAModifier.nom = nom;
            personneAModifier.genre = genre;
            personneAModifier.ville = ville;
            setPersonnes([...personnes]); 
            resetForm();
        }
    };

     // Réinitialiser le formulaire
     const resetForm = () => {
        setNom('');
        setGenre('');
        setVille('');
        setIsEditing(false);
        setEditId(null);
    };



    // Supprimer une personne

    const supprimerPersonne = (id) => {
        const verf=window.confirm('do you want to delete ?');
        if(verf){
            setPersonnes(personnes.filter(p => p.id !== id));

        }
        
    };

    return (
        <div>
            <h1>Gestion des Personnes Function component</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <div >
                    <label>Nom :</label>
                    <input
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                    />
                </div>

                <div>
                    <label>Genre :</label>
                    <input
                        type="radio"
                        value="Homme"
                        name='genre'
                        checked={genre === "Homme"}
                        onChange={(e) => setGenre("Homme")}
                    /> Homme
                    <input
                        type="radio"
                        name='genre'
                        value="Femme"
                        checked={genre === "Femme"}
                        onChange={() => setGenre("Femme")}
                    /> Femme
                </div>

                <div>
                    <label>Ville :</label>
                    <select value={ville} onChange={(e) => setVille(e.target.value)}>
                        <option value="Casablanca">Casablanca</option>
                        <option value="Rabat">Rabat</option>
                        <option value="Marrakech">Marrakech</option>
                        <option value="Fès">Fès</option>
                    </select>
                </div>

                {isEditing ? (<>
                    <button onClick={validerModification}>Valider la modification</button>
                    </>
                ) : (
                    <button onClick={ajouterPersonne}>Ajouter</button>
                )}


            </form>

            <table border="1" style={{ marginTop: "20px", width: "100%" }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Genre</th>
                        <th>Ville</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {personnes.map((p, i) => (
                        <tr key={i}>
                            <td>{p.id}</td>
                            <td>{p.nom}</td>
                            <td>{p.genre}</td>
                            <td>{p.ville}</td>
                            <td>
                                <button onClick={() => modifierPersonne(p.id)}>Modifier</button>
                                <button className='btnsupp'  onClick={() => supprimerPersonne(p.id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CrudFunction;