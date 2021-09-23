package com.example.cinetec_appmovil;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.navigation.fragment.NavHostFragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.cinetec_appmovil.branchItem.Branch;
import com.example.cinetec_appmovil.branchItem.BranchAdapter;
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
        return binding.getRoot();
    }

    @Override
    public void onViewCreated(@NonNull View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        ArrayList<Movie> movies = new ArrayList<>();

        for(int i=0; i < 20; i++)
        {
            movies.add(new Movie("Once Upon a Time in HOllywood", "2 hours 30 minutes", "R+", "Leornado Di Caprio, Brad Pitt", "Quetin Tarantino"));

        }


        MovieAdapter arrayAdapter = new MovieAdapter(getContext(), movies);
        binding.branchView.setAdapter(arrayAdapter);







    }
}