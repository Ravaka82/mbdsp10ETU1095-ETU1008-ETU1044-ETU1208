package com.app.swapsavvy.uicom.auth

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.app.swapsavvy.repositories.ApiRepository
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun LoginScreen(navController: NavController, apiRepository: ApiRepository) {
    var email by remember { mutableStateOf("") }
    var mot_de_passe by remember { mutableStateOf("") }
    var loginError by remember { mutableStateOf<String?>(null) }

    val coroutineScope = rememberCoroutineScope()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(text = "Connexion", style = MaterialTheme.typography.headlineSmall)

        Spacer(modifier = Modifier.height(16.dp))

        // Champ d'Email
        OutlinedTextField(
            value = email,
            onValueChange = { email = it },
            label = { Text("Email") },
            modifier = Modifier.fillMaxWidth()
        )

        // Champ de Mot de Passe
        OutlinedTextField(
            value = mot_de_passe,
            onValueChange = { mot_de_passe = it },
            label = { Text("Mot de passe") },
            modifier = Modifier.fillMaxWidth(),
            visualTransformation = PasswordVisualTransformation()
        )

        Spacer(modifier = Modifier.height(16.dp))

        // Afficher l'erreur de connexion si elle existe
        loginError?.let {
            Text(text = it, color = MaterialTheme.colorScheme.error)
            Spacer(modifier = Modifier.height(16.dp))
        }

        // Bouton de Connexion
        Button(
            onClick = {
                coroutineScope.launch {
                    try {
                        val response = apiRepository.login(email, mot_de_passe)
                        if (response.isSuccessful) {
                            // Naviguer vers l'écran d'accueil après une connexion réussie
                            navController.navigate("home")
                        } else {
                            loginError = "Connexion échouée. Vérifiez vos informations."
                        }
                    } catch (e: Exception) {
                        loginError = "Erreur de connexion : ${e.message}"
                    }
                }
            },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Se connecter")
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Lien vers l'écran d'Inscription
        TextButton(onClick = { navController.navigate("signup") }) {
            Text("S'inscrire")
        }
    }
}