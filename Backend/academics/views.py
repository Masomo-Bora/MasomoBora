# academics/views.py
from rest_framework import generics, status
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from .models import Program, Course, Examination, CAT, Note,Question, Answer
from .serializers import ProgramSerializer, CourseSerializer, ExaminationSerializer, CATSerializer, NoteSerializer,QuestionSerializer, AnswerSerializer

class ProgramListCreateView(generics.ListCreateAPIView):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer
    permission_classes = [IsAdminUser]

class CourseListCreateView(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAdminUser]

class ExaminationListCreateView(generics.ListCreateAPIView):
    queryset = Examination.objects.all()
    serializer_class = ExaminationSerializer
    permission_classes = [IsAuthenticated]

class CATListCreateView(generics.ListCreateAPIView):
    queryset = CAT.objects.all()
    serializer_class = CATSerializer
    permission_classes = [IsAuthenticated]

class NoteListCreateView(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

class QuestionListCreateView(generics.ListCreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [IsAuthenticated]  # Adjust as needed

class AnswerListCreateView(generics.ListCreateAPIView):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    permission_classes = [IsAuthenticated]  # Adjust as needed
