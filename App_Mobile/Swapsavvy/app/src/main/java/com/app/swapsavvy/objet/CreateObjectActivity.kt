package com.app.swapsavvy.objet

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.provider.MediaStore
import android.util.Log
import android.view.animation.AnimationUtils
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.EditText
import android.widget.ImageView
import android.widget.Spinner
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.app.swapsavvy.R
import com.app.swapsavvy.data.Categorie
import com.app.swapsavvy.data.Utilisateur
import com.app.swapsavvy.services.ApiService
import com.app.swapsavvy.services.RetrofitClient.apiService
import okhttp3.MediaType
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.MultipartBody
import okhttp3.RequestBody
import okhttp3.RequestBody.Companion.asRequestBody
import okio.IOException
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.io.File

class CreateObjectActivity : AppCompatActivity() {

    private val PICK_IMAGE_REQUEST = 1
    private var imageUri: Uri? = null
    private lateinit var imageView: ImageView
    private lateinit var titleEditText: EditText
    private lateinit var descriptionEditText: EditText
    private lateinit var valueEditText: EditText
    private lateinit var categorySpinner: Spinner
    private lateinit var statusSpinner: Spinner
    private lateinit var conditionSpinner: Spinner
    private lateinit var userToken: String
    private lateinit var userId: String
    private lateinit var userLabel: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_create_object)

        val titleTextView: TextView = findViewById(R.id.titleTextView)
        val animation = AnimationUtils.loadAnimation(this, R.anim.text_animation)
        titleTextView.startAnimation(animation)

        titleEditText = findViewById(R.id.titleEditText)
        descriptionEditText = findViewById(R.id.descriptionEditText)
        valueEditText = findViewById(R.id.valueEditText)
        categorySpinner = findViewById(R.id.categorySpinner)
        statusSpinner = findViewById(R.id.statusSpinner)
        conditionSpinner = findViewById(R.id.conditionSpinner)
        imageView = findViewById(R.id.imageView)

        val selectImageButton: Button = findViewById(R.id.selectImageButton)
        val submitButton: Button = findViewById(R.id.submitButton)

        userLabel = findViewById(R.id.userLabel)

        // Récupérer les informations passées via l'Intent
        val intent = intent
        userId = intent.getStringExtra("USER_ID") ?: ""
        userToken = intent.getStringExtra("USER_TOKEN") ?: ""




        val retrofit = Retrofit.Builder()
            .baseUrl("https://mbdsp10etu1095-etu1008-etu1044-etu1208.onrender.com/")
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        val apiService = retrofit.create(ApiService::class.java)

        // Appel de l'API pour obtenir l'utilisateur connecté
        getUserConnected()

        loadCategories()

        selectImageButton.setOnClickListener {
            openImageChooser()
        }

        submitButton.setOnClickListener {
            submitObject()
        }
    }

    private fun getUserConnected() {
        val call = apiService.getUserConnected()
        call.enqueue(object : Callback<Utilisateur> {
            override fun onResponse(call: Call<Utilisateur>, response: retrofit2.Response<Utilisateur>) {
                Log.d("API_CALL", "Response received with status code: ${response.code()}")
                if (response.isSuccessful) {
                    val utilisateur = response.body()
                    val userName = utilisateur?.prenom ?: "Utilisateur inconnu"
                    userLabel.text = "Utilisateur: $userName"
                } else {
                    val errorBody = response.errorBody()?.string()
                    Log.e("API_ERROR", "Code: ${response.code()}, Error: $errorBody")
                    Toast.makeText(this@CreateObjectActivity, "Erreur lors de la récupération des informations", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<Utilisateur>, t: Throwable) {
                Log.e("API_ERROR", "Failed to connect to API", t)
                Toast.makeText(this@CreateObjectActivity, "Échec de la connexion", Toast.LENGTH_SHORT).show()
            }
        })
    }
    private fun loadCategories() {
        val retrofit = Retrofit.Builder()
            .baseUrl("https://mbdsp10etu1095-etu1008-etu1044-etu1208.onrender.com/")
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        val apiService = retrofit.create(ApiService::class.java)
        val call = apiService.getAllCategories()

        call.enqueue(object : Callback<List<Categorie>> {
            override fun onResponse(call: Call<List<Categorie>>, response: retrofit2.Response<List<Categorie>>) {
                if (response.isSuccessful && response.body() != null) {
                    val categories = response.body()!!
                    val adapter = ArrayAdapter(this@CreateObjectActivity,
                        android.R.layout.simple_spinner_item, categories)
                    adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
                    categorySpinner.adapter = adapter
                }
            }

            override fun onFailure(call: Call<List<Categorie>>, t: Throwable) {
                Toast.makeText(this@CreateObjectActivity, "Failed to load categories", Toast.LENGTH_SHORT).show()
            }
        })
    }

    private fun openImageChooser() {
        val intent = Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI)
        startActivityForResult(intent, PICK_IMAGE_REQUEST)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == PICK_IMAGE_REQUEST && resultCode == RESULT_OK && data != null && data.data != null) {
            imageUri = data.data
            try {
                val bitmap = MediaStore.Images.Media.getBitmap(contentResolver, imageUri)
                imageView.setImageBitmap(bitmap)
            } catch (e: IOException) {
                e.printStackTrace()
            }
        }
    }

    private fun submitObject() {
        val retrofit = Retrofit.Builder()
            .baseUrl("https://mbdsp10etu1095-etu1008-etu1044-etu1208.onrender.com/")
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        val apiService = retrofit.create(ApiService::class.java)

        val builder = MultipartBody.Builder()
            .setType(MultipartBody.FORM)
            .addFormDataPart("utilisateur_id", userId)
            .addFormDataPart("categorie_id", categorySpinner.selectedItem.toString())
            .addFormDataPart("titre", titleEditText.text.toString())
            .addFormDataPart("description", descriptionEditText.text.toString())
            .addFormDataPart("statut", statusSpinner.selectedItem.toString())
            .addFormDataPart("etat", conditionSpinner.selectedItem.toString())

        val valeurEstimeeString = valueEditText.text.toString()
        val valeurEstimee = valeurEstimeeString.toIntOrNull() ?: 0
        builder.addFormDataPart("valeur_estimee", valeurEstimee.toString())

        if (imageUri != null) {
            try {
                val file = File(getRealPathFromURI(imageUri!!))
                val mimeType = contentResolver.getType(imageUri!!)
                val mediaType = mimeType?.toMediaType() ?: "image/png".toMediaType()
                val fileBody = file.asRequestBody(mediaType)
                builder.addFormDataPart("image", file.name, fileBody)
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }

        val requestBody = builder.build()
        val call = apiService.createObjet("Bearer $userToken", requestBody)

        call.enqueue(object : Callback<Void> {
            override fun onResponse(call: Call<Void>, response: retrofit2.Response<Void>) {
                if (response.isSuccessful) {
                    Toast.makeText(this@CreateObjectActivity, "Objet créé avec succès !", Toast.LENGTH_SHORT).show()
                    finish()
                } else {
                    Toast.makeText(this@CreateObjectActivity, "Erreur lors de la création de l'objet.", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<Void>, t: Throwable) {
                Toast.makeText(this@CreateObjectActivity, "Échec de la connexion.", Toast.LENGTH_SHORT).show()
            }
        })
    }

    private fun getRealPathFromURI(uri: Uri): String {
        val cursor = contentResolver.query(uri, arrayOf(MediaStore.Images.Media.DATA), null, null, null)
        cursor?.moveToFirst()
        val columnIndex = cursor?.getColumnIndexOrThrow(MediaStore.Images.Media.DATA)
        val filePath = cursor?.getString(columnIndex ?: 0)
        cursor?.close()
        return filePath ?: uri.path ?: ""
    }

}