package com.example.cinetec_appmovil.branchItem;


/**
 * Clase que modela las caracteristicas de una sucursal
 */
public class Branch {

    private String province;
    private String district;
    private String name;
    private String roomQuantity;


    /**
     * Constructor
     * @param province
     * @param district
     * @param name
     * @param roomQuantity
     */
    public Branch(String province, String district, String name, String roomQuantity) {
        this.province = province;
        this.district = district;
        this.name = name;
        this.roomQuantity = roomQuantity;
    }


    /**
     * Devuelve la provincia
     * @return province
     */
    public String getProvince() {
        return province;
    }

    /**
     * Devuelve el districto
     * @return district
     */
    public String getDistrict() {
        return district;
    }


    /**
     * Devuelve el nombre de la sucursal
     * @return name
     */
    public String getName() {
        return name;
    }


    /**
     * Devuelve la cantidad de salas
     * @return room_quantity
     */
    public String getRoomQuantity() {
        return roomQuantity;
    }
}
