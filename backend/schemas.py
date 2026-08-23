from pydantic import BaseModel, EmailStr
from datetime import date, time
from uuid import UUID
from typing import Optional

# --- SCHEMAS DE USUARIO ---
class UsuarioCreate(BaseModel):
    nombre: str
    apellido: str
    dni: str
    fecha_nacimiento: date
    email: EmailStr
    password: str

class UsuarioLogin(BaseModel):
    email: EmailStr
    password: str

class UsuarioResponse(BaseModel):
    id: UUID
    nombre: str
    apellido: str
    dni: str
    fecha_nacimiento: date
    email: EmailStr

    class Config:
        from_attributes = True

# --- SCHEMAS DE SEDES ---
class SedeCreate(BaseModel):
    nombre: str
    direccion: str
    hora_apertura: time
    hora_cierre: time
    activa: bool = True

class SedeResponse(BaseModel):
    id: UUID
    nombre: str
    direccion: str
    hora_apertura: time
    hora_cierre: time
    activa: bool

    class Config:
        from_attributes = True

# --- SCHEMAS DE ESPACIOS DEPORTIVOS ---
class EspacioCreate(BaseModel):
    sede_id: UUID
    nombre: str
    deporte: str
    precio_por_hora: float
    activo: bool = True

class EspacioResponse(BaseModel):
    id: UUID
    sede_id: UUID
    nombre: str
    deporte: str
    precio_por_hora: float
    activo: bool

    class Config:
        from_attributes = True

# --- SCHEMAS DE RESERVAS ---
class ReservaCreate(BaseModel):
    espacio_id: UUID
    fecha: date
    hora_inicio: time
    hora_fin: time

class ReservaResponse(BaseModel):
    id: UUID
    usuario_id: UUID
    espacio_id: UUID
    fecha: date
    hora_inicio: time
    hora_fin: time
    monto_total: float
    estado: str

    class Config:
        from_attributes = True