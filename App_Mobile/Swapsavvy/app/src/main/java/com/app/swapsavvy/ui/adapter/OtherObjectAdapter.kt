package com.app.swapsavvy.ui.adapter

import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.app.swapsavvy.R
import com.app.swapsavvy.data.Objet
import com.app.swapsavvy.data.Utilisateur
import com.app.swapsavvy.services.RetrofitClient
import com.bumptech.glide.Glide
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class OtherObjectAdapter (private var objets: List<Objet>) : RecyclerView.Adapter<OtherObjectAdapter.OtherObjectViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): OtherObjectViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_other_object, parent, false)
        return OtherObjectViewHolder(view)
    }

    override fun onBindViewHolder(holder: OtherObjectViewHolder, position: Int) {
        val objet = objets[position]
        holder.bind(objet)
    }

    override fun getItemCount(): Int {
        return objets.size
    }

    class OtherObjectViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val titleTextView: TextView = itemView.findViewById(R.id.titreTextView)
        private val descriptionTextView: TextView = itemView.findViewById(R.id.descriptionTextView)
        private val statusTextView: TextView = itemView.findViewById(R.id.statutTextView)
        private val estimatedValueTextView: TextView = itemView.findViewById(R.id.valeurEstimeeTextView)
        private val ownerTextView: TextView = itemView.findViewById(R.id.proprietaireTextView)
        private val stateTextView: TextView = itemView.findViewById(R.id.etatTextView)
        private val imageView: ImageView = itemView.findViewById(R.id.imageView)

        fun bind(objet: Objet) {
            titleTextView.text = objet.titre
            descriptionTextView.text = objet.description?: "Pas de description disponible"
            statusTextView.text = "Statut: ${objet.statut}"
            estimatedValueTextView.text = "Valeur estimée: ${objet.valeur_estimee} €"
            stateTextView.text = "État: ${objet.etat}"

            // Charger l'image de l'objet
            if (!objet.image_url.isNullOrEmpty()) {
                Glide.with(itemView.context)
                    .load(objet.image_url)
                    .into(imageView)
            } else {
                imageView.setImageResource(R.drawable.default_image)
            }

            val utilisateur = objet.utilisateur_id.prenom
            ownerTextView.text = "Propriétaire: ${utilisateur}"
        }
    }

    fun updateData(newObjects: List<Objet>) {
        this.objets = newObjects
        notifyDataSetChanged()
    }
}
