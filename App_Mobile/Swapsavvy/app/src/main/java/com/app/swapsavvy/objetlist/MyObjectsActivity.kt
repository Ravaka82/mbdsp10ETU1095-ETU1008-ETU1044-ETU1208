package com.app.swapsavvy.objetlist

import android.annotation.SuppressLint
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.Toast
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.app.swapsavvy.R
import com.app.swapsavvy.data.Objet
import com.app.swapsavvy.data.Utilisateur
import com.app.swapsavvy.services.RetrofitClient
import com.app.swapsavvy.ui.adapter.MyObjectsAdapter
import com.app.swapsavvy.ui.adapter.ObjectAdapter
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class MyObjectsActivity : AppCompatActivity() {
    private lateinit var recyclerView: RecyclerView
    private lateinit var adapter: MyObjectsAdapter
    private lateinit var objetsUser: MutableList<Objet>
    private lateinit var objetsAll: MutableList<Objet>
    private lateinit var userId: String
    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_my_objects)

        recyclerView = findViewById(R.id.recyclerViewMyObjects)
        recyclerView.layoutManager = LinearLayoutManager(this)

        adapter = MyObjectsAdapter(emptyList())
        recyclerView.adapter = adapter

        objetsUser = mutableListOf()
        objetsAll = mutableListOf()

        userId = UtilisateurUtils.getUserId(this) ?: ""

        val btnMyObjects: Button = findViewById(R.id.btnMyObjects)
        btnMyObjects.setOnClickListener {
            //fetchUserObjects()
            val userId = intent.getStringExtra("USER_ID") ?: ""
            if (userId.isNotEmpty()) {
                fetchUserObjects(userId)
            } else {
                Toast.makeText(this, "ID utilisateur non disponible", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun fetchUserObjects(userId: String) {
        val call: Call<List<Objet>> = RetrofitClient.apiService.getObjets()

        call.enqueue(object : Callback<List<Objet>> {
            override fun onResponse(call: Call<List<Objet>>, response: Response<List<Objet>>) {
                if (response.isSuccessful) {
                    val objets: List<Objet> = response.body() ?: emptyList()
                    Log.d("MyObjectsActivity", "Objets reçus: $objets")

                    // Affiche les objets de l'utilisateur connecté
                    adapter.updateData(objets)

                    objetsUser.clear()
                    objetsAll.clear()

                    for (objet in objets) {
                        if (objet.utilisateur_id.prenom == userId) {
                            objetsUser.add(objet)
                        } else {
                            objetsAll.add(objet)
                        }
                    }

                    // Affiche les objets de l'utilisateur connecté
                    adapter.updateData(objetsUser)

                    Log.d("MyObjectsActivity", "Objets de l'utilisateur: $objetsUser")
                    Log.d("MyObjectsActivity", "Objets de tous les utilisateurs: $objetsAll")
                } else {
                    Toast.makeText(this@MyObjectsActivity, "Erreur lors du chargement des objets", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<List<Objet>>, t: Throwable) {
                Log.e("MyObjectsActivity", "Erreur de réseau : ${t.message}")
                Toast.makeText(this@MyObjectsActivity, "Échec de la connexion", Toast.LENGTH_SHORT).show()
            }
        })
    }
}