-- Query exmples

-- ===================================  
-- PILOTS
-- ===================================

INSERT INTO pilots (dni, fullname, email, experience, path_img ) VALUES(
	'0910903787',
	'Kora Xian',
	'kxian@gmail.com',
	'Experiencia en el filmaciones de eventos como conciertos y partidos de futbol, trabajando en DroneSolution desde 2018',
	'/assets/pilots/KoraXian.jpg'
);

-- ===================================  
-- DRONES
-- ===================================

INSERT INTO drones (brand, description, pilot_dni, path_img) VALUES (
	'Mavic Mini',
	'El compacto pero potente Mavic Mini es el compañero creativo perfecto que eleva sin esfuerzo lo ordinario.',
	'0910903787',
	'/assets/drones/Mavic-Mini-DJI.jpg'
);

-- ===================================  
-- USERS
-- ===================================

INSERT INTO events (dni, fullname, email, password, phone, home_address) VALUES (
	'0989102310',
	'Kora Xian',
	'kxian@gmail.com',
	'******',
	'3-90199',
	'Av. XYZ'
);