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
import com.app.swapsavvy.ui.adapter.OtherObjectAdapter
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class OtherObjectActivity : AppCompatActivity() {
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

        val btnObjectList: Button = findViewById(R.id.btnObjectList)
        btnObjectList.setOnClickListener {
            if (userId != "Invité") {
                fetcOtherrObjects(userId)
            } else {
                Toast.makeText(this, "ID utilisateur non disponible", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun fetcOtherrObjects(userId: String) {
        val call: Call<List<Objet>> = RetrofitClient.apiService.getOtherObjets(userId)

        call.enqueue(object : Callback<List<Objet>> {
            override fun onResponse(call: Call<List<Objet>>, response: Response<List<Objet>>) {
                if (response.isSuccessful) {
                    val objects: List<Objet> = response.body() ?: emptyList()
                    Log.d("MyObjectsActivity", "Objets others reçus: $objects")
                    adapter.updateData(objects)
                } else {
                    Toast.makeText(this@OtherObjectActivity, "Erreur lors du chargement des objets", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<List<Objet>>, t: Throwable) {
                Log.e("MyObjectsActivity", "Erreur de réseau : ${t.message}")
                Toast.makeText(this@OtherObjectActivity, "Échec de la connexion", Toast.LENGTH_SHORT).show()
            }
        })
    }

}
