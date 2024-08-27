package com.app.swapsavvy.services

import android.content.Context

object AuthService {
    fun logout(context: Context) {
        val sharedPreferences = context.getSharedPreferences("MyPrefs", Context.MODE_PRIVATE)
        sharedPreferences.edit().apply {
            remove("userId")
            remove("userPrenom")
            remove("authToken")
            apply()
        }
    }
}
