package com.app.swapsavvy.login

import android.annotation.SuppressLint
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.app.swapsavvy.R
import android.content.Intent
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import com.app.swapsavvy.data.LoginResponse
import com.app.swapsavvy.data.Utilisateur
import com.app.swapsavvy.register.RegisterActivity
import com.app.swapsavvy.services.ApiService
import com.app.swapsavvy.network.APIClient
import com.app.swapsavvy.objetlist.ObjetListActivity
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class LoginActivity : AppCompatActivity() {
    private lateinit var emailEditText: EditText
    private lateinit var passwordEditText: EditText
    private lateinit var loginButton: Button
    private lateinit var registerButton: Button

    @SuppressLint("MissingInflatedId")
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
            login(email, mot_de_passe)
        }

        registerButton.setOnClickListener {
            startActivity(Intent(this, RegisterActivity::class.java))
        }
    }

    private fun login(email: String, mot_de_passe: String) {
        val apiService = APIClient.create(this, ApiService::class.java)
        val utilisateur = Utilisateur(
            _id="",
            nom = "",
            prenom = "",
            email = email,
            mot_de_passe = mot_de_passe,
            latitude = -18.79910360526281,
            longitude = 47.47534905075115
        )

        apiService.loginUser(utilisateur).enqueue(object : Callback<LoginResponse> {
            override fun onResponse(call: Call<LoginResponse>, response: Response<LoginResponse>) {
                if (response.isSuccessful) {
                    val loginResponse = response.body()
                    loginResponse?.let {
                        if (it.auth) {
                            val token = it.token

                            // Stocker le token dans les préférences partagées
                            getSharedPreferences("MyPrefs", MODE_PRIVATE).edit().apply {
                                putString("authToken", token)
                                apply()
                            }

                            apiService.getUserConnected("Bearer $token").enqueue(object : Callback<Utilisateur> {
                                override fun onResponse(call: Call<Utilisateur>, response: Response<Utilisateur>) {
                                    if (response.isSuccessful) {
                                        val utilisateurConnecte = response.body()
                                        utilisateurConnecte?.let {

                                            getSharedPreferences("MyPrefs", MODE_PRIVATE).edit().apply {
                                                putString("userId", it._id)
                                                putString("userPrenom", it.prenom)
                                                apply()
                                            }

                                            // Redirection vers la page liste des objets
                                            val intent = Intent(this@LoginActivity, ObjetListActivity::class.java)
                                            startActivity(intent)
                                            finish()
                                        }
                                    } else {
                                        Toast.makeText(this@LoginActivity, "Échec de la récupération des informations utilisateur", Toast.LENGTH_SHORT).show()
                                    }
                                }

                                override fun onFailure(call: Call<Utilisateur>, t: Throwable) {
                                    Toast.makeText(this@LoginActivity, "Erreur : ${t.message}", Toast.LENGTH_SHORT).show()
                                    t.printStackTrace()
                                }
                            })
                        } else {
                            Toast.makeText(this@LoginActivity, "Échec de la connexion", Toast.LENGTH_SHORT).show()
                        }
                    }
                } else {
                    Toast.makeText(this@LoginActivity, "Échec de la connexion", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<LoginResponse>, t: Throwable) {
                Toast.makeText(this@LoginActivity, "Erreur : ${t.message}", Toast.LENGTH_SHORT).show()
                t.printStackTrace()
            }
        })
    }
}
