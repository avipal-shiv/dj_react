from django.shortcuts import render


from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import ast

@csrf_exempt
def calculate_expression(request):
    #print(request)
    if request.method == 'POST':
        data = ast.literal_eval(request.body.decode("utf-8"))
        expression = data.get('expression')
        #print(expression)
        if not expression:
            return JsonResponse({'error': 'Expression is required'}, status=400)
        try:
            result = eval(expression)
            return JsonResponse({'result': result}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
