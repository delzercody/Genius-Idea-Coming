from flask import Flask, request, jsonify
import openai
from secret import API_KEY

openai.api_key = API_KEY

app = Flask(__name__)

@app.route('/api/generate-idea', methods=['POST'])
def generate_idea():
    input_word = request.json['inputWord']
    prompt = f"Generate a genius idea using the word '{input_word}'."
    response = openai.Completion.create(
        engine='text-davinci-003',
        prompt=prompt,
        max_tokens=50,
        n=1,
        stop=None,
        temperature=0.7
    )
    idea = response.choices[0].text.strip()
    return jsonify({'generatedIdea': idea})

if __name__ == '__main__':
    app.run()
