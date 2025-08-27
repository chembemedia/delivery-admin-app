const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Delivery Schema
const deliverySchema = new mongoose.Schema({
  recipient: String,
  address: String,
  status: { type: String, enum: ['pending', 'delivered', 'cancelled'], default: 'pending' },
  scheduledDate: Date,
  driver: String,
});

const Delivery = mongoose.model('Delivery', deliverySchema);

// Endpoints

// Get all deliveries
app.get('/api/deliveries', async (req, res) => {
  const deliveries = await Delivery.find();
  res.json(deliveries);
});

// Add a delivery
app.post('/api/deliveries', async (req, res) => {
  const delivery = new Delivery(req.body);
  await delivery.save();
  res.json(delivery);
});

// Update delivery status
app.put('/api/deliveries/:id', async (req, res) => {
  const delivery = await Delivery.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(delivery);
});

// Connect to DB and start server
mongoose.connect('mongodb://localhost:27017/delivery-admin', { useNewUrlParser: true, useUnifiedTopology: true });
app.listen(5000, () => console.log('Server started on port 5000'));