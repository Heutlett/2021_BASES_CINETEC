package com.example.cinetec_appmovil;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.navigation.fragment.NavHostFragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;

import com.example.cinetec_appmovil.databinding.FragmentProjectionBinding;
import com.example.cinetec_appmovil.movieItem.MovieAdapter;
import com.example.cinetec_appmovil.projectionsItem.Projection;
import com.example.cinetec_appmovil.projectionsItem.ProjectionAdapter;


import java.util.ArrayList;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link Projections#} factory method to
 * create an instance of this fragment.
 */
public class Projections extends Fragment {

    private FragmentProjectionBinding binding;


    public Projections() {
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

        binding = FragmentProjectionBinding.inflate(inflater, container, false);
        return binding.getRoot();

    }

    @Override
    public void onViewCreated(@NonNull View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);



        ArrayList<Projection> projections = new ArrayList<>();

        for(int i=0; i < 20; i++)
        {


            projections.add(new Projection("Sabado 19", "15:00", ":$200"));

        }

        ProjectionAdapter arrayAdapter = new ProjectionAdapter(getContext(), projections);
        binding.projectionView.setAdapter(arrayAdapter);

        binding.projectionView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {


                NavHostFragment.findNavController(Projections.this)
                        .navigate(R.id.action_projection_to_tickets);


            }
        });




    }


}