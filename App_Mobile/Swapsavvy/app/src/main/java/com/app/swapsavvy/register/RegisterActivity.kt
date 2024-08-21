package com.app.swapsavvy.register

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.app.swapsavvy.R
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import com.app.swapsavvy.api.APIClient
import com.app.swapsavvy.data.Utilisateur
import com.app.swapsavvy.services.ApiService
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class RegisterActivity : AppCompatActivity() {
    private lateinit var emailEditText: EditText
    private lateinit var passwordEditText: EditText
    private lateinit var confirmPasswordEditText: EditText
    private lateinit var registerButton: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register)

        emailEditText = findViewById(R.id.emailEditText)
        passwordEditText = findViewById(R.id.passwordEditText)
        confirmPasswordEditText = findViewById(R.id.confirmPasswordEditText)
        registerButton = findViewById(R.id.registerButton)

        registerButton.setOnClickListener { registerUser() }
    }

    private fun registerUser() {
        val email = emailEditText.text.toString().trim()
        val mot_de_passe = passwordEditText.text.toString().trim()
        val confirmPassword = confirmPasswordEditText.text.toString().trim()

        if (email.isEmpty() || mot_de_passe.isEmpty() || confirmPassword.isEmpty()) {
            Toast.makeText(this, "Veuillez remplir tous les champs", Toast.LENGTH_SHORT).show()
            return
        }

        if (mot_de_passe != confirmPassword) {
            Toast.makeText(this, "Les mots de passe ne correspondent pas", Toast.LENGTH_SHORT).show()
            return
        }

        val apiService = APIClient.retrofit.create(ApiService::class.java)
        val utilisateur = Utilisateur(
            _id = null,
            nom = "",
            prenom = "",
            email = email,
            mot_de_passe = mot_de_passe
        )

        apiService.registerUser(utilisateur).enqueue(object : Callback<RegisterResponse> {
            override fun onResponse(call: Call<RegisterResponse>, response: Response<RegisterResponse>) {
                if (response.isSuccessful) {
                    val registerResponse = response.body()
                    // Inscription réussie, gérer la réponse
                    Toast.makeText(this@RegisterActivity, "Inscription réussie", Toast.LENGTH_SHORT).show()
                    // Rediriger vers la page de connexion
                    finish()
                } else {
                    Toast.makeText(this@RegisterActivity, "Échec de l'inscription", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<RegisterResponse>, t: Throwable) {
                Toast.makeText(this@RegisterActivity, "Erreur : ${t.message}", Toast.LENGTH_SHORT).show()
            }
        })
    }
}