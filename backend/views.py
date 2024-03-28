
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework.response import Response
from .models import StudentInfo
from .serializers import StudentSerializer,SignupSerializer,LoginSerilaizer
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, TokenAuthentication,BasicAuthentication


class StudentsApi(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    @csrf_exempt
    def get(self, request, pk=0):
        pagination = PageNumberPagination()
        pagination.page_size = 3
        search = request.GET.get("search")
        students = StudentInfo.objects.all()
        if search:
            students = StudentInfo.objects.filter(Firstname__istartswith=search)
        paginated_queryset = pagination.paginate_queryset(students, request)
        student_serializer = StudentSerializer(paginated_queryset, many=True)
        return pagination.get_paginated_response(student_serializer.data)

    @csrf_exempt
    def post(self, request):
        student_data = request.data
        student_serializer = StudentSerializer(data=student_data)
        if student_serializer.is_valid():
            student_serializer.save()
            return Response("Student added Successfully")
        return Response("Student adding Failed")

    @csrf_exempt
    def put(self, request):
        student_data = request.data
        student_obj = StudentInfo.objects.get(studentId=student_data["studentId"])
        student_serializer = StudentSerializer(student_obj, data=student_data, partial=False)
        if student_serializer.is_valid():
            student_serializer.save()
        return Response(student_serializer.data)

    @csrf_exempt
    def delete(self, request, pk):
        student_obj = StudentInfo.objects.get(studentId=pk)
        student_obj.delete()
        return Response("Student was deleted successfully")



class StudentDetailApi(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    @csrf_exempt
    def get(self, request, pk):
        try:
            student_obj = StudentInfo.objects.get(studentId=pk)
        except StudentInfo.DoesNotExist:
            return Response("Student not found", status=status.HTTP_404_NOT_FOUND)
        serializer = StudentSerializer(student_obj)
        return Response(serializer.data)

    @csrf_exempt
    def put(self, request, pk):
        student_data = request.data
        student_obj = StudentInfo.objects.get(studentId=student_data["studentId"])
        student_serializer = StudentSerializer(student_obj, data=student_data, partial=False)
        if student_serializer.is_valid():
            student_serializer.save()
        return Response(student_serializer.data)

    @csrf_exempt
    def delete(self, request, pk):
        student_obj = StudentInfo.objects.get(studentId=pk)
        student_obj.delete()
        pagination = PageNumberPagination()
        pagination.page_size = 3
        students = StudentInfo.objects.all()
        paginated_queryset = pagination.paginate_queryset(students, request)
        student_serializer = StudentSerializer(paginated_queryset, many=True)
        return pagination.get_paginated_response(student_serializer.data)

class SignupApi(APIView):
    permission_classes=[]
    def post(self,request):
        data=request.data
        serializer=SignupSerializer(data=data)
        if  not serializer.is_valid():
            return Response(
                {"message":serializer.errors},
            status=status.HTTP_404_NOT_FOUND\
                )
        serializer.save()
        return Response({'message':'user created'},
        status=status.HTTP_201_CREATED)

class LoginApi(APIView):
    permission_classes=[]
    def post(self,request):
        data=request.data
        serializer=LoginSerilaizer(data=data)
        if not serializer.is_valid():
            return Response(
                {"message":serializer.errors},
            status=status.HTTP_404_NOT_FOUND\
                )
        user=authenticate(username=data["username"],password=data["password"])
        if  not user:
            return Response(
                {"message":"invalid data"},
            status=status.HTTP_404_NOT_FOUND\
                )
        token,_=Token.objects.get_or_create(user=user)
        return Response({
            'message':"User loggined",
            'token':str(token)
        },status=status.HTTP_200_OK)

#logout is also a post method
class LogoutApi(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes = [ TokenAuthentication]
    
    def post(self,request):
        if request.user.is_authenticated:
            request.user.auth_token.delete()
            return Response({'message':'Logout is successfull'},status=status.HTTP_200_OK)
        else:
            # Return a response indicating unauthorized access
            return Response({'message': 'Unauthorized access'}, status=status.HTTP_401_UNAUTHORIZED)


        
        

# Create your views here.
