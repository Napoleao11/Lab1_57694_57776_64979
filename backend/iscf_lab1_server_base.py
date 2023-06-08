# TODO LAB 1 - Add your imports here
from flask import Flask
from flask_restful import Resource, Api, reqparse
from requests import post

app = Flask(__name__)
api = Api(app)

firsttime = 0

parser = reqparse.RequestParser()
parser.add_argument('data', type=dict, required=True)

# TODO LAB 1 - Implement the necessary function to write data to your Firebase real-time database~
class Accel(Resource):
    #def get(self, todo_id):
     #   return {todo_id: todos[todo_id]}
     
    def post(self):
        data = parser.parse_args()
        data = data['data']
        push_data(data)
        #todos[todo_id] = request.form['data']
        return 201
#"https://iscf-tp1-91e63-default-rtdb.europe-west1.firebasedatabase.app/accel.json" 
def push_data(data):#https://iscf-lab1-57694-default-rtdb.europe-west1.firebasedatabase.app/accel.json
    #Here the adress could be a remote server, or in this case your Firebase real-time DB
    post("https://iscf-lab-1-final-default-rtdb.europe-west1.firebasedatabase.app/accel.json",
        json=data)
    #pass



# TODO LAB 1 - Implement the API resource (Accel) that should at least handle POST requests with the data to be stored.
# The data should be stored in the Firebase database using the push_data function. 
# The POST request contains a "data" argument that is a dictionary with the data to be stored.
# The API should return the data that was stored in the database and a 201 status code. 






# TODO LAB 1 - add api resource and corresponding /data route to receive a JSON object with the data to be stored

api.add_resource(Accel, '/data')

# TODO LAB 1 - Add your main section here

if __name__ == '__main__':
    #push_data()
    app.run(debug = True)