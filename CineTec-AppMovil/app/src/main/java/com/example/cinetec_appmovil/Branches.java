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
import com.example.cinetec_appmovil.database.CineTecDatabase;
import com.example.cinetec_appmovil.database.Table;
import com.example.cinetec_appmovil.databinding.FragmentBranchsBinding;

import java.util.ArrayList;

/**
 * A simple {@link Fragment} subclass.
 * Fragmento que representa la vista donde se visualuiza la lista de sucursales.
 */
public class Branches extends Fragment {

    private FragmentBranchsBinding binding;
    public static String current_branch;


    public Branches() {
        // Required empty public constructor
    }



    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);



    }


    /**
     * Se establece la funcionalidad de la vista al momento de ser creada
     * @param inflater
     * @param container
     * @param savedInstanceState
     * @return
     */
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment

        //CineTecDatabase.getInstance(getContext()).synchronizeDataBase(Table.BRANCHES);


        binding = FragmentBranchsBinding.inflate(inflater, container, false);
        ((MainActivity) getActivity()).setTitle("Cines");

        return binding.getRoot();
    }


    /**
     * Funcion que se llama despues de que el fragmento es creado
     * @param view
     * @param savedInstanceState
     */
    @Override
    public void onViewCreated(@NonNull View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        ArrayList<Branch> branches = CineTecDatabase.getInstance(getContext()).getBranches();

        BranchAdapter arrayAdapter = new BranchAdapter(getContext(), branches);

        binding.branchView.setAdapter(arrayAdapter);


        /**
         * Se establece el evento para continuar a la vista de peliculas
         */
        binding.branchView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {


                current_branch  =  ((Branch) binding.branchView.getItemAtPosition(i)).getName();
                NavHostFragment.findNavController(Branches.this)
                        .navigate(R.id.action_branchs_to_movies);



            }
        });








    }




}