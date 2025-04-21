package com.pawcare.model;

import lombok.Data;
import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "care_history")
public class CareHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long historyId;

    @ManyToOne
    @JoinColumn(name = "pet_id")
    private Pet pet;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CareType careType;

    @Column(nullable = false)
    private LocalDate careDate;

    private String description;
    private LocalDate nextDueDate;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
} 