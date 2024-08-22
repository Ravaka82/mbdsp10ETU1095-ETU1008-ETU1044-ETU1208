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
import com.app.swapsavvy.network.APIClient
import com.app.swapsavvy.security.TokenManager
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

        loginButton.setOnClickListener {
            val email = emailEditText.text.toString()
            val mot_de_passe = passwordEditText.text.toString()
            login()
        }

        registerButton.setOnClickListener {
            // Rediriger vers RegisterActivity
            startActivity(Intent(this, RegisterActivity::class.java))
        }
    }

    private fun login() {
        val email = emailEditText.text.toString().trim()
        val mot_de_passe = passwordEditText.text.toString().trim()

        if (email.isEmpty() || mot_de_passe.isEmpty()) {
            Toast.makeText(this, "Veuillez entrer votre email et mot de passe", Toast.LENGTH_SHORT).show()
            return
        }

        val apiService = APIClient.create(this, ApiService::class.java)
        val utilisateur = Utilisateur(
            _id = null,
            nom = "",
            prenom = "",
            email = email,
            mot_de_passe = mot_de_passe,
            token = ""
        )

        apiService.loginUser(utilisateur).enqueue(object : Callback<Utilisateur> {
            override fun onResponse(call: Call<Utilisateur>, response: Response<Utilisateur>) {
                if (response.isSuccessful) {
                    response.body()?.let { utilisateur ->
                        // Sauvegarde du token après une connexion réussie
                        utilisateur.token?.let { TokenManager.saveToken(this@LoginActivity, it) }
                        Toast.makeText(this@LoginActivity, "Connexion réussie", Toast.LENGTH_SHORT)
                            .show()
                    }
                    } else {
                    Toast.makeText(this@LoginActivity, "Échec de la connexion", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<Utilisateur>, t: Throwable) {
                Toast.makeText(this@LoginActivity, "Erreur : ${t.message}", Toast.LENGTH_SHORT).show()
            }
        })
    }

}