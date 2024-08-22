package com.app.swapsavvy

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import com.app.swapsavvy.ui.theme.SwapsavvyTheme

import androidx.appcompat.app.AppCompatActivity
import androidx.compose.foundation.layout.Column
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import com.app.swapsavvy.data.Objet
import com.app.swapsavvy.data.Utilisateur
import com.app.swapsavvy.repositories.ApiRepository
import com.app.swapsavvy.services.ApiService
import retrofit2.Call
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class MainActivity : AppCompatActivity() {
    private lateinit var apiRepository: ApiRepository
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Initialiser Retrofit
        val retrofit = Retrofit.Builder()
            .baseUrl("http://localhost:3000/api/") // URL de base de l'API
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        // Créer une instance d'ApiServices
        val apiService = retrofit.create(ApiService::class.java)

        // Initialiser ApiRepository avec ApiServices
        apiRepository = ApiRepository(apiService)

        setContent {
            SwapsavvyTheme {
                // A surface container using the 'background' color from the theme
                Surface(modifier = Modifier.fillMaxSize(), color = MaterialTheme.colorScheme.background) {
                    Greeting("Android", apiRepository)
                }
            }
        }
    }
}


@Composable
fun Greeting(name: String, apiRepository: ApiRepository, modifier: Modifier = Modifier) {
    /*val response = apiRepository.getObjets().execute()
    if (response.isSuccessful) {
        val objets = response.body()

    } else {

    }
    Text(
            text = "Hello $name!",
            modifier = modifier
    )*/
    // Effectuer l'appel API en arrière-plan
    var objets by remember {
        mutableStateOf<List<Objet>?>(null)
    }
    var error by remember {
        mutableStateOf<String?>(null)
    }

    LaunchedEffect(Unit) {
        try {
            val response = apiRepository.getObjets().execute()
            if (response.isSuccessful) {
                objets = response.body()
            } else {
                error = "Failed to load objects: ${response.message()}"
            }
        } catch (e: Exception) {
            error = "Exception: ${e.message}"
        }
    }

    // Interface utilisateur
    if (objets != null) {
        Column(modifier = modifier) {
            Text(text = "Hello $name!")
            objets?.forEach { objet ->
                Text(text = "Objet: ${objet.titre}")
            }
        }
    } else if (error != null) {
        Text(text = error!!, color = MaterialTheme.colorScheme.error)
    } else {
        Text(text = "Loading...")
    }

}
