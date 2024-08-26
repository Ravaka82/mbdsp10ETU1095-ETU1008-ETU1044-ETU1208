package com.app.swapsavvy.ui.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.app.swapsavvy.R
import com.app.swapsavvy.data.Echange
import com.app.swapsavvy.data.EchangeApiResponse
import com.app.swapsavvy.data.ObjetResponse
import com.app.swapsavvy.objetlist.SouhaiteEchangeActivity
import com.app.swapsavvy.objetlist.ValidationEchangeActivity
import com.bumptech.glide.Glide

class ValidationEchangeAdapter(
    private var echanges: List<EchangeApiResponse>
) : RecyclerView.Adapter<ValidationEchangeAdapter.ValidationEchangeViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ValidationEchangeViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_validation_echange, parent, false)
        return ValidationEchangeViewHolder(view)
    }

    override fun onBindViewHolder(holder: ValidationEchangeViewHolder, position: Int) {
        val echange = echanges[position]
        holder.bind(echange)
    }

    override fun getItemCount(): Int {
        return echanges.size
    }

    class ValidationEchangeViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val titleTextView1: TextView = itemView.findViewById(R.id.titreTextView1)
        private val descriptionTextView1: TextView = itemView.findViewById(R.id.descriptionTextView1)
        private val statusTextView1: TextView = itemView.findViewById(R.id.statutTextView1)
        private val estimatedValueTextView1: TextView = itemView.findViewById(R.id.valeurEstimeeTextView1)
        private val ownerTextView1: TextView = itemView.findViewById(R.id.proprietaireTextView1)
        private val stateTextView1: TextView = itemView.findViewById(R.id.etatTextView1)
        private val imageView1: ImageView = itemView.findViewById(R.id.imageView1)

        private val titleTextView2: TextView = itemView.findViewById(R.id.titreTextView2)
        private val descriptionTextView2: TextView = itemView.findViewById(R.id.descriptionTextView2)
        private val statusTextView2: TextView = itemView.findViewById(R.id.statutTextView2)
        private val estimatedValueTextView2: TextView = itemView.findViewById(R.id.valeurEstimeeTextView2)
        private val ownerTextView2: TextView = itemView.findViewById(R.id.proprietaireTextView2)
        private val stateTextView2: TextView = itemView.findViewById(R.id.etatTextView2)
        private val imageView2: ImageView = itemView.findViewById(R.id.imageView2)

        private val datePropositionTextView: TextView = itemView.findViewById(R.id.datePropositionTextView)
        private val statutTextView: TextView = itemView.findViewById(R.id.statustextView)

        private val buttonSend: Button = itemView.findViewById(R.id.btnEnvoyerEchange)
        private val buttonDelete: Button = itemView.findViewById(R.id.btnSupprimerEchange)

        fun bind(echange: EchangeApiResponse) {
            // Bind the proposing object's details
            echange.objet_proposant?.let { objetResponse ->
                titleTextView1.text = objetResponse.titre ?: "Titre non disponible"
                descriptionTextView1.text = objetResponse.description ?: "Description non disponible"
                estimatedValueTextView1.text = "Valeur estimée: ${objetResponse.valeur_estimee ?: "Non disponible"}"
                Glide.with(itemView.context)
                    .load(objetResponse.image_url ?: R.drawable.default_image)
                    .placeholder(R.drawable.default_image)
                    .into(imageView1)
            } ?: run {
                titleTextView1.text = "Titre non disponible"
                descriptionTextView1.text = "Description non disponible"
                estimatedValueTextView1.text = "Valeur estimée: Non disponible"
                Glide.with(itemView.context)
                    .load(R.drawable.default_image)
                    .placeholder(R.drawable.default_image)
                    .into(imageView1)
            }

            // Utilisateur_proposant_id comme objet Utilisateur
            ownerTextView1.text = "Propriétaire: ${echange.utilisateur_proposant_id?.nom ?: "Non spécifié"}"
            statusTextView1.text = "Statut: ${echange.objet_proposant?.statut ?: "Non spécifié"}"
            stateTextView1.text = "État: ${echange.objet_proposant?.etat ?: "Non spécifié"}"

            // Bind the accepting object's details
            echange.objet_acceptant?.let { objetResponse ->
                titleTextView2.text = objetResponse.titre ?: "Titre non disponible"
                descriptionTextView2.text = objetResponse.description ?: "Description non disponible"
                estimatedValueTextView2.text = "Valeur estimée: ${objetResponse.valeur_estimee ?: "Non disponible"}"
                Glide.with(itemView.context)
                    .load(objetResponse.image_url ?: R.drawable.default_image)
                    .placeholder(R.drawable.default_image)
                    .into(imageView2)
            } ?: run {
                titleTextView2.text = "Titre non disponible"
                descriptionTextView2.text = "Description non disponible"
                estimatedValueTextView2.text = "Valeur estimée: Non disponible"
                Glide.with(itemView.context)
                    .load(R.drawable.default_image)
                    .placeholder(R.drawable.default_image)
                    .into(imageView2)
            }

            // Utilisateur_acceptant_id comme objet Utilisateur
            ownerTextView2.text = "Propriétaire: ${echange.utilisateur_acceptant_id?.nom ?: "Non spécifié"}"
            statusTextView2.text = "Statut: ${echange.objet_acceptant?.statut ?: "Non spécifié"}"
            stateTextView2.text = "État: ${echange.objet_acceptant?.etat ?: "Non spécifié"}"

            // Bind the exchange details
            datePropositionTextView.text = "Date de proposition: ${echange.date_proposition ?: "Non spécifiée"}"
            statutTextView.text = "Statut: ${echange.statut ?: "Non spécifié"}"

            // Set click listeners for the buttons


            buttonDelete.setOnClickListener {
                echange._id?.let {
                    (itemView.context as? ValidationEchangeActivity)?.handleDeleteExchange(
                        it
                    )
                }
            }
            buttonSend.setOnClickListener {
                echange._id?.let {
                    (itemView.context as? ValidationEchangeActivity)?.handleSendExchange(
                        it
                    )
                }
            }

        }
    }


    fun updateData(newEchanges: List<EchangeApiResponse>) {
        this.echanges = newEchanges
        notifyDataSetChanged()
    }
}