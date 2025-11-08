# Use official Python base image
FROM python:3.12.10

# Set working directory
WORKDIR /app

# Copy requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend code
COPY . .

# Expose port (Flask default is 5000)
EXPOSE 5000

# Command to run the Flask app
CMD ["python", "app.py"]
