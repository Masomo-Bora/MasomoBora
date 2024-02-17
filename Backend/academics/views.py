# academics/views.py
from rest_framework import generics
from .models import Program, Course, Examination, CAT, Note, Question, Answer, Grades
from .serializers import ProgramSerializer, CourseSerializer, ExaminationSerializer, CATSerializer, NoteSerializer, QuestionSerializer, AnswerSerializer, GradesSerializer
from .permissions import IsStudent, IsTeacher, IsAdmin

class ProgramListCreateView(generics.ListCreateAPIView):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer
    permission_classes = [IsAdmin]  # Only admin can create/list programs

class CourseListCreateView(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsTeacher]  # Only teachers can create/list courses

class ExaminationListCreateView(generics.ListCreateAPIView):
    queryset = Examination.objects.all()
    serializer_class = ExaminationSerializer
    permission_classes = [IsTeacher]  # Only teachers can create/list examinations

class CATListCreateView(generics.ListCreateAPIView):
    queryset = CAT.objects.all()
    serializer_class = CATSerializer
    permission_classes = [IsTeacher]  # Only teachers can create/list CATs

class NoteListCreateView(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [IsTeacher]  # Only teachers can create/list notes

class QuestionListCreateView(generics.ListCreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [IsTeacher]  # Only teachers can create/list questions

class AnswerListCreateView(generics.ListCreateAPIView):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    permission_classes = [IsTeacher]  # Only teachers can create/list answers

class GradesListCreateView(generics.ListCreateAPIView):
    queryset = Grades.objects.all()
    serializer_class = GradesSerializer
    permission_classes = [IsStudent]  # Only students can create/list grades
