package com.app.swapsavvy.services

import com.app.swapsavvy.data.Echange
import com.app.swapsavvy.data.EchangeApiResponse
import com.app.swapsavvy.data.LoginResponse
import com.app.swapsavvy.data.Objet
import com.app.swapsavvy.data.StatutRequest
import com.app.swapsavvy.data.Utilisateur
import retrofit2.Call
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Path

interface ApiService {

    @POST("/api/auth/register")
    fun registerUser(@Body utilisateur: Utilisateur): Call<Void>

    @POST("/api/auth/login")
    fun loginUser(@Body utilisateur: Utilisateur): Call<LoginResponse>

    @GET("/api/auth/me")
    fun getUserConnected(@Header("Authorization") token: String): Call<Utilisateur>

    @POST("/api/utilisateurs")
    fun createUtilisateur(@Body utilisateur: Utilisateur): Call<Utilisateur>

    @GET("/api/utilisateurs/{id}")
    fun getUtilisateurById(@Path("id") id: String): Call<Utilisateur>



    @GET("/api/objets")
    fun getObjets(): Call<List<Objet>>

    @GET("/api/objets/{id}")
    fun getObjetById(@Path("id") id: String): Call<List<Objet>>
    abstract fun login(email: String, password: String): Response<Utilisateur>

    @GET("/api/objets/utilisateur/{id}")
    fun getObjetsByUtilisateur(@Path("id") id: String): Call<List<Objet>>

    @GET("/api/objets/utilisateurConnected/{id}")
    fun getObjetsByUtilisateurConnected(@Path("id") id: String): Call<List<Objet>>


    @GET("/api/objets/excluded/{id}")
    fun getOtherObjets(@Path("id") id: String): Call<List<Objet>>


    @GET("/api/objets/excluded/{userId}")
    fun getObjetsExcludedByUser(@Path("userId") userId: String): Call<List<Objet>>

    @GET("/api/objets/user/{id}")
    fun getObjetsUser(@Path("id") id: String): Call<List<Objet>>

    @GET("/api/objets/all")
    fun getObjetsAll(): Call<List<Objet>>

    @POST("/api/echanges")
    fun createEchange(@Body echange: Echange): Call<Echange>


    @GET("/api/echanges/lisesobjetsouhaites/{utilisateur_id}")
    fun getEchangesByUtilisateur(@Path("utilisateur_id") userId: String): Call<List<EchangeApiResponse>>

    @GET("api/echanges/EchangePropose/{utilisateur_id}")
    fun getEchangeEnAttente(@Path("utilisateur_id") userId: String): Call<List<EchangeApiResponse>>

    @PUT("/api/echanges/statut/{echange_id}")
    fun updateEchangeStatut(
        @Path("echange_id") echangeId: String,
        @Body statutRequest: StatutRequest
    ): Call<Echange>

    @PUT("/api/echanges/echange/{echange_id}/statut")
    fun updateEchangeStatutEnValidatation(
        @Path("echange_id") echangeId: String,
        @Body statutRequest: StatutRequest
    ): Call<Echange>



    @DELETE("/api/echanges/{echange_id}")
    fun deleteEchange(@Path("echange_id") echangeId: String): Call<Void>
}


