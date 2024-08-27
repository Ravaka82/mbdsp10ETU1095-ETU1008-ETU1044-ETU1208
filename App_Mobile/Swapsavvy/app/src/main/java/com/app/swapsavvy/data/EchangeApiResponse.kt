package com.app.swapsavvy.data

data class EchangeApiResponse(
    val _id: String?,
    val utilisateur_proposant_id: Utilisateur?,
    val utilisateur_acceptant_id: Utilisateur?,
    val objet_proposant: ObjetResponse?,
    val objet_acceptant: ObjetResponse?,
    val date_proposition: String?,
    val date_acceptation: String?,
    val statut: String?,
)
