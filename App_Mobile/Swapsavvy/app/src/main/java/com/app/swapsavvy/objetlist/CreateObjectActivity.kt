package com.app.swapsavvy.objetlist

import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
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
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import android.Manifest
import com.app.swapsavvy.R
import com.app.swapsavvy.data.Categorie
import com.app.swapsavvy.login.LoginActivity
import com.app.swapsavvy.services.ApiService
import com.app.swapsavvy.services.AuthService
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.MultipartBody
import okhttp3.OkHttpClient
import okhttp3.RequestBody
import okhttp3.RequestBody.Companion.asRequestBody
import okhttp3.RequestBody.Companion.toRequestBody
import okhttp3.logging.HttpLoggingInterceptor
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
    private lateinit var userLabel: TextView

    companion object {
        private const val STORAGE_PERMISSION_CODE = 1
    }
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_create_object)

        // Vérifier et demander l'autorisation si nécessaire
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            // Pour Android 13 et supérieur
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.READ_MEDIA_IMAGES) != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.READ_MEDIA_IMAGES), STORAGE_PERMISSION_CODE)
            }
        } else {
            // Pour Android 12 et inférieur
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.READ_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.READ_EXTERNAL_STORAGE), STORAGE_PERMISSION_CODE)
            }
        }

        val logoutButton: Button = findViewById(R.id.btnLogout)
        logoutButton.setOnClickListener {
            logout()
        }

        val welcomeTextView: TextView = findViewById(R.id.welcomeTextView)

        val sharedPreferences = getSharedPreferences("MyPrefs", MODE_PRIVATE)
        val userPrenom = sharedPreferences.getString("userPrenom", "Utilisateur")

        welcomeTextView.text = "Bienvenue, $userPrenom !"

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

        val statusOptions = arrayOf("disponible","réservé","échangé")
        val conditionOptions = arrayOf("neuf","comme neuf","utilisé","endommagé")

        val statusAdapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, statusOptions)
        statusAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        statusSpinner.adapter = statusAdapter

        val conditionAdapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, conditionOptions)
        conditionAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        conditionSpinner.adapter = conditionAdapter


        val selectImageButton: Button = findViewById(R.id.selectImageButton)
        val submitButton: Button = findViewById(R.id.submitButton)

        userLabel = findViewById(R.id.userLabel)
        userLabel.text = "Utilisateur: $userPrenom"

        loadCategories()

        selectImageButton.setOnClickListener {
            openImageChooser()
        }

        submitButton.setOnClickListener {
            submitObject()
        }
    }

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == STORAGE_PERMISSION_CODE) {
            if (grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                // L'autorisation est accordée
            } else {
                // L'autorisation est refusée
                Toast.makeText(this, "Permission denied to read your External storage", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun logout() {
        AuthService.logout(this)

        val intent = Intent(this, LoginActivity::class.java)
        startActivity(intent)
        finish()
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

                    // Utilisation d'un ArrayAdapter personnalisé pour afficher le nom mais stocker l'ID
                    val adapter = ArrayAdapter(this@CreateObjectActivity,
                        android.R.layout.simple_spinner_item, categories.map { it.nom })
                    adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
                    categorySpinner.adapter = adapter

                    // Stocker les IDs pour les récupérer plus tard
                    categorySpinner.tag = categories
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
        val logging = HttpLoggingInterceptor()
        logging.setLevel(HttpLoggingInterceptor.Level.BODY)

        val httpClient = OkHttpClient.Builder()
        httpClient.addInterceptor(logging)

        val retrofit = Retrofit.Builder()
            .baseUrl("https://mbdsp10etu1095-etu1008-etu1044-etu1208.onrender.com/")
            .client(httpClient.build())
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        val apiService = retrofit.create(ApiService::class.java)

        val selectedCategoryIndex = categorySpinner.selectedItemPosition
        val selectedCategory = (categorySpinner.tag as List<Categorie>)[selectedCategoryIndex]
      // Utiliser l'ID réel

        val sharedPreferences = getSharedPreferences("MyPrefs", MODE_PRIVATE)
        val userId = sharedPreferences.getString("userId", "Invité") ?: "Invité"

        Log.d("CreateObjectActivity", "Données à soumettre:")
        Log.d("CreateObjectActivity", "Utilisateur ID: $userId")
        Log.d("CreateObjectActivity", "Catégorie ID: ${selectedCategory._id}")
        Log.d("CreateObjectActivity", "Titre: ${titleEditText.text.toString()}")
        Log.d("CreateObjectActivity", "Description: ${descriptionEditText.text.toString()}")
        Log.d("CreateObjectActivity", "Statut: ${statusSpinner.selectedItem.toString()}")
        Log.d("CreateObjectActivity", "État: ${conditionSpinner.selectedItem.toString()}")
        Log.d("CreateObjectActivity", "Valeur estimée: ${valueEditText.text.toString()}")


        val utilisateurId = createPartFromString(userId)  // Remplacez par la valeur réelle
        val categorieId = createPartFromString(selectedCategory._id)  // Remplacez par la valeur réelle
        val titre = createPartFromString(titleEditText.text.toString())
        val description = createPartFromString(descriptionEditText.text.toString())
        val statut = createPartFromString(statusSpinner.selectedItem.toString())
        val etat = createPartFromString(conditionSpinner.selectedItem.toString())
        val valeurEstimee = createPartFromString(valueEditText.text.toString())

        var imagePart: MultipartBody.Part? = null

        if (imageUri != null) {
            try {
                val file = File(getRealPathFromURI(imageUri!!))
                val mimeType = contentResolver.getType(imageUri!!)
                val mediaType = mimeType?.toMediaType() ?: "image/png".toMediaType()
                val fileBody = file.asRequestBody(mediaType)
                imagePart = MultipartBody.Part.createFormData("image", file.name, fileBody)
            } catch (e: Exception) {
                e.printStackTrace()
                Toast.makeText(this, "Erreur lors de l'ajout de l'image.", Toast.LENGTH_SHORT).show()
                return
            }
        }

        val call = apiService.createObjet(
            utilisateurId,
            categorieId,
            titre,
            description,
            statut,
            etat,
            valeurEstimee,
            imagePart
        )

        call.enqueue(object : Callback<Void> {
            override fun onResponse(call: Call<Void>, response: retrofit2.Response<Void>) {
                if (response.isSuccessful) {
                    Toast.makeText(this@CreateObjectActivity, "Objet créé avec succès !", Toast.LENGTH_SHORT).show()
                    finish()
                } else {
                    Log.e("CreateObjectActivity", "Erreur de réponse: ${response.code()} - ${response.message()}")
                    Toast.makeText(this@CreateObjectActivity, "Erreur lors de la création de l'objet.", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<Void>, t: Throwable) {
                Log.e("CreateObjectActivity", "Erreur: ${t.message}")
                Toast.makeText(this@CreateObjectActivity, "Échec de la connexion.", Toast.LENGTH_SHORT).show()
            }
        })
    }

    private fun createPartFromString(value: String): RequestBody {
        return value.toRequestBody("text/plain".toMediaTypeOrNull())
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