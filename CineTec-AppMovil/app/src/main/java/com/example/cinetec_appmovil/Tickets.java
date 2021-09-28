package com.example.cinetec_appmovil;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.navigation.fragment.NavHostFragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.cinetec_appmovil.databinding.BranchItemBinding;
import com.example.cinetec_appmovil.databinding.FragmentTicketsBinding;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link Tickets#} factory method to
 * create an instance of this fragment.
 */
public class Tickets extends Fragment {

    private FragmentTicketsBinding binding;

    private int kid_tickets = 0;
    private int adult_tickets = 0;
    private int old_tickets = 0;
    private int total = 0;
    private static int total_seats = 0;

    private final int KID_PRICE = 2500;
    private final int ADULT_PRICE = 3000;
    private final int OLD_PRICE = 2000;


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


        binding.kidPlusButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                kid_tickets++;
                total += KID_PRICE;
                total_seats++;
                updteKidText();
                updateTotalText();

            }
        });

        binding.kidMinusButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                if(kid_tickets != 0) {

                    kid_tickets--;
                    total -= KID_PRICE;
                    total_seats--;
                    updteKidText();
                    updateTotalText();
                }

            }
        });


        binding.adultPlusButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                adult_tickets++;
                total += ADULT_PRICE;
                total_seats++;
                updteAdultText();
                updateTotalText();

            }
        });


        binding.adultMinusButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                if (adult_tickets != 0) {

                    adult_tickets--;
                    total -= ADULT_PRICE;
                    total_seats--;
                    updteAdultText();
                    updateTotalText();
                }

            }
        });


        binding.oldPlusButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                old_tickets++;
                total += OLD_PRICE;
                total_seats++;
                updteOldText();
                updateTotalText();

            }
        });

        binding.oldMinusButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                if(old_tickets != 0) {
                    old_tickets--;
                    total -= OLD_PRICE;
                    total_seats--;
                    updteOldText();
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

    private void updteKidText(){
        binding.kidsText.setText(Integer.toString(kid_tickets));

    }

    private void updteAdultText(){
        binding.adultText.setText(Integer.toString(adult_tickets));

    }

    private void updteOldText(){
        binding.oldText.setText(Integer.toString(old_tickets));

    }

    private void updateAllValues(){
        updteKidText();
        updteAdultText();
        updteOldText();
        updateTotalText();

    }

    public static int getTotalSeats(){
        return total_seats;
    }

}