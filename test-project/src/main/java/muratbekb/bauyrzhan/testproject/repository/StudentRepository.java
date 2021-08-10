package muratbekb.bauyrzhan.testproject.repository;

import muratbekb.bauyrzhan.testproject.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
}
