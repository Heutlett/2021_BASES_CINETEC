package com.example.cinetec_appmovil.projectionsItem;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.example.cinetec_appmovil.R;

import java.util.ArrayList;


/**
 * Clase adaptador que permite colocar un array de proyecciones en el listView
 */
public class ProjectionAdapter extends ArrayAdapter<Projection> {


    private ArrayList<Projection> projections = new ArrayList<>();


    /**
     * Constructor
     * @param context
     * @param arrayList lista que contiene las proyecciones
     */
    public ProjectionAdapter(@NonNull Context context, ArrayList<Projection> arrayList) {
        // pass the context and arrayList for the super
        // constructor of the ArrayAdapter class
        super(context, 0, arrayList);

        this.projections = arrayList;
    }


    /**
     * Devuelve la vista del item
     * @param position posicion del item en el listView
     * @param convertView item
     * @param parent padre
     * @return
     */
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        View currentItemView = convertView;

        // of the recyclable view is null then inflate the custom layout for the same
        if (currentItemView == null) {
            currentItemView = LayoutInflater.from(getContext()).inflate(R.layout.projection_item, parent, false);


        }



        Projection currentProjection = projections.get(position);


        TextView textView1 = currentItemView.findViewById(R.id.date_text);
        System.out.println(textView1);
        textView1.setText("Día: " + currentProjection.getDate());

        TextView textView3 = currentItemView.findViewById(R.id.time_text);
        textView3.setText("Hora: " + currentProjection.getTime());

        TextView textView4 = currentItemView.findViewById(R.id.room_text);
        textView4.setText("Hora: " + currentProjection.getRoom());




        // then return the recyclable view
        return currentItemView;
    }

}
