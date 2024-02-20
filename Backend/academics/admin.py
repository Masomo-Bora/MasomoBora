from django.contrib import admin
from .models import Program, Course, Examination, CAT, Note,Question, Answer
# Register your models here.
admin.site.register(Program)
admin.site.register(Course)
admin.site.register(Examination)
admin.site.register(CAT)
admin.site.register(Note)
admin.site.register(Question)
admin.site.register(Answer)