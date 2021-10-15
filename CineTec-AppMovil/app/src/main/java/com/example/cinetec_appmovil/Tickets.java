package com.example.cinetec_appmovil;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.navigation.fragment.NavHostFragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.cinetec_appmovil.databinding.FragmentTicketsBinding;

/**
 * A simple {@link Fragment} subclass.
 * Fragmento que representa la vista donde se eligen la cantidad de boletos
 */
public class Tickets extends Fragment {

    private FragmentTicketsBinding binding;

    private int total = 0;
    private static int total_seats = 0;

    private final int PRICE = 3600;


    public Tickets() {
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

        binding = FragmentTicketsBinding.inflate(inflater, container, false);



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

        updateAllValues();


        /**
         * Se establece el evento para el boton que aumenta la cantidad de boletos
         * que se desean comprar
         */
        binding.ticketsPlusButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {


                total += PRICE;
                total_seats++;
                updateTicketsText();
                updateTotalText();

            }
        });


        /**
         * Se establece el evento para el boton que disminuye la cantidad de boletos
         * que se desean disminuir
         */
        binding.ticketsMinusButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                if(total_seats != 0) {

                    total -= PRICE;
                    total_seats--;
                    updateTicketsText();
                    updateTotalText();
                }

            }
        });


        /**
         * Se establece el evento para pasar a la vist de asientos
         */
        binding.chooseSeatButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                NavHostFragment.findNavController(Tickets.this)
                        .navigate(R.id.action_tickets_to_seats);

            }
        });

    }


    /**
     * Actualiza el texto que muestra el total en dinero que representan
     * los boletos que se desean comprar
     */
    private void updateTotalText(){

        binding.totalText.setText("$ " + total);

    }


    /**
     *Actualiza el texto que muestra la cantidad de boletos que se desean comprar
     */
    private void updateTicketsText(){
        binding.ticketsText.setText(Integer.toString(total_seats));

    }


    /**
     * Llama a las funciones que actualiza los textos en pantalla
     */
    private void updateAllValues(){
        updateTicketsText();
        updateTotalText();

    }


    /**
     * Devuelve la cantidad de asientos
     * @return
     */
    public static int getTotalSeats(){
        return total_seats;
    }

}