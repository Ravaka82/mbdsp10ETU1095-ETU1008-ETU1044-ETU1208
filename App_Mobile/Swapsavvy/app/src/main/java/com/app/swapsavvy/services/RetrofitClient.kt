package com.app.swapsavvy.services

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object RetrofitClient {

    private const val BASE_URL = "https://mbdsp10etu1095-etu1008-etu1044-etu1208.onrender.com/"

    private var retrofit: Retrofit? = null

    val apiService: ApiService by lazy {
        if (retrofit == null) {
            retrofit = Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build()
        }
        retrofit!!.create(ApiService::class.java)
    }
}
