import React, { Component } from 'react';
import './Crud.css';

class CrudClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nom: "",
            id: 0,
            genre: "",
            ville: "Casablanca",
            personnes: [],
            isEditing: false,
            editId: null,
        };
    }

    // Ajouter une personne
    ajouterPersonne = () => {
        const { nom, genre, ville, id, personnes } = this.state;
        this.setState({ id: id + 1 });
        
        if (nom.trim() !== "" && genre && ville) {
            const nouvellePersonne = { id: id, nom: nom, genre: genre, ville: ville };
            this.setState({
                personnes: [...personnes, nouvellePersonne]
            }, this.resetForm);
        }
    };

    // Modifier une personne
    modifierPersonne = (id) => {
        const personne = this.state.personnes.find(p => p.id === id);
        if (personne) {
            this.setState({
                nom: personne.nom,
                genre: personne.genre,
                ville: personne.ville,
                isEditing: true,
                editId: id,
            });
        }
    };

    // Valider la modification
    validerModification = () => {
        const { personnes, editId, nom, genre, ville } = this.state;
        const personneAModifier = personnes.find(p => p.id === editId);
        
        if (personneAModifier) {
            personneAModifier.nom = nom;
            personneAModifier.genre = genre;
            personneAModifier.ville = ville;
            this.setState({ personnes: [...personnes] });
            this.resetForm();
        }
    };
    
    // Réinitialiser le formulaire
    resetForm = () => {
        this.setState({
            nom: '',
            genre: '',
            ville: '',
            isEditing: false,
            editId: null,
        });
    };

    // Supprimer une personne
    supprimerPersonne = (id) => {
        const verf = window.confirm('do you want to delete ?');
        if (verf) {
            this.setState(prevState => ({
                personnes: prevState.personnes.filter(p => p.id !== id)
            }));
        }
    };

    render() {
        const { nom, genre, ville, personnes, isEditing } = this.state;

        return (
            <div>
                <h2>Gestion des Personnes Class component</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <label>Nom :</label>
                        <input
                            type="text"
                            value={nom}
                            onChange={(e) => this.setState({ nom: e.target.value })}
                        />
                    </div>

                    <div>
                        <label>Genre :</label>
                        <input
                            type="radio"
                            value="Homme"
                            name='genre'
                            checked={genre === "Homme"}
                            onChange={() => this.setState({ genre: "Homme" })}
                        /> Homme
                        <input
                            type="radio"
                            name='genre'
                            value="Femme"
                            checked={genre === "Femme"}
                            onChange={() => this.setState({ genre: "Femme" })}
                        /> Femme
                    </div>

                    <div>
                        <label>Ville :</label>
                        <select value={ville} onChange={(e) => this.setState({ ville: e.target.value })}>
                            <option value="Casablanca">Casablanca</option>
                            <option value="Rabat">Rabat</option>
                            <option value="Marrakech">Marrakech</option>
                            <option value="Fès">Fès</option>
                        </select>
                    </div>

                    {isEditing ? (
                        <button onClick={this.validerModification}>Valider la modification</button>
                    ) : (
                        <button onClick={this.ajouterPersonne}>Ajouter</button>
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
                        {personnes.map((p) => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.nom}</td>
                                <td>{p.genre}</td>
                                <td>{p.ville}</td>
                                <td>
                                    <button onClick={() => this.modifierPersonne(p.id)}>Modifier</button>
                                    <button className='btnsupp' onClick={() => this.supprimerPersonne(p.id)}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default CrudClass;
