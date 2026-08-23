import uuid
from sqlalchemy import Column, String, Boolean, Numeric, Date, Time, DateTime, ForeignKey, func
from sqlalchemy.dialects.postgresql import UUID
from database import Base

class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    firebase_uid = Column(String(128), unique=True, nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    nombre = Column(String(100))
    apellido = Column(String(100))
    telefono = Column(String(50))
    rol = Column(String(20), default="SOCIO")
    creado_en = Column(DateTime, server_default=func.now())

class Sede(Base):
    __tablename__ = "sedes"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    nombre = Column(String(100), nullable=False)
    direccion = Column(String(255), nullable=False)
    telefono = Column(String(50))
    imagen_url = Column(String(500))
    activa = Column(Boolean, default=True)

class EspacioDeportivo(Base):
    __tablename__ = "espacios_deportivos"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    sede_id = Column(UUID(as_uuid=True), ForeignKey("sedes.id", ondelete="CASCADE"), nullable=False)
    nombre = Column(String(100), nullable=False)
    deporte = Column(String(50), nullable=False)
    precio_por_hora = Column(Numeric(10, 2), nullable=False)
    activo = Column(Boolean, default=True)

class Reserva(Base):
    __tablename__ = "reservas"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    usuario_id = Column(UUID(as_uuid=True), ForeignKey("usuarios.id", ondelete="CASCADE"), nullable=False)
    espacio_id = Column(UUID(as_uuid=True), ForeignKey("espacios_deportivos.id", ondelete="CASCADE"), nullable=False)
    fecha = Column(Date, nullable=False)
    hora_inicio = Column(Time, nullable=False)
    hora_fin = Column(Time, nullable=False)
    estado = Column(String(20), default="CONFIRMADA")
    monto_total = Column(Numeric(10, 2), nullable=False)
    creado_en = Column(DateTime, server_default=func.now())