CREATE TABLE administrateurs (
    administrateur_id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE,
    mot_de_passe TEXT
);

CREATE TABLE utilisateurs (
    utilisateur_id SERIAL PRIMARY KEY,
    nom VARCHAR(100),
    prenom VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    mot_de_passe TEXT,
    adresse TEXT,
    ville VARCHAR(100),
    code_postal VARCHAR(20),
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_modification TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    categorie_id SERIAL PRIMARY KEY,
    nom VARCHAR(100) UNIQUE
);

CREATE TABLE objets (
    objet_id SERIAL PRIMARY KEY,
    utilisateur_id INTEGER REFERENCES utilisateurs(utilisateur_id),
    categorie_id INTEGER REFERENCES categories(categorie_id),
    titre VARCHAR(255),
    description TEXT,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_modification TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    statut VARCHAR(50)
);

CREATE TABLE echanges (
    echange_id SERIAL PRIMARY KEY,
    utilisateur_proposant_id INTEGER REFERENCES utilisateurs(utilisateur_id),
    utilisateur_acceptant_id INTEGER REFERENCES utilisateurs(utilisateur_id),
    date_proposition TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_acceptation TIMESTAMP,
    statut VARCHAR(50)
);

CREATE TABLE images_objets (
    image_id SERIAL PRIMARY KEY,
    objet_id INTEGER REFERENCES objets(objet_id),
    filename TEXT,
    date_ajout TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

