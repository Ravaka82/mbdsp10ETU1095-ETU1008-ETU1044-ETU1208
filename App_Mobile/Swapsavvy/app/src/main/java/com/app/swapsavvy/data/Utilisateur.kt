package com.app.swapsavvy.data

data class Utilisateur(
    val nom: String,
    val prenom: String,
    val email: String,
    val mot_de_passe: String,
    val latitude: Double,
    val longitude: Double
)