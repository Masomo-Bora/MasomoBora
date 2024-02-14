# academics/urls.py
from django.urls import path
from .views import ProgramListCreateView, CourseListCreateView, ExaminationListCreateView, CATListCreateView, NoteListCreateView,QuestionListCreateView,AnswerListCreateView

urlpatterns = [
    path('programs/', ProgramListCreateView.as_view(), name='program-list-create'),
    path('courses/', CourseListCreateView.as_view(), name='course-list-create'),
    path('examinations/', ExaminationListCreateView.as_view(), name='examination-list-create'),
    path('cats/', CATListCreateView.as_view(), name='cat-list-create'),
    path('notes/', NoteListCreateView.as_view(), name='note-list-create'),
    path('questions/', QuestionListCreateView.as_view(), name='question-list-create'),
    path('answers/', AnswerListCreateView.as_view(), name='answer-list-create'),
]
