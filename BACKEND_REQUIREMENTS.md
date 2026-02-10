# Backend Requirements for Animals Feature

## What the Frontend Expects

The frontend is now ready and expects the following from your backend API:

### 1. GET /api/animals - Fetch All Animals

**Endpoint:** `GET http://localhost:5000/api/animals`

**Response Format:**
```json
[
  {
    "id": 1,
    "title": "Bessie",
    "breed": "Holstein",
    "type": "cattle",
    "age_months": 24,
    "price_per_unit": 2500,
    "weight_lbs": 1400,
    "quantity_available": 1,
    "health_status": "Vaccinated, Excellent health",
    "images": ["https://example.com/image1.jpg"],
    "county": "Nairobi",
    "description": "Healthy dairy cow"
  }
]
```

**Required Fields:**
- `id` (integer)
- `title` (string) - Animal name
- `breed` (string)
- `type` (string) - cattle, goat, sheep, chicken, pig
- `age_months` (integer)
- `price_per_unit` (number)
- `quantity_available` (integer)
- `images` (array of strings) - URLs to images

**Optional Fields:**
- `weight_lbs` (number)
- `health_status` (string)
- `county` (string)
- `description` (string)

### 2. GET /api/animals/:id - Fetch Single Animal

**Endpoint:** `GET http://localhost:5000/api/animals/1`

**Response:** Same format as above but single object

### 3. POST /api/animals - Create Animal (Farmers Only)

**Endpoint:** `POST http://localhost:5000/api/animals`

**Headers:** 
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Bessie",
  "breed": "Holstein",
  "type": "cattle",
  "age_months": 24,
  "price_per_unit": 2500,
  "weight_lbs": 1400,
  "quantity_available": 1,
  "health_status": "Vaccinated",
  "images": ["url1", "url2"],
  "county": "Nairobi",
  "description": "Healthy cow"
}
```

**Response:** Created animal object with `id`

### 4. PUT /api/animals/:id - Update Animal

**Endpoint:** `PUT http://localhost:5000/api/animals/1`

**Headers:** Same as POST

**Request Body:** Same as POST

**Response:** Updated animal object

### 5. DELETE /api/animals/:id - Delete Animal

**Endpoint:** `DELETE http://localhost:5000/api/animals/1`

**Headers:** Authorization required

**Response:** Success message or status 204

## Backend Setup Steps

### Step 1: Create Animals Model

```python
# models/animal.py
from app import db
from datetime import datetime

class Animal(db.Model):
    __tablename__ = 'animals'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    breed = db.Column(db.String(50), nullable=False)
    type = db.Column(db.String(20), nullable=False)  # cattle, goat, sheep, etc.
    age_months = db.Column(db.Integer, nullable=False)
    price_per_unit = db.Column(db.Float, nullable=False)
    weight_lbs = db.Column(db.Float)
    quantity_available = db.Column(db.Integer, default=1)
    health_status = db.Column(db.String(200))
    county = db.Column(db.String(50))
    description = db.Column(db.Text)
    images = db.Column(db.JSON)  # Store array of image URLs
    farmer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'breed': self.breed,
            'type': self.type,
            'age_months': self.age_months,
            'price_per_unit': self.price_per_unit,
            'weight_lbs': self.weight_lbs,
            'quantity_available': self.quantity_available,
            'health_status': self.health_status,
            'county': self.county,
            'description': self.description,
            'images': self.images or [],
            'farmer_id': self.farmer_id
        }
```

### Step 2: Create Animals Routes

```python
# routes/animals.py
from flask import Blueprint, request, jsonify
from models.animal import Animal
from app import db
from middleware.auth import token_required

animals_bp = Blueprint('animals', __name__)

@animals_bp.route('/animals', methods=['GET'])
def get_animals():
    animals = Animal.query.all()
    return jsonify([animal.to_dict() for animal in animals]), 200

@animals_bp.route('/animals/<int:id>', methods=['GET'])
def get_animal(id):
    animal = Animal.query.get_or_404(id)
    return jsonify(animal.to_dict()), 200

@animals_bp.route('/animals', methods=['POST'])
@token_required
def create_animal(current_user):
    if current_user.role != 'farmer':
        return jsonify({'error': 'Only farmers can create animals'}), 403
    
    data = request.get_json()
    animal = Animal(
        title=data['title'],
        breed=data['breed'],
        type=data['type'],
        age_months=data['age_months'],
        price_per_unit=data['price_per_unit'],
        weight_lbs=data.get('weight_lbs'),
        quantity_available=data.get('quantity_available', 1),
        health_status=data.get('health_status'),
        county=data.get('county'),
        description=data.get('description'),
        images=data.get('images', []),
        farmer_id=current_user.id
    )
    db.session.add(animal)
    db.session.commit()
    return jsonify(animal.to_dict()), 201

@animals_bp.route('/animals/<int:id>', methods=['PUT'])
@token_required
def update_animal(current_user, id):
    animal = Animal.query.get_or_404(id)
    if animal.farmer_id != current_user.id:
        return jsonify({'error': 'Unauthorized'}), 403
    
    data = request.get_json()
    for key, value in data.items():
        setattr(animal, key, value)
    db.session.commit()
    return jsonify(animal.to_dict()), 200

@animals_bp.route('/animals/<int:id>', methods=['DELETE'])
@token_required
def delete_animal(current_user, id):
    animal = Animal.query.get_or_404(id)
    if animal.farmer_id != current_user.id:
        return jsonify({'error': 'Unauthorized'}), 403
    
    db.session.delete(animal)
    db.session.commit()
    return '', 204
```

### Step 3: Register Blueprint

```python
# app.py
from routes.animals import animals_bp

app.register_blueprint(animals_bp, url_prefix='/api')
```

### Step 4: Run Migrations

```bash
# Create migration
flask db migrate -m "Add animals table"

# Apply migration
flask db upgrade
```

### Step 5: Add Sample Data (Optional)

```python
# seed_animals.py
from app import app, db
from models.animal import Animal

with app.app_context():
    animals = [
        Animal(
            title="Bessie",
            breed="Holstein",
            type="cattle",
            age_months=24,
            price_per_unit=2500,
            weight_lbs=1400,
            quantity_available=1,
            health_status="Vaccinated, Excellent health",
            images=["https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400"],
            farmer_id=1  # Use existing farmer ID
        ),
        Animal(
            title="Billy",
            breed="Boer",
            type="goat",
            age_months=18,
            price_per_unit=450,
            weight_lbs=180,
            quantity_available=2,
            health_status="Healthy, De-wormed",
            images=["https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400"],
            farmer_id=1
        )
    ]
    db.session.add_all(animals)
    db.session.commit()
    print("Sample animals added!")
```

Run: `python seed_animals.py`

### Step 6: Enable CORS

```python
# app.py
from flask_cors import CORS

CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})
```

### Step 7: Start Backend

```bash
python app.py
# or
flask run
```

Backend should run on `http://localhost:5000`

## Testing the API

Use these curl commands to test:

```bash
# Get all animals
curl http://localhost:5000/api/animals

# Get single animal
curl http://localhost:5000/api/animals/1

# Create animal (need JWT token)
curl -X POST http://localhost:5000/api/animals \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Cow","breed":"Holstein","type":"cattle","age_months":12,"price_per_unit":1500,"quantity_available":1}'
```

## Common Issues & Solutions

### Issue 1: ERR_CONNECTION_REFUSED
**Solution:** Backend is not running. Start it with `python app.py`

### Issue 2: CORS Error
**Solution:** Install and configure flask-cors (see Step 6)

### Issue 3: 404 Not Found
**Solution:** Check blueprint is registered with correct url_prefix='/api'

### Issue 4: Images not showing
**Solution:** 
- Use full URLs for images (https://...)
- Or set up image upload endpoint
- Frontend has fallback placeholder images

## Next Steps

1. Frontend is complete and styled
2. Create backend models and routes (follow steps above)
3. Test API endpoints with Postman/curl
4. Start both servers and test integration
5. Add image upload feature (optional)

The frontend will automatically switch from mock data to real API data once your backend is running!
