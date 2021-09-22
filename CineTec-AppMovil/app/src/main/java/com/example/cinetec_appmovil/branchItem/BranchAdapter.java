package com.example.cinetec_appmovil.branchItem;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.example.cinetec_appmovil.R;

import java.util.ArrayList;

public class BranchAdapter extends ArrayAdapter<Branch> {

    private ArrayList<Branch> branches = new ArrayList<>();

    public BranchAdapter(@NonNull Context context, ArrayList<Branch> arrayList) {
        // pass the context and arrayList for the super
        // constructor of the ArrayAdapter class
        super(context, 0, arrayList);

        this.branches = arrayList;
    }


    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent){
        View currentItemView = convertView;

        // of the recyclable view is null then inflate the custom layout for the same
        if (currentItemView == null) {
            currentItemView = LayoutInflater.from(getContext()).inflate(R.layout.branch_item, parent, false);


            Branch currentBranch = branches.get(position);

            TextView textView1 = currentItemView.findViewById(R.id.branch_name_text);
            textView1.setText(currentBranch.getName());

            TextView textView2 = currentItemView.findViewById(R.id.address_text);
            textView2.setText(currentBranch.getProvince() + ", " + currentBranch.getDistrict());







        }


        // then return the recyclable view
        return currentItemView;
    }

}
