package com.app.swapsavvy.register

import android.annotation.SuppressLint
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import com.app.swapsavvy.R
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import com.app.swapsavvy.network.APIClient
import com.app.swapsavvy.data.Utilisateur
import com.app.swapsavvy.login.LoginActivity
import com.app.swapsavvy.services.ApiService
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class RegisterActivity : AppCompatActivity() {
    private lateinit var nomEditText: EditText
    private lateinit var prenomEditText: EditText
    private lateinit var emailEditText: EditText
    private lateinit var passwordEditText: EditText
    private lateinit var confirmPasswordEditText: EditText
    private lateinit var registerButton: Button

    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register)

        nomEditText = findViewById(R.id.nomEditText)
        prenomEditText = findViewById(R.id.prenomEditText)
        emailEditText = findViewById(R.id.emailEditText)
        passwordEditText = findViewById(R.id.passwordEditText)
        confirmPasswordEditText = findViewById(R.id.confirmPasswordEditText)
        registerButton = findViewById(R.id.registerButton)

        registerButton.setOnClickListener {
            val nom = nomEditText.text.toString()
            val prenom = prenomEditText.text.toString()
            val email = emailEditText.text.toString()
            val mot_de_passe = passwordEditText.text.toString()
            register()
        }
    }

    private fun register() {
        val nom = nomEditText.text.toString().trim()
        val prenom = prenomEditText.text.toString().trim()
        val email = emailEditText.text.toString().trim()
        val mot_de_passe = passwordEditText.text.toString().trim()
        val confirmPassword = confirmPasswordEditText.text.toString().trim()

        if (nom.isEmpty() || prenom.isEmpty() || email.isEmpty() || mot_de_passe.isEmpty() || confirmPassword.isEmpty()) {
            Toast.makeText(this, "Veuillez remplir tous les champs", Toast.LENGTH_SHORT).show()
            return
        }

        if (mot_de_passe != confirmPassword) {
            Toast.makeText(this, "Les mots de passe ne correspondent pas", Toast.LENGTH_SHORT).show()
            return
        }

        val apiService = APIClient.create(this, ApiService::class.java)
        val utilisateur = Utilisateur(

            nom = nom,
            prenom = prenom,
            email = email,
            mot_de_passe = mot_de_passe,
            latitude = -18.79910360526281,
            longitude = 47.47534905075115
        )

        // Log des données envoyées pour vérification
        Log.d("Register", "Utilisateur envoyé : $utilisateur")

        apiService.registerUser(utilisateur).enqueue(object : Callback<Void> {
            override fun onResponse(call: Call<Void>, response: Response<Void>) {
                if (response.isSuccessful) {
                    val registerResponse = response.body()
                    Toast.makeText(this@RegisterActivity, "Inscription réussie", Toast.LENGTH_SHORT).show()

                    // Redirection vers la page de connexion
                    val intent = Intent(this@RegisterActivity, LoginActivity::class.java)
                    startActivity(intent)

                    finish()
                } else {
                    val errorMessage = "Échec de l'inscription. Code: ${response.code()}, Message: ${response.message()}"
                    Toast.makeText(this@RegisterActivity, errorMessage, Toast.LENGTH_SHORT).show()
                    Log.e("RegisterActivity", "Erreur : ${response.errorBody()?.string()}")
                }
            }

            override fun onFailure(call: Call<Void>, t: Throwable) {
                Toast.makeText(this@RegisterActivity, "Erreur : ${t.message}", Toast.LENGTH_SHORT).show()
                t.printStackTrace()
            }
        })
    }
}