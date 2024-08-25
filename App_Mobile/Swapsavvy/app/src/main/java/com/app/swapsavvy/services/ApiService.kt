package com.app.swapsavvy.services

import com.app.swapsavvy.data.LoginResponse
import com.app.swapsavvy.data.Objet
import com.app.swapsavvy.data.Utilisateur
import retrofit2.Call
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.POST
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


    @GET("/api/objets/user/{id}")
    fun getObjetsUser(@Path("id") id: String): Call<List<Objet>>

    @GET("/api/objets/all")
    fun getObjetsAll(): Call<List<Objet>>

}