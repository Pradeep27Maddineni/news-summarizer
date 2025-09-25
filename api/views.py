from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response ##1

from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests
from transformers import pipeline ##2

@api_view(['GET'])
def health(request):
    return Response({"status": "ok"}) ##1

# Load summarization pipeline (small model for demo)
summarizer = pipeline("summarization")

NEWS_API_KEY = "YOUR_NEWSAPI_KEY"

@api_view(['GET'])
def summarize_news(request):
    topic = request.GET.get("topic", "technology")  # default topic
    url = f"https://newsapi.org/v2/everything?q={topic}&pageSize=5&apiKey={"650a70dc96df44e8adb568bde0d5f26e"}"
    res = requests.get(url)
    news = res.json()

    summaries = []
    for article in news.get("articles", []):
        text = article.get("content") or article.get("description") or ""
        if text:
            summary = summarizer(text, max_length=60, min_length=20, do_sample=False)[0]['summary_text']
            summaries.append({
                "title": article.get("title"),
                "summary": summary,
                "url": article.get("url")
            })

    return Response({"topic": topic, "summaries": summaries}) ##2

