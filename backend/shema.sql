-- Extensión para generar UUIDs automáticamente
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Tabla de Usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    firebase_uid VARCHAR(128) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    telefono VARCHAR(50),
    rol VARCHAR(20) DEFAULT 'SOCIO', -- 'SOCIO' o 'ADMIN'
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabla de Sedes
CREATE TABLE IF NOT EXISTS sedes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    telefono VARCHAR(50),
    imagen_url VARCHAR(500),
    activa BOOLEAN DEFAULT TRUE
);

-- 3. Tabla de Espacios Deportivos (Canchas/Gimnasios)
CREATE TABLE IF NOT EXISTS espacios_deportivos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sede_id UUID NOT NULL REFERENCES sedes(id) ON DELETE CASCADE,
    nombre VARCHAR(100) NOT NULL, -- Ej: 'Cancha de Fútbol 5 A', 'Cancha de Tenis 1'
    deporte VARCHAR(50) NOT NULL, -- 'FUTBOL', 'TENIS', 'PADEL', 'BASQUET'
    precio_por_hora DECIMAL(10, 2) NOT NULL,
    activo BOOLEAN DEFAULT TRUE
);

-- 4. Tabla de Reservas
CREATE TABLE IF NOT EXISTS reservas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    espacio_id UUID NOT NULL REFERENCES espacios_deportivos(id) ON DELETE CASCADE,
    fecha DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    estado VARCHAR(20) DEFAULT 'CONFIRMADA', -- 'CONFIRMADA', 'CANCELADA'
    monto_total DECIMAL(10, 2) NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar Datos Iniciales de Ejemplo (Sedes y Espacios)
INSERT INTO sedes (nombre, direccion, telefono, imagen_url) VALUES 
('Sede Central - Palermo', 'Av. del Libertador 4100, CABA', '11-4444-5555', 'https://images.unsplash.com/photo-1574629810360-7efbbe195018'),
('Sede Belgrano', 'Av. Cabildo 2200, CABA', '11-4444-6666', 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8');

INSERT INTO espacios_deportivos (sede_id, nombre, deporte, precio_por_hora) VALUES
((SELECT id FROM sedes WHERE nombre = 'Sede Central - Palermo'), 'Cancha de Fútbol 11 - Sintético', 'FUTBOL', 12000.00),
((SELECT id FROM sedes WHERE nombre = 'Sede Central - Palermo'), 'Cancha de Tenis 1 - Polvo de Ladrillo', 'TENIS', 8500.00),
((SELECT id FROM sedes WHERE nombre = 'Sede Belgrano'), 'Cancha de Pádel 1 - Cristal', 'PADEL', 9500.00);