package com.app.swapsavvy.data

import java.util.Date

data class Echange(
    val utilisateur_proposant_id: String?,
    val utilisateur_acceptant_id: String?,
    val objet_proposant: String?,
    val objet_acceptant: String?,
    val date_proposition: Date?,
    val date_acceptation: Date?,
    val statut: String?
)

