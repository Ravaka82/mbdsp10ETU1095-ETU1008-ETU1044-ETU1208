package com.app.swapsavvy.objetlist

import android.content.Intent
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.animation.AnimationUtils
import android.widget.Button
import android.widget.TextView
import retrofit2.Call
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.app.swapsavvy.R
import com.app.swapsavvy.data.Objet
import retrofit2.Callback
import retrofit2.Response
import com.app.swapsavvy.services.RetrofitClient
import com.app.swapsavvy.ui.adapter.ObjectAdapter

class ObjetListActivity : AppCompatActivity() {
    private lateinit var recyclerView: RecyclerView
    private lateinit var adapter: ObjectAdapter
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_objet_list)
        val welcomeTextView: TextView = findViewById(R.id.welcomeTextView)

        val titleTextView: TextView = findViewById(R.id.titleTextView)
        val animation = AnimationUtils.loadAnimation(this, R.anim.text_animation)
        titleTextView.startAnimation(animation)

        recyclerView = findViewById(R.id.recyclerView)
        recyclerView.layoutManager = LinearLayoutManager(this)

        adapter = ObjectAdapter(emptyList())
        recyclerView.adapter = adapter


        val sharedPreferences = getSharedPreferences("MyPrefs", MODE_PRIVATE)
        val userPrenom = sharedPreferences.getString("userPrenom", "Invité") ?: "Invité"

        welcomeTextView.text = "Bienvenue $userPrenom"


        fetchObjectsFromApi()

        val btnMyObjects: Button = findViewById(R.id.btnMyObjects)
        val btnCreateObject: Button = findViewById(R.id.btnCreateObject)
        val btnObjectList: Button = findViewById(R.id.btnObjectList)
        val btnObjectEchange: Button = findViewById(R.id.btnObjectEchange)
        val btnListEchangeSouhait: Button = findViewById(R.id.btnListEchangeSouhait)
        val btnListEchangePropose: Button = findViewById(R.id.btnListEchangePropose)
        val btnHistoriqueEchange: Button = findViewById(R.id.btnHistoriqueEchange)

        btnMyObjects.setOnClickListener {
            Toast.makeText(this, "Mes Objets clicked", Toast.LENGTH_SHORT).show()
            val intent = Intent(this, MyObjectsActivity::class.java)
            startActivity(intent)
        }

        btnCreateObject.setOnClickListener {
            Toast.makeText(this, "Créer Objet clicked", Toast.LENGTH_SHORT).show()
        }

        btnObjectList.setOnClickListener {
            Toast.makeText(this, "Liste Objets clicked", Toast.LENGTH_SHORT).show()
        }

        btnObjectEchange.setOnClickListener {
            Toast.makeText(this, "Echanger Objet clicked", Toast.LENGTH_SHORT).show()
        }

        btnListEchangeSouhait.setOnClickListener {
            Toast.makeText(this, "Liste échanges Objets souhaités clicked", Toast.LENGTH_SHORT).show()
        }

        btnListEchangePropose.setOnClickListener {
            Toast.makeText(this, "Liste échanges Objets proposés clicked", Toast.LENGTH_SHORT).show()
        }

        btnHistoriqueEchange.setOnClickListener {
            Toast.makeText(this, "Historique échanges Objets clicked", Toast.LENGTH_SHORT).show()
        }

    }

    private fun fetchObjectsFromApi() {
        val call: Call<List<Objet>> = RetrofitClient.apiService.getObjets()

        call.enqueue(object : Callback<List<Objet>> {
            override fun onResponse(call: Call<List<Objet>>, response: Response<List<Objet>>) {
                if (response.isSuccessful) {
                    val objects: List<Objet> = response.body() ?: emptyList()
                    Log.d("ObjetListActivity", "Objets reçus: $objects")
                    adapter.updateData(objects)
                } else {
                    Toast.makeText(this@ObjetListActivity, "Erreur lors du chargement des objets", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<List<Objet>>, t: Throwable) {
                Log.e("ObjectListActivity", "Erreur de réseau : ${t.message}")
                Toast.makeText(this@ObjetListActivity, "Échec de la connexion", Toast.LENGTH_SHORT).show()
            }
        })
    }
}