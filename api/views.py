from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from transformers import pipeline
import requests

# Health check endpoint
@api_view(['GET'])
def health(request):
    return Response({"status": "ok"})

# Load summarization pipeline
summarizer = pipeline("summarization", model="sshleifer/distilbart-cnn-12-6")

NEWS_API_KEY = "650a70dc96df44e8adb568bde0d5f26e"  # (for later use)

# Summarization endpoint
@api_view(["POST"])
def summarize_text(request):
    text = request.data.get("text", "")

    if not text.strip():
        return JsonResponse({"error": "No text provided"}, status=400)

    summary = summarizer(text, max_length=150, min_length=40, do_sample=False)
    return JsonResponse({"summary": summary[0]["summary_text"]})
