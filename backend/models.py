from django.db import models

class StudentInfo(models.Model):
    studentId=models.AutoField(primary_key=True)
    Firstname=models.CharField(max_length=100)
    Lastname=models.CharField(max_length=100)
    Email=models.EmailField(max_length=100)
    Course=models.CharField(max_length=100)


# Create your models here.
