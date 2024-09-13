from flask import Flask, request, jsonify, Response, stream_with_context
import os
import subprocess
import sys
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow CORS for all routes and all origins

UPLOAD_FOLDER = os.path.dirname(os.path.abspath(__file__))
ALLOWED_EXTENSIONS = {"pdf"}

response_data = {
    "Resumes": [
        {
            "Resume ID": 1,
            "Name": "John Doe",
            "Skills": "Python, Machine Learning, Data Science, Neural Networks, TensorFlow, Keras, SQL, Data Analysis, Programming, Research, Cloud Computing",
            "Top Faculty": [
                {
                    "Name": "Dr. Anil Kumar (SCOPE-professor)",
                    "Employee ID": "50012",
                    "Similarity Score": "0.7205",
                    "Areas of Specialization": "Data Science, Machine Learning, Cloud Computing, Big Data"
                },
                {
                    "Name": "Dr. Sunita R (SCOPE-assistantprofessor)",
                    "Employee ID": "50478",
                    "Similarity Score": "0.6923",
                    "Areas of Specialization": "Neural Networks, Artificial Intelligence, Data Analysis, Cloud Computing"
                }
            ]
        },
        {
            "Resume ID": 2,
            "Name": "Jane Smith",
            "Skills": "Web Development, JavaScript, React, Node.js, MongoDB, CSS, HTML, UX/UI Design, APIs, Mobile Development",
            "Top Faculty": [
                {
                    "Name": "Dr. Shyam V (SCOPE-associateprofessor-grade2)",
                    "Employee ID": "50231",
                    "Similarity Score": "0.6821",
                    "Areas of Specialization": "Web Development, JavaScript, Mobile Development, User Experience"
                },
                {
                    "Name": "Dr. Priya S (SCOPE-professor-hag)",
                    "Employee ID": "52670",
                    "Similarity Score": "0.6719",
                    "Areas of Specialization": "Frontend Development, User Interface Design, APIs, JavaScript"
                }
            ]
        },
        {
            "Resume ID": 3,
            "Name": "Michael Johnson",
            "Skills": "Cybersecurity, Network Security, Ethical Hacking, Linux, Cryptography, Risk Management, Penetration Testing, Cloud Security, Firewalls",
            "Top Faculty": [
                {
                    "Name": "Dr. Ashok G (SCOPE-associateprofessor-grade1)",
                    "Employee ID": "50912",
                    "Similarity Score": "0.6987",
                    "Areas of Specialization": "Cybersecurity, Cryptography, Network Security, Cloud Security"
                },
                {
                    "Name": "Dr. Deepa M (SCOPE-professor)",
                    "Employee ID": "51023",
                    "Similarity Score": "0.6834",
                    "Areas of Specialization": "Risk Management, Penetration Testing, Firewalls, Ethical Hacking"
                }
            ]
        },
        {
            "Resume ID": 4,
            "Name": "Emily Davis",
            "Skills": "Artificial Intelligence, Natural Language Processing, Deep Learning, Python, TensorFlow, Keras, Cloud Computing, Data Mining, Data Structures",
            "Top Faculty": [
                {
                    "Name": "Dr. Ramesh N (SCOPE-professor)",
                    "Employee ID": "50345",
                    "Similarity Score": "0.7112",
                    "Areas of Specialization": "Artificial Intelligence, NLP, Deep Learning, Data Mining"
                },
                {
                    "Name": "Dr. Shalini P (SCOPE-assistantprofessor)",
                    "Employee ID": "51891",
                    "Similarity Score": "0.6995",
                    "Areas of Specialization": "Cloud Computing, Data Structures, Machine Learning, AI"
                }
            ]
        }
    ]
}

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        print("No file part")
        return jsonify({"error": "No file part"}), 400
    
    file = request.files["file"]
    if file.filename == "":
        print("No selected file")
        return jsonify({"error": "No selected file"}), 400
    
    if file and allowed_file(file.filename):
        filename = "resume.pdf"
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        try:
            file.save(file_path)
            print(f"File saved at: {file_path}")
        except Exception as e:
            print(f"Failed to save file: {str(e)}")
            return jsonify({"error": f"Failed to save file: {str(e)}"}), 500

        # Stream the response back to the client
        def generate():
            python_executable = sys.executable  # Get the path to the current Python interpreter
            try:
                # Call panel.py and capture output
                result = subprocess.run(
                    [python_executable, "panel.py", file_path],
                    capture_output=True,
                    text=True,
                    check=True
                )
                output = result.stdout.strip()
                
                # Debug: Print the output
                print(f"Output from panel.py: {output}")
                
                if not output:
                    yield json.dumps({"error": "No output from panel.py"}) + "\n"
                    return
                
                try:
                    # Validate if output is a valid JSON
                    json.loads(output)
                    # Send the entire JSON response
                    yield output + "\n"

                except json.JSONDecodeError as e:
                    print(f"JSON decode error: {e.msg}")
                    yield json.dumps({"error": f"JSON decode error: {e.msg}"}) + "\n"

            except subprocess.CalledProcessError as e:
                error_message = e.stderr.decode('utf-8') if e.stderr else str(e)
                print(f"Error processing file with panel.py: {error_message}")
                yield json.dumps({"error": f"Error processing file with panel.py: {error_message}"}) + "\n"

        return Response(stream_with_context(generate()), content_type="application/json")

    print("Invalid file type")
    return jsonify({"error": "Invalid file type"}), 400

@app.route('/multiupload', methods=['POST'])
def multiupload():
    files = request.files
    return jsonify(response_data)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
