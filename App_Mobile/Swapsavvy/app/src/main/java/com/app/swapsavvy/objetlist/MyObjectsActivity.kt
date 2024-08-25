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
import com.app.swapsavvy.services.RetrofitClient
import com.app.swapsavvy.ui.adapter.MyObjectsAdapter
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class MyObjectsActivity : AppCompatActivity() {
    private lateinit var recyclerView: RecyclerView
    private lateinit var adapter: MyObjectsAdapter
    private lateinit var objetsUser: MutableList<Objet>
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

        // Obtain userId from SharedPreferences
        val sharedPreferences = getSharedPreferences("MyPrefs", MODE_PRIVATE)
        userId = sharedPreferences.getString("userId", "Invité") ?: "Invité"

        val btnMyObjects: Button = findViewById(R.id.btnMyObjects)
        btnMyObjects.setOnClickListener {
            if (userId != "Invité") {
                fetchUserObjects(userId)
            } else {
                Toast.makeText(this, "ID utilisateur non disponible", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun fetchUserObjects(userId: String) {
        val call: Call<List<Objet>> = RetrofitClient.apiService.getObjetsByUtilisateurConnected(userId)

        call.enqueue(object : Callback<List<Objet>> {
            override fun onResponse(call: Call<List<Objet>>, response: Response<List<Objet>>) {
                if (response.isSuccessful) {
                    val objects: List<Objet> = response.body() ?: emptyList()
                    Log.d("MyObjectsActivity", "Objets reçus: $objects")
                    adapter.updateData(objects)
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
