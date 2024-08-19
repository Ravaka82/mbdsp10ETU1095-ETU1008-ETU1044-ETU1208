package com.app.swapsavvy.repositories

import com.app.swapsavvy.data.Objet
import com.app.swapsavvy.data.Utilisateur
import com.app.swapsavvy.services.ApiService
import retrofit2.Call

class ApiRepository(private val apiService: ApiService) {

    fun getUtilisateurById(id: String): Call<Utilisateur> {
        return apiService.getUtilisateurById(id)
    }

    fun createUtilisateur(utilisateur: Utilisateur): Call<Utilisateur> {
        return apiService.createUtilisateur(utilisateur)
    }

    fun getObjets(): Call<List<Objet>> {
        return apiService.getObjets()
    }
}
