-- Seed data for French Tech Barcelona Offices
-- This file contains sample data for development and testing

-- Insert sample profiles (these will be created automatically by the trigger)
-- You can add more sample data here if needed

-- Insert sample offices (make sure to replace user_id with actual profile IDs)
INSERT INTO offices (
  title,
  description,
  neighborhood,
  price,
  size,
  amenities,
  images,
  address,
  status
) VALUES 
(
  'Bureau Moderne Eixample',
  'Bureau lumineux et moderne dans le quartier branché d\'Eixample, parfait pour les startups tech.',
  'Eixample',
  850.00,
  45,
  ARRAY['WiFi haute vitesse', 'Climatisation', 'Salle de réunion', 'Cuisine équipée', 'Terrasse'],
  ARRAY['https://example.com/office1-1.jpg', 'https://example.com/office1-2.jpg'],
  'Carrer de València, 123, 08011 Barcelona',
  'available'
),
(
  'Espace Coworking Gràcia',
  'Espace de coworking convivial dans le quartier artistique de Gràcia, idéal pour les créatifs.',
  'Gràcia',
  650.00,
  35,
  ARRAY['WiFi', 'Imprimante', 'Café gratuit', 'Espace détente'],
  ARRAY['https://example.com/office2-1.jpg'],
  'Carrer de Verdi, 45, 08012 Barcelona',
  'available'
),
(
  'Bureau Premium Poblenou',
  'Bureau premium dans le district technologique de Poblenou, parfait pour les entreprises établies.',
  'Poblenou',
  1200.00,
  60,
  ARRAY['WiFi dédié', 'Climatisation individuelle', 'Salle de conférence', 'Parking privé', 'Conciergerie'],
  ARRAY['https://example.com/office3-1.jpg', 'https://example.com/office3-2.jpg', 'https://example.com/office3-3.jpg'],
  'Carrer de Llacuna, 78, 08005 Barcelona',
  'available'
),
(
  'Studio Créatif Born',
  'Studio créatif dans le quartier historique du Born, parfait pour les designers et artistes.',
  'Born',
  750.00,
  40,
  ARRAY['Éclairage naturel', 'Espace de stockage', 'WiFi', 'Café'],
  ARRAY['https://example.com/office4-1.jpg'],
  'Carrer de l\'Argenteria, 56, 08003 Barcelona',
  'available'
),
(
  'Bureau Startup Sant Antoni',
  'Bureau moderne pour startups dans le quartier en pleine expansion de Sant Antoni.',
  'Sant Antoni',
  700.00,
  38,
  ARRAY['WiFi', 'Climatisation', 'Salle de réunion', 'Cuisine', 'Balcon'],
  ARRAY['https://example.com/office5-1.jpg', 'https://example.com/office5-2.jpg'],
  'Carrer de l\'Abat Safont, 23, 08001 Barcelona',
  'available'
);

-- Insert sample messages (make sure to replace IDs with actual values)
-- These will be inserted after you have actual profiles and offices

-- Insert sample bookings (make sure to replace IDs with actual values)
-- These will be inserted after you have actual profiles and offices

-- Note: To get actual IDs for testing, you can run:
-- SELECT id FROM profiles LIMIT 1;
-- SELECT id FROM offices LIMIT 1;
-- Then use those IDs in your seed data
