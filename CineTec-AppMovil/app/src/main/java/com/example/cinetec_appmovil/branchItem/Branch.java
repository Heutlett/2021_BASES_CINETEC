package com.example.cinetec_appmovil.branchItem;

public class Branch {

    private String province;
    private String district;
    private String name;
    private String roomQuantity;


    public Branch(String province, String district, String name, String roomQuantity) {
        this.province = province;
        this.district = district;
        this.name = name;
        this.roomQuantity = roomQuantity;
    }

    public String getProvince() {
        return province;
    }

    public String getDistrict() {
        return district;
    }

    public String getName() {
        return name;
    }

    public String getRoomQuantity() {
        return roomQuantity;
    }
}
