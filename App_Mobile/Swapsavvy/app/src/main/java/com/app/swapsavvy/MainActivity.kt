package com.app.swapsavvy

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import com.app.swapsavvy.ui.theme.SwapsavvyTheme
import com.app.swapsavvy.login.LoginActivity
import com.app.swapsavvy.repositories.ApiRepository
import com.app.swapsavvy.services.ApiService
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class MainActivity : AppCompatActivity() {
    private lateinit var apiRepository: ApiRepository

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val retrofit = Retrofit.Builder()
            .baseUrl("http://10.0.2.2:3000/")
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        val apiService = retrofit.create(ApiService::class.java)
        apiRepository = ApiRepository(apiService)

        if (!checkIfLoggedIn()) {
            val intent = Intent(this, LoginActivity::class.java)
            startActivity(intent)
            finish()
        } else {
            setContent {
                SwapsavvyTheme {
                    Surface(
                        modifier = Modifier.fillMaxSize(),
                        color = MaterialTheme.colorScheme.background
                    ) {
                        Greeting("Android")
                    }
                }
            }
        }
    }

    private fun checkIfLoggedIn(): Boolean {
        val sharedPreferences = getSharedPreferences("MyAppPrefs", MODE_PRIVATE)
        return sharedPreferences.getBoolean("isLoggedIn", false)
    }
}

@Composable
fun Greeting(name: String) {
    // Contenu de la page d'accueil si l'utilisateur est connecté
    Text(text = "Hello, $name!")
}

@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    SwapsavvyTheme {
        Greeting("Android")
    }
}
