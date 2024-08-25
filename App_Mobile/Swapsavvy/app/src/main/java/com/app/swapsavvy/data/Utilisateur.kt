package com.app.swapsavvy.data

data class Utilisateur(
    val _id: String? = null,
    val nom: String,
    val prenom: String,
    val email: String,
    val mot_de_passe: String,
    val latitude: Double,
    val longitude: Double
)