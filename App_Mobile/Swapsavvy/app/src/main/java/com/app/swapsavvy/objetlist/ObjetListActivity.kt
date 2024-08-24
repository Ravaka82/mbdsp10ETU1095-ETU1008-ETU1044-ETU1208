package com.app.swapsavvy.objetlist

import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
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

        recyclerView = findViewById(R.id.recyclerView)
        recyclerView.layoutManager = LinearLayoutManager(this)

        adapter = ObjectAdapter(emptyList())
        recyclerView.adapter = adapter

        fetchObjectsFromApi()

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