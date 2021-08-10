package muratbekb.bauyrzhan.testproject.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "demo")
@Data
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;
}
