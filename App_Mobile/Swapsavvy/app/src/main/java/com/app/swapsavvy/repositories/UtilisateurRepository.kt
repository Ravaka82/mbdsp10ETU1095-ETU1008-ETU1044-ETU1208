package com.app.swapsavvy.repositories

import android.content.ContentValues
import android.content.Context
import android.database.Cursor
import com.app.swapsavvy.data.Utilisateur
import com.app.swapsavvy.db.DatabaseHelper

class UtilisateurRepository(context: Context) {

    private val dbHelper = DatabaseHelper(context)

    fun insertUtilisateur(utilisateur: Utilisateur) {
        val db = dbHelper.writableDatabase
        val contentValues = ContentValues().apply {
            put("nom", utilisateur.nom)
            put("prenom", utilisateur.prenom)
            put("email", utilisateur.email)
            put("mot_de_passe", utilisateur.mot_de_passe)
            put("latitude", utilisateur.latitude)
            put("longitude", utilisateur.longitude)
        }
        db.insert(DatabaseHelper.TABLE_UTILISATEUR, null, contentValues)
    }

    fun getAllUtilisateurs(): List<Utilisateur> {
        val utilisateurs = mutableListOf<Utilisateur>()
        val db = dbHelper.readableDatabase
        val cursor: Cursor = db.query(DatabaseHelper.TABLE_UTILISATEUR, null, null, null, null, null, null)

        with(cursor) {
            while (moveToNext()) {
                val nom = getString(getColumnIndexOrThrow("nom"))
                val prenom = getString(getColumnIndexOrThrow("prenom"))
                val email = getString(getColumnIndexOrThrow("email"))
                val motDePasse = getString(getColumnIndexOrThrow("mot_de_passe"))
                val latitude = getDouble(getColumnIndexOrThrow("latitude"))
                val longitude = getDouble(getColumnIndexOrThrow("longitude"))

                val utilisateur = Utilisateur(nom, prenom, email, motDePasse, latitude, longitude)
                utilisateurs.add(utilisateur)
            }
        }

        cursor.close()
        return utilisateurs
    }
}