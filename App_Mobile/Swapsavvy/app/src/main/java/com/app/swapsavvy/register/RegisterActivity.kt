package com.app.swapsavvy.register

import android.annotation.SuppressLint
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.app.swapsavvy.R
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import com.app.swapsavvy.network.APIClient
import com.app.swapsavvy.data.Utilisateur
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
            _id = null,
            nom = "",
            prenom = "",
            email = email,
            mot_de_passe = mot_de_passe,
            token = ""
        )

        apiService.registerUser(utilisateur).enqueue(object : Callback<Void> {
            override fun onResponse(call: Call<Void>, response: Response<Void>) {
                if (response.isSuccessful) {
                    val registerResponse = response.body()
                    Toast.makeText(this@RegisterActivity, "Inscription réussie", Toast.LENGTH_SHORT).show()
                    finish()
                } else {
                    Toast.makeText(this@RegisterActivity, "Échec de l'inscription", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<Void>, t: Throwable) {
                Toast.makeText(this@RegisterActivity, "Erreur : ${t.message}", Toast.LENGTH_SHORT).show()
                t.printStackTrace()
            }
        })
    }
}