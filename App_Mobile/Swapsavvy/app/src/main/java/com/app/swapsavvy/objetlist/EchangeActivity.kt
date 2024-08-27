
package com.app.swapsavvy.objetlist

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.Spinner
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.app.swapsavvy.R
import com.app.swapsavvy.data.Echange
import com.app.swapsavvy.data.Objet
import com.app.swapsavvy.objetlist.CreateObjectActivity
import com.app.swapsavvy.services.RetrofitClient
import com.app.swapsavvy.ui.adapter.EchangeSpinnerAdapter
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class EchangeActivity : AppCompatActivity() {
    private lateinit var spinnerObject1: Spinner
    private lateinit var spinnerObject2: Spinner
    private lateinit var userId: String

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_echange)

        // Initialisation des vues
        spinnerObject1 = findViewById(R.id.spinnerObject1)
        spinnerObject2 = findViewById(R.id.spinnerObject2)

        // Configuration du bouton pour soumettre l'échange
        val btnSouhaiter: Button = findViewById(R.id.btnSouhaiter)
        btnSouhaiter.setOnClickListener {
            val selectedObject1 = spinnerObject1.selectedItem as? Objet
            val selectedObject2 = spinnerObject2.selectedItem as? Objet
            if (selectedObject1 != null && selectedObject2 != null) {
                // Logic to handle exchange request
                createEchange(selectedObject1, selectedObject2)
            } else {
                Toast.makeText(this, "Veuillez sélectionner deux objets", Toast.LENGTH_SHORT).show()
            }
        }

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
            val intent = Intent(this, CreateObjectActivity::class.java)
            startActivity(intent)
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


        // Charger les objets pour les spinners
        if (userId != "Invité") {
            fetchAvailableObjects(userId)
        } else {
            Toast.makeText(this, "ID utilisateur non disponible", Toast.LENGTH_SHORT).show()
        }
    }

    private fun fetchAvailableObjects(userId: String) {
        val call1: Call<List<Objet>> = RetrofitClient.apiService.getObjetsByUtilisateurConnected(userId)
        val call2: Call<List<Objet>> = RetrofitClient.apiService.getOtherObjets(userId)

        // Charger les objets disponibles pour le premier Spinner
        call1.enqueue(object : Callback<List<Objet>> {
            override fun onResponse(call: Call<List<Objet>>, response: Response<List<Objet>>) {
                if (response.isSuccessful) {
                    val objets: List<Objet> = response.body() ?: emptyList()
                    Log.d("EchangeActivity", "Objets pour le premier Spinner: $objets")
                    setupSpinner1(objets)
                } else {
                    Toast.makeText(this@EchangeActivity, "Erreur lors du chargement des objets", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<List<Objet>>, t: Throwable) {
                Toast.makeText(this@EchangeActivity, "Échec de la connexion", Toast.LENGTH_SHORT).show()
            }
        })

        // Appel pour récupérer les objets spécifiques à l'utilisateur connecté
        call2.enqueue(object : Callback<List<Objet>> {
            override fun onResponse(call: Call<List<Objet>>, response: Response<List<Objet>>) {
                if (response.isSuccessful) {
                    val objets: List<Objet> = response.body() ?: emptyList()
                    Log.d("EchangeActivity", "Objets pour le deuxième Spinner: $objets")
                    setupSpinner2(objets)
                } else {
                    Toast.makeText(this@EchangeActivity, "Erreur lors du chargement des objets de l'utilisateur", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<List<Objet>>, t: Throwable) {
                Toast.makeText(this@EchangeActivity, "Échec de la connexion pour les objets de l'utilisateur", Toast.LENGTH_SHORT).show()
            }
        })
    }


    private fun setupSpinner1(objets: List<Objet>) {
        val adapter = EchangeSpinnerAdapter(this, objets)
        spinnerObject1.adapter = adapter
    }

    private fun setupSpinner2(objets: List<Objet>) {
        val adapter = EchangeSpinnerAdapter(this, objets)
        spinnerObject2.adapter = adapter
    }

    private fun createEchange(selectedObject1: Objet, selectedObject2: Objet) {
        Log.d("EchangeActivity", "ID Utilisateur Proposant: ${selectedObject1.utilisateur_id}")
        Log.d("EchangeActivity", "ID Utilisateur Acceptant: ${selectedObject2.utilisateur_id}")
        Log.d("EchangeActivity", "Objet Proposant: $selectedObject1")
        Log.d("EchangeActivity", "Objet Acceptant: $selectedObject2")

        val echange = Echange(
            utilisateur_proposant_id = selectedObject1.utilisateur_id._id,
            utilisateur_acceptant_id = selectedObject2.utilisateur_id._id,
            objet_proposant = selectedObject1._id,
            objet_acceptant = selectedObject2._id,
            date_proposition = null,
            date_acceptation = null,
            statut = "en cours"
        )

        val call: Call<Echange> = RetrofitClient.apiService.createEchange(echange)
        call.enqueue(object : Callback<Echange> {
            override fun onResponse(call: Call<Echange>, response: Response<Echange>) {
                if (response.isSuccessful) {
                    Toast.makeText(this@EchangeActivity, "Souhait envoyé!", Toast.LENGTH_SHORT).show()
                } else {
                    Toast.makeText(this@EchangeActivity, "Erreur lors de l'envoi du souhait", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<Echange>, t: Throwable) {
                Log.e("EchangeActivity", "Échec de la connexion: ${t.message}", t)
                Toast.makeText(this@EchangeActivity, "Échec de la connexion", Toast.LENGTH_SHORT).show()
            }
        })
    }

}
