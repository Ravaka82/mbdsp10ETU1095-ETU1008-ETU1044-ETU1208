package com.app.swapsavvy.objetlist

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.app.swapsavvy.R
import com.app.swapsavvy.data.Echange
import com.app.swapsavvy.data.EchangeApiResponse
import com.app.swapsavvy.data.StatutRequest
import com.app.swapsavvy.services.RetrofitClient
import com.app.swapsavvy.ui.adapter.SouhaiteEchangeAdapter
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

class SouhaiteEchangeActivity : AppCompatActivity() {

    private lateinit var recyclerView: RecyclerView
    private lateinit var adapter: SouhaiteEchangeAdapter
    private lateinit var echanges: MutableList<Echange>
    private lateinit var userId: String

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_souhaite_echange)

        // Initialize RecyclerView and Adapter
        recyclerView = findViewById(R.id.recyclerViewSouhait)
        recyclerView.layoutManager = LinearLayoutManager(this)

        // Setup Adapter
        adapter = SouhaiteEchangeAdapter(emptyList())
        recyclerView.adapter = adapter

        echanges = mutableListOf()

        val sharedPreferences = getSharedPreferences("MyPrefs", MODE_PRIVATE)
        userId = sharedPreferences.getString("userId", "Invité") ?: "Invité"

        val btnCreateObject: Button = findViewById(R.id.btnCreateObject)
        val btnObjectList: Button = findViewById(R.id.btnObjectList)
        val btnObjectEchange: Button = findViewById(R.id.btnObjectEchange)
        val btnListEchangeSouhait: Button = findViewById(R.id.btnListEchangeSouhait)
        val btnListEchangePropose: Button = findViewById(R.id.btnListEchangePropose)
        val btnHistoriqueEchange: Button = findViewById(R.id.btnHistoriqueEchange)



        btnCreateObject.setOnClickListener {
            Toast.makeText(this, "Créer Objet clicked", Toast.LENGTH_SHORT).show()
        }

        btnObjectList.setOnClickListener {
            Toast.makeText(this, "Mes Objets clicked", Toast.LENGTH_SHORT).show()
            val intent = Intent(this, OtherObjectActivity::class.java)
            startActivity(intent)
        }

        btnObjectEchange.setOnClickListener {
            Toast.makeText(this, "Echanger Objet clicked", Toast.LENGTH_SHORT).show()
            val intent = Intent(this, EchangeActivity::class.java)
            startActivity(intent)
        }

        btnListEchangeSouhait.setOnClickListener {
            Toast.makeText(this, "Liste échanges Objets souhaités clicked", Toast.LENGTH_SHORT).show()
            val intent = Intent(this, SouhaiteEchangeActivity::class.java)
            startActivity(intent)
        }

        btnListEchangePropose.setOnClickListener {
            Toast.makeText(this, "Liste échanges Objets proposés clicked", Toast.LENGTH_SHORT).show()
            val intent = Intent(this, ValidationEchangeActivity::class.java)
            startActivity(intent)
        }

        btnHistoriqueEchange.setOnClickListener {
            Toast.makeText(this, "Historique échanges Objets clicked", Toast.LENGTH_SHORT).show()
            val intent = Intent(this, HistoriqueEchangeActivity::class.java)
            startActivity(intent)
        }



        // Fetch and display the exchanges for the user
        fetchEchanges(userId)
    }

    private fun fetchEchanges(userId: String) {
        val call: Call<List<EchangeApiResponse>> = RetrofitClient.apiService.getEchangesByUtilisateur(userId)

        call.enqueue(object : Callback<List<EchangeApiResponse>> {
            override fun onResponse(call: Call<List<EchangeApiResponse>>, response: Response<List<EchangeApiResponse>>) {
                if (response.isSuccessful) {
                    val echangesResponse: List<EchangeApiResponse> = response.body() ?: emptyList()
                    val mappedEchanges = echangesResponse.mapNotNull { apiResponse ->
                        apiResponse.let { mapApiResponseToEchange(it) }
                    }
                    Log.d("SouhaiteEchangeActivity", "Échanges reçus: $mappedEchanges")
                    adapter.updateData(mappedEchanges)
                } else {
                    // Fetch detailed error message
                    val errorMessage = response.errorBody()?.string() ?: "Erreur inconnue"
                    Log.e("SouhaiteEchangeActivity", "Erreur lors du chargement des échanges: $errorMessage")
                    Toast.makeText(this@SouhaiteEchangeActivity, "Erreur lors du chargement des échanges: $errorMessage", Toast.LENGTH_LONG).show()
                }
            }

            override fun onFailure(call: Call<List<EchangeApiResponse>>, t: Throwable) {
                Log.e("SouhaiteEchangeActivity", "Erreur de réseau : ${t.message}")
                Toast.makeText(this@SouhaiteEchangeActivity, "Échec de la connexion : ${t.message}", Toast.LENGTH_LONG).show()
            }
        })
    }

    private fun mapApiResponseToEchange(apiResponse: EchangeApiResponse): EchangeApiResponse? {
        return try {
            EchangeApiResponse(
                _id=apiResponse._id,
                utilisateur_proposant_id = apiResponse.utilisateur_proposant_id,
                utilisateur_acceptant_id = apiResponse.utilisateur_acceptant_id,
                objet_proposant = apiResponse.objet_proposant,
                objet_acceptant = apiResponse.objet_acceptant,
                date_proposition = apiResponse.date_proposition?.let { parseDate(it) }.toString(),
                date_acceptation = null, // Handle if you have this field
                statut = apiResponse.statut
            )
        } catch (e: Exception) {
            Log.e("SouhaiteEchangeActivity", "Erreur lors de la conversion des données : ${e.message}")
            null
        }
    }

    private fun parseDate(dateString: String): Date? {
        return try {
            val format = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.getDefault())
            format.parse(dateString)
        } catch (e: Exception) {
            Log.e("SouhaiteEchangeActivity", "Erreur lors du parsing de la date : ${e.message}")
            null
        }
    }

    fun handleSendExchange(echangeId: String) {

        val statutRequest = StatutRequest(statut = "en attente")


        Toast.makeText(this@SouhaiteEchangeActivity, "Échange ID: $echangeId", Toast.LENGTH_LONG).show()
        Toast.makeText(this@SouhaiteEchangeActivity, "Statut: ${statutRequest.statut}", Toast.LENGTH_LONG).show()

        // Appel API pour mettre à jour le statut de l'échange
        val call: Call<Echange> = RetrofitClient.apiService.updateEchangeStatut(echangeId, statutRequest)

        call.enqueue(object : Callback<Echange> {
            override fun onResponse(call: Call<Echange>, response: Response<Echange>) {
                    Toast.makeText(this@SouhaiteEchangeActivity, "Échange envoyé avec succès", Toast.LENGTH_SHORT).show()
                    fetchEchanges(userId)
            }
            override fun onFailure(call: Call<Echange>, t: Throwable) {
                Log.e("SouhaiteEchangeActivity", "Échec de la connexion : ${t.message}", t)
                Toast.makeText(this@SouhaiteEchangeActivity, "Échec de la connexion : ${t.message}", Toast.LENGTH_LONG).show()
            }
        })
    }

    fun handleDeleteExchange(echangeId: String) {
        // Implement the logic to delete the exchange
        val call: Call<Void> = RetrofitClient.apiService.deleteEchange(echangeId)

        call.enqueue(object : Callback<Void> {
            override fun onResponse(call: Call<Void>, response: Response<Void>) {
                if (response.isSuccessful) {
                    Toast.makeText(this@SouhaiteEchangeActivity, "Échange supprimé avec succès", Toast.LENGTH_SHORT).show()
                    fetchEchanges(userId) // Refresh the list
                } else {
                    val errorMessage = response.errorBody()?.string() ?: "Erreur inconnue"
                    Toast.makeText(this@SouhaiteEchangeActivity, "Erreur lors de la suppression de l'échange: $errorMessage", Toast.LENGTH_LONG).show()
                }
            }

            override fun onFailure(call: Call<Void>, t: Throwable) {
                Toast.makeText(this@SouhaiteEchangeActivity, "Échec de la connexion : ${t.message}", Toast.LENGTH_LONG).show()
            }
        })
    }
}
