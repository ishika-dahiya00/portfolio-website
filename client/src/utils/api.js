const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  async get(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  }

  async post(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  }

  // Portfolio Data
  getAbout = () => this.get('/about');
  getSkills = () => this.get('/skills');
  getProjects = () => this.get('/projects');
  getCaseStudies = () => this.get('/casestudies');
  getBlogs = () => this.get('/blogs');
  
  // Actions
  submitContact = (data) => this.post('/contact', data);
  getBlog = (slug) => this.get(`/blogs/${slug}`);
  getProject = (id) => this.get(`/projects/${id}`);
}

export default new ApiService();