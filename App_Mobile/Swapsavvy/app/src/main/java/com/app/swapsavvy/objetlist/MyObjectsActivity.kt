package com.app.swapsavvy.objetlist

import android.annotation.SuppressLint
import android.content.Intent
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


        recyclerView = findViewById(R.id.recyclerViewMyObjects)
        recyclerView.layoutManager = LinearLayoutManager(this)

        adapter = MyObjectsAdapter(emptyList())
        recyclerView.adapter = adapter

        objetsUser = mutableListOf()

        // Obtain userId from SharedPreferences


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
