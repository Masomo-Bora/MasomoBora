from django.db import models
from usermanagement.models import CustomUser

class Program(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name

class Course(models.Model):
    student = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        limit_choices_to={'user_type': 'student'},
        related_name='student_courses'  # Provide a unique related_name
    )
    Lecture = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        limit_choices_to={'user_type': 'lecturer'},
        related_name='lecture_courses'  # Provide a unique related_name
    )
    program = models.ForeignKey(Program, on_delete=models.CASCADE)
    code = models.CharField(max_length=10)
    name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.code} - {self.name}"

class Examination(models.Model):
    student = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        limit_choices_to={'user_type': 'student'}
    )
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    date = models.DateField()
    description = models.TextField()
    marks = models.IntegerField(default=0) 

class CAT(models.Model):
    student = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        limit_choices_to={'user_type': 'student'}
    )
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    date = models.DateField()
    description = models.TextField()
    marks = models.IntegerField(default=0)  # Add the marks field for CATs

class Note(models.Model):
    Lecture = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        limit_choices_to={'user_type': 'lecturer'}
    )
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    content = models.TextField(blank=True, null=True)
    file = models.FileField(blank=True, null=True, upload_to='notes/')

class Question(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    text = models.TextField()
    marks = models.TextField(null=True, blank=True)

class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)

class Grades(models.Model):
    student = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        limit_choices_to={'user_type': 'student'}
    )
    cat = models.ForeignKey(CAT, on_delete=models.CASCADE)
    examination = models.ForeignKey(Examination, on_delete=models.CASCADE) 
    grade = models.CharField(max_length=1, blank=True, null=True)

    def calculate_total_marks(self):
        total_marks = self.cat.marks + self.examination.marks
        return total_marks

    def assign_grade(self):
        total_marks = self.calculate_total_marks()

        if total_marks >= 90:
            return 'A'
        elif total_marks >= 80:
            return 'B'
        elif total_marks >= 70:
            return 'C'
        elif total_marks >= 60:
            return 'D'
        else:
            return 'F'

    def save(self, *args, **kwargs):
        self.grade = self.assign_grade()
        super().save(*args, **kwargs)
