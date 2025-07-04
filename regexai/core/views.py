from django import forms
from django.http import JsonResponse
from django.shortcuts import render
from decouple import config
from groq import Groq
import json

testing = True

def index(request):
    return render(request, "core/index.html")

def generate_regex(request):
    client = Groq(
        api_key=config("GROQ_API_KEY"),
    )

    if request.method == "POST":
        data = json.loads(request.body)
        prompt = data.get("prompt", "")

    if request.method == "GET":
        prompt = request.GET.get("prompt")

    if not prompt:
        return JsonResponse({"error": "Prompt is required."}, status=400)
    
    if testing == True:
        return JsonResponse({
            "prompt": prompt,
            "regex": '^\S+@\S+\.\S+$'
        })
    
    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "system",
                    "content": "You are a regex expert. Only return the regex pattern."
                },
                {
                    "role": "user", 
                    "content": f"Generate regex for: {prompt}"
                }
            ],
            temperature=0.2,
            max_tokens=100
        )

        result = response.choices[0].message.content.strip()

        return JsonResponse({
            "prompt": prompt,
            "regex": result
        })
    except Exception as e:
        return JsonResponse(
            {
                "error": str(e)
            },
            status=500
        )

    