package com.app.swapsavvy.ui.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.app.swapsavvy.R
import com.app.swapsavvy.data.Objet
class MyObjectsAdapter(private var objets: List<Objet>) : RecyclerView.Adapter<MyObjectsAdapter.ObjectViewHolder>() {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ObjectViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_object, parent, false)
        return ObjectViewHolder(view)
    }
    override fun onBindViewHolder(holder: ObjectViewHolder, position: Int) {
        val currentObject = objets[position]
        holder.bind(currentObject)
    }
    override fun getItemCount(): Int = objets.size
    fun updateData(newObjects: List<Objet>) {
        this.objets = newObjects
        notifyDataSetChanged()
    }

    class ObjectViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

        fun bind(myObject: Objet) {

        }
    }
}
