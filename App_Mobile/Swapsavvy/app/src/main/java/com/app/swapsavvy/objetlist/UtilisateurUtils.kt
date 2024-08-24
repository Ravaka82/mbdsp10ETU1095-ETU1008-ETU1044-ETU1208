package com.app.swapsavvy.objetlist

import android.content.Context
import android.content.SharedPreferences

object UtilisateurUtils {
    private const val PREF_NAME = "user_prefs"
    private const val KEY_USER_ID = "utilisateur_id"

    fun saveUserId(context: Context, id: String) {
        val sharedPreferences: SharedPreferences = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE)
        val editor = sharedPreferences.edit()
        editor.putString(KEY_USER_ID, id)
        editor.apply()
    }

    fun getUserId(context: Context): String? {
        val sharedPreferences: SharedPreferences = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE)
        return sharedPreferences.getString(KEY_USER_ID, null)
    }

    fun clearUserData(context: Context) {
        val sharedPreferences: SharedPreferences = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE)
        val editor = sharedPreferences.edit()
        editor.clear()
        editor.apply()
    }
}