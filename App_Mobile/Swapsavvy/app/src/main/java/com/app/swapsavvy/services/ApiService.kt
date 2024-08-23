package com.app.swapsavvy.services

import com.app.swapsavvy.data.Objet
import com.app.swapsavvy.data.Utilisateur
import retrofit2.Call
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Path

interface ApiService {

    @POST("/api/auth/register")
    fun registerUser(@Body utilisateur: Utilisateur): Call<Void>

    @POST("/api/auth/login")
    fun loginUser(@Body utilisateur: Utilisateur): Call<Utilisateur>

    @POST("/api/utilisateurs")
    fun createUtilisateur(@Body utilisateur: Utilisateur): Call<Utilisateur>

    @GET("/api/utilisateurs/{id}")
    fun getUtilisateurById(@Path("id") id: String): Call<Utilisateur>

    @GET("/api/objets")
    fun getObjets(): Call<List<Objet>>

    @GET("/api/objets/{id}")
    fun getObjetById(@Path("id") id: String): Call<Objet>
    abstract fun login(email: String, password: String): Response<Utilisateur>


}