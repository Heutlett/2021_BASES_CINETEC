package com.example.cinetec_appmovil;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.navigation.fragment.NavHostFragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;

import com.example.cinetec_appmovil.branchItem.Branch;
import com.example.cinetec_appmovil.branchItem.BranchAdapter;
import com.example.cinetec_appmovil.database.CineTecDatabase;
import com.example.cinetec_appmovil.databinding.FragmentMoviesBinding;
import com.example.cinetec_appmovil.movieItem.Movie;
import com.example.cinetec_appmovil.movieItem.MovieAdapter;

import java.util.ArrayList;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link Movies} factory method to
 * create an instance of this fragment.
 */
public class Movies extends Fragment {

    private FragmentMoviesBinding binding;
    public static String current_movie;


    public Movies() {
        // Required empty public constructor
    }


    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment


        binding = FragmentMoviesBinding.inflate(inflater, container, false);

        ArrayList<Movie> movies = CineTecDatabase.getInstance(getContext()).getMovies();


        MovieAdapter arrayAdapter = new MovieAdapter(getContext(), movies);


        binding.moviesView.setAdapter(arrayAdapter);


        return binding.getRoot();
    }

    @Override
    public void onViewCreated(@NonNull View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);


        binding.moviesView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {



                current_movie=  ((Movie) binding.moviesView.getItemAtPosition(i)).getOriginal_name();

                NavHostFragment.findNavController(Movies.this)
                        .navigate(R.id.action_movies_to_projection);




            }
        });









    }
}