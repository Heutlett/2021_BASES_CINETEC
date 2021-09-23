package com.example.cinetec_appmovil;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.navigation.fragment.NavHostFragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;

import com.example.cinetec_appmovil.branchItem.Branch;
import com.example.cinetec_appmovil.branchItem.BranchAdapter;
import com.example.cinetec_appmovil.databinding.FragmentBranchsBinding;
import com.example.cinetec_appmovil.databinding.FragmentLoginBinding;

import java.util.ArrayList;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link Branchs#} factory method to
 * create an instance of this fragment.
 */
public class Branchs extends Fragment {

    private FragmentBranchsBinding binding;


    public Branchs() {
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

        binding = FragmentBranchsBinding.inflate(inflater, container, false);
        ((MainActivity) getActivity()).setTitle("Cines");

        return binding.getRoot();
    }

    @Override
    public void onViewCreated(@NonNull View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        ArrayList<Branch> branches = new ArrayList<>();

        branches.add(new Branch("San Jose", "Guadalupe", "Cinepolis", "45"));
        branches.add(new Branch("Cartago", "Oriental", "multiplaza", "45"));
        branches.add(new Branch("Heredia", "San Isidro", "magaly", "45"));

        BranchAdapter arrayAdapter = new BranchAdapter(getContext(), branches);

        binding.branchView.setAdapter(arrayAdapter);

        binding.branchView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {



                NavHostFragment.findNavController(Branchs.this)
                        .navigate(R.id.action_branchs_to_movies);



            }
        });








    }




}