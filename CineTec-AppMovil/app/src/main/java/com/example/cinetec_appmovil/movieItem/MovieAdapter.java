package com.example.cinetec_appmovil.movieItem;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.drawable.Drawable;
import android.util.Base64;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.example.cinetec_appmovil.R;
import com.example.cinetec_appmovil.branchItem.Branch;

import java.util.ArrayList;



/**
 * Clase adaptador que permite colocar un array de peliculas en el listView
 */
public class MovieAdapter extends ArrayAdapter<Movie> {

    private ArrayList<Movie> movies = new ArrayList<>();


    /**
     * Constructor
     * @param context
     * @param arrayList lista con las peliculas
     */
    public MovieAdapter(@NonNull Context context, ArrayList<Movie> arrayList) {
        // pass the context and arrayList for the super
        // constructor of the ArrayAdapter class
        super(context, 0, arrayList);

        this.movies = arrayList;


    }


    /**
     * Devuelve el item para visualizarlo
     * @param position posicion del item en el listView
     * @param convertView item
     * @param parent padre
     * @return
     */
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent){
        View currentItemView = convertView;

        // of the recyclable view is null then inflate the custom layout for the same
        if (currentItemView == null) {
            currentItemView = LayoutInflater.from(getContext()).inflate(R.layout.movie_item, parent, false);


        }


        Movie currentMovie = movies.get(position);
        System.out.println("POSICION " + position + "    " + currentMovie.getName());

        TextView textView1 = currentItemView.findViewById(R.id.name_textview);
        textView1.setText(currentMovie.getName());

        TextView textView2 = currentItemView.findViewById(R.id.director_textview);
        textView2.setText("Director: " +currentMovie.getDirector());

        TextView textView3 = currentItemView.findViewById(R.id.length_textview);
        textView3.setText("Duracion: " + currentMovie.getLength());

        TextView textView4 = currentItemView.findViewById(R.id.protagonist_textview);
        textView4.setText("Protagonistas: " + currentMovie.getActors());

        TextView textView5 = currentItemView.findViewById(R.id.classification_textview);
        textView5.setText("Clasificacion: " +currentMovie.getCode());


        String image = currentMovie.getImage();
        String base64Image = image.split(",")[1];

        byte[] decodedString = Base64.decode(base64Image, Base64.DEFAULT);
        Bitmap decodedByte = BitmapFactory.decodeByteArray(decodedString, 0, decodedString.length);


        ImageView imageView = currentItemView.findViewById(R.id.movie_imageview);
        imageView.setImageBitmap(decodedByte);



        // then return the recyclable view
        return currentItemView;
    }


    public int getImage(String movie_name)
    {

        if(movie_name.equals("Venom Carnage Liberado"))
        {
            return R.drawable.venomlettherebecarnage;
        }
        if(movie_name.equals("Regreso al futuro"))
        {
            return R.drawable.backtothefuture;
        }

        if(movie_name.equals("Encontrando a Nemo"))
        {
            return R.drawable.findingnemo;
        }

        if(movie_name.equals("El Rey Leon")){
            return R.drawable.thelionking;
        }

        if(movie_name.equals("Moonlight")){
            return R.drawable.moonlight;
        }
        if(movie_name.equals("La Matrix"))
        {
            return R.drawable.thematrix;
        }
        if(movie_name.equals("Mad max Furia en la carretera"))
        {
            return R.drawable.madmaxfuryroad;
        }
        if(movie_name.equals("El viaje de Chihiro"))
        {
            return R.drawable.spiritedaway;
        }
        if(movie_name.equals("Parasitos"))
        {
            return R.drawable.parasite;
        }
        if(movie_name.equals("Rogue One"))
        {
            return R.drawable.rogueone;
        }
        return R.drawable.placeholder;









    }
}
