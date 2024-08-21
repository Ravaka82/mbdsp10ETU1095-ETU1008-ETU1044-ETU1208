package com.app.swapsavvy.login

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.app.swapsavvy.R
import android.content.Intent
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import com.app.swapsavvy.data.Utilisateur
import com.app.swapsavvy.register.RegisterActivity
import com.app.swapsavvy.services.ApiService
import com.app.swapsavvy.api.APIClient
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class LoginActivity : AppCompatActivity() {
    private lateinit var emailEditText: EditText
    private lateinit var passwordEditText: EditText
    private lateinit var loginButton: Button
    private lateinit var registerButton: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        emailEditText = findViewById(R.id.emailEditText)
        passwordEditText = findViewById(R.id.passwordEditText)
        loginButton = findViewById(R.id.loginButton)
        registerButton = findViewById(R.id.registerButton)

        loginButton.setOnClickListener { loginUser() }

        registerButton.setOnClickListener {
            // Rediriger vers RegisterActivity
            startActivity(Intent(this, RegisterActivity::class.java))
        }
    }

    private fun loginUser() {
        val email = emailEditText.text.toString().trim()
        val mot_de_passe = passwordEditText.text.toString().trim()

        if (email.isEmpty() || mot_de_passe.isEmpty()) {
            Toast.makeText(this, "Veuillez entrer votre email et mot de passe", Toast.LENGTH_SHORT).show()
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

        apiService.loginUser(utilisateur).enqueue(object : Callback<LoginResponse> {
            override fun onResponse(call: Call<LoginResponse>, response: Response<LoginResponse>) {
                if (response.isSuccessful) {
                    val loginResponse = response.body()
                    // Connexion réussie, gérer la réponse
                    Toast.makeText(this@LoginActivity, "Connexion réussie", Toast.LENGTH_SHORT).show()
                    // Rediriger vers une autre activité
                } else {
                    Toast.makeText(this@LoginActivity, "Échec de la connexion", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<LoginResponse>, t: Throwable) {
                Toast.makeText(this@LoginActivity, "Erreur : ${t.message}", Toast.LENGTH_SHORT).show()
            }
        })
    }

}