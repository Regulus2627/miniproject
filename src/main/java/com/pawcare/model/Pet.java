package com.pawcare.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "pets")
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long petId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String species;

    private String breed;
    private Integer age;
    
    @Column(nullable = false)
    private String gender;

    private String description;
    private String imageUrl;
    private String status;
    private String locationFound;
    private String healthCondition;
    private Boolean isVaccinated;
    private Boolean isNeutered;
    private String specialNeeds;
    private String temperament;
    private String size;
    private String coatType;
    private Boolean isGoodWithChildren;
    private Boolean isGoodWithOtherPets;
    private String estimatedAge;
    
    @Column(name = "rescue_date")
    private LocalDate rescueDate;
    
    @Column(name = "last_vaccination_date")
    private LocalDate lastVaccinationDate;
    
    @Column(name = "next_vaccination_due")
    private LocalDate nextVaccinationDue;
    
    @Column(columnDefinition = "TEXT")
    private String medicalHistory;
    
    @Column(columnDefinition = "TEXT")
    private String dietaryRequirements;
    
    @Column(columnDefinition = "TEXT")
    private String exerciseNeeds;
    
    @Column(columnDefinition = "TEXT")
    private String groomingNeeds;
} 