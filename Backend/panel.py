import sys
import json
from sentence_transformers import SentenceTransformer, util
from pyresparser import ResumeParser

def process_resume(resume_path):
    try:
        # Step 1: Parse the student's resume
        resume_data = ResumeParser(resume_path).get_extracted_data()

        # Extract student's name
        student_name = resume_data.get("name", "Unknown")

        # Collect student's skills, projects, and experience into a single string
        student_data = []

        # Collect student's skills
        skills = ', '.join(resume_data.get("skills", []))
        if skills:
            student_data.append(f"Skills: {skills}")

        # Collect student's projects
        projects = ', '.join(resume_data.get("projects", []))
        if projects:
            student_data.append(f"Projects: {projects}")

        # Collect student's experience
        experience = ', '.join(resume_data.get("experience", []))
        if experience:
            student_data.append(f"Experience: {experience}")

        # Join all student data into one string
        student_combined_data = ' '.join(student_data)

        # Step 2: Load and filter the faculty data
        with open('faculty_data.json', 'r', encoding='utf-8') as f:
            faculty_data = json.load(f)

        filtered_faculty_data = []
        for faculty in faculty_data:
            # Ensure all necessary keys are present
            if 'name' in faculty and 'Employee ID' in faculty and 'Areas of Specialization' in faculty:
                faculty_info = {
                    'name': faculty['name'],
                    'Employee ID': faculty['Employee ID'],
                    'areas_of_specialization': faculty.get('Areas of Specialization', ''),
                }
                filtered_faculty_data.append(faculty_info)

        # Prepare faculty data by combining relevant fields into a single string
        faculty_combined_data = [
            f"Areas of Specialization: {faculty['areas_of_specialization']}"
            for faculty in filtered_faculty_data
        ]

        # Step 3: Encode student's data and faculty's combined data using Sentence Transformers
        model = SentenceTransformer('all-mpnet-base-v2')  # Load the chosen pre-trained model

        # Encode the student's combined data
        student_embedding = model.encode([student_combined_data], convert_to_tensor=True)

        # Encode faculty combined data
        faculty_embeddings = model.encode(faculty_combined_data, convert_to_tensor=True)

        # Step 4: Calculate cosine similarities
        similarity_scores = util.pytorch_cos_sim(student_embedding, faculty_embeddings)

        # Match faculty with student based on similarity scores
        faculty_scores = list(zip(filtered_faculty_data, similarity_scores[0].cpu().numpy()))

        # Step 5: Sort faculty by similarity score in descending order
        faculty_scores.sort(key=lambda x: x[1], reverse=True)

        # Select the top two faculty members
        top_two_faculty = faculty_scores[:2]

        # Prepare the output as a dictionary (JSON object)
        output = {
            "Name": student_name,  # Add student's name to the output
            "Skills": skills,
            "Top Faculty": [
                {
                    "Name": top_two_faculty[0][0]['name'],
                    "Employee ID": top_two_faculty[0][0]['Employee ID'],
                    "Areas of Specialization": top_two_faculty[0][0]['areas_of_specialization'],
                    "Similarity Score": f"{top_two_faculty[0][1]:.4f}"
                },
                {
                    "Name": top_two_faculty[1][0]['name'],
                    "Employee ID": top_two_faculty[1][0]['Employee ID'],
                    "Areas of Specialization": top_two_faculty[1][0]['areas_of_specialization'],
                    "Similarity Score": f"{top_two_faculty[1][1]:.4f}"
                }
            ]
        }

        return output

    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python panel.py <file_path>")
        sys.exit(1)
    
    file_path = sys.argv[1]
    output = process_resume(file_path)
    # Print the JSON output with indentation
    print(json.dumps(output, indent=4))
