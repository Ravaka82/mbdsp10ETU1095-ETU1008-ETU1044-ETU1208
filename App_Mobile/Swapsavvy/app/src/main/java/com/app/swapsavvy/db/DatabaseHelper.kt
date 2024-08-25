package com.app.swapsavvy.db

import android.content.Context
import android.database.sqlite.SQLiteDatabase
import android.database.sqlite.SQLiteOpenHelper

class DatabaseHelper(context: Context) : SQLiteOpenHelper(context, DATABASE_NAME, null, DATABASE_VERSION) {
    override fun onCreate(db: SQLiteDatabase) {
        db.execSQL(CREATE_TABLE_UTILISATEUR)
        db.execSQL(CREATE_TABLE_CATEGORIE)
        db.execSQL(CREATE_TABLE_OBJET)
    }

    override fun onUpgrade(db: SQLiteDatabase, oldVersion: Int, newVersion: Int) {
        // Drop les anciennes tables si elles existent et recréer les nouvelles
        db.execSQL("DROP TABLE IF EXISTS $TABLE_UTILISATEUR")
        db.execSQL("DROP TABLE IF EXISTS $TABLE_CATEGORIE")
        db.execSQL("DROP TABLE IF EXISTS $TABLE_OBJET")
        onCreate(db)
    }

    companion object {
        private const val DATABASE_NAME = "swapsavvy.db"
        private const val DATABASE_VERSION = 1

        const val TABLE_UTILISATEUR = "utilisateur"
        const val TABLE_CATEGORIE = "categorie"
        const val TABLE_OBJET = "objet"

        private const val CREATE_TABLE_UTILISATEUR = """
            CREATE TABLE $TABLE_UTILISATEUR (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nom TEXT NOT NULL,
                prenom TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                mot_de_passe TEXT NOT NULL,
                latitude REAL,
                longitude REAL
            )
        """

        private const val CREATE_TABLE_CATEGORIE = """
            CREATE TABLE $TABLE_CATEGORIE (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nom TEXT NOT NULL UNIQUE
            )
        """

        private const val CREATE_TABLE_OBJET = """
            CREATE TABLE $TABLE_OBJET (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                utilisateur_id INTEGER NOT NULL,
                categorie_id INTEGER NOT NULL,
                titre TEXT NOT NULL,
                description TEXT,
                date_creation INTEGER NOT NULL,
                date_modification INTEGER,
                statut TEXT NOT NULL,
                etat TEXT NOT NULL,
                valeur_estimee REAL,
                image_url TEXT,
                FOREIGN KEY (utilisateur_id) REFERENCES $TABLE_UTILISATEUR(id),
                FOREIGN KEY (categorie_id) REFERENCES $TABLE_CATEGORIE(id)
            )
        """
    }
}
