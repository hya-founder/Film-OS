-- 1. Equipment Table
CREATE TYPE equipment_category AS ENUM ('Camera', 'Lighting', 'Grip');
CREATE TYPE equipment_status AS ENUM ('Available', 'Booked', 'Maintenance');

CREATE TABLE equipment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_name TEXT NOT NULL,
  serial_number TEXT UNIQUE NOT NULL,
  category equipment_category NOT NULL,
  status equipment_status DEFAULT 'Available',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Packages Table
CREATE TABLE packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(12, 2) NOT NULL
);

-- 3. Package Requirements
CREATE TABLE package_requirements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id UUID REFERENCES packages(id) ON DELETE CASCADE,
  equipment_id UUID REFERENCES equipment(id),
  quantity INTEGER DEFAULT 1
);

-- 4. Bookings Table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_name TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status TEXT DEFAULT 'CONFIRMED',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Booking Equipment Junction
CREATE TABLE booking_equipment (
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  equipment_id UUID REFERENCES equipment(id) ON DELETE CASCADE,
  PRIMARY KEY (booking_id, equipment_id)
);
