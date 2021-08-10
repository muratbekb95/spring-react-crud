package muratbekb.bauyrzhan.testproject.controller;

import muratbekb.bauyrzhan.testproject.model.Student;
import muratbekb.bauyrzhan.testproject.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {
    @Autowired
    private StudentService studentService;

    // display list of students
    @GetMapping("/")
    public ResponseEntity<Model> viewHomePage(Model model) {
        return findPaginated(1,"firstName", "asc", model);
    }

    @GetMapping("/showNewStudentForm")
    public ResponseEntity<Model> showNewStudentForm(Model model) {
        // create model attribute to bind form data
        Student student = new Student();
        model.addAttribute("student", student);
        return ResponseEntity.ok(model);
    }

    @PostMapping("/saveStudent")
    public ResponseEntity saveStudent(@RequestBody Student student) throws URISyntaxException {
        // save student to database
        Student savedStudent = studentService.saveStudent(student);
        return ResponseEntity.created(new URI("/"+savedStudent.getId())).body(savedStudent);
    }

    @GetMapping("/showFormForUpdate/{id}")
    public ResponseEntity<Model> showFormForUpdate(@PathVariable(value = "id") long id, Model model) {
        // get student from the service
        Student student = studentService.getStudentById(id);
        // set student as a model attribute to pre-populate the form
        model.addAttribute("student", student);
        return ResponseEntity.ok(model);
    }

    @GetMapping("/deleteStudent/{id}")
    public void deleteStudent(@PathVariable (value = "id") long id) {
        // call delete student method
        this.studentService.deleteStudentById(id);
    }

    // /page/1?sortField=name&sortDir=asc

    @GetMapping("/page/{pageNo}")
    public ResponseEntity<Model> findPaginated(@PathVariable (value = "pageNo") int pageNo,
                                               @RequestParam("sortField") String sortField,
                                               @RequestParam("sortDir") String sortDir,
                                               Model model) {
        int pageSize = 5;

        Page<Student> page = studentService.findPaginated(pageNo, pageSize, sortField, sortDir);
        List<Student> listStudents = page.getContent();

        model.addAttribute("currentPage", pageNo);
        model.addAttribute("totalPages", page.getTotalPages());
        model.addAttribute("totalItems", page.getTotalElements());

        model.addAttribute("sortField", sortField);
        model.addAttribute("sortDir", sortDir);
        model.addAttribute("reverseSortDir", sortDir.equals("asc") ? "desc" : "asc");

        model.addAttribute("listStudents", listStudents);

        return ResponseEntity.ok(model);
    }
}
