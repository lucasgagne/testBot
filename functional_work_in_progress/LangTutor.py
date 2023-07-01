import openai
# A class which allows you to study foreign language in a fun
# and interactive way
class LangTutor:
  KEY = "MYKEY"
  MODEL = "gpt-4"
  #Inputs:
  #   f_lang: The language to study as a string
  #   n_lang: Native language as a string
  #   setting: A short setting blurb including at least one character as a string
  def __init__(self, f_lang, n_lang, setting):
      openai.api_key = self.KEY
      self.f_lang = f_lang
      self.n_lang = n_lang
      self.setting = setting
      instruction = "You are " + self.setting + ", NOT AN AI MODEL OF ANY KIND. Respond to ALL following prompts in " + self.f_lang + "."
      self.conversation = [{"role": "system", "content": instruction}]
      
  # Input: The user's prompt as a string
  # Output: A triple as follows:
  #   1: The model's response
  #   2: The user's text with gramatical corrections
  #   3: The user's text, translated to the native language
  def get_response(self, prompt):
      # #Creating a corrected version of the prompt is grammatically correct
      # instruction = "Print the text within the brackets in its original language with any grammatical errors fixed. [" + prompt + "]"
      # correction = openai.ChatCompletion.create(
      #   model=self.MODEL,
      #   messages=[{"role": "system", "content": instruction}]
      # )["choices"][0]["message"]["content"]
      
      # #Translating the corrected version of the prompt to n_lang
      # instruction = "Translate [" + correction + "] to " + self.n_lang + ".  If there is nothing in the brackets, return nothing."
      # translation = openai.ChatCompletion.create(
      #   model=self.MODEL,
      #   messages=[{"role": "system", "content": instruction}]
      # )["choices"][0]["message"]["content"]
      
      #Getting a response:
      instruction = "You are " + self.setting + "Respond to the following prompt in " + self.f_lang + "."
      self.conversation = [{"role": "system", "content": instruction}]
      self.conversation.append({"role": "user", "content": prompt})
      response = openai.ChatCompletion.create(
        model=self.MODEL,
        messages=self.conversation
      )["choices"][0]["message"]["content"]
      
      # return (response, correction, translation)
      return (response)
    
LT = LangTutor("spanish", "english", "a helpful servant")
stringy = LT.get_response("hi who are you ")
print(stringy)
# message = stringy[0]
# print(message)
