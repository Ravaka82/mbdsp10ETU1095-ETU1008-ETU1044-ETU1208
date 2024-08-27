package com.app.swapsavvy.ui.adapter

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.TextView
import com.app.swapsavvy.R
import com.app.swapsavvy.data.Objet

class EchangeSpinnerAdapter(context: Context, objets: List<Objet>) : ArrayAdapter<Objet>(context, 0, objets) {
    override fun getView(position: Int, convertView: View?, parent: ViewGroup): View {
        val view = convertView ?: LayoutInflater.from(context).inflate(R.layout.spinner_item, parent, false)
        val objet = getItem(position)
        val textView = view.findViewById<TextView>(R.id.textViewSpinnerItem)
        textView.text = objet?.titre
        return view
    }

    override fun getDropDownView(position: Int, convertView: View?, parent: ViewGroup): View {
        return getView(position, convertView, parent)
    }
}
