package com.app.swapsavvy.data

import java.util.Date

data class Objet(
    val _id: String?,
    val utilisateur_id: String,
    val categorie_id: String,
    val titre: String,
    val description: String?,
    val date_creation: Date,
    val date_modification: Date,
    val statut: String,
    val etat: String,
    val valeur_estimee: Double,
    val image_url: String
)
