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
 * Use the {@link Tickets#} factory method to
 * create an instance of this fragment.
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

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment

        binding = FragmentTicketsBinding.inflate(inflater, container, false);



        return binding.getRoot();
    }

    @Override
    public void onViewCreated(@NonNull View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        updateAllValues();


        binding.ticketsPlusButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {


                total += PRICE;
                total_seats++;
                updteTicketsText();
                updateTotalText();

            }
        });

        binding.ticketsMinusButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                if(total_seats != 0) {

                    total -= PRICE;
                    total_seats--;
                    updteTicketsText();
                    updateTotalText();
                }

            }
        });



        binding.chooseSeatButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                NavHostFragment.findNavController(Tickets.this)
                        .navigate(R.id.action_tickets_to_seats);

            }
        });

    }


    private void updateTotalText(){

        binding.totalText.setText("$ " + total);

    }

    private void updteTicketsText(){
        binding.ticketsText.setText(Integer.toString(total_seats));

    }


    private void updateAllValues(){
        updteTicketsText();
        updateTotalText();

    }

    public static int getTotalSeats(){
        return total_seats;
    }

}