package com.example.cinetec_appmovil;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.navigation.fragment.NavHostFragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.GridLayout;
import android.widget.LinearLayout;

import com.example.cinetec_appmovil.databinding.FragmentSeatsBinding;
import com.example.cinetec_appmovil.seats.ButtonSeat;

import java.util.ArrayList;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link Seats} factory method to
 * create an instance of this fragment.
 */
public class Seats extends Fragment {

    private FragmentSeatsBinding binding;


    private ArrayList<ButtonSeat> buttonSeats = new ArrayList<>();

    public Seats() {
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
        binding = FragmentSeatsBinding.inflate(inflater, container, false);


        binding.finalizePurchaseButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                NavHostFragment.findNavController(Seats.this)
                        .navigate(R.id.action_seats_to_menu);


            }
        });

        binding.totalSeatsText.setText(Integer.toString(Tickets.getTotalSeats()));


        return binding.getRoot();

    }


    @Override
    public void onViewCreated(@NonNull View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);


        int row = 15;
        int column = 10;
        GridLayout seats_layout= view.findViewById(R.id.seats_layout);
        seats_layout.setRowCount(row);
        seats_layout.setColumnCount(column);
        int seat = 1;

        for(int i=0; i<row; i++){

            for(int j=0; j<column; j++){


                ButtonSeat currentButton = createButton(seat, column, j);
                seats_layout.addView(currentButton);
                this.buttonSeats.add(currentButton);
                seat++;


            }


        }



    }

    private ButtonSeat createButton(int seat, int column, int j){

        ButtonSeat button = new ButtonSeat(getContext(), seat, false, false);

        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(125, 125);

        if (column/2 == j) {

            params.setMargins(70, 10, 10, 10);
        }
        else
        {
            params.setMargins(5, 10, 5, 10);

        }


        button.setLayoutParams(params);
        button.setId(seat);
        return button;

    }
}