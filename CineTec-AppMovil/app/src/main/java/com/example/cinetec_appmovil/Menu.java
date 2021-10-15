package com.example.cinetec_appmovil;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.navigation.fragment.NavHostFragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.cinetec_appmovil.database.CineTecDatabase;
import com.example.cinetec_appmovil.database.Table;
import com.example.cinetec_appmovil.databinding.FragmentMenuBinding;
/**
 * A simple {@link Fragment} subclass.
 * Fragmento que representa la vista donde se visualuiza el perfil del usuario ingresado.
 */
public class Menu extends Fragment {

    private FragmentMenuBinding binding;


    public Menu() {
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

        binding = FragmentMenuBinding.inflate(inflater, container, false);


        binding.firstNameText.setText(String.format("Primer nombre: %s", Login.currentClient.first_name));
        binding.middleNameText.setText(String.format("Segundo nombre: %s", Login.currentClient.middle_name));
        binding.firstSurname.setText(String.format("Primer apellido: %s", Login.currentClient.first_surname));
        binding.secondSurname.setText(String.format("Segundo apellido: %s", Login.currentClient.second_surname));
        binding.birthNameText3.setText(String.format("Fecha de nacimiento: %s", Login.currentClient.birth_date));
        binding.usernameText2.setText(String.format("Username: %s", Login.currentClient.username));
        binding.passwordText.setText(String.format("Password: %s", Login.currentClient.password));
        binding.phoneNumberText.setText(String.format("Numero de telefono %s", Login.currentClient.phone_number));
        binding.ageText.setText(String.format("Edad %s", Login.currentClient.age));



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


        /**
         * Se establece el evento para continuar con la vista de sucursales
         */
        binding.purchaseButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                NavHostFragment.findNavController(Menu.this)
                        .navigate(R.id.action_menu_to_branchs);


            }
        });


        /**
         * Se establece el evento para sincronizar la base de datos cuando se desee
         */
        binding.syncDatabse.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                CineTecDatabase.getInstance(getContext()).synchronizeDataBase(Table.ALL);

            }
        });


    }

}