# Use the official Python slim image
FROM python:3.13-slim

# Set the working directory inside the container
WORKDIR /app

# Copy requirements.txt from the root directory
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend folder into the container
COPY backend ./backend

# Expose the FastAPI port
EXPOSE 8000

# Run the FastAPI app (main.py inside backend/)
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
