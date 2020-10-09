-- RUN SCRIPTS

-- ===================================  
-- ORDER TO CREATE DB
-- ===================================

-- @ 'model.sql'
-- @ 'create_tables.sql'
-- @ 'add_pk.sql'
-- @ 'add_fk.sql'

-- ===================================  
-- INITIAL DATA
-- ===================================

-- Plans

INSERT INTO plans (id, name_plan, price) VALUES (
  1,
  'Básico',
  300
);
INSERT INTO plans (id, name_plan, price) VALUES (
  2,
  'Estándar',
  600
);
INSERT INTO plans (id, name_plan, price) VALUES (
  3,
  'Premium',
  900
);

-- Admins

INSERT INTO administrators (name, email, password, dni) VALUES (
  'Default Admin',
  'default@admin.com',
  'admin',
  '0978901212'
);

-- Pilots

INSERT INTO pilots (dni, fullname, email, phone, home_address, experience, path_img) VALUES (
  '0910903787',
  'Daniel Pincay',
  'danielp@gmail.com',
  '3-845959',
  'Av. XYZ',
  'Experiencia en el filmaciones de eventos como conciertos y partidos de futbol, trabajando en DroneSolution desde 2018',
  '/assets/pilots/DanielPincay.jpg'
);

INSERT INTO pilots (dni, fullname, email, phone, home_address, experience, path_img) VALUES (
  '0998701765',
  'Ronny Gómez',
  'ronnyg@gmail.com',
  '3-945959',
  'Av. XYZ',
  'Eficiente en el manejo de drones y en eventos de alta concurrencia. Trabajando con entusiasmo por su seguirdad',
  '/assets/pilots/RonnyGomez.jpg'
);

-- Drones

INSERT INTO drones (brand, description, pilot_dni, path_img) VALUES (
  'Mavic Air',
  'El Mavic Air de DJI toma 25 fotos en 8 segundos y las une para crear vistas panorámicas esféricas de calidad increíble de 32 Mpx',
  '0910903787', 
  '/assets/drones/Mavic-Air-DJI.jpg'
);
INSERT INTO drones (brand, description, pilot_dni, path_img) VALUES (
  'Mavic Pro',	
  'El nuevo Drone Mavic Pro es pequeño, compacto y fácil de manejar y hace que cada momento sea mágico.', 
  '0910903787', 
  '/assets/drones/Mavic-Pro.jpg'
);
INSERT INTO drones (brand, description, pilot_dni, path_img) VALUES (
  'Mavic Mini', 
  'El compacto pero potente Mavic Mini es el compañero creativo perfecto que eleva sin esfuerzo lo ordinario.',
  '0998701765',
  '/assets/drones/Mavic-Mini-DJI.jpg'
);




