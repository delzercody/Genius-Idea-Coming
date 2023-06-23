import openai
from config import API_KEY

openai.api_key = API_KEY


def generate_idea(input_word):
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
    return idea


user_input = input("Enter a word: ")


generated_idea = generate_idea(user_input)
print(generated_idea)