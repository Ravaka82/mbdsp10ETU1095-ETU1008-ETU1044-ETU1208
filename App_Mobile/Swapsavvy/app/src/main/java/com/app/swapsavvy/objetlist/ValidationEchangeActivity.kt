package com.app.swapsavvy.objetlist

import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.app.swapsavvy.R
import com.app.swapsavvy.data.Echange
import com.app.swapsavvy.data.EchangeApiResponse
import com.app.swapsavvy.data.Objet
import com.app.swapsavvy.data.StatutRequest
import com.app.swapsavvy.services.RetrofitClient
import com.app.swapsavvy.ui.adapter.ValidationEchangeAdapter
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import com.google.gson.Gson
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

class ValidationEchangeActivity : AppCompatActivity() {

    private lateinit var recyclerView: RecyclerView
    private lateinit var adapter: ValidationEchangeAdapter
    private lateinit var echanges: MutableList<Echange>
    private lateinit var userId: String

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_validation_souhait)

        // Initialize RecyclerView and Adapter
        recyclerView = findViewById(R.id.recyclerViewValidationEchange)
        recyclerView.layoutManager = LinearLayoutManager(this)

        // Setup Adapter
        adapter = ValidationEchangeAdapter(emptyList())
        recyclerView.adapter = adapter

        echanges = mutableListOf()

        // Retrieve userId from SharedPreferences
        val sharedPreferences = getSharedPreferences("MyPrefs", MODE_PRIVATE)
        userId = sharedPreferences.getString("userId", "Invité") ?: "Invité"

        // Fetch and display the exchanges for the user
        fetchEchanges(userId)
    }

    private fun fetchEchanges(userId: String) {
        val call: Call<List<EchangeApiResponse>> = RetrofitClient.apiService.getEchangeEnAttente(userId)

        call.enqueue(object : Callback<List<EchangeApiResponse>> {
            override fun onResponse(call: Call<List<EchangeApiResponse>>, response: Response<List<EchangeApiResponse>>) {
                if (response.isSuccessful) {
                    val echangesResponse: List<EchangeApiResponse> = response.body() ?: emptyList()
                    val mappedEchanges = echangesResponse.mapNotNull { apiResponse ->
                        mapApiResponseToEchange(apiResponse)
                    }
                    Log.d("ValidationEchangeActivity", "Échanges reçus: $mappedEchanges")
                    adapter.updateData(mappedEchanges)
                } else {
                    // Fetch detailed error message
                    val errorMessage = response.errorBody()?.string() ?: "Erreur inconnue"
                    Log.e("ValidationEchangeActivity", "Erreur lors du chargement des échanges: $errorMessage")
                    Toast.makeText(this@ValidationEchangeActivity, "Erreur lors du chargement des échanges: $errorMessage", Toast.LENGTH_LONG).show()
                }
            }

            override fun onFailure(call: Call<List<EchangeApiResponse>>, t: Throwable) {
                Log.e("ValidationEchangeActivity", "Erreur de réseau : ${t.message}")
                Toast.makeText(this@ValidationEchangeActivity, "Échec de la connexion : ${t.message}", Toast.LENGTH_LONG).show()
            }
        })
    }

    private fun mapApiResponseToEchange(apiResponse: EchangeApiResponse): EchangeApiResponse? {
        return try {
            EchangeApiResponse(
                _id = apiResponse._id,
                utilisateur_proposant_id = apiResponse.utilisateur_proposant_id,
                utilisateur_acceptant_id = apiResponse.utilisateur_acceptant_id,
                objet_proposant = apiResponse.objet_proposant,
                objet_acceptant = apiResponse.objet_acceptant,
                date_proposition = apiResponse.date_proposition?.let { parseDate(it) }.toString(),
                date_acceptation = null, // Handle if you have this field
                statut = apiResponse.statut
            )
        } catch (e: Exception) {
            Log.e("ValidationEchangeActivity", "Erreur lors de la conversion des données : ${e.message}")
            null
        }
    }

    private fun parseDate(dateString: String): Date? {
        return try {
            val format = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.getDefault())
            format.parse(dateString)
        } catch (e: Exception) {
            Log.e("ValidationEchangeActivity", "Erreur lors du parsing de la date : ${e.message}")
            null
        }
    }

    fun handleSendExchange(
        echangeId: String,
        objetProposantId: String,
        utilisateurIdAcceptant: String,
        objetAcceptantId: String,
        utilisateurIdProposant: String
    ) {
        val gson = Gson()
        val statutRequest = StatutRequest(statut = "accepter")
        val gsonStatutRequest = gson.toJson(statutRequest)

        Log.d("ValidationEchangeActivity", "Updating exchange with echangeId: $echangeId, statut: ${statutRequest.statut}")
        Toast.makeText(this@ValidationEchangeActivity, "Échange ID: $echangeId", Toast.LENGTH_LONG).show()

        // Appel API pour mettre à jour le statut de l'échange
        val call: Call<Echange> = RetrofitClient.apiService.updateEchangeStatutEnValidatation(echangeId, statutRequest)

        call.enqueue(object : Callback<Echange> {
            override fun onResponse(call: Call<Echange>, response: Response<Echange>) {
                if (response.isSuccessful) {
                    Log.d("ValidationEchangeActivity", "Exchange status updated successfully for echangeId: $echangeId")

                    // Mise à jour du statut réussie, mise à jour des objets
                    val utilisateurUpdateRequestProposant = gson.toJson(mapOf("utilisateur_id" to utilisateurIdAcceptant))
                    Log.d("ValidationEchangeActivity", "Updating objet with objetProposantId: $objetProposantId, utilisateurIdAcceptant: $utilisateurIdAcceptant")

                    RetrofitClient.apiService.updateUtilisateurId(objetProposantId, utilisateurUpdateRequestProposant)
                        .enqueue(object : Callback<Objet> {
                            override fun onResponse(call: Call<Objet>, response: Response<Objet>) {
                                if (response.isSuccessful) {
                                    Log.d("ValidationEchangeActivity", "Objet updated successfully for objetProposantId: $objetProposantId")

                                    val utilisateurUpdateRequestAcceptant = gson.toJson(mapOf("utilisateur_id" to utilisateurIdProposant))
                                    Log.d("ValidationEchangeActivity", "Updating objet with objetAcceptantId: $objetAcceptantId, utilisateurIdProposant: $utilisateurIdProposant")

                                    RetrofitClient.apiService.updateUtilisateurId(objetAcceptantId, utilisateurUpdateRequestAcceptant)
                                        .enqueue(object : Callback<Objet> {
                                            override fun onResponse(call: Call<Objet>, response: Response<Objet>) {
                                                if (response.isSuccessful) {
                                                    Log.d("ValidationEchangeActivity", "Objet updated successfully for objetAcceptantId: $objetAcceptantId")
                                                    Toast.makeText(this@ValidationEchangeActivity, "Vous avez accepté et les objets ont été échangés.", Toast.LENGTH_SHORT).show()
                                                    fetchEchanges(userId) // Actualiser la liste après acceptation
                                                } else {
                                                    handleUpdateError(response)
                                                }
                                            }

                                            override fun onFailure(call: Call<Objet>, t: Throwable) {
                                                handleApiFailure(t)
                                            }
                                        })
                                } else {
                                    handleUpdateError(response)
                                }
                            }

                            override fun onFailure(call: Call<Objet>, t: Throwable) {
                                handleApiFailure(t)
                            }
                        })

                } else {
                    handleUpdateError(response)
                }
            }

            override fun onFailure(call: Call<Echange>, t: Throwable) {
                handleApiFailure(t)
            }
        })
    }

    private fun handleUpdateError(response: Response<*>) {
        val errorMessage = response.errorBody()?.string() ?: "Erreur inconnue"
        Log.e("ValidationEchangeActivity", "Erreur lors de la mise à jour : $errorMessage")
        Toast.makeText(this@ValidationEchangeActivity, "Erreur : $errorMessage", Toast.LENGTH_LONG).show()
    }

    private fun handleApiFailure(t: Throwable) {
        Log.e("ValidationEchangeActivity", "Échec de la connexion : ${t.message}", t)
        Toast.makeText(this@ValidationEchangeActivity, "Échec de la connexion : ${t.message}", Toast.LENGTH_LONG).show()
    }

    fun handleDeleteExchange(echangeId: String) {
        val statutRequest = StatutRequest(statut = "refuser")
        val gson = Gson()
        val gsonStatutRequest = gson.toJson(statutRequest)

        Log.d("ValidationEchangeActivity", "Updating exchange with echangeId: $echangeId, statut: ${statutRequest.statut}")
        Toast.makeText(this@ValidationEchangeActivity, "Échange ID: $echangeId", Toast.LENGTH_LONG).show()

        val call: Call<Echange> = RetrofitClient.apiService.updateEchangeStatutEnValidatation(echangeId, statutRequest)

        call.enqueue(object : Callback<Echange> {
            override fun onResponse(call: Call<Echange>, response: Response<Echange>) {
                if (response.isSuccessful) {
                    Log.d("ValidationEchangeActivity", "Exchange status updated successfully for echangeId: $echangeId")
                    Toast.makeText(this@ValidationEchangeActivity, "Vous avez refusé l'échange.", Toast.LENGTH_SHORT).show()
                    fetchEchanges(userId) // Actualiser la liste après refus
                } else {
                    handleUpdateError(response)
                }
            }

            override fun onFailure(call: Call<Echange>, t: Throwable) {
                handleApiFailure(t)
            }
        })
    }
}
