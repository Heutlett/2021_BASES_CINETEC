package com.example.cinetec_appmovil;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.navigation.fragment.NavHostFragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.example.cinetec_appmovil.client.Client;
import com.example.cinetec_appmovil.database.CineTecDatabase;
import com.example.cinetec_appmovil.database.Table;
import com.example.cinetec_appmovil.databinding.FragmentLoginBinding;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link Login} factory method to
 * create an instance of this fragment.
 */
public class Login extends Fragment {

    private FragmentLoginBinding binding;
    public static Client currentClient;



    public Login() {
        // Required empty public constructor
    }



    @Override
    public void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        if (getArguments() != null) {

        }
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
        binding = FragmentLoginBinding.inflate(inflater, container, false);

        CineTecDatabase.getInstance(getContext()).synchronizeDataBase(Table.ALL);


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
         * Se establece el evento para realizar el login a la cuenta de CineTec
         */
        binding.enterButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                String user = binding.editTextTextUser.getText().toString();
                String password = binding.editTextTextPassword.getText().toString();
                Client client_exist = CineTecDatabase.getInstance(getContext()).clientExist(user, password);

                if (client_exist != null){

                    currentClient = client_exist;
                    NavHostFragment.findNavController(Login.this)
                            .navigate(R.id.action_login_to_menu);
                }
                else
                {
                    Toast.makeText(getContext(), "Usuario o contraseña invalidos", Toast.LENGTH_SHORT).show();

                }




            }
        });

    }



}